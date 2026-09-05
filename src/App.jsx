import { useEffect, useState } from 'react'

const serviceCards = [
  {
    id: 1,
    title: { en: 'Water Quality Monitoring', te: 'జల నాణ్యత పర్యవేక్షణ' },
    subtitle: { en: 'pH • Oxygen • Ammonia • Temperature', te: 'pH • ఆక్సిజన్ • అమెమోనియా • ఉష్ణోగ్రత' },
    tag: { en: 'Live status', te: 'ప్రత్యక్ష స్థితి' },
    status: { en: 'Healthy', te: 'సమర్థవంతం' },
    accent: 'green',
    description: {
      en: 'Check pond water condition in real time and act early.',
      te: 'చెరువులోని నీటి స్థితిని నిజ సమయంలో చూడండి మరియు ముందుగా చర్య తీసుకోండి.',
    },
    detailTitle: { en: 'Water quality report', te: 'నీటి నాణ్యత నివేదిక' },
    detailText: {
      en: 'Parameters are stable and the pond is in healthy condition for fish growth.',
      te: 'పరామితులు స్థిరంగా ఉన్నాయి మరియు చేపల పెరుగుదలకు చెరువు ఆరోగ్యకరంగా ఉంద.',
    },
  },
  {
    id: 2,
    title: { en: 'Contact Technicians', te: 'టెక్నీషియన్లను సంప్రదించండి' },
    subtitle: { en: 'Fast support for pond issues', te: 'చెరువు సమస్యలకు వేగవంతమైన సహాయం' },
    tag: { en: '24/7 help', te: '24/7 సహాయం' },
    status: { en: 'Ready', te: 'సిద్ధంగా ఉంది' },
    accent: 'blue',
    description: {
      en: 'Connect with local technicians for quick assistance and repairs.',
      te: 'వేగవంతమైన సహాయం మరియు మరమ్మతుల కోసం స్థానిక టెక్నీషియన్లకు సంప్రదించండి.',
    },
    detailTitle: { en: 'Technician support', te: 'టెక్నీషియన్ సహాయం' },
    detailText: {
      en: 'A technician is available for on-site inspection and water treatment support.',
      te: 'సైట్ పరీక్ష మరియు నీటి చికిత్స సహాయానికి టెక్నీషియన్ అందుబాటులో ఉన్నాడు.',
    },
  },
  {
    id: 3,
    title: { en: 'Feed Monitoring', te: 'ఆహార పర్యవేక్షణ' },
    subtitle: { en: 'Daily feeding plan and usage', te: 'దినసరి ఆహారం ప్రణాళిక మరియు వినియోగం' },
    tag: { en: 'Smart feed', te: 'స్మార్ట్ ఫీడ్' },
    status: { en: 'Tracked', te: 'ట్రాక్ చేయబడింది' },
    accent: 'amber',
    description: {
      en: 'Track food intake and avoid overfeeding or underfeeding.',
      te: 'ఆహార వినియోగాన్ని ట్రాక్ చేసి అధికంగా లేదా తక్కువగా ఆహారం ఇవ్వడాన్ని నివారించండి.',
    },
    detailTitle: { en: 'Feed plan', te: 'ఆహార ప్రణాళిక' },
    detailText: {
      en: 'Feeding schedule is balanced to maintain healthy growth and lower waste.',
      te: 'ఆహార ప్రణాళిక సమతుల్యంగా ఉండి ఆరోగ్యకరమైన పెరుగుదల మరియు వ్యర్థాలను తగ్గిస్తుంది.',
    },
  },
  {
    id: 4,
    title: { en: 'Lab Appointment', te: 'లేబ్ అపాయింట్మెంట్' },
    subtitle: { en: 'Book sample testing and reports', te: 'నమూనా పరీక్ష మరియు నివేదికను బుక్ చేయండి' },
    tag: { en: 'Book now', te: 'ఇప్పుడే బుక్ చేయండి' },
    status: { en: 'Open', te: 'ఓపెన్' },
    accent: 'purple',
    description: {
      en: 'Schedule a lab test and receive trusted water analysis results.',
      te: 'లేబ్ పరీక్షను షెడ్యూల్ చేసి విశ్వసనీయ నీటి విశ్లేషణ ఫలితాలను పొందండి.',
    },
    detailTitle: { en: 'Lab booking', te: 'లేబ్ బుకింగ్' },
    detailText: {
      en: 'Your sample collection and result tracking can be booked in one simple flow.',
      te: 'మీ నమూనా సేకరణ మరియు ఫలిత ట్రాకింగ్ ఒక సరళ ప్రక్రియలో బుక్ చేయవచ్చు.',
    },
  },
  {
    id: 5,
    title: { en: 'New Trends', te: 'కొత్త ట్రెండ్స్' },
    subtitle: { en: 'Seasonal farming updates', te: 'సీజన్‌కి అనుగుణమైన వ్యవసాయ నవీకరణలు' },
    tag: { en: 'Latest', te: 'తాజా' },
    status: { en: 'New', te: 'కొత్త' },
    accent: 'orange',
    description: {
      en: 'Learn new methods, care tips, and pond management updates.',
      te: 'కొత్త పద్ధతులు, పర్యవేక్షణ చిట్కాలు మరియు చెరువు నిర్వహణ నవీకరణలను తెలుసుకోండి.',
    },
    detailTitle: { en: 'Farmer updates', te: 'రైతు అప్డేట్స్' },
    detailText: {
      en: 'Latest seasonal recommendations help improve pond health and fish productivity.',
      te: 'తాజా సీజన్ సిఫార్సులు చెరువు ఆరోగ్యాన్ని మెరుగుపరుస్తాయి మరియు చేప ఉత్పాదకతను పెంచుతాయి.',
    },
  },
]

import Tesseract from 'tesseract.js'

const PAYMENT_AMOUNT = 10

const waterMetrics = [
  { key: 'ph', label: 'pH', te: 'pH', basic: true },
  { key: 'dissolvedOxygen', label: 'Dissolved Oxygen', te: 'కరిగిన ఆక్సిజన్', basic: true },
  { key: 'ammonia', label: 'Ammonia', te: 'అమోనియా', basic: true },
  { key: 'nitrite', label: 'Nitrite', te: 'నైట్రైట్' },
  { key: 'nitrate', label: 'Nitrate', te: 'నైట్రేట్' },
  { key: 'salinity', label: 'Salinity', te: 'లవణీయత', basic: true },
  { key: 'turbidity', label: 'Turbidity', te: 'మసకదనం' },
  { key: 'temperature', label: 'Temperature', te: 'ఉష్ణోగ్రత', basic: true },
  { key: 'alkalinity', label: 'Alkalinity', te: 'క్షారత్వం' },
]

const basicWaterMetrics = waterMetrics.filter((metric) => metric.basic)
const advancedWaterMetrics = waterMetrics.filter((metric) => !metric.basic)

const createEmptyMetrics = () => ({
  ph: '',
  dissolvedOxygen: '',
  ammonia: '',
  nitrite: '',
  nitrate: '',
  salinity: '',
  turbidity: '',
  temperature: '',
  alkalinity: '',
})

const detectStatus = (metrics = {}) => {
  const requiredKeys = basicWaterMetrics.map((metric) => metric.key)
  if (requiredKeys.some((key) => !String(metrics[key] || '').trim())) return 'Unknown'
  const phValue = Number.parseFloat(metrics.ph)
  const doValue = Number.parseFloat(metrics.dissolvedOxygen)
  const ammoniaValue = Number.parseFloat(metrics.ammonia)
  const turbidityValue = Number.parseFloat(metrics.turbidity)

  if (phValue < 6.5 || phValue > 8.5 || doValue < 5 || ammoniaValue > 1 || turbidityValue > 30) {
    return 'Critical'
  }

  if (phValue < 7 || doValue < 6 || ammoniaValue > 0.5 || turbidityValue > 20) {
    return 'Warning'
  }

  return 'Healthy'
}

const parseWeatherCode = (code) => {
  if (code === 0) return 'Clear'
  if ([1, 2, 3].includes(code)) return 'Partly cloudy'
  if ([45, 48].includes(code)) return 'Foggy'
  if ([51, 53, 55, 56, 57, 61, 63, 65, 80, 81, 82].includes(code)) return 'Rainy'
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snowy'
  if ([95, 96, 99].includes(code)) return 'Stormy'
  return 'Cloudy'
}

const getFallbackWeather = () => ({
  condition: 'Sunny',
  temperature: 32,
  humidity: 65,
  windSpeed: 12,
})

const readMetric = (value, fallback) => {
  const parsed = Number.parseFloat(String(value ?? '').replace(/[^0-9.-]/g, ''))
  return Number.isFinite(parsed) ? parsed : fallback
}

