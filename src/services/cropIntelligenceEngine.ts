import { 
  FeedstockDepotRecord, 
  HealthGrade, 
  BiomassProcurementAdvisory, 
  SpectralMetrics, 
  WeatherMetrics, 
  DegradationRiskType, 
  FeedstockCategory 
} from '../types/cropHealth';

export interface BioenergyRuleEngineConfig {
  maxSafeDryMoisturePct: number; // default 15%
  ensilagePhThreshold: number; // default 4.2
  selfHeatingTempAlarmC: number; // default 52°C
  monsoonHumidityTriggerPct: number; // default 85%
  baseOffTakePricePerTonne: number; // default 2200 INR
  ndviVigorThreshold: number; // default 0.65
  ndwiWaterStressThreshold: number; // default -0.15
  enableAutoAdvisoryBroadcast: boolean;
  smsGatewayActive: boolean;
}

// Alias for compatibility
export type AgroRuleEngineConfig = BioenergyRuleEngineConfig;

export const DEFAULT_AGRO_CONFIG: BioenergyRuleEngineConfig = {
  maxSafeDryMoisturePct: 15.0,
  ensilagePhThreshold: 4.2,
  selfHeatingTempAlarmC: 52.0,
  monsoonHumidityTriggerPct: 85,
  baseOffTakePricePerTonne: 2200,
  ndviVigorThreshold: 0.65,
  ndwiWaterStressThreshold: -0.15,
  enableAutoAdvisoryBroadcast: true,
  smsGatewayActive: true,
};

// Convert Assam Bigha-Katha-Lesa to Square Meters and Estimated Residue Tonnage
// 1 Bigha = 14,400 sq.ft ≈ 1,337.8 m²; Average Sali paddy generates ~1.2 Tonnes dry residue per Bigha
export function bklToSqMeters(bigha: number, katha: number, lesa: number): number {
  const totalLesa = (bigha * 100) + (katha * 20) + lesa;
  return Number((totalLesa * 13.378).toFixed(1));
}

export function bklToHectares(bigha: number, katha: number, lesa: number): number {
  const sqM = bklToSqMeters(bigha, katha, lesa);
  return Number((sqM / 10000).toFixed(3));
}

export function bklToTonnage(bigha: number, katha: number, lesa: number, residueMultiplier = 1.2): number {
  const totalBigha = bigha + (katha / 5) + (lesa / 100);
  return Number((totalBigha * residueMultiplier).toFixed(2));
}

// Compute Biomass Quality & Rot Vulnerability Index (BQVI: 0 - 100)
export function computeCropHealthIndex(
  telemetry: SpectralMetrics,
  weather: WeatherMetrics,
  pestRiskScore: number,
  config: BioenergyRuleEngineConfig = DEFAULT_AGRO_CONFIG
): { index: number; grade: HealthGrade } {
  // 1. Moisture Index (0 - 40 pts)
  let moistureScore = 40;
  if (telemetry.moisturePct > 45) {
    // If ensiled with low pH, it is protected!
    if (telemetry.ensilagePh <= config.ensilagePhThreshold) {
      moistureScore = 36; // Preserved via anaerobic lactic acid
    } else {
      moistureScore = Math.max(5, 40 - ((telemetry.moisturePct - 20) * 1.2));
    }
  } else if (telemetry.moisturePct > config.maxSafeDryMoisturePct) {
    moistureScore = Math.max(10, 40 - ((telemetry.moisturePct - 15) * 2));
  }

  // 2. Core Thermal Stability (0 - 30 pts)
  let thermalScore = 30;
  if (telemetry.coreTempC >= config.selfHeatingTempAlarmC) {
    thermalScore = Math.max(0, 30 - ((telemetry.coreTempC - 45) * 2.5));
  } else if (telemetry.coreTempC > 40) {
    thermalScore = 20;
  }

  // 3. Dry-Matter & Glucan Retention (0 - 30 pts)
  const retentionScore = Math.min(30, (telemetry.dryMatterRetentionPct / 100) * 30);

  const rawIndex = moistureScore + thermalScore + retentionScore;
  const clampedIndex = Math.max(15, Math.min(100, Math.round(rawIndex)));

  let grade: HealthGrade = 'GRADE_A';
  if (clampedIndex >= 85) grade = 'GRADE_A';
  else if (clampedIndex >= 70) grade = 'GRADE_B';
  else if (clampedIndex >= 50) grade = 'GRADE_C';
  else grade = 'GRADE_D';

  return { index: clampedIndex, grade };
}

// Evaluate Monsoonal Degradation & Self-Heating Risk
export function evaluatePestOutbreakRisk(
  crop: FeedstockCategory,
  riskType: DegradationRiskType,
  weather: WeatherMetrics,
  telemetry: SpectralMetrics,
  config: BioenergyRuleEngineConfig = DEFAULT_AGRO_CONFIG
): { probabilityPct: number; riskScore: number; trajectory: 'RISING' | 'STABLE' | 'DECLINING' } {
  let riskScore = 20;

  if (telemetry.coreTempC >= config.selfHeatingTempAlarmC || riskType.includes('Exothermic Self-Heating')) {
    riskScore += 55;
  }
  if (telemetry.moisturePct > 40 && telemetry.ensilagePh > config.ensilagePhThreshold) {
    riskScore += 40; // High moisture without adequate lactic acidification
  }
  if (weather.rhMorning >= config.monsoonHumidityTriggerPct) {
    riskScore += 15;
  }

  const clampedRisk = Math.min(95, Math.max(10, riskScore));
  let trajectory: 'RISING' | 'STABLE' | 'DECLINING' = 'STABLE';
  if (clampedRisk > 65) trajectory = 'RISING';
  else if (clampedRisk < 35) trajectory = 'DECLINING';

  return { probabilityPct: clampedRisk, riskScore: clampedRisk, trajectory };
}

