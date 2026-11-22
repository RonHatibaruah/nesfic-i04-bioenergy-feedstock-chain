import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  MapPin, 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  Smartphone, 
  Wifi, 
  WifiOff, 
  Upload, 
  Bug, 
  Sparkles,
  Navigation
} from 'lucide-react';
import { FieldScoutingTask, CropHealthRecord } from '../types/cropHealth';

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
  const [trapInput, setTrapInput] = useState<number>(selectedTask?.trapCount || 12);
  const [defoliationInput, setDefoliationInput] = useState<number>(selectedTask?.visualDefoliationPct || 18);
  const [notesInput, setNotesInput] = useState<string>(selectedTask?.scoutingNotes || '');
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  const [isAiScanning, setIsAiScanning] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<{ label: string; confidence: number } | null>(
    selectedTask?.aiDiagnosticPrediction 
      ? { label: selectedTask.aiDiagnosticPrediction, confidence: selectedTask.aiConfidencePct || 92.5 }
      : null
  );

  const handleSelectTask = (task: FieldScoutingTask) => {
    setSelectedTask(task);
    setTrapInput(task.trapCount || 0);
    setDefoliationInput(task.visualDefoliationPct || 0);
    setNotesInput(task.scoutingNotes || '');
    setAiResult(
      task.aiDiagnosticPrediction 
        ? { label: task.aiDiagnosticPrediction, confidence: task.aiConfidencePct || 90.0 }
        : null
    );
  };

  const handleRunAiDiagnostics = () => {
    setIsAiScanning(true);
    setTimeout(() => {
      setIsAiScanning(false);
      if (selectedTask.targetPest.includes('Rice Blast')) {
        setAiResult({
          label: 'Rice Blast (Magnaporthe oryzae) - Spindle Lesion Confirmed',
          confidence: 95.8
        });
      } else if (selectedTask.targetPest.includes('Stem Borer')) {
        setAiResult({
          label: 'Yellow Stem Borer Larval Dead-Heart (Scirpophaga incertulas)',
          confidence: 91.2
        });
      } else {
        setAiResult({
          label: 'Sheath Blight (Rhizoctonia solani) Snake-Skin Lesion',
          confidence: 94.1
        });
      }
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCompleteTask(selectedTask.taskId, trapInput, notesInput, defoliationInput);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-2 border-b border-slate-800 gap-3">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-emerald-400" />
            Field Ground-Truthing & Extension Officer PWA
          </h2>
          <p className="text-xs text-slate-400">
            Progressive Web App for Agricultural Development Officers (ADO) & Krishi Sakhis with offline-sync
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOfflineMode(!isOfflineMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all ${
              isOfflineMode 
                ? 'bg-amber-950/80 text-amber-300 border-amber-700/80' 
                : 'bg-emerald-950/80 text-emerald-300 border-emerald-700/80'
            }`}
          >
            {isOfflineMode ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
            <span>{isOfflineMode ? 'Offline Local Storage (SQLite)' : 'Online Connected (ASSAC API)'}</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Workflow */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Task Roster (1 Col) */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden shadow-lg">
          <div className="p-3 bg-slate-900 border-b border-slate-700 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Assigned Field Tasks ({tasks.length})
            </h3>
            <span className="text-[11px] text-emerald-400 font-mono">Kamrup & Nagaon AEO Roster</span>
          </div>

          <div className="divide-y divide-slate-700/60 max-h-[560px] overflow-y-auto">
            {tasks.map(task => {
              const isSelected = selectedTask.taskId === task.taskId;
              const isCritical = task.priority === 'CRITICAL';

              return (
                <div
                  key={task.taskId}
                  onClick={() => handleSelectTask(task)}
                  className={`p-3 cursor-pointer transition-all ${
                    isSelected ? 'bg-slate-700/80 border-l-4 border-emerald-500' : 'hover:bg-slate-700/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-200">{task.taskId}</span>
                    <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                      isCritical ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                      task.priority === 'HIGH' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {task.priority}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-white mt-1">{task.farmerName}</div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{task.village}, {task.block}</span>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-400 font-medium">{task.targetPest.split('(')[0]}</span>
                    <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                      task.status === 'COMPLETED' ? 'bg-emerald-950 text-emerald-300' :
                      task.status === 'SCOUTING_IN_PROGRESS' ? 'bg-blue-950 text-blue-300' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Field Scouting Form & Leaf Diagnostic AI (2 Cols) */}
        {selectedTask && (
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg">
              {/* Task Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-700 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-emerald-400 font-bold">{selectedTask.taskId}</span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs text-slate-300 font-medium">Assigned Officer: {selectedTask.assignedOfficer} ({selectedTask.officerRole})</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">
                    Plot Ground Scouting: {selectedTask.farmerName}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Location: {selectedTask.village}, {selectedTask.block}, {selectedTask.district}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectRecordByPlotId(selectedTask.plotId)}
                    className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs rounded-lg font-medium transition-colors"
                  >
                    View Satellite Telemetry
                  </button>
                </div>
              </div>

              {/* Sub-meter GPS Plot Locking Simulator */}
              <div className="mt-4 bg-slate-900/90 border border-slate-700 rounded-lg p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 flex items-center justify-center text-emerald-400">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-200 font-semibold flex items-center gap-1.5">
                      <span>GPS RTK Geofence Locked</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="text-slate-400 text-[11px] font-mono">
                      Lat: 26.1152°N, Lng: 91.6028°E • Accuracy: ±0.8m
                    </div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[11px] font-semibold">
                  In-Situ Verified
                </span>
              </div>

              {/* In-Situ Pest Diagnostics & Form */}
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Trap Counter */}
                  <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-700">
                    <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Bug className="w-4 h-4 text-amber-400" />
                        Pheromone Trap Count (Scirpo-Lure)
                      </span>
                      <span className="text-amber-400 font-mono font-bold">{trapInput} moths</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      value={trapInput}
                      onChange={(e) => setTrapInput(parseInt(e.target.value))}
                      className="w-full mt-2 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>0 (Safe)</span>
                      <span>ETL: 8 Moths/Trap</span>
                      <span>40 (Severe)</span>
                    </div>
                  </div>

                  {/* Visual Canopy Defoliation */}
                  <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-700">
                    <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                      <span>Canopy Defoliation / Lesion Area</span>
                      <span className="text-rose-400 font-mono font-bold">{defoliationInput}%</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="60"
                      value={defoliationInput}
                      onChange={(e) => setDefoliationInput(parseInt(e.target.value))}
                      className="w-full mt-2 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>0% (Clean)</span>
                      <span>ETL: 10% Cover</span>
                      <span>60% (Severe Blight)</span>
                    </div>
                  </div>
                </div>

                {/* Leaf Disease On-Device AI Scanner */}
                <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-white">
                        Leaf Symptom AI Diagnostic Camera (MobileNet V3 Edge Inference)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRunAiDiagnostics}
                      disabled={isAiScanning}
                      className="px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm disabled:opacity-50"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isAiScanning ? 'Inference Running...' : 'Scan Diseased Leaf'}</span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-400 mb-3">
                    Captures in-situ leaf blade symptoms and classifies pathogens against the Assam Agricultural University (AAU) disease pathology database.
                  </p>

                  {/* AI Prediction Result Box */}
                  {aiResult && (
                    <div className="bg-slate-950 border border-emerald-500/40 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>AI Classification: {aiResult.label}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Confidence: <strong className="text-white font-mono">{aiResult.confidence.toFixed(1)}%</strong> • Match Model: RiceVision-Assam-V2
                        </div>
                      </div>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-medium">
                        Ground Truth Verified
                      </span>
                    </div>
                  )}
                </div>

                {/* Field Notes Textarea */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Extension Officer Field Notes & Cultural Observations
                  </label>
                  <textarea
                    rows={3}
                    value={notesInput}
                    onChange={(e) => setNotesInput(e.target.value)}
                    placeholder="Enter observations on dew duration, fertilizer application, water drainage..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Submit Ground Truth */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-emerald-900/30"
                  >
                    <ClipboardCheck className="w-4 h-4" />
                    <span>Submit In-Situ Ground Truth Telemetry</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
