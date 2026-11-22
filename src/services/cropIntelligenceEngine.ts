import { 
  CropHealthRecord, 
  HealthGrade, 
  AgroAdvisory, 
  SpectralMetrics, 
  WeatherMetrics, 
  PestType, 
  CropCategory 
} from '../types/cropHealth';

export interface AgroRuleEngineConfig {
  ndviVigorThreshold: number; // default 0.65
  ndwiWaterStressThreshold: number; // default -0.15
  blastHumidityTriggerPct: number; // default 88%
  blastMinTempCelsius: number; // default 21°C
  stemBorerRainTriggerMm: number; // default 35mm
  highRiskAreaWeight: number; // default 0.35
  enableAutoAdvisoryBroadcast: boolean;
  smsGatewayActive: boolean;
}

export const DEFAULT_AGRO_CONFIG: AgroRuleEngineConfig = {
  ndviVigorThreshold: 0.65,
  ndwiWaterStressThreshold: -0.15,
  blastHumidityTriggerPct: 88,
  blastMinTempCelsius: 21,
  stemBorerRainTriggerMm: 35,
  highRiskAreaWeight: 0.35,
  enableAutoAdvisoryBroadcast: true,
  smsGatewayActive: true,
};

// Convert Assam Bigha-Katha-Lesa to Square Meters and Hectares
// In Assam standard: 1 Bigha = 5 Katha = 100 Lesa = 14,400 sq.ft ≈ 1,337.8 m²
export function bklToSqMeters(bigha: number, katha: number, lesa: number): number {
  const totalLesa = (bigha * 100) + (katha * 20) + lesa;
  return Number((totalLesa * 13.378).toFixed(1));
}

export function bklToHectares(bigha: number, katha: number, lesa: number): number {
  const sqM = bklToSqMeters(bigha, katha, lesa);
  return Number((sqM / 10000).toFixed(3));
}

// Compute Crop Health Index (0 - 100)
export function computeCropHealthIndex(
  spectral: SpectralMetrics,
  weather: WeatherMetrics,
  pestRiskScore: number,
  config: AgroRuleEngineConfig = DEFAULT_AGRO_CONFIG
): { index: number; grade: HealthGrade } {
  // 1. NDVI Normalized Vigor Score (0 - 40 pts)
  let ndviScore = (spectral.ndvi / 0.85) * 40;
  if (spectral.ndvi < config.ndviVigorThreshold) {
    ndviScore *= 0.75;
  }
  ndviScore = Math.max(0, Math.min(40, ndviScore));

  // 2. NDWI Canopy Moisture Score (0 - 25 pts)
  // Ideal NDWI for healthy paddy is 0.05 to 0.35. Negative values indicate water deficit.
  let moistureScore = 20;
  if (spectral.ndwi < config.ndwiWaterStressThreshold) {
    moistureScore = 8; // Drought stress
  } else if (spectral.ndwi > 0.45) {
    moistureScore = 12; // Waterlogging / flood inundation risk
  } else {
    moistureScore = 25; // Balanced
  }

  // 3. Weather Pathogen Vulnerability (0 - 20 pts)
  let weatherScore = 20;
  if (weather.rhMorning >= config.blastHumidityTriggerPct && weather.tMin >= config.blastMinTempCelsius) {
    weatherScore -= 12; // High fungal blast environment
  }
  if (weather.rainfall24h > 65) {
    weatherScore -= 5; // Rain washout / sheath rot condition
  }
  weatherScore = Math.max(0, weatherScore);

  // 4. Ground Pest Pressure Penalty (0 - 15 pts)
  const pestPenalty = (pestRiskScore / 100) * 15;
  const pestScore = Math.max(0, 15 - pestPenalty);

  const totalIndex = Math.round(ndviScore + moistureScore + weatherScore + pestScore);
  const clampedIndex = Math.max(10, Math.min(100, totalIndex));

  let grade: HealthGrade = 'GRADE_A';
  if (clampedIndex >= 80) grade = 'GRADE_A';
  else if (clampedIndex >= 65) grade = 'GRADE_B';
  else if (clampedIndex >= 45) grade = 'GRADE_C';
  else grade = 'GRADE_D';

  return { index: clampedIndex, grade };
}

