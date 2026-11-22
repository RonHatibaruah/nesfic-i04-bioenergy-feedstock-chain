import React, { useState } from 'react';
import { 
  Sprout, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  CloudRain, 
  Eye, 
  Send, 
  MapPin, 
  ShieldAlert, 
  Filter, 
  Layers,
  Thermometer,
  Droplets,
  Calendar
} from 'lucide-react';
import { CropHealthRecord, HealthGrade } from '../types/cropHealth';

interface ExecutiveDashboardProps {
  records: CropHealthRecord[];
  onSelectRecord: (record: CropHealthRecord) => void;
  onDispatchScouting: (record: CropHealthRecord) => void;
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
  const totalBigha = records.reduce((sum, r) => sum + r.area.bigha, 0);
  const totalHectares = records.reduce((sum, r) => sum + (r.area.sqMeters / 10000), 0);
  const avgHealthIndex = Math.round(records.reduce((sum, r) => sum + r.cropHealthIndex, 0) / (records.length || 1));
  const criticalCount = records.filter(r => r.grade === 'GRADE_D').length;
  const watchlistCount = records.filter(r => r.grade === 'GRADE_C' || r.grade === 'GRADE_B').length;
  const optimalCount = records.filter(r => r.grade === 'GRADE_A').length;

  return (
    <div className="space-y-6">
      {/* Page Title & Context Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 border-b border-slate-800 gap-3">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sprout className="w-6 h-6 text-emerald-400" />
            Executive Agro-Climatic Intelligence Dashboard
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time space-to-ground crop health monitoring & epidemiological outbreak early warning for Assam
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 rounded-md flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            ASSAC Sentinel-2 5-Day Revisit Active
          </span>
          <span className="px-2.5 py-1 bg-slate-800 text-slate-300 border border-slate-700 rounded-md">
            Agro-Zone: {selectedDistrict === 'ALL' ? 'Statewide (All 35 Districts)' : selectedDistrict}
          </span>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Monitored Acreage */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-4 shadow-sm hover:border-emerald-500/50 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Monitored Crop Acreage</span>
            <Layers className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white font-mono">{totalBigha} Bigha</span>
            <span className="text-xs text-emerald-400 font-mono">({totalHectares.toFixed(1)} Ha)</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-700/50 pt-2">
            <span>8 Monitored Farm Clusters</span>
            <span className="text-emerald-400">100% Geo-Tagged</span>
          </div>
        </div>

        {/* State Crop Health Index */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-4 shadow-sm hover:border-emerald-500/50 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>State Crop Health Index (CHI)</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-300 font-mono">{avgHealthIndex}/100</span>
            <span className="text-xs text-slate-400 font-medium">State Avg Vigor</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-700/50 pt-2">
            <span>NDVI Weighted: 0.65</span>
            <span className="text-emerald-400 font-medium">Optimal Phenology</span>
          </div>
        </div>

        {/* Active Outbreak Alerts */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-4 shadow-sm hover:border-rose-500/50 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Critical Outbreak Risk</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-rose-400 font-mono">{criticalCount} Hotspots</span>
            <span className="text-xs text-rose-300/80 font-medium">Grade D Alerts</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-700/50 pt-2">
            <span>Rice Blast & Sheath Blight</span>
            <span className="text-rose-400 font-semibold">Immediate Field Action</span>
          </div>
        </div>

        {/* Weather & Meteorological Trigger */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-4 shadow-sm hover:border-sky-500/50 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>IMD Meteorological Radar</span>
            <CloudRain className="w-4 h-4 text-sky-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-sky-300 font-mono">92% RH</span>
            <span className="text-xs text-amber-300 font-medium">Fungal Spore Trigger</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-700/50 pt-2">
            <span>Morning Humidity &gt; 88%</span>
            <span className="text-amber-400 font-medium">Azara & Silchar Alert</span>
          </div>
        </div>
      </div>

      {/* Agro-Climatic Health Grade Distribution */}
      <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700/60">
          <div>
            <h3 className="text-sm font-semibold text-white">Crop Health Grade Distribution (Assam State Agro-Registry)</h3>
            <p className="text-xs text-slate-400">Classified using multi-spectral NDVI, NDWI moisture indices and IMD pathogen models</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Filter Tier:</span>
            <div className="inline-flex rounded-lg border border-slate-700 bg-slate-900 p-0.5 text-xs">
              <button
                onClick={() => setGradeFilter('ALL')}
                className={`px-2.5 py-1 rounded-md transition-all ${gradeFilter === 'ALL' ? 'bg-slate-700 text-white font-medium' : 'text-slate-400 hover:text-white'}`}
              >
                All ({records.length})
              </button>
              <button
                onClick={() => setGradeFilter('GRADE_A')}
                className={`px-2.5 py-1 rounded-md transition-all ${gradeFilter === 'GRADE_A' ? 'bg-emerald-600 text-white font-medium' : 'text-emerald-400 hover:text-emerald-300'}`}
              >
                Grade A ({optimalCount})
              </button>
              <button
                onClick={() => setGradeFilter('GRADE_B')}
                className={`px-2.5 py-1 rounded-md transition-all ${gradeFilter === 'GRADE_B' ? 'bg-blue-600 text-white font-medium' : 'text-blue-400 hover:text-blue-300'}`}
              >
                Grade B (2)
              </button>
              <button
                onClick={() => setGradeFilter('GRADE_C')}
                className={`px-2.5 py-1 rounded-md transition-all ${gradeFilter === 'GRADE_C' ? 'bg-amber-600 text-white font-medium' : 'text-amber-400 hover:text-amber-300'}`}
              >
                Grade C (1)
              </button>
              <button
                onClick={() => setGradeFilter('GRADE_D')}
                className={`px-2.5 py-1 rounded-md transition-all ${gradeFilter === 'GRADE_D' ? 'bg-rose-600 text-white font-medium' : 'text-rose-400 hover:text-rose-300'}`}
              >
                Grade D ({criticalCount})
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar of Health Grades */}
        <div className="mt-4">
          <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden flex">
            <div style={{ width: `${(optimalCount / records.length) * 100}%` }} className="bg-emerald-500" title="Grade A (Optimal Vigor)"></div>
            <div style={{ width: `${(2 / records.length) * 100}%` }} className="bg-blue-500" title="Grade B (Mild Stress)"></div>
            <div style={{ width: `${(1 / records.length) * 100}%` }} className="bg-amber-500" title="Grade C (Moderate Watchlist)"></div>
            <div style={{ width: `${(criticalCount / records.length) * 100}%` }} className="bg-rose-500" title="Grade D (Critical Outbreak)"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-xs">
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>Grade A: Optimal Vigor (80-100)</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span>Grade B: Mild Stress (65-79)</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>Grade C: High Risk Watchlist (45-64)</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span>Grade D: Critical Outbreak (&lt;45)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Monitored Farm Plots & Pest Surveillance Table */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-emerald-400" />
              Active Crop Health & Epidemiological Surveillance Register
            </h3>
            <p className="text-xs text-slate-400">
              Showing {filtered.length} monitored farm parcels across Assam agricultural blocks
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              aria-label="Filter records by crop category"
              value={cropFilter}
              onChange={(e) => setCropFilter(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">All Crops</option>
              <option value="Sali">Sali Paddy (Winter Rice)</option>
              <option value="Boro">Boro Paddy (Summer Rice)</option>
              <option value="Mustard">Rapeseed & Mustard</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-700 tracking-wider">
              <tr>
                <th className="py-3 px-4">Plot & Farmer</th>
                <th className="py-3 px-3">Location & Zone</th>
                <th className="py-3 px-3">Crop & Stage</th>
                <th className="py-3 px-3">Spectral Telemetry</th>
                <th className="py-3 px-3">Pest & Pathogen Risk</th>
                <th className="py-3 px-3">Crop Health Index</th>
                <th className="py-3 px-3">Grade</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60 font-sans">
              {filtered.map((record) => {
                const isGradeD = record.grade === 'GRADE_D';
                const isGradeA = record.grade === 'GRADE_A';
                const isGradeC = record.grade === 'GRADE_C';

                return (
                  <tr 
                    key={record.plotId} 
                    className={`hover:bg-slate-700/40 transition-colors ${
                      isGradeD ? 'bg-rose-950/20' : ''
                    }`}
                  >
                    {/* Plot & Farmer */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{record.farmerName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{record.dagNumber} • {record.pattaNumber}</div>
                      <div className="text-[10px] text-emerald-400 font-mono">{record.plotId}</div>
                    </td>

                    {/* Location & Zone */}
                    <td className="py-3 px-3">
                      <div className="font-medium text-slate-200 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {record.district}
                      </div>
                      <div className="text-[11px] text-slate-400">{record.block} • {record.village}</div>
                      <div className="text-[10px] text-slate-500">{record.zone}</div>
                    </td>

                    {/* Crop & Stage */}
                    <td className="py-3 px-3">
                      <div className="font-medium text-slate-200">{record.crop}</div>
                      <div className="text-[11px] text-emerald-400">{record.stage}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {record.area.bigha}B {record.area.katha}K {record.area.lesa}L
                      </div>
                    </td>

                    {/* Spectral Telemetry */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">NDVI:</span>
                        <span className={`font-mono font-semibold ${
                          record.spectral.ndvi >= 0.70 ? 'text-emerald-400' :
                          record.spectral.ndvi >= 0.55 ? 'text-amber-400' : 'text-rose-400'
                        }`}>
                          {record.spectral.ndvi.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        NDWI: {record.spectral.ndwi.toFixed(2)} • {record.spectral.soilMoisturePct}% Moist
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {record.weather.rhMorning}% RH • {record.weather.tMax}°C
                      </div>
                    </td>

                    {/* Pest & Pathogen Risk */}
                    <td className="py-3 px-3">
                      <div className={`font-semibold ${
                        isGradeD ? 'text-rose-400' : isGradeC ? 'text-amber-300' : 'text-slate-300'
                      }`}>
                        {record.primaryPest.split('(')[0]}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[11px] font-mono text-slate-400">
                          {record.pestProbabilityPct}% Prob
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                          record.riskTrajectory === 'RISING' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                          record.riskTrajectory === 'DECLINING' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                          'bg-slate-800 text-slate-400'
                        }`}>
                          {record.riskTrajectory}
                        </span>
                      </div>
                    </td>

                    {/* Crop Health Index */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-base font-bold font-mono ${
                          record.cropHealthIndex >= 80 ? 'text-emerald-400' :
                          record.cropHealthIndex >= 65 ? 'text-blue-400' :
                          record.cropHealthIndex >= 45 ? 'text-amber-400' : 'text-rose-400'
                        }`}>
                          {record.cropHealthIndex}
                        </span>
                        <span className="text-[10px] text-slate-500">/ 100</span>
                      </div>
                    </td>

                    {/* Grade Badge */}
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold inline-block ${
                        isGradeA ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                        record.grade === 'GRADE_B' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                        isGradeC ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                        'bg-rose-950 text-rose-300 border border-rose-800 animate-pulse'
                      }`}>
                        {record.grade.replace('_', ' ')}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => onSelectRecord(record)}
                        className="px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium transition-colors inline-flex items-center gap-1"
                        title="View Detailed Plot Telemetry & Advisory"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>

                      {isGradeD && (
                        <button
                          onClick={() => onDispatchScouting(record)}
                          className="px-2.5 py-1 rounded bg-rose-700 hover:bg-rose-600 text-white text-xs font-semibold transition-colors inline-flex items-center gap-1 shadow-sm"
                          title="Dispatch Agricultural Extension Officer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Dispatch AEO</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
