import React, { useState } from 'react';
import { 
  X, 
  Sprout, 
  ShieldAlert, 
  Send, 
  Layers, 
  CloudSun, 
  Radio
} from 'lucide-react';
import { CropHealthRecord } from '../types/cropHealth';

interface RecordDetailModalProps {
  record: CropHealthRecord | null;
  onClose: () => void;
  onDispatchScouting: (record: CropHealthRecord) => void;
}

export const RecordDetailModal: React.FC<RecordDetailModalProps> = ({
  record,
  onClose,
  onDispatchScouting
}) => {
  const [lang, setLang] = useState<'AS' | 'EN'>('AS');

  if (!record) return null;

  const isGradeA = record.grade === 'GRADE_A';
  const isGradeD = record.grade === 'GRADE_D';
  const adv = record.advisory;
  const isAssamese = lang === 'AS';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-slate-50 text-slate-900 px-6 py-4 flex justify-between items-center border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-xl ${
              isGradeA ? 'bg-emerald-100 text-emerald-700' :
              isGradeD ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
            }`}>
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-slate-900">
                  Plot Telemetry: {record.farmerName}
                </h3>
                <span className="text-xs bg-white text-slate-700 px-2 py-0.5 rounded-lg border border-slate-200 font-mono">
                  {record.dagNumber} • {record.pattaNumber}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {record.village}, {record.block}, {record.district} ({record.zone})
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex rounded-lg border border-slate-200 bg-white p-0.5 text-xs shadow-xs">
              <button
                onClick={() => setLang('AS')}
                className={`px-2.5 py-1 rounded font-semibold ${lang === 'AS' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                অসমীয়া
              </button>
              <button
                onClick={() => setLang('EN')}
                className={`px-2.5 py-1 rounded font-semibold ${lang === 'EN' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                English
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          {/* Status Alert Banner */}
          <div className={`p-4 rounded-xl border flex items-center justify-between ${
            isGradeD ? 'bg-rose-50 border-rose-200 text-rose-800' :
            isGradeA ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
            'bg-amber-50 border-amber-200 text-amber-800'
          }`}>
            <div className="flex items-center space-x-3">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <div>
                <span className="font-bold text-sm">
                  Crop Health Grade: {record.grade.replace('_', ' ')} (CHI: {record.cropHealthIndex}/100)
                </span>
                <p className="text-[11px] opacity-90 mt-0.5">
                  Pathogen Threat: {record.primaryPest} • Risk Trajectory: {record.riskTrajectory}
                </p>
              </div>
            </div>
            <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-white border border-current font-bold">
              {record.status.replace('_', ' ')}
            </span>
          </div>

          {/* Grid of Telemetry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Spectral Telemetry */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-200 pb-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>Space Telemetry (Sentinel-2 10m Bands)</span>
              </h4>
              <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
                <div>
                  <span className="text-slate-500 text-[11px]">NDVI Vigor:</span>
                  <div className="text-emerald-700 font-bold text-base">{record.spectral.ndvi.toFixed(2)}</div>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px]">NDWI Moisture:</span>
                  <div className="text-sky-700 font-bold text-base">{record.spectral.ndwi.toFixed(2)}</div>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px]">Soil Moisture:</span>
                  <div className="text-slate-800 font-semibold">{record.spectral.soilMoisturePct}%</div>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px]">Canopy Temp:</span>
                  <div className="text-amber-800 font-semibold">{record.spectral.canopyTemp}°C</div>
                </div>
              </div>
              <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-200">
                Last Pass: {record.spectral.lastSatellitePass} (Cloud: {record.spectral.cloudCoverPct}%)
              </div>
            </div>

            {/* Weather Conditions */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-200 pb-2">
                <CloudSun className="w-4 h-4 text-sky-600" />
                <span>Meteorological Telemetry (IMD AWS)</span>
              </h4>
              <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
                <div>
                  <span className="text-slate-500 text-[11px]">24h Rainfall:</span>
                  <div className="text-sky-700 font-bold text-base">{record.weather.rainfall24h} mm</div>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px]">Morning RH:</span>
                  <div className="text-amber-700 font-bold text-base">{record.weather.rhMorning}%</div>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px]">Temp Range:</span>
                  <div className="text-slate-800 font-semibold">{record.weather.tMin}°C - {record.weather.tMax}°C</div>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px]">Wind Speed:</span>
                  <div className="text-slate-800 font-semibold">{record.weather.windSpeedKmh} km/h</div>
                </div>
              </div>
              <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-200">
                Station: {record.weather.imdStation}
              </div>
            </div>
          </div>

          {/* Bilingual Advisory Card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-200 pb-2">
              <Radio className="w-4 h-4 text-amber-600" />
              <span>Official Agro-Advisory Bulletin ({adv.advisoryId})</span>
            </h4>

            <div className="text-sm font-bold text-emerald-800">
              {isAssamese ? adv.headlineAs : adv.headlineEn}
            </div>

            <p className="text-slate-700 leading-relaxed">
              {isAssamese ? adv.summaryAs : adv.summaryEn}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                <span className="font-bold text-emerald-800 block mb-1">
                  {isAssamese ? 'পথাৰ ব্যৱস্থাপনা' : 'Water Drainage'}
                </span>
                <span className="text-slate-600">{isAssamese ? adv.culturalActionAs : adv.culturalActionEn}</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                <span className="font-bold text-teal-800 block mb-1">
                  {isAssamese ? 'জৈৱিক নিবাৰণ' : 'Bio-Control'}
                </span>
                <span className="text-slate-600">{isAssamese ? adv.bioPesticideAs : adv.bioPesticideEn}</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                <span className="font-bold text-amber-800 block mb-1">
                  {isAssamese ? 'ৰাসায়নিক মাত্ৰা' : 'Chemical Intervention'}
                </span>
                <span className="text-slate-600">{isAssamese ? adv.chemicalInterventionAs : adv.chemicalInterventionEn}</span>
                <div className="text-[10px] text-amber-800 font-mono mt-1 font-semibold">Dosage: {adv.dosagePerBigha}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex justify-between items-center">
          <div className="text-[11px] text-slate-500">
            Auth: Directorate of Agriculture & ASSAC, Assam
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold rounded-xl transition-colors shadow-xs"
            >
              Close
            </button>

            {isGradeD && (
              <button
                onClick={() => {
                  onDispatchScouting(record);
                  onClose();
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Dispatch AEO to Plot</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
