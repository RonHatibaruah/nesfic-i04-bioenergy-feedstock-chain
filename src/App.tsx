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
import { Sprout, ShieldAlert, FileText, ExternalLink, HelpCircle, Github } from 'lucide-react';

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
      officerRole: 'Depot QA Engineer',
      targetPest: record.primaryPest,
      priority: record.grade === 'GRADE_D' ? 'CRITICAL' : 'HIGH',
      status: 'PENDING_VISIT',
      scheduledDate: new Date().toISOString().split('T')[0],
      trapCount: 0,
      visualDefoliationPct: 0,
      scoutingNotes: 'Urgent QA inspection dispatched following moisture/thermal sensor anomaly.',
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
        onNavigateTab={handleTabSelect}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Top Row: Brand & Stakeholders */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-900 text-sm">JaivikSuraksha (জৈৱিক সুৰক্ষা)</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-1.5 py-0.5 rounded font-mono font-bold">NESFIC-I-04</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  North-East Bioenergy Feedstock Chain — Monsoon Biomass Preservation & Biorefinery Waste Valorisation
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
              <span className="font-semibold text-slate-800">Stakeholder Alignment:</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Government of Assam</span>
              <span>•</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">MC² Foundation</span>
              <span>•</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Assam Bio-Refinery Pvt. Ltd. (Numaligarh / NRL)</span>
              <span>•</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">AEDA</span>
            </div>
          </div>

          {/* Quick Action Navigation & PDF Download Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsTutorialOpen(true)}
                className="flex items-center space-x-1 text-emerald-700 hover:text-emerald-900 font-semibold"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Interactive Tutorial & Guide</span>
              </button>
              <span className="text-slate-300">|</span>
              <a
                href="https://github.com/flugelsoft-01/nesfic-i04-bioenergy-feedstock-chain"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-slate-700 hover:text-slate-900 font-semibold"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
              </a>
              <span className="text-slate-300">|</span>
              <a
                href="https://nesfic-i04-bioenergy-feedstock-chain.pages.dev/"
                className="flex items-center space-x-1 text-slate-700 hover:text-slate-900 font-semibold"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Production URL: nesfic-i04-bioenergy-feedstock-chain.pages.dev</span>
              </a>
            </div>

            <div className="flex items-center space-x-2 text-[11px]">
              <a
                href="/NESFIC_I04_Proposal_Kalyanjit_Hatibaruah.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-blue-700 hover:text-blue-900 font-semibold underline"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Proposal PDF (18pp)</span>
              </a>
              <span className="text-slate-300">•</span>
              <a
                href="/NESFIC_I04_Proof_of_Work_Kalyanjit_Hatibaruah.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-blue-700 hover:text-blue-900 font-semibold underline"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Proof of Work PDF (9pp)</span>
              </a>
            </div>
          </div>

          {/* Official Disclaimer Box */}
          <div className="p-3.5 rounded-lg bg-amber-50/70 border border-amber-200/80 text-amber-950 text-[11px] leading-relaxed">
            <div className="flex items-start space-x-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <strong className="font-bold text-amber-900">Disclaimer: </strong>
                JaivikSuraksha (জৈৱিক সুৰক্ষা) is an open innovation proposal, technical architecture, and decision-support prototype developed for the <strong>North East Seva First Innovation Challenge (NESFIC 2026)</strong> under Problem Statement <strong>NESFIC-I-04</strong> (<em>Securing the North-East Bioenergy Feedstock Chain — Biomass Preservation Through the Monsoon and Valorisation of Bio-Refinery Waste Streams</em>). All empirical ensilage kinetics, dry-matter preservation models, LoRaWAN multi-depth spear telemetry, satellite multispectral indexes, biorefinery mass-balance allocations, and farmer direct benefit transfer (DBT) calculators are engineered for technological demonstration, scientific feasibility validation, and competitive jury evaluation. References to institutional entities (Government of Assam, MC² Foundation, Assam Bio-Refinery Pvt. Ltd. / ABRPL, Numaligarh Refinery Limited / NRL, AEDA, and IIT Guwahati) represent challenge problem statement alignment and do not constitute formal commercial warranty prior to statutory stage-gate sanction.
              </div>
            </div>
          </div>

          {/* Bottom Bar: Lead Applicant & Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 text-slate-500 font-mono text-[11px]">
            <div>
              <span className="font-semibold text-slate-700">Lead Applicant: </span>
              <span className="text-emerald-700 font-bold">Kalyanjit Hatibaruah</span>
              <span className="text-slate-400"> (Lead Systems Architect &amp; Principal Investigator)</span>
            </div>

            <div className="text-slate-600">
              &copy; {new Date().getFullYear()} <strong className="font-semibold text-slate-800">Flugelsoft Labs</strong>. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
