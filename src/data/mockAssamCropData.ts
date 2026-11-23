import { 
  FeedstockDepotRecord, 
  FieldScoutingTask, 
  AdvisoryBroadcast,
  DroneAirframe,
  MultispectralSensorSpec,
  DroneFlightMission,
  PathogenRule,
  AdvisoryTemplate,
  AdminPersonnel,
  SystemAuditLog
} from '../types/cropHealth';
import { bklToSqMeters, generateAgroAdvisory } from '../services/cropIntelligenceEngine';

export const initialCropRecords: FeedstockDepotRecord[] = [
  {
    plotId: 'JS-GOL-NUM-101',
    dagNumber: 'Bokakhat Cluster Depot Hub',
    pattaNumber: 'Silo Pod #04 (Hermetic)',
    farmerName: 'Bhaben Kalita',
    farmerPhone: '+91 94350 48192',
    district: 'Golaghat',
    block: 'Bokakhat / Numaligarh',
    village: 'Mohpara Gaon',
    gramPanchayat: 'Numaligarh GP',
    zone: 'Upper Brahmaputra Valley',
    lat: 26.5833,
    lng: 93.7500,
    area: { bigha: 15, katha: 0, lesa: 0, sqMeters: bklToSqMeters(15, 0, 0), tonnageEstimate: 18.0 },
    crop: 'Sali Paddy Straw (Winter Residue)',
    sowingDate: '2026-11-15',
    stage: 'Anaerobic Ensiling (Lactic Inoculated)',
    tonnage: 18.5,
    allocatedBiorefinery: 'Assam Bio-Refinery Pvt. Ltd. (Numaligarh)',
    spectral: {
      moisturePct: 48.2,
      coreTempC: 32.4,
      ensilagePh: 3.84,
      co2HeadspacePpm: 1240,
      dryMatterRetentionPct: 96.2,
      glucanContentPct: 37.8,
      xylanContentPct: 20.4,
      lastSensorReading: '2026-11-23T03:30:00Z',
      batteryPct: 94,
      ndvi: 0.72,
      ndwi: 0.24,
      savi: 0.65,
      evi: 0.58,
      canopyTemp: 27.2,
      soilMoisturePct: 48.2,
      lastSatellitePass: '2026-11-22T05:14:00Z',
      cloudCoverPct: 12.0
    },
    weather: {
      tMax: 29.5,
      tMin: 18.2,
      rhMorning: 91,
      rhEvening: 82,
      rainfall24h: 38.0,
      consecutiveRainyDays: 3,
      windSpeedKmh: 8.5,
      imdStation: 'Golaghat AWS / NRL Station'
    },
    primaryPest: 'Optimal Anaerobic Preservation',
    pestRiskScore: 18,
    pestProbabilityPct: 18,
    riskTrajectory: 'DECLINING',
    cropHealthIndex: 94,
    grade: 'GRADE_A',
    advisory: generateAgroAdvisory('Sali Paddy Straw (Winter Residue)', 'Optimal Anaerobic Preservation', 'GRADE_A', 'Golaghat', 'Bokakhat'),
    polygon: [
      [26.582, 93.748],
      [26.585, 93.749],
      [26.586, 93.753],
      [26.581, 93.752]
    ],
    status: 'OPTIMAL'
  },
  {
    plotId: 'JS-GOL-SRU-102',
    dagNumber: 'Sarupathar Bamboo Aggregation Pod',
    pattaNumber: 'Chipping Yard Pod B',
    farmerName: 'Ronjit Saikia (Assam Bamboo FPO)',
    farmerPhone: '+91 98540 21943',
    district: 'Golaghat',
    block: 'Sarupathar',
    village: 'Borpathar Habigaon',
    gramPanchayat: 'Sarupathar GP',
    zone: 'Upper Brahmaputra Valley',
    lat: 26.1830,
    lng: 93.8167,
    area: { bigha: 28, katha: 0, lesa: 0, sqMeters: bklToSqMeters(28, 0, 0), tonnageEstimate: 42.0 },
    crop: 'Bamboo Harvest Offcuts (Bambusa tulda)',
    sowingDate: '2026-11-18',
    stage: 'Parasitic Flue-Gas Pre-Dried (<12%)',
    tonnage: 44.0,
    allocatedBiorefinery: 'Assam Bio-Refinery Pvt. Ltd. (Numaligarh)',
    spectral: {
      moisturePct: 11.4,
      coreTempC: 28.5,
      ensilagePh: 5.60,
      co2HeadspacePpm: 450,
      dryMatterRetentionPct: 98.4,
      glucanContentPct: 44.2,
      xylanContentPct: 22.1,
      lastSensorReading: '2026-11-23T03:45:00Z',
      batteryPct: 98,
      ndvi: 0.81,
      ndwi: -0.05,
      savi: 0.74,
      evi: 0.69,
      canopyTemp: 28.5,
      soilMoisturePct: 11.4,
      lastSatellitePass: '2026-11-22T05:14:00Z',
      cloudCoverPct: 10.0
    },
    weather: {
      tMax: 28.4,
      tMin: 17.5,
      rhMorning: 86,
      rhEvening: 74,
      rainfall24h: 12.0,
      consecutiveRainyDays: 1,
      windSpeedKmh: 6.2,
      imdStation: 'Sarupathar Agromet Field Unit'
    },
    primaryPest: 'None (Certified Stable Feedstock)',
    pestRiskScore: 12,
    pestProbabilityPct: 12,
    riskTrajectory: 'STABLE',
    cropHealthIndex: 96,
    grade: 'GRADE_A',
    advisory: generateAgroAdvisory('Bamboo Harvest Offcuts (Bambusa tulda)', 'None (Certified Stable Feedstock)', 'GRADE_A', 'Golaghat', 'Sarupathar'),
    polygon: [
      [26.181, 93.814],
      [26.184, 93.815],
      [26.185, 93.819],
      [26.180, 93.818]
    ],
    status: 'OPTIMAL'
  },
  {
    plotId: 'JS-NAG-KAL-201',
    dagNumber: 'Kaliabor Central Storage Pod',
    pattaNumber: 'Shed C-02 (Buffer Stack)',
    farmerName: 'Mukut Hazarika',
    farmerPhone: '+91 94351 88321',
    district: 'Nagaon',
    block: 'Kaliabor',
    village: 'Kuwaritol',
    gramPanchayat: 'Kaliabor GP',
    zone: 'Central Brahmaputra Valley',
    lat: 26.5412,
    lng: 92.9814,
    area: { bigha: 12, katha: 2, lesa: 0, sqMeters: bklToSqMeters(12, 2, 0), tonnageEstimate: 15.0 },
    crop: 'Rapeseed & Mustard Stover',
    sowingDate: '2026-11-10',
    stage: 'Raised Plinth Open Buffer Shed',
    tonnage: 16.2,
    allocatedBiorefinery: 'SATAT CBG Plant (Nagaon Cluster)',
    spectral: {
      moisturePct: 24.5,
      coreTempC: 44.8,
      ensilagePh: 6.20,
      co2HeadspacePpm: 1420,
      dryMatterRetentionPct: 88.5,
      glucanContentPct: 34.2,
      xylanContentPct: 18.5,
      lastSensorReading: '2026-11-23T03:15:00Z',
      batteryPct: 82,
      ndvi: 0.52,
      ndwi: 0.16,
      savi: 0.48,
      evi: 0.44,
      canopyTemp: 32.0,
      soilMoisturePct: 24.5,
      lastSatellitePass: '2026-11-21T05:14:00Z',
      cloudCoverPct: 25.0
    },
    weather: {
      tMax: 30.8,
      tMin: 20.4,
      rhMorning: 92,
      rhEvening: 84,
      rainfall24h: 46.0,
      consecutiveRainyDays: 4,
      windSpeedKmh: 11.0,
      imdStation: 'Nagaon District Observatory'
    },
    primaryPest: 'High Moisture Waterlogging (>45%)',
    pestRiskScore: 68,
    pestProbabilityPct: 68,
    riskTrajectory: 'RISING',
    cropHealthIndex: 58,
    grade: 'GRADE_C',
    advisory: generateAgroAdvisory('Rapeseed & Mustard Stover', 'High Moisture Waterlogging (>45%)', 'GRADE_C', 'Nagaon', 'Kaliabor'),
    polygon: [
      [26.539, 92.979],
      [26.543, 92.980],
      [26.544, 92.984],
      [26.538, 92.983]
    ],
    status: 'WATCHLIST'
  },
  {
    plotId: 'JS-KAM-AZR-301',
    dagNumber: 'Azara Bio-Depot Hub #01',
    pattaNumber: 'Bunker Pod Alpha',
    farmerName: 'Dijen Das',
    farmerPhone: '+91 98640 55102',
    district: 'Kamrup Rural',
    block: 'Rani / Azara',
    village: 'Mikirpara Chakardo',
    gramPanchayat: 'Azara GP',
    zone: 'Lower Brahmaputra Valley',
    lat: 26.1152,
    lng: 91.6028,
    area: { bigha: 8, katha: 0, lesa: 0, sqMeters: bklToSqMeters(8, 0, 0), tonnageEstimate: 10.0 },
    crop: 'Sali Paddy Straw (Winter Residue)',
    sowingDate: '2026-11-05',
    stage: 'Raised Plinth Open Buffer Shed',
    tonnage: 11.5,
    allocatedBiorefinery: 'Guwahati SATAT Biogas / Industrial Boiler',
    spectral: {
      moisturePct: 38.6,
      coreTempC: 56.4, // Overheating alert!
      ensilagePh: 6.80,
      co2HeadspacePpm: 3850,
      dryMatterRetentionPct: 74.2,
      glucanContentPct: 28.4,
      xylanContentPct: 14.2,
      lastSensorReading: '2026-11-23T03:50:00Z',
      batteryPct: 76,
      ndvi: 0.44,
      ndwi: 0.22,
      savi: 0.40,
      evi: 0.36,
      canopyTemp: 35.8,
      soilMoisturePct: 38.6,
      lastSatellitePass: '2026-11-20T05:14:00Z',
      cloudCoverPct: 32.0
    },
    weather: {
      tMax: 31.4,
      tMin: 22.1,
      rhMorning: 94,
      rhEvening: 88,
      rainfall24h: 54.0,
      consecutiveRainyDays: 5,
      windSpeedKmh: 9.8,
      imdStation: 'Guwahati Borjhar Airport (VEGT)'
    },
    primaryPest: 'Exothermic Self-Heating & Spontaneous Fire',
    pestRiskScore: 89,
    pestProbabilityPct: 89,
    riskTrajectory: 'RISING',
    cropHealthIndex: 38,
    grade: 'GRADE_D',
    advisory: generateAgroAdvisory('Sali Paddy Straw (Winter Residue)', 'Exothermic Self-Heating & Spontaneous Fire', 'GRADE_D', 'Kamrup Rural', 'Azara'),
    polygon: [
      [26.113, 91.600],
      [26.117, 91.601],
      [26.118, 91.605],
      [26.112, 91.604]
    ],
    status: 'EMERGENCY_DISPATCHED'
  },
  {
    plotId: 'JS-BAR-HOW-401',
    dagNumber: 'Howly Agro-Residue Cluster Depot',
    pattaNumber: 'Pelletizing Silo Unit #03',
    farmerName: 'Aminul Islam (Barpeta FPO)',
    farmerPhone: '+91 94353 77412',
    district: 'Barpeta',
    block: 'Howly',
    village: 'Mandia Pathar',
    gramPanchayat: 'Howly GP',
    zone: 'Lower Brahmaputra Valley',
    lat: 26.4333,
    lng: 90.9667,
    area: { bigha: 32, katha: 0, lesa: 0, sqMeters: bklToSqMeters(32, 0, 0), tonnageEstimate: 45.0 },
    crop: 'Rapeseed & Mustard Stover',
    sowingDate: '2026-11-19',
    stage: 'Hydrophobic Pelletized Briquette',
    tonnage: 46.8,
    allocatedBiorefinery: 'Bongaigaon Refinery Boiler / CBG Unit',
    spectral: {
      moisturePct: 9.8,
      coreTempC: 26.2,
      ensilagePh: 5.40,
      co2HeadspacePpm: 380,
      dryMatterRetentionPct: 99.1,
      glucanContentPct: 41.5,
      xylanContentPct: 21.0,
      lastSensorReading: '2026-11-23T03:40:00Z',
      batteryPct: 96,
      ndvi: 0.84,
      ndwi: -0.10,
      savi: 0.76,
      evi: 0.71,
      canopyTemp: 26.2,
      soilMoisturePct: 9.8,
      lastSatellitePass: '2026-11-21T05:14:00Z',
      cloudCoverPct: 8.0
    },
    weather: {
      tMax: 29.2,
      tMin: 18.0,
      rhMorning: 85,
      rhEvening: 72,
      rainfall24h: 8.0,
      consecutiveRainyDays: 0,
      windSpeedKmh: 7.4,
      imdStation: 'Barpeta Road AWS'
    },
    primaryPest: 'None (Certified Stable Feedstock)',
    pestRiskScore: 10,
    pestProbabilityPct: 10,
    riskTrajectory: 'DECLINING',
    cropHealthIndex: 98,
    grade: 'GRADE_A',
    advisory: generateAgroAdvisory('Rapeseed & Mustard Stover', 'None (Certified Stable Feedstock)', 'GRADE_A', 'Barpeta', 'Howly'),
    polygon: [
      [26.431, 90.964],
      [26.435, 90.965],
      [26.436, 90.969],
      [26.430, 90.968]
    ],
    status: 'OPTIMAL'
  },
  {
    plotId: 'JS-TIN-DOO-501',
    dagNumber: 'Doomdooma Tea & Bamboo Depot',
    pattaNumber: 'Hermetic Pod C-01',
    farmerName: 'Prabhat Moran',
    farmerPhone: '+91 98544 99120',
    district: 'Tinsukia',
    block: 'Doomdooma',
    village: 'Rupai Siding',
    gramPanchayat: 'Doomdooma GP',
    zone: 'Upper Brahmaputra Valley',
    lat: 27.5667,
    lng: 95.5667,
    area: { bigha: 20, katha: 0, lesa: 0, sqMeters: bklToSqMeters(20, 0, 0), tonnageEstimate: 26.0 },
    crop: 'Tea Factory Prunings & Residue',
    sowingDate: '2026-11-12',
    stage: 'Hermetic Pod (LoRaWAN Monitored)',
    tonnage: 28.0,
    allocatedBiorefinery: 'Upper Assam Bio-Coal & CBG Hub',
    spectral: {
      moisturePct: 14.8,
      coreTempC: 31.0,
      ensilagePh: 5.10,
      co2HeadspacePpm: 620,
      dryMatterRetentionPct: 94.6,
      glucanContentPct: 36.4,
      xylanContentPct: 17.8,
      lastSensorReading: '2026-11-23T03:20:00Z',
      batteryPct: 91,
      ndvi: 0.76,
      ndwi: 0.08,
      savi: 0.68,
      evi: 0.62,
      canopyTemp: 27.5,
      soilMoisturePct: 14.8,
      lastSatellitePass: '2026-11-22T05:14:00Z',
      cloudCoverPct: 15.0
    },
    weather: {
      tMax: 27.8,
      tMin: 16.4,
      rhMorning: 90,
      rhEvening: 80,
      rainfall24h: 22.0,
      consecutiveRainyDays: 2,
      windSpeedKmh: 8.0,
      imdStation: 'Mohanbari Airport (Dibrugarh)'
    },
    primaryPest: 'None (Certified Stable Feedstock)',
    pestRiskScore: 22,
    pestProbabilityPct: 22,
    riskTrajectory: 'STABLE',
    cropHealthIndex: 88,
    grade: 'GRADE_A',
    advisory: generateAgroAdvisory('Tea Factory Prunings & Residue', 'None (Certified Stable Feedstock)', 'GRADE_A', 'Tinsukia', 'Doomdooma'),
    polygon: [
      [27.564, 95.564],
      [27.568, 95.565],
      [27.569, 95.569],
      [27.563, 95.568]
    ],
    status: 'OPTIMAL'
  }
];

