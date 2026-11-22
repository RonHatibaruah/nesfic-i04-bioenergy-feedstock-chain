import { 
  CropHealthRecord, 
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

export const initialCropRecords: CropHealthRecord[] = [
  {
    plotId: 'ASM-KAM-AZR-101',
    dagNumber: 'Dag 248',
    pattaNumber: 'KP Patta 42',
    farmerName: 'Biren Kalita',
    farmerPhone: '+91 94350 12845',
    district: 'Kamrup Rural',
    block: 'Rani / Azara',
    village: 'Mikirpara Chakardo',
    gramPanchayat: 'Azara GP',
    zone: 'Lower Brahmaputra Valley',
    lat: 26.1152,
    lng: 91.6028,
    area: { bigha: 3, katha: 2, lesa: 10, sqMeters: bklToSqMeters(3, 2, 10) },
    crop: 'Sali Paddy (Winter Rice)',
    sowingDate: '2026-07-15',
    stage: 'Panicle Initiation',
    spectral: {
      ndvi: 0.48, // Low NDVI: Stressed canopy
      ndwi: 0.18,
      savi: 0.42,
      evi: 0.39,
      canopyTemp: 29.4,
      soilMoisturePct: 34.2,
      lastSatellitePass: '2026-11-20T05:14:22Z',
      cloudCoverPct: 8.5
    },
    weather: {
      tMax: 30.2,
      tMin: 22.8,
      rhMorning: 92,
      rhEvening: 81,
      rainfall24h: 42.5,
      consecutiveRainyDays: 3,
      windSpeedKmh: 9.4,
      imdStation: 'Guwahati Borjhar Airport (VEGT)'
    },
    primaryPest: 'Rice Blast (Magnaporthe oryzae)',
    pestRiskScore: 88,
    pestProbabilityPct: 88,
    riskTrajectory: 'RISING',
    cropHealthIndex: 42,
    grade: 'GRADE_D',
    advisory: generateAgroAdvisory('Sali Paddy (Winter Rice)', 'Rice Blast (Magnaporthe oryzae)', 'GRADE_D', 'Kamrup Rural', 'Azara'),
    polygon: [
      [26.1145, 91.6020],
      [26.1160, 91.6022],
      [26.1162, 91.6040],
      [26.1147, 91.6038],
      [26.1145, 91.6020]
    ],
    status: 'EMERGENCY_DISPATCHED'
  },
  {
    plotId: 'ASM-NAG-RAH-204',
    dagNumber: 'Dag 512',
    pattaNumber: 'Periodic Patta 108',
    farmerName: 'Deben Saikia',
    farmerPhone: '+91 98540 88219',
    district: 'Nagaon',
    block: 'Raha',
    village: 'Phulaguri Chapari',
    gramPanchayat: 'Raha Town GP',
    zone: 'Central Brahmaputra Valley',
    lat: 26.2285,
    lng: 92.5184,
    area: { bigha: 5, katha: 0, lesa: 0, sqMeters: bklToSqMeters(5, 0, 0) },
    crop: 'Sali Paddy (Winter Rice)',
    sowingDate: '2026-07-20',
    stage: 'Active Tillering',
    spectral: {
      ndvi: 0.54,
      ndwi: 0.22,
      savi: 0.49,
      evi: 0.45,
      canopyTemp: 28.1,
      soilMoisturePct: 38.0,
      lastSatellitePass: '2026-11-20T05:14:22Z',
      cloudCoverPct: 12.0
    },
    weather: {
      tMax: 31.5,
      tMin: 23.4,
      rhMorning: 89,
      rhEvening: 78,
      rainfall24h: 28.0,
      consecutiveRainyDays: 2,
      windSpeedKmh: 6.8,
      imdStation: 'Nagaon Krishi Vigyan Kendra'
    },
    primaryPest: 'Yellow Stem Borer (Scirpophaga incertulas)',
    pestRiskScore: 76,
    pestProbabilityPct: 76,
    riskTrajectory: 'RISING',
    cropHealthIndex: 56,
    grade: 'GRADE_C',
    advisory: generateAgroAdvisory('Sali Paddy (Winter Rice)', 'Yellow Stem Borer (Scirpophaga incertulas)', 'GRADE_C', 'Nagaon', 'Raha'),
    polygon: [
      [26.2275, 92.5170],
      [26.2295, 92.5175],
      [26.2298, 92.5200],
      [26.2278, 92.5195],
      [26.2275, 92.5170]
    ],
    status: 'ADVISORY_ISSUED'
  },
  {
    plotId: 'ASM-JOR-TIT-308',
    dagNumber: 'Dag 104',
    pattaNumber: 'Myadi Patta 89',
    farmerName: 'Ramen Bora',
    farmerPhone: '+91 94352 44310',
    district: 'Jorhat',
    block: 'Titabor (RARS AAU Hub)',
    village: 'Madhapur Gaon',
    gramPanchayat: 'Titabor GP',
    zone: 'Upper Brahmaputra Valley',
    lat: 26.6024,
    lng: 94.1785,
    area: { bigha: 8, katha: 3, lesa: 15, sqMeters: bklToSqMeters(8, 3, 15) },
    crop: 'Sali Paddy (Winter Rice)',
    sowingDate: '2026-07-08',
    stage: 'Flowering & Anthesis',
    spectral: {
      ndvi: 0.82, // Excellent vegetative vigor
      ndwi: 0.12,
      savi: 0.78,
      evi: 0.76,
      canopyTemp: 26.8,
      soilMoisturePct: 29.5,
      lastSatellitePass: '2026-11-20T05:14:22Z',
      cloudCoverPct: 4.0
    },
    weather: {
      tMax: 29.0,
      tMin: 19.5,
      rhMorning: 82,
      rhEvening: 68,
      rainfall24h: 5.0,
      consecutiveRainyDays: 0,
      windSpeedKmh: 5.2,
      imdStation: 'AAU Jorhat Agromet Observatory'
    },
    primaryPest: 'None (Healthy Crop)',
    pestRiskScore: 18,
    pestProbabilityPct: 18,
    riskTrajectory: 'DECLINING',
    cropHealthIndex: 91,
    grade: 'GRADE_A',
    advisory: generateAgroAdvisory('Sali Paddy (Winter Rice)', 'None (Healthy Crop)', 'GRADE_A', 'Jorhat', 'Titabor'),
    polygon: [
      [26.6010, 94.1770],
      [26.6040, 94.1775],
      [26.6042, 94.1805],
      [26.6012, 94.1800],
      [26.6010, 94.1770]
    ],
    status: 'OPTIMAL'
  },
  {
    plotId: 'ASM-BAR-HOW-415',
    dagNumber: 'Dag 388',
    pattaNumber: 'Periodic Patta 67',
    farmerName: 'Nurul Islam',
    farmerPhone: '+91 97061 99342',
    district: 'Barpeta',
    block: 'Howly / Mandia',
    village: 'Mandia Pathar',
    gramPanchayat: 'Mandia GP',
    zone: 'Lower Brahmaputra Valley',
    lat: 26.3120,
    lng: 90.9654,
    area: { bigha: 4, katha: 1, lesa: 0, sqMeters: bklToSqMeters(4, 1, 0) },
    crop: 'Rapeseed & Mustard',
    sowingDate: '2026-10-18',
    stage: 'Active Tillering',
    spectral: {
      ndvi: 0.68,
      ndwi: -0.05,
      savi: 0.62,
      evi: 0.58,
      canopyTemp: 27.5,
      soilMoisturePct: 24.0,
      lastSatellitePass: '2026-11-20T05:14:22Z',
      cloudCoverPct: 2.0
    },
    weather: {
      tMax: 28.5,
      tMin: 18.2,
      rhMorning: 86,
      rhEvening: 72,
      rainfall24h: 0.0,
      consecutiveRainyDays: 0,
      windSpeedKmh: 4.5,
      imdStation: 'Barpeta Krishi Vigyan Kendra'
    },
    primaryPest: 'Mustard Aphid (Lipaphis erysimi)',
    pestRiskScore: 62,
    pestProbabilityPct: 62,
    riskTrajectory: 'RISING',
    cropHealthIndex: 72,
    grade: 'GRADE_B',
    advisory: generateAgroAdvisory('Rapeseed & Mustard', 'Mustard Aphid (Lipaphis erysimi)', 'GRADE_B', 'Barpeta', 'Howly'),
    polygon: [
      [26.3105, 90.9640],
      [26.3135, 90.9645],
      [26.3138, 90.9670],
      [26.3108, 90.9665],
      [26.3105, 90.9640]
    ],
    status: 'WATCHLIST'
  },
  {
    plotId: 'ASM-SON-DHE-520',
    dagNumber: 'Dag 182',
    pattaNumber: 'Myadi Patta 54',
    farmerName: 'Hemanta Baruah',
    farmerPhone: '+91 94351 77123',
    district: 'Sonitpur',
    block: 'Dhekiajuli',
    village: 'Bihaguri Habi',
    gramPanchayat: 'Bihaguri GP',
    zone: 'North Bank Plain',
    lat: 26.6854,
    lng: 92.5218,
    area: { bigha: 6, katha: 0, lesa: 0, sqMeters: bklToSqMeters(6, 0, 0) },
    crop: 'Sali Paddy (Winter Rice)',
    sowingDate: '2026-07-12',
    stage: 'Dough / Grain Filling',
    spectral: {
      ndvi: 0.74,
      ndwi: 0.08,
      savi: 0.70,
      evi: 0.68,
      canopyTemp: 27.0,
      soilMoisturePct: 28.0,
      lastSatellitePass: '2026-11-20T05:14:22Z',
      cloudCoverPct: 6.0
    },
    weather: {
      tMax: 29.8,
      tMin: 20.4,
      rhMorning: 84,
      rhEvening: 70,
      rainfall24h: 12.0,
      consecutiveRainyDays: 1,
      windSpeedKmh: 6.0,
      imdStation: 'Tezpur Airport (VETZ)'
    },
    primaryPest: 'None (Healthy Crop)',
    pestRiskScore: 24,
    pestProbabilityPct: 24,
    riskTrajectory: 'STABLE',
    cropHealthIndex: 84,
    grade: 'GRADE_A',
    advisory: generateAgroAdvisory('Sali Paddy (Winter Rice)', 'None (Healthy Crop)', 'GRADE_A', 'Sonitpur', 'Dhekiajuli'),
    polygon: [
      [26.6840, 92.5200],
      [26.6870, 92.5205],
      [26.6872, 92.5235],
      [26.6842, 92.5230],
      [26.6840, 92.5200]
    ],
    status: 'OPTIMAL'
  },
  {
    plotId: 'ASM-CAC-SIL-630',
    dagNumber: 'Dag 441',
    pattaNumber: 'Myadi Patta 91',
    farmerName: 'Ranjit Das',
    farmerPhone: '+91 94353 66890',
    district: 'Cachar',
    block: 'Silchar / Sonai',
    village: 'Dudpatil Part II',
    gramPanchayat: 'Dudpatil GP',
    zone: 'Barak Valley',
    lat: 24.8450,
    lng: 92.8120,
    area: { bigha: 3, katha: 4, lesa: 0, sqMeters: bklToSqMeters(3, 4, 0) },
    crop: 'Sali Paddy (Winter Rice)',
    sowingDate: '2026-07-28',
    stage: 'Panicle Initiation',
    spectral: {
      ndvi: 0.51,
      ndwi: 0.31, // High waterlogging
      savi: 0.46,
      evi: 0.42,
      canopyTemp: 29.1,
      soilMoisturePct: 42.5,
      lastSatellitePass: '2026-11-20T05:14:22Z',
      cloudCoverPct: 15.0
    },
    weather: {
      tMax: 32.0,
      tMin: 24.2,
      rhMorning: 94,
      rhEvening: 85,
      rainfall24h: 58.0,
      consecutiveRainyDays: 4,
      windSpeedKmh: 8.5,
      imdStation: 'Silchar Kumbhirgram (VEKU)'
    },
    primaryPest: 'Sheath Blight (Rhizoctonia solani)',
    pestRiskScore: 84,
    pestProbabilityPct: 84,
    riskTrajectory: 'RISING',
    cropHealthIndex: 46,
    grade: 'GRADE_D',
    advisory: generateAgroAdvisory('Sali Paddy (Winter Rice)', 'Sheath Blight (Rhizoctonia solani)', 'GRADE_D', 'Cachar', 'Silchar'),
    polygon: [
      [24.8435, 92.8105],
      [24.8465, 92.8110],
      [24.8468, 92.8140],
      [24.8438, 92.8135],
      [24.8435, 92.8105]
    ],
    status: 'EMERGENCY_DISPATCHED'
  },
  {
    plotId: 'ASM-DHU-BIL-740',
    dagNumber: 'Dag 290',
    pattaNumber: 'Khatian Patta 33',
    farmerName: 'Ananta Das',
    farmerPhone: '+91 98590 11456',
    district: 'Dhubri',
    block: 'Bilasipara',
    village: 'Hakama Part I',
    gramPanchayat: 'Hakama GP',
    zone: 'Lower Brahmaputra Valley',
    lat: 26.2340,
    lng: 90.2310,
    area: { bigha: 4, katha: 0, lesa: 0, sqMeters: bklToSqMeters(4, 0, 0) },
    crop: 'Boro Paddy (Summer Rice)',
    sowingDate: '2026-10-25',
    stage: 'Germination & Seedling',
    spectral: {
      ndvi: 0.65,
      ndwi: 0.25,
      savi: 0.60,
      evi: 0.55,
      canopyTemp: 28.0,
      soilMoisturePct: 35.0,
      lastSatellitePass: '2026-11-20T05:14:22Z',
      cloudCoverPct: 5.0
    },
    weather: {
      tMax: 29.5,
      tMin: 21.0,
      rhMorning: 87,
      rhEvening: 74,
      rainfall24h: 15.0,
      consecutiveRainyDays: 1,
      windSpeedKmh: 7.2,
      imdStation: 'Dhubri Riverine Station'
    },
    primaryPest: 'None (Healthy Crop)',
    pestRiskScore: 32,
    pestProbabilityPct: 32,
    riskTrajectory: 'STABLE',
    cropHealthIndex: 78,
    grade: 'GRADE_B',
    advisory: generateAgroAdvisory('Boro Paddy (Summer Rice)', 'None (Healthy Crop)', 'GRADE_B', 'Dhubri', 'Bilasipara'),
    polygon: [
      [26.2325, 90.2295],
      [26.2355, 90.2300],
      [26.2358, 90.2330],
      [26.2328, 90.2325],
      [26.2325, 90.2295]
    ],
    status: 'WATCHLIST'
  },
  {
    plotId: 'ASM-GOL-BOK-850',
    dagNumber: 'Dag 165',
    pattaNumber: 'Myadi Patta 78',
    farmerName: 'Minaram Deka',
    farmerPhone: '+91 94354 88712',
    district: 'Golaghat',
    block: 'Bokakhat',
    village: 'Mohpara Gaon',
    gramPanchayat: 'Mohpara GP',
    zone: 'Upper Brahmaputra Valley',
    lat: 26.6210,
    lng: 93.5920,
    area: { bigha: 7, katha: 2, lesa: 5, sqMeters: bklToSqMeters(7, 2, 5) },
    crop: 'Sali Paddy (Winter Rice)',
    sowingDate: '2026-07-16',
    stage: 'Flowering & Anthesis',
    spectral: {
      ndvi: 0.79,
      ndwi: 0.10,
      savi: 0.75,
      evi: 0.72,
      canopyTemp: 26.5,
      soilMoisturePct: 30.0,
      lastSatellitePass: '2026-11-20T05:14:22Z',
      cloudCoverPct: 3.0
    },
    weather: {
      tMax: 29.0,
      tMin: 19.8,
      rhMorning: 80,
      rhEvening: 65,
      rainfall24h: 0.0,
      consecutiveRainyDays: 0,
      windSpeedKmh: 5.5,
      imdStation: 'Golaghat KVK Agromet Unit'
    },
    primaryPest: 'None (Healthy Crop)',
    pestRiskScore: 15,
    pestProbabilityPct: 15,
    riskTrajectory: 'DECLINING',
    cropHealthIndex: 89,
    grade: 'GRADE_A',
    advisory: generateAgroAdvisory('Sali Paddy (Winter Rice)', 'None (Healthy Crop)', 'GRADE_A', 'Golaghat', 'Bokakhat'),
    polygon: [
      [26.6195, 93.5905],
      [26.6225, 93.5910],
      [26.6228, 93.5940],
      [26.6198, 93.5935],
      [26.6195, 93.5905]
    ],
    status: 'OPTIMAL'
  }
];

export const initialScoutingTasks: FieldScoutingTask[] = [
  {
    taskId: 'TASK-2026-01',
    plotId: 'ASM-KAM-AZR-101',
    farmerName: 'Biren Kalita',
    district: 'Kamrup Rural',
    block: 'Azara',
    village: 'Mikirpara Chakardo',
    assignedOfficer: 'Pranab Jyoti Sarma',
    officerRole: 'ADO (Agri Dev Officer)',
    targetPest: 'Rice Blast (Magnaporthe oryzae)',
    priority: 'CRITICAL',
    status: 'SCOUTING_IN_PROGRESS',
    scheduledDate: '2026-11-22',
    trapCount: 14,
    visualDefoliationPct: 22,
    scoutingNotes: 'Spindle-shaped lesions with grey center noticed across 3 bighas. High dew deposition overnight.',
    aiDiagnosticPrediction: 'Rice Blast (Magnaporthe oryzae) - Severe Stage',
    aiConfidencePct: 94.6,
    gpsVerified: true
  },
  {
    taskId: 'TASK-2026-02',
    plotId: 'ASM-NAG-RAH-204',
    farmerName: 'Deben Saikia',
    district: 'Nagaon',
    block: 'Raha',
    village: 'Phulaguri Chapari',
    assignedOfficer: 'Anuradha Goswami',
    officerRole: 'AEO (Agri Extension Officer)',
    targetPest: 'Yellow Stem Borer (Scirpophaga incertulas)',
    priority: 'HIGH',
    status: 'PENDING_VISIT',
    scheduledDate: '2026-11-23',
    trapCount: 8,
    visualDefoliationPct: 11,
    scoutingNotes: 'Satellite vegetative anomaly flagged. Scheduled for pheromone lure count and dead-heart inspection.',
    aiDiagnosticPrediction: 'Stem Borer Dead-Heart Early Manifestation',
    aiConfidencePct: 88.2,
    gpsVerified: false
  },
  {
    taskId: 'TASK-2026-03',
    plotId: 'ASM-CAC-SIL-630',
    farmerName: 'Ranjit Das',
    district: 'Cachar',
    block: 'Silchar',
    village: 'Dudpatil Part II',
    assignedOfficer: 'Subrata Roy',
    officerRole: 'KVK Scientist',
    targetPest: 'Sheath Blight (Rhizoctonia solani)',
    priority: 'CRITICAL',
    status: 'TRAP_VERIFIED',
    scheduledDate: '2026-11-21',
    trapCount: 0,
    visualDefoliationPct: 35,
    scoutingNotes: 'Snake-skin like irregular greenish-grey lesions reaching flag leaf collar. Drainage advisory issued immediately.',
    aiDiagnosticPrediction: 'Sheath Blight (Rhizoctonia solani)',
    aiConfidencePct: 96.1,
    gpsVerified: true
  },
  {
    taskId: 'TASK-2026-04',
    plotId: 'ASM-BAR-HOW-415',
    farmerName: 'Nurul Islam',
    district: 'Barpeta',
    block: 'Howly',
    village: 'Mandia Pathar',
    assignedOfficer: 'Karuna Kanta Das',
    officerRole: 'Krishi Sakhi',
    targetPest: 'Mustard Aphid (Lipaphis erysimi)',
    priority: 'MEDIUM',
    status: 'COMPLETED',
    scheduledDate: '2026-11-20',
    trapCount: 45,
    visualDefoliationPct: 15,
    scoutingNotes: 'Aphid colonies clustered on floral buds. Farmer advised on NSKE 5% spray.',
    aiDiagnosticPrediction: 'Lipaphis erysimi Colony',
    aiConfidencePct: 91.8,
    gpsVerified: true
  }
];

export const initialBroadcasts: AdvisoryBroadcast[] = [
  {
    id: 'BC-2026-901',
    title: 'Urgent Rice Blast Alert & Drainage Advisory',
    district: 'Kamrup Rural',
    block: 'Azara',
    crop: 'Sali Paddy (Winter Rice)',
    pest: 'Rice Blast (Magnaporthe oryzae)',
    broadcastChannel: 'SMS',
    recipientCount: 1420,
    status: 'DISPATCHED',
    timestamp: '2026-11-22T08:30:00Z',
    approvedBy: 'District Agricultural Officer (DAO) Kamrup',
    contentAs: 'ধানৰ পাতত ব্লাষ্ট ৰোগৰ প্ৰাথমিক লক্ষণ দেখা গৈছে। প্ৰতি বিঘাত ১৫ গ্ৰাম ট্ৰাইচাইক্লাজল ৭৫ ডব্লিউ পি ২০০ লিটাৰ পানীত মিহলাই স্প্ৰে কৰক। জমা পানী নিকাশ কৰক।',
    contentEn: 'Urgent: Rice blast symptoms detected in Azara block. Spray Tricyclazole 75% WP @ 15g/Bigha in 200L water. Drain standing water from plots.'
  },
  {
    id: 'BC-2026-902',
    title: 'Yellow Stem Borer Early Warning & Pheromone Lure Setup',
    district: 'Nagaon',
    block: 'Raha',
    crop: 'Sali Paddy (Winter Rice)',
    pest: 'Yellow Stem Borer (Scirpophaga incertulas)',
    broadcastChannel: 'WHATSAPP',
    recipientCount: 2850,
    status: 'APPROVED',
    timestamp: '2026-11-22T09:15:00Z',
    approvedBy: 'Sub-Divisional Agricultural Officer (SDAO) Raha',
    contentAs: 'মাজখোৱা পোকৰ সংক্ৰমণ ৰোধৰ বাবে প্ৰতি বিঘাত ৩ টাকৈ ফেৰোম\'ন ফান্দ পাতক। মৰা-ডিলা ১০% অতিক্ৰম কৰিলে ক্ল\'ৰেনট্ৰানিলিপ্ৰ\'ল স্প্ৰে কৰক।',
    contentEn: 'Prevent Yellow Stem Borer: Install 3 pheromone traps per Bigha. If dead-hearts exceed 10%, apply Chlorantraniliprole 18.5% SC @ 10ml/Bigha.'
  },
  {
    id: 'BC-2026-903',
    title: 'Mustard Aphid Seasonal Warning & Bio-Pesticide Advice',
    district: 'Barpeta',
    block: 'Howly',
    crop: 'Rapeseed & Mustard',
    pest: 'Mustard Aphid (Lipaphis erysimi)',
    broadcastChannel: 'COMMUNITY_RADIO',
    recipientCount: 5200,
    status: 'DISPATCHED',
    timestamp: '2026-11-21T16:00:00Z',
    approvedBy: 'DAO Barpeta & KVK Howly',
    contentAs: 'সৰিয়হ খেতিত মোৱা পোক প্ৰতিৰোধৰ বাবে নিমৰ তেল (NSKE ৫%) প্ৰতি লিটাৰ পানীত ৫ মিলিলিটাৰ মিহলাই পুৱাৰ ভাগত স্প্ৰে কৰক।',
    contentEn: 'Protect rapeseed/mustard from aphids: Spray 5% Neem Seed Kernel Extract (NSKE) @ 5ml/L during morning hours.'
  }
];

// -------------------------------------------------------------
// Drone Airframes Suited for Assam Agricultural Operations
// -------------------------------------------------------------
export const initialDroneFleet: DroneAirframe[] = [
  {
    id: 'DRONE-ASSAC-HX01',
    name: 'Assam Agro-Hexacopter V3',
    type: 'Multi-Rotor Hexacopter',
    manufacturer: 'ASSAC Tech / Garuda Aerospace',
    wingspanOrDiagonal: '1,200 mm diagonal',
    mtowKg: 15.5,
    payloadCapacityKg: 4.5,
    flightTimeMin: 28,
    maxSurveySpeedKmh: 45,
    coveragePerFlightHa: 45,
    ipRating: 'IP54 (Humid Monsoon Resistant)',
    batterySpecs: '6S 22,000 mAh LiPo Smart Battery',
    avionics: 'Cube Orange+ / Dual Redundant GNSS RTK',
    dgcaTypeCertified: true,
    status: 'READY',
    assignedDistrict: 'Kamrup Rural',
    pilotName: 'Bikash Jyoti Nath',
    pilotLicense: 'DGCA-RPL-AS-2024-884'
  },
  {
    id: 'DRONE-ASSAC-VT02',
    name: 'Brahmaputra Long-Range VTOL',
    type: 'Hybrid VTOL Fixed-Wing',
    manufacturer: 'ideaForge / ASSAC Geospatial Lab',
    wingspanOrDiagonal: '2,400 mm wingspan',
    mtowKg: 12.0,
    payloadCapacityKg: 2.5,
    flightTimeMin: 85,
    maxSurveySpeedKmh: 75,
    coveragePerFlightHa: 450,
    ipRating: 'IP54 Rain-Shedding Airframe',
    batterySpecs: 'Solid-State High Energy Density 30,000 mAh',
    avionics: 'Triple Redundant PX4 Autopilot / PPK Base Station',
    dgcaTypeCertified: true,
    status: 'IN_MISSION',
    assignedDistrict: 'Nagaon',
    pilotName: 'Dipankar Saikia',
    pilotLicense: 'DGCA-RPL-AS-2023-512'
  },
  {
    id: 'DRONE-AAU-HX03',
    name: 'AAU Jorhat Research Scout',
    type: 'Multi-Rotor Hexacopter',
    manufacturer: 'IoTechWorld / AAU Agricultural Engineering',
    wingspanOrDiagonal: '1,100 mm diagonal',
    mtowKg: 14.0,
    payloadCapacityKg: 3.5,
    flightTimeMin: 32,
    maxSurveySpeedKmh: 40,
    coveragePerFlightHa: 50,
    ipRating: 'IP54 Tropicalized',
    batterySpecs: '12S 16,000 mAh Semi-Solid Battery',
    avionics: 'Pixhawk 6X / RTK Centimeter Rover',
    dgcaTypeCertified: true,
    status: 'READY',
    assignedDistrict: 'Jorhat',
    pilotName: 'Dr. Nilav Hazarika',
    pilotLicense: 'DGCA-RPL-AS-2024-102'
  }
];

export const multispectralSensors: MultispectralSensorSpec[] = [
  {
    band: 'Coastal Blue',
    wavelengthNm: 475,
    bandwidthNm: 32,
    primaryAgronomicIndicator: 'Deep canopy penetration, chlorophyll absorption baseline',
    sensitivity: 'High radiometric calibration (98.4%)'
  },
  {
    band: 'Green Band',
    wavelengthNm: 560,
    bandwidthNm: 27,
    primaryAgronomicIndicator: 'Chlorophyll peak reflectance, canopy health & green vigor',
    sensitivity: 'Precision DLS2 sunshine normalized'
  },
  {
    band: 'Red Band',
    wavelengthNm: 668,
    bandwidthNm: 14,
    primaryAgronomicIndicator: 'Primary chlorophyll absorption, key numerator in NDVI',
    sensitivity: 'High-contrast narrow band'
  },
  {
    band: 'RedEdge Band',
    wavelengthNm: 717,
    bandwidthNm: 12,
    primaryAgronomicIndicator: 'Early plant stress & chlorosis detection 72h before human eye',
    sensitivity: 'Pre-symptomatic fungal blight indicator'
  },
  {
    band: 'Near Infrared (NIR)',
    wavelengthNm: 842,
    bandwidthNm: 57,
    primaryAgronomicIndicator: 'Leaf internal mesophyll cellular structure & biomass density',
    sensitivity: 'High reflectance in healthy paddy tillers'
  },
  {
    band: 'Long-Wave Thermal IR',
    wavelengthNm: 11000,
    bandwidthNm: 4000,
    primaryAgronomicIndicator: 'Radiometric canopy temperature, plant water stress, transpiration stomatal closure',
    sensitivity: 'Thermal resolution &plusmn;0.05&deg;C'
  }
];

export const initialDroneMissions: DroneFlightMission[] = [
  {
    missionId: 'MSN-2026-AS01',
    droneId: 'DRONE-ASSAC-HX01',
    droneName: 'Assam Agro-Hexacopter V3',
    district: 'Kamrup Rural',
    block: 'Azara / Mikirpara',
    targetPlots: 'Plot 101, 102, 104 (Sali Paddy)',
    altitudeM: 80,
    gsdCmPerPixel: 4.8,
    forwardOverlapPct: 75,
    sideOverlapPct: 70,
    scheduledDate: '2026-11-22',
    status: 'COMPLETED',
    areaSurveyedHa: 38.5,
    capturedImages: 480,
    orthomosaicTifUrl: 's3://assac-geo/orthomosaics/kamrup_azara_20261122.tif'
  },
  {
    missionId: 'MSN-2026-AS02',
    droneId: 'DRONE-ASSAC-VT02',
    droneName: 'Brahmaputra Long-Range VTOL',
    district: 'Nagaon',
    block: 'Raha / Phulaguri',
    targetPlots: 'Contiguous Sali Paddy Belt (250 Bigha)',
    altitudeM: 120,
    gsdCmPerPixel: 6.2,
    forwardOverlapPct: 80,
    sideOverlapPct: 75,
    scheduledDate: '2026-11-23',
    status: 'IN_FLIGHT',
    areaSurveyedHa: 310.0,
    capturedImages: 1240
  },
  {
    missionId: 'MSN-2026-AS03',
    droneId: 'DRONE-AAU-HX03',
    droneName: 'AAU Jorhat Research Scout',
    district: 'Jorhat',
    block: 'Titabor RARS Hub',
    targetPlots: 'Rice Variety Trial Plots (AAU)',
    altitudeM: 60,
    gsdCmPerPixel: 3.5,
    forwardOverlapPct: 80,
    sideOverlapPct: 80,
    scheduledDate: '2026-11-24',
    status: 'SCHEDULED',
    areaSurveyedHa: 22.0,
    capturedImages: 0
  }
];

export const initialPathogenRules: PathogenRule[] = [
  {
    ruleId: 'RULE-BLAST-01',
    pest: 'Rice Blast (Magnaporthe oryzae)',
    title: 'High Humidity Blast Inoculum Trigger',
    minTempC: 20,
    maxTempC: 26,
    minMorningRhPct: 88,
    minRainfallMm: 15,
    consecutiveDaysRequired: 3,
    resultingGrade: 'GRADE_D',
    enabled: true
  },
  {
    ruleId: 'RULE-STEM-02',
    pest: 'Yellow Stem Borer (Scirpophaga incertulas)',
    title: 'Post-Rainfall Larval Eclosion Trigger',
    minTempC: 28,
    maxTempC: 34,
    minMorningRhPct: 78,
    minRainfallMm: 30,
    consecutiveDaysRequired: 2,
    resultingGrade: 'GRADE_C',
    enabled: true
  },
  {
    ruleId: 'RULE-SHEATH-03',
    pest: 'Sheath Blight (Rhizoctonia solani)',
    title: 'Prolonged Standing Water & Humid Canopy',
    minTempC: 27,
    maxTempC: 35,
    minMorningRhPct: 90,
    minRainfallMm: 50,
    consecutiveDaysRequired: 4,
    resultingGrade: 'GRADE_D',
    enabled: true
  }
];

export const initialAdvisoryTemplates: AdvisoryTemplate[] = [
  {
    templateId: 'TPL-BLAST-EMERGENCY',
    category: 'FUNGAL_BLIGHT',
    title: 'Emergency Rice Blast Warning with Drainage',
    textAs: 'ধানৰ পাতত ব্লাষ্ট ৰোগৰ প্ৰাথমিক লক্ষণ দেখা গৈছে। প্ৰতি বিঘাত ১৫ গ্ৰাম ট্ৰাইচাইক্লাজল ৭৫ ডব্লিউ পি ২০০ লিটাৰ পানীত মিহলাই স্প্ৰে কৰক। জমা পানী নিকাশ কৰক।',
    textBodo: 'माइ पाथायाव ब्लास्ट बेराम जादों। बिगानि गेजेराव १५ ग्राम ट्राइसाइक्लाजोल २०० लिटर दैजों फेलेनानै स्प्रे खालाम।',
    textBn: 'ধানের পাতায় ব্লাস্ট রোগের প্রাথমিক লক্ষণ দেখা গেছে। বিঘা প্রতি ১৫ গ্রাম ট্রাইসাইক্লাজোল স্প্রে করুন এবং জমা জল বের করুন।',
    textEn: 'Urgent: Rice blast symptoms detected in {BLOCK}. Drain standing water for 48h and spray Tricyclazole 75% WP @ 15g/Bigha in 200L water.',
    author: 'AAU Jorhat Plant Pathology Dept',
    approvalStatus: 'AUTHORIZED'
  },
  {
    templateId: 'TPL-STEMBORER-IPM',
    category: 'STEM_BORER',
    title: 'Yellow Stem Borer Mass Trapping & Lures',
    textAs: 'মাজখোৱা পোকৰ সংক্ৰমণ ৰোধৰ বাবে প্ৰতি বিঘাত ৩ টাকৈ ফেৰোম\'ন ফান্দ পাতক। মৰা-ডিলা ১০% অতিক্ৰম কৰিলে ক্ল\'ৰেনট্ৰানিলিপ্ৰ\'ল স্প্ৰে কৰক।',
    textBodo: 'माय खोवा एनजौरनि थाखाय बिगानि गेजेराव ३ था फेरोमोन फान्द दोन।',
    textBn: 'মাজরা পোকার জন্য বিঘাতে ৩টি ফেরোমন ফাঁদ পাতুন। মরা-ডিলা ১০% অতিক্রম করলে ক্লোরেনট্রানিলিপ্রোল ব্যবহার করুন।',
    textEn: 'Yellow Stem Borer alert: Install 3 pheromone traps per Bigha. If dead-hearts exceed 10%, apply Chlorantraniliprole 18.5% SC @ 10ml/Bigha.',
    author: 'Directorate of Agriculture, Assam',
    approvalStatus: 'AUTHORIZED'
  }
];

export const initialPersonnel: AdminPersonnel[] = [
  {
    userId: 'USER-DAO-KAM',
    name: 'Dr. Tarun Chandra Sarma',
    designation: 'District Agricultural Officer (DAO)',
    department: 'Dept of Agriculture',
    district: 'Kamrup Rural',
    role: 'DAO (District Officer)',
    phone: '+91 94350 22104',
    email: 'dao.kamrup@assam.gov.in',
    status: 'ACTIVE'
  },
  {
    userId: 'USER-ASSAC-GIS',
    name: 'Pallabi Goswami',
    designation: 'Senior Remote Sensing Scientist',
    department: 'ASSAC (Science & Tech)',
    district: 'Statewide (HQ Khanapara)',
    role: 'ASSAC Lead Analyst',
    phone: '+91 94351 88401',
    email: 'pallabi.assac@assam.gov.in',
    status: 'ACTIVE'
  },
  {
    userId: 'USER-AAU-ENTO',
    name: 'Prof. Hemanta Kalita',
    designation: 'Principal Entomologist',
    department: 'AAU Jorhat',
    district: 'Jorhat (Upper Assam)',
    role: 'AAU Scientist',
    phone: '+91 94352 11099',
    email: 'hemanta.kalita@aau.ac.in',
    status: 'ACTIVE'
  },
  {
    userId: 'USER-ADO-AZR',
    name: 'Pranab Jyoti Sarma',
    designation: 'Agricultural Development Officer (ADO)',
    department: 'Dept of Agriculture',
    district: 'Kamrup Rural (Azara Block)',
    role: 'ADO (Agri Dev Officer)',
    phone: '+91 98540 66311',
    email: 'ado.azara@assam.gov.in',
    status: 'ON_FIELD'
  }
];

export const initialAuditLogs: SystemAuditLog[] = [
  {
    logId: 'LOG-8841',
    timestamp: '2026-11-22T08:30:15Z',
    actor: 'Dr. Tarun Chandra Sarma (DAO Kamrup)',
    action: 'DISPATCH_EMERGENCY_ADVISORY',
    module: 'ADVISORY_DISPATCH',
    details: 'Dispatched Rice Blast advisory BC-2026-901 via SMS Gateway to 1,420 farmers in Azara Block.',
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  },
  {
    logId: 'LOG-8840',
    timestamp: '2026-11-22T07:15:02Z',
    actor: 'Pallabi Goswami (ASSAC Lead Analyst)',
    action: 'INGEST_DRONE_ORTHOMOSAIC',
    module: 'DRONE_OPS',
    details: 'Processed 5cm multispectral orthomosaic for Mission MSN-2026-AS01 covering 38.5 Ha in Mikirpara Chakardo.',
    sha256Hash: 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb'
  },
  {
    logId: 'LOG-8839',
    timestamp: '2026-11-21T18:45:22Z',
    actor: 'Prof. Hemanta Kalita (AAU Jorhat)',
    action: 'UPDATE_PATHOGEN_THRESHOLD',
    module: 'EPIDEMIOLOGY_RULES',
    details: 'Calibrated Rice Blast morning humidity trigger threshold to 88% based on RARS Titabor trial results.',
    sha256Hash: '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce'
  }
];

