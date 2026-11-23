import React, { useState } from 'react';
import { 
  Sliders, 
  Send, 
  Radio, 
  Plane, 
  Satellite, 
  ShieldCheck, 
  Database, 
  Users, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  FileText, 
  RefreshCw, 
  Server,
  Layers,
  Sparkles,
  PhoneCall,
  Clock,
  Compass,
  FileCode,
  Key,
  Lock,
  Plus,
  Play
} from 'lucide-react';
import { 
  CropHealthRecord, 
  PestType, 
  CropCategory, 
  AdvisoryBroadcast,
  DroneAirframe,
  DroneFlightMission,
  PathogenRule,
  AdvisoryTemplate,
  AdminPersonnel,
  SystemAuditLog
} from '../types/cropHealth';
import { 
  AgroRuleEngineConfig, 
  DEFAULT_AGRO_CONFIG 
} from '../services/cropIntelligenceEngine';
import { 
  initialBroadcasts, 
  initialDroneFleet, 
  initialDroneMissions,
  initialPathogenRules,
  initialAdvisoryTemplates,
  initialPersonnel,
  initialAuditLogs
} from '../data/mockAssamCropData';

interface AdminDashboardProps {
  records: CropHealthRecord[];
  ruleConfig: AgroRuleEngineConfig;
  onUpdateRuleConfig: (config: AgroRuleEngineConfig) => void;
  onResetRuleConfig: () => void;
}