export const initialScoutingTasks: FieldScoutingTask[] = [
  {
    taskId: 'TASK-JS-2026-081',
    plotId: 'JS-KAM-AZR-301',
    farmerName: 'Dijen Das',
    district: 'Kamrup Rural',
    block: 'Azara',
    village: 'Mikirpara Chakardo',
    assignedOfficer: 'Anurag Sharma',
    officerRole: 'Depot QA Engineer',
    targetPest: 'Exothermic Self-Heating & Spontaneous Fire',
    priority: 'CRITICAL',
    status: 'SCOUTING_IN_PROGRESS',
    scheduledDate: '2026-11-23',
    trapCount: 38.6, // Moisture %
    visualDefoliationPct: 56.4, // Core Temp C
    scoutingNotes: 'CRITICAL: Core temperature reading 56.4°C! Dispatched mobile N2 purging unit to stack plenum.',
    gpsVerified: true
  },
  {
    taskId: 'TASK-JS-2026-082',
    plotId: 'JS-NAG-KAL-201',
    farmerName: 'Mukut Hazarika',
    district: 'Nagaon',
    block: 'Kaliabor',
    village: 'Kuwaritol',
    assignedOfficer: 'Deepjyoti Bora',
    officerRole: 'Bioenergy Supply Officer',
    targetPest: 'High Moisture Waterlogging (>45%)',
    priority: 'HIGH',
    status: 'PENDING_VISIT',
    scheduledDate: '2026-11-24',
    trapCount: 24.5,
    visualDefoliationPct: 44.8,
    scoutingNotes: 'Inspect plinth drainage channel after overnight rainfall; check bale tarp seals.',
    gpsVerified: false
  },
  {
    taskId: 'TASK-JS-2026-083',
    plotId: 'JS-GOL-NUM-101',
    farmerName: 'Bhaben Kalita',
    district: 'Golaghat',
    block: 'Bokakhat',
    village: 'Mohpara Gaon',
    assignedOfficer: 'Pranjal Gogoi',
    officerRole: 'Biorefinery Auditor',
    targetPest: 'Optimal Anaerobic Preservation',
    priority: 'LOW',
    status: 'COMPLETED',
    scheduledDate: '2026-11-22',
    trapCount: 48.2,
    visualDefoliationPct: 32.4,
    scoutingNotes: 'Hermetic seal integrity 100%. Lactic acid pH reading 3.84 confirmed. Ready for Numaligarh dispatch.',
    gpsVerified: true
  }
];

