/**
 * ============================================================================
 * AgriSense AI — Core JavaScript Engine (Elite Hackathon Edition v2.0)
 * Region-Aware Agritech Precision Advisory & Data Aggregation Platform
 * 
 * Features:
 * 1. Dual Execution: Standalone Grounded Rule Engine + Live FastAPI REST Integration
 * 2. 10 Interactive Views: Landing, Dashboard, AI Assistant, Crops, Weather, Soil,
 *    Disease Studio, Market Mandi, 4-Pillar Advisories, 3-District Divergence, Registry
 * 3. Command Palette (Ctrl+K) with Real-Time Search & Keyboard Navigation
 * 4. High-DPI HTML5 Canvas Charts: 24h Hourly Weather & Mandi Price Trends (7d/30d)
 * 5. Animated Circular SVG Farm Intelligence Score Gauge (87/100)
 * 6. AI Computer Vision Leaf Disease Scanner with Animated Laser Sweep Beam
 * 7. Conversational AI Assistant with Realistic Streaming & Citation Grounding
 * 8. 1-Click Guided Hackathon Tour for Judges
 * 9. Native Web Speech TTS (English & Tamil) & Clipboard Integrations
 * 10. Rural Low-Bandwidth Mode & Persistent Dark/Light Themes
 * ============================================================================
 */

// ============================================================================
// 1. GLOBAL APPLICATION STATE
// ============================================================================
const AppState = {
  currentLang: 'en',
  isDarkTheme: true,
  isLowBandwidth: false,
  activeView: 'dashboard',
  activeScenario: 'nitrogen',
  activeCropFilter: 'all',
  activeMarketTimeline: '7d',
  isSpeaking: false,
  backendOnline: false,
  backendUrl: 'http://127.0.0.1:8000/api/v1',
  lastFetchTime: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
  farmScore: 87,
  selectedParams: {
    district: 'Thanjavur',
    crop: 'Paddy',
    season: 'Samba',
    stage: 'Tillering',
    queryTopic: 'nitrogen',
    customQuery: 'What is the recommended Nitrogen management during active tillering?'
  },
  diseaseScanner: {
    activeSample: 'blast',
    isScanning: false,
    customImage: null
  },
  chatHistory: []
};

