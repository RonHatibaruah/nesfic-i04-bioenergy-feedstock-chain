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
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-200 gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-emerald-600" />
            Field Ground-Truthing & Extension Officer PWA
          </h2>
          <p className="text-xs text-slate-500">
            Progressive Web App for Agricultural Development Officers (ADO) & Krishi Sakhis with offline-sync
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOfflineMode(!isOfflineMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-all shadow-xs ${
              isOfflineMode 
                ? 'bg-amber-50 text-amber-800 border-amber-300' 
                : 'bg-emerald-50 text-emerald-800 border-emerald-300'
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
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Assigned Field Tasks ({tasks.length})
            </h3>
            <span className="text-[11px] text-emerald-700 font-mono font-medium">Kamrup & Nagaon Roster</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[560px] overflow-y-auto">
            {tasks.map(task => {
              const isSelected = selectedTask.taskId === task.taskId;
              const isCritical = task.priority === 'CRITICAL';

              return (
                <div
                  key={task.taskId}
                  onClick={() => handleSelectTask(task)}
                  className={`p-3.5 cursor-pointer transition-all ${
                    isSelected ? 'bg-emerald-50/70 border-l-4 border-emerald-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-800">{task.taskId}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isCritical ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                      task.priority === 'HIGH' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {task.priority}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-900 mt-1">{task.farmerName}</div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{task.village}, {task.block}</span>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-700 font-medium">{task.targetPest.split('(')[0]}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                      task.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' :
                      task.status === 'SCOUTING_IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                      'bg-slate-100 text-slate-600'
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
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              {/* Task Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-emerald-600 font-bold">{selectedTask.taskId}</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-600 font-medium">Assigned Officer: {selectedTask.assignedOfficer} ({selectedTask.officerRole})</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    Plot Ground Scouting: {selectedTask.farmerName}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Location: {selectedTask.village}, {selectedTask.block}, {selectedTask.district}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectRecordByPlotId(selectedTask.plotId)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs rounded-lg font-medium transition-colors"
                  >
                    View Satellite Telemetry
                  </button>
                </div>
              </div>

              {/* Sub-meter GPS Plot Locking Simulator */}
              <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-800 font-semibold flex items-center gap-1.5">
                      <span>GPS RTK Geofence Locked</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="text-slate-500 text-[11px] font-mono">
                      Lat: 26.1152°N, Lng: 91.6028°E • Accuracy: ±0.8m
                    </div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold">
                  In-Situ Verified
                </span>
              </div>

              {/* In-Situ Pest Diagnostics & Form */}
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Trap Counter */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Bug className="w-4 h-4 text-amber-600" />
                        Pheromone Trap Count (Scirpo-Lure)
                      </span>
                      <span className="text-amber-700 font-mono font-bold">{trapInput} moths</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      value={trapInput}
                      onChange={(e) => setTrapInput(parseInt(e.target.value))}
                      className="w-full mt-2 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>0 (Safe)</span>
                      <span className="font-medium text-amber-700">ETL: 8 Moths/Trap</span>
                      <span>40 (Severe)</span>
                    </div>
                  </div>

                  {/* Visual Canopy Defoliation */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                      <span>Canopy Defoliation / Lesion Area</span>
                      <span className="text-rose-700 font-mono font-bold">{defoliationInput}%</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="60"
                      value={defoliationInput}
                      onChange={(e) => setDefoliationInput(parseInt(e.target.value))}
                      className="w-full mt-2 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>0% (Clean)</span>
                      <span className="font-medium text-rose-700">ETL: 10% Cover</span>
                      <span>60% (Severe Blight)</span>
                    </div>
                  </div>
                </div>

                {/* Leaf Disease On-Device AI Scanner */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-slate-900">
                        Leaf Symptom AI Diagnostic Camera (MobileNet V3 Edge Inference)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRunAiDiagnostics}
                      disabled={isAiScanning}
                      className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs disabled:opacity-50"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isAiScanning ? 'Inference Running...' : 'Scan Diseased Leaf'}</span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 mb-3">
                    Captures in-situ leaf blade symptoms and classifies pathogens against the Assam Agricultural University (AAU) disease pathology database.
                  </p>

                  {/* AI Prediction Result Box */}
                  {aiResult && (
                    <div className="bg-white border border-emerald-300 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
                      <div>
                        <div className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>AI Classification: {aiResult.label}</span>
                        </div>
                        <div className="text-[11px] text-slate-600 mt-0.5">
                          Confidence: <strong className="text-slate-900 font-mono">{aiResult.confidence.toFixed(1)}%</strong> • Match Model: RiceVision-Assam-V2
                        </div>
                      </div>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold self-start sm:self-auto">
                        Ground Truth Verified
                      </span>
                    </div>
                  )}
                </div>

                {/* Field Notes Textarea */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Extension Officer Field Notes & Cultural Observations
                  </label>
                  <textarea
                    rows={3}
                    value={notesInput}
                    onChange={(e) => setNotesInput(e.target.value)}
                    placeholder="Enter observations on dew duration, fertilizer application, water drainage..."
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 shadow-xs"
                  />
                </div>

                {/* Submit Ground Truth */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
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
