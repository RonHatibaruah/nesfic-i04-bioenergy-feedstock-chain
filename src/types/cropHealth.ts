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
