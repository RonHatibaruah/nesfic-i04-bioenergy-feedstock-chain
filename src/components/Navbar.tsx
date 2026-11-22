import React from 'react';
import { Sprout, Map, ClipboardCheck, Radio, Activity, BookOpen, Sliders, AlertTriangle, Plane } from 'lucide-react';

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
      {/* Top Government Official Banner */}
      <div className="bg-slate-900 px-4 py-1.5 text-xs text-slate-300 flex flex-wrap justify-between items-center border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-slate-100">Government of Assam</span>
          <span className="text-slate-500">•</span>
          <span>Dept. of Agriculture & ASSAC (Science & Tech)</span>
          <span className="text-slate-500">•</span>
          <span className="text-amber-400 font-semibold">NESFIC-D-11 Challenge Solution</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-slate-400 hidden sm:inline">Sentinel-2 & Drone Space-to-Ground Telemetry</span>
          <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded text-[11px] font-mono">
            {totalRecords} Plots Monitored
          </span>
          {criticalCount > 0 && (
            <span className="bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 animate-pulse">
              <AlertTriangle className="w-3 h-3 text-rose-400" />
              {criticalCount} Outbreaks
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
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
                  SasyaSwasthya <span className="text-xs bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full font-semibold">শস্য স্বাস্থ্য</span>
                </h1>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Crop Health Monitoring, Pest Forecasting & Location-Specific Agro-Advisory Engine
              </p>
            </div>
          </div>

          {/* Quick Filter & Actions */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500 font-medium">District:</span>
              <select
                aria-label="Filter records by Assam District"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="bg-transparent text-emerald-800 font-bold focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Assam Agro-Zones</option>
                <option value="Kamrup Rural">Kamrup Rural (Azara/Rani)</option>
                <option value="Nagaon">Nagaon (Raha/Kaliabor)</option>
                <option value="Jorhat">Jorhat (Titabor AAU Hub)</option>
                <option value="Barpeta">Barpeta (Howly/Mandia)</option>
                <option value="Sonitpur">Sonitpur (Dhekiajuli)</option>
                <option value="Cachar">Cachar (Silchar/Barak Valley)</option>
                <option value="Dhubri">Dhubri (Bilasipara Chars)</option>
                <option value="Golaghat">Golaghat (Bokakhat)</option>
              </select>
            </div>

            <button
              onClick={onOpenTutorial}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-semibold transition-all shadow-xs"
              title="Open System Architecture Guide"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              <span>D-11 Guide</span>
            </button>
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
            <span>Executive Agro-Dashboard</span>
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
            <span>Satellite & Drone WebGIS</span>
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
            <span>Field Scouting & PWA</span>
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
            <span>Farmer Advisory (Sasya Seva)</span>
          </button>

          <button
            onClick={() => setActiveTab('drone-tech')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-t-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'drone-tech'
                ? 'bg-slate-100 text-emerald-800 border-b-2 border-emerald-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Plane className="w-4 h-4 text-emerald-600" />
            <span>Drone Technology</span>
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
            <span>Command & Admin Console</span>
          </button>
        </div>
      </div>
    </header>
  );
};