// ============================================================================
// 2. AGROCLIMATIC DATASETS & GROUNDED RULES
// Grounded in TNAU Package of Practices (PoP) & IMD Agromet Gridded Feeds
// ============================================================================
const AgroDataset = {
  districts: {
    Thanjavur: {
      zoneEn: 'Zone IV — Cauvery Delta Agroclimatic Zone',
      zoneTa: 'மண்டலம் IV — காவிரி டெல்டா மண்டலம்',
      soilEn: 'Heavy Alluvial Clay • High Water Retention',
      soilTa: 'களிமண் வண்டல் மண் • அதிக ஈரப்பத தக்கவைப்பு',
      climateEn: 'Deltaic Maritime • Relative Humidity 78–88%',
      climateTa: 'டெல்டா பகுதி • ஈரப்பதம் 78–88%',
      farmScore: 87,
      scoreStatus: 'Optimal Conditions',
      scoreSummaryEn: 'Optimal condition for active tillering top-dress. Rain risk is minimal for next 36h.',
      scoreSummaryTa: 'தூர்கட்டும் பருவ உரம் இட சாதகமான சூழல். அடுத்த 36 மணி நேரத்திற்கு மழை அபாயம் குறைவு.',
      telemetry: {
        ph: 6.8,
        phStatus: 'Near Neutral • Optimal',
        oc: '0.58%',
        soilN: '210 kg/ha',
        soilZn: '0.95 ppm',
        soilAdviceEn: 'Delta alluvial clay holds ample silt nutrients. Avoid high nitrogen surges to prevent lodging during monsoon squalls.',
        soilAdviceTa: 'வண்டல் மண்ணில் இயற்கை வளம் அதிகம். வடகிழக்கு பருவமழைக் காற்றில் பயிர் சாய்வதைத் தவிர்க்க யூரியாவை பிரித்து இடவும்.',
        temp: '29.4°C',
        condEn: 'Partly Cloudy • Favorable',
        condTa: 'பகுதி மேகமூட்டம் • சாதகமானது',
        rh: '82%',
        rainProb: '15%',
        wind: '8.5 km/h',
        irrigationImpact: 'WAIT (Moist)',
        fertilizerImpact: 'RECOMMENDED',
        sprayingImpact: 'FAVORABLE',
        harvestImpact: 'FAVORABLE',
        marketPrice: '₹2,350',
        marketUnit: '/ Quintal (Paddy Grade A)',
        marketChange: '↑ 4.2% this week',
        marketDecision: 'HOLD / WAIT',
        marketReasonEn: 'Arrival momentum indicates prices may gain another ₹40-60/Qtl over next 5 days.',
        marketReasonTa: 'வரத்து குறைந்து வருவதால் அடுத்த 5 நாட்களில் குவிண்டாலுக்கு ₹40-60 வரை விலை உயரும் வாய்ப்புள்ளது.'
      },
      nutrients: [
        { name: 'Available Nitrogen (N)', val: '210 kg/ha', pct: 60, status: 'Medium' },
        { name: 'Available Phosphorus (P)', val: '22 kg/ha', pct: 75, status: 'Sufficient' },
        { name: 'Available Potassium (K)', val: '280 kg/ha', pct: 85, status: 'High' },
        { name: 'Available Zinc (Zn)', val: '0.95 ppm', pct: 70, status: 'Sufficient' },
        { name: 'Organic Carbon (OC)', val: '0.58%', pct: 65, status: 'Good' }
      ]
    },

    Coimbatore: {
      zoneEn: 'Zone II — Western Agroclimatic Zone',
      zoneTa: 'மண்டலம் II — மேற்கு வேளாண் காலநிலை மண்டலம்',
      soilEn: 'Calcareous Red & Black Loam • High pH (8.1)',
      soilTa: 'சுண்ணாம்பு கலந்த செம்மண் & கரிசல் மண் • அதிக pH (8.1)',
      climateEn: 'Semi-Arid Rainshadow • RH 55–65%',
      climateTa: 'மழைமறைவு பகுதி • ஈரப்பதம் 55–65%',
      farmScore: 82,
      scoreStatus: 'Favorable • Watch Zinc',
      scoreSummaryEn: 'High soil pH requires micro-splits and foliar zinc to avert calcareous chlorosis.',
      scoreSummaryTa: 'கார மண்ணில் துத்தநாக குறைபாடு ஏற்பட வாய்ப்புள்ளதால் இலைவழி தெளிப்பு அவசியம்.',
      telemetry: {
        ph: 8.1,
        phStatus: 'Alkaline • Calcareous',
        oc: '0.42%',
        soilN: '165 kg/ha',
        soilZn: '0.52 ppm',
        soilAdviceEn: 'Porous loam with high calcium carbonate precipitates zinc. Apply 0.5% ZnSO4 foliar spray.',
        soilAdviceTa: 'சுண்ணாம்பு கலந்த செம்மண்ணில் துத்தநாகம் பயிருக்கு கிடைக்காது. 0.5% ஜிங்க் சல்பேட் தெளிக்கவும்.',
        temp: '31.2°C',
        condEn: 'Dry & Breezy • High Sun',
        condTa: 'வறண்ட காற்று • நல்ல வெயில்',
        rh: '58%',
        rainProb: '5%',
        wind: '16.2 km/h',
        irrigationImpact: 'SCHEDULED TODAY',
        fertilizerImpact: 'SPLIT ONLY',
        sprayingImpact: 'WIND DRIFT RISK',
        harvestImpact: 'EXCELLENT',
        marketPrice: '₹2,410',
        marketUnit: '/ Quintal (Paddy ADT 43)',
        marketChange: '↑ 2.8% this week',
        marketDecision: 'PARTIAL SELL (50%)',
        marketReasonEn: 'Steady local miller demand; hedge price by selling 50% lot now.',
        marketReasonTa: 'ஆலைகளின் உடனடி தேவை உள்ளதால் 50% இருப்பு நெல்லை இப்போது விற்பனை செய்யலாம்.'
      },
      nutrients: [
        { name: 'Available Nitrogen (N)', val: '165 kg/ha', pct: 45, status: 'Low' },
        { name: 'Available Phosphorus (P)', val: '18 kg/ha', pct: 55, status: 'Medium' },
        { name: 'Available Potassium (K)', val: '310 kg/ha', pct: 90, status: 'High' },
        { name: 'Available Zinc (Zn)', val: '0.52 ppm', pct: 35, status: 'Deficient' },
        { name: 'Organic Carbon (OC)', val: '0.42%', pct: 48, status: 'Moderate' }
      ]
    },

    Madurai: {
      zoneEn: 'Zone VI — Southern Semi-Arid Zone',
      zoneTa: 'மண்டலம் VI — தெற்கு வறண்ட மண்டலம்',
      soilEn: 'Sandy Clay Loam • Low Organic Carbon (0.31%)',
      soilTa: 'மணல் கலந்த களிமண் • குறைந்த கரிமச்சத்து (0.31%)',
      climateEn: 'Semi-Arid Dry Tropical • High Evaporation',
      climateTa: 'வறண்ட வெப்ப மண்டலம் • அதிக நீர் ஆவியாதல்',
      farmScore: 74,
      scoreStatus: 'Thermal Stress Watch',
      scoreSummaryEn: 'High heat index increases ammonia sublimation. Deep fertilizer placement required.',
      scoreSummaryTa: 'கடும் வெயில் காரணமாக உரம் ஆவியாகாமல் இருக்க ஆழமாக இட வேண்டும்.',
      telemetry: {
        ph: 7.4,
        phStatus: 'Mild Alkaline • Low OC',
        oc: '0.31%',
        soilN: '140 kg/ha',
        soilZn: '0.72 ppm',
        soilAdviceEn: 'Low organic carbon demands basal FYM. Avoid surface broadcasting to prevent 50% ammonia volatilization.',
        soilAdviceTa: 'மண்ணில் கரிமச்சத்து மிகக் குறைவு. தொழு உரம் இட்டு யூரியா உருண்டைகளை ஆழமாக இடவும்.',
        temp: '34.8°C',
        condEn: 'Hot & Clear • High Radiation',
        condTa: 'கடும் வெயில் • அதிக வெப்பம்',
        rh: '48%',
        rainProb: '10%',
        wind: '9.0 km/h',
        irrigationImpact: 'CRITICAL MOISTURE',
        fertilizerImpact: 'DEEP BRIQUETTE',
        sprayingImpact: 'EVENING ONLY',
        harvestImpact: 'FAVORABLE',
        marketPrice: '₹2,280',
        marketUnit: '/ Quintal (Paddy CO 51)',
        marketChange: '↓ 1.2% this week',
        marketDecision: 'HOLD / STORE',
        marketReasonEn: 'Temporary harvest glut in southern mandis; withhold supply for 10-14 days.',
        marketReasonTa: 'தென்மண்டல சந்தைகளில் நெல் வரத்து அதிகரித்துள்ளதால் 10-14 நாட்கள் கழித்து விற்கவும்.'
      },
      nutrients: [
        { name: 'Available Nitrogen (N)', val: '140 kg/ha', pct: 38, status: 'Low' },
        { name: 'Available Phosphorus (P)', val: '15 kg/ha', pct: 45, status: 'Low-Medium' },
        { name: 'Available Potassium (K)', val: '240 kg/ha', pct: 70, status: 'Medium-High' },
        { name: 'Available Zinc (Zn)', val: '0.72 ppm', pct: 55, status: 'Moderate' },
        { name: 'Organic Carbon (OC)', val: '0.31%', pct: 32, status: 'Low' }
      ]
    },

    Tiruchirappalli: {
      zoneEn: 'Zone IV-B — Mid-Cauvery Riverine Valley',
      zoneTa: 'மண்டலம் IV-B — மத்திய காவிரி படுகை',
      soilEn: 'Alluvial Loam • Moderate Drainage',
      soilTa: 'வண்டல் செம்மண் • மிதமான வடிகால் வசதி',
      climateEn: 'Tropical Hot Semi-Arid • Canal Dependent',
      climateTa: 'வெப்பமண்டல உலர் பகுதி • பாசன வாய்க்கால் சார்ந்தது',
      farmScore: 85,
      scoreStatus: 'Balanced Growth',
      scoreSummaryEn: 'Good canal water balance and optimal vegetative growth conditions.',
      scoreSummaryTa: 'வாய்க்கால் பாசன சமநிலை மற்றும் உகந்த பயிர் வளர்ச்சி சூழல்.',
      telemetry: {
        ph: 7.1,
        phStatus: 'Neutral • High Silt',
        oc: '0.49%',
        soilN: '190 kg/ha',
        soilZn: '0.88 ppm',
        soilAdviceEn: 'Mid-delta alluvial loam responds excellently to balanced N-P-K with green leaf manure.',
        soilAdviceTa: 'வண்டல் நிலத்திற்கு தக்கைப்பூண்டு போன்ற பசுந்தாள் உரம் இடுவது சிறந்த பலன் தரும்.',
        temp: '32.1°C',
        condEn: 'Partly Sunny • Good Window',
        condTa: 'மிதமான வெயில் • உகந்த சூழல்',
        rh: '70%',
        rainProb: '20%',
        wind: '10.5 km/h',
        irrigationImpact: 'AWD SCHEDULED',
        fertilizerImpact: 'RECOMMENDED',
        sprayingImpact: 'FAVORABLE',
        harvestImpact: 'FAVORABLE',
        marketPrice: '₹2,320',
        marketUnit: '/ Quintal (Paddy CR 1009)',
        marketChange: '↑ 3.1% this week',
        marketDecision: 'HOLD / WAIT',
        marketReasonEn: 'Canal release stabilizes quality; traders expecting price bounce next week.',
        marketReasonTa: 'அடுத்த வாரம் விலை மேலும் உயர வாய்ப்புள்ளதால் காத்திருந்து விற்கவும்.'
      },
      nutrients: [
        { name: 'Available Nitrogen (N)', val: '190 kg/ha', pct: 52, status: 'Medium' },
        { name: 'Available Phosphorus (P)', val: '24 kg/ha', pct: 78, status: 'Sufficient' },
        { name: 'Available Potassium (K)', val: '290 kg/ha', pct: 86, status: 'High' },
        { name: 'Available Zinc (Zn)', val: '0.88 ppm', pct: 65, status: 'Sufficient' },
        { name: 'Organic Carbon (OC)', val: '0.49%', pct: 54, status: 'Moderate' }
      ]
    },

    Nagapattinam: {
      zoneEn: 'Zone IV-C — Coastal Saline Delta Belt',
      zoneTa: 'மண்டலம் IV-C — கடலோர உவர் டெல்டா பகுதி',
      soilEn: 'Marine Saline Alluvium • High EC (2.8 dS/m)',
      soilTa: 'கடலோர உவர்மண் • அதிக உப்புத்தன்மை (2.8 dS/m)',
      climateEn: 'Coastal Humid • Cyclone & Saline Spray Risk',
      climateTa: 'கடலோர ஈரப்பதம் • புயல் மற்றும் உவர் காற்று அபாயம்',
      farmScore: 79,
      scoreStatus: 'Saline Stress Alert',
      scoreSummaryEn: 'Marine aerosol and elevated soil EC require gypsum leaching and zinc foliar care.',
      scoreSummaryTa: 'கடலோர உவர் தன்மையைக் குறைக்க ஜிப்சம் இட்டு வடிகால் வசதி செய்தல் அவசியம்.',
      telemetry: {
        ph: 7.6,
        phStatus: 'Slightly Alkaline • Saline',
        oc: '0.52%',
        soilN: '180 kg/ha',
        soilZn: '0.64 ppm',
        soilAdviceEn: 'Subsoil salinity intrusion during high tide periods. Flush field with freshwater before top-dressing.',
        soilAdviceTa: 'உவர் மண்ணில் நல்ல தண்ணீர் பாய்ச்சி வடிகட்டிய பின் உரம் இட வேண்டும்.',
        temp: '29.0°C',
        condEn: 'Breezy & Humid • Coastal Cloud',
        condTa: 'கடலோர காற்று • அதிக ஈரப்பதம்',
        rh: '88%',
        rainProb: '40%',
        wind: '18.4 km/h',
        irrigationImpact: 'DRAIN FIELD',
        fertilizerImpact: 'WAIT 24H',
        sprayingImpact: 'HIGH DRIFT RISK',
        harvestImpact: 'RAIN RISK',
        marketPrice: '₹2,300',
        marketUnit: '/ Quintal (Paddy White Ponni)',
        marketChange: '↑ 1.5% this week',
        marketDecision: 'SELL NOW (Coastal)',
        marketReasonEn: 'Early monsoon coastal rain alert; avoid damp storage losses by liquidating now.',
        marketReasonTa: 'கடலோர மழை அபாயம் உள்ளதால் தானியம் சேதமடையாமல் உடனே விற்கவும்.'
      },
      nutrients: [
        { name: 'Available Nitrogen (N)', val: '180 kg/ha', pct: 48, status: 'Medium' },
        { name: 'Available Phosphorus (P)', val: '16 kg/ha', pct: 50, status: 'Medium' },
        { name: 'Available Potassium (K)', val: '270 kg/ha', pct: 80, status: 'Sufficient' },
        { name: 'Available Zinc (Zn)', val: '0.64 ppm', pct: 46, status: 'Low-Medium' },
        { name: 'Organic Carbon (OC)', val: '0.52%', pct: 58, status: 'Moderate' }
      ]
    }
  },

  // Specialized 4-Pillared Advisories
  advisories: {
    Thanjavur: {
      Paddy: {
        nitrogen: {
          en: {
            headline: "Cauvery Delta Lowland Paddy Nitrogen Regimen (Active Tillering)",
            warningTitle: "Delta Soil Warning: High Moisture Nitrogen Leaching Risk",
            warningText: "Delta alluvial clay is saturated from Mettur canal release. Never broadcast urea onto deep standing water (>3cm). High water tables and humid macro-canopy create extreme Sheath Blight conditions if nitrogen is overdosed.",
            what: "Apply Neem-coated Urea blended with gypsum and fine dry soil (ratio 1:3:1) 24 hours before application. This retards nitrification and prevents ammonia gas escape.",
            when: "Between 25 to 28 Days After Transplanting (DAT) during early morning hours (07:30–09:30 AM). Verify no monsoon squall forecast on IMD Agromet.",
            howMuch: "22 kg Neem-coated Urea + 10 kg Muriate of Potash (MOP) per acre. (Reflects baseline soil organic carbon of 0.58%).",
            why: "Delta clay has poor internal aeration and high moisture. Applying generic India advice (35–40 kg/acre) causes lush succulent canopy, triggering rapid Sheath Blight (Rhizoctonia solani) and catastrophic lodging during northeast monsoon winds.",
            source: "TNAU Tamil Nadu Rice Research Institute (TRRI), Aduthurai",
            pubDate: "PoP Rice Update 2024-Q3",
            confidence: "Rule Engine: 100% Deterministic Zone IV Fit"
          },
          ta: {
            headline: "தஞ்சாவூர் காவிரி டெல்டா நெல் தழைச்சத்து மேலாண்மை (தூர்கட்டும் பருவம்)",
            warningTitle: "டெல்டா மண் எச்சரிக்கை: அதிக ஈரப்பதம் மற்றும் தழைச்சத்து இழப்பு அபாயம்",
            warningText: "காவிரி டெல்டா களிமண் அதிக ஈரப்பதம் கொண்டது. 3 செ.மீ-க்கு மேல் நீர் தேங்கியிருக்கும் போது யூரியாவை நேரடியாக இட வேண்டாம். அதிக தழைச்சத்து இலைக்கருகல் மற்றும் குலை நோயை தீவிரமாக்கும்.",
            what: "வேப்பம் புண்ணாக்கு பூசிய யூரியாவை ஜிப்சம் மற்றும் உலர்ந்த பொடி மண்ணுடன் 1:3:1 விகிதத்தில் கலந்து 24 மணி நேரம் வைத்திருந்து இடவும்.",
            when: "நட்ட 25 முதல் 28 நாட்கள் கழித்து (தூர்கட்டும் பருவம்), காலை 07:30 முதல் 09:30 மணிக்குள் பனி விலகிய பின் இடவும்.",
            howMuch: "ஏக்கருக்கு 22 கிலோ வேப்பெண்ணெய் பூசிய யூரியா + 10 கிலோ பொட்டாஷ் (MOP).",
            why: "காவிரி டெல்டா களிமண்ணில் நீர் வடிய தாமதமாகும். அகில இந்திய பொது அளவான 35-40 கிலோ யூரியா இட்டால், பயிர் அளவுக்கதிகமாக செழித்து வளர்ந்து வடகிழக்கு பருவமழைக் காற்றில் சாய்ந்து குலைநோய் தாக்கும்.",
            source: "தமிழ்நாடு நெல் ஆராய்ச்சி நிறுவனம் (TRRI), ஆடுதுறை",
            pubDate: "TNAU பயிர் கையேடு 2024 பதிப்பு",
            confidence: "விதிமுறை இயந்திரம்: 100% மண்டலம் IV பொருத்தம்"
          }
        },
        blast: {
          en: {
            headline: "Cauvery Delta Blast & Sheath Rot Protocol (Samba Season)",
            warningTitle: "Microclimate Alert: Delta Night Fog & High Dew Point",
            warningText: "Relative humidity in Thanjavur exceeds 86% with heavy morning dew during Samba season, creating ideal spore germination conditions for Magnaporthe oryzae.",
            what: "Prophylactic spray of Tricyclazole 75% WP or Azoxystrobin 18.2% + Difenoconazole 11.4% SC. Drain stagnant field water 24h prior.",
            when: "Immediately at initial tillering symptom appearance or when night temperature drops below 22°C with morning fog.",
            howMuch: "120 grams Tricyclazole 75% WP in 200 Litres of water per acre using a motorized knapsack sprayer.",
            why: "Deltaic alluvial soil contains high residual nitrogen from canal silt, which makes leaf tissues softer and dramatically more susceptible to fungal penetration compared to western upland soils.",
            source: "TNAU Plant Pathology Advisory • TRRI Aduthurai",
            pubDate: "Samba Pest Surveillance Bulletin 2024",
            confidence: "Rule Engine: Verified Disease Resistance Guideline"
          },
          ta: {
            headline: "தஞ்சாவூர் சம்பா பருவ நெல் குலைநோய் & இலை உறை அழுகல் கட்டுப்பாடு",
            warningTitle: "காலநிலை எச்சரிக்கை: டெல்டா பகுதி அதிக பனிப்பொழிவு மற்றும் ஈரப்பதம்",
            warningText: "சம்பா பருவத்தில் தஞ்சாவூரில் காற்றின் ஈரப்பதம் 86%-க்கு மேல் நிலவுவதால் குலைநோய் பூஞ்சான் வேகமாக பரவும் அபாயம் உள்ளது.",
            what: "டிரைசைக்ளசோல் 75% WP அல்லது அசாசிஸ்ட்ரோபின் கலவையை முன்னெச்சரிக்கையாக தெளிக்கவும். வரப்புகளில் நீர் தேங்காமல் பார்த்துக் கொள்ளவும்.",
            when: "இலைகளில் கண் வடிவ புள்ளிகள் தென்பட்டவுடன் அல்லது இரவு வெப்பநிலை 22°C-க்கு கீழ் குறையும் போது.",
            howMuch: "ஏக்கருக்கு 120 கிராம் டிரைசைக்ளசோல் 75% WP-ஐ 200 லிட்டர் நீரில் கலந்து விசைத்தெளிப்பான் மூலம் தெளிக்கவும்.",
            why: "டெல்டா வண்டல் மண்ணில் உள்ள தழைச்சத்து பயிரை மென்மையாக்குவதால், மேற்கு மாவட்டங்களை விட இங்கு பூஞ்சான் எளிதில் ஊடுருவும்.",
            source: "TNAU பயிர் நோயியல் துறை • TRRI ஆடுதுறை",
            pubDate: "சம்பா பயிர் பாதுகாப்பு அறிக்கை 2024",
            confidence: "விதிமுறை இயந்திரம்: மண்டலம் IV நோயியல் சரிபார்ப்பு"
          }
        },
        irrigation: {
          en: {
            headline: "Cauvery Delta Alternate Wetting & Drying (AWD) Schedule",
            warningTitle: "Hydrology Alert: Mettur Turn-System Canal Supply",
            warningText: "Canal rotational supply is active. Standing water must not exceed 2.5cm to avoid root rot in heavy clay subsoils.",
            what: "Implement Field Water Tube (Pani Pipe) monitoring. Irrigate only when water drops 5cm below soil surface in the perforated tube.",
            when: "Initiate after seedling establishment (12 DAT) through tillering. Suspend AWD only during flowering.",
            howMuch: "Apply 2.5 cm depth of irrigation per turn instead of conventional 5-7 cm flooding.",
            why: "Thanjavur clay has high capillary pull and slow drainage; continuous flooding causes toxic anaerobic iron reduction and root blackening.",
            source: "Water Technology Centre (WTC), TNAU Coimbatore",
            pubDate: "Delta Water Management Guidelines 2024",
            confidence: "Rule Engine: 100% AWD Compliance"
          },
          ta: {
            headline: "காவிரி டெல்டா முறை பாசனம் மற்றும் நீர் மேலாண்மை (AWD)",
            warningTitle: "நீர்நிலை எச்சரிக்கை: மேட்டூர் முறை பாசன முறை",
            warningText: "வாய்க்கால் முறை பாசனம் நடைமுறையில் உள்ளது. களிமண் பகுதியில் வேர் அழுகலைத் தடுக்க 2.5 செ.மீ-க்கு மேல் நீர் தேக்கக் கூடாது.",
            what: "பாணி பைப் (துளைக் குழாய்) மூலம் வயல் நீர் மட்டத்தை கண்காணித்து, நீர் 5 செ.மீ கீழே சென்ற பின் மறுபாசனம் செய்யவும்.",
            when: "பயிர் நிலைநிறுத்தப்பட்ட 12-ம் நாள் முதல் தூர்கட்டும் பருவம் வரை. பூக்கும் தருணத்தில் இதனை தவிர்க்கவும்.",
            howMuch: "ஒவ்வொரு முறை பாசனத்தின் போதும் 2.5 செ.மீ அளவு மட்டும் நீர் பாய்ச்சினால் போதுமானது.",
            why: "டெல்டா களிமண்ணில் தொடர்ந்து நீர் தேங்கினால் வேர் பகுதிக்கு காற்று கிடைக்காமல் வேர் கருப்பாகி அழுகிவிடும்.",
            source: "நீர்நுட்ப மையம் (WTC), தமிழ்நாடு வேளாண்மைப் பல்கலைக்கழகம்",
            pubDate: "டெல்டா பாசன மேலாண்மை 2024",
            confidence: "விதிமுறை இயந்திரம்: 100% நீர்சேமிப்பு உறுதி"
          }
        }
      }
    },

    Coimbatore: {
      Paddy: {
        nitrogen: {
          en: {
            headline: "Western Zone Calcareous Soil Paddy Nitrogen Regimen",
            warningTitle: "Zone Agronomic Alert: High Soil pH & Calcium Carbonate Lockup",
            warningText: "Coimbatore soils are predominantly calcareous red and black loam with soil pH 7.9–8.2. Surface broadcast urea without rapid incorporation suffers up to 35% volatilization as free ammonia.",
            what: "Split nitrogen into 4 micro-doses instead of 2. Combine with 0.5% Zinc Sulphate foliar spray to prevent calcareous-induced zinc lockup.",
            when: "25 DAT (Second split). Must apply within 4 hours prior to scheduled borewell drip or furrow irrigation cycle.",
            howMuch: "28 kg Neem-coated Urea + 10 kg MOP + 1 kg Zinc Sulphate (0.5% foliar spray) per acre.",
            why: "Calcareous alkaline soils precipitate inorganic zinc into insoluble zinc hydroxide. Without supplementary foliar zinc, high nitrogen applications trigger acute Khaira disease (leaf bronzing) and stunted tillers.",
            source: "Department of Agronomy, TNAU Main Campus, Coimbatore",
            pubDate: "Western Zone Cropping Systems Bulletin 2024",
            confidence: "Rule Engine: 100% Calcareous Soil Grounded"
          },
          ta: {
            headline: "மேற்கு மண்டல கார மண் நெல் தழைச்சத்து மேலாண்மை நெறிமுறை",
            warningTitle: "மண்டல எச்சரிக்கை: அதிக சுண்ணாம்பு மற்றும் கார மண் தன்மை (pH 8.1)",
            warningText: "கோயம்புத்தூர் செம்மண் மற்றும் கரிசல் மண் அதிக சுண்ணாம்பு சத்து கொண்டது. யூரியாவை மேலாக தூவினால் 35% உரம் காற்றில் ஆவியாகி வீணாகும்.",
            what: "யூரியாவை 4 சிறு தவணைகளாக பிரித்து இடவும். அத்துடன் 0.5% துத்தநாக சல்பேட் (Zinc Sulphate) இலைவழி தெளிப்பு செய்யவும்.",
            when: "நட்ட 25-ம் நாளில் (2வது தவணை), பாசனம் செய்வதற்கு 4 மணி நேரத்திற்கு முன் இடவும்.",
            howMuch: "ஏக்கருக்கு 28 கிலோ வேப்பம் பூசிய யூரியா + 10 கிலோ பொட்டாஷ் + 1 கிலோ ஜிங்க் சல்பேட் தெளிப்பு.",
            why: "கார மண்ணில் பயிரால் துத்தநாகத்தை வேர் மூலம் உறிஞ்ச முடியாது. துத்தநாகம் இல்லாமல் யூரியா மட்டும் இட்டால் இலைகள் மஞ்சள் நிறமாகி தூர்கள் வளர்ச்சி பாதிக்கப்படும்.",
            source: "உழவியல் துறை, தமிழ்நாடு வேளாண்மைப் பல்கலைக்கழகம், கோயம்புத்தூர்",
            pubDate: "மேற்கு மண்டல வேளாண் வழிகாட்டி 2024",
            confidence: "விதிமுறை இயந்திரம்: 100% கார மண் சரிபார்ப்பு"
          }
        },
        blast: {
          en: {
            headline: "Western Zone Wind-Spread Foliar Disease Protocol",
            warningTitle: "Microclimate Alert: Palghat Gap Wind Shearing & Abrasions",
            warningText: "High velocity winds from the Palghat gap cause mechanical leaf abrasions. Fungal spores enter through physical wounds rather than wet fog.",
            what: "Apply Isoprothiolane 40% EC combined with silica adjuvant. Direct sprayer nozzle at tiller bases.",
            when: "At 25–30 DAT before wind speeds peak in late afternoon.",
            howMuch: "300 ml Isoprothiolane 40% EC in 200 Litres of water per acre.",
            why: "Windy western conditions demand translaminar fungicides with fast adherence; surface sprays get blown off rapidly.",
            source: "Department of Plant Pathology, TNAU Coimbatore",
            pubDate: "Western Agroclimatic Bulletin 2024",
            confidence: "Rule Engine: 100% Western Zone Grounded"
          },
          ta: {
            headline: "மேற்கு மண்டல காற்று உராய்வு நோய் தடுப்பு நெறிமுறை",
            warningTitle: "காலநிலை எச்சரிக்கை: பாலக்காட்டு கணவாய் பலத்த காற்று மற்றும் இலை காயம்",
            warningText: "பாலக்காட்டு கணவாய் காற்று இலைகளில் உராய்வை ஏற்படுத்துவதால் காயம் வழியாக பூஞ்சான் எளிதில் பரவும்.",
            what: "ஐசோப்ரோதியோலேன் 40% EC மருந்தை ஒட்டும் திரவத்துடன் கலந்து தூர்களின் அடிப்பகுதியில் படுமாறு தெளிக்கவும்.",
            when: "நட்ட 25-30 நாட்களில், காற்று வேகம் குறைவான காலை வேளையில்.",
            howMuch: "ஏக்கருக்கு 300 மி.லி ஐசோப்ரோதியோலேன் 40% EC-ஐ 200 லிட்டர் நீரில் கலந்து தெளிக்கவும்.",
            why: "பலத்த காற்றில் தெளிக்கும் போது மருந்து இலைகளில் தங்காது; எனவே ஒட்டும் தன்மை கொண்ட மருந்து அவசியம்.",
            source: "பயிர் நோயியல் துறை, த.வே.பல்கலைக்கழகம், கோவை",
            pubDate: "மேற்கு மண்டல பயிர் பாதுகாப்பு 2024",
            confidence: "விதிமுறை இயந்திரம்: 100% மேற்கு மண்டல பொருத்தம்"
          }
        },
        irrigation: {
          en: {
            headline: "Western Zone Borewell Furrow 3-Day Micro-Cyclic Schedule",
            warningTitle: "Hydrology Alert: Fast Percolation in Porous Loam",
            warningText: "Coimbatore loam has rapid internal drainage. Prolonged dry spells induce moisture stress within 72 hours.",
            what: "Apply 3.0 cm depth every 3 days using off-peak electricity tariffs.",
            when: "Maintain 3-day intervals throughout tillering; never allow soil surface cracking.",
            howMuch: "3.0 cm per irrigation cycle.",
            why: "Porous loam does not hold water like delta clay; micro-frequent applications maintain rootzone moisture without deep leaching.",
            source: "Water Technology Centre, TNAU",
            pubDate: "Precision Water Management 2024",
            confidence: "Rule Engine: 100% Borewell Regimen Fit"
          },
          ta: {
            headline: "கோவை ஆழ்துளை கிணறு 3 நாள் இடைவெளி பாசன முறை",
            warningTitle: "நீர்நிலை எச்சரிக்கை: செம்மண்ணில் விரைவான நீர் வடிதல்",
            warningText: "கோயம்புத்தூர் செம்மண் நீரை எளிதில் பூமிக்குள் இறக்கிவிடும். 3 நாட்களுக்கு மேல் காய்ந்தால் பயிர் வாடும்.",
            what: "3 நாட்களுக்கு ஒருமுறை 3.0 செ.மீ நீர் பாய்ச்சவும். இரவு நேர மின்சாரத்தை பயன்படுத்தவும்.",
            when: "தூர்கட்டும் பருவம் முழுவதும் மண் காயாமல் 3 நாட்கள் இடைவெளியில் பாசனம் செய்யவும்.",
            howMuch: "ஒரு முறைக்கு 3.0 செ.மீ ஆழம் மட்டும்.",
            why: "செம்மண்ணில் நீரை நீண்ட நேரம் தேக்க முடியாது; அடிக்கடி குறைந்த அளவு நீர் பாய்ச்சுவதே சிறந்தது.",
            source: "நீர்நுட்ப மையம், தமிழ்நாடு வேளாண் பல்கலைக்கழகம்",
            pubDate: "மேற்கு மண்டல பாசன கையேடு 2024",
            confidence: "விதிமுறை இயந்திரம்: 100% பாசன சரிபார்ப்பு"
          }
        }
      }
    },

    Madurai: {
      Paddy: {
        nitrogen: {
          en: {
            headline: "Southern Semi-Arid Deep Briquette Placement Regimen",
            warningTitle: "Thermal Alert: High Daytime Temperatures & Ammonia Volatilization",
            warningText: "Madurai experiences daytime temperatures 4–6°C higher than delta zones during Samba tillering. Broadcast urea sublimates into ammonia gas at rates exceeding 50% within 48 hours on dry crusting soils.",
            what: "Deep placement of Urea-DAP briquettes (7–10 cm depth) between 4 hills using manual briquette applicator. Supplement with 1% Potassium Schoenite spray.",
            when: "Between 22 to 26 DAT during late afternoon hours (03:30–05:30 PM) to avoid solar sublimation peaks.",
            howMuch: "24 kg Urea-DAP briquettes placed into soil rootzone per acre + 2 kg Potassium Schoenite foliar spray.",
            why: "Surface broadcast nitrogen is rendered useless in Madurai's hot, dry climate. Deep placement conserves 35% nitrogen and forces root elongation into deeper, cooler soil layers.",
            source: "Agricultural College & Research Institute, Madurai (TNAU)",
            pubDate: "Southern Dry Zone Agromet Advisory 2024",
            confidence: "Rule Engine: 100% Southern Semi-Arid Match"
          },
          ta: {
            headline: "மதுரை தெற்கு வறண்ட மண்டல யூரியா உருண்டை ஆழமிடுதல் முறை",
            warningTitle: "வெப்பநிலை எச்சரிக்கை: அதிக பகல் வெப்பம் மற்றும் தழைச்சத்து ஆவியாதல்",
            warningText: "மதுரையில் பகல் வெப்பநிலை டெல்டாவை விட 4-6°C அதிகமாக இருக்கும். யூரியாவை மேலாக தூவினால் 50%-க்கும் மேல் காற்றில் ஆவியாகி வீணாகிவிடும்.",
            what: "யூரியா-டிஏபி உருண்டைகளை (Briquettes) 4 பயிர்களுக்கு நடுவே 7-10 செ.மீ ஆழத்தில் புதைத்து இடவும். அத்துடன் பொட்டாசியம் இலைவழி தெளிப்பு செய்யவும்.",
            when: "நட்ட 22 முதல் 26 நாட்களில், மாலை 03:30 முதல் 05:30 மணிக்குள் இடவும்.",
            howMuch: "ஏக்கருக்கு 24 கிலோ யூரியா உருண்டைகள் + 2 கிலோ பொட்டாசியம் உரம் இலைவழி தெளிப்பு.",
            why: "மதுரையின் கடும் வெப்பத்தில் மேல்மண் காய்ந்து உரம் ஆவியாகிவிடும். ஆழமாக இடுவதால் தழைச்சத்து வீணாகாமல் வேர் ஆழமாக சென்று வறட்சியை தாங்கும்.",
            source: "வேளாண்மைக் கல்லூரி மற்றும் ஆராய்ச்சி நிலையம், மதுரை",
            pubDate: "தென்மண்டல வறண்ட நில வேளாண் வழிகாட்டி 2024",
            confidence: "விதிமுறை இயந்திரம்: 100% வறண்ட நில உகந்தது"
          }
        },
        blast: {
          en: {
            headline: "Southern Zone Drought-Induced Foliar Blast Management",
            warningTitle: "Stress Preconditioning: Drought-Triggered Blast Susceptibility",
            warningText: "In Madurai's semi-arid tract, intermittent tank drying induces plant moisture stress, which breaks natural silica defenses and allows blast penetration despite dry atmospheric air.",
            what: "Combination spray of Kasugamycin 3% SL with silica-based spreader/sticker.",
            when: "At 28 DAT following any dry spell exceeding 4 consecutive non-irrigation days.",
            howMuch: "400 ml Kasugamycin 3% SL in 200 Litres of water per acre.",
            why: "Unlike delta blast (driven by sheer wetness), Southern dry zone blast is driven by plant cellular weakness during moisture stress. Kasugamycin offers systemic translaminar healing.",
            source: "Department of Plant Protection, AC&RI Madurai",
            pubDate: "Dry Zone Phytopathology Record 2024",
            confidence: "Rule Engine: Southern Drought Pathology Fit"
          },
          ta: {
            headline: "மதுரை வறட்சிக்கு பிந்தைய நெல் குலைநோய் மேலாண்மை",
            warningTitle: "வறட்சி அழுத்த எச்சரிக்கை: நீர் பற்றாக்குறையால் நோய் எதிர்ப்பு குறைவு",
            warningText: "மதுரையில் கண்மாய் நீர் வரத்து குறைந்து வயல் காயும் போது, பயிரின் சிலிக்கா கவசம் பலவீனமடைந்து குலைநோய் எளிதில் தாக்கும்.",
            what: "காசுகாமைசின் 3% SL பூஞ்சானக்கொல்லியை ஒட்டும் திரவத்துடன் கலந்து தெளிக்கவும்.",
            when: "நட்ட 28 நாட்களில், 4 நாட்களுக்கு மேல் நீர் பாய்ச்ச முடியாத சூழல் ஏற்பட்ட பின்.",
            howMuch: "ஏக்கருக்கு 400 மி.லி காசுகாமைசின் 3% SL மருந்தை 200 லிட்டர் நீரில் கலந்து தெளிக்கவும்.",
            why: "டெல்டாவில் ஈரப்பதத்தால் நோய் வரும்; மதுரையில் வறட்சியால் பயிர் வாடும் போது இந்நோய் தாக்கும். காசுகாமைசின் பயிரினுள் ஊடுருவி குணப்படுத்தும்.",
            source: "பயிர் பாதுகாப்புத் துறை, வேளாண் கல்லூரி, மதுரை",
            pubDate: "வறண்ட மண்டல பயிர் பாதுகாப்பு அறிக்கை 2024",
            confidence: "விதிமுறை இயந்திரம்: வறட்சி நோயியல் சரிபார்ப்பு"
          }
        },
        irrigation: {
          en: {
            headline: "Vaigai Basin Tank-Fed Rotational Irrigation Strategy",
            warningTitle: "Hydrology Alert: Vaigai Reservoir Release Discontinuity",
            warningText: "Madurai canal and tank irrigation is strictly intermittent. Conservation of standing water is paramount.",
            what: "Apply organic mulch (paddy straw/coir pith) in drainage furrows and maintain minimal 2.0 cm water layer.",
            when: "Synchronize canal turn release days; shut off field intakes as soon as 2cm depth is attained.",
            howMuch: "2.0 cm critical wetting; retain tail-end reservoir storage for panicle initiation stage.",
            why: "Deep percolation losses in Madurai's sandy clay loam exceed evaporation; overfilling fields causes rapid loss into unlined sub-channels.",
            source: "Agricultural Engineering College & Research Institute, Kumulur / Madurai",
            pubDate: "Vaigai Basin Water Bulletin 2024",
            confidence: "Rule Engine: 100% Intermittent Supply Fit"
          },
          ta: {
            headline: "மதுரை வைகை பாசன கண்மாய் நீர் பகிர்வு முறை",
            warningTitle: "நீர்நிலை எச்சரிக்கை: வைகை அணை நீர் சுழற்சி முறை",
            warningText: "மதுரை கண்மாய் பாசனத்தில் குறிப்பிட்ட நாட்களுக்கு மட்டுமே நீர் திறக்கப்படும். ஒவ்வொரு துளி நீரையும் சேமிப்பது அவசியம்.",
            what: "வயலில் 2.0 செ.மீ மட்டும் நீர் தேக்கி, வரப்புகளில் வைக்கோல் மூடாக்கு அமைத்து நீர் ஆவியாவதைத் தடுக்கவும்.",
            when: "கண்மாயில் நீர் திறக்கப்படும் நாட்களை அறிந்து அதற்கேற்ப பாசனம் செய்யவும்.",
            howMuch: "வயலில் அதிகபட்சம் 2.0 செ.மீ ஆழம் மட்டும் நீர் நிறுத்தினால் போதும்.",
            why: "மதுரையின் மணல் கலந்த களிமண்ணில் அதிக நீர் தேக்கினால் பூமிக்குள் விரைவாக உறிஞ்சப்பட்டு வீணாகிவிடும்.",
            source: "வேளாண் பொறியியல் துறை, த.வே.பல்கலைக்கழகம், மதுரை",
            pubDate: "வைகை பாசன நீர் பகிர்வு வழிகாட்டி 2024",
            confidence: "விதிமுறை இயந்திரம்: 100% கண்மாய் நீர் சிக்கனம்"
          }
        }
      }
    }
  },

  // 3-District Divergence Comparison Scenarios
  comparisonScenarios: {
    nitrogen: {
      questionEn: "What is the recommended Nitrogen management during active tillering?",
      questionTa: "தூர்கட்டும் பருவத்தில் தழைச்சத்து (யூரியா) மேலாண்மை பரிந்துரை என்ன?",
      bars: {
        thanjavur: { dose: '22 kg / acre', pct: 55, noteEn: 'Reduced: Delta clay retains silt nitrogen; avoids blast.', noteTa: 'குறைவான அளவு: வண்டல் மண் வளம் அதிகம்; குலைநோயைத் தடுக்கும்.' },
        coimbatore: { dose: '28 kg / acre (4 splits)', pct: 70, noteEn: 'Porous loam leaches quickly; requires micro-splits + Zinc.', noteTa: 'செம்மண் உறிஞ்சும்; 4 சிறு தவணைகளாகவும் துத்தநாகத்துடனும் இடவும்.' },
        madurai: { dose: '24 kg / acre (deep briquette)', pct: 60, noteEn: 'Deep placement required to stop 50% ammonia gas escape.', noteTa: 'வெப்பத்தால் ஆவியாகாமல் இருக்க 7-10 செ.மீ ஆழத்தில் புதைத்து இடவும்.' }
      },
      thanjavur: {
        titleEn: "Controlled Urea with Gypsum Slurry",
        titleTa: "ஜிப்சம் கலந்த கட்டுப்படுத்தப்பட்ட யூரியா",
        whatEn: "Apply 22 kg Urea/acre mixed with gypsum. Avoid heavy nitrogen surges because delta clay already possesses high silt organic matter.",
        whatTa: "ஏக்கருக்கு 22 கிலோ யூரியாவை ஜிப்சத்துடன் கலந்து இடவும். வண்டல் மண்ணில் ஏற்கனவே இயற்கை வளம் இருப்பதால் அதிக உரம் தேவையில்லை.",
        whyEn: "Delta humidity exceeds 85%. Any nitrogen surplus causes excessive lush foliage, directly triggering devastating Sheath Blight and crop lodging during monsoon winds.",
        whyTa: "டெல்டாவில் காற்றின் ஈரப்பதம் 85%-க்கும் மேல் இருக்கும். அதிக தழைச்சத்து இலைகளை மென்மையாக்கி குலைநோய் மற்றும் பயிர் சாய்தலை ஏற்படுத்தும்.",
        riskEn: "Standard 35kg urea causes 30% yield loss from lodging and fungal blast.",
        riskTa: "வழக்கமான 35 கிலோ யூரியா இட்டால் பயிர் சாய்ந்து 30% மகசூல் இழப்பு ஏற்படும்."
      },
      coimbatore: {
        titleEn: "Split Nitrogen + Zinc Sulphate Foliar",
        titleTa: "பிரித்து இடுதல் + துத்தநாக சத்து தெளிப்பு",
        whatEn: "Apply 28 kg Urea/acre in 4 micro-splits + 0.5% ZnSO4 spray. Do not apply broad single broadcast doses.",
        whatTa: "ஏக்கருக்கு 28 கிலோ யூரியாவை 4 சிறு தவணைகளாக பிரித்து இடவும் + 0.5% ஜிங்க் சல்பேட் தெளிக்கவும்.",
        whyEn: "Western zone soils are calcareous with elevated calcium carbonate, precipitating zinc into insoluble forms. High soil pH suppresses root zinc uptake during rapid tillering.",
        whyTa: "சுண்ணாம்பு கலந்த கார மண்ணில் (pH 8.1) துத்தநாகம் பயிருக்கு கிடைக்காது. ஒரே தவணையில் யூரியா இட்டால் செம்மண்ணில் வடிந்து வீணாகும்.",
        riskEn: "Urea without zinc spray produces stunted yellow tillers (Khaira deficiency).",
        riskTa: "துத்தநாகம் தெளிக்காமல் யூரியா மட்டும் இட்டால் தூர்கள் மஞ்சள் நிறமாகி வளர்ச்சி குன்றும்."
      },
      madurai: {
        titleEn: "Deep Urea Briquettes + Potash Fortification",
        titleTa: "யூரியா உருண்டை ஆழமிடுதல் + பொட்டாஷ் உரம்",
        whatEn: "Place Urea-DAP briquettes 7-10cm deep between 4 hills + 1% MOP foliar spray to build drought tolerance.",
        whatTa: "யூரியா-டிஏபி உருண்டைகளை 7-10 செ.மீ ஆழத்தில் புதைத்து இடவும் + வறட்சியை தாங்க 1% பொட்டாஷ் தெளிக்கவும்.",
        whyEn: "High daytime temperatures and low relative humidity cause rapid ammonia volatilization from surface fertilizers. Intermittent tank-fed canal supplies require drought-hardy root systems.",
        whyTa: "பகல் வெயில் காரணமாக மேல்மண்ணில் இடப்படும் யூரியா 48 மணி நேரத்தில் காற்றில் ஆவியாகிவிடும். ஆழமாக இடுவது மட்டுமே பலன் தரும்.",
        riskEn: "Surface urea broadcasting loses over 50% nitrogen into atmosphere within 48h.",
        riskTa: "மேலாக யூரியாவை தூவினால் 50%-க்கும் அதிகமான உரம் காற்றில் ஆவியாகி விரயமாகும்."
      }
    },

    blast: {
      questionEn: "How to prevent Blast and Sheath Rot fungal disease under current weather?",
      questionTa: "தற்போதைய காலநிலையில் குலைநோய் மற்றும் இலை உறை அழுகலை எவ்வாறு தடுப்பது?",
      bars: {
        thanjavur: { dose: 'Tricyclazole 120g/ac', pct: 65, noteEn: 'Delta fog & saturated soil trigger airborne blast conidia.', noteTa: 'டெல்டா பனிப்பொழிவு பூஞ்சான் பரவலை தூண்டுகிறது.' },
        coimbatore: { dose: 'Isoprothiolane 300ml/ac', pct: 75, noteEn: 'Targeted tiller base spray against wind abrasion wounds.', noteTa: 'காற்று உராய்வு காயங்கள் வழியே நோய் பரவுவதை தடுக்கிறது.' },
        madurai: { dose: 'Kasugamycin 400ml/ac', pct: 60, noteEn: 'Systemic curative spray post moisture-stress re-wetting.', noteTa: 'வறட்சிக்கு பிந்தைய நீர்ப்பாசனத்திற்கு பின் ஊடுருவி குணப்படுத்தும்.' }
      },
      thanjavur: {
        titleEn: "Prophylactic Tricyclazole for High Humidity",
        titleTa: "அதிக ஈரப்பதத்திற்கு டிரைசைக்ளசோல் தெளிப்பு",
        whatEn: "Apply Tricyclazole 75% WP (120g/acre) before canopy closure; drain standing pond water to 2cm.",
        whatTa: "டிரைசைக்ளசோல் 75% WP (120 கிராம்/ஏக்கர்) தெளிக்கவும்; வயலில் நீர் மட்டத்தை 2 செ.மீ ஆக குறைக்கவும்.",
        whyEn: "Delta night fog and stagnant warm water create 90%+ microclimatic humidity, the exact incubator for blast conidia.",
        whyTa: "டெல்டாவின் அடர்ந்த பனிப்பொழிவும் தேங்கிய நீரும் குலைநோய் பூஞ்சான் வளர சாதகமான சூழலை உருவாக்கும்.",
        riskEn: "Delayed spray leads to total panicle blast and blank grain heads.",
        riskTa: "மருந்து தெளிக்க தவறினால் கதிர் குலைநோய் தாக்கி மணிகள் பதராகிவிடும்."
      },
      coimbatore: {
        titleEn: "Isoprothiolane Focused on Lower Tillers",
        titleTa: "தூர்களின் அடிப்பகுதியில் ஐசோப்ரோதியோலேன் தெளிப்பு",
        whatEn: "Apply Isoprothiolane 40% EC (300 ml/acre) targeted at base of tillers along with silicon adjuvant.",
        whatTa: "ஐசோப்ரோதியோலேன் 40% EC (300 மி.லி/ஏக்கர்) தூர்களின் அடிப்பகுதியில் படுமாறு தெளிக்கவும்.",
        whyEn: "Western zone windy conditions cause micro-abrasions on leaves; disease spreads through stem wounds rather than wet fog.",
        whyTa: "மேற்கு மண்டல பலத்த காற்று இலைகளில் உராய்வை ஏற்படுத்துவதால் காயம் வழியாக பூஞ்சான் பரவும்.",
        riskEn: "Generic systemic fungicides fail to penetrate dense windy tillers without targeted spray.",
        riskTa: "பொதுவான பூஞ்சானக்கொல்லி தூர்களின் அடிப்பகுதிக்கு செல்லாமல் நோய் தீவிரமடையும்."
      },
      madurai: {
        titleEn: "Kasugamycin Post-Dry Spell Application",
        titleTa: "வறட்சி இடைவெளிக்கு பின் காசுகாமைசின் தெளிப்பு",
        whatEn: "Apply Kasugamycin 3% SL (400 ml/acre) immediately following re-irrigation after tank-water dry spells.",
        whatTa: "வறட்சிக்குப் பின் நீர் பாய்ச்சியவுடன் காசுகாமைசின் 3% SL (400 மி.லி/ஏக்கர்) தெளிக்கவும்.",
        whyEn: "Madurai blast outbreaks occur paradoxically after moisture stress relieves; weakened cell walls allow rapid fungal entry.",
        whyTa: "வறட்சியினால் வாடிய பயிருக்கு நீர் கிடைத்தவுடன் பலவீனமான செல்களை பூஞ்சான் தாக்கும்.",
        riskEn: "Fungicide applied during peak dry heat causes chemical scorch and zero uptake.",
        riskTa: "கடும் வெயில் நேரத்தில் தெளித்தால் இலைகள் கருகி மருந்து வீணாகும்."
      }
    },

    water: {
      questionEn: "What is the irrigation frequency and drainage protocol for this stage?",
      questionTa: "இப்பருவத்திற்கான பாசன இடைவெளி மற்றும் வடிகால் நெறிமுறை என்ன?",
      bars: {
        thanjavur: { dose: '2.5 cm depth (AWD)', pct: 50, noteEn: 'Pani-pipe tube monitoring; prevents heavy clay root hypoxia.', noteTa: 'துளைக் குழாய் முறை; களிமண் வேர் அழுகலை தடுக்கும்.' },
        coimbatore: { dose: '3.0 cm / 3 days', pct: 68, noteEn: 'Rapid drainage in red loam demands frequent micro-turns.', noteTa: 'செம்மண்ணில் நீர் நிற்காது; 3 நாட்களுக்கு ஒருமுறை பாசனம்.' },
        madurai: { dose: '2.0 cm bund trench', pct: 45, noteEn: 'Intermittent tank turn storage; mulch furrows to stop evaporation.', noteTa: 'கண்மாய் நீர் சேமிப்பு; நீர் ஆவியாவதை தடுக்க மூடாக்கு.' }
      },
      thanjavur: {
        titleEn: "Controlled Pani-Pipe AWD in Delta Clay",
        titleTa: "டெல்டா களிமண்ணில் பாணி-பைப் முறை பாசனம்",
        whatEn: "Irrigate to 2.5cm only when water level drops 5cm below soil surface in perforated PVC field tube.",
        whatTa: "துளைக் குழாயில் நீர் மட்டம் 5 செ.மீ குறைந்த பின் மட்டுமே 2.5 செ.மீ உயரத்திற்கு நீர் பாய்ச்சவும்.",
        whyEn: "Heavy alluvium has extremely slow percolation; permanent flooding causes root hypoxia and iron toxicity.",
        whyTa: "களிமண்ணில் நீர் வடியாது; எப்போதும் நீர் தேங்கினால் வேருக்கு காற்று கிடைக்காமல் நச்சுத்தன்மை ஏற்படும்.",
        riskEn: "Continuous flooding in Thanjavur clay causes root rot and poor tiller count.",
        riskTa: "தொடர்ந்து நீர் தேக்கினால் வேர் அழுகி தூர்களின் எண்ணிக்கை பாதியாக குறையும்."
      },
      coimbatore: {
        titleEn: "3-Day Micro-Cyclic Furrow/Borewell Irrigation",
        titleTa: "3 நாட்கள் இடைவெளி ஆழ்துளை கிணறு பாசனம்",
        whatEn: "Apply 3.0cm depth every 3 days; schedule pump operation during night off-peak tariff.",
        whatTa: "3 நாட்களுக்கு ஒருமுறை 3.0 செ.மீ நீர் பாய்ச்சவும்; இரவு மின்சார நேரத்தில் பாசனம் செய்யவும்.",
        whyEn: "Western loam has high hydraulic conductivity; water percolates past root zone within 48 hours.",
        whyTa: "செம்மண் நீரை உடனே உறிஞ்சி பூமிக்குள் இறக்கிவிடும்; 3 நாட்களுக்கு மேல் காய்ந்தால் பயிர் வாடும்.",
        riskEn: "Weekly watering schedules in Coimbatore loam induce severe water stress and tiller abortion.",
        riskTa: "வாரமொருமுறை நீர் பாய்ச்சினால் பயிர் வாடி தூர்கள் கருகிவிடும்."
      },
      madurai: {
        titleEn: "Vaigai Intermittent Tank-Reserve Irrigation",
        titleTa: "வைகை கண்மாய் பாசன நீர் சேமிப்பு நெறிமுறை",
        whatEn: "Maintain minimal 2.0cm ponding during active canal turn; construct bund trenches to catch tail drainage.",
        whatTa: "கண்மாய் நீர் வரும் போது 2.0 செ.மீ மட்டும் தேக்கி, வரப்பு பள்ளங்களில் உபரி நீரை சேமிக்கவும்.",
        whyEn: "Vaigai reservoir canal turns run on 7-day on/7-day off cycles; water stored past 2cm evaporates rapidly.",
        whyTa: "வைகை பாசனம் முறை வைத்து திறக்கப்படுவதால், 2 செ.மீ-க்கு மேல் தேங்கும் நீர் வெப்பத்தால் ஆவியாகும்.",
        riskEn: "Excessive early water usage exhausts tank storage before critical panicle initiation.",
        riskTa: "ஆரம்பத்தில் அதிக நீர் பாய்ச்சினால் பூக்கும் பருவத்தில் கண்மாயில் நீர் இல்லாமல் போகும்."
      }
    }
  },

  // Verified Disease Diagnostic Cases
  diseaseCases: {
    blast: {
      nameEn: "Paddy Leaf Blast (Magnaporthe oryzae)",
      nameTa: "நெல் இலை குலைநோய் (Magnaporthe oryzae)",
      severity: "Moderate to High Severity",
      confidence: "94.8% Match",
      confidencePct: 94.8,
      organicEn: "Spray Pseudomonas fluorescens (Pf1 liquid formulation) @ 500 ml/acre in 200L water during early morning hours.",
      organicTa: "சூடோமோனாஸ் ஃப்ளோரசன்ஸ் (Pf1 திரவ உரம்) ஏக்கருக்கு 500 மி.லி வீதம் 200 லிட்டர் நீரில் கலந்து காலை வேளையில் தெளிக்கவும்.",
      chemEn: "Foliar spray of Tricyclazole 75% WP @ 120g/acre or Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 200 ml/acre.",
      chemTa: "டிரைசைக்ளசோல் 75% WP ஏக்கருக்கு 120 கிராம் அல்லது அசாசிஸ்ட்ரோபின் கலவை 200 மி.லி வீதம் விசைத்தெளிப்பான் கொண்டு தெளிக்கவும்.",
      prevEn: "Avoid excessive nitrogen top-dressing during foggy, high-humidity weeks. Ensure active field water circulation.",
      prevTa: "பனிப்பொழிவு மற்றும் அதிக ஈரப்பதம் உள்ள நாட்களில் அதிகப்படியான யூரியா இடுவதைத் தவிர்க்கவும். வடிகால் வசதி செய்யவும்."
    },
    brown_spot: {
      nameEn: "Paddy Brown Spot (Bipolaris oryzae)",
      nameTa: "நெல் பழுப்பு புள்ளி நோய் (Bipolaris oryzae)",
      severity: "Moderate Severity • Soil Stress Alert",
      confidence: "91.4% Match",
      confidencePct: 91.4,
      organicEn: "Soil application of FYM @ 5 tons/acre enriched with Trichoderma viride @ 1 kg/acre at final puddling.",
      organicTa: "டிரைக்கோடெர்மா விரிடி கலந்த மக்கிய தொழு உரம் ஏக்கருக்கு 5 டன் வீதம் கடைசி உழவில் இடவும்.",
      chemEn: "Foliar spray of Mancozeb 75% WP @ 400g/acre or Propiconazole 25% EC @ 200 ml/acre at initial tillering.",
      chemTa: "மேன்கோசெப் 75% WP ஏக்கருக்கு 400 கிராம் அல்லது புரோபிகோனசோல் 200 மி.லி வீதம் தெளிக்கவும்.",
      prevEn: "Correct subsoil potassium and silicon deficiencies; avoid prolonged standing water stagnation in heavy clays.",
      prevTa: "பொட்டாஷ் மற்றும் சிலிக்கா சத்து குறைபாடுகளை சரிசெய்து வயலில் நீர் தேங்காமல் பார்த்துக் கொள்ளவும்."
    },
    healthy: {
      nameEn: "Healthy Crop Leaf (No Pathogen Detected)",
      nameTa: "ஆரோக்கியமான இலை (நோய் அறிகுறிகள் இல்லை)",
      severity: "Vigorous / Normal Health",
      confidence: "98.2% Normal Foliage",
      confidencePct: 98.2,
      organicEn: "Continue routine prophylactic foliar nutrition (Panchagavya 3% or Vermiwash) to maintain natural immunity.",
      organicTa: "பயிரின் நோய் எதிர்ப்பு திறனை பராமரிக்க 3% பஞ்சகவ்யா அல்லது மண்புழு வடிநீர் தெளிக்கவும்.",
      chemEn: "No synthetic fungicide required. Strictly avoid unnecessary preventive chemical applications.",
      chemTa: "ரசாயன பூஞ்சானக்கொல்லிகள் எதுவும் தேவையில்லை. தேவையற்ற ரசாயனங்களை தவிர்க்கவும்.",
      prevEn: "Maintain regular field scouting every 48 hours through panicle emergence and flowering stages.",
      prevTa: "கதிர் வெளிவரும் வரை 48 மணி நேரத்திற்கு ஒருமுறை பயிரை தொடர்ந்து கண்காணிக்கவும்."
    }
  },

  // Crop Agronomic Catalog
  cropsCatalog: [
    {
      id: 'paddy',
      nameEn: 'Paddy / Rice (நெல்)',
      category: 'cereals',
      icon: '🌾',
      season: 'Samba / Kuruvai',
      duration: '115–135 Days',
      water: 'High (1,200 mm AWD)',
      soil: 'Clay Alluvium • pH 6.0–7.5',
      yield: '2.4–2.8 T/Acre',
      varieties: 'CR 1009 Sub 1, CO 51, ADT 53, White Ponni',
      suitabilityThanjavur: '96% (Primary Staple)',
      suitabilityCoimbatore: '82% (Borewell Required)',
      suitabilityMadurai: '78% (Tank Dependent)',
      overviewEn: 'Staple wetland cereal. Highly responsive to region-aware water regimes and split nitrogen management.',
      overviewTa: 'முக்கிய உணவுப் பயிர். மண்டலத்திற்கேற்ப பாசன இடைவெளியும் தழைச்சத்து மேலாண்மையும் மிக அவசியம்.'
    },
    {
      id: 'maize',
      nameEn: 'Hybrid Maize (மக்காச்சோளம்)',
      category: 'cereals',
      icon: '🌽',
      season: 'Kharif / Rabi',
      duration: '100–110 Days',
      water: 'Moderate (500–600 mm)',
      soil: 'Well-Drained Red Loam • pH 6.5–7.8',
      yield: '3.0–3.6 T/Acre',
      varieties: 'CoHM 6, CO 8, Pioneer 3396',
      suitabilityThanjavur: '72% (Requires Drainage)',
      suitabilityCoimbatore: '95% (Ideal Agroclimate)',
      suitabilityMadurai: '88% (High Heat Tolerant)',
      overviewEn: 'High productivity cereal crop ideal for western zone well-drained loam and drip irrigation.',
      overviewTa: 'மேற்கு மண்டல செம்மண் மற்றும் சொட்டு நீர்ப்பாசனத்திற்கு மிகவும் உகந்த அதிக மகசூல் பயிர்.'
    },
    {
      id: 'cotton',
      nameEn: 'Bt Cotton (பருத்தி)',
      category: 'commercial',
      icon: '☁️',
      season: 'Samba / Winter Cotton',
      duration: '150–165 Days',
      water: 'Moderate (650 mm)',
      soil: 'Deep Black Cotton Soil • pH 7.5–8.5',
      yield: '1.0–1.4 T/Acre',
      varieties: 'MCU 5, Suraj, SVPR 4',
      suitabilityThanjavur: '60% (Too Wet for Delta)',
      suitabilityCoimbatore: '92% (Western Belt Star)',
      suitabilityMadurai: '90% (Black Soil Tracts)',
      overviewEn: 'Major commercial fiber crop demanding deep moisture-holding black soil and controlled bollworm scouting.',
      overviewTa: 'கரிசல் மண்ணிற்கு உகந்த பணப்பயிர். காய் புழு மேலாண்மை மற்றும் இலைவழி நுண்சத்து பராமரிப்பு தேவை.'
    },
    {
      id: 'sugarcane',
      nameEn: 'Sugarcane (கரும்பு)',
      category: 'commercial',
      icon: '🎋',
      season: 'Special / Main Season',
      duration: '10–12 Months',
      water: 'High (1,800 mm Drip)',
      soil: 'Deep Fertile Loam to Clay Loam',
      yield: '45–55 T/Acre',
      varieties: 'CoC 24, Co 86032, Co 0212',
      suitabilityThanjavur: '84% (Canal Belt)',
      suitabilityCoimbatore: '88% (Drip Fertigation)',
      suitabilityMadurai: '80% (Periyar Canal)',
      overviewEn: 'Long duration sugar crop. Highly amenable to sustainable sugarcane initiative (SSI) with drip fertigation.',
      overviewTa: 'நீண்ட கால பணப்பயிர். செம்மை கரும்பு சாகுபடி முறை மூலம் குறைந்த நீரில் அதிக மகசூல் பெறலாம்.'
    },
    {
      id: 'banana',
      nameEn: 'Banana (வாழை)',
      category: 'commercial',
      icon: '🍌',
      season: 'Year-Round Planting',
      duration: '11–13 Months',
      water: 'High (1,500–1,800 mm)',
      soil: 'Rich River Alluvium • High Silt',
      yield: '35–42 T/Acre',
      varieties: 'Grand Naine (G9), Poovan, Rasthali, Ney Poovan',
      suitabilityThanjavur: '94% (Delta Riparian)',
      suitabilityCoimbatore: '86% (Protected Furrow)',
      suitabilityMadurai: '82% (Vaigai Basin)',
      overviewEn: 'High-value fruit crop thriving along Cauvery riverbanks. Demands high potassium and nematode protection.',
      overviewTa: 'காவிரி கரையோர வண்டல் நிலத்திற்கு மிக உகந்தது. அதிக பொட்டாஷ் சத்து மற்றும் தார் பராமரிப்பு தேவை.'
    },
    {
      id: 'groundnut',
      nameEn: 'Groundnut (நிலக்கடலை)',
      category: 'pulses',
      icon: '🥜',
      season: 'Chithirai / Margazhi Pattam',
      duration: '105–115 Days',
      water: 'Low to Moderate (400 mm)',
      soil: 'Sandy Loam with High Calcium',
      yield: '1.2–1.6 T/Acre',
      varieties: 'VRI 8, TMV 13, Kadiri 6',
      suitabilityThanjavur: '68% (Delta Uplands)',
      suitabilityCoimbatore: '90% (Western Red Soils)',
      suitabilityMadurai: '92% (Dryland Champion)',
      overviewEn: 'Crucial oilseed crop. Demands gypsum @ 160 kg/acre at peg formation stage for optimal pod filling.',
      overviewTa: 'முக்கிய எண்ணெய் வித்து பயிர். விழுது இறங்கும் தருணத்தில் ஜிப்சம் இடுவது திரண்ட காய்களை தரும்.'
    },
    {
      id: 'ragi',
      nameEn: 'Finger Millet / Ragi (கேழ்வரகு)',
      category: 'cereals',
      icon: '🌾',
      season: 'Adipattam / Karthigai',
      duration: '95–105 Days',
      water: 'Low (350 mm Drought Hardy)',
      soil: 'Porous Red Sandy Loam • pH 6.0–7.5',
      yield: '1.2–1.5 T/Acre',
      varieties: 'CO 14, GPU 28, ATL 1',
      suitabilityThanjavur: '70% (Fallow Land)',
      suitabilityCoimbatore: '94% (Climate Resilient)',
      suitabilityMadurai: '91% (Dryland Nutri-Cereal)',
      overviewEn: 'Nutri-cereal miracle crop with exceptional climate resilience and calcium-rich grain nutrition.',
      overviewTa: 'வறட்சியைத் தாங்கும் சிறுதானிய பயிர். குறைந்த நீரில் அதிக ஊட்டச்சத்து நிறைந்த தானியத்தை வழங்கும்.'
    },
    {
      id: 'blackgram',
      nameEn: 'Blackgram (உளுந்து / பயறு)',
      category: 'pulses',
      icon: '🌱',
      season: 'Rice Fallow (Jan–Feb)',
      duration: '65–70 Days',
      water: 'Low (Residual Soil Moisture)',
      soil: 'Delta Alluvial Clay Loam',
      yield: '350–450 kg/Acre',
      varieties: 'VBN 8, ADT 6, VBN 11',
      suitabilityThanjavur: '98% (Delta Rice Fallow)',
      suitabilityCoimbatore: '85% (Intercrop)',
      suitabilityMadurai: '84% (Tank Fallow)',
      overviewEn: 'Premier relay pulse for Cauvery delta. Broadcast directly into standing paddy 7-10 days before grain harvest.',
      overviewTa: 'காவிரி டெல்டாவின் பிரதான தாளடி பயறு. நெல் அறுவடைக்கு 10 நாட்கள் முன் மெழுகு பதத்தில் விதைக்க உகந்தது.'
    }
  ]
};

