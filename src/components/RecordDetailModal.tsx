import React, { useState } from 'react';
import { 
  X, 
  Flame, 
  ShieldAlert, 
  Send, 
  Layers, 
  CloudSun, 
  Radio,
  Factory,
  Droplets,
  Thermometer,
  Recycle
} from 'lucide-react';
import { FeedstockDepotRecord } from '../types/cropHealth';

interface RecordDetailModalProps {
  record: FeedstockDepotRecord | null;
  onClose: () => void;
  onDispatchScouting: (record: FeedstockDepotRecord) => void;
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
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-slate-900">
                  Depot Telemetry: {record.dagNumber}
                </h3>
                <span className="text-xs bg-white text-slate-700 px-2 py-0.5 rounded-lg border border-slate-200 font-mono">
                  {record.pattaNumber}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {record.village}, {record.block}, {record.district} ({record.zone})
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setLang(isAssamese ? 'EN' : 'AS')}
              className="text-xs font-semibold px-2.5 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors shadow-2xs"
            >
              {isAssamese ? 'English' : 'অসমীয়া'}
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
              <span className="text-slate-500 font-medium">Bale Moisture</span>
              <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">{record.spectral.moisturePct}%</div>
              <span className="text-[10px] text-slate-400">Probe FDR Sensor</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
              <span className="text-slate-500 font-medium">Core Temp</span>
              <div className={`text-xl font-bold font-mono mt-0.5 ${record.spectral.coreTempC > 50 ? 'text-rose-600' : 'text-slate-900'}`}>
                {record.spectral.coreTempC}°C
              </div>
              <span className="text-[10px] text-slate-400">Alarm: &gt;52°C</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
              <span className="text-slate-500 font-medium">Ensilage pH</span>
              <div className="text-xl font-bold font-mono text-emerald-700 mt-0.5">{record.spectral.ensilagePh}</div>
              <span className="text-[10px] text-slate-400">Lactic Target: &lt;4.0</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
              <span className="text-slate-500 font-medium">Biomass Inventory</span>
              <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">{record.tonnage} MT</div>
              <span className="text-[10px] text-slate-400">{record.crop}</span>
            </div>
          </div>

          {/* Biorefinery Off-Take & Circularity */}
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                <Factory className="w-4 h-4 text-emerald-700" />
                <span>Assigned Biorefinery Destination:</span>
              </span>
              <span className="font-mono text-xs font-bold text-emerald-800 bg-white px-2.5 py-0.5 rounded border border-emerald-300">
                Continuous Supply Contract
              </span>
            </div>
            <div className="text-xs text-emerald-900 font-medium">
              {record.allocatedBiorefinery}
            </div>
            <div className="text-[11px] text-emerald-800 flex items-center justify-between border-t border-emerald-200/60 pt-2">
              <span>Dry Matter Retention: <strong>{record.spectral.dryMatterRetentionPct}%</strong></span>
              <span>Glucan Content: <strong>{record.spectral.glucanContentPct}%</strong></span>
              <span>Xylan Content: <strong>{record.spectral.xylanContentPct}%</strong></span>
            </div>
          </div>

          {/* Bilingual Advisory Card */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900">
              {isAssamese ? adv.headlineAs : adv.headlineEn}
            </div>
            <p className="text-slate-600 leading-relaxed">
              {isAssamese ? adv.summaryAs : adv.summaryEn}
            </p>
            <div className="pt-1 text-[11px] text-emerald-800 font-semibold">
              {isAssamese ? adv.preservationActionAs : adv.preservationActionEn}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex justify-between items-center">
          <span className="text-xs text-slate-500 font-mono">
            Security Hash: SHA-256 e4f901ab...8912
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onDispatchScouting(record);
                onClose();
              }}
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>QA Action</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