// Epidemiological Outbreak Probability Model for specific pests in Assam
export function evaluatePestOutbreakRisk(
  crop: CropCategory,
  pest: PestType,
  weather: WeatherMetrics,
  spectral: SpectralMetrics,
  config: AgroRuleEngineConfig = DEFAULT_AGRO_CONFIG
): { probabilityPct: number; riskScore: number; trajectory: 'RISING' | 'STABLE' | 'DECLINING' } {
  let riskScore = 20;

  if (pest.includes('Rice Blast')) {
    // Rice Blast (Magnaporthe oryzae) thrives in high RH >85%, min temp 20-25°C, cloudy conditions
    if (weather.rhMorning >= config.blastHumidityTriggerPct) riskScore += 35;
    if (weather.tMin >= 20 && weather.tMin <= 26) riskScore += 25;
    if (spectral.ndvi < 0.60) riskScore += 15; // Foliar chlorosis
  } else if (pest.includes('Stem Borer')) {
    // Yellow Stem Borer emergence peaks with warm humid conditions and panicle initiation
    if (weather.tMax >= 28 && weather.tMax <= 34) riskScore += 30;
    if (weather.rhEvening > 75) riskScore += 25;
    if (weather.rainfall24h > 20 && weather.rainfall24h < 60) riskScore += 20;
  } else if (pest.includes('Sheath Blight')) {
    // Rhizoctonia solani loves standing water and dense canopy
    if (spectral.ndwi > 0.20 && weather.rhMorning > 85) riskScore += 45;
  } else if (pest.includes('Aphid')) {
    // Mustard Aphid thrives in cloudy, rainless weather with moderate temp
    if (weather.rainfall24h === 0 && weather.tMax < 25 && weather.rhMorning > 80) riskScore += 50;
  }

  const clampedRisk = Math.min(95, Math.max(10, riskScore));
  const probabilityPct = clampedRisk;

  let trajectory: 'RISING' | 'STABLE' | 'DECLINING' = 'STABLE';
  if (clampedRisk > 65) trajectory = 'RISING';
  else if (clampedRisk < 35) trajectory = 'DECLINING';

  return { probabilityPct, riskScore: clampedRisk, trajectory };
}

