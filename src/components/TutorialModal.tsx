import React from 'react';
import { 
  X, 
  Flame, 
  Layers, 
  Factory, 
  ShieldCheck,
  Recycle,
  Droplets,
  Coins
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
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                NESFIC-I-04 Solution Architecture & Operational Guide
              </h3>
              <p className="text-xs text-slate-500">
                Securing the North-East Bioenergy Feedstock Chain — Biomass Preservation & Waste Valorisation (MC² Foundation)
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
              <span>Challenge Mandate & Strategic Purpose (NESFIC-I-04)</span>
            </div>
            <p className="leading-relaxed text-slate-700">
              Sponsored by the <strong>MC² Foundation</strong> under the Industry Track of NESFIC 2026, <strong>NESFIC-I-04</strong> tackles the most severe operational bottleneck facing bioenergy and 2G bio-refineries (such as Assam Bio-Refinery Pvt. Ltd. at Numaligarh) in Northeast India: <strong>catastrophic monsoon biomass degradation and lack of secondary waste stream valorisation</strong>.
            </p>
            <p className="leading-relaxed text-slate-700">
              With 2,000–4,000 mm of annual rainfall and persistent &gt;85–95% relative humidity, unsealed stored biomass rots or self-heats into spontaneous combustion fires, causing 30–45% dry-matter loss and forcing refineries into seasonal feedstock starvation (PLF dropping below 50%).
            </p>
          </div>

          {/* Core Technical Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="font-bold text-emerald-800 text-sm flex items-center gap-2">
                <Flame className="w-4 h-4 text-emerald-600" />
                <span>Pillar 1: Monsoon Preservation & IoT Buffer Hubs</span>
              </div>
              <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                <li><strong>Anaerobic Lactic Ensiling:</strong> Inoculation with <em>Lactobacillus plantarum</em> drops pH to &lt;4.0 within 72 hours, arresting fungal rot and preserving structural glucan/xylan.</li>
                <li><strong>Parasitic Flue-Gas Drying:</strong> Harnesses 140°C refinery waste heat to dry straw to &lt;12% moisture with hydrophobic botanical coating.</li>
                <li><strong>LoRaWAN IoT Smart Spears:</strong> Multi-depth SS316 probes track moisture, core temp, and CO2, triggering automated N2 purging before fire danger.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="font-bold text-teal-800 text-sm flex items-center gap-2">
                <Recycle className="w-4 h-4 text-teal-600" />
                <span>Pillar 2: Biorefinery Waste Stream Upcycling</span>
              </div>
              <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                <li><strong>Lignin-to-Bio-Bitumen:</strong> Purifies sulfur-free enzymatic hydrolysis lignin cake into a 20% VG-30 asphalt extender for monsoon-resilient hill roads.</li>
                <li><strong>Digestate into Fortified FOM:</strong> Anaerobic digestion slurry converted into certified organic fertilizer enriched with <em>Azotobacter</em> for tea gardens.</li>
                <li><strong>Parasitic Biomethane:</strong> High-COD process wastewater digested into green biogas, powering rotary feedstock pre-dryers.</li>
              </ul>
            </div>
          </div>

          {/* User Guide */}
          <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 space-y-2">
            <h4 className="font-bold text-emerald-950 text-xs flex items-center gap-2">
              <Coins className="w-4 h-4 text-emerald-700" />
              <span>How to Navigate the Interactive Prototype:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-emerald-900">
              <div className="p-2 bg-white rounded-lg border border-emerald-200">
                <strong>1. Executive Dashboard:</strong> Real-time statewide tonnage, average BQVI score, and refinery buffer days.
              </div>
              <div className="p-2 bg-white rounded-lg border border-emerald-200">
                <strong>2. Supply Shed WebGIS:</strong> Click depot cluster polygons across Golaghat, Nagaon, Kamrup to view live sensor telemetry.
              </div>
              <div className="p-2 bg-white rounded-lg border border-emerald-200">
                <strong>3. Farmer & Waste Suites:</strong> Explore the vernacular Assamese/English off-take portal and circular waste mass-balance models.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            Explore System Prototype
          </button>
        </div>
      </div>
    </div>
  );
};