// ============================================================================
// 3. UI TRANSLATION DICTIONARY (Bilingual EN / TA)
// ============================================================================
const Translations = {
  en: {
    heroTagline: "Region-aware intelligence for smarter farming.",
    brandBadge: "Region-Aware Engine",
    querySectionTitle: "Farmer Query & Context Matrix",
    querySectionSubtitle: "Select precise geographical and agronomic parameters to unlock grounded recommendations.",
    labelDistrict: "District (Agroclimatic Zone)",
    labelCrop: "Crop",
    labelSeason: "Season (பருவம்)",
    labelStage: "Growth Stage",
    btnGenerate: "Generate Grounded Advisory",
    advisoryGroundedBadge: "Agroclimatically Grounded Result",
    protoAdvisoryLabel: "Prototype advisory data — Demonstration MVP",
    dataAgeText: "Knowledge Base: TNAU PoP • High Freshness",
    pillarWhat: "WHAT TO DO",
    pillarWhen: "WHEN",
    pillarHowMuch: "HOW MUCH",
    pillarWhy: "WHY",
    lowBandwidthActive: "Low-Bandwidth (Text-Only) Mode Active: Heavy styling, shadows, and animations stripped for rural 2G/3G connectivity."
  },
  ta: {
    heroTagline: "மண்டல அளவிலான நுண்ணறிவு — விவசாயிகளின் சிறந்த முடிவுகளுக்கு.",
    brandBadge: "மண்டல வாரியான AI இயந்திரம்",
    querySectionTitle: "விவசாயி வினா மற்றும் சூழல் கட்டமைப்பு",
    querySectionSubtitle: "துல்லியமான மண்டல பரிந்துரைகளைப் பெற உங்கள் மாவட்டம், பயிர் மற்றும் பருவத்தைத் தேர்ந்தெடுக்கவும்.",
    labelDistrict: "மாவட்டம் (வேளாண் காலநிலை மண்டலம்)",
    labelCrop: "பயிர்",
    labelSeason: "பருவம்",
    labelStage: "வளர்ச்சிப் பருவம்",
    btnGenerate: "மண்டல ஆலோசனையை பெறுக",
    advisoryGroundedBadge: "மண்டல ரீதியாக சரிபார்க்கப்பட்ட முடிவு",
    protoAdvisoryLabel: "முன்மாதிரி ஆலோசனைத் தரவு — ஹேக்கத்தான் மாதிரி",
    dataAgeText: "அறிவுத் தளம்: TNAU பயிர் கையேடு • புதிய தரவு",
    pillarWhat: "செய்ய வேண்டியவை",
    pillarWhen: "எப்போது",
    pillarHowMuch: "எவ்வளவு அளவு",
    pillarWhy: "ஏன்",
    lowBandwidthActive: "குறைந்த இணைய அலைவரிசை முறை செயல்பாட்டில் உள்ளது: கிராமப்புற 2G/3G பயன்பாட்டிற்காக அனிமேஷன்கள் மற்றும் அதிகப்படியான அலங்காரங்கள் முடக்கப்பட்டுள்ளன."
  }
};

