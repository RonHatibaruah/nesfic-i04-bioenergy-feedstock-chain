import React, { useState, useMemo } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { CadastralMapViewer } from './components/CadastralMapViewer';
import { FieldVerificationPortal } from './components/FieldVerificationPortal';
import { CitizenHealthPortal } from './components/CitizenHealthPortal';
import { DroneTechnologyPage } from './components/DroneTechnologyPage';
import { AdminDashboard } from './components/AdminDashboard';
import { RecordDetailModal } from './components/RecordDetailModal';
import { TutorialModal } from './components/TutorialModal';
import { initialCropRecords, initialScoutingTasks } from './data/mockAssamCropData';
import { CropHealthRecord, FieldScoutingTask } from './types/cropHealth';
import { AgroRuleEngineConfig, DEFAULT_AGRO_CONFIG } from './services/cropIntelligenceEngine';
import { Sprout } from 'lucide-react';

export function App() {
  const [records, setRecords] = useState<CropHealthRecord[]>(initialCropRecords);
  const [tasks, setTasks] = useState<FieldScoutingTask[]>(initialScoutingTasks);
  const [ruleConfig, setRuleConfig] = useState<AgroRuleEngineConfig>(DEFAULT_AGRO_CONFIG);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [inspectingRecord, setInspectingRecord] = useState<CropHealthRecord | null>(null);
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);

  // Synchronize hash with activeTab for SEO, deep-linking and browser navigation
  React.useEffect(() => {
    const syncTabFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'dashboard') setActiveTab('dashboard');
      else if (hash === 'gis-viewer' || hash === 'gis-map') setActiveTab('gis-map');
      else if (hash === 'field-scouting' || hash === 'field-verification') setActiveTab('field-verification');
      else if (hash === 'farmer-advisory' || hash === 'citizen-portal') setActiveTab('citizen-portal');
      else if (hash === 'drone-tech' || hash === 'drone-technology') setActiveTab('drone-tech');
      else if (hash === 'admin-console' || hash === 'admin') setActiveTab('admin');
      else if (hash === 'tutorial') setIsTutorialOpen(true);
    };

    syncTabFromHash();
    window.addEventListener('hashchange', syncTabFromHash);
    return () => window.removeEventListener('hashchange', syncTabFromHash);
  }, []);

  const handleTabSelect = (tab: ActiveTab) => {
    setActiveTab(tab);
    const hashTarget = tab === 'gis-map' ? 'gis-viewer' :
                       tab === 'field-verification' ? 'field-scouting' :
                       tab === 'citizen-portal' ? 'farmer-advisory' :
                       tab === 'drone-tech' ? 'drone-technology' :
                       tab === 'admin' ? 'admin-console' : 'dashboard';
    if (window.location.hash !== `#${hashTarget}`) {
      window.history.pushState(null, '', `#${hashTarget}`);
    }
  };

  // Filter records by selected district
  const filteredRecords = useMemo(() => {
    if (selectedDistrict === 'ALL') return records;
    return records.filter(r => r.district.toLowerCase() === selectedDistrict.toLowerCase());
  }, [records, selectedDistrict]);

  // Critical counts
  const criticalCount = useMemo(() => {
    return records.filter(r => r.grade === 'GRADE_D').length;
  }, [records]);

  // Dispatch a record to Agricultural Extension Officer for field ground scouting
  const handleDispatchScouting = (record: CropHealthRecord) => {
    const newTask: FieldScoutingTask = {
      taskId: `TASK-2026-${Math.floor(100 + Math.random() * 900)}`,
      plotId: record.plotId,
      farmerName: record.farmerName,
      district: record.district,
      block: record.block,
      village: record.village,
      assignedOfficer: 'Pranab Jyoti Sarma',
      officerRole: 'ADO (Agri Dev Officer)',
      targetPest: record.primaryPest,
      priority: record.grade === 'GRADE_D' ? 'CRITICAL' : 'HIGH',
      status: 'PENDING_VISIT',
      scheduledDate: new Date().toISOString().split('T')[0],
      trapCount: 0,
      visualDefoliationPct: 0,
      scoutingNotes: 'Urgent task dispatched from Executive Dashboard following satellite stress anomaly.',
      gpsVerified: false
    };

    setTasks([newTask, ...tasks]);
    handleTabSelect('field-verification');
  };

  // Complete field task
  const handleCompleteTask = (taskId: string, trapCount: number, notes: string, defoliationPct: number) => {
    setTasks(tasks.map(t => {
      if (t.taskId === taskId) {
        return {
          ...t,
          status: 'COMPLETED',
          trapCount,
          scoutingNotes: notes,
          visualDefoliationPct: defoliationPct,
          gpsVerified: true
        };
      }
      return t;
    }));
  };

  const handleSelectRecordByPlotId = (plotId: string) => {
    const found = records.find(r => r.plotId === plotId);
    if (found) {
      setInspectingRecord(found);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabSelect}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
        totalRecords={records.length}
        criticalCount={criticalCount}
        onOpenTutorial={() => setIsTutorialOpen(true)}
      />

      {/* Main Content Pane */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <ExecutiveDashboard
            records={filteredRecords}
            onSelectRecord={(r) => setInspectingRecord(r)}
            onDispatchScouting={handleDispatchScouting}
            selectedDistrict={selectedDistrict}
          />
        )}

        {activeTab === 'gis-map' && (
          <CadastralMapViewer
            records={filteredRecords}
            selectedRecord={inspectingRecord}
            onSelectRecord={(r) => setInspectingRecord(r)}
            onDispatchScouting={handleDispatchScouting}
          />
        )}

        {activeTab === 'field-verification' && (
          <FieldVerificationPortal
            tasks={tasks}
            onCompleteTask={handleCompleteTask}
            onSelectRecordByPlotId={handleSelectRecordByPlotId}
          />
        )}

        {activeTab === 'citizen-portal' && (
          <CitizenHealthPortal
            records={filteredRecords}
            onSelectRecord={(r) => setInspectingRecord(r)}
          />
        )}

        {activeTab === 'drone-tech' && (
          <DroneTechnologyPage />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard
            records={records}
            ruleConfig={ruleConfig}
            onUpdateRuleConfig={(cfg) => setRuleConfig(cfg)}
            onResetRuleConfig={() => setRuleConfig(DEFAULT_AGRO_CONFIG)}
          />
        )}
      </main>

      {/* Detailed Telemetry & Advisory Inspection Modal */}
      <RecordDetailModal
        record={inspectingRecord}
        onClose={() => setInspectingRecord(null)}
        onDispatchScouting={handleDispatchScouting}
      />

      {/* System Guide & Challenge Architecture Modal */}
      <TutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center text-white">
              <Sprout className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-900">SasyaSwasthya (শস্য স্বাস্থ্য)</span>
            <span>•</span>
            <span>NESFIC-D-11 Official Government Track Solution</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-600">
            <span>Department of Agriculture, Assam</span>
            <span>•</span>
            <span>Assam State Space Application Centre (ASSAC)</span>
            <span>•</span>
            <span>Assam Agricultural University (AAU)</span>
          </div>

          <div className="text-slate-500 font-mono text-[11px]">
            Lead Architect: Ron Hatibaruah
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