export const initialBroadcasts: AdvisoryBroadcast[] = [
  {
    id: 'BC-2026-01',
    title: 'Monsoon Biomass Moisture Triage Directive',
    district: 'Golaghat',
    block: 'Bokakhat / Numaligarh',
    crop: 'Sali Paddy Straw (Winter Residue)',
    pest: 'Optimal Anaerobic Preservation',
    broadcastChannel: 'WHATSAPP',
    recipientCount: 2450,
    status: 'DISPATCHED',
    timestamp: '2026-11-22T08:30:00Z',
    approvedBy: 'MC² Foundation & ABRPL Supply Lead',
    contentAs: 'বৰষুণৰ বতৰত পথাৰৰ নৰা আৰু বাঁহৰ অৱশিষ্টসমূহ জৈৱিক সুৰক্ষাৰ চাইল’ বংকাৰলৈ আনি নিৰ্ধাৰিত প্ৰতি টন ২২০০ টকা লাভ কৰক।',
    contentEn: 'Deliver wet paddy straw and bamboo residues to JaivikSuraksha bunker silos at certified base rate of Rs. 2,200/Tonne.'
  }
];

export const mockAirframes: DroneAirframe[] = [
  {
    id: 'UAV-JS-CARGO-01',
    name: 'Garuda-Heavy Lift 50',
    type: 'Heavy-Lift Biomass Cargo UAV',
    manufacturer: 'Assam Drone Tech / Garuda',
    wingspanOrDiagonal: '2.4 m Hexacopter',
    mtowKg: 75.0,
    payloadCapacityKg: 40.0,
    flightTimeMin: 45,
    maxSurveySpeedKmh: 55,
    coveragePerFlightHa: 120,
    ipRating: 'IP65 Monsoon Proof',
    batterySpecs: 'Solid-State Li-ion 48V 35Ah',
    avionics: 'Pixhawk 6X + Dual NavIC RTK GNSS',
    dgcaTypeCertified: true,
    status: 'READY',
    assignedDistrict: 'Golaghat',
    pilotName: 'Bitupan Borah',
    pilotLicense: 'DGCA-RPC-2025-912'
  }
];

