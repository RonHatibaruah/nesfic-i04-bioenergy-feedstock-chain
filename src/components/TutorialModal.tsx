import React from 'react';
import { 
  X, 
  Sprout, 
  Layers, 
  Satellite, 
  Bug, 
  Radio, 
  ShieldCheck,
  Building2,
  Plane
} from 'lucide-react';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center text-slate-900">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                NESFIC-D-11 Solution Architecture & Operational Guide
              </h3>
              <p className="text-xs text-slate-500">
                Crop Health Monitoring, Pest & Disease Forecasting and Location-Specific Advisory
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          {/* Overview */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Challenge Mandate & Strategic Purpose</span>
            </div>
            <p className="leading-relaxed text-slate-700">
              Under <strong>NESFIC-D-11</strong>, the <strong>Department of Agriculture</strong> and the <strong>Assam State Space Application Centre (ASSAC)</strong> require a state-wide space-to-ground intelligence platform. Traditional agricultural extension is reactive: pest outbreaks like Rice Blast and Stem Borer cause up to 35% crop loss before field officers reach affected plots.
            </p>
            <p className="leading-relaxed text-slate-700">
              <strong>SasyaSwasthya inverts this paradigm</strong> into continuous space-to-ground surveillance: combining 10m Sentinel-2 multispectral vegetation indices, sub-5cm drone orthomosaics, IMD meteorological telemetry, and mobile field ground-truthing into automated 72-hour early warnings and bilingual advisories.
            </p>
          </div>

          {/* 4 Pillars of Architecture */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Core Architectural Pillars
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-emerald-800 flex items-center gap-1.5">
                  <Satellite className="w-4 h-4 text-emerald-600" />
                  <span>1. Multi-Spectral Space Telemetry</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Continuous 5-day Sentinel-2A/2B and Landsat pass ingestion. Computes NDVI (canopy vigor), NDWI (waterlogging/drought stress), and SAVI with automated cloud-masking.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-sky-800 flex items-center gap-1.5">
                  <Bug className="w-4 h-4 text-sky-600" />
                  <span>2. Epidemiological Forecast Engine</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Machine learning models integrating Growing Degree Days (GDD), morning relative humidity &gt;88%, and rainfall to anticipate Rice Blast and Stem Borer outbreaks 5 days in advance.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-amber-800 flex items-center gap-1.5">
                  <Radio className="w-4 h-4 text-amber-600" />
                  <span>3. Bilingual Hyper-Local Advisory</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Automated generation of targeted advisories in <strong>Assamese (অসমীয়া)</strong> and English, providing specific bio-control formulations (Trichoderma, NSKE 5%) and drainage instructions.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-purple-800 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-purple-600" />
                  <span>4. Field Ground-Truthing PWA</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Offline-capable Progressive Web App for Agricultural Development Officers (ADO) featuring sub-meter GPS plot geofencing and on-device AI leaf symptom classification.
                </p>
              </div>
            </div>
          </div>

          {/* User Guide per Tab */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Application Navigation Guide
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span><strong>Executive Agro-Dashboard:</strong> Real-time overview of monitored acreage, state crop health index, and high-risk outbreak hotspots.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span><strong>Satellite & Drone WebGIS:</strong> Interactive Leaflet map with NDVI/NDWI layers, parcel boundaries, and pest risk corridors.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span><strong>Field Scouting & PWA:</strong> Mobile interface for extension officers to verify traps, take photos, and run edge AI diagnostics.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span><strong>Farmer Advisory (Sasya Seva):</strong> Public portal for farmers to search their village and download bilingual advisory bulletins.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span><strong>Drone Technology & Hardware:</strong> Multi-rotor and VTOL UAV specs, 5-band multispectral sensors, RTK GNSS avionics, onboard Jetson Edge AI, and Assam field adaptations.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span><strong>Command & Admin Console:</strong> Role-based access for ASSAC analysts, DAOs, and AAU scientists to tune models, manage drone fleets, and dispatch emergency broadcasts.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex justify-between items-center text-xs">
          <span className="text-slate-500">
            Assam Innovation & Startup Foundation (AISF) • NESFIC 2026
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors shadow-xs"
          >
            Got it, Proceed to App
          </button>
        </div>
      </div>
    </div>
  );
};