const analysisText = {
  en: {
    summary: 'Review the risks below before the next feeding cycle.', healthy: 'Water quality looks healthy', routine: 'Continue routine monitoring and weekly testing.', complete: 'All measured values are within the expected safe zone for healthy fish growth.', missing: 'Retest or enter basic readings', noTreatment: 'Do not make treatment changes until missing readings are measured and confirmed.', accurate: 'An accurate pond assessment requires measured values rather than assumed defaults.', optional: 'Optional lab readings not available', phIssue: 'pH level is outside the safe range', phPrecaution: 'Adjust pH carefully using tested lime or buffering material.', phReason: (v) => `pH ${v} can stress fish and weaken immunity.`, doIssue: 'Dissolved oxygen is dangerously low', doPrecaution: 'Increase aeration immediately and reduce feeding for the next cycle.', doReason: (v) => `Fish need at least 5 mg/L DO. Current level is ${v} mg/L.`, ammoniaIssue: 'Ammonia level is elevated', ammoniaPrecaution: 'Increase water exchange, reduce feeding, and keep the pond oxygenated.', ammoniaReason: (v) => `Ammonia ${v} ppm is toxic above safe limits.`, nitriteIssue: 'Nitrite level is elevated', nitritePrecaution: 'Reduce feeding, improve biofiltration, and increase aeration and water exchange.', nitriteReason: (v) => `Nitrite ${v} ppm can interfere with oxygen transport in fish.`, nitrateIssue: 'Nitrate level is high', nitratePrecaution: 'Change part of the water and remove excess organic matter before increasing feed.', nitrateReason: (v) => `Nitrate ${v} ppm indicates nutrient buildup in the pond.`, salinityIssue: 'Salinity is outside the target range', salinityPrecaution: 'Check salinity again with a calibrated meter and adjust gradually, never suddenly.', salinityReason: (v) => `Salinity ${v} ppt may stress species adapted to a different range.`, turbidityIssue: 'Water is too cloudy or turbid', turbidityPrecaution: 'Reduce suspended solids and improve filtration or sediment settling.', turbidityReason: 'High turbidity blocks sunlight and raises stress for fish.', alkalinityIssue: 'Alkalinity is outside the target range', alkalinityPrecaution: 'Retest alkalinity and adjust gradually with professional guidance.', alkalinityReason: (v) => `Alkalinity ${v} ppm can make pH unstable or stress pond biology.`, tempIssue: 'Water temperature is outside the preferred range', tempPrecaution: 'Increase shade and aeration during heat, or reduce handling during cold conditions.', tempReason: (v) => `Water temperature ${v}°C can reduce feeding and increase fish stress.`, combinedIssue: 'High temperature and low oxygen together create a risk', combinedPrecaution: 'Use emergency aeration and reduce feeding by 50% until oxygen improves.', combinedReason: 'Warm water lowers oxygen retention and elevates fish stress.', missingReason: 'Optional lab readings not available', fallbackReason: 'An accurate pond assessment requires measured values rather than assumed defaults.'
  },
  te: {
    summary: 'తదుపరి ఆహారం ఇచ్చే ముందు క్రింది ప్రమాదాలను పరిశీలించండి.', healthy: 'నీటి నాణ్యత ఆరోగ్యకరంగా ఉంది', routine: 'నిరంతర పర్యవేక్షణ మరియు వారానికి ఒకసారి పరీక్ష కొనసాగించండి.', complete: 'అన్ని కొలిచిన విలువలు చేపల ఆరోగ్యకరమైన పెరుగుదలకు సురక్షిత పరిధిలో ఉన్నాయి.', missing: 'ప్రాథమిక రీడింగ్‌లను మళ్లీ పరీక్షించండి లేదా నమోదు చేయండి', noTreatment: 'రీడింగ్‌లు నిర్ధారించే వరకు చికిత్స మార్పులు చేయవద్దు.', accurate: 'ఖచ్చితమైన చెరువు అంచనాకు ఊహించిన విలువలు కాకుండా కొలిచిన విలువలు అవసరం.', optional: 'ఐచ్ఛిక ప్రయోగశాల రీడింగ్‌లు అందుబాటులో లేవు', phIssue: 'pH సురక్షిత పరిధికి బయట ఉంది', phPrecaution: 'పరీక్షించిన సున్నం లేదా బఫరింగ్ పదార్థంతో pHను జాగ్రత్తగా సర్దుబాటు చేయండి.', phReason: (v) => `pH ${v} చేపలకు ఒత్తిడి కలిగించవచ్చు.`, doIssue: 'కరిగిన ఆక్సిజన్ చాలా తక్కువగా ఉంది', doPrecaution: 'వెంటనే ఏరేషన్ పెంచి, తదుపరి ఆహారాన్ని తగ్గించండి.', doReason: (v) => `చేపలకు కనీసం 5 mg/L DO అవసరం. ప్రస్తుత విలువ ${v} mg/L.`, ammoniaIssue: 'అమోనియా స్థాయి ఎక్కువగా ఉంది', ammoniaPrecaution: 'నీటి మార్పిడి పెంచి, ఆహారం తగ్గించి, చెరువులో ఆక్సిజన్ ఉంచండి.', ammoniaReason: (v) => `అమోనియా ${v} ppm సురక్షిత పరిమితి దాటితే విషపూరితం.`, nitriteIssue: 'నైట్రైట్ స్థాయి ఎక్కువగా ఉంది', nitritePrecaution: 'ఆహారం తగ్గించి, బయోఫిల్టర్ మరియు ఏరేషన్ మెరుగుపరచండి.', nitriteReason: (v) => `నైట్రైట్ ${v} ppm చేపల ఆక్సిజన్ రవాణాను ప్రభావితం చేయవచ్చు.`, nitrateIssue: 'నైట్రేట్ స్థాయి ఎక్కువగా ఉంది', nitratePrecaution: 'కొంత నీటిని మార్చి అదనపు సేంద్రీయ పదార్థాన్ని తొలగించండి.', nitrateReason: (v) => `నైట్రేట్ ${v} ppm పోషకాల పేరుకుపోవడాన్ని సూచిస్తుంది.`, salinityIssue: 'లవణీయత లక్ష్య పరిధికి బయట ఉంది', salinityPrecaution: 'క్యాలిబ్రేట్ చేసిన మీటర్‌తో మళ్లీ పరీక్షించి నెమ్మదిగా సర్దుబాటు చేయండి.', salinityReason: (v) => `లవణీయత ${v} ppt చేపలకు ఒత్తిడి కలిగించవచ్చు.`, turbidityIssue: 'నీరు చాలా మసకగా ఉంది', turbidityPrecaution: 'సస్పెండెడ్ పదార్థాలను తగ్గించి వడపోత లేదా సెడిమెంట్ సెట్టిలింగ్ మెరుగుపరచండి.', turbidityReason: 'అధిక మసకదనం సూర్యకాంతిని అడ్డుకుని చేపల ఒత్తిడిని పెంచుతుంది.', alkalinityIssue: 'క్షారత్వం లక్ష్య పరిధికి బయట ఉంది', alkalinityPrecaution: 'క్షారత్వాన్ని మళ్లీ పరీక్షించి నెమ్మదిగా సర్దుబాటు చేయండి.', alkalinityReason: (v) => `క్షారత్వం ${v} ppm pHను అస్థిరం చేయవచ్చు.`, tempIssue: 'నీటి ఉష్ణోగ్రత అనుకూల పరిధికి బయట ఉంది', tempPrecaution: 'వేడి సమయంలో నీడ మరియు ఏరేషన్ పెంచండి.', tempReason: (v) => `నీటి ఉష్ణోగ్రత ${v}°C చేపల ఒత్తిడిని పెంచవచ్చు.`, combinedIssue: 'అధిక ఉష్ణోగ్రత మరియు తక్కువ ఆక్సిజన్ కలిసి ప్రమాదాన్ని పెంచుతున్నాయి', combinedPrecaution: 'అత్యవసర ఏరేషన్ వాడి ఆహారాన్ని 50% తగ్గించండి.', combinedReason: 'వెచ్చని నీటిలో ఆక్సిజన్ నిల్వ తగ్గుతుంది.', missingReason: 'ఐచ్ఛిక ప్రయోగశాల రీడింగ్‌లు అందుబాటులో లేవు', fallbackReason: 'ఖచ్చితమైన చెరువు అంచనాకు కొలిచిన విలువలు అవసరం.'
  },
}