export const mockMultispectralBands: MultispectralSensorSpec[] = [
  { band: 'Thermal IR (FLIR)', wavelengthNm: 10500, bandwidthNm: 4000, primaryAgronomicIndicator: 'Biomass Core Self-Heating & Fermentation Hotspots', sensitivity: '0.05°C NETD' },
  { band: 'Near Infrared (NIR)', wavelengthNm: 842, bandwidthNm: 115, primaryAgronomicIndicator: 'Moisture Penetration & Cellulose Integrity', sensitivity: 'High Dynamic Range' },
  { band: 'RedEdge', wavelengthNm: 705, bandwidthNm: 15, primaryAgronomicIndicator: 'Lignin-Glucan Structural Preservation', sensitivity: 'High Dynamic Range' }
];

export const mockFlightMissions: DroneFlightMission[] = [
  {
    missionId: 'MSN-2026-091',
    droneId: 'UAV-JS-CARGO-01',
    droneName: 'Garuda-Heavy Lift 50',
    district: 'Golaghat',
    block: 'Numaligarh',
    targetPlots: 'Numaligarh 500-Tonne Buffer Hub',
    altitudeM: 80,
    gsdCmPerPixel: 2.5,
    forwardOverlapPct: 80,
    sideOverlapPct: 75,
    scheduledDate: '2026-11-23',
    status: 'SCHEDULED',
    areaSurveyedHa: 45.0,
    capturedImages: 340
  }
];

