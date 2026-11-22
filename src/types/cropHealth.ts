export type CropCategory = 
  | 'Sali Paddy (Winter Rice)'
  | 'Boro Paddy (Summer Rice)'
  | 'Ahu Paddy (Autumn Rice)'
  | 'Rapeseed & Mustard'
  | 'Jute'
  | 'Potato'
  | 'Black Gram (Matikalai)'
  | 'Winter Vegetables';

export type PhenologicalStage = 
  | 'Germination & Seedling'
  | 'Active Tillering'
  | 'Panicle Initiation'
  | 'Flowering & Anthesis'
  | 'Dough / Grain Filling'
  | 'Ripening & Harvest Ready';

export type HealthGrade = 'GRADE_A' | 'GRADE_B' | 'GRADE_C' | 'GRADE_D';

export type PestType = 
  | 'Rice Blast (Magnaporthe oryzae)'
  | 'Yellow Stem Borer (Scirpophaga incertulas)'
  | 'Sheath Blight (Rhizoctonia solani)'
  | 'Bacterial Leaf Blight (Xanthomonas oryzae)'
  | 'Brown Plant Hopper (Nilaparvata lugens)'
  | 'Mustard Aphid (Lipaphis erysimi)'
  | 'Fall Armyworm (Spodoptera frugiperda)'
  | 'Late Blight (Phytophthora infestans)'
  | 'None (Healthy Crop)';

export type AgroClimaticZone = 
  | 'Upper Brahmaputra Valley'
  | 'Central Brahmaputra Valley'
  | 'Lower Brahmaputra Valley'
  | 'North Bank Plain'
  | 'Barak Valley'
  | 'Hill Zone';

export interface SpectralMetrics {
  ndvi: number; // 0.0 - 1.0 (Canopy vigor)
  ndwi: number; // -1.0 - 1.0 (Water/moisture stress)
  savi: number; // Soil adjusted
  evi: number;  // Enhanced vegetation index
  canopyTemp: number; // Celsius
  soilMoisturePct: number; // Volumetric %
  lastSatellitePass: string; // ISO Date (Sentinel-2 / Landsat)
  cloudCoverPct: number;
}

export interface WeatherMetrics {
  tMax: number;
  tMin: number;
  rhMorning: number; // %
  rhEvening: number; // %
  rainfall24h: number; // mm
  consecutiveRainyDays: number;
  windSpeedKmh: number;
  imdStation: string;
}

export interface BKLUnits {
  bigha: number;
  katha: number;
  lesa: number;
  sqMeters: number;
}

export interface AgroAdvisory {
  advisoryId: string;
  headlineEn: string;
  headlineAs: string;
  summaryEn: string;
  summaryAs: string;
  culturalActionEn: string;
  culturalActionAs: string;
  bioPesticideEn: string;
  bioPesticideAs: string;
  chemicalInterventionEn: string;
  chemicalInterventionAs: string;
  dosagePerBigha: string;
  waterDrainageAdvice: string;
  issuingAuthority: string;
  validUntil: string;
}

export interface CropHealthRecord {
  plotId: string;
  dagNumber: string;
  pattaNumber: string;
  farmerName: string;
  farmerPhone: string;
  district: string;
  block: string;
  village: string;
  gramPanchayat: string;
  zone: AgroClimaticZone;
  lat: number;
  lng: number;
  area: BKLUnits;
  crop: CropCategory;
  sowingDate: string;
  stage: PhenologicalStage;
  spectral: SpectralMetrics;
  weather: WeatherMetrics;
  primaryPest: PestType;
  pestRiskScore: number; // 0 - 100
  pestProbabilityPct: number; // 0 - 100
  riskTrajectory: 'RISING' | 'STABLE' | 'DECLINING';
  cropHealthIndex: number; // 0 - 100
  grade: HealthGrade;
  advisory: AgroAdvisory;
  polygon: [number, number][]; // Lat, Lng coordinates for GeoJSON
  status: 'OPTIMAL' | 'WATCHLIST' | 'ADVISORY_ISSUED' | 'EMERGENCY_DISPATCHED';
}

