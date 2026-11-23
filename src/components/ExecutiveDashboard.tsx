import React, { useState } from 'react';
import { 
  Flame, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  CloudRain, 
  Eye, 
  Send, 
  MapPin, 
  ShieldAlert, 
  Layers,
  Recycle,
  Factory
} from 'lucide-react';
import { FeedstockDepotRecord, HealthGrade } from '../types/cropHealth';

interface ExecutiveDashboardProps {
  records: FeedstockDepotRecord[];
  onSelectRecord: (record: FeedstockDepotRecord) => void;
  onDispatchScouting: (record: FeedstockDepotRecord) => void;
  selectedDistrict: string;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  records,
  onSelectRecord,
  onDispatchScouting,
  selectedDistrict
}) => {
  const [gradeFilter, setGradeFilter] = useState<HealthGrade | 'ALL'>('ALL');
  const [cropFilter, setCropFilter] = useState<string>('ALL');

  // Filtered dataset
  const filtered = records.filter(r => {
    if (gradeFilter !== 'ALL' && r.grade !== gradeFilter) return false;
    if (cropFilter !== 'ALL' && !r.crop.includes(cropFilter)) return false;
    return true;
  });

  // Calculate high-level metrics
  const totalTonnage = records.reduce((sum, r) => sum + (r.tonnage || 0), 0);
  const avgHealthIndex = Math.round(records.reduce((sum, r) => sum + r.cropHealthIndex, 0) / (records.length || 1));
  const criticalCount = records.filter(r => r.grade === 'GRADE_D').length;
  const watchlistCount = records.filter(r => r.grade === 'GRADE_C').length;
  const optimalCount = records.filter(r => r.grade === 'GRADE_A' || r.grade === 'GRADE_B').length;

  return (
    <div className="space-y-6">
      {/* Page Title & Context Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 border-b border-slate-200 gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Flame className="w-6 h-6 text-emerald-600" />
            Executive Bioenergy Feedstock & Logistics Dashboard
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time North-East biomass preservation telemetry, monsoon rot triage & biorefinery buffer monitoring (NESFIC-I-04)
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg flex items-center gap-1.5 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
            LoRaWAN Multi-Depth IoT Active
          </span>
          <span className="px-2.5 py-1 bg-white text-slate-700 border border-slate-200 rounded-lg shadow-2xs font-medium">
            Supply Shed: {selectedDistrict === 'ALL' ? 'Statewide (All 35 Districts)' : selectedDistrict}
          </span>
        </div>
      </div>

      {/* Top 4 KPI Metrics in White Theme */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Monitored Biomass Tonnage */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-emerald-500 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Aggregated Biomass Inventory</span>
            <Layers className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 font-mono">{totalTonnage.toFixed(1)} MT</span>
            <span className="text-xs text-emerald-700 font-mono font-bold">(In Active Pods)</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2 font-medium">
            <span>6 Depot Cluster Pods</span>
            <span className="text-emerald-700 font-semibold">64 Days Buffer Runway</span>
          </div>
        </div>

        {/* Biomass Quality & Preservation Index */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-emerald-500 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Biomass Quality Index (BQVI)</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-emerald-700 font-mono">{avgHealthIndex}/100</span>
            <span className="text-xs text-slate-500 font-medium">State Avg Preservation</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2 font-medium">
            <span>Glucan Retention: 95.2%</span>
            <span className="text-emerald-700 font-semibold">Sustained 92% PLF</span>
          </div>
        </div>

        {/* Spontaneous Combustion & Heating Alerts */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-rose-400 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Core Overheating Alarm</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-rose-600 font-mono">{criticalCount} Stack</span>
            <span className="text-xs text-rose-500 font-medium">Core Temp &gt; 52°C</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2 font-medium">
            <span>Azara Pod Alpha Alert</span>
            <span className="text-rose-600 font-bold">N2 Purge Triggered</span>
          </div>
        </div>

        {/* Circular Waste Stream Recovery */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-sky-400 transition-all">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Biorefinery Circular Valorisation</span>
            <Recycle className="w-4 h-4 text-teal-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-teal-700 font-mono">100% Rate</span>
            <span className="text-xs text-teal-600 font-medium">Zero Waste Loop</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2 font-medium">
            <span>Lignin to Bio-Bitumen</span>
            <span className="text-teal-700 font-semibold">FOM to Tea Estates</span>
          </div>
        </div>
      </div>

      {/* Biomass Quality Grade Distribution */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Biomass Preservation & Storage Status (Assam Cluster Pods)</h3>
            <p className="text-xs text-slate-500">Triage classified via in-situ moisture, core temperature, and lactic ensilage pH</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Filter Tier:</span>
            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs font-semibold">
              <button
                onClick={() => setGradeFilter('ALL')}
                className={`px-2.5 py-1 rounded-md transition-all ${gradeFilter === 'ALL' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                All ({records.length})
              </button>
              <button
                onClick={() => setGradeFilter('GRADE_A')}
                className={`px-2.5 py-1 rounded-md transition-all ${gradeFilter === 'GRADE_A' ? 'bg-emerald-600 text-white font-bold' : 'text-emerald-700 hover:text-emerald-900'}`}
              >
                Grade A Optimal ({optimalCount})
              </button>
              <button
                onClick={() => setGradeFilter('GRADE_C')}
                className={`px-2.5 py-1 rounded-md transition-all ${gradeFilter === 'GRADE_C' ? 'bg-amber-600 text-white font-bold' : 'text-amber-700 hover:text-amber-900'}`}
              >
                Grade C Risk ({watchlistCount})
              </button>
              <button
                onClick={() => setGradeFilter('GRADE_D')}
                className={`px-2.5 py-1 rounded-md transition-all ${gradeFilter === 'GRADE_D' ? 'bg-rose-600 text-white font-bold' : 'text-rose-700 hover:text-rose-900'}`}
              >
                Grade D Critical ({criticalCount})
              </button>
            </div>
          </div>
        </div>

        {/* Table of Depots & Pods */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs text-slate-700 border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Depot / Cluster Hub</th>
                <th className="py-3 px-4">Feedstock Type</th>
                <th className="py-3 px-4">Preservation Mode</th>
                <th className="py-3 px-4">Moisture %</th>
                <th className="py-3 px-4">Core Temp</th>
                <th className="py-3 px-4">Ensilage pH</th>
                <th className="py-3 px-4">BQVI Score</th>
                <th className="py-3 px-4">Off-Take Refinery</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map(record => (
                <tr key={record.plotId} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    <div>{record.dagNumber}</div>
                    <div className="text-[11px] text-slate-500 font-normal">{record.pattaNumber} • {record.district}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-800">{record.crop}</span>
                    <div className="text-[11px] text-slate-500 font-mono">{record.tonnage} MT</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      record.stage.includes('Ensiling') ? 'bg-emerald-100 text-emerald-800' :
                      record.stage.includes('Pre-Dried') ? 'bg-blue-100 text-blue-800' :
                      record.stage.includes('Pelletized') ? 'bg-teal-100 text-teal-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {record.stage}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                    <span className={record.spectral.moisturePct > 40 && record.spectral.ensilagePh > 4.2 ? 'text-rose-600' : 'text-slate-800'}>
                      {record.spectral.moisturePct}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold">
                    <span className={record.spectral.coreTempC > 50 ? 'text-rose-600 animate-pulse' : 'text-slate-800'}>
                      {record.spectral.coreTempC}°C
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold">
                    <span className={record.spectral.ensilagePh < 4.2 ? 'text-emerald-700' : 'text-slate-700'}>
                      pH {record.spectral.ensilagePh}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      record.grade === 'GRADE_A' ? 'bg-emerald-100 text-emerald-800' :
                      record.grade === 'GRADE_B' ? 'bg-blue-100 text-blue-800' :
                      record.grade === 'GRADE_C' ? 'bg-amber-100 text-amber-800' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {record.cropHealthIndex}/100 ({record.grade})
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-600">
                    <div className="flex items-center gap-1">
                      <Factory className="w-3.5 h-3.5 text-slate-400" />
                      <span>{record.allocatedBiorefinery.replace('Assam Bio-Refinery Pvt. Ltd.', 'ABRPL')}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onSelectRecord(record)}
                        className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => onDispatchScouting(record)}
                        className="px-2.5 py-1 text-xs font-semibold rounded bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                      >
                        QA Action
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
