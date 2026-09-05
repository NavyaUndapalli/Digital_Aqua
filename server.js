import http from 'node:http'
import 'dotenv/config'

const port = Number(process.env.PORT || 8787)
const ollamaUrl = process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434'
const model = process.env.OLLAMA_MODEL || 'llama3.2:1b'
const requestTimeoutMs = Number(process.env.OLLAMA_TIMEOUT_MS || 180000)

const sendJson = (response, status, body) => {
  response.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:5173',
  })
  response.end(JSON.stringify(body))
}

const analysisSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['summary', 'riskLevel', 'confidence', 'issues', 'precautions', 'reasons'],
  properties: {
    summary: { type: 'string' },
    riskLevel: { type: 'string', enum: ['Healthy', 'Warning', 'Critical'] },
    confidence: { type: 'number', minimum: 0, maximum: 1 },
    issues: { type: 'array', items: { type: 'string' } },
    precautions: { type: 'array', items: { type: 'string' } },
    reasons: { type: 'array', items: { type: 'string' } },
  },
}

const extractionSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['values', 'warnings'],
  properties: {
    values: {
      type: 'object',
      additionalProperties: false,
      required: ['ph', 'dissolvedOxygen', 'ammonia', 'nitrite', 'nitrate', 'salinity', 'turbidity', 'temperature', 'alkalinity'],
      properties: {
        ph: { type: 'string' }, dissolvedOxygen: { type: 'string' }, ammonia: { type: 'string' },
        nitrite: { type: 'string' }, nitrate: { type: 'string' }, salinity: { type: 'string' },
        turbidity: { type: 'string' }, temperature: { type: 'string' }, alkalinity: { type: 'string' },
      },
    },
    warnings: { type: 'array', items: { type: 'string' } },
  },
}

const buildExtractionPrompt = ({ rawText }) => `You are extracting measurements from OCR text from an aquaculture laboratory report. The OCR may scramble table columns. Return only values that are explicitly and reliably associated with a parameter label or an unmistakable table column. Never copy values from the Optimum levels row, never invent missing values, and never infer a column mapping from numbers alone. For a table row, use the header order only when the header and result row are both clear. Leave uncertain values as empty strings. Normalize units: pH has no unit, dissolved oxygen mg/L, ammonia/nitrite/nitrate/alkalinity ppm, salinity ppt, turbidity NTU, temperature °C. Warnings must name ambiguous or missing fields.

OCR text:
${rawText}`

const callExtractionModel = async (payload) => {
  const response = await fetch(`${ollamaUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(requestTimeoutMs),
    body: JSON.stringify({
      model,
      stream: false,
      messages: [
        { role: 'system', content: 'You extract laboratory values conservatively and never guess table columns.' },
        { role: 'user', content: buildExtractionPrompt(payload) },
      ],
      format: extractionSchema,
      keep_alive: '10m',
      options: { temperature: 0, num_predict: 300 },
    }),
  })
  if (!response.ok) throw new Error(`Ollama extraction failed: ${response.status}`)
  const data = await response.json()
  const content = data.message?.content
  if (!content) throw new Error('Ollama returned no extraction')
  return JSON.parse(content)
}

const buildPrompt = ({ pond, metrics, weather, language = 'en' }) => `You are a cautious aquaculture water-quality advisor helping an Indian fish farmer. Analyze the validated pond report and current weather below.
Pond: ${pond.name}
Location: ${pond.location}
Validated water metrics: ${JSON.stringify(metrics)}
Current weather at the pond location: ${JSON.stringify(weather)}
Response language: ${language === 'te' ? 'Telugu. Write every summary, issue, precaution, and reason in clear farmer-friendly Telugu. Keep units and numeric values unchanged.' : 'English.'}

Use the units in the metric labels and apply these conservative ranges: pH 6.5-8.5, dissolved oxygen >=5 mg/L, nitrite <0.5 ppm, nitrate <40 ppm, salinity 5-25 ppt, turbidity <=30 NTU, alkalinity 60-200 ppm, water temperature 20-32°C. Treat values inside these ranges as normal. Do not invent measurements or treatments. If a value is missing, say it needs a retest. Return valid JSON matching the schema. Keep summary under 20 words and return at most 3 short items in each array.`

const callModel = async (payload) => {
  const response = await fetch(`${ollamaUrl}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    signal: AbortSignal.timeout(requestTimeoutMs),
    body: JSON.stringify({
      model,
      stream: false,
      messages: [
        { role: 'system', content: 'You produce reliable structured aquaculture analysis.' },
        { role: 'user', content: buildPrompt(payload) },
      ],
      format: analysisSchema,
      keep_alive: '10m',
      options: { temperature: 0, num_predict: 650 },
    }),
  })

  if (!response.ok) throw new Error(`Ollama request failed: ${response.status}`)
  const data = await response.json()
  const content = data.message?.content
  if (!content) throw new Error('LLM returned no analysis')
  try {
    return JSON.parse(content)
  } catch {
    const start = content.indexOf('{')
    const end = content.lastIndexOf('}')
    if (start >= 0 && end > start) return JSON.parse(content.slice(start, end + 1))
    throw new Error('Llama returned incomplete analysis JSON')
  }
}

const server = http.createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    response.writeHead(204, { 'Access-Control-Allow-Origin': 'http://localhost:5173', 'Access-Control-Allow-Headers': 'Content-Type' })
    response.end()
    return
  }

  if (request.method !== 'POST' || !['/api/analyze', '/api/extract-report'].includes(request.url)) {
    sendJson(response, 404, { error: 'Not found' })
    return
  }

  let rawBody = ''
  request.on('data', (chunk) => { rawBody += chunk })
  request.on('end', async () => {
    try {
      const payload = JSON.parse(rawBody)
      if (request.url === '/api/extract-report') {
        if (!payload.rawText) {
          sendJson(response, 400, { error: 'rawText is required' })
          return
        }
        sendJson(response, 200, { extraction: await callExtractionModel(payload), provider: 'ollama', model })
        return
      }
      if (!payload.pond || !payload.metrics || !payload.weather) {
        sendJson(response, 400, { error: 'pond, metrics, and weather are required' })
        return
      }
      sendJson(response, 200, { analysis: await callModel(payload), provider: 'ollama', model })
    } catch (error) {
      sendJson(response, 502, { error: error.message || 'Analysis provider failed' })
    }
  })
})

server.listen(port, () => {
  console.log(`Analysis API listening on http://localhost:${port}`)
})
