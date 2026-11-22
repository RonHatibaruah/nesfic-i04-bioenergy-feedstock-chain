import React, { useState } from 'react';
import { 
  Sliders, 
  Send, 
  Radio, 
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
  PhoneCall
} from 'lucide-react';
import { 
  CropHealthRecord, 
  AgroClimaticZone, 
  PestType, 
  CropCategory, 
  AdvisoryBroadcast 
} from '../types/cropHealth';
import { 
  AgroRuleEngineConfig, 
  DEFAULT_AGRO_CONFIG 
} from '../services/cropIntelligenceEngine';
import { initialBroadcasts } from '../data/mockAssamCropData';

interface AdminDashboardProps {
  records: CropHealthRecord[];
  ruleConfig: AgroRuleEngineConfig;
  onUpdateRuleConfig: (config: AgroRuleEngineConfig) => void;
  onResetRuleConfig: () => void;
}

type AdminRole = 'ASSAC_ANALYST' | 'AGRI_DAO' | 'AAU_SCIENTIST' | 'SUPER_ADMIN';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  records,
  ruleConfig,
  onUpdateRuleConfig,
  onResetRuleConfig
}) => {
  const [activeRole, setActiveRole] = useState<AdminRole>('AGRI_DAO');
  const [broadcasts, setBroadcasts] = useState<AdvisoryBroadcast[]>(initialBroadcasts);
  
  // New Broadcast Form State
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastDistrict, setBroadcastDistrict] = useState('Kamrup Rural');
  const [broadcastBlock, setBroadcastBlock] = useState('Azara');
  const [broadcastCrop, setBroadcastCrop] = useState<CropCategory>('Sali Paddy (Winter Rice)');
  const [broadcastPest, setBroadcastPest] = useState<PestType>('Rice Blast (Magnaporthe oryzae)');
  const [broadcastChannel, setBroadcastChannel] = useState<'SMS' | 'WHATSAPP' | 'IVRS_VOICE'>('SMS');
  const [broadcastContentAs, setBroadcastContentAs] = useState('');
  const [broadcastContentEn, setBroadcastContentEn] = useState('');
  const [isDispatchedSuccess, setIsDispatchedSuccess] = useState(false);

  // Pipeline telemetry sync simulation
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('Today at 05:14 IST');

  const handleTriggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST');
    }, 1500);
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
    setTimeout(() => setIsDispatchedSuccess(false), 4000);
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
      {/* Admin Header with Role Selector */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-700 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sliders className="w-6 h-6 text-amber-400" />
                SasyaSwasthya Agro-Command & Admin Console
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Multi-tier governance, remote sensing pipeline calibration, and geo-fenced advisory dispatch engine
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Telemetry (CSV)</span>
            </button>

            <button
              onClick={handleTriggerSync}
              disabled={isSyncing}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all shadow-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing Pipeline...' : 'Sync Satellite Data'}</span>
            </button>
          </div>
        </div>

        {/* Role Tabs */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="text-slate-400 self-center mr-1 text-[11px] font-semibold uppercase">Admin Role:</span>
          
          <button
            onClick={() => setActiveRole('AGRI_DAO')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              activeRole === 'AGRI_DAO'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>District Agricultural Officer (DAO / ADO)</span>
          </button>

          <button
            onClick={() => setActiveRole('ASSAC_ANALYST')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              activeRole === 'ASSAC_ANALYST'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Satellite className="w-3.5 h-3.5" />
            <span>ASSAC Remote Sensing Analyst</span>
          </button>

          <button
            onClick={() => setActiveRole('AAU_SCIENTIST')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              activeRole === 'AAU_SCIENTIST'
                ? 'bg-sky-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>AAU Plant Epidemiologist</span>
          </button>

          <button
            onClick={() => setActiveRole('SUPER_ADMIN')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              activeRole === 'SUPER_ADMIN'
                ? 'bg-purple-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>System & Security Administrator</span>
          </button>
        </div>
      </div>

      {/* Role 1: DAO / ADO View - Outbreak Broadcast & Field Team Tracking */}
      {activeRole === 'AGRI_DAO' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Outbreak Broadcast Composer (2 Cols) */}
            <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <Radio className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">Emergency Outbreak Advisory Dispatcher</h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">Geo-Fenced Gateway</span>
              </div>

              {isDispatchedSuccess && (
                <div className="mt-3 p-3 bg-emerald-950 border border-emerald-700 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Advisory Bulletin Dispatched Successfully via SMS/WhatsApp Gateway!</span>
                </div>
              )}

              <form onSubmit={handleCreateBroadcast} className="mt-4 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Target District</label>
                    <select
                      value={broadcastDistrict}
                      onChange={(e) => setBroadcastDistrict(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white"
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
                    <label className="block text-slate-300 font-medium mb-1">Target Block / Panchayat</label>
                    <input
                      type="text"
                      value={broadcastBlock}
                      onChange={(e) => setBroadcastBlock(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Target Crop</label>
                    <select
                      value={broadcastCrop}
                      onChange={(e) => setBroadcastCrop(e.target.value as CropCategory)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="Sali Paddy (Winter Rice)">Sali Paddy (Winter Rice)</option>
                      <option value="Boro Paddy (Summer Rice)">Boro Paddy (Summer Rice)</option>
                      <option value="Rapeseed & Mustard">Rapeseed & Mustard</option>
                      <option value="Jute">Jute</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Pathogen / Pest Alert</label>
                    <select
                      value={broadcastPest}
                      onChange={(e) => setBroadcastPest(e.target.value as PestType)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="Rice Blast (Magnaporthe oryzae)">Rice Blast (Magnaporthe oryzae)</option>
                      <option value="Yellow Stem Borer (Scirpophaga incertulas)">Yellow Stem Borer</option>
                      <option value="Sheath Blight (Rhizoctonia solani)">Sheath Blight</option>
                      <option value="Mustard Aphid (Lipaphis erysimi)">Mustard Aphid</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Advisory Headline / Bulletin Title</label>
                  <input
                    type="text"
                    required
                    value={broadcastTitle}
                    onChange={(e) => setBroadcastTitle(e.target.value)}
                    placeholder="e.g., Immediate Rice Blast Outbreak Alert & Water Drainage Instruction"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Assamese Advisory (অসমীয়া নিৰ্দেশনা)</label>
                    <textarea
                      rows={3}
                      value={broadcastContentAs}
                      onChange={(e) => setBroadcastContentAs(e.target.value)}
                      placeholder="ধানৰ পাতত ব্লাষ্ট ৰোগৰ প্ৰাথমিক লক্ষণ দেখা গৈছে। প্ৰতি বিঘাত ১৫ গ্ৰাম ট্ৰাইচাইক্লাজল ৭৫ ডব্লিউ পি স্প্ৰে কৰক..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">English Advisory</label>
                    <textarea
                      rows={3}
                      value={broadcastContentEn}
                      onChange={(e) => setBroadcastContentEn(e.target.value)}
                      placeholder="Symptoms of Rice Blast detected. Apply Tricyclazole 75% WP @ 15g/Bigha and drain standing water..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-medium">Broadcast Channel:</span>
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        checked={broadcastChannel === 'SMS'}
                        onChange={() => setBroadcastChannel('SMS')}
                        className="text-amber-500"
                      />
                      <span>SMS Gateway</span>
                    </label>
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        checked={broadcastChannel === 'WHATSAPP'}
                        onChange={() => setBroadcastChannel('WHATSAPP')}
                        className="text-emerald-500"
                      />
                      <span>WhatsApp Cloud API</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Authorize & Dispatch</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Recent Broadcast Log (1 Col) */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-lg flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider pb-2 border-b border-slate-700 flex items-center justify-between">
                  <span>Dispatched Bulletins</span>
                  <span className="text-emerald-400">{broadcasts.length} Active</span>
                </h4>

                <div className="mt-3 space-y-3 max-h-[400px] overflow-y-auto">
                  {broadcasts.map(b => (
                    <div key={b.id} className="bg-slate-900/80 p-3 rounded-lg border border-slate-700/60 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{b.title}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">
                          {b.broadcastChannel}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        {b.block}, {b.district} • {b.recipientCount} Farmers
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1 font-mono">
                        Authorized: {b.approvedBy}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Integrated with PM-KISAN / State Farmer DB</span>
                <span className="text-emerald-400 font-medium">99.4% Delivery</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role 2: ASSAC Remote Sensing Analyst View */}
      {activeRole === 'ASSAC_ANALYST' && (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Satellite className="w-5 h-5 text-emerald-400" />
                ASSAC Space-to-Ground Ingestion & Spectral Calibration
              </h3>
              <p className="text-xs text-slate-400">
                Configure Sentinel-2 multispectral thresholds, UAV drone orthomosaic ingestion, and cloud masking parameters
              </p>
            </div>
            <div className="text-right text-xs">
              <span className="text-slate-400">Last Telemetry Ingestion: </span>
              <span className="text-emerald-400 font-mono font-semibold">{lastSyncTime}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {/* NDVI Threshold */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700">
              <div className="flex justify-between font-semibold text-slate-200">
                <span>NDVI Canopy Vigor Threshold</span>
                <span className="text-emerald-400 font-mono font-bold">{ruleConfig.ndviVigorThreshold}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Parcels with NDVI lower than this value trigger automatic chlorosis stress alerts.
              </p>
              <input
                type="range"
                min="0.40"
                max="0.80"
                step="0.05"
                value={ruleConfig.ndviVigorThreshold}
                onChange={(e) => onUpdateRuleConfig({ ...ruleConfig, ndviVigorThreshold: parseFloat(e.target.value) })}
                className="w-full mt-3 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>0.40 (Lax)</span>
                <span>Default: 0.65</span>
                <span>0.80 (Strict)</span>
              </div>
            </div>

            {/* NDWI Water Stress Threshold */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700">
              <div className="flex justify-between font-semibold text-slate-200">
                <span>NDWI Water Deficit Threshold</span>
                <span className="text-sky-400 font-mono font-bold">{ruleConfig.ndwiWaterStressThreshold}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Flags agricultural plots experiencing moisture stress or potential root drying.
              </p>
              <input
                type="range"
                min="-0.30"
                max="0.00"
                step="0.05"
                value={ruleConfig.ndwiWaterStressThreshold}
                onChange={(e) => onUpdateRuleConfig({ ...ruleConfig, ndwiWaterStressThreshold: parseFloat(e.target.value) })}
                className="w-full mt-3 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>-0.30</span>
                <span>Default: -0.15</span>
                <span>0.00</span>
              </div>
            </div>

            {/* Cloud Cover Tolerance */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700">
              <div className="flex justify-between font-semibold text-slate-200">
                <span>UAV Drone Sync Frequency</span>
                <span className="text-indigo-400 font-mono font-bold">5-Day Cadence</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Automated ortho-mosaic stitching frequency for priority agricultural revenue circles.
              </p>
              <div className="mt-3 flex items-center justify-between bg-slate-800 p-2 rounded-lg border border-slate-700">
                <span className="text-slate-300">Auto-Cloud Masking</span>
                <span className="text-emerald-400 font-bold">Enabled (SCL Band)</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={onResetRuleConfig}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-semibold rounded-lg transition-colors"
            >
              Reset to ASSAC Scientific Defaults
            </button>
          </div>
        </div>
      )}

      {/* Role 3: AAU Plant Epidemiologist View */}
      {activeRole === 'AAU_SCIENTIST' && (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-sky-400" />
                Assam Agricultural University (AAU) Disease Modeling Parameters
              </h3>
              <p className="text-xs text-slate-400">
                Epidemiological incubation models for Rice Blast, Yellow Stem Borer, and Sheath Blight
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Blast Relative Humidity Trigger */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700">
              <div className="flex justify-between font-semibold text-slate-200">
                <span>Rice Blast Morning Humidity Trigger</span>
                <span className="text-amber-400 font-mono font-bold">{ruleConfig.blastHumidityTriggerPct}% RH</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Relative humidity exceeding this value for &gt;8 hours triggers fungal spore germination alert.
              </p>
              <input
                type="range"
                min="80"
                max="95"
                step="1"
                value={ruleConfig.blastHumidityTriggerPct}
                onChange={(e) => onUpdateRuleConfig({ ...ruleConfig, blastHumidityTriggerPct: parseInt(e.target.value) })}
                className="w-full mt-3 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>80%</span>
                <span>AAU Standard: 88%</span>
                <span>95%</span>
              </div>
            </div>

            {/* Stem Borer Degree-Day Rain Parameter */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700">
              <div className="flex justify-between font-semibold text-slate-200">
                <span>Yellow Stem Borer Rain Induction</span>
                <span className="text-rose-400 font-mono font-bold">{ruleConfig.stemBorerRainTriggerMm} mm</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                24-hour rainfall threshold triggering adult moth emergence in Sali paddy.
              </p>
              <input
                type="range"
                min="20"
                max="60"
                step="5"
                value={ruleConfig.stemBorerRainTriggerMm}
                onChange={(e) => onUpdateRuleConfig({ ...ruleConfig, stemBorerRainTriggerMm: parseInt(e.target.value) })}
                className="w-full mt-3 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>20 mm</span>
                <span>Default: 35 mm</span>
                <span>60 mm</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role 4: Super Admin & System Security */}
      {activeRole === 'SUPER_ADMIN' && (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-purple-400" />
              State Data Centre (ASDC) Infrastructure & Gateways
            </h3>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">
              All Systems Operational
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700">
              <div className="text-slate-400">ASSAC GeoServer (WMS/WFS)</div>
              <div className="text-emerald-400 font-bold mt-1">Connected (4ms latency)</div>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700">
              <div className="text-slate-400">IMD Agromet Data API</div>
              <div className="text-emerald-400 font-bold mt-1">Connected (35 Stations)</div>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700">
              <div className="text-slate-400">NIC SMS & WhatsApp Gateway</div>
              <div className="text-emerald-400 font-bold mt-1">Active (99.8% SLA)</div>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700">
              <div className="text-slate-400">Cryptographic Audit Ledger</div>
              <div className="text-emerald-400 font-bold mt-1">SHA-256 Immutable</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
