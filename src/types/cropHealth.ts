// -------------------------------------------------------------
// JaivikSuraksha (জৈৱিক সুৰক্ষা) - NESFIC-I-04 Type Definitions
// Bioenergy Feedstock Chain, Monsoon Preservation & Waste Valorisation
// -------------------------------------------------------------

export type FeedstockCategory = 
  | 'Sali Paddy Straw (Winter Residue)'
  | 'Boro Paddy Straw (Wet Summer)'
  | 'Bamboo Harvest Offcuts (Bambusa tulda)'
  | 'Rapeseed & Mustard Stover'
  | 'Sugarcane Bagasse & Press Mud'
  | 'Tea Factory Prunings & Residue'
  | 'Jute Sticks & Agricultural Waste'
  | 'Aquatic Biomass (Water Hyacinth)';

// Backward-compatible alias
export type CropCategory = FeedstockCategory;

export type PreservationMethod = 
  | 'Anaerobic Ensiling (Lactic Inoculated)'
  | 'Parasitic Flue-Gas Pre-Dried (<12%)'
  | 'Hermetic Pod (LoRaWAN Monitored)'
  | 'Hydrophobic Pelletized Briquette'
  | 'Raised Plinth Open Buffer Shed'
  | 'Fresh Harvest Consignment';

// Backward-compatible alias
export type PhenologicalStage = PreservationMethod;

export type HealthGrade = 'GRADE_A' | 'GRADE_B' | 'GRADE_C' | 'GRADE_D';

export type DegradationRiskType = 
  | 'Fungal Spore Mold (Aspergillus/Trichoderma)'
  | 'Exothermic Self-Heating & Spontaneous Fire'
  | 'High Moisture Waterlogging (>45%)'
  | 'Cellulose Hydrolysis & Matter Loss'
  | 'Acidification Failure (pH > 4.8)'
  | 'Secondary Wet Rot'
  | 'Optimal Anaerobic Preservation'
  | 'None (Certified Stable Feedstock)';

// Backward-compatible alias
export type PestType = DegradationRiskType;

export type AgroClimaticZone = 
  | 'Upper Brahmaputra Valley'
  | 'Central Brahmaputra Valley'
  | 'Lower Brahmaputra Valley'
  | 'North Bank Plain'
  | 'Barak Valley'
  | 'Hill Zone';

export interface BiomassTelemetry {
  moisturePct: number; // 5.0 - 80.0%
  coreTempC: number; // Celsius (self-heating danger >55°C)
  ensilagePh: number; // 3.5 - 7.5 (target <4.0 for stability)
  co2HeadspacePpm: number; // 0 - 50,000 ppm
  dryMatterRetentionPct: number; // %
  glucanContentPct: number; // Cellulose %
  xylanContentPct: number; // Hemicellulose %
  lastSensorReading: string; // ISO Date
  batteryPct: number;
}

// Backward-compatible alias
export interface SpectralMetrics extends BiomassTelemetry {
  ndvi: number;
  ndwi: number;
  savi: number;
  evi: number;
  canopyTemp: number;
  soilMoisturePct: number;
  lastSatellitePass: string;
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
  tonnageEstimate?: number;
}

export interface BiomassProcurementAdvisory {
  advisoryId: string;
  headlineEn: string;
  headlineAs: string;
  summaryEn: string;
  summaryAs: string;
  preservationActionEn: string;
  preservationActionAs: string;
  depotTriageEn: string;
  depotTriageAs: string;
  chemicalInterventionEn: string;
  chemicalInterventionAs: string;
  pricingRatePerTonne: string;
  payoutAmount: string;
  issuingAuthority: string;
  validUntil: string;
}

// Backward-compatible alias
export type AgroAdvisory = BiomassProcurementAdvisory;

