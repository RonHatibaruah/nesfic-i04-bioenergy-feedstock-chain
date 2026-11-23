import React, { useState } from 'react';
import { 
  X, 
  Flame, 
  Layers, 
  Factory, 
  ShieldCheck,
  Recycle,
  Droplets,
  Coins,
  HelpCircle,
  PlayCircle,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Activity,
  ClipboardCheck,
  Radio,
  Sliders,
  Thermometer
} from 'lucide-react';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab?: (tab: 'dashboard' | 'gis-map' | 'field-verification' | 'citizen-portal' | 'drone-tech' | 'admin') => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({ isOpen, onClose, onNavigateTab }) => {
  const [activeTab, setActiveTab] = useState<'WHAT_IT_DOES' | 'HOW_TO_USE' | 'INTERACTIVE_DEMO'>('WHAT_IT_DOES');

  if (!isOpen) return null;

  const handleGoToModule = (tab: 'dashboard' | 'gis-map' | 'field-verification' | 'citizen-portal' | 'drone-tech' | 'admin') => {
    if (onNavigateTab) {
      onNavigateTab(tab);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-950 px-6 py-4 border-b border-slate-800 flex justify-between items-center text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Flame className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white">
                  JaivikSuraksha (জৈৱিক সুৰক্ষা) — Application Tutorial & User Guide
                </h3>
                <span className="text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono font-bold">
                  NESFIC-I-04
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Industry Track (MC² Foundation) • Biomass Preservation Through the Monsoon & Biorefinery Waste Valorisation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="bg-slate-100 px-6 pt-3 border-b border-slate-200 flex gap-2">
          <button
            onClick={() => setActiveTab('WHAT_IT_DOES')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'WHAT_IT_DOES'
                ? 'bg-white text-emerald-900 border-t-2 border-emerald-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>1. What the Application Does</span>
          </button>

          <button
            onClick={() => setActiveTab('HOW_TO_USE')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'HOW_TO_USE'
                ? 'bg-white text-emerald-900 border-t-2 border-emerald-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <PlayCircle className="w-4 h-4 text-emerald-600" />
            <span>2. How to Use the Application (Step-by-Step)</span>
          </button>

          <button
            onClick={() => setActiveTab('INTERACTIVE_DEMO')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'INTERACTIVE_DEMO'
                ? 'bg-white text-emerald-900 border-t-2 border-emerald-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>3. Interactive Features to Try</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 max-h-[calc(92vh-140px)]">
          
          {/* TAB 1: WHAT IT DOES */}
          {activeTab === 'WHAT_IT_DOES' && (
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Executive Problem & Strategic Mandate (NESFIC-I-04)</span>
                </div>
                <p className="leading-relaxed text-slate-700">
                  Northeast India generates over 12 million tonnes of seasonal biomass (paddy straw, bamboo residues, mustard stover). However, prolonged monsoons (2,000–4,000 mm rainfall, &gt;85–95% RH) rot stored stockpiles and trigger exothermic self-heating fires. This collapses biorefinery capacity (Plant Load Factor drops below 50% during wet months) and leaves secondary waste streams (hydrolysis lignin and digestate slurry) as costly liabilities.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2.5">
                  <div className="font-extrabold text-emerald-900 text-sm flex items-center gap-2">
                    <Flame className="w-4 h-4 text-emerald-600" />
                    <span>Pillar A: Monsoon Biomass Preservation</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-700">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Biological Anaerobic Ensiling:</strong> Inoculation with <em>Lactobacillus plantarum</em> drops pH to &lt;4.0 within 72h, locking 95%+ glucan/xylan polymers without fuel-heavy drying.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Parasitic Flue-Gas Drying:</strong> Harnesses 140°C boiler stack heat to pre-dry straw to &lt;12% moisture with hydrophobic botanical anti-humidity coating.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>LoRaWAN IoT Smart Probes:</strong> 1.8m multi-depth spears track core temp, moisture & CO2, triggering automatic N2 inert gas fire prevention.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/50 space-y-2.5">
                  <div className="font-extrabold text-teal-900 text-sm flex items-center gap-2">
                    <Recycle className="w-4 h-4 text-teal-600" />
                    <span>Pillar B: Biorefinery Waste Upcycling</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-700">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span><strong>Lignin-to-Bio-Bitumen:</strong> Purifies sulfur-free enzymatic hydrolysis lignin into a 20% VG-30 asphalt extender meeting IRC:SP:53 road standards.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span><strong>Digestate to Fortified FOM:</strong> Anaerobic digestate cake enriched with regional <em>Azotobacter</em> for Assam tea garden organic nutrition.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span><strong>Closed-Loop Parasitic Biogas:</strong> Converts 500 m³ daily process wastewater into 4,200 m³ green biomethane to power feedstock dryers.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Target Industrial Partners & Off-Takers:</span>
                  <span className="text-slate-600">Assam Bio-Refinery Pvt. Ltd. (Numaligarh / NRL), SATAT CBG developers, PWD Assam & Regional Tea Planters.</span>
                </div>
                <button
                  onClick={() => setActiveTab('HOW_TO_USE')}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <span>See How to Use</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: HOW TO USE */}
          {activeTab === 'HOW_TO_USE' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                The platform is divided into 6 specialized modules accessible from the main navigation bar. Here is the operational walkthrough for each module:
              </p>

              <div className="space-y-3">
                {/* Module 1 */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-all flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 shrink-0 font-bold font-mono text-xs">
                    01
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-900">Executive Feedstock Dashboard</h4>
                      <button 
                        onClick={() => handleGoToModule('dashboard')}
                        className="text-emerald-700 hover:underline font-bold text-[11px] flex items-center gap-1"
                      >
                        Open Dashboard &rarr;
                      </button>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      View real-time aggregated biomass inventory (MT), the composite Biomass Quality & Rot Vulnerability Index (BQVI 0–100), active self-heating fire alarms, and continuous refinery buffer runway days. Filter by Assam district supply sheds.
                    </p>
                  </div>
                </div>

                {/* Module 2 */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-all flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-sky-100 text-sky-800 shrink-0 font-bold font-mono text-xs">
                    02
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-900">Feedstock WebGIS & Supply Sheds</h4>
                      <button 
                        onClick={() => handleGoToModule('gis-map')}
                        className="text-sky-700 hover:underline font-bold text-[11px] flex items-center gap-1"
                      >
                        Open WebGIS &rarr;
                      </button>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Explore interactive geospatial polygons for decentralized cluster depots across Golaghat/Numaligarh, Nagaon, Kamrup, Barpeta, and Tinsukia. Toggle layers for BQVI quality scores, moisture heatmaps, and core temperature probes.
                    </p>
                  </div>
                </div>

                {/* Module 3 */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-all flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0 font-bold font-mono text-xs">
                    03
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-900">Depot QA & Moisture Triage Portal</h4>
                      <button 
                        onClick={() => handleGoToModule('field-verification')}
                        className="text-amber-700 hover:underline font-bold text-[11px] flex items-center gap-1"
                      >
                        Open Depot QA &rarr;
                      </button>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Field workstation for depot inspectors: input handheld RF moisture readings and probe temperatures, click "Run Algorithmic Triage" to auto-route consignments to anaerobic bunker silos vs dry briquette sheds, and sign digital QA certificates.
                    </p>
                  </div>
                </div>

                {/* Module 4 */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-all flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 shrink-0 font-bold font-mono text-xs">
                    04
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-900">Farmer Off-Take Portal ("Jaivik Seva")</h4>
                      <button 
                        onClick={() => handleGoToModule('citizen-portal')}
                        className="text-emerald-700 hover:underline font-bold text-[11px] flex items-center gap-1"
                      >
                        Open Jaivik Seva &rarr;
                      </button>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Bilingual citizen portal in <strong>Assamese (অসমীয়া)</strong> and English. Farmers and FPOs calculate guaranteed DBT payouts (base ₹2,200/MT), schedule pickup, view carbon offset credits, and print verified procurement slips.
                    </p>
                  </div>
                </div>

                {/* Module 5 */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-all flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-teal-100 text-teal-800 shrink-0 font-bold font-mono text-xs">
                    05
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-900">Biorefinery Waste Valorisation Suite</h4>
                      <button 
                        onClick={() => handleGoToModule('drone-tech')}
                        className="text-teal-700 hover:underline font-bold text-[11px] flex items-center gap-1"
                      >
                        Open Waste Suite &rarr;
                      </button>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Track the circular conversion of enzymatic lignin cake into VG-30 bio-bitumen extender (14.8 kN Marshall stability), digestate into FCO-compliant tea organic manure (FOM), and process wastewater into green biomethane fuel.
                    </p>
                  </div>
                </div>

                {/* Module 6 */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-all flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 text-purple-800 shrink-0 font-bold font-mono text-xs">
                    06
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-900">Industrial SCADA Control Room</h4>
                      <button 
                        onClick={() => handleGoToModule('admin')}
                        className="text-purple-700 hover:underline font-bold text-[11px] flex items-center gap-1"
                      >
                        Open SCADA Console &rarr;
                      </button>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Industrial command room featuring sensor calibration, LoRaWAN telemetry ingestion rules, automated nitrogen purge overrides, and an immutable SHA-256 cryptographic audit ledger for carbon credits.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INTERACTIVE DEMO */}
          {activeTab === 'INTERACTIVE_DEMO' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                <h4 className="font-bold text-emerald-950 text-xs mb-1">
                  Try These 3 Interactive Features in the Live App:
                </h4>
                <p className="text-[11px] text-emerald-800">
                  You can explore real-time simulations designed specifically to showcase the NESFIC-I-04 solution to evaluators.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                  <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Demo 1
                  </span>
                  <h5 className="font-bold text-slate-900 text-xs">Test the DBT Calculator</h5>
                  <p className="text-[11px] text-slate-600">
                    Go to <strong>Farmer Off-Take (Jaivik Seva)</strong>, change the estimated straw tonnage from 15 to 40 tonnes, and see instant DBT payout and carbon offset recalculations.
                  </p>
                  <button
                    onClick={() => handleGoToModule('citizen-portal')}
                    className="w-full py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs transition-colors"
                  >
                    Try Calculator
                  </button>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                  <span className="font-mono text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                    Demo 2
                  </span>
                  <h5 className="font-bold text-slate-900 text-xs">Switch WebGIS Layers</h5>
                  <p className="text-[11px] text-slate-600">
                    Open <strong>Feedstock WebGIS</strong>, click between "BQVI Index", "Moisture %", and "Core Temp °C" to see spatial risk distribution across Assam cluster depots.
                  </p>
                  <button
                    onClick={() => handleGoToModule('gis-map')}
                    className="w-full py-1.5 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-lg text-xs transition-colors"
                  >
                    Explore WebGIS
                  </button>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                  <span className="font-mono text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                    Demo 3
                  </span>
                  <h5 className="font-bold text-slate-900 text-xs">Inspect Overheating Alarm</h5>
                  <p className="text-[11px] text-slate-600">
                    Click the <strong>Azara Pod Alpha</strong> alert on the Executive Dashboard or Depot QA roster to inspect 56.4°C core temperature and trigger emergency N2 inert gas purging.
                  </p>
                  <button
                    onClick={() => handleGoToModule('field-verification')}
                    className="w-full py-1.5 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-lg text-xs transition-colors"
                  >
                    Inspect Alarm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex justify-between items-center">
          <span className="text-xs text-slate-500 font-mono">
            Platform Version: v2.4 (NESFIC-I-04 Production)
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            Close & Continue Exploring
          </button>
        </div>
      </div>
    </div>
  );
};