const localizedWeatherCondition = (condition, language) => {
  if (language !== 'te') return condition
  return {
    Clear: 'స్పష్టమైన ఆకాశం',
    'Partly cloudy': 'కొంత మేఘావృతం',
    Foggy: 'మంచు',
    Rainy: 'వర్షం',
    Snowy: 'మంచు వర్షం',
    Stormy: 'తుఫాను',
    Cloudy: 'మేఘావృతం',
    Sunny: 'ఎండగా ఉంది',
  }[condition] || condition
}

const buildAnalysis = (waterQuality = {}, weather = getFallbackWeather(), language = 'en') => {
  const text = analysisText[language] || analysisText.en
  const phValue = readMetric(waterQuality.ph, null)
  const doValue = readMetric(waterQuality.dissolvedOxygen, null)
  const ammoniaValue = readMetric(waterQuality.ammonia, null)
  const nitriteValue = readMetric(waterQuality.nitrite, null)
  const nitrateValue = readMetric(waterQuality.nitrate, null)
  const salinityValue = readMetric(waterQuality.salinity, null)
  const turbidityValue = readMetric(waterQuality.turbidity, null)
  const alkalinityValue = readMetric(waterQuality.alkalinity, null)
  const tempValue = readMetric(waterQuality.temperature, weather.temperature || null)

  const analysisWeather = {
    condition: localizedWeatherCondition(weather.condition || 'Sunny', language),
    temperature: weather.temperature ?? (tempValue > 30 ? tempValue : 32),
    humidity: weather.humidity ?? 65,
    windSpeed: weather.windSpeed ?? 12,
    locationLabel: weather.locationLabel || 'Farm location',
  }

  const issues = []
  const precautions = []
  const reasons = []

  if (phValue !== null && (phValue < 6.5 || phValue > 8.5)) {
    issues.push(text.phIssue)
    precautions.push(text.phPrecaution)
    reasons.push(text.phReason(phValue))
  }

  if (doValue !== null && doValue < 5) {
    issues.push(text.doIssue)
    precautions.push(text.doPrecaution)
    reasons.push(text.doReason(doValue))
  }

  if (ammoniaValue !== null && ammoniaValue > 1) {
    issues.push(text.ammoniaIssue)
    precautions.push(text.ammoniaPrecaution)
    reasons.push(text.ammoniaReason(ammoniaValue))
  }

  if (nitriteValue !== null && nitriteValue > 0.5) {
    issues.push(text.nitriteIssue)
    precautions.push(text.nitritePrecaution)
    reasons.push(text.nitriteReason(nitriteValue))
  }

  if (nitrateValue !== null && nitrateValue > 40) {
    issues.push(text.nitrateIssue)
    precautions.push(text.nitratePrecaution)
    reasons.push(text.nitrateReason(nitrateValue))
  }

  if (salinityValue !== null && (salinityValue < 5 || salinityValue > 25)) {
    issues.push(text.salinityIssue)
    precautions.push(text.salinityPrecaution)
    reasons.push(text.salinityReason(salinityValue))
  }

  if (turbidityValue !== null && turbidityValue > 30) {
    issues.push(text.turbidityIssue)
    precautions.push(text.turbidityPrecaution)
    reasons.push(text.turbidityReason)
  }

  if (alkalinityValue !== null && (alkalinityValue < 60 || alkalinityValue > 200)) {
    issues.push(text.alkalinityIssue)
    precautions.push(text.alkalinityPrecaution)
    reasons.push(text.alkalinityReason(alkalinityValue))
  }

  if (tempValue !== null && (tempValue < 20 || tempValue > 32)) {
    issues.push(text.tempIssue)
    precautions.push(text.tempPrecaution)
    reasons.push(text.tempReason(tempValue))
  }

  if (analysisWeather.temperature > 30 && doValue !== null && doValue < 6) {
    issues.push(text.combinedIssue)
    precautions.push(text.combinedPrecaution)
    reasons.push(text.combinedReason)
  }

  const missingBasicMetrics = basicWaterMetrics
    .filter((metric) => !String(waterQuality[metric.key] || '').trim())
    .map((metric) => metric[language === 'te' ? 'te' : 'label'])
  const missingAdvancedMetrics = advancedWaterMetrics
    .filter((metric) => !String(waterQuality[metric.key] || '').trim())
    .map((metric) => metric[language === 'te' ? 'te' : 'label'])

  if (missingBasicMetrics.length > 0) {
    issues.push(`${text.missing}: ${missingBasicMetrics.join(', ')}`)
    precautions.push(text.noTreatment)
    reasons.push(text.accurate)
  }

  if (missingAdvancedMetrics.length > 0) {
    reasons.push(`${text.optional}: ${missingAdvancedMetrics.join(', ')}.`)
  }

  if (issues.length === 0) {
    issues.push(text.healthy)
    precautions.push(text.routine)
    reasons.push(text.complete)
  }

  return {
    summary: issues.length === 0 ? `${text.healthy}.` : text.summary,
    riskLevel: detectStatus(waterQuality),
    confidence: 0.72,
    issues,
    precautions,
    reasons,
    weather: analysisWeather,
    metrics: waterQuality,
  }
}

const createDefaultPonds = () => []