type AdminFeatureTab = 
  | 'OUTBREAK_DISPATCH'
  | 'DRONE_OPS'
  | 'EPIDEMIOLOGY_RULES'
  | 'TEMPLATES'
  | 'RBAC_USERS'
  | 'TELEMETRY_ANALYTICS'
  | 'AUDIT_LEDGER'
  | 'ASSAC_CALIBRATION';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  records,
  ruleConfig,
  onUpdateRuleConfig,
  onResetRuleConfig
}) => {
  const [activeTab, setActiveTab] = useState<AdminFeatureTab>('OUTBREAK_DISPATCH');
  const [broadcasts, setBroadcasts] = useState<AdvisoryBroadcast[]>(initialBroadcasts);
  const [droneFleet, setDroneFleet] = useState<DroneAirframe[]>(initialDroneFleet);
  const [missions, setMissions] = useState<DroneFlightMission[]>(initialDroneMissions);
  const [rules, setRules] = useState<PathogenRule[]>(initialPathogenRules);
  const [templates, setTemplates] = useState<AdvisoryTemplate[]>(initialAdvisoryTemplates);
  const [personnel, setPersonnel] = useState<AdminPersonnel[]>(initialPersonnel);
  const [auditLogs, setAuditLogs] = useState<SystemAuditLog[]>(initialAuditLogs);
  
  // New Broadcast Form State
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastDistrict, setBroadcastDistrict] = useState('Kamrup Rural');
  const [broadcastBlock, setBroadcastBlock] = useState('Azara');
  const [broadcastCrop, setBroadcastCrop] = useState<CropCategory>('Sali Paddy Straw (Winter Residue)');
  const [broadcastPest, setBroadcastPest] = useState<PestType>('Exothermic Self-Heating & Spontaneous Fire');
  const [broadcastChannel, setBroadcastChannel] = useState<'SMS' | 'WHATSAPP' | 'IVRS_VOICE'>('SMS');
  const [broadcastContentAs, setBroadcastContentAs] = useState('');
  const [broadcastContentEn, setBroadcastContentEn] = useState('');
  const [isDispatchedSuccess, setIsDispatchedSuccess] = useState(false);

  // New Mission Dispatcher State
  const [missionDroneId, setMissionDroneId] = useState('DRONE-ASSAC-HX01');
  const [missionDistrict, setMissionDistrict] = useState('Kamrup Rural');
  const [missionBlock, setMissionBlock] = useState('Rani / Azara');
  const [missionAltitude, setMissionAltitude] = useState(80);
  const [isMissionScheduled, setIsMissionScheduled] = useState(false);

  // Pipeline telemetry sync simulation
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('Today at 05:14 IST');

  const handleTriggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST');
      
      const newLog: SystemAuditLog = {
        logId: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString(),
        actor: 'ASSAC Lead Analyst',
        action: 'MANUAL_PIPELINE_SYNC',
        module: 'DRONE_OPS',
        details: 'Manually synchronized Sentinel-2 and UAV drone telemetry feeds.',
        sha256Hash: 'a71b4c93ef841b8a95632d4b18c5e93f77102837492cba18d9f0019283746192'
      };
      setAuditLogs([newLog, ...auditLogs]);
    }, 1200);
  };

  const handleCreateBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle) return;

    const newBroadcast: AdvisoryBroadcast = {
      id: `BC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      title: broadcastTitle,
      district: broadcastDistrict,
      block: broadcastBlock,
      crop: broadcastCrop,
      pest: broadcastPest,
      broadcastChannel,
      recipientCount: 1850 + Math.floor(Math.random() * 2000),
      status: 'DISPATCHED',
      timestamp: new Date().toISOString(),
      approvedBy: 'District Agricultural Officer (DAO) ' + broadcastDistrict,
      contentAs: broadcastContentAs || 'ধানৰ পাতত ব্লাষ্ট ৰোগৰ সতৰ্কবাণী: প্ৰতি বিঘাত ১৫ গ্ৰাম ট্ৰাইচাইক্লাজল স্প্ৰে কৰক।',
      contentEn: broadcastContentEn || 'Rice blast early warning: Apply recommended fungicide as per package of practices.'
    };

    setBroadcasts([newBroadcast, ...broadcasts]);
    setIsDispatchedSuccess(true);
    setBroadcastTitle('');
    setBroadcastContentAs('');
    setBroadcastContentEn('');

    const newLog: SystemAuditLog = {
      logId: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      actor: `DAO (${broadcastDistrict})`,
      action: 'DISPATCH_EMERGENCY_ADVISORY',
      module: 'ADVISORY_DISPATCH',
      details: `Dispatched bulletin ${newBroadcast.id} (${broadcastTitle}) to ${newBroadcast.recipientCount} farmers.`,
      sha256Hash: '9b83726410293847561827364519283746192837465192837461928374619283'
    };
    setAuditLogs([newLog, ...auditLogs]);

    setTimeout(() => setIsDispatchedSuccess(false), 4000);
  };

  const handleScheduleMission = (e: React.FormEvent) => {
    e.preventDefault();
    const drone = droneFleet.find(d => d.id === missionDroneId);
    const newMission: DroneFlightMission = {
      missionId: `MSN-2026-AS0${missions.length + 1}`,
      droneId: missionDroneId,
      droneName: drone?.name || 'Assam Agro Drone',
      district: missionDistrict,
      block: missionBlock,
      targetPlots: 'High-Risk Farm Clusters (GPS Locked)',
      altitudeM: missionAltitude,
      gsdCmPerPixel: Number((missionAltitude * 0.05).toFixed(1)),
      forwardOverlapPct: 80,
      sideOverlapPct: 75,
      scheduledDate: new Date().toISOString().split('T')[0],
      status: 'SCHEDULED',
      areaSurveyedHa: missionAltitude > 100 ? 250 : 45,
      capturedImages: 0
    };

    setMissions([newMission, ...missions]);
    setIsMissionScheduled(true);
    setTimeout(() => setIsMissionScheduled(false), 3500);
  };

  const handleExportCSV = () => {
    const headers = ['PlotID', 'Farmer', 'District', 'Block', 'Crop', 'NDVI', 'NDWI', 'Pest', 'RiskScore', 'Grade'];
    const rows = records.map(r => [
      r.plotId,
      `"${r.farmerName}"`,
      r.district,
      r.block,
      `"${r.crop}"`,
      r.spectral.ndvi,
      r.spectral.ndwi,
      `"${r.primaryPest}"`,
      r.pestRiskScore,
      r.grade
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Assam_Crop_Health_Audit_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Admin Header with White Card Design */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Sliders className="w-6 h-6 text-emerald-700" />
                Agro-Command & Enterprise Administration Console
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Multi-role governance suite for Drone Fleet Operations, Pathogen Rules, Advisory Templates, and Cryptographic Audit
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors border border-slate-200"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleTriggerSync}
              disabled={isSyncing}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all shadow-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Telemetry'}</span>
            </button>
          </div>
        </div>

        {/* Feature Tabs in White Theme */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('OUTBREAK_DISPATCH')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'OUTBREAK_DISPATCH'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Advisory Dispatcher</span>
          </button>

          <button
            onClick={() => setActiveTab('DRONE_OPS')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'DRONE_OPS'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Plane className="w-3.5 h-3.5" />
            <span>Drone Fleet & Missions</span>
          </button>

          <button
            onClick={() => setActiveTab('EPIDEMIOLOGY_RULES')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'EPIDEMIOLOGY_RULES'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Pathogen Rule Builder</span>
          </button>

          <button
            onClick={() => setActiveTab('TEMPLATES')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'TEMPLATES'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Multilingual Templates</span>
          </button>

          <button
            onClick={() => setActiveTab('RBAC_USERS')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'RBAC_USERS'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Personnel & Roles</span>
          </button>

          <button
            onClick={() => setActiveTab('TELEMETRY_ANALYTICS')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'TELEMETRY_ANALYTICS'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Broadcast Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('AUDIT_LEDGER')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'AUDIT_LEDGER'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Audit Ledger</span>
          </button>

          <button
            onClick={() => setActiveTab('ASSAC_CALIBRATION')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'ASSAC_CALIBRATION'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Satellite className="w-3.5 h-3.5" />
            <span>ASSAC Spectral Tuning</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Outbreak Advisory Dispatcher */}
      {activeTab === 'OUTBREAK_DISPATCH' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Radio className="w-5 h-5 text-amber-600" />
                <span>Emergency Outbreak Advisory Dispatcher</span>
              </h3>
              <span className="text-xs text-slate-500 font-mono">NIC SMS & WhatsApp API</span>
            </div>

            {isDispatchedSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Advisory Bulletin Dispatched Successfully to Target Farmers!</span>
              </div>
            )}

            <form onSubmit={handleCreateBroadcast} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Target District</label>
                  <select
                    value={broadcastDistrict}
                    onChange={(e) => setBroadcastDistrict(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Kamrup Rural">Kamrup Rural</option>
                    <option value="Nagaon">Nagaon</option>
                    <option value="Jorhat">Jorhat</option>
                    <option value="Barpeta">Barpeta</option>
                    <option value="Sonitpur">Sonitpur</option>
                    <option value="Cachar">Cachar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Target Block / Panchayat</label>
                  <input
                    type="text"
                    value={broadcastBlock}
                    onChange={(e) => setBroadcastBlock(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Target Crop</label>
                  <select
                    value={broadcastCrop}
                    onChange={(e) => setBroadcastCrop(e.target.value as CropCategory)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Sali Paddy (Winter Rice)">Sali Paddy (Winter Rice)</option>
                    <option value="Boro Paddy (Summer Rice)">Boro Paddy (Summer Rice)</option>
                    <option value="Rapeseed & Mustard">Rapeseed & Mustard</option>
                    <option value="Jute">Jute</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Pathogen / Pest Alert</label>
                  <select
                    value={broadcastPest}
                    onChange={(e) => setBroadcastPest(e.target.value as PestType)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Rice Blast (Magnaporthe oryzae)">Rice Blast (Magnaporthe oryzae)</option>
                    <option value="Yellow Stem Borer (Scirpophaga incertulas)">Yellow Stem Borer</option>
                    <option value="Sheath Blight (Rhizoctonia solani)">Sheath Blight</option>
                    <option value="Mustard Aphid (Lipaphis erysimi)">Mustard Aphid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Bulletin Headline</label>
                <input
                  type="text"
                  required
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  placeholder="e.g. Immediate Rice Blast Outbreak Alert & Water Drainage Instruction"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Assamese Directive (অসমীয়া নিৰ্দেশনা)</label>
                  <textarea
                    rows={3}
                    value={broadcastContentAs}
                    onChange={(e) => setBroadcastContentAs(e.target.value)}
                    placeholder="ধানৰ পাতত ব্লাষ্ট ৰোগৰ প্ৰাথমিক লক্ষণ দেখা গৈছে। প্ৰতি বিঘাত ১৫ গ্ৰাম ট্ৰাইচাইক্লাজল স্প্ৰে কৰক..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">English Directive</label>
                  <textarea
                    rows={3}
                    value={broadcastContentEn}
                    onChange={(e) => setBroadcastContentEn(e.target.value)}
                    placeholder="Rice blast alert: Drain water from plots and spray Tricyclazole 75% WP @ 15g/Bigha..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 gap-3">
                <div className="flex items-center gap-4 text-slate-700">
                  <span className="font-semibold">Channel:</span>
                  <label className="inline-flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      checked={broadcastChannel === 'SMS'}
                      onChange={() => setBroadcastChannel('SMS')}
                      className="text-emerald-600"
                    />
                    <span>National SMS</span>
                  </label>
                  <label className="inline-flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      checked={broadcastChannel === 'WHATSAPP'}
                      onChange={() => setBroadcastChannel('WHATSAPP')}
                      className="text-emerald-600"
                    />
                    <span>WhatsApp Cloud</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Authorize & Broadcast</span>
                </button>
              </div>
            </form>
          </div>

          {/* Recent Dispatches */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-200 flex items-center justify-between">
                <span>Active Dispatches</span>
                <span className="text-emerald-700 font-mono">{broadcasts.length} Issued</span>
              </h4>

              <div className="mt-3 space-y-3 max-h-[460px] overflow-y-auto">
                {broadcasts.map(b => (
                  <div key={b.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{b.title}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-mono font-bold">
                        {b.broadcastChannel}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600">
                      {b.block}, {b.district} • {b.recipientCount} Farmers
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      Auth: {b.approvedBy}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Drone Fleet & Mission Operations */}
      {activeTab === 'DRONE_OPS' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Mission Scheduler Form */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Plane className="w-5 h-5 text-emerald-600" />
                <span>Schedule UAV Flight Mission</span>
              </h3>

              {isMissionScheduled && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Flight Mission Scheduled & Dispatched to GCS!</span>
                </div>
              )}

              <form onSubmit={handleScheduleMission} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Select Drone Airframe</label>
                  <select
                    value={missionDroneId}
                    onChange={(e) => setMissionDroneId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                  >
                    {droneFleet.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({d.type})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">District</label>
                    <select
                      value={missionDistrict}
                      onChange={(e) => setMissionDistrict(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                    >
                      <option value="Kamrup Rural">Kamrup Rural</option>
                      <option value="Nagaon">Nagaon</option>
                      <option value="Jorhat">Jorhat</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Target Block</label>
                    <input
                      type="text"
                      value={missionBlock}
                      onChange={(e) => setMissionBlock(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Survey Altitude (m AGL)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="50"
                      max="120"
                      step="10"
                      value={missionAltitude}
                      onChange={(e) => setMissionAltitude(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                    <span className="font-mono font-bold text-slate-900">{missionAltitude}m</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>50m (2.5cm/px)</span>
                    <span>120m DGCA Max (6cm/px)</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-3 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Play className="w-4 h-4" />
                  <span>Launch Mission & Push Waypoints</span>
                </button>
              </form>
            </div>

            {/* Live Missions & Fleet Status Table (2 Cols) */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-600" />
                  <span>Active Drone Survey Missions</span>
                </h3>
                <span className="text-xs text-slate-500 font-mono">{missions.length} Registered</span>
              </div>

              <div className="space-y-3">
                {missions.map(m => (
                  <div key={m.missionId} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-emerald-800">{m.missionId}</span>
                        <span className="font-semibold text-slate-900">{m.droneName}</span>
                      </div>
                      <div className="text-slate-600 mt-0.5">{m.block}, {m.district} • {m.targetPlots}</div>
                      <div className="text-slate-500 font-mono text-[11px] mt-1">
                        Altitude: {m.altitudeM}m • GSD: {m.gsdCmPerPixel} cm/px • Area: {m.areaSurveyedHa} Ha
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                        m.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' :
                        m.status === 'IN_FLIGHT' ? 'bg-sky-100 text-sky-800 animate-pulse' :
                        'bg-slate-200 text-slate-700'
                      }`}>
                        {m.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Pathogen Rule Builder */}
      {activeTab === 'EPIDEMIOLOGY_RULES' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-sky-600" />
                <span>Epidemiological Outbreak Prediction Rules Builder</span>
              </h3>
              <p className="text-xs text-slate-500">
                Calibrate biological threshold equations parameterizing Rice Blast, Stem Borer, and Sheath Blight
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {rules.map(r => (
              <div key={r.ruleId} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sky-800 text-[11px]">{r.ruleId}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                    {r.resultingGrade}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900">{r.title}</h4>
                <div className="text-slate-600 text-[11px]">{r.pest}</div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200 text-[11px] text-slate-700 font-mono">
                  <div>Min Morning RH: <strong>{r.minMorningRhPct}%</strong></div>
                  <div>Temp Range: <strong>{r.minTempC}&deg;C - {r.maxTempC}&deg;C</strong></div>
                  <div>Rainfall Min: <strong>{r.minRainfallMm} mm</strong></div>
                  <div>Consecutive Days: <strong>{r.consecutiveDaysRequired} days</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Multilingual Advisory Templates */}
      {activeTab === 'TEMPLATES' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileCode className="w-5 h-5 text-purple-600" />
                <span>Pre-Approved Multilingual Advisory Template Repository</span>
              </h3>
              <p className="text-xs text-slate-500">
                Managed templates across Assamese (*অসমীয়া*), Bodo (*बर'*), Bengali (*বাংলা*), and English
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {templates.map(tpl => (
              <div key={tpl.templateId} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-purple-800">{tpl.templateId}</span>
                    <span className="font-bold text-slate-900">{tpl.title}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {tpl.approvalStatus}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-emerald-700 font-bold block mb-0.5">অসমীয়া (Assamese)</span>
                    <p className="text-slate-800">{tpl.textAs}</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-purple-700 font-bold block mb-0.5">English</span>
                    <p className="text-slate-800">{tpl.textEn}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Personnel & RBAC Users */}
      {activeTab === 'RBAC_USERS' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <span>State Agricultural Personnel & Role-Based Access Control</span>
              </h3>
              <p className="text-xs text-slate-500">
                Authorized officers across Directorate of Agriculture, ASSAC, and AAU Jorhat
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Officer Name</th>
                  <th className="py-3 px-3">Designation & Role</th>
                  <th className="py-3 px-3">Department</th>
                  <th className="py-3 px-3">Jurisdiction</th>
                  <th className="py-3 px-3">Contact</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                {personnel.map(p => (
                  <tr key={p.userId} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{p.name}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 font-medium">
                        {p.role}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600">{p.department}</td>
                    <td className="py-3 px-3">{p.district}</td>
                    <td className="py-3 px-3 font-mono text-[11px]">{p.phone}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' :
                        p.status === 'ON_FIELD' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: Multi-Channel Broadcast Telemetry Analytics */}
      {activeTab === 'TELEMETRY_ANALYTICS' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold">NIC SMS Gateway</span>
              <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">99.4%</div>
              <p className="text-[11px] text-slate-500 mt-1">42,850 SMS delivered in last 30 days</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold">WhatsApp Cloud API</span>
              <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">94.8% Read</div>
              <p className="text-[11px] text-slate-500 mt-1">18,200 interactive bulletins read</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold">IVRS Voice Broadcasts</span>
              <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">87.2% Completed</div>
              <p className="text-[11px] text-slate-500 mt-1">Automated Assamese voice calls</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: Cryptographic Audit Ledger */}
      {activeTab === 'AUDIT_LEDGER' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-slate-700" />
                <span>Immutable Cryptographic System Audit Ledger</span>
              </h3>
              <p className="text-xs text-slate-500">
                SHA-256 tamper-evident record of all advisory dispatches, threshold adjustments, and drone sorties
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {auditLogs.map(log => (
              <div key={log.logId} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900">{log.logId}</span>
                    <span className="font-semibold text-slate-800">{log.actor}</span>
                    <span className="text-slate-400">&bull;</span>
                    <span className="text-slate-500 font-mono text-[11px]">{new Date(log.timestamp).toLocaleString('en-IN')}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-800 font-mono">
                    {log.module}
                  </span>
                </div>
                <p className="text-slate-700">{log.details}</p>
                <div className="font-mono text-[10px] text-slate-500 pt-1 border-t border-slate-200/80">
                  Hash: {log.sha256Hash}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: ASSAC Spectral Tuning */}
      {activeTab === 'ASSAC_CALIBRATION' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Satellite className="w-5 h-5 text-emerald-800" />
                <span>ASSAC Remote Sensing & Spectral Index Calibration</span>
              </h3>
              <p className="text-xs text-slate-500">
                Fine-tune multispectral NDVI, NDWI, and cloud tolerance coefficients
              </p>
            </div>
            <button
              onClick={onResetRuleConfig}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200"
            >
              Reset to ASSAC Defaults
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between font-semibold text-slate-900">
                <span>NDVI Canopy Vigor Alert Threshold</span>
                <span className="font-mono font-bold text-emerald-700">{ruleConfig.ndviVigorThreshold}</span>
              </div>
              <input
                type="range"
                min="0.40"
                max="0.80"
                step="0.05"
                value={ruleConfig.ndviVigorThreshold}
                onChange={(e) => onUpdateRuleConfig({ ...ruleConfig, ndviVigorThreshold: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0.40 (Lax)</span>
                <span>Default: 0.65</span>
                <span>0.80 (Strict)</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between font-semibold text-slate-900">
                <span>NDWI Water Stress Threshold</span>
                <span className="font-mono font-bold text-sky-700">{ruleConfig.ndwiWaterStressThreshold}</span>
              </div>
              <input
                type="range"
                min="-0.30"
                max="0.00"
                step="0.05"
                value={ruleConfig.ndwiWaterStressThreshold}
                onChange={(e) => onUpdateRuleConfig({ ...ruleConfig, ndwiWaterStressThreshold: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>-0.30</span>
                <span>Default: -0.15</span>
                <span>0.00</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