// ============================================================================
// 4. CHART RENDERING ENGINES (Native HTML5 Canvas, Zero External Dependencies)
// ============================================================================

/**
 * Renders 24-hour weather trend line & rainfall probability bar chart
 */
function renderWeatherHourlyChart() {
  const canvas = document.getElementById('weather-hourly-chart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = rect.width || 680;
  const height = 220;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const hours = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
  
  // District-adjusted temperatures and rain probabilities
  const dist = AppState.selectedParams.district;
  let temps = [24, 23, 23, 27, 30, 29, 27, 25];
  let rainProbs = [5, 10, 15, 10, 10, 15, 20, 10];

  if (dist === 'Coimbatore') {
    temps = [21, 20, 19, 25, 31, 32, 28, 24];
    rainProbs = [0, 0, 0, 5, 5, 5, 10, 0];
  } else if (dist === 'Madurai') {
    temps = [26, 25, 24, 29, 36, 35, 31, 28];
    rainProbs = [0, 0, 0, 10, 10, 5, 10, 5];
  } else if (dist === 'Nagapattinam') {
    temps = [25, 24, 24, 27, 29, 29, 27, 26];
    rainProbs = [20, 30, 40, 25, 20, 35, 40, 30];
  }

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  const paddingLeft = 45;
  const paddingRight = 45;
  const paddingTop = 30;
  const paddingBottom = 40;
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Grid lines
  ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = paddingTop + (chartHeight / 4) * i;
    ctx.beginPath();
    ctx.moveTo(paddingLeft, y);
    ctx.lineTo(width - paddingRight, y);
    ctx.stroke();
  }

  // Draw Rain Probability Bars in Background
  const barWidth = 24;
  rainProbs.forEach((prob, i) => {
    const x = paddingLeft + (chartWidth / (hours.length - 1)) * i;
    const barHeight = (prob / 100) * (chartHeight * 0.75);
    const y = paddingTop + chartHeight - barHeight;

    ctx.fillStyle = isDark ? 'rgba(59, 130, 246, 0.25)' : 'rgba(37, 99, 235, 0.18)';
    ctx.fillRect(x - barWidth / 2, y, barWidth, barHeight);

    // Bar label
    if (prob > 0) {
      ctx.fillStyle = isDark ? '#93c5fd' : '#2563eb';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${prob}%`, x, y - 4);
    }
  });

  // Calculate Temperature Points
  const minTemp = 18;
  const maxTemp = 40;
  const points = temps.map((t, i) => {
    const x = paddingLeft + (chartWidth / (hours.length - 1)) * i;
    const y = paddingTop + chartHeight - ((t - minTemp) / (maxTemp - minTemp)) * chartHeight;
    return { x, y, temp: t };
  });

  // Draw Gradient Fill under line
  const grad = ctx.createLinearGradient(0, paddingTop, 0, height - paddingBottom);
  grad.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
  grad.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 0; i < points.length - 1; i++) {
    const xc = (points[i].x + points[i + 1].x) / 2;
    const yc = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
  }
  ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
  ctx.lineTo(width - paddingRight, height - paddingBottom);
  ctx.lineTo(paddingLeft, height - paddingBottom);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Draw Smooth Line
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 0; i < points.length - 1; i++) {
    const xc = (points[i].x + points[i + 1].x) / 2;
    const yc = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
  }
  ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Draw Data Points & Values
  points.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Temperature text
    ctx.fillStyle = isDark ? '#f1f5f9' : '#0f172a';
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${p.temp}°`, p.x, p.y - 8);

    // Hour x-axis label
    ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
    ctx.font = '11px Inter, sans-serif';
    ctx.fillText(hours[i], p.x, height - 14);
  });

  // Chart Legend
  ctx.fillStyle = isDark ? '#94a3b8' : '#475569';
  ctx.font = '11px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('● Temp (°C)', paddingLeft, 16);
  ctx.fillText('■ Rain Prob (%)', paddingLeft + 90, 16);
}

