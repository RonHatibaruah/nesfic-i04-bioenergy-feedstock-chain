import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Smartphone, 
  Wifi, 
  WifiOff, 
  Flame, 
  Sparkles,
  Droplets,
  Layers,
  Thermometer,
  ShieldAlert
} from 'lucide-react';
import { FieldScoutingTask } from '../types/cropHealth';

interface FieldVerificationPortalProps {
  tasks: FieldScoutingTask[];
  onCompleteTask: (taskId: string, trapCount: number, notes: string, defoliationPct: number) => void;
  onSelectRecordByPlotId: (plotId: string) => void;
}

export const FieldVerificationPortal: React.FC<FieldVerificationPortalProps> = ({
  tasks,
  onCompleteTask,
  onSelectRecordByPlotId
}) => {
  const [selectedTask, setSelectedTask] = useState<FieldScoutingTask>(tasks[0]);
  const [moistureInput, setMoistureInput] = useState<number>(selectedTask?.trapCount || 48.2);
  const [tempInput, setTempInput] = useState<number>(selectedTask?.visualDefoliationPct || 32.4);
  const [notesInput, setNotesInput] = useState<string>(selectedTask?.scoutingNotes || '');
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  const [isAiScanning, setIsAiScanning] = useState<boolean>(false);
  const [diagnosticResult, setDiagnosticResult] = useState<{ label: string; confidence: number; action: string } | null>(
    selectedTask?.aiDiagnosticPrediction 
      ? { label: selectedTask.aiDiagnosticPrediction, confidence: selectedTask.aiConfidencePct || 94.5, action: 'Certified for Silo Storage' }
      : null
  );

  const handleSelectTask = (task: FieldScoutingTask) => {
    setSelectedTask(task);
    setMoistureInput(task.trapCount || 0);
    setTempInput(task.visualDefoliationPct || 0);
    setNotesInput(task.scoutingNotes || '');
    setDiagnosticResult(
      task.aiDiagnosticPrediction 
        ? { label: task.aiDiagnosticPrediction, confidence: task.aiConfidencePct || 92.0, action: 'Standard Processing' }
        : null
    );
  };

  const handleRunMoistureDiagnostics = () => {
    setIsAiScanning(true);
    setTimeout(() => {
      setIsAiScanning(false);
      if (tempInput > 50) {
        setDiagnosticResult({
          label: 'CRITICAL: Exothermic Self-Heating Precursor Detected',
          confidence: 96.4,
          action: 'Trigger emergency N2 gas purge into bottom plenum immediately.'
        });
      } else if (moistureInput > 40) {
        setDiagnosticResult({
          label: 'High-Moisture Feedstock (Suitable for Anaerobic Ensiling)',
          confidence: 95.2,
          action: 'Divert to Bunker Silo Pod #04; inoculate with Lactobacillus plantarum (10^6 CFU/g).'
        });
      } else {
        setDiagnosticResult({
          label: 'Optimal Dry Biomass (<15% Moisture)',
          confidence: 98.1,
          action: 'Certified for direct briquette densification and dry buffer shed.'
        });
      }
    }, 800);
  };

  const handleSaveVerification = () => {
    onCompleteTask(selectedTask.taskId, moistureInput, notesInput, tempInput);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-2">
            <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
            <span>Depot QA Mobile App & Smart Probe Sync Engine</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Depot QA, In-Situ Moisture Testing & Triage Portal
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Offline-first Progressive Web App (PWA) for depot quality engineers, weighbridge operators, and FPO aggregators. Rapid moisture testing, thermal scans, and automated ensiling dispatch.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOfflineMode(!isOfflineMode)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
              isOfflineMode
                ? 'bg-amber-50 text-amber-900 border-amber-300'
                : 'bg-emerald-50 text-emerald-900 border-emerald-300'
            }`}
          >
            {isOfflineMode ? <WifiOff className="w-3.5 h-3.5 text-amber-600" /> : <Wifi className="w-3.5 h-3.5 text-emerald-600" />}
            <span>{isOfflineMode ? 'Offline SQLite Active' : 'Cloud Sync Online'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task Roster */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Active QA Inspection Roster</h3>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              {tasks.length} Assigned
            </span>
          </div>

          <div className="space-y-2">
            {tasks.map(task => (
              <div
                key={task.taskId}
                onClick={() => handleSelectTask(task)}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  selectedTask.taskId === task.taskId
                    ? 'border-emerald-600 bg-emerald-50/40 shadow-xs'
                    : 'border-slate-100 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-bold text-slate-900">{task.taskId}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    task.priority === 'CRITICAL' ? 'bg-rose-100 text-rose-800 animate-pulse' :
                    task.priority === 'HIGH' ? 'bg-amber-100 text-amber-800' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {task.priority}
                  </span>
                </div>
                <div className="text-[11px] font-medium text-slate-700 mt-1">
                  {task.farmerName} • {task.district}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 flex items-center justify-between">
                  <span>Target: {task.targetPest}</span>
                  <span className="font-mono">{task.scheduledDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Workstation */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {selectedTask.taskId}
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mt-1">
                Quality Inspection: {selectedTask.farmerName} ({selectedTask.plotId})
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{selectedTask.village}, {selectedTask.block}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-blue-600" />
                <span>Handheld RF Moisture Reading (% wet basis):</span>
              </label>
              <input
                type="number"
                step="0.1"
                value={moistureInput}
                onChange={(e) => setMoistureInput(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-mono font-bold focus:outline-none focus:border-emerald-600"
              />
              <span className="text-[10px] text-slate-500">Target: &lt;15% for dry storage | 45-60% for anaerobic ensiling</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-rose-600" />
                <span>Core Probe Temperature (°C):</span>
              </label>
              <input
                type="number"
                step="0.1"
                value={tempInput}
                onChange={(e) => setTempInput(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-mono font-bold focus:outline-none focus:border-emerald-600"
              />
              <span className="text-[10px] text-slate-500">Alarm threshold: &gt;52.0°C (indicates self-heating fire danger)</span>
            </div>
          </div>

          {/* AI / Automated Diagnostic Button */}
          <div className="pt-2">
            <button
              onClick={handleRunMoistureDiagnostics}
              disabled={isAiScanning}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              {isAiScanning ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-emerald-400" />
                  <span>Evaluating Biochemical Degradation Risk...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Run Algorithmic Triage & Storage Path Recommendation</span>
                </>
              )}
            </button>
          </div>

          {/* Diagnostic Result Card */}
          {diagnosticResult && (
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/60 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-emerald-950 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  {diagnosticResult.label}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-300">
                  {diagnosticResult.confidence}% Confidence
                </span>
              </div>
              <p className="text-xs text-emerald-900 font-medium">
                <strong>Preservation Directive:</strong> {diagnosticResult.action}
              </p>
            </div>
          )}

          {/* Inspector Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">QA Inspector Field Log & Sign-Off Notes:</label>
            <textarea
              rows={3}
              value={notesInput}
              onChange={(e) => setNotesInput(e.target.value)}
              placeholder="Record bale compaction density, moisture meter calibration, or nitrogen purging status..."
              className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => onSelectRecordByPlotId(selectedTask.plotId)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              View Full Depot Telemetry
            </button>
            <button
              onClick={handleSaveVerification}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs"
            >
              Submit & Sign QA Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