// Generate bilingual location-specific agro advisory
export function generateAgroAdvisory(
  crop: CropCategory,
  pest: PestType,
  grade: HealthGrade,
  district: string,
  block: string
): AgroAdvisory {
  const advisoryId = `ADV-ASSAM-${district.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const validUntil = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  if (pest.includes('Rice Blast') || (crop.includes('Paddy') && grade === 'GRADE_D')) {
    return {
      advisoryId,
      headlineEn: `Immediate Rice Blast Alert for ${block} Block (${district})`,
      headlineAs: `${district} জিলাৰ ${block} ব্লকৰ বাবে ধানৰ ব্লাষ্ট ৰোগৰ সতৰ্কবাণী`,
      summaryEn: `Satellite vegetative anomaly and IMD telemetry indicate imminent Rice Blast spore germination across standing Sali/Boro crops due to persistent >88% relative humidity.`,
      summaryAs: `উপগ্ৰহীয় সংকেত আৰু বতৰ বিজ্ঞান বিভাগৰ তথ্য অনুসৰি উচ্চ আৰ্দ্ৰতাৰ বাবে ধানৰ পাতত ব্লাষ্ট ভেঁকুৰৰ সংক্ৰমণ বৃদ্ধি পোৱাৰ প্ৰবল সম্ভাৱনা আছে।`,
      culturalActionEn: `Drain standing water from infected plots for 48 hours to reduce relative micro-humidity around tillers. Maintain proper weed sanitation around ails (bunds).`,
      culturalActionAs: `আক্ৰান্ত পথাৰৰ পৰা ৪৮ ঘণ্টাৰ বাবে জমা পানী উলিয়াই দিয়ক যাতে আৰ্দ্ৰতা কমে। আলিবাটৰ অপতৃণ পৰিষ্কাৰ কৰি ৰাখক।`,
      bioPesticideEn: `Spray Pseudomonas fluorescens @ 5g/Litre or Trichoderma viride formulation at morning hours before dew evaporates.`,
      bioPesticideAs: `পুৱাৰ সময়ত ছিউডোমোনাছ ফ্লুৰোচেঞ্চ প্ৰতি লিটাৰ পানীত ৫ গ্ৰাম হাৰত অথবা ট্ৰাইকোডাৰ্মা ভিৰিডি স্প্ৰে কৰক।`,
      chemicalInterventionEn: `If leaf lesions exceed 5% canopy cover, spray Tricyclazole 75% WP @ 0.6g/L or Isoprothiolane 40% EC @ 1.5ml/L.`,
      chemicalInterventionAs: `ৰোগৰ প্ৰকোপ বেছি হ'লে ট্ৰাইচাইক্লাজল ৭৫ ডব্লিউ পি (প্ৰতি লিটাৰ পানীত ০.৬ গ্ৰাম) বা আইচোপ্ৰ'থায়'লেন ৪০ ই চি (১.৫ মিলিলিটাৰ) স্প্ৰে কৰক।`,
      dosagePerBigha: `15–18 grams Tricyclazole in 25–30 Litres water per Assam Bigha.`,
      waterDrainageAdvice: `Intermittent wetting and drying cycle recommended until tillering stabilizes.`,
      issuingAuthority: `Directorate of Agriculture & ASSAC, Govt. of Assam`,
      validUntil
    };
  }

  if (pest.includes('Stem Borer')) {
    return {
      advisoryId,
      headlineEn: `Yellow Stem Borer Management Advisory for ${block}`,
      headlineAs: `${block} অঞ্চলৰ মাজখোৱা (ষ্টেম ব'ৰাৰ) নিয়ন্ত্ৰণৰ পৰামৰ্শ`,
      summaryEn: `Field scouting and weather degree-days indicate peak adult moth flight and egg-laying in late tillering paddy. Dead-hearts observed in early vegetative patches.`,
      summaryAs: `পথাৰ পৰিদৰ্শন আৰু বতৰৰ তথ্য অনুসৰি মাজখোৱা পোকৰ পখিলাৰ সংখ্যা আৰু কণী পৰাৰ সম্ভাৱনা বৃদ্ধি পাইছে। মৰা-ডিলাৰ লক্ষণ দেখা গৈছে।`,
      culturalActionEn: `Install 5–8 bamboo T-perches per Bigha to encourage predatory bird feeding on adult moths. Clip off seedling leaf tips before transplantation.`,
      culturalActionAs: `পথাৰত প্ৰতি বিঘাত ৫-৮ টা বাঁহৰ টি-খুঁটি পুতি দিয়ক যাতে চৰায়ে পোক খাব পাৰে। ৰোৱাৰ সময়ত পাতৰ আগ কাটি দিয়ক।`,
      bioPesticideEn: `Erect Pheromone Traps (Scirpo-lure) @ 3 traps per Bigha for monitoring and male mass trapping. Release Trichogramma japonicum egg parasitoid @ 20,000/Bigha.`,
      bioPesticideAs: `বিঘাত ৩ টা ফেৰোম'ন ফান্দ (Scirpo-lure) পাতক। ট্ৰাইক'গ্ৰামা জাপ'নিকাৰ উপকাৰী পৰজীৱী কাৰ্ড ব্যৱহাৰ কৰক।`,
      chemicalInterventionEn: `For severe dead-heart stage exceeding 10% ETL, apply Chlorantraniliprole 18.5% SC @ 0.3ml/L or Cartap Hydrochloride 4G granules.`,
      chemicalInterventionAs: `মৰা-ডিলাৰ সংখ্যা ১০% ৰ অধিক হ'লে ক্ল'ৰেনট্ৰানিলিপ্ৰ'ল ১৮.৫% এছ চি (০.৩ মিলিলিটাৰ/লিটাৰ) বা কাৰ্টাপ হাইড্ৰ'ক্লৰাইড ব্যৱহাৰ কৰক।`,
      dosagePerBigha: `10ml Chlorantraniliprole in 30 Litres water per Bigha.`,
      waterDrainageAdvice: `Maintain 3–5 cm water layer if applying granular Cartap.`,
      issuingAuthority: `Directorate of Agriculture, Assam & AAU Jorhat`,
      validUntil
    };
  }

  // General Healthy / Optimal Advisory
  return {
    advisoryId,
    headlineEn: `Crop Vigor Optimal — Routine Care Bulletin for ${block}`,
    headlineAs: `${block} অঞ্চলৰ বাবে নিয়মীয়া শস্য যত্ন আৰু প্ৰতিপালন সেৱা`,
    summaryEn: `Satellite spectral indices (NDVI > 0.72) confirm vigorous vegetative development with negligible pathogen pressure across monitored clusters.`,
    summaryAs: `উপগ্ৰহ চিত্ৰৰ বিশ্লেষণ অনুসৰি শস্যৰ স্বাস্থ্য সন্তোষজনক (NDVI > ০.৭২) আৰু কোনো ক্ষতিকাৰক ৰোগ-পোকৰ লক্ষণ দেখা পোৱা নাই।`,
    culturalActionEn: `Maintain regular nutrient top-dressing (Urea split application) in moist soil conditions. Keep field bunds weed-free.`,
    culturalActionAs: `মাটি জীপাল থকা অৱস্থাত দ্বিতীয় কিস্তি ইউৰিয়া সাৰ প্ৰয়োগ কৰক। পথাৰৰ আলি পৰিষ্কাৰ কৰি ৰাখক।`,
    bioPesticideEn: `Preventive application of Neem Seed Kernel Extract (NSKE 5%) or Azadirachtin 1500 ppm @ 2ml/Litre.`,
    bioPesticideAs: `প্ৰতিৰোধক হিচাপে নিম তেল বা নিমৰ গুটিৰ মিশ্ৰণ (NSKE ৫%) প্ৰতি লিটাৰ পানীত ২ মিলি মিহলাই ছটিয়াব পাৰে।`,
    chemicalInterventionEn: `No synthetic chemical pesticide required at present. Preserve beneficial spiders and predator fauna.`,
    chemicalInterventionAs: `বৰ্তমান কোনো ৰাসায়নিক কীটনাশকৰ প্ৰয়োজন নাই। উপকাৰী মকৰা আৰু বান্ধৱ পোক সংৰক্ষণ কৰক।`,
    dosagePerBigha: `Balanced N-P-K nutrient application as per Assam Agricultural University package of practices.`,
    waterDrainageAdvice: `Maintain standard 2–4 cm ponding during vegetative tillering.`,
    issuingAuthority: `Assam State Space Application Centre (ASSAC) & Agri Dept`,
    validUntil
  };
}