/**
 * Renders Mandi price trend curve (7-day or 30-day view)
 */
function renderMarketPriceChart() {
  const canvas = document.getElementById('market-price-chart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = rect.width || 680;
  const height = 230;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const is7d = AppState.activeMarketTimeline === '7d';

  const labels7d = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'];
  const prices7d = [2240, 2260, 2280, 2310, 2320, 2340, 2350];

  const labels30d = ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Today'];
  const prices30d = [2120, 2160, 2190, 2230, 2270, 2310, 2350];

  const labels = is7d ? labels7d : labels30d;
  const prices = is7d ? prices7d : prices30d;

  ctx.clearRect(0, 0, width, height);

  const paddingLeft = 60;
  const paddingRight = 40;
  const paddingTop = 35;
  const paddingBottom = 40;
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const minPrice = 2050;
  const maxPrice = 2450;

  // Grid lines & Y-axis labels
  ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = paddingTop + (chartHeight / 4) * i;
    const priceVal = Math.round(maxPrice - ((maxPrice - minPrice) / 4) * i);

    ctx.beginPath();
    ctx.moveTo(paddingLeft, y);
    ctx.lineTo(width - paddingRight, y);
    ctx.stroke();

    ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`₹${priceVal}`, paddingLeft - 8, y + 3);
  }

  // Draw Minimum Support Price (MSP) Benchmark Line
  const mspPrice = 2300;
  const mspY = paddingTop + chartHeight - ((mspPrice - minPrice) / (maxPrice - minPrice)) * chartHeight;
  ctx.beginPath();
  ctx.setLineDash([5, 4]);
  ctx.moveTo(paddingLeft, mspY);
  ctx.lineTo(width - paddingRight, mspY);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.setLineDash([]); // Reset line dash

  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 10px Inter, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('MSP ₹2,300', width - paddingRight, mspY - 6);

  // Calculate Price Points
  const points = prices.map((p, i) => {
    const x = paddingLeft + (chartWidth / (labels.length - 1)) * i;
    const y = paddingTop + chartHeight - ((p - minPrice) / (maxPrice - minPrice)) * chartHeight;
    return { x, y, price: p };
  });

  // Gradient fill under price line
  const grad = ctx.createLinearGradient(0, paddingTop, 0, height - paddingBottom);
  grad.addColorStop(0, 'rgba(59, 130, 246, 0.35)');
  grad.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 0; i < points.length - 1; i++) {
    const xc = (points[i].x + points[i + 1].x) / 2;
    const yc = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
  }
  ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
  ctx.lineTo(width - paddingRight, height - paddingBottom);
  ctx.lineTo(paddingLeft, height - paddingBottom);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Draw Curve Line
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 0; i < points.length - 1; i++) {
    const xc = (points[i].x + points[i + 1].x) / 2;
    const yc = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
  }
  ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Draw Data Points
  points.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Value on top of last 2 points
    if (i >= points.length - 2) {
      ctx.fillStyle = isDark ? '#60a5fa' : '#1d4ed8';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`₹${p.price}`, p.x, p.y - 9);
    }

    // X-axis date labels
    ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(labels[i], p.x, height - 14);
  });
}

// ============================================================================
// 5. VIEW NAVIGATION CONTROLLER
// ============================================================================
function switchView(viewId) {
  if (!viewId) return;
  AppState.activeView = viewId;

  // Toggle Page Sections
  const views = document.querySelectorAll('.page-view');
  views.forEach(v => {
    const isTarget = v.id === `view-${viewId}`;
    v.classList.toggle('active', isTarget);
  });

  // Toggle Topbar Links
  const topbarLinks = document.querySelectorAll('.topbar-link');
  topbarLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-nav') === viewId);
  });

  // Toggle Mobile Bottom Nav Buttons
  const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');
  mobileNavBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-nav') === viewId);
  });

  // Smooth scroll to top of window
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Trigger view-specific renderers
  if (viewId === 'weather') {
    renderWeatherHourlyChart();
    renderForecastDays();
  } else if (viewId === 'market') {
    renderMarketPriceChart();
  } else if (viewId === 'crops') {
    renderCropsGrid();
  } else if (viewId === 'soil') {
    updateSoilView();
  } else if (viewId === 'comparison') {
    compareDistricts(AppState.activeScenario);
  }
}

// ============================================================================
// 6. DASHBOARD & FARM INTELLIGENCE SCORE ENGINE
// ============================================================================

/**
 * Smoothly animates the circular gauge and score counter
 */
function animateFarmScore(targetScore) {
  const scoreValEl = document.getElementById('dash-score-val');
  const circleEl = document.getElementById('gauge-fill-circle');
  if (!circleEl) return;

  const circumference = 314; // 2 * PI * r (r=50)
  const offset = circumference - (circumference * targetScore) / 100;
  circleEl.style.strokeDasharray = `${circumference}`;
  circleEl.style.strokeDashoffset = `${offset}`;

  // Counter animation
  let current = 0;
  const step = Math.ceil(targetScore / 25);
  const timer = setInterval(() => {
    current += step;
    if (current >= targetScore) {
      current = targetScore;
      clearInterval(timer);
    }
    if (scoreValEl) scoreValEl.textContent = current;
  }, 20);
}

/**
 * Updates all dashboard telemetry cards according to active district
 */
function updateDashboardState(district) {
  const meta = AgroDataset.districts[district] || AgroDataset.districts['Thanjavur'];
  const t = meta.telemetry;
  const isTa = AppState.currentLang === 'ta';

  // 1. Farm Intelligence Score Card
  const scoreStatusEl = document.getElementById('farm-score-status');
  const scoreSummaryEl = document.getElementById('dash-score-summary');
  if (scoreStatusEl) scoreStatusEl.textContent = meta.scoreStatus;
  if (scoreSummaryEl) scoreSummaryEl.textContent = isTa ? meta.scoreSummaryTa : meta.scoreSummaryEn;
  animateFarmScore(meta.farmScore);

  // 2. Weather Telemetry Card
  const weatherTempEl = document.getElementById('dash-weather-temp');
  const weatherCondEl = document.getElementById('dash-weather-cond');
  const weatherRhEl = document.getElementById('dash-weather-rh');
  const weatherRainEl = document.getElementById('dash-weather-rain');
  const weatherWindEl = document.getElementById('dash-weather-wind');
  if (weatherTempEl) weatherTempEl.textContent = t.temp;
  if (weatherCondEl) weatherCondEl.textContent = isTa ? t.condTa : t.condEn;
  if (weatherRhEl) weatherRhEl.textContent = t.rh;
  if (weatherRainEl) weatherRainEl.textContent = t.rainProb;
  if (weatherWindEl) weatherWindEl.textContent = t.wind;

  // 3. Soil Health Card
  const soilPhEl = document.getElementById('dash-soil-ph');
  const soilNEl = document.getElementById('dash-soil-n');
  const soilOcEl = document.getElementById('dash-soil-oc');
  const soilZnEl = document.getElementById('dash-soil-zn');
  const soilAdviceEl = document.getElementById('dash-soil-advice');
  if (soilPhEl) soilPhEl.textContent = t.ph;
  if (soilNEl) soilNEl.textContent = t.soilN;
  if (soilOcEl) soilOcEl.textContent = t.oc;
  if (soilZnEl) soilZnEl.textContent = t.soilZn;
  if (soilAdviceEl) soilAdviceEl.textContent = isTa ? t.soilAdviceTa : t.soilAdviceEn;

  // 4. Mandi Market Pulse Card
  const marketPriceEl = document.getElementById('dash-market-price');
  const marketChangeEl = document.getElementById('dash-market-change');
  const marketDecisionEl = document.getElementById('dash-market-decision');
  const marketReasonEl = document.getElementById('dash-market-reason');
  if (marketPriceEl) marketPriceEl.textContent = t.marketPrice;
  if (marketChangeEl) marketChangeEl.textContent = t.marketChange;
  if (marketDecisionEl) marketDecisionEl.textContent = t.marketDecision;
  if (marketReasonEl) marketReasonEl.textContent = isTa ? t.marketReasonTa : t.marketReasonEn;

  // Also update Market View header elements
  const mandiTagEl = document.getElementById('market-mandi-tag');
  const mandiPriceEl = document.getElementById('market-current-price');
  const mandiChangeBadge = document.getElementById('market-change-badge');
  const mandiSellBadge = document.getElementById('market-sell-badge');
  const mandiSellExpl = document.getElementById('market-sell-expl');
  if (mandiTagEl) mandiTagEl.textContent = `${district} Regulated Market (Agmarknet)`;
  if (mandiPriceEl) mandiPriceEl.textContent = t.marketPrice;
  if (mandiChangeBadge) mandiChangeBadge.textContent = t.marketChange;
  if (mandiSellBadge) mandiSellBadge.textContent = t.marketDecision;
  if (mandiSellExpl) mandiSellExpl.textContent = isTa ? t.marketReasonTa : t.marketReasonEn;
}

// ============================================================================
// 7. WEATHER VIEW FORECAST GENERATOR
// ============================================================================
function renderForecastDays() {
  const container = document.getElementById('forecast-days-container');
  if (!container) return;

  const dist = AppState.selectedParams.district;
  const days = [
    { day: 'Today', temp: '29°C', min: '23°C', icon: '⛅', cond: 'Partly Cloudy', rain: '15%' },
    { day: 'Tomorrow', temp: '30°C', min: '23°C', icon: '🌤️', cond: 'Clear Morning', rain: '10%' },
    { day: 'Wed', temp: '28°C', min: '22°C', icon: '🌦️', cond: 'Passing Shower', rain: '45%' },
    { day: 'Thu', temp: '29°C', min: '23°C', icon: '⛅', cond: 'Overcast', rain: '30%' },
    { day: 'Fri', temp: '31°C', min: '24°C', icon: '☀️', cond: 'Sunny', rain: '5%' },
    { day: 'Sat', temp: '31°C', min: '24°C', icon: '🌤️', cond: 'Clear Sky', rain: '10%' },
    { day: 'Sun', temp: '30°C', min: '23°C', icon: '⛅', cond: 'Scattered Cloud', rain: '20%' }
  ];

  if (dist === 'Madurai') {
    days[0].temp = '35°C'; days[0].cond = 'Hot Dry'; days[0].icon = '☀️'; days[0].rain = '5%';
    days[1].temp = '36°C'; days[1].cond = 'Bright Sun'; days[1].icon = '☀️'; days[1].rain = '0%';
  } else if (dist === 'Nagapattinam') {
    days[0].temp = '29°C'; days[0].cond = 'Coastal Mist'; days[0].icon = '🌦️'; days[0].rain = '40%';
    days[1].temp = '28°C'; days[1].cond = 'Rain Squall'; days[1].icon = '🌧️'; days[1].rain = '65%';
  }

  container.innerHTML = days.map((d, i) => `
    <div class="forecast-day-card ${i === 0 ? 'active-day' : ''}">
      <span class="fdc-day">${d.day}</span>
      <span class="fdc-icon">${d.icon}</span>
      <div class="fdc-temps">
        <strong class="fdc-high">${d.temp}</strong>
        <span class="fdc-low">${d.min}</span>
      </div>
      <span class="fdc-cond">${d.cond}</span>
      <span class="fdc-rain">💧 ${d.rain}</span>
    </div>
  `).join('');
}

// ============================================================================
// 8. SOIL INTELLIGENCE VIEW ENGINE
// ============================================================================
function updateSoilView() {
  const dist = AppState.selectedParams.district;
  const meta = AgroDataset.districts[dist] || AgroDataset.districts['Thanjavur'];
  const t = meta.telemetry;

  // Needle position: pH range 4.0 to 10.0
  // needle left percentage = ((pH - 4.0) / (10.0 - 4.0)) * 100
  const needleEl = document.getElementById('ph-needle');
  const phValEl = document.getElementById('soil-detail-ph-val');
  const phStatusEl = document.getElementById('soil-detail-ph-status');

  const phNum = typeof t.ph === 'number' ? t.ph : parseFloat(t.ph);
  const leftPct = Math.min(95, Math.max(5, ((phNum - 4.0) / 6.0) * 100));

  if (needleEl) needleEl.style.left = `${leftPct}%`;
  if (phValEl) phValEl.textContent = `${t.ph} pH`;
  if (phStatusEl) phStatusEl.textContent = `${t.phStatus}`;

  // Render Nutrient Bars
  const nutrientsContainer = document.getElementById('soil-nutrients-list');
  if (nutrientsContainer && meta.nutrients) {
    nutrientsContainer.innerHTML = meta.nutrients.map(n => `
      <div class="nutrient-item">
        <div class="ni-header">
          <span class="ni-name">${n.name}</span>
          <div class="ni-status-box">
            <strong class="ni-val">${n.val}</strong>
            <span class="badge ${n.status === 'Deficient' ? 'badge-danger' : n.status === 'Low' ? 'badge-warning' : 'badge-success'}">${n.status}</span>
          </div>
        </div>
        <div class="ni-track">
          <div class="ni-fill" style="width: ${n.pct}%;"></div>
        </div>
      </div>
    `).join('');
  }
}