export interface FieldScoutingTask {
  taskId: string;
  plotId: string;
  farmerName: string;
  district: string;
  block: string;
  village: string;
  assignedOfficer: string;
  officerRole: 'ADO (Agri Dev Officer)' | 'AEO (Agri Extension Officer)' | 'Krishi Sakhi' | 'KVK Scientist';
  targetPest: PestType;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PENDING_VISIT' | 'SCOUTING_IN_PROGRESS' | 'TRAP_VERIFIED' | 'COMPLETED';
  scheduledDate: string;
  trapCount?: number;
  visualDefoliationPct?: number;
  scoutingNotes?: string;
  leafSampleImageUrl?: string;
  aiDiagnosticPrediction?: string;
  aiConfidencePct?: number;
  gpsVerified?: boolean;
}

export interface AdvisoryBroadcast {
  id: string;
  title: string;
  district: string;
  block: string;
  crop: CropCategory;
  pest: PestType;
  broadcastChannel: 'SMS' | 'WHATSAPP' | 'IVRS_VOICE' | 'COMMUNITY_RADIO';
  recipientCount: number;
  status: 'DRAFT' | 'APPROVED' | 'DISPATCHED';
  timestamp: string;
  approvedBy: string;
  contentAs: string;
  contentEn: string;
}

// -------------------------------------------------------------
// Drone Technology & Fleet Operations Types
// -------------------------------------------------------------
export type DroneType = 'Multi-Rotor Hexacopter' | 'Hybrid VTOL Fixed-Wing';

export interface DroneAirframe {
  id: string;
  name: string;
  type: DroneType;
  manufacturer: string;
  wingspanOrDiagonal: string;
  mtowKg: number; // Max Takeoff Weight
  payloadCapacityKg: number;
  flightTimeMin: number;
  maxSurveySpeedKmh: number;
  coveragePerFlightHa: number;
  ipRating: string;
  batterySpecs: string;
  avionics: string;
  dgcaTypeCertified: boolean;
  status: 'READY' | 'IN_MISSION' | 'MAINTENANCE';
  assignedDistrict: string;
  pilotName: string;
  pilotLicense: string;
}

export interface MultispectralSensorSpec {
  band: string;
  wavelengthNm: number;
  bandwidthNm: number;
  primaryAgronomicIndicator: string;
  sensitivity: string;
}

export interface DroneFlightMission {
  missionId: string;
  droneId: string;
  droneName: string;
  district: string;
  block: string;
  targetPlots: string;
  altitudeM: number;
  gsdCmPerPixel: number; // Ground Sampling Distance
  forwardOverlapPct: number;
  sideOverlapPct: number;
  scheduledDate: string;
  status: 'SCHEDULED' | 'IN_FLIGHT' | 'PROCESSING_SFM' | 'COMPLETED';
  areaSurveyedHa: number;
  capturedImages: number;
  orthomosaicTifUrl?: string;
}

// -------------------------------------------------------------
// Advanced Admin & Governance Types
// -------------------------------------------------------------
export interface PathogenRule {
  ruleId: string;
  pest: PestType;
  title: string;
  minTempC: number;
  maxTempC: number;
  minMorningRhPct: number;
  minRainfallMm: number;
  consecutiveDaysRequired: number;
  resultingGrade: HealthGrade;
  enabled: boolean;
}

export interface AdvisoryTemplate {
  templateId: string;
  category: 'FUNGAL_BLIGHT' | 'STEM_BORER' | 'MOISTURE_STRESS' | 'GENERAL_CARE';
  title: string;
  textAs: string;
  textBodo: string;
  textBn: string;
  textEn: string;
  author: string;
  approvalStatus: 'DRAFT' | 'REVIEWED' | 'AUTHORIZED';
}

export interface AdminPersonnel {
  userId: string;
  name: string;
  designation: string;
  department: 'Dept of Agriculture' | 'ASSAC (Science & Tech)' | 'AAU Jorhat' | 'Krishi Vigyan Kendra';
  district: string;
  role: 'DAO (District Officer)' | 'SDAO (Sub-Divisional)' | 'ADO (Agri Dev Officer)' | 'ASSAC Lead Analyst' | 'AAU Scientist';
  phone: string;
  email: string;
  status: 'ACTIVE' | 'ON_FIELD' | 'OFFLINE';
}

export interface SystemAuditLog {
  logId: string;
  timestamp: string;
  actor: string;
  action: string;
  module: 'DRONE_OPS' | 'EPIDEMIOLOGY_RULES' | 'ADVISORY_DISPATCH' | 'RBAC_SECURITY';
  details: string;
  sha256Hash: string;
}

