import React from 'react';
import { Sprout, Map, ClipboardCheck, Radio, Activity, BookOpen, Sliders, AlertTriangle, Recycle, Flame, HelpCircle, Github } from 'lucide-react';

export type ActiveTab = 'dashboard' | 'gis-map' | 'field-verification' | 'citizen-portal' | 'drone-tech' | 'admin';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  totalRecords: number;
  criticalCount: number;
  onOpenTutorial: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedDistrict,
  setSelectedDistrict,
  totalRecords,
  criticalCount,
  onOpenTutorial
}) => {
  return (
    <header className="bg-white text-slate-900 border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      {/* Top Government & Industry Partner Official Banner */}
      <div className="bg-slate-900 px-4 py-1.5 text-xs text-slate-300 flex flex-wrap justify-between items-center border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-slate-100">Government of Assam</span>
          <span className="text-slate-500">•</span>
          <span>Industry Track Sponsored by MC² Foundation</span>
          <span className="text-slate-500">•</span>
          <span className="text-emerald-400 font-semibold">NESFIC-I-04 Solution</span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">Assam Bio-Refinery (NRL) Ecosystem</span>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={onOpenTutorial}
            className="text-emerald-300 hover:text-white underline text-[11px] font-semibold flex items-center gap-1 transition-colors"
          >
            <span>Tutorial: What It Does & How to Use</span>
          </button>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <a
            href="https://github.com/flugelsoft-01/nesfic-i04-bioenergy-feedstock-chain"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-white text-[11px] font-medium flex items-center gap-1 transition-colors hidden sm:flex"
          >
            <Github className="w-3 h-3 text-slate-400" />
            <span>flugelsoft-01/nesfic-i04-bioenergy-feedstock-chain</span>
          </a>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">IoT LoRaWAN Sensor Spears & Biorefinery Grid</span>
          <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded text-[11px] font-mono">
            {totalRecords} Depots & Silos Active
          </span>
          {criticalCount > 0 && (
            <span className="bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 animate-pulse">
              <AlertTriangle className="w-3 h-3 text-rose-400" />
              {criticalCount} Overheating Alerts
            </span>
          )}
        </div>
      </div>

      {/* Main App Navigation - Clean White Theme */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-700/20">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
                  JaivikSuraksha <span className="text-xs bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full font-semibold">জৈৱিক সুৰক্ষা</span>
                </h1>
                <span className="text-xs bg-blue-100 text-blue-800 border border-blue-200 px-2 py-0.5 rounded font-mono font-bold">NESFIC-I-04</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                North-East Bioenergy Feedstock Chain — Monsoon Biomass Preservation & Biorefinery Waste Valorisation
              </p>
            </div>
          </div>

          {/* Quick Filter & Actions */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500 font-medium">Bioenergy Supply Shed:</span>
              <select
                aria-label="Filter records by Assam District Supply Shed"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="bg-transparent text-emerald-800 font-bold focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Assam Supply Sheds (35 Dists)</option>
                <option value="Golaghat">Golaghat (Numaligarh 2G Hub)</option>
                <option value="Nagaon">Nagaon (Kaliabor / SATAT CBG)</option>
                <option value="Kamrup Rural">Kamrup Rural (Azara / Guwahati)</option>
                <option value="Barpeta">Barpeta (Howly / Dense Straw)</option>
                <option value="Tinsukia">Tinsukia (Doomdooma / Tea Waste)</option>
                <option value="Cachar">Cachar (Silchar / Barak Valley)</option>
              </select>
            </div>

            <button
              onClick={onOpenTutorial}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
              title="Open Application Tutorial: What It Does & How to Use"
            >
              <HelpCircle className="w-4 h-4 text-emerald-200" />
              <span>Tutorial: How to Use</span>
            </button>

            <a
              href="https://github.com/flugelsoft-01/nesfic-i04-bioenergy-feedstock-chain"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-all shadow-xs"
              title="Open GitHub Repository (flugelsoft-01/nesfic-i04-bioenergy-feedstock-chain)"
            >
              <Github className="w-4 h-4 text-slate-300" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex space-x-1 mt-3.5 overflow-x-auto pb-1 border-b border-slate-200 scrollbar-none">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-t-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'bg-slate-100 text-emerald-800 border-b-2 border-emerald-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>Executive Feedstock Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('gis-map')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-t-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'gis-map'
                ? 'bg-slate-100 text-emerald-800 border-b-2 border-emerald-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Map className="w-4 h-4 text-emerald-600" />
            <span>Feedstock WebGIS & Supply Sheds</span>
          </button>

          <button
            onClick={() => setActiveTab('field-verification')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-t-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'field-verification'
                ? 'bg-slate-100 text-emerald-800 border-b-2 border-emerald-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <ClipboardCheck className="w-4 h-4 text-emerald-600" />
            <span>Depot QA & Moisture Triage</span>
          </button>

          <button
            onClick={() => setActiveTab('citizen-portal')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-t-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'citizen-portal'
                ? 'bg-slate-100 text-emerald-800 border-b-2 border-emerald-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Radio className="w-4 h-4 text-emerald-600" />
            <span>Farmer Off-Take (Jaivik Seva)</span>
          </button>

          <button
            onClick={() => setActiveTab('drone-tech')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-t-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'drone-tech'
                ? 'bg-slate-100 text-emerald-800 border-b-2 border-emerald-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Recycle className="w-4 h-4 text-emerald-600" />
            <span>Biorefinery Waste Valorisation</span>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-t-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'admin'
                ? 'bg-slate-100 text-amber-800 border-b-2 border-amber-600 shadow-xs'
                : 'text-slate-600 hover:text-amber-700 hover:bg-slate-50'
            }`}
          >
            <Sliders className="w-4 h-4 text-amber-600" />
            <span>Industrial SCADA Control Room</span>
          </button>
        </div>
      </div>
    </header>
  );
};