export const mockPathogenRules: PathogenRule[] = [
  {
    ruleId: 'RULE-HEATING-01',
    pest: 'Exothermic Self-Heating & Spontaneous Fire',
    title: 'Biomass Core Temperature Critical Alert (>52°C)',
    minTempC: 52,
    maxTempC: 85,
    minMorningRhPct: 85,
    minRainfallMm: 25,
    consecutiveDaysRequired: 2,
    resultingGrade: 'GRADE_D',
    enabled: true
  },
  {
    ruleId: 'RULE-ENSILING-02',
    pest: 'Optimal Anaerobic Preservation',
    title: 'Lactic Ensiling Acidification Target (pH < 4.2)',
    minTempC: 18,
    maxTempC: 35,
    minMorningRhPct: 80,
    minRainfallMm: 0,
    consecutiveDaysRequired: 1,
    resultingGrade: 'GRADE_A',
    enabled: true
  }
];

export const mockAdvisoryTemplates: AdvisoryTemplate[] = [
  {
    templateId: 'TPL-ENSILAGE-01',
    category: 'GENERAL_CARE',
    title: 'Anaerobic Ensiling Silo Procedure',
    textAs: 'পথাৰৰ ভিজা খেৰসমূহ চাইল’ বংকাৰত ভৰাই প্লাষ্টিকৰ চাদৰেৰে বায়ু সোমাব নোৱাৰাকৈ বন্ধ কৰি ৰাখক।',
    textBodo: 'गोथां मैहौफोरखौ साइल’ बंकराव लाखिना हावा हाबनो हायै फोजोबना दोन।',
    textBn: 'ভিজা খড় সাইলো বাঙ্কারে ভরে প্লাস্টিক দিয়ে বায়ুরোধী করে সংরক্ষণ করুন।',
    textEn: 'Compact wet straw inside airtight bunker silos with lactic inoculant to preserve carbohydrates.',
    author: 'MC² Foundation & IIT Guwahati Bioenergy Expert Group',
    approvalStatus: 'AUTHORIZED'
  }
];