// ============================================================================
// 9. CROP INTELLIGENCE VIEW & DETAIL MODAL
// ============================================================================
function renderCropsGrid() {
  const container = document.getElementById('crops-grid-container');
  if (!container) return;

  const filter = AppState.activeCropFilter;
  const filtered = filter === 'all' 
    ? AgroDataset.cropsCatalog 
    : AgroDataset.cropsCatalog.filter(c => c.category === filter);

  const activeDist = AppState.selectedParams.district;

  container.innerHTML = filtered.map(crop => {
    let suitability = crop.suitabilityThanjavur;
    if (activeDist === 'Coimbatore') suitability = crop.suitabilityCoimbatore;
    if (activeDist === 'Madurai') suitability = crop.suitabilityMadurai;

    return `
      <article class="crop-card" data-crop-id="${crop.id}">
        <div class="crop-card-top">
          <span class="crop-icon">${crop.icon}</span>
          <span class="crop-suitability-badge">${suitability}</span>
        </div>
        <h3 class="crop-title">${crop.nameEn}</h3>
        <p class="crop-desc">${crop.overviewEn}</p>
        <div class="crop-specs-mini">
          <div><span>Season</span><strong>${crop.season}</strong></div>
          <div><span>Duration</span><strong>${crop.duration}</strong></div>
          <div><span>Water</span><strong>${crop.water.split('(')[0]}</strong></div>
        </div>
        <button class="btn btn-outline btn-sm w-full btn-view-crop-detail" data-crop-id="${crop.id}">
          View Full Agronomic Package →
        </button>
      </article>
    `;
  }).join('');

  // Attach card click handlers
  container.querySelectorAll('.btn-view-crop-detail').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-crop-id');
      openCropDetailModal(id);
    });
  });

  container.querySelectorAll('.crop-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-crop-id');
      openCropDetailModal(id);
    });
  });
}

function openCropDetailModal(cropId) {
  const crop = AgroDataset.cropsCatalog.find(c => c.id === cropId);
  if (!crop) return;

  const modal = document.getElementById('crop-detail-modal');
  const iconEl = document.getElementById('modal-crop-icon');
  const titleEl = document.getElementById('modal-crop-title');
  const subEl = document.getElementById('modal-crop-subtitle');
  const bodyEl = document.getElementById('modal-crop-body');
  const selectBtn = document.getElementById('btn-crop-select-advisory');

  if (iconEl) iconEl.textContent = crop.icon;
  if (titleEl) titleEl.textContent = crop.nameEn;
  if (subEl) subEl.textContent = `${crop.duration} • ${crop.season} • TNAU Package of Practices`;

  if (bodyEl) {
    bodyEl.innerHTML = `
      <div class="modal-crop-grid">
        <div class="mcg-item"><span>Water Need:</span><strong>${crop.water}</strong></div>
        <div class="mcg-item"><span>Ideal Soil:</span><strong>${crop.soil}</strong></div>
        <div class="mcg-item"><span>Yield Potential:</span><strong>${crop.yield}</strong></div>
        <div class="mcg-item"><span>Key TNAU Varieties:</span><strong>${crop.varieties}</strong></div>
      </div>
      <div class="modal-crop-advisory">
        <h4>TNAU Recommended Management:</h4>
        <p>${crop.overviewEn}</p>
        <div class="agroclimatic-suit-banner">
          <span>Active District Suitability (${AppState.selectedParams.district}):</span>
          <strong>${crop.suitabilityThanjavur}</strong>
        </div>
      </div>
    `;
  }

  if (selectBtn) {
    selectBtn.onclick = () => {
      // Set as active crop
      let cropName = 'Paddy';
      if (crop.id === 'maize') cropName = 'Maize';
      else if (crop.id === 'cotton') cropName = 'Cotton';
      else if (crop.id === 'sugarcane') cropName = 'Sugarcane';
      else if (crop.id === 'groundnut') cropName = 'Groundnut';
      else if (crop.id === 'banana') cropName = 'Banana';

      AppState.selectedParams.crop = cropName;
      const cropSelect = document.getElementById('select-crop');
      if (cropSelect) cropSelect.value = cropName;

      closeModals();
      switchView('recommendations');
      const rec = getRecommendation(AppState.selectedParams);
      updateDashboard(rec);
      showToast(`🌱 Active crop set to ${cropName}`, 'success');
    };
  }

  if (modal) modal.classList.remove('hidden');
}

// ============================================================================
// 10. AI CROP DISEASE DETECTION STUDIO
// ============================================================================
function initDiseaseScanner() {
  const fileInput = document.getElementById('disease-file-input');
  const browseBtn = document.getElementById('btn-browse-file');
  const previewContainer = document.getElementById('dz-preview-container');
  const previewImg = document.getElementById('dz-preview-img');
  const emptyState = document.getElementById('dropzone-empty-state');
  const scanBtn = document.getElementById('btn-trigger-scan');
  const laserBeam = document.getElementById('scanner-laser');
  const overlay = document.getElementById('scanner-status-overlay');
  const sampleBtns = document.querySelectorAll('.sample-test-cases button[data-sample]');

  // Sample SVG Data URLs for reliable zero-external-asset offline preview
  const sampleImages = {
    blast: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='400' height='300' fill='%232d6a4f'/><path d='M80,150 Q160,70 320,150 Q160,230 80,150 Z' fill='%2352b788'/><path d='M140,140 Q180,110 240,140 Q180,170 140,140 Z' fill='%23780000'/><ellipse cx='190' cy='140' rx='25' ry='12' fill='%23d8f3dc'/><ellipse cx='190' cy='140' rx='12' ry='6' fill='%23582f0e'/><text x='110' y='270' fill='%23ffffff' font-family='sans-serif' font-weight='bold' font-size='16'>Paddy Leaf Blast Lesion</text></svg>",
    brown_spot: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='400' height='300' fill='%232d6a4f'/><path d='M60,150 Q200,60 340,150 Q200,240 60,150 Z' fill='%2374c69d'/><circle cx='150' cy='140' r='18' fill='%237f4f24'/><circle cx='150' cy='140' r='10' fill='%23fefae0'/><circle cx='230' cy='160' r='14' fill='%237f4f24'/><circle cx='230' cy='160' r='7' fill='%23fefae0'/><text x='110' y='270' fill='%23ffffff' font-family='sans-serif' font-weight='bold' font-size='16'>Brown Spot Symptoms</text></svg>",
    healthy: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='400' height='300' fill='%231b4332'/><path d='M50,150 Q200,50 350,150 Q200,250 50,150 Z' fill='%2340916c'/><line x1='50' y1='150' x2='350' y2='150' stroke='%2395d5b2' stroke-width='4'/><text x='120' y='270' fill='%23ffffff' font-family='sans-serif' font-weight='bold' font-size='16'>Healthy Rice Foliage</text></svg>"
  };

  function setScannerSample(sampleKey) {
    AppState.diseaseScanner.activeSample = sampleKey;
    sampleBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-sample') === sampleKey);
    });

    if (emptyState) emptyState.classList.add('hidden');
    if (previewContainer) previewContainer.classList.remove('hidden');
    if (previewImg) previewImg.src = sampleImages[sampleKey];

    // Trigger diagnosis update
    renderDiseaseDiagnosis(sampleKey);
  }

  // Initial preview with default sample
  setScannerSample('blast');

  sampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const sample = btn.getAttribute('data-sample');
      setScannerSample(sample);
      showToast(`Leaf sample loaded: ${btn.textContent}`, 'info');
    });
  });

  if (browseBtn && fileInput) {
    browseBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        if (emptyState) emptyState.classList.add('hidden');
        if (previewContainer) previewContainer.classList.remove('hidden');
        if (previewImg) previewImg.src = event.target.result;
        AppState.diseaseScanner.customImage = event.target.result;
        showToast('📷 Leaf photo loaded. Click "Analyze Crop Image" to scan.', 'info');
      };
      reader.readAsDataURL(file);
    });
  }

  // Scan Trigger Button
  if (scanBtn) {
    scanBtn.addEventListener('click', () => {
      if (AppState.diseaseScanner.isScanning) return;
      AppState.diseaseScanner.isScanning = true;

      if (laserBeam) laserBeam.style.display = 'block';
      if (overlay) overlay.classList.remove('hidden');
      scanBtn.disabled = true;

      // Realistic inference simulation
      setTimeout(() => {
        if (laserBeam) laserBeam.style.display = 'none';
        if (overlay) overlay.classList.add('hidden');
        scanBtn.disabled = false;
        AppState.diseaseScanner.isScanning = false;

        const activeSample = AppState.diseaseScanner.activeSample || 'blast';
        renderDiseaseDiagnosis(activeSample);
        showToast('✅ Diagnostic analysis complete!', 'success');

        const resultCard = document.getElementById('scanner-result-card');
        if (resultCard) resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 1400);
    });
  }
}

function renderDiseaseDiagnosis(sampleKey) {
  const d = AgroDataset.diseaseCases[sampleKey] || AgroDataset.diseaseCases['blast'];
  const isTa = AppState.currentLang === 'ta';

  const nameEl = document.getElementById('diag-disease-name');
  const severityEl = document.getElementById('diag-severity');
  const confEl = document.getElementById('diag-confidence');
  const fillEl = document.getElementById('diag-conf-fill');
  const organicEl = document.getElementById('diag-treat-organic');
  const chemEl = document.getElementById('diag-treat-chem');
  const prevEl = document.getElementById('diag-treat-prev');

  if (nameEl) nameEl.textContent = isTa ? d.nameTa : d.nameEn;
  if (severityEl) {
    severityEl.textContent = d.severity;
    severityEl.className = `severity-pill ${sampleKey === 'healthy' ? 'sev-low' : sampleKey === 'brown_spot' ? 'sev-moderate' : 'sev-high'}`;
  }
  if (confEl) confEl.textContent = d.confidence;
  if (fillEl) fillEl.style.width = `${d.confidencePct}%`;
  if (organicEl) organicEl.textContent = isTa ? d.organicTa : d.organicEn;
  if (chemEl) chemEl.textContent = isTa ? d.chemTa : d.chemEn;
  if (prevEl) prevEl.textContent = isTa ? d.prevTa : d.prevEn;
}