const copy = {
  en: {
    appTitle: 'Digital Aqua',
    farmer: 'Farmer-first platform',
    loginTitle: 'Login with mobile number',
    mobileLabel: 'Mobile Number',
    otpLabel: 'Enter OTP',
    sendOtp: 'Send OTP',
    verify: 'Verify & Continue',
    change: 'Change mobile number',
    dashboard: 'Farmer Dashboard',
    welcome: 'Welcome back',
    language: 'తెలుగు',
    back: 'Back',
    comingSoon: 'Coming soon',
    noPonds: 'No ponds added yet',
    noPondsText: 'Start by adding your first pond and upload the weekly report.',
    addField: 'Add Pond',
    fieldName: 'Pond name',
    saveField: 'Save pond',
    ocrTitle: 'Upload water report',
    ocrText: 'Upload the pond report image or water-test image to extract the latest readings.',
    extractData: 'Extract data',
    validateTitle: 'Validate water quality',
    validateText: 'Review the extracted values and confirm before saving the report.',
    confirm: 'Confirm & continue',
    paymentTitle: 'Report processing',
    paymentText: 'This is a mock payment screen for the MVP. Real payment will be added later.',
    payNow: 'Continue',
    uploadPhoto: 'Upload report image',
    selectFile: 'Choose file',
    previewAttached: 'Report attached',
    lastReport: 'Last report',
    noReports: 'No report yet',
    uploadNew: 'Upload report',
    viewPreviousAnalysis: 'View previous analysis',
    noPreviousAnalysis: 'No analysis yet',
    rename: 'Rename',
    delete: 'Delete',
    renamePond: 'Rename pond',
    confirmDelete: 'Delete pond',
    paymentsMock: 'Payment is mocked for now',
    takePhoto: 'Take Photo',
    readingReport: 'Reading report image',
    processingOcr: 'Processing OCR scan',
    location: 'Location',
    selectedPond: 'Selected pond',
    unknown: 'Unknown',
    extractedCount: (count, total) => `OCR extracted ${count} of ${total} readings. Review every value before continuing.`,
    noOcr: 'OCR could not confidently read any readings from this image. Enter measured values manually or upload a clearer report.',
    basicReadings: 'Basic readings',
    basicReadingsText: 'Confirm these essential values. We will use optional lab fields when the report provides them.',
    optionalReadings: 'Optional lab readings',
    optionalReadingsText: 'These fields are not required. Leave them blank if they are not present in the report.',
    detectedText: 'View text detected from report',
    paymentConfirmed: 'Payment confirmed',
    paymentMessage: (amount) => `₹${amount} has been charged. Analysis is in process and your water report will be reviewed shortly.`,
    viewAnalysis: 'View Analysis',
    analysisTitle: 'Water Quality Analysis Report',
    llamaAnalysis: 'Llama analysis based on your report and pond weather',
    localAnalysis: 'Verified local safety analysis used because the Llama response could not be validated',
    issues: 'Issues Identified',
    precautions: 'Precautions to Take',
    whyMatters: 'Why This Matters',
    done: 'Done',
    preparingAnalysis: 'Preparing your analysis',
    preparingText: 'Reviewing the confirmed readings with pond-location weather data...',
    weather: 'Weather',
    temp: 'Temp',
    humidity: 'Humidity',
    ocrReading: 'Reading report image',
    ocrError: 'OCR could not finish reading this image. You can enter the basic readings manually.',
    complexTable: 'This looks like a laboratory table report. Please verify each field manually because table columns can be read out of order.',
    pondPlaceholder: 'North Pond',
    locationPlaceholder: 'Village or city name, e.g. Guntur, Andhra Pradesh',
    notSet: 'Not set',
    statusHealthy: 'Healthy',
    statusWarning: 'Warning',
    statusCritical: 'Critical',
  },
  te: {
    appTitle: 'డిజిటల్ అక్వా',
    farmer: 'రైతు-ముందుంచు ప్లాట్ఫారమ్',
    loginTitle: 'మొబైల్ నంబరుతో లాగిన్ చేయండి',
    mobileLabel: 'మొబైల్ నంబర్',
    otpLabel: 'OTP నమోదు చేయండి',
    sendOtp: 'OTP పంపండి',
    verify: 'నిర్ధారించి కొనసాగండి',
    change: 'మొబైల్ నంబర్ మార్చండి',
    dashboard: 'రైతు డాష్‌బోర్డ్',
    welcome: 'మరలా స్వాగతం',
    language: 'English',
    back: 'వెనుకకు',
    comingSoon: 'త్వరలో వస్తుంది',
    noPonds: 'ఇంకా చెరువులు జోడించబడలేదు',
    noPondsText: 'మీ మొదటి చెరువును జోడించి వారపు నివేదికను అప్‌లోడ్ చేయండి.',
    addField: 'చెరువు జోడించండి',
    fieldName: 'చెరువు పేరు',
    saveField: 'చెరువును సేవ్ చేయండి',
    ocrTitle: 'నీటి నివేదికను అప్‌లోడ్ చేయండి',
    ocrText: 'చెరువు రిపోర్ట్ ఇమేజ్ లేదా నీటి పరీక్ష చిత్రాన్ని అప్‌లోడ్ చేసి డేటాను తీసుకోండి.',
    extractData: 'డేటాను తీసుకోండి',
    validateTitle: 'నీటి నాణ్యతను ధృవీకరించండి',
    validateText: 'ఎక్స్‌ట్రాక్ట్ అయిన విలువలను పరిశీలించి సేవ్ చేయడానికి నిర్ధారించండి.',
    confirm: 'నిర్ధారించి కొనసాగండి',
    paymentTitle: 'నివేదిక ప్రాసెసింగ్',
    paymentText: 'ఇది MVP కోసం మాక్ చెల్లింపు స్క్రీన్. వాస్తవ చెల్లింపు తర్వాత జోడించబడుతుంది.',
    payNow: 'కొనసాగించండి',
    uploadPhoto: 'నివేదిక ఇమేజ్‌ను అప్‌లోడ్ చేయండి',
    selectFile: 'ఫైల్ ఎంచుకోండి',
    previewAttached: 'రిపోర్ట్ అటాచ్ చేయబడింది',
    lastReport: 'చివరి నివేదిక',
    noReports: 'ఇంకా నివేదిక లేదు',
    uploadNew: 'నివేదిక అప్‌లోడ్ చేయండి',
    viewPreviousAnalysis: 'మునుపటి విశ్లేషణ చూడండి',
    noPreviousAnalysis: 'ఇంకా విశ్లేషణ లేదు',
    rename: 'పేరు మార్చండి',
    delete: 'తొలగించండి',
    renamePond: 'చెరువు పేరును మార్చండి',
    confirmDelete: 'చెరువును తొలగించండి',
    paymentsMock: 'చెల్లింపు మాక్‌లో ఉంది',
    takePhoto: 'ఫోటో తీయండి',
    readingReport: 'నివేదిక చిత్రాన్ని చదువుతోంది',
    processingOcr: 'OCR స్కాన్ ప్రాసెస్ అవుతోంది',
    location: 'ప్రదేశం',
    selectedPond: 'ఎంచుకున్న చెరువు',
    unknown: 'తెలియదు',
    extractedCount: (count, total) => `OCR ${total}లో ${count} రీడింగ్‌లను తీసుకుంది. కొనసాగించే ముందు ప్రతి విలువను పరిశీలించండి.`,
    noOcr: 'ఈ చిత్రంలో OCR రీడింగ్‌లను గుర్తించలేకపోయింది. విలువలను చేతితో నమోదు చేయండి లేదా స్పష్టమైన నివేదికను అప్‌లోడ్ చేయండి.',
    basicReadings: 'ప్రాథమిక రీడింగ్‌లు',
    basicReadingsText: 'ఈ ముఖ్యమైన విలువలను నిర్ధారించండి. నివేదికలో ఉంటే ఐచ్ఛిక విలువలను కూడా ఉపయోగిస్తాము.',
    optionalReadings: 'ఐచ్ఛిక ప్రయోగశాల రీడింగ్‌లు',
    optionalReadingsText: 'ఈ విలువలు తప్పనిసరి కాదు. నివేదికలో లేకపోతే ఖాళీగా ఉంచండి.',
    detectedText: 'నివేదిక నుండి గుర్తించిన వచనాన్ని చూడండి',
    paymentConfirmed: 'చెల్లింపు నిర్ధారించబడింది',
    paymentMessage: (amount) => `₹${amount} వసూలు చేయబడింది. విశ్లేషణ కొనసాగుతోంది.`,
    viewAnalysis: 'విశ్లేషణ చూడండి',
    analysisTitle: 'నీటి నాణ్యత విశ్లేషణ నివేదిక',
    llamaAnalysis: 'మీ నివేదిక మరియు చెరువు వాతావరణంపై ఆధారపడిన Llama విశ్లేషణ',
    localAnalysis: 'Llama సమాధానాన్ని నిర్ధారించలేకపోవడంతో స్థానిక భద్రతా విశ్లేషణ ఉపయోగించబడింది',
    issues: 'గుర్తించిన సమస్యలు',
    precautions: 'తీసుకోవాల్సిన జాగ్రత్తలు',
    whyMatters: 'ఇది ఎందుకు ముఖ్యమైనది',
    done: 'ముగించు',
    preparingAnalysis: 'మీ విశ్లేషణను సిద్ధం చేస్తోంది',
    preparingText: 'ధృవీకరించిన రీడింగ్‌లు మరియు చెరువు ప్రదేశ వాతావరణాన్ని పరిశీలిస్తోంది...',
    weather: 'వాతావరణం',
    temp: 'ఉష్ణోగ్రత',
    humidity: 'తేమ',
    ocrReading: 'నివేదిక చిత్రాన్ని చదువుతోంది',
    ocrError: 'ఈ చిత్రాన్ని OCR పూర్తిగా చదవలేకపోయింది. ప్రాథమిక రీడింగ్‌లను చేతితో నమోదు చేయవచ్చు.',
    complexTable: 'ఇది ప్రయోగశాల పట్టిక నివేదికలా కనిపిస్తోంది. పట్టిక కాలమ్‌లు మారిపోవచ్చు కాబట్టి ప్రతి విలువను చేతితో నిర్ధారించండి.',
    pondPlaceholder: 'ఉత్తర చెరువు',
    locationPlaceholder: 'గ్రామం లేదా నగరం పేరు, ఉదా. గుంటూరు, ఆంధ్రప్రదేశ్',
    notSet: 'సెట్ చేయలేదు',
    statusHealthy: 'ఆరోగ్యకరం',
    statusWarning: 'హెచ్చరిక',
    statusCritical: 'తీవ్రం',
  },
}