export const mockAdminPersonnel: AdminPersonnel[] = [
  {
    userId: 'ADM-JS-01',
    name: 'Ron Hatibaruah',
    designation: 'Lead Bioenergy Systems Architect',
    department: 'Dept of Agriculture',
    district: 'Statewide',
    role: 'ASSAC Lead Analyst',
    phone: '+91 94350 99881',
    email: 'ron.hatibaruah@bioenergy-assam.gov.in',
    status: 'ACTIVE'
  },
  {
    userId: 'ADM-JS-02',
    name: 'Dr. Kaushik Baruah',
    designation: 'Feedstock Supply Chain Specialist',
    department: 'ASSAC (Science & Tech)',
    district: 'Golaghat',
    role: 'AAU Scientist',
    phone: '+91 98540 11223',
    email: 'k.baruah@mc2foundation.org',
    status: 'ACTIVE'
  }
];

export const mockAuditLogs: SystemAuditLog[] = [
  {
    logId: 'AUD-2026-901',
    timestamp: '2026-11-23T03:52:10Z',
    actor: 'Smart Probe Spear #04 (Kamrup)',
    action: 'THERMAL_ALARM_AUTO_TRIGGER',
    module: 'EPIDEMIOLOGY_RULES',
    details: 'Core temperature exceeded 54°C. Automated dry N2 emergency purge initiated to stack plenum.',
    sha256Hash: 'e4f901ab8872cd91823ef0129bcdae4184912fae8912345bcdef90123456789a'
  },
  {
    logId: 'AUD-2026-902',
    timestamp: '2026-11-23T02:15:44Z',
    actor: 'Bokakhat Cluster Depot Weighbridge',
    action: 'CONSIGNMENT_DBT_SETTLED',
    module: 'ADVISORY_DISPATCH',
    details: 'Voucher JS-GOL-2026-0842 (14.85 MT Sali Straw) cleared for direct DBT payout of Rs. 32,670 to Sri Bhaben Kalita.',
    sha256Hash: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b'
  }
];

// Aliases for component compatibility
export const initialDroneFleet = mockAirframes;
export const initialDroneMissions = mockFlightMissions;
export const initialPathogenRules = mockPathogenRules;
export const initialAdvisoryTemplates = mockAdvisoryTemplates;
export const initialPersonnel = mockAdminPersonnel;
export const initialAuditLogs = mockAuditLogs;
export const multispectralSensors = mockMultispectralBands;