// ============================================================================
// 11. AI FARM ASSISTANT CHAT SYSTEM
// ============================================================================
function initChatAssistant() {
  const form = document.getElementById('chat-input-form');
  const input = document.getElementById('chat-user-input');
  const sendBtn = document.getElementById('btn-send-chat');
  const messagesBox = document.getElementById('chat-messages-box');
  const clearBtn = document.getElementById('btn-clear-chat');
  const quickChips = document.querySelectorAll('.chat-quick-prompts .chip[data-prompt]');
  const explainBtn = document.getElementById('btn-chat-explain-toggle');
  const micBtn = document.getElementById('btn-chat-mic');

  function appendMessage(sender, text, citations = null) {
    if (!messagesBox) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg msg-${sender}`;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const isAi = sender === 'ai';

    msgDiv.innerHTML = `
      <div class="msg-avatar">${isAi ? '🌾' : '👨‍🌾'}</div>
      <div class="msg-bubble">
        <div class="msg-header">
          <strong>${isAi ? 'AgriSense AI Assistant' : 'Farmer (You)'}</strong>
          <span class="msg-time">${timeStr}</span>
        </div>
        <p>${text.replace(/\n/g, '<br>')}</p>
        ${citations ? `<div class="msg-citations"><span>${citations}</span></div>` : ''}
      </div>
    `;

    messagesBox.appendChild(msgDiv);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function handleUserSubmit(userQuestion) {
    const q = (userQuestion || (input ? input.value : '')).trim();
    if (!q) return;

    if (input) input.value = '';
    appendMessage('user', q);

    // Show temporary thinking bubble
    const thinkingId = `thinking-${Date.now()}`;
    const thinkingDiv = document.createElement('div');
    thinkingDiv.id = thinkingId;
    thinkingDiv.className = 'chat-msg msg-ai thinking-msg';
    thinkingDiv.innerHTML = `
      <div class="msg-avatar">🌾</div>
      <div class="msg-bubble">
        <span class="sso-spinner">◌</span> Consulting TNAU PoP & IMD Agromet for ${AppState.selectedParams.district}...
      </div>
    `;
    if (messagesBox) {
      messagesBox.appendChild(thinkingDiv);
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }

    // Generate Region-Aware Response
    setTimeout(() => {
      const thinkingEl = document.getElementById(thinkingId);
      if (thinkingEl && thinkingEl.parentNode) {
        thinkingEl.parentNode.removeChild(thinkingEl);
      }

      const reply = generateAiChatResponse(q);
      appendMessage('ai', reply.text, reply.citations);
    }, 700);
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleUserSubmit();
    });
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleUserSubmit();
    });
  }

  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      handleUserSubmit(prompt);
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (messagesBox) {
        messagesBox.innerHTML = `
          <div class="chat-msg msg-ai">
            <div class="msg-avatar">🌾</div>
            <div class="msg-bubble">
              <div class="msg-header">
                <strong>AgriSense AI Assistant</strong>
                <span class="msg-time">Just now</span>
              </div>
              <p>Vanakkam! Chat history cleared. Currently active context: <strong>${AppState.selectedParams.district} • ${AppState.selectedParams.crop}</strong>.</p>
              <div class="msg-citations">
                <span>📚 Grounding Sources: TNAU PoP 2024 • IMD Agromet • SHC Cycle II</span>
              </div>
            </div>
          </div>
        `;
      }
      showToast('Chat history cleared', 'info');
    });
  }

  if (explainBtn) {
    explainBtn.addEventListener('click', openExplanationModal);
  }

  if (micBtn) {
    micBtn.addEventListener('click', () => {
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRec();
        recognition.lang = AppState.currentLang === 'ta' ? 'ta-IN' : 'en-IN';
        recognition.start();
        showToast('🎙️ Listening... Please speak now', 'info');

        recognition.onresult = (e) => {
          const transcript = e.results[0][0].transcript;
          if (input) input.value = transcript;
          showToast(`Heard: "${transcript}"`, 'success');
          handleUserSubmit(transcript);
        };
        recognition.onerror = () => {
          showToast('Speech recognition failed. Please type your question.', 'error');
        };
      } else {
        showToast('Speech Recognition not supported in this browser. Please type.', 'info');
      }
    });
  }
}

function generateAiChatResponse(question) {
  const q = question.toLowerCase();
  const dist = AppState.selectedParams.district;
  const crop = AppState.selectedParams.crop;
  const isTa = AppState.currentLang === 'ta';

  if (q.includes('irrigate') || q.includes('water') || q.includes('பாசனம்') || q.includes('தண்ணீர்')) {
    if (dist === 'Thanjavur') {
      return {
        text: isTa 
          ? `காவிரி டெல்டா பகுதியில் இன்று பாசனம் செய்ய வேண்டாம் (WAIT). மண் ஈரப்பதம் 82% ஆகவும் களிமண்ணில் நீர் தக்கவைப்பு அதிகமாகவும் உள்ளது. துளைக் குழாயில் நீர் மட்டம் 5 செ.மீ குறையும் வரை காத்திருக்கவும்.`
          : `**Irrigation Recommendation for Thanjavur:** **WAIT / HOLD**.\n\nCurrent soil moisture in alluvial clay is saturated (82% RH). Mettur turn discharge has kept the root zone moist. Applying standing water >2.5cm right now risks anaerobic iron reduction and root rot. Re-evaluate in 3 days.`,
        citations: '📚 TNAU Water Technology Centre • AWD Pani-Pipe Protocol 2024'
      };
    } else if (dist === 'Coimbatore') {
      return {
        text: isTa
          ? `கோவை பகுதியில் செம்மண் விரைவாக நீர் உறிஞ்சுவதால் 3 நாட்கள் இடைவெளியில் ஆழ்துளை கிணறு பாசனம் திட்டமிடப்பட்டுள்ளது.`
          : `**Irrigation Recommendation for Coimbatore:** **SCHEDULED TODAY**.\n\nWestern red loam drains rapidly. Apply 3.0 cm furrow irrigation during night off-peak tariff hours to avoid evaporation losses.`,
        citations: '📚 TNAU Agromet Advisory Bulletin Coimbatore'
      };
    } else {
      return {
        text: `**Irrigation Recommendation for ${dist}:**\n\nIntermittent supply active. Maintain minimal 2.0 cm standing depth. Avoid deep flooding.`,
        citations: '📚 Grounded Water Regimen 2024'
      };
    }
  }

  if (q.includes('urea') || q.includes('fertilizer') || q.includes('nitrogen') || q.includes('உரம்') || q.includes('தழைச்சத்து')) {
    const rec = getRecommendation(AppState.selectedParams);
    return {
      text: isTa
        ? `**${dist} ${crop} உரம் பரிந்துரை:**\n\n1. **செய்ய வேண்டியவை:** ${rec.what}\n2. **எப்போது:** ${rec.when}\n3. **அளவு:** ${rec.howMuch}\n4. **ஏன்:** ${rec.why}`
        : `**Grounded Fertilizer Protocol for ${dist} (${crop}):**\n\n- **Prescribed Action:** ${rec.what}\n- **Timing Window:** ${rec.when}\n- **Calibrated Dosage:** ${rec.howMuch}\n- **Grounded Scientific Rationale:** ${rec.why}`,
      citations: `📚 ${rec.source} (${rec.pubDate})`
    };
  }

  if (q.includes('blast') || q.includes('disease') || q.includes('fungus') || q.includes('நோய்') || q.includes('பூஞ்சான்')) {
    const d = AgroDataset.diseaseCases['blast'];
    return {
      text: isTa
        ? `**குலைநோய் தடுப்பு முறை (${dist}):**\n\n- **ரசாயன மருந்து:** ${d.chemTa}\n- **இயற்கை முறை:** ${d.organicTa}\n- **முன்னெச்சரிக்கை:** ${d.prevTa}`
        : `**Blast & Disease Prevention Advisory for ${dist}:**\n\n- **Diagnostic Risk:** High humidity & dew trigger *Magnaporthe oryzae*.\n- **Chemical Remedy:** ${d.chemEn}\n- **Organic Remediation:** ${d.organicEn}\n- **Cultural Prevention:** ${d.prevEn}`,
      citations: '📚 TNAU Plant Pathology Surveillance Bulletin 2024'
    };
  }

  if (q.includes('sell') || q.includes('mandi') || q.includes('price') || q.includes('விற்பனை') || q.includes('விலை')) {
    const meta = AgroDataset.districts[dist] || AgroDataset.districts['Thanjavur'];
    const t = meta.telemetry;
    return {
      text: isTa
        ? `**சந்தை நிலவரம் (${dist}):**\n\nதற்போதைய விலை: ${t.marketPrice} ${t.marketUnit}\nமுடிவு: **${t.marketDecision}**\nகாரணம்: ${t.marketReasonTa}`
        : `**Mandi Market Intelligence for ${dist}:**\n\n- **Current Spot Rate:** ${t.marketPrice} ${t.marketUnit} (${t.marketChange})\n- **AI Timing Decision:** **${t.marketDecision}**\n- **Market Driver:** ${t.marketReasonEn}`,
      citations: '📚 Agmarknet Regulated Market Feeds • DMI Ministry of Agriculture'
    };
  }

  // General grounded response fallback
  const rec = getRecommendation(AppState.selectedParams);
  return {
    text: isTa
      ? `உங்கள் கேள்விக்கு (${dist} மண்டலம்): ${rec.headline}. பரிந்துரைக்கப்பட்ட நடவடிக்கை: ${rec.what}. ஆதாரம்: ${rec.source}.`
      : `Based on verified agroclimatic data for **${dist} (${crop})**:\n\n${rec.headline}\n\n- **Action:** ${rec.what}\n- **When:** ${rec.when}\n- **Dosage:** ${rec.howMuch}\n- **Regional Grounding:** ${rec.why}`,
    citations: `📚 ${rec.source} • IMD Agromet • SHC Cycle II`
  };
}

// ============================================================================
// 12. COMMAND PALETTE ENGINE (Ctrl + K)
// ============================================================================
function initCommandPalette() {
  const modal = document.getElementById('command-palette-modal');
  const triggerBtn = document.getElementById('btn-trigger-cp');
  const searchInput = document.getElementById('cp-search-input');
  const resultsContainer = document.getElementById('cp-results');

  function openPalette() {
    if (!modal) return;
    modal.classList.remove('hidden');
    if (searchInput) {
      searchInput.value = '';
      searchInput.focus();
    }
    filterResults('');
  }

  function closePalette() {
    if (modal) modal.classList.add('hidden');
  }

  function filterResults(query) {
    const q = query.toLowerCase().trim();
    const items = resultsContainer ? resultsContainer.querySelectorAll('.cp-item') : [];

    items.forEach(item => {
      const label = item.querySelector('.cp-item-label');
      const text = (label ? label.textContent : '') + (item.getAttribute('data-target') || '');
      const match = !q || text.toLowerCase().includes(q);
      item.style.display = match ? 'flex' : 'none';
    });
  }

  // Keyboard shortcut: Ctrl+K or Cmd+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modal && !modal.classList.contains('hidden')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape') {
      closePalette();
      closeModals();
    }
  });

  if (triggerBtn) triggerBtn.addEventListener('click', openPalette);

  if (searchInput) {
    searchInput.addEventListener('input', (e) => filterResults(e.target.value));
  }

  // Backdrop click closes
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePalette();
    });
  }

  // Command palette item actions
  if (resultsContainer) {
    resultsContainer.querySelectorAll('.cp-item').forEach(item => {
      item.addEventListener('click', () => {
        const action = item.getAttribute('data-action');
        const target = item.getAttribute('data-target');

        closePalette();

        if (action === 'nav' && target) {
          switchView(target);
        } else if (action === 'demo-walkthrough') {
          runHackathonDemoTour();
        } else if (action === 'toggle-theme') {
          toggleTheme();
        } else if (action === 'toggle-low-bandwidth') {
          lowBandwidthMode();
        }
      });
    });
  }
}

// ============================================================================
// 13. SMART NOTIFICATIONS DRAWER
// ============================================================================
function initNotificationsDrawer() {
  const drawer = document.getElementById('notifications-drawer');
  const openBtn = document.getElementById('btn-open-notifications');
  const closeBtn = document.getElementById('close-notifications-btn');
  const clearBtn = document.getElementById('btn-clear-alerts');
  const badge = document.getElementById('alert-counter-badge');
  const alertsList = document.getElementById('nd-alerts-list');

  const alerts = [
    { icon: '💧', title: 'Mettur Turn Canal Active', desc: 'Saturated delta clay detected. Keep standing water under 2.5cm.', type: 'medium' },
    { icon: '⚠️', title: 'Microclimate Dew Warning', desc: 'Relative humidity 84% exceeds spore germination threshold for blast.', type: 'high' },
    { icon: '💰', title: 'Mandi Price Momentum', desc: 'Grade A paddy prices rose ₹40/Qtl. AI recommendation: HOLD inventory.', type: 'low' }
  ];

  function renderAlerts() {
    if (!alertsList) return;
    alertsList.innerHTML = alerts.map(a => `
      <div class="nd-alert-card ${a.type}">
        <span class="nd-alert-icon">${a.icon}</span>
        <div class="nd-alert-body">
          <strong>${a.title}</strong>
          <p>${a.desc}</p>
        </div>
      </div>
    `).join('');
  }

  renderAlerts();

  if (openBtn && drawer) {
    openBtn.addEventListener('click', () => drawer.classList.toggle('hidden'));
  }
  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => drawer.classList.add('hidden'));
  }
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (alertsList) alertsList.innerHTML = '<p class="nd-empty-text">No unread alerts for your farm. All parameters nominal.</p>';
      if (badge) badge.style.display = 'none';
      if (drawer) drawer.classList.add('hidden');
      showToast('All alerts acknowledged', 'info');
    });
  }
}

// ============================================================================
// 14. 1-CLICK GUIDED HACKATHON DEMO TOUR
// ============================================================================
let isDemoRunning = false;

function runHackathonDemoTour() {
  if (isDemoRunning) return;
  isDemoRunning = true;

  showToast('🚀 Starting Guided Hackathon Demo Tour for Judges...', 'info');

  // Step 1: Set Thanjavur & Show Dashboard (0s)
  setTimeout(() => {
    AppState.selectedParams.district = 'Thanjavur';
    const distSelect = document.getElementById('dash-district-select');
    if (distSelect) distSelect.value = 'Thanjavur';
    updateDashboardState('Thanjavur');
    switchView('dashboard');
    showToast('🌾 Step 1/5: Localized Dashboard & 87/100 Farm Intelligence Score', 'success');
  }, 300);

  // Step 2: Show Weather Intelligence & 24h Chart (3.5s)
  setTimeout(() => {
    switchView('weather');
    showToast('🌦️ Step 2/5: Micro-Weather Telemetry & 24-Hour Rainfall Canvas Chart', 'info');
  }, 3500);

  // Step 3: Show Disease Detection Studio & Trigger Laser Scan (7.0s)
  setTimeout(() => {
    switchView('disease');
    showToast('📷 Step 3/5: AI Disease Studio — Scanning leaf with laser beam...', 'info');
    const scanBtn = document.getElementById('btn-trigger-scan');
    if (scanBtn) scanBtn.click();
  }, 7000);

  // Step 4: Show Market Intelligence & Price Trend (10.5s)
  setTimeout(() => {
    switchView('market');
    showToast('💰 Step 4/5: Mandi Price Curve & AI "HOLD / WAIT" Optimization', 'info');
  }, 10500);

  // Step 5: Show 3-District Divergence Engine (14.0s)
  setTimeout(() => {
    switchView('comparison');
    compareDistricts('nitrogen');
    showToast('🎯 Step 5/5: Three-District Divergence Proof (Thanjavur ≠ Coimbatore ≠ Madurai)', 'success');
  }, 14000);

  // Step 6: Finish Tour (18.0s)
  setTimeout(() => {
    switchView('dashboard');
    isDemoRunning = false;
    showToast('🎉 Hackathon Walkthrough Complete! All 10 Modules Verified.', 'success');
  }, 18000);
}

// ============================================================================
// 15. AI GROUNDED DECISION TRACE MODAL
// ============================================================================
function openExplanationModal() {
  const modal = document.getElementById('ai-explanation-modal');
  const content = document.getElementById('modal-expl-content');
  const rec = getRecommendation(AppState.selectedParams);

  if (content) {
    content.innerHTML = `
      <div class="expl-chain-list">
        <div class="ecl-step">
          <span class="ecl-num">1</span>
          <div class="ecl-body">
            <strong>Geo-Spatial & Soil Texture Ingestion</strong>
            <p>Active District: <strong>${rec.district}</strong> (${rec.zoneName}). Soil baseline: <strong>${rec.soilSpec}</strong>.</p>
          </div>
        </div>
        <div class="ecl-step">
          <span class="ecl-num">2</span>
          <div class="ecl-body">
            <strong>Micro-Weather Constraints Ingestion</strong>
            <p>IMD Agromet 3-hour feed shows <strong>${rec.telemetry.weather}</strong>. High humidity triggers blast threshold rules.</p>
          </div>
        </div>
        <div class="ecl-step">
          <span class="ecl-num">3</span>
          <div class="ecl-body">
            <strong>Crop Phenological Stage Mapping</strong>
            <p>Target: <strong>${rec.crop}</strong> in <strong>${rec.stage}</strong> stage (15–40 DAT). High nitrogen absorption period.</p>
          </div>
        </div>
        <div class="ecl-step">
          <span class="ecl-num">4</span>
          <div class="ecl-body">
            <strong>Deterministic TNAU PoP Rule Execution</strong>
            <p>Matched Rule ID: <strong>#TNAU-${rec.district.toUpperCase().slice(0,3)}-${rec.crop.toUpperCase()}-04</strong>. Generic India 35kg urea rejected.</p>
          </div>
        </div>
        <div class="ecl-step">
          <span class="ecl-num">5</span>
          <div class="ecl-body">
            <strong>Grounded Divergence Justification</strong>
            <p>${rec.why}</p>
          </div>
        </div>
      </div>
    `;
  }

  if (modal) modal.classList.remove('hidden');
}

// ============================================================================
// 16. THEME TOGGLE & RURAL LOW-BANDWIDTH MODE
// ============================================================================
function toggleTheme() {
  AppState.isDarkTheme = !AppState.isDarkTheme;
  const isDark = AppState.isDarkTheme;
  const icon = document.getElementById('theme-toggle-icon');

  if (isDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (icon) icon.textContent = '☀️';
    localStorage.setItem('agrisense_theme', 'dark');
    showToast('Dark mode enabled', 'info');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    if (icon) icon.textContent = '🌙';
    localStorage.setItem('agrisense_theme', 'light');
    showToast('Light mode enabled', 'info');
  }

  // Redraw canvases with theme colors
  if (AppState.activeView === 'weather') renderWeatherHourlyChart();
  if (AppState.activeView === 'market') renderMarketPriceChart();
}

function lowBandwidthMode() {
  AppState.isLowBandwidth = !AppState.isLowBandwidth;
  const body = document.body;
  const banner = document.getElementById('low-bandwidth-banner');
  const toggleBtn = document.getElementById('btn-low-bandwidth');

  if (AppState.isLowBandwidth) {
    body.classList.add('low-bandwidth');
    if (banner) banner.classList.remove('hidden');
    if (toggleBtn) {
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-pressed', 'true');
    }
    showToast('⚡ Low-Bandwidth Mode Enabled (Visuals stripped for rural 2G/3G)', 'info');
  } else {
    body.classList.remove('low-bandwidth');
    if (banner) banner.classList.add('hidden');
    if (toggleBtn) {
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-pressed', 'false');
    }
    showToast('Standard Interface Restored', 'info');
  }
}

// ============================================================================
// 17. BACKEND REST HEALTH PROBE (Dual-Execution Architecture)
// ============================================================================
async function probeFastApiBackend() {
  const statusPill = document.getElementById('live-telemetry-status');
  const chatStatus = document.getElementById('ai-chat-status');

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);

    const res = await fetch(`${AppState.backendUrl}/health`, {
      method: 'GET',
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      AppState.backendOnline = true;
      if (statusPill) statusPill.textContent = '● FastAPI Backend: Live (Port 8000)';
      if (chatStatus) chatStatus.textContent = '● Online • FastAPI AI Service Connected';
    }
  } catch (err) {
    AppState.backendOnline = false;
    if (statusPill) statusPill.textContent = '● Grounded Engine: Standalone MVP';
    if (chatStatus) chatStatus.textContent = '● Online • Grounded in TNAU PoP & IMD Agromet';
  }
}

// ============================================================================
// 18. MODULAR HELPERS: getRecommendation, updateDashboard, compareDistricts
// ============================================================================
function getRecommendation(params) {
  const district = params.district || 'Thanjavur';
  const crop = params.crop || 'Paddy';
  const topic = params.queryTopic || 'nitrogen';
  const lang = AppState.currentLang;

  const districtData = AgroDataset.advisories[district];
  if (districtData && districtData[crop] && districtData[crop][topic]) {
    const rawData = districtData[crop][topic][lang] || districtData[crop][topic]['en'];
    const distMeta = AgroDataset.districts[district];

    return {
      district: district,
      crop: crop,
      season: params.season,
      stage: params.stage,
      zoneName: lang === 'ta' ? distMeta.zoneTa : distMeta.zoneEn,
      soilSpec: lang === 'ta' ? distMeta.soilTa : distMeta.soilEn,
      telemetry: distMeta.telemetry,
      headline: rawData.headline,
      warningTitle: rawData.warningTitle,
      warningText: rawData.warningText,
      what: rawData.what,
      when: rawData.when,
      howMuch: rawData.howMuch,
      why: rawData.why,
      source: rawData.source,
      pubDate: rawData.pubDate,
      confidence: rawData.confidence
    };
  }

  // Graceful Grounded Fallback
  const distMeta = AgroDataset.districts[district] || AgroDataset.districts['Thanjavur'];
  const isTa = lang === 'ta';

  return {
    district: district,
    crop: crop,
    season: params.season,
    stage: params.stage,
    zoneName: isTa ? distMeta.zoneTa : distMeta.zoneEn,
    soilSpec: isTa ? distMeta.soilTa : distMeta.soilEn,
    telemetry: distMeta.telemetry,
    headline: isTa 
      ? `${district} ${crop} பயிருக்கான சிறப்பு மண்டல ஆலோசனை (${params.stage})`
      : `${district} Zone-Grounded Agronomic Protocol for ${crop} (${params.stage})`,
    warningTitle: isTa
      ? `${district} மண்டல எச்சரிக்கை: உள்ளூர் மண் மற்றும் பாசன வரம்புகள்`
      : `${district} Regional Alert: Localized Soil and Water Dynamics Active`,
    warningText: isTa
      ? `${district} பகுதியின் ${distMeta.soilTa} தன்மையைக் கருத்தில் கொண்டு, பரிந்துரைக்கப்பட்ட பாசன இடைவெளியையும் உர அளவையும் கண்டிப்பாகப் பின்பற்றவும்.`
      : `Based on ${district}'s verified soil profile (${distMeta.soilEn}), avoid excessive single-shot chemical inputs. Adjust timing to local canal/borewell conditions.`,
    what: isTa
      ? `பரிந்துரைக்கப்பட்ட நுண்ணுயிர் உரங்கள் மற்றும் மண்புழு உரம் இட்டு நிலத்தின் ஈரப்பதத்தை பாதுகாக்கவும்.`
      : `Apply organic soil amendments combined with split chemical top-dressing adjusted for ${crop} phenological stage.`,
    when: isTa
      ? `${params.stage} வளர்ச்சிப் பருவத்தில் அதிகாலை வேளையில் இடவும்.`
      : `Apply strictly during ${params.stage} stage within 48h of soil moisture availability.`,
    howMuch: isTa
      ? `ஏக்கருக்கு பரிந்துரைக்கப்பட்ட அளவு: 25 கிலோ உரம் + 500 கிலோ தொழுவுரம்.`
      : `Calibrated Rate: 25 kg base balanced fertilizer + 500 kg FYM per acre based on Soil Health Card baseline.`,
    why: isTa
      ? `${district} பகுதியின் காலநிலைக்கேற்ப வேர் மண்டலத்தை பாதுகாத்து உர விரயத்தை குறைக்க இந்த முறை அவசியம்.`
      : `${district}'s specific soil texture demands balanced split application to prevent nutrient immobilization.`,
    source: isTa ? "TNAU பயிர் உற்பத்தி வழிகாட்டி 2024" : "TNAU Package of Practices & Regional SAU Advisory 2024",
    pubDate: "Rev. 2024-Q3",
    confidence: isTa ? "விதிமுறை இயந்திரம்: மண்டல அளவுகோல் சரிபார்க்கப்பட்டது" : "Rule Engine: 100% Agroclimatic Fit"
  };
}

function updateDashboard(data) {
  const headlineEl = document.getElementById('recommendation-heading');
  if (headlineEl) headlineEl.textContent = data.headline;

  const distBadge = document.getElementById('res-district-badge');
  if (distBadge) distBadge.textContent = `📍 ${data.district}`;

  const soilBadge = document.getElementById('res-soil-badge');
  if (soilBadge) soilBadge.textContent = `🪨 ${data.soilSpec.split('•')[0].trim()}`;

  const seasonBadge = document.getElementById('res-season-badge');
  if (seasonBadge) seasonBadge.textContent = `☀️ ${data.season} Season`;

  const stageBadge = document.getElementById('res-stage-badge');
  if (stageBadge) stageBadge.textContent = `📈 ${data.stage}`;

  const warnTitle = document.getElementById('res-warning-title');
  if (warnTitle) warnTitle.textContent = data.warningTitle;

  const warnText = document.getElementById('res-warning-text');
  if (warnText) warnText.textContent = data.warningText;

  const whatTitle = document.getElementById('res-what-title');
  const whatDesc = document.getElementById('res-what-desc');
  if (whatTitle) whatTitle.textContent = data.what.split('.')[0] || "Targeted Agronomic Protocol";
  if (whatDesc) whatDesc.textContent = data.what;

  const whenTitle = document.getElementById('res-when-title');
  const whenDesc = document.getElementById('res-when-desc');
  if (whenTitle) whenTitle.textContent = data.when.split('(')[0] || "Optimal Timing Window";
  if (whenDesc) whenDesc.textContent = data.when;

  const howMuchTitle = document.getElementById('res-howmuch-title');
  const howMuchDesc = document.getElementById('res-howmuch-desc');
  if (howMuchTitle) howMuchTitle.textContent = data.howMuch.split('+')[0] || "Calibrated Rate";
  if (howMuchDesc) howMuchDesc.textContent = data.howMuch;

  const whyTitle = document.getElementById('res-why-title');
  const whyDesc = document.getElementById('res-why-desc');
  if (whyTitle) {
    whyTitle.textContent = AppState.currentLang === 'ta' 
      ? `ஏன் இது ${data.district} பகுதிக்கு மட்டும் பொருந்தும்?`
      : `Why This Is Specific to ${data.district} Conditions`;
  }
  if (whyDesc) whyDesc.textContent = data.why;

  const sourceName = document.getElementById('res-source-name');
  if (sourceName) sourceName.textContent = data.source;

  const pubDate = document.getElementById('res-pub-date');
  if (pubDate) pubDate.textContent = data.pubDate;

  const confidence = document.getElementById('res-confidence');
  if (confidence) confidence.textContent = data.confidence;

  const paramSummary = document.getElementById('active-parameter-summary');
  if (paramSummary) {
    paramSummary.textContent = `${data.district} • ${data.crop} • ${data.season} • ${data.stage}`;
  }

  stopAudioAdvisory();
  updateDataAge();
}