export interface FeedstockDepotRecord {
  plotId: string; // Depot / Lot ID
  dagNumber: string; // Hub / Cluster Name
  pattaNumber: string; // Storage Unit / Pod ID
  farmerName: string; // Aggregator / Lead Farmer
  farmerPhone: string;
  district: string;
  block: string;
  village: string;
  gramPanchayat: string;
  zone: AgroClimaticZone;
  lat: number;
  lng: number;
  area: BKLUnits;
  crop: FeedstockCategory;
  sowingDate: string; // Harvest / Ingestion Date
  stage: PreservationMethod;
  spectral: SpectralMetrics;
  weather: WeatherMetrics;
  primaryPest: DegradationRiskType;
  pestRiskScore: number; // 0 - 100 (Degradation Risk)
  pestProbabilityPct: number; // 0 - 100
  riskTrajectory: 'RISING' | 'STABLE' | 'DECLINING';
  cropHealthIndex: number; // 0 - 100 (Biomass Quality & Rot Vulnerability Index - BQVI)
  grade: HealthGrade;
  advisory: BiomassProcurementAdvisory;
  polygon: [number, number][]; // Lat, Lng coordinates for GeoJSON
  status: 'OPTIMAL' | 'WATCHLIST' | 'ADVISORY_ISSUED' | 'EMERGENCY_DISPATCHED';
  tonnage: number;
  allocatedBiorefinery: string;
}

// Backward-compatible alias
export type CropHealthRecord = FeedstockDepotRecord;

export interface FieldScoutingTask {
  taskId: string;
  plotId: string;
  farmerName: string;
  district: string;
  block: string;
  village: string;
  assignedOfficer: string;
  officerRole: 'Depot QA Engineer' | 'Bioenergy Supply Officer' | 'FPO Lead Aggregator' | 'Biorefinery Auditor';
  targetPest: DegradationRiskType;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PENDING_VISIT' | 'SCOUTING_IN_PROGRESS' | 'TRAP_VERIFIED' | 'COMPLETED';
  scheduledDate: string;
  trapCount?: number; // Measured Moisture %
  visualDefoliationPct?: number; // Ensilage pH or dry-matter loss %
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
  crop: FeedstockCategory;
  pest: DegradationRiskType;
  broadcastChannel: 'SMS' | 'WHATSAPP' | 'IVRS_VOICE' | 'COMMUNITY_RADIO';
  recipientCount: number;
  status: 'DRAFT' | 'APPROVED' | 'DISPATCHED';
  timestamp: string;
  approvedBy: string;
  contentAs: string;
  contentEn: string;
}

// -------------------------------------------------------------
// Biorefinery Waste Stream & Secondary Valorisation Types
// -------------------------------------------------------------
export type WasteStreamType = 
  | 'Enzymatic Hydrolysis Lignin Cake'
  | 'Fermented Organic Manure (FOM Digestate)'
  | 'Liquid Digestate / Stillage (LFOM)'
  | 'Flue-Gas Sensible Heat'
  | 'Process Wash Condensate';

export interface BiorefineryWasteUnit {
  id: string;
  streamType: WasteStreamType;
  dailyProductionTons: number;
  moisturePct: number;
  purityPct: number;
  primaryTargetProduct: string;
  economicValueInrPerTon: number;
  status: 'PROCESSING' | 'CERTIFIED' | 'DISPATCHED';
  offtakerName: string;
  co2OffsetTonnes: number;
}

// Drone / Logistics Fleet Specs
export type DroneType = 'Heavy-Lift Biomass Cargo UAV' | 'Sensor Recon & Thermal Hexacopter';

export interface DroneAirframe {
  id: string;
  name: string;
  type: DroneType;
  manufacturer: string;
  wingspanOrDiagonal: string;
  mtowKg: number;
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
  gsdCmPerPixel: number;
  forwardOverlapPct: number;
  sideOverlapPct: number;
  scheduledDate: string;
  status: 'SCHEDULED' | 'IN_FLIGHT' | 'PROCESSING_SFM' | 'COMPLETED';
  areaSurveyedHa: number;
  capturedImages: number;
  orthomosaicTifUrl?: string;
}

export interface PathogenRule {
  ruleId: string;
  pest: DegradationRiskType;
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