// Generate bilingual location-specific bioenergy feedstock advisory & settlement slip
export function generateAgroAdvisory(
  crop: FeedstockCategory,
  riskType: DegradationRiskType,
  grade: HealthGrade,
  district: string,
  block: string
): BiomassProcurementAdvisory {
  const advisoryId = `JS-ADV-${district.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const validUntil = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  if (grade === 'GRADE_D' || riskType.includes('Exothermic Self-Heating')) {
    return {
      advisoryId,
      headlineEn: `CRITICAL THERMAL ALERT: Depot Pod in ${block} (${district})`,
      headlineAs: `${district} জিলাৰ ${block} সংগ্ৰহ কেন্দ্ৰত অস্বাভাৱিক উত্তাপৰ জৰুৰী সতৰ্কবাণী`,
      summaryEn: `IoT multi-depth telemetry indicates core temperature exceeding 54°C with elevated CO2 headspace. Exothermic microbial self-heating poses immediate spontaneous combustion risk.`,
      summaryAs: `চেন্সৰ তথ্য অনুসৰি মজুত খেৰ/নৰাত উষ্ণতা ৫৪ ডিগ্ৰী চেলচিয়াছতকৈ বৃদ্ধি পাইছে। তাৎক্ষণিক অগ্নিনিৰ্বাপক ব্যৱস্থা গ্ৰহণ নকৰিলে জুই লাগিব পাৰে।`,
      preservationActionEn: `Initiate emergency dry Nitrogen (N2) inert gas purge into bottom plenum. De-stack top bales and aerate under covered raised plinth.`,
      preservationActionAs: `গেছ প্লাগৰ জৰিয়তে নাইট্ৰ'জেন গেছ প্ৰবাহিত কৰক আৰু ওপৰৰ স্তুপসমূহ আঁতৰাই শুকান বতাহ চলাচল কৰাওক।`,
      depotTriageEn: `Divert active lot immediately to Numaligarh boiler off-take or anaerobic digestion digester within 24 hours.`,
      depotTriageAs: `২৪ ঘণ্টাৰ ভিতৰত এই খেৰৰ স্তুপ বায়'ৰিফাইনাৰীৰ বয়লাৰলৈ স্থানান্তৰ কৰক।`,
      chemicalInterventionEn: `Apply biological organic acid stabilizer or lactic culture to arrest thermophilic actinomycetes.`,
      chemicalInterventionAs: `তাপ সংবেদনশীল বেক্টেৰিয়া নিয়ন্ত্ৰণৰ বাবে জৈৱিক অণুজীৱ সংমিশ্ৰণ স্প্ৰে কৰক।`,
      pricingRatePerTonne: `Rs. 1,950 / Metric Tonne (Emergency Off-Take Clearance)`,
      payoutAmount: `Rs. 29,250 (Direct DBT Payout Voucher)`,
      issuingAuthority: `JaivikSuraksha Bioenergy Command & MC² Foundation`,
      validUntil
    };
  }

  return {
    advisoryId,
    headlineEn: `Biomass Off-Take & Ensilage Clearance for ${block} Hub (${district})`,
    headlineAs: `${district} জিলাৰ ${block} বায়'মাচ সংগ্ৰহ আৰু ধন পৰিশোধ নিৰ্দেশনা`,
    summaryEn: `High-moisture paddy straw and bamboo harvest residue certified for JaivikSuraksha anaerobic ensiling and refinery off-take.`,
    summaryAs: `শালি ধানৰ নৰা আৰু বাঁহৰ অৱশিষ্টসমূহ জৈৱিক সুৰক্ষাৰ বায়ুহীন সংৰক্ষণ আৰু ৰিফাইনাৰীৰ বাবে অনুমোদিত কৰা হৈছে।`,
    preservationActionEn: `Maintain airtight poly-film seal on bunker silo. Inoculate with Lactobacillus plantarum (10^6 CFU/g) to lock glucan and xylan polymers.`,
    preservationActionAs: `চাকৰিযুক্ত চাইল' বংকাৰত বায়ু প্ৰৱেশ বন্ধ ৰাখক আৰু অণুজীৱ সংমিশ্ৰণ প্ৰয়োগ কৰি কাৰ্ব'হাইড্ৰেট সংৰক্ষণ কৰক।`,
    depotTriageEn: `Scheduled for continuous 365-day Numaligarh 2G bio-ethanol refinery intake. High carbohydrate recovery verified.`,
    depotTriageAs: `নুুমলীগড় বায়'-ৰিফাইনাৰীত নিৰন্তৰ যোগানৰ বাবে মজুত ৰখা হৈছে।`,
    chemicalInterventionEn: `Secondary waste streams (Lignin & FOM Slurry) scheduled for bio-bitumen and organic tea manure upcycling.`,
    chemicalInterventionAs: `উপজাত লিগনিন আৰু অপদ্ৰব্যসমূহ পথ নিৰ্মাণ আৰু চাহ বাগিচাৰ সাৰ হিচাপে ব্যৱহাৰ কৰা হ'ব।`,
    pricingRatePerTonne: `Rs. 2,200.00 / Metric Tonne (Guaranteed Fair Price)`,
    payoutAmount: `Rs. 32,670.00 (Credited via DBT)`,
    issuingAuthority: `MC² Foundation & Assam Bioenergy Development Grid`,
    validUntil
  };
}