export default function App() {
  const [mobile, setMobile] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [language, setLanguage] = useState('en')
  const [selectedCard, setSelectedCard] = useState(null)
  const [ponds, setPonds] = useState(() => {
    const saved = localStorage.getItem('digital-aqua-ponds')
    if (!saved) return createDefaultPonds()
    try {
      return JSON.parse(saved)
    } catch {
      return createDefaultPonds()
    }
  })
  const [selectedPondId, setSelectedPondId] = useState(null)
  const [waterFlow, setWaterFlow] = useState('list')
  const [pondDraft, setPondDraft] = useState('')
  const [pondLocationDraft, setPondLocationDraft] = useState('')
  const [ocrData, setOcrData] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [editingValues, setEditingValues] = useState(null)
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [analysisLoading, setAnalysisLoading] = useState(false)
  const [analysisSource, setAnalysisSource] = useState('rules')
  const [ocrProgress, setOcrProgress] = useState(0)
  const [ocrError, setOcrError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [renamingPondId, setRenamingPondId] = useState(null)
  const [renamingDraft, setRenamingDraft] = useState('')

  const t = copy[language]
  const selectedPond = ponds.find((pond) => pond.id === selectedPondId) || null
  const statusLabel = (status) => ({
    Healthy: t.statusHealthy,
    Warning: t.statusWarning,
    Critical: t.statusCritical,
    Unknown: t.unknown,
  }[status] || status)

  useEffect(() => {
    localStorage.setItem('digital-aqua-ponds', JSON.stringify(ponds))
  }, [ponds])

  useEffect(() => {
    if (!selectedPondId && ponds.length > 0) {
      setSelectedPondId(ponds[0].id)
    }
  }, [ponds, selectedPondId])

  const handleSendOtp = (e) => {
    e.preventDefault()
    if (mobile.trim().length >= 10) setOtpSent(true)
  }

  const handleVerifyOtp = (e) => {
    e.preventDefault()
    if (otp.trim().length >= 4) {
      setIsLoggedIn(true)
      setSelectedCard(null)
    }
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
    setWaterFlow('list')
  }

  const handleAddPond = () => {
    setWaterFlow('addPond')
    setPondDraft('')
    setPondLocationDraft('')
  }

  const getWeatherForLocation = async (locationName) => {
    const fallback = { ...getFallbackWeather(), locationLabel: locationName || 'Farm location' }
    const safeLocation = (locationName || '').trim()
    if (!safeLocation) return fallback

    try {
      const parts = safeLocation.split(',').map((part) => part.trim()).filter(Boolean)
      const searchNames = [...new Set([
        safeLocation,
        parts[0],
        parts.slice(0, 2).join(', '),
        `${parts[0]}, India`,
      ].filter(Boolean))]
      let result = null

      for (const searchName of searchNames) {
        const searchUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchName)}&count=10&language=en&format=json`
        const searchResponse = await fetch(searchUrl)
        if (!searchResponse.ok) continue
        const searchData = await searchResponse.json()
        const candidates = searchData.results || []
        result = candidates.find((candidate) => candidate.country_code === 'IN') || candidates[0]
        if (result) break
      }

      if (!result) {
        const osmUrl = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&countrycodes=in&q=${encodeURIComponent(safeLocation)}`
        const osmResponse = await fetch(osmUrl, { headers: { Accept: 'application/json' } })
        if (osmResponse.ok) {
          const osmResults = await osmResponse.json()
          const osmResult = osmResults[0]
          if (osmResult) {
            result = {
              latitude: Number(osmResult.lat),
              longitude: Number(osmResult.lon),
              name: osmResult.display_name,
            }
          }
        }
      }

      if (!result) return fallback

      const latitude = result.latitude
      const longitude = result.longitude
      const placeName = [result.name, result.admin1, result.country].filter(Boolean).join(', ')

      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
      const response = await fetch(weatherUrl)
      if (!response.ok) throw new Error('Weather request failed')
      const data = await response.json()
      const current = data.current || {}

      return {
        condition: parseWeatherCode(Number(current.weather_code ?? 0)),
        temperature: Number(current.temperature_2m ?? 32),
        humidity: Number(current.relative_humidity_2m ?? 65),
        windSpeed: Number(current.wind_speed_10m ?? 12),
        locationLabel: placeName || safeLocation,
      }
    } catch {
      return fallback
    }
  }

  const parseOcrValues = (rawText = '') => {
    const text = String(rawText || '')
      .replace(/[|]/g, 'I')
      .replace(/[;,]/g, ':')
      .replace(/(?:\r?\n)+/g, '\n')
    const lines = text.split('\n').map((line) => line.trim()).filter(Boolean)
    const pickValue = (labels) => {
      const labelPattern = labels.join('|')
      const pattern = new RegExp(`(?:^|\\b)(?:${labelPattern})\\s*(?:reading|value)?\\s*[:=\\-]?\\s*([0-9]+(?:[.,][0-9]+)?)\\s*(mg\\s*[/l1]|ppm|ppt|psu|ntu|°?c)?\\b`, 'i')
      const separateValuePattern = /([0-9]+(?:[.,][0-9]+)?)\s*(mg\s*[/l1]|ppm|ppt|psu|ntu|°?c)?\b/i
      for (let index = 0; index < lines.length; index += 1) {
        if (/optimum|reference|unit|level/i.test(lines[index])) continue
        const match = lines[index].match(pattern) || lines[index + 1]?.match(pattern)
        if (match) return `${match[1].replace(',', '.')}${match[2] ? ` ${match[2].replace(/l1/i, 'L')}` : ''}`
        const labelOnly = new RegExp(`(?:^|\\b)(?:${labelPattern})\\b`, 'i').test(lines[index])
        if (labelOnly && lines[index + 1]) {
          const nextValue = lines[index + 1].match(separateValuePattern)
          if (nextValue) return `${nextValue[1].replace(',', '.')}${nextValue[2] ? ` ${nextValue[2].replace(/l1/i, 'L')}` : ''}`
        }
      }
      return ''
    }

    const metrics = {
      ph: pickValue(['pH', 'PH']),
      dissolvedOxygen: pickValue(['dissolved\\s+oxygen', 'DO', 'oxygen']),
      ammonia: pickValue(['ammonia', 'NH3']),
      nitrite: pickValue(['nitrite', 'NO2']),
      nitrate: pickValue(['nitrate', 'NO3']),
      salinity: pickValue(['salinity']),
      turbidity: pickValue(['turbidity', 'NTU']),
      temperature: pickValue(['temperature', 'temp']),
      alkalinity: pickValue(['alkalinity']),
    }

    const resultLine = lines.find((line) => /acres?/i.test(line) && (line.match(/\d+(?:[.,]\d+)?/g) || []).length >= 6)
    if (resultLine) {
      const resultNumbers = resultLine
        .replace(/\d+(?:[.,]\d+)?\s*acres?/i, 'acres')
        .match(/\d+(?:[.,]\d+)?/g)
        ?.map((value) => Number(value.replace(',', '.'))) || []
      const phIndex = resultNumbers.findIndex((value) => value >= 6.5 && value <= 8.5)
      if (!metrics.ph && phIndex >= 0) metrics.ph = String(resultNumbers[phIndex])
      if (!metrics.salinity && phIndex > 1) {
        const possibleSalinity = resultNumbers[phIndex - 1]
        if (possibleSalinity >= 0 && possibleSalinity <= 60) metrics.salinity = `${possibleSalinity} ppt`
      }
      const possibleAlkalinity = resultNumbers[phIndex + 1]
      if (phIndex >= 0 && !metrics.alkalinity && possibleAlkalinity >= 0 && possibleAlkalinity <= 500) {
        metrics.alkalinity = `${possibleAlkalinity} ppm`
      }
      if (phIndex >= 0 && !metrics.ammonia) {
        const possibleAmmonia = resultNumbers.slice(phIndex + 1).find((value) => value > 0 && value <= 5 && value !== possibleAlkalinity)
        if (possibleAmmonia !== undefined) metrics.ammonia = `${possibleAmmonia} ppm`
      }
    }

    const suffixMap = {
      dissolvedOxygen: ' mg/L',
      ammonia: ' ppm',
      nitrite: ' ppm',
      nitrate: ' ppm',
      salinity: ' ppt',
      turbidity: ' NTU',
      temperature: '°C',
      alkalinity: ' ppm',
    }

    const normalized = Object.fromEntries(Object.entries(metrics).map(([key, value]) => {
      if (!value) return [key, '']
      const trimmed = String(value).replace(/\s*(?:mg\s*\/\s*L|ppm|ppt|psu|ntu|°C|C)\s*$/i, '').trim()
      return [key, `${trimmed}${suffixMap[key] || ''}`]
    }))

    const isTableReport = /water\s+analysis|plankton|alkalinity|salinity|ammonia/i.test(text) && /\|{2,}|\bppm\b|\bmg\/?l\b/i.test(text)
    return { values: normalized, rawText: text, extractedCount: Object.values(normalized).filter(Boolean).length, isTableReport }
  }

  const prepareOcrImage = (file) => new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      const scale = Math.min(1.8, Math.max(1, 1400 / image.width))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(image.width * scale)
      canvas.height = Math.round(image.height * scale)
      const context = canvas.getContext('2d', { willReadFrequently: true })
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      for (let index = 0; index < imageData.data.length; index += 4) {
        const gray = (imageData.data[index] * 0.299) + (imageData.data[index + 1] * 0.587) + (imageData.data[index + 2] * 0.114)
        const contrast = Math.max(0, Math.min(255, ((gray - 128) * 1.45) + 128))
        imageData.data[index] = contrast
        imageData.data[index + 1] = contrast
        imageData.data[index + 2] = contrast
      }
      context.putImageData(imageData, 0, 0)
      URL.revokeObjectURL(image.src)
      resolve(canvas)
    }
    image.onerror = reject
    image.src = URL.createObjectURL(file)
  })

  const runOcr = async (image) => {
    const { data } = await Tesseract.recognize(image, 'eng', {
      logger: (message) => {
        const progress = Math.round((message.progress || 0) * 100)
        if (message.status === 'recognizing text') setOcrProgress(Math.max(10, progress))
        if (message.status === 'loading tesseract core') setOcrProgress(5)
        if (message.status === 'initializing api') setOcrProgress(8)
        if (message.status === 'loading language traineddata') setOcrProgress(10)
        if (message.status === 'initializing tesseract') setOcrProgress(12)
      },
      config: {
        tessedit_pageseg_mode: '6',
        preserve_interword_spaces: '1',
      },
    })
    return parseOcrValues(data.text)
  }

  const runOcrWithTimeout = (image, timeoutMs = 90000) => Promise.race([
    runOcr(image),
    new Promise((_, reject) => {
      window.setTimeout(() => reject(new Error('OCR timed out')), timeoutMs)
    }),
  ])

  const enrichOcrWithLlama = async (parsed) => {
    if (!parsed.rawText.trim()) return parsed

    try {
      const response = await fetch('/api/extract-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText: parsed.rawText }),
      })
      if (!response.ok) return parsed
      const data = await response.json()
      const modelValues = data.extraction?.values || {}
      const limits = {
        ph: [0, 14], dissolvedOxygen: [0, 25], ammonia: [0, 5], nitrite: [0, 10], nitrate: [0, 200],
        salinity: [0, 60], turbidity: [0, 500], temperature: [-5, 60], alkalinity: [0, 500],
      }
      const values = Object.fromEntries(Object.entries(parsed.values).map(([key, localValue]) => {
        if (localValue) return [key, localValue]
        const candidate = String(modelValues[key] || '')
        const number = Number.parseFloat(candidate.replace(/[^0-9.-]/g, ''))
        const [minimum, maximum] = limits[key] || [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY]
        return [key, candidate && Number.isFinite(number) && number >= minimum && number <= maximum ? candidate : '']
      }))
      return {
        ...parsed,
        values,
        extractedCount: Object.values(values).filter(Boolean).length,
        extractionSource: parsed.isTableReport ? 'OCR + conservative Llama table review' : 'Tesseract OCR + Llama review',
        extractionWarnings: data.extraction?.warnings || [],
      }
    } catch {
      return parsed
    }
  }

  const extractOcrFromImage = async (file) => {
    if (!file) return

    setIsProcessing(true)
    setOcrProgress(0)
    setOcrError('')

    try {
      setOcrProgress(3)
      const preparedImage = await prepareOcrImage(file)
      setOcrProgress(15)
      const parsed = await runOcrWithTimeout(preparedImage)
      setOcrProgress(95)
      setOcrData({
        name: selectedPond?.name || 'Farm pond',
        ...parsed.values,
        rawText: parsed.rawText,
        extractedCount: parsed.extractedCount,
        isTableReport: parsed.isTableReport,
        extractionSource: parsed.extractionSource || 'Tesseract OCR with conservative table parsing',
        extractionWarnings: parsed.extractionWarnings || [],
      })
      setEditingValues(null)
    } catch {
      setOcrError(t.ocrError)
      setOcrData({
        name: selectedPond?.name || 'Farm pond',
        ...createEmptyMetrics(),
        rawText: '',
        extractedCount: 0,
        isTableReport: false,
      })
    } finally {
      setIsProcessing(false)
      setOcrProgress(0)
    }
  }

  const savePond = () => {
    if (!pondDraft.trim() || !pondLocationDraft.trim()) return

    const newPond = {
      id: Date.now(),
      name: pondDraft.trim(),
      location: pondLocationDraft.trim(),
      status: 'Unknown',
      metrics: createEmptyMetrics(),
      reports: [],
    }

    setPonds((prev) => [...prev, newPond])
    setSelectedPondId(newPond.id)
    setWaterFlow('upload')
    setOcrData({ name: newPond.name, ...createEmptyMetrics(), rawText: '', extractedCount: 0 })
    setUploadedFile(null)
    setEditingValues(null)
    setPaymentConfirmed(false)
    setAnalysisResult(null)
  }

  const handleDeletePond = (pondId) => {
    const nextPonds = ponds.filter((pond) => pond.id !== pondId)
    setPonds(nextPonds)
    if (selectedPondId === pondId) {
      setSelectedPondId(nextPonds[0]?.id ?? null)
    }
    if (nextPonds.length === 0) {
      setWaterFlow('list')
    }
  }

  const handleRenamePond = (pondId) => {
    const pond = ponds.find((item) => item.id === pondId)
    if (!pond) return

    setRenamingPondId(pondId)
    setRenamingDraft(pond.name)
  }

  const saveInlinePondName = () => {
    if (!renamingPondId) return

    const trimmed = renamingDraft.trim()
    if (!trimmed) return

    setPonds((prev) =>
      prev.map((pond) =>
        pond.id === renamingPondId ? { ...pond, name: trimmed } : pond,
      ),
    )
    setRenamingPondId(null)
    setRenamingDraft('')
  }

  const startReportFlow = (pondId) => {
    setSelectedPondId(pondId)
    setWaterFlow('upload')
    setOcrData(null)
    setUploadedFile(null)
    setEditingValues(null)
    setPaymentConfirmed(false)
    setAnalysisResult(null)
    setAnalysisSource('rules')
  }

  const viewPreviousAnalysis = (pondId) => {
    const pond = ponds.find((item) => item.id === pondId)
    if (!pond?.analysis) return

    setSelectedPondId(pondId)
    setAnalysisResult(pond.analysis.result)
    setAnalysisSource(pond.analysis.source || 'rules')
    setPaymentConfirmed(true)
    setAnalysisLoading(false)
    setWaterFlow('analysis')
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadedFile(file)
    await extractOcrFromImage(file)
  }

  const handleCameraCapture = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadedFile(file)
    await extractOcrFromImage(file)
  }

  const handleExtractData = () => {
    if (!ocrData) {
      setOcrData({
        name: selectedPond?.name || 'Farm pond',
        ...createEmptyMetrics(),
        rawText: '',
        extractedCount: 0,
        isTableReport: false,
      })
    }
    setWaterFlow('validate')
  }

  const handleConfirm = () => {
    setPaymentConfirmed(false)
    setAnalysisResult(null)
    setWaterFlow('payment')
  }

  const handlePayment = () => {
    setPaymentConfirmed(true)
  }

  const proceedToAnalysis = async () => {
    setWaterFlow('analysis')
    setAnalysisLoading(true)
    const weatherForLocation = await getWeatherForLocation(selectedPond?.location || '')
    const displayWeather = {
      ...weatherForLocation,
      condition: localizedWeatherCondition(weatherForLocation.condition, language),
    }
    const metricSource = ocrData || selectedPond?.metrics || createEmptyMetrics()
    const analysisMetrics = Object.fromEntries(waterMetrics.map((metric) => [metric.key, metricSource[metric.key] || '']))
    const fallbackAnalysis = buildAnalysis(metricSource, displayWeather, language)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pond: { name: selectedPond?.name || 'Farm pond', location: selectedPond?.location || 'Unknown' },
          metrics: analysisMetrics,
          weather: weatherForLocation,
          language,
        }),
      })
      if (!response.ok) throw new Error(`AI analysis unavailable (${response.status})`)
      const data = await response.json()
      const generatedFields = [data.analysis?.summary, ...(data.analysis?.issues || []), ...(data.analysis?.precautions || []), ...(data.analysis?.reasons || [])].filter(Boolean)
      const generatedText = generatedFields.join(' ')
      const hasTelugu = generatedFields.length > 0 && generatedFields.every((field) => /[\u0C00-\u0C7F]/.test(field) || /^[\d\s.,:%°/+-]+$/.test(field))
      const missingMetricLabels = waterMetrics
        .filter((metric) => !String(analysisMetrics[metric.key] || '').trim())
        .map((metric) => metric.label)
      const inventsMissingValue = missingMetricLabels.some((label) => new RegExp(`${label}[^.]{0,40}\\d`, 'i').test(generatedText))
      const matchesVerifiedRisk = data.analysis?.riskLevel === fallbackAnalysis.riskLevel
      if ((language === 'te' && !hasTelugu) || inventsMissingValue || !matchesVerifiedRisk) {
        setAnalysisResult(fallbackAnalysis)
        setAnalysisSource('rules')
        setPonds((prev) => prev.map((pond) => pond.id === selectedPond?.id
          ? { ...pond, analysis: { result: fallbackAnalysis, source: 'rules', analyzedAt: new Date().toISOString() } }
          : pond))
      } else {
        const completedAnalysis = { ...fallbackAnalysis, ...data.analysis, weather: displayWeather, metrics: analysisMetrics }
        setAnalysisResult(completedAnalysis)
        setAnalysisSource('Llama AI')
        setPonds((prev) => prev.map((pond) => pond.id === selectedPond?.id
          ? { ...pond, analysis: { result: completedAnalysis, source: 'Llama AI', analyzedAt: new Date().toISOString() } }
          : pond))
      }
    } catch {
      setAnalysisResult(fallbackAnalysis)
      setAnalysisSource('rules')
      setPonds((prev) => prev.map((pond) => pond.id === selectedPond?.id
        ? { ...pond, analysis: { result: fallbackAnalysis, source: 'rules', analyzedAt: new Date().toISOString() } }
        : pond))
    } finally {
      setAnalysisLoading(false)
    }
  }

  const handleBackFromFlow = () => {
    setWaterFlow('list')
    setPondDraft('')
    setPondLocationDraft('')
    setOcrData(null)
    setUploadedFile(null)
    setEditingValues(null)
    setPaymentConfirmed(false)
    setAnalysisResult(null)
    setAnalysisLoading(false)
  }

  const saveReport = () => {
    if (!selectedPond) return null

    const finalMetrics = {
      ...selectedPond.metrics,
      ...Object.fromEntries(
        waterMetrics.map((metric) => [metric.key, editingValues?.[metric.key] ?? ocrData?.[metric.key] ?? selectedPond.metrics?.[metric.key] ?? '']),
      ),
    }

    const finalReport = {
      id: Date.now(),
      uploadedAt: new Date().toISOString(),
      fileName: uploadedFile?.name || 'weekly-report.png',
      metrics: finalMetrics,
    }

    setPonds((prev) =>
      prev.map((pond) =>
        pond.id === selectedPond.id
          ? {
              ...pond,
              status: detectStatus(finalMetrics),
              metrics: finalMetrics,
              reports: [finalReport, ...(pond.reports || [])],
            }
          : pond,
      ),
    )

    setEditingValues(null)
    setAnalysisResult(null)
    return finalMetrics
  }

  const confirmAndSave = () => {
    const savedMetrics = saveReport()
    if (savedMetrics) setOcrData((previous) => ({ ...previous, ...savedMetrics }))
    handleConfirm()
  }

  if (isLoggedIn && selectedCard) {
    if (selectedCard.id === 1) {
      return (
        <div className="app-shell detail-view">
          <div className="dashboard-panel detail-panel">
            <header className="topbar detail-topbar">
              <button className="back-btn" onClick={() => setSelectedCard(null)}>{t.back}</button>
              <button className="lang-btn" onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}>
                {t.language}
              </button>
            </header>

            <div className="detail-card water-detail-card">
              <span className={`detail-tag ${selectedCard.accent}`}>{selectedCard.tag[language]}</span>
              <h2>{selectedCard.title[language]}</h2>
              <p className="detail-subtitle">{selectedCard.subtitle[language]}</p>

              {waterFlow === 'addPond' && (
                <div className="detail-box upload-box-wrapper">
                  <h3>{t.fieldName}</h3>
                  <div className="field-form-box">
                    <input
                      type="text"
                      value={pondDraft}
                      onChange={(e) => setPondDraft(e.target.value)}
                      placeholder={t.pondPlaceholder}
                    />
                    <input
                      type="text"
                      value={pondLocationDraft}
                      onChange={(e) => setPondLocationDraft(e.target.value)}
                      placeholder={t.locationPlaceholder}
                    />
                  </div>
                  <button className="primary-btn detail-button" onClick={savePond}>{t.saveField}</button>
                  <button className="secondary-btn detail-button" onClick={() => setWaterFlow('list')}>{t.back}</button>
                </div>
              )}

              {waterFlow === 'upload' && (
                <div className="detail-box upload-box-wrapper">
                  <h3>{t.ocrTitle}</h3>
                  <p>{t.ocrText}</p>

                  <div className="upload-options">
                    <label className="upload-box big-upload-box upload-option-btn">
                      <span>📷</span>
                      <p>{t.takePhoto}</p>
                      <input type="file" accept="image/*" capture="environment" onChange={handleCameraCapture} />
                    </label>

                    <label className="upload-box big-upload-box upload-option-btn">
                      <span>📁</span>
                      <p>{t.selectFile}</p>
                      <input type="file" accept="image/*" onChange={handleFileUpload} />
                    </label>
                  </div>

                  {uploadedFile && (
                    <div className="file-preview">
                      <p>{t.previewAttached}: {uploadedFile.name}</p>
                    </div>
                  )}

                  <div className="status-summary-box">
                    <h3>{selectedPond?.name || t.selectedPond}</h3>
                    <p><strong>{t.location}:</strong> {selectedPond?.location || t.unknown}</p>
                    <p>{t.lastReport}: {selectedPond?.reports?.length ? new Date(selectedPond.reports[0].uploadedAt).toLocaleDateString() : t.noReports}</p>
                  </div>

                  {isProcessing && (
                    <div className="detail-box">
                      <h3>{t.ocrReading}</h3>
                      <p>{t.processingOcr}: {ocrProgress}%</p>
                    </div>
                  )}

                  {ocrError && <p className="ocr-result-note warning">{ocrError}</p>}

                  <button className="primary-btn detail-button" onClick={handleExtractData} disabled={isProcessing}>{isProcessing ? `${t.readingReport}... ${ocrProgress}%` : t.extractData}</button>
                  <button className="secondary-btn detail-button" onClick={handleBackFromFlow}>{t.back}</button>
                </div>
              )}

              {waterFlow === 'validate' && ocrData && (
                <div className="detail-box validation-box">
                  <h3>{t.validateTitle}</h3>
                  <p>{t.validateText}</p>
                  <p className={`ocr-result-note ${ocrData.extractedCount ? '' : 'warning'}`}>
                    {ocrData.extractedCount
                      ? t.extractedCount(ocrData.extractedCount, waterMetrics.length)
                      : t.noOcr}
                  </p>
                      <p className="ocr-result-note">{ocrData.extractionSource || 'Tesseract OCR'}</p>
                      {ocrData.extractionWarnings?.map((warning) => <p className="ocr-result-note warning" key={warning}>{warning}</p>)}
                      {ocrData.isTableReport && <p className="ocr-result-note warning">{t.complexTable}</p>}
                  {ocrData.rawText && (
                    <details className="ocr-debug">
                      <summary>{t.detectedText}</summary>
                      <pre>{ocrData.rawText}</pre>
                    </details>
                  )}
                  <h4 className="validation-group-title">{t.basicReadings}</h4>
                  <p className="validation-group-text">{t.basicReadingsText}</p>
                  <div className="validate-list">
                    {basicWaterMetrics.map((metric) => (
                      <div key={metric.key} className="validate-item">
                        <span>{metric[language === 'te' ? 'te' : 'label']}</span>
                        <input
                          type="text"
                          value={editingValues?.[metric.key] ?? (ocrData[metric.key] || '')}
                          onChange={(e) =>
                            setEditingValues((prev) => ({
                              ...prev,
                              [metric.key]: e.target.value,
                            }))
                          }
                          className="validate-input"
                        />
                      </div>
                    ))}
                  </div>
                  <details className="optional-readings">
                    <summary>{t.optionalReadings}</summary>
                    <p className="validation-group-text">{t.optionalReadingsText}</p>
                    <div className="validate-list">
                      {advancedWaterMetrics.map((metric) => (
                        <div key={metric.key} className="validate-item">
                          <span>{metric[language === 'te' ? 'te' : 'label']}</span>
                          <input
                            type="text"
                            value={editingValues?.[metric.key] ?? (ocrData[metric.key] || '')}
                            onChange={(e) =>
                              setEditingValues((prev) => ({
                                ...prev,
                                [metric.key]: e.target.value,
                              }))
                            }
                            className="validate-input"
                          />
                        </div>
                      ))}
                    </div>
                  </details>
                  <button className="primary-btn detail-button" onClick={confirmAndSave}>{t.confirm}</button>
                  <button className="secondary-btn detail-button" onClick={() => setWaterFlow('upload')}>{t.back}</button>
                </div>
              )}

              {waterFlow === 'payment' && !paymentConfirmed && (
                <div className="detail-box payment-box">
                  <h3>{t.paymentTitle}</h3>
                  <p>{t.paymentText}</p>
                  <div className="payment-card">
                    <span>Digital Aqua Water Report</span>
                    <strong>₹{PAYMENT_AMOUNT}</strong>
                  </div>
                  <button className="primary-btn detail-button" onClick={handlePayment}>{t.payNow}</button>
                  <button className="secondary-btn detail-button" onClick={() => setWaterFlow('validate')}>{t.back}</button>
                </div>
              )}

              {waterFlow === 'payment' && paymentConfirmed && !analysisResult && (
                <div className="detail-box payment-confirmed-box success-banner">
                  <div className="success-icon">✓</div>
                  <h3>{t.paymentConfirmed}</h3>
                  <p>{t.paymentMessage(PAYMENT_AMOUNT)}</p>
                  <button className="primary-btn detail-button" onClick={proceedToAnalysis}>{t.viewAnalysis}</button>
                </div>
              )}

              {waterFlow === 'analysis' && analysisResult && (
                <div className="detail-box analysis-box analysis-panel">
                  <h3>{t.analysisTitle}</h3>
                  <p className="analysis-summary">{analysisResult.summary}</p>
                  <p className="analysis-meta">{analysisSource === 'Llama AI' ? t.llamaAnalysis : t.localAnalysis} · {Math.round((analysisResult.confidence || 0) * 100)}%</p>
                  <div className="weather-widget">
                    <span className="weather-icon">☀️</span>
                    <div className="weather-info">
                      <p><strong>{t.location}:</strong> {analysisResult.weather.locationLabel || t.unknown}</p>
                      <p><strong>{t.weather}:</strong> {analysisResult.weather.condition}</p>
                      <p><strong>{t.temp}:</strong> {analysisResult.weather.temperature}°C | <strong>{t.humidity}:</strong> {analysisResult.weather.humidity}%</p>
                    </div>
                  </div>
                  <div className="analysis-section">
                    <h4>🔍 {t.issues}</h4>
                    {analysisResult.issues.map((issue, i) => (
                      <div key={i} className="issue-item">
                        <span className="issue-icon">⚠️</span>
                        <span>{issue}</span>
                      </div>
                    ))}
                  </div>
                  <div className="analysis-section">
                    <h4>🛡️ {t.precautions}</h4>
                    {analysisResult.precautions.map((precaution, i) => (
                      <div key={i} className="precaution-item">
                        <span className="precaution-icon">✓</span>
                        <span>{precaution}</span>
                      </div>
                    ))}
                  </div>
                  <div className="analysis-section">
                    <h4>💡 {t.whyMatters}</h4>
                    {analysisResult.reasons.map((reason, i) => (
                      <div key={i} className="reason-item">
                        <span className="reason-icon">i</span>
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                  <button className="primary-btn detail-button" onClick={() => setSelectedCard(null)}>{t.done}</button>
                </div>
              )}

              {waterFlow === 'analysis' && analysisLoading && (
                <div className="detail-box analysis-box analysis-panel">
                  <h3>{t.preparingAnalysis}</h3>
                  <p>{t.preparingText}</p>
                </div>
              )}

              {waterFlow === 'list' && (
                <>
                  <div className="pond-toolbar">
                    <button className="primary-btn detail-button" onClick={handleAddPond}>{t.addField}</button>
                  </div>

                  {ponds.length === 0 ? (
                    <div className="empty-state">
                      <h3>{t.noPonds}</h3>
                      <p>{t.noPondsText}</p>
                      <button className="primary-btn detail-button" onClick={handleAddPond}>{t.addField}</button>
                    </div>
                  ) : (
                    <div className="pond-list">
                      {ponds.map((pond) => (
                        <div
                          key={pond.id}
                          className={`pond-card ${selectedPondId === pond.id ? 'selected' : ''}`}
                          onClick={() => setSelectedPondId(pond.id)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              setSelectedPondId(pond.id)
                            }
                          }}
                        >
                          <div className="field-header">
                            <div className="pond-title-block">
                              {renamingPondId === pond.id ? (
                                <div className="inline-edit-row" onClick={(event) => event.stopPropagation()}>
                                  <input
                                    className="inline-rename-input"
                                    value={renamingDraft}
                                    onChange={(e) => setRenamingDraft(e.target.value)}
                                    onKeyDown={(event) => {
                                      if (event.key === 'Enter') saveInlinePondName()
                                      if (event.key === 'Escape') {
                                        setRenamingPondId(null)
                                        setRenamingDraft('')
                                      }
                                    }}
                                  />
                                  <div className="inline-edit-actions">
                                    <button className="primary-btn mini-btn" onClick={saveInlinePondName}>Save</button>
                                    <button className="secondary-btn mini-btn" onClick={() => setRenamingPondId(null)}>Cancel</button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <h3>{pond.name}</h3>
                                  <p>{pond.location || `${t.location}: ${t.notSet}`}</p>
                                  <p>{pond.reports?.length ? `${t.lastReport}: ${new Date(pond.reports[0].uploadedAt).toLocaleDateString()}` : t.noReports}</p>
                                </>
                              )}
                            </div>
                            <span className={`field-status ${pond.status.toLowerCase()}`}>{statusLabel(pond.status)}</span>
                          </div>

                          <div className="field-metrics">
                            <div><span>{waterMetrics[0][language === 'te' ? 'te' : 'label']}</span><strong>{pond.metrics.ph || '—'}</strong></div>
                            <div><span>{waterMetrics[1][language === 'te' ? 'te' : 'label']}</span><strong>{pond.metrics.dissolvedOxygen || '—'}</strong></div>
                            <div><span>{waterMetrics[2][language === 'te' ? 'te' : 'label']}</span><strong>{pond.metrics.ammonia || '—'}</strong></div>
                            <div><span>{waterMetrics[7][language === 'te' ? 'te' : 'label']}</span><strong>{pond.metrics.temperature || '—'}</strong></div>
                          </div>

                          <div className="pond-actions">
                            {pond.analysis && (
                              <button
                                className="secondary-btn analysis-action"
                                onClick={(event) => {
                                  event.stopPropagation()
                                  viewPreviousAnalysis(pond.id)
                                }}
                              >
                                {t.viewPreviousAnalysis}
                              </button>
                            )}
                            <button
                              className="secondary-btn"
                              onClick={(event) => {
                                event.stopPropagation()
                                handleRenamePond(pond.id)
                              }}
                            >
                              {t.rename}
                            </button>
                            <button
                              className="secondary-btn danger"
                              onClick={(event) => {
                                event.stopPropagation()
                                handleDeletePond(pond.id)
                              }}
                            >
                              {t.delete}
                            </button>
                            <button
                              className="primary-btn"
                              onClick={(event) => {
                                event.stopPropagation()
                                startReportFlow(pond.id)
                              }}
                            >
                              {t.uploadNew}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="app-shell detail-view">
        <div className="dashboard-panel detail-panel">
          <header className="topbar detail-topbar">
            <button className="back-btn" onClick={() => setSelectedCard(null)}>{t.back}</button>
            <button className="lang-btn" onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}>
              {t.language}
            </button>
          </header>

          <div className="detail-card">
            <span className={`detail-tag ${selectedCard.accent}`}>{selectedCard.tag[language]}</span>
            <h2>{selectedCard.title[language]}</h2>
            <p className="detail-subtitle">{selectedCard.subtitle[language]}</p>
            <div className="detail-box">
              <h3>{selectedCard.detailTitle[language]}</h3>
              <p>{selectedCard.detailText[language]}</p>
            </div>
            <button className="primary-btn detail-button">{t.comingSoon}</button>
          </div>
        </div>
      </div>
    )
  }

  if (isLoggedIn) {
    return (
      <div className="app-shell">
        <div className="dashboard-panel">
          <header className="topbar">
            <div>
              <p className="eyebrow">{t.welcome}</p>
              <h2>{t.dashboard}</h2>
            </div>
            <button className="lang-btn" onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}>
              {t.language}
            </button>
          </header>

          <section className="cards-section">
            {serviceCards.map((card) => (
              <article
                key={card.id}
                className={`service-card ${card.accent}`}
                onClick={() => handleCardClick(card)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleCardClick(card)
                  }
                }}
              >
                <div className="card-header">
                  <span className="service-tag">{card.tag[language]}</span>
                  <span className={`status-badge ${card.accent}`}>{card.status[language]}</span>
                </div>
                <h4>{card.title[language]}</h4>
                <p className="card-subtitle">{card.subtitle[language]}</p>
                <p className="card-description">{card.description[language]}</p>
              </article>
            ))}
          </section>
        </div>
      </div>
    )
  }

  return (
    <div className="app-shell login-view">
      <div className="login-panel">
        <div className="brand-row">
          <div className="brand-mark">DA</div>
          <div>
            <p className="eyebrow">{t.farmer}</p>
            <h1>{t.appTitle}</h1>
          </div>
        </div>

        <div className="login-card">
          <p className="login-title">{t.loginTitle}</p>

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="auth-form">
              <label className="input-label">{t.mobileLabel}</label>
              <div className="input-box">
                <span className="country-code">+91</span>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="98765 43210"
                />
              </div>

              <button type="submit" className="primary-btn">{t.sendOtp}</button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="auth-form">
              <label className="input-label">{t.otpLabel}</label>
              <div className="otp-box">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="123456"
                />
              </div>

              <button type="submit" className="primary-btn">{t.verify}</button>
              <button type="button" className="secondary-btn" onClick={() => setOtpSent(false)}>
                {t.change}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