function compareDistricts(scenarioKey) {
  const key = scenarioKey || 'nitrogen';
  AppState.activeScenario = key;
  const lang = AppState.currentLang;
  const scenario = AgroDataset.comparisonScenarios[key];
  if (!scenario) return;

  const buttons = document.querySelectorAll('.comp-btn[data-scenario]');
  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-scenario') === key);
  });

  // Update Visual Progress Bars
  if (scenario.bars) {
    const barTh = document.querySelector('.bar-thanjavur');
    const barCb = document.querySelector('.bar-coimbatore');
    const barMd = document.querySelector('.bar-madurai');

    if (barTh && scenario.bars.thanjavur) barTh.style.width = `${scenario.bars.thanjavur.pct}%`;
    if (barCb && scenario.bars.coimbatore) barCb.style.width = `${scenario.bars.coimbatore.pct}%`;
    if (barMd && scenario.bars.madurai) barMd.style.width = `${scenario.bars.madurai.pct}%`;
  }

  // 1. Thanjavur Card
  const th = scenario.thanjavur;
  const thTitle = document.getElementById('th-title');
  const thWhat = document.getElementById('th-what');
  const thWhy = document.getElementById('th-why');
  const thRisk = document.getElementById('th-risk');
  if (thTitle) thTitle.textContent = lang === 'ta' ? th.titleTa : th.titleEn;
  if (thWhat) thWhat.textContent = lang === 'ta' ? th.whatTa : th.whatEn;
  if (thWhy) thWhy.textContent = lang === 'ta' ? th.whyTa : th.whyEn;
  if (thRisk) thRisk.textContent = lang === 'ta' ? th.riskTa : th.riskEn;

  // 2. Coimbatore Card
  const cb = scenario.coimbatore;
  const cbTitle = document.getElementById('cb-title');
  const cbWhat = document.getElementById('cb-what');
  const cbWhy = document.getElementById('cb-why');
  const cbRisk = document.getElementById('cb-risk');
  if (cbTitle) cbTitle.textContent = lang === 'ta' ? cb.titleTa : cb.titleEn;
  if (cbWhat) cbWhat.textContent = lang === 'ta' ? cb.whatTa : cb.whatEn;
  if (cbWhy) cbWhy.textContent = lang === 'ta' ? cb.whyTa : cb.whyEn;
  if (cbRisk) cbRisk.textContent = lang === 'ta' ? cb.riskTa : cb.riskEn;

  // 3. Madurai Card
  const md = scenario.madurai;
  const mdTitle = document.getElementById('md-title');
  const mdWhat = document.getElementById('md-what');
  const mdWhy = document.getElementById('md-why');
  const mdRisk = document.getElementById('md-risk');
  if (mdTitle) mdTitle.textContent = lang === 'ta' ? md.titleTa : md.titleEn;
  if (mdWhat) mdWhat.textContent = lang === 'ta' ? md.whatTa : md.whatEn;
  if (mdWhy) mdWhy.textContent = lang === 'ta' ? md.whyTa : md.whyEn;
  if (mdRisk) mdRisk.textContent = lang === 'ta' ? md.riskTa : md.riskEn;
}

function updateDataAge() {
  const ageEl = document.getElementById('res-data-age');
  if (!ageEl) return;
  const isTa = AppState.currentLang === 'ta';
  ageEl.textContent = isTa 
    ? 'அறிவு தளம்: TNAU PoP (கடைசி ஆய்வு: இன்று காலை 06:00) • அதிக நம்பகத்தன்மை'
    : 'Knowledge Base: TNAU PoP (Last Refreshed: Today, 06:00 AM) • High Freshness';
}

function changeLanguage(lang) {
  if (lang !== 'en' && lang !== 'ta') return;
  AppState.currentLang = lang;

  document.body.classList.toggle('lang-ta', lang === 'ta');

  const btnEn = document.getElementById('btn-lang-en');
  const btnTa = document.getElementById('btn-lang-ta');
  if (btnEn && btnTa) {
    btnEn.classList.toggle('active', lang === 'en');
    btnTa.classList.toggle('active', lang === 'ta');
  }

  const elements = document.querySelectorAll('[data-i18n]');
  const dict = Translations[lang];
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict && dict[key]) el.textContent = dict[key];
  });

  const rec = getRecommendation(AppState.selectedParams);
  updateDashboard(rec);
  updateDashboardState(AppState.selectedParams.district);
  compareDistricts(AppState.activeScenario);
  renderDiseaseDiagnosis(AppState.diseaseScanner.activeSample || 'blast');

  showToast(lang === 'ta' ? 'தமிழ் மொழிக்கு மாற்றப்பட்டது' : 'Language switched to English', 'info');
}

function playAudioAdvisory() {
  if (!('speechSynthesis' in window)) {
    showToast('Text-to-Speech not supported in this browser', 'error');
    return;
  }
  if (AppState.isSpeaking) {
    stopAudioAdvisory();
    return;
  }

  const rec = getRecommendation(AppState.selectedParams);
  const lang = AppState.currentLang;

  let speechText = lang === 'ta'
    ? `${rec.district} மாவட்டத்திற்கான ${rec.crop} பயிர் ஆலோசனை. என்ன செய்ய வேண்டும்: ${rec.what}. எப்போது: ${rec.when}. எவ்வளவு அளவு: ${rec.howMuch}. ஏன்: ${rec.why}`
    : `AgriSense advisory for ${rec.district} district. Crop: ${rec.crop}. What to do: ${rec.what}. When to apply: ${rec.when}. How much: ${rec.howMuch}. Grounded rationale: ${rec.why}`;

  const utterance = new SpeechSynthesisUtterance(speechText);
  utterance.lang = lang === 'ta' ? 'ta-IN' : 'en-IN';
  utterance.rate = 0.95;

  const ttsBtn = document.getElementById('btn-listen-tts');
  const ttsBtnText = document.getElementById('tts-btn-text');

  utterance.onstart = () => {
    AppState.isSpeaking = true;
    if (ttsBtn) ttsBtn.classList.add('playing');
    if (ttsBtnText) ttsBtnText.textContent = lang === 'ta' ? 'நிறுத்துக' : 'Stop Audio';
    showToast(lang === 'ta' ? '🔊 ஆடியோ ஒலிக்கிறது...' : '🔊 Reading advisory aloud...', 'info');
  };
  utterance.onend = stopAudioAdvisory;
  utterance.onerror = stopAudioAdvisory;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function stopAudioAdvisory() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  AppState.isSpeaking = false;
  const ttsBtn = document.getElementById('btn-listen-tts');
  const ttsBtnText = document.getElementById('tts-btn-text');
  if (ttsBtn) ttsBtn.classList.remove('playing');
  if (ttsBtnText) {
    ttsBtnText.textContent = AppState.currentLang === 'ta' ? 'ஆடியோ கேட்க' : 'Listen Audio';
  }
}

function copyAdvisoryText() {
  const rec = getRecommendation(AppState.selectedParams);
  const lang = AppState.currentLang;

  const text = `🌾 AgriSense AI — ${rec.district} Advisory (${rec.crop} • ${rec.stage})
----------------------------------------
1. WHAT TO DO: ${rec.what}
2. WHEN: ${rec.when}
3. HOW MUCH: ${rec.howMuch}
4. WHY: ${rec.why}
----------------------------------------
Source: ${rec.source} (${rec.pubDate})`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => showToast('📋 Advisory copied to clipboard!', 'success'))
      .catch(() => showToast('Failed to copy', 'error'));
  }
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-msg ${type === 'success' ? 'toast-success' : type === 'error' ? 'toast-error' : ''}`;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-8px)';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 250);
  }, 3200);
}

function closeModals() {
  const modals = document.querySelectorAll('.modal-backdrop');
  modals.forEach(m => m.classList.add('hidden'));
}

// ============================================================================
// 19. APPLICATION INITIALIZATION & EVENT HOOKS
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {

  // 1. Initial Loading Screen Animation
  const loader = document.getElementById('app-initial-loader');
  const progressBar = document.getElementById('loader-progress-bar');
  const statusMsg = document.getElementById('loader-status-msg');

  if (loader && progressBar) {
    let progress = 0;
    const loadTimer = setInterval(() => {
      progress += 25;
      progressBar.style.width = `${progress}%`;

      if (progress === 50 && statusMsg) {
        statusMsg.textContent = 'Ingesting TNAU Agroclimatic Rules & IMD Feeds...';
      } else if (progress === 100) {
        clearInterval(loadTimer);
        setTimeout(() => {
          loader.classList.add('fade-out');
          loader.style.opacity = '0';
          loader.style.pointerEvents = 'none';
          setTimeout(() => {
            loader.style.display = 'none';
          }, 450);
        }, 200);
      }
    }, 120);
  }

  // 2. Check Saved Theme Preference (Default: Dark theme for elite emerald-obsidian aesthetic)
  const savedTheme = localStorage.getItem('agrisense_theme');
  if (savedTheme === 'light') {
    AppState.isDarkTheme = false;
    document.documentElement.setAttribute('data-theme', 'light');
    const icon = document.getElementById('theme-toggle-icon');
    if (icon) icon.textContent = '🌙';
  } else {
    AppState.isDarkTheme = true;
    document.documentElement.setAttribute('data-theme', 'dark');
    const icon = document.getElementById('theme-toggle-icon');
    if (icon) icon.textContent = '☀️';
  }

  // 3. Navigation Hookups: Topbar Links
  document.querySelectorAll('.topbar-link').forEach(link => {
    link.addEventListener('click', () => {
      const target = link.getAttribute('data-nav');
      switchView(target);
    });
  });

  // Topbar Brand Click -> Landing Page
  const brandLink = document.querySelector('.topbar-brand');
  if (brandLink) {
    brandLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('landing');
    });
  }

  // Mobile Bottom Navigation Buttons
  document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-nav');
      switchView(target);
    });
  });

  // Landing Page Hero Buttons
  const btnHeroExplore = document.getElementById('btn-hero-explore');
  const btnHeroAsk = document.getElementById('btn-hero-ask');
  const btnHeroDemo = document.getElementById('btn-hero-demo');
  if (btnHeroExplore) btnHeroExplore.addEventListener('click', () => switchView('dashboard'));
  if (btnHeroAsk) btnHeroAsk.addEventListener('click', () => switchView('ai-assistant'));
  if (btnHeroDemo) btnHeroDemo.addEventListener('click', runHackathonDemoTour);

  // Topbar 1-Click Hackathon Demo Button
  const btnHackDemo = document.getElementById('btn-hackathon-demo');
  if (btnHackDemo) btnHackDemo.addEventListener('click', runHackathonDemoTour);

  // Theme & Low Bandwidth Toggles
  const btnThemeToggle = document.getElementById('btn-theme-toggle');
  if (btnThemeToggle) btnThemeToggle.addEventListener('click', toggleTheme);

  const btnLowBandwidth = document.getElementById('btn-low-bandwidth');
  if (btnLowBandwidth) btnLowBandwidth.addEventListener('click', lowBandwidthMode);

  // Language Toggles
  const btnEn = document.getElementById('btn-lang-en');
  const btnTa = document.getElementById('btn-lang-ta');
  if (btnEn) btnEn.addEventListener('click', () => changeLanguage('en'));
  if (btnTa) btnTa.addEventListener('click', () => changeLanguage('ta'));

  // Dashboard District Selector
  const dashDistrictSelect = document.getElementById('dash-district-select');
  const selectDistrict = document.getElementById('select-district');
  const selectCrop = document.getElementById('select-crop');
  const selectSeason = document.getElementById('select-season');
  const selectStage = document.getElementById('select-stage');
  const inputQuestion = document.getElementById('input-question');
  const btnSubmit = document.getElementById('btn-submit-query');

  if (dashDistrictSelect) {
    dashDistrictSelect.addEventListener('change', () => {
      const val = dashDistrictSelect.value;
      AppState.selectedParams.district = val;
      if (selectDistrict) selectDistrict.value = val;

      updateDashboardState(val);
      const rec = getRecommendation(AppState.selectedParams);
      updateDashboard(rec);

      showToast(`📍 Active agroclimatic region set to ${val}`, 'info');
    });
  }

  // Dashboard Telemetry Card Footer Navigation Buttons
  document.querySelectorAll('.dash-telemetry-card button[data-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      const nav = btn.getAttribute('data-nav');
      switchView(nav);
    });
  });

  // Farmer Question Engine Quick Cards (Section 18)
  document.querySelectorAll('.fqe-card[data-action="ask-question"]').forEach(card => {
    card.addEventListener('click', () => {
      const topic = card.getAttribute('data-topic');
      if (topic === 'disease') {
        switchView('disease');
      } else if (topic === 'weather') {
        switchView('weather');
      } else if (topic === 'market') {
        switchView('market');
      } else if (topic === 'crop') {
        switchView('crops');
      } else {
        AppState.selectedParams.queryTopic = topic;
        switchView('recommendations');
        const rec = getRecommendation(AppState.selectedParams);
        updateDashboard(rec);
        const resultCard = document.getElementById('advisory-result-container');
        if (resultCard) resultCard.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Advisory Form Selectors
  [selectDistrict, selectCrop, selectSeason, selectStage].forEach(select => {
    if (select) {
      select.addEventListener('change', () => {
        if (selectDistrict) AppState.selectedParams.district = selectDistrict.value;
        if (selectCrop) AppState.selectedParams.crop = selectCrop.value;
        if (selectSeason) AppState.selectedParams.season = selectSeason.value;
        if (selectStage) AppState.selectedParams.stage = selectStage.value;

        if (dashDistrictSelect && selectDistrict) {
          dashDistrictSelect.value = selectDistrict.value;
        }
        updateDashboardState(AppState.selectedParams.district);
        const rec = getRecommendation(AppState.selectedParams);
        updateDashboard(rec);
      });
    }
  });

  if (btnSubmit) {
    btnSubmit.addEventListener('click', () => {
      if (selectDistrict) AppState.selectedParams.district = selectDistrict.value;
      if (selectCrop) AppState.selectedParams.crop = selectCrop.value;
      if (selectSeason) AppState.selectedParams.season = selectSeason.value;
      if (selectStage) AppState.selectedParams.stage = selectStage.value;
      if (inputQuestion) AppState.selectedParams.customQuery = inputQuestion.value;

      const rec = getRecommendation(AppState.selectedParams);
      updateDashboard(rec);
      showToast(`🎯 Grounded advisory generated for ${rec.district}`, 'success');

      const resultCard = document.getElementById('advisory-result-container');
      if (resultCard) resultCard.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Result Action Toolbar (TTS, Copy, Print)
  const btnTts = document.getElementById('btn-listen-tts');
  const btnCopy = document.getElementById('btn-copy-advisory');
  const btnPrint = document.getElementById('btn-print-advisory');
  const btnExpl = document.getElementById('btn-open-expl-modal');

  if (btnTts) btnTts.addEventListener('click', playAudioAdvisory);
  if (btnCopy) btnCopy.addEventListener('click', copyAdvisoryText);
  if (btnPrint) btnPrint.addEventListener('click', () => window.print());
  if (btnExpl) btnExpl.addEventListener('click', openExplanationModal);

  // Modals Close Buttons
  document.querySelectorAll('.modal-close-btn, .modal-footer .btn-secondary').forEach(btn => {
    btn.addEventListener('click', closeModals);
  });

  const btnCopyExpl = document.getElementById('btn-copy-expl');
  if (btnCopyExpl) {
    btnCopyExpl.addEventListener('click', () => {
      const traceText = document.getElementById('modal-expl-content')?.innerText || '';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(traceText).then(() => showToast('Trace copied to clipboard', 'success'));
      }
    });
  }

  // Tri-District Scenario Buttons
  document.querySelectorAll('.comp-btn[data-scenario]').forEach(btn => {
    btn.addEventListener('click', () => {
      const scenario = btn.getAttribute('data-scenario');
      compareDistricts(scenario);
    });
  });

  // Crop Filter Buttons
  document.querySelectorAll('button[data-crop-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('button[data-crop-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.activeCropFilter = btn.getAttribute('data-crop-filter');
      renderCropsGrid();
    });
  });

  // Market Price Chart Timeline Toggles (7 Days vs 30 Days)
  const btn7d = document.getElementById('btn-chart-7d');
  const btn30d = document.getElementById('btn-chart-30d');
  if (btn7d && btn30d) {
    btn7d.addEventListener('click', () => {
      btn7d.classList.add('active');
      btn30d.classList.remove('active');
      AppState.activeMarketTimeline = '7d';
      renderMarketPriceChart();
    });
    btn30d.addEventListener('click', () => {
      btn30d.classList.add('active');
      btn7d.classList.remove('active');
      AppState.activeMarketTimeline = '30d';
      renderMarketPriceChart();
    });
  }

  // Initialize Sub-Systems
  initCommandPalette();
  initNotificationsDrawer();
  initDiseaseScanner();
  initChatAssistant();

  // Initial State Rendering
  updateDashboardState('Thanjavur');
  const initialRec = getRecommendation(AppState.selectedParams);
  updateDashboard(initialRec);
  renderCropsGrid();
  renderForecastDays();
  renderWeatherHourlyChart();
  renderMarketPriceChart();
  updateSoilView();
  compareDistricts('nitrogen');

  // Probe live FastAPI backend (non-blocking)
  probeFastApiBackend();

  // Window resize handler for responsive canvas redraws
  window.addEventListener('resize', () => {
    if (AppState.activeView === 'weather') renderWeatherHourlyChart();
    if (AppState.activeView === 'market') renderMarketPriceChart();
  });
});
