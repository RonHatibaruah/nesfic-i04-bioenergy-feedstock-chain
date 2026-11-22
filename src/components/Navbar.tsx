import React from 'react';
import { Sprout, Map, ClipboardCheck, Radio, Activity, BookOpen, Sliders, AlertTriangle } from 'lucide-react';

export type ActiveTab = 'dashboard' | 'gis-map' | 'field-verification' | 'citizen-portal' | 'admin';

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
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 shadow-md">
      {/* Top Government Banner */}
      <div className="bg-slate-950 px-4 py-1.5 text-xs text-slate-300 flex flex-wrap justify-between items-center border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-medium text-slate-200">Government of Assam</span>
          <span className="text-slate-500">•</span>
          <span>Dept. of Agriculture & ASSAC (Science & Tech)</span>
          <span className="text-slate-500">•</span>
          <span className="text-amber-400 font-semibold">NESFIC-D-11 Challenge Solution</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-slate-400">Sentinel-2 & Drone Space-to-Ground Telemetry</span>
          <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded text-[11px] font-mono">
            {totalRecords} Plots Monitored
          </span>
          {criticalCount > 0 && (
            <span className="bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 animate-pulse">
              <AlertTriangle className="w-3 h-3 text-rose-400" />
              {criticalCount} Outbreak Warnings
            </span>
          )}
        </div>
      </div>

      {/* Main App Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-900/40">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  SasyaSwasthya <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-normal">শস্য স্বাস্থ্য</span>
                </h1>
              </div>
              <p className="text-xs text-slate-400">
                Crop Health Monitoring, Pest Forecasting & Location-Specific Agro-Advisory Engine
              </p>
            </div>
          </div>

          {/* Quick Filter & Actions */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
              <span className="text-slate-400">District:</span>
              <select
                aria-label="Filter records by Assam District"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="bg-transparent text-emerald-400 font-medium focus:outline-none cursor-pointer"
              >
                <option value="ALL" className="bg-slate-800 text-white">All Assam Agro-Zones</option>
                <option value="Kamrup Rural" className="bg-slate-800 text-white">Kamrup Rural (Azara/Rani)</option>
                <option value="Nagaon" className="bg-slate-800 text-white">Nagaon (Raha/Kaliabor)</option>
                <option value="Jorhat" className="bg-slate-800 text-white">Jorhat (Titabor AAU Hub)</option>
                <option value="Barpeta" className="bg-slate-800 text-white">Barpeta (Howly/Mandia)</option>
                <option value="Sonitpur" className="bg-slate-800 text-white">Sonitpur (Dhekiajuli)</option>
                <option value="Cachar" className="bg-slate-800 text-white">Cachar (Silchar/Barak Valley)</option>
                <option value="Dhubri" className="bg-slate-800 text-white">Dhubri (Bilasipara Chars)</option>
                <option value="Golaghat" className="bg-slate-800 text-white">Golaghat (Bokakhat)</option>
              </select>
            </div>

            <button
              onClick={onOpenTutorial}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/50 text-xs font-medium transition-all shadow-sm"
              title="Open System Architecture Guide"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>D-11 Guide</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex space-x-1 mt-4 overflow-x-auto pb-1 border-b border-slate-800 scrollbar-none">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-t-lg text-xs font-medium transition-colors whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'bg-slate-800 text-emerald-400 border-b-2 border-emerald-500 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Executive Agro-Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('gis-map')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-t-lg text-xs font-medium transition-colors whitespace-nowrap ${
              activeTab === 'gis-map'
                ? 'bg-slate-800 text-emerald-400 border-b-2 border-emerald-500 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>Satellite & Drone WebGIS</span>
          </button>

          <button
            onClick={() => setActiveTab('field-verification')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-t-lg text-xs font-medium transition-colors whitespace-nowrap ${
              activeTab === 'field-verification'
                ? 'bg-slate-800 text-emerald-400 border-b-2 border-emerald-500 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <ClipboardCheck className="w-4 h-4" />
            <span>Field Scouting & PWA</span>
          </button>

          <button
            onClick={() => setActiveTab('citizen-portal')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-t-lg text-xs font-medium transition-colors whitespace-nowrap ${
              activeTab === 'citizen-portal'
                ? 'bg-slate-800 text-emerald-400 border-b-2 border-emerald-500 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>Farmer Advisory (Sasya Seva)</span>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-t-lg text-xs font-medium transition-colors whitespace-nowrap ${
              activeTab === 'admin'
                ? 'bg-slate-800 text-amber-400 border-b-2 border-amber-500 shadow-sm'
                : 'text-slate-400 hover:text-amber-300 hover:bg-slate-800/50'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Command & Admin Console</span>
          </button>
        </div>
      </div>
    </header>
  );
};
