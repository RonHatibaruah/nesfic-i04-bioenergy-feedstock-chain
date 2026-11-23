import React, { useState } from 'react';
import { 
  Recycle, 
  Flame, 
  Layers, 
  CheckCircle2, 
  Activity, 
  Droplets, 
  Zap, 
  Factory, 
  ShieldCheck, 
  TrendingUp, 
  FileText,
  Sliders
} from 'lucide-react';

export const DroneTechnologyPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'LIGNIN_BITUMEN' | 'FOM_FERTILIZER' | 'PARASITIC_BIOGAS' | 'MASS_BALANCE'>('LIGNIN_BITUMEN');

  return (
    <div className="space-y-6">
      {/* Page Title & Context Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-2">
              <Recycle className="w-3.5 h-3.5 text-emerald-600" />
              <span>MC² Foundation & Assam Bio-Refinery (ABRPL) • Circular Bioeconomy Directorate</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Biorefinery Secondary Waste Stream Valorisation & Process Suite
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Industrial process engineering for turning low-value secondary biorefinery residues (enzymatic hydrolysis lignin, anaerobic digestate slurry, process condensates) into high-value bio-bitumen, certified organic fertilizers, and closed-loop parasitic drying heat under <strong>NESFIC-I-04</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold font-mono">
              100% Waste Circularity
            </span>
            <span className="px-3 py-1.5 bg-teal-50 text-teal-800 border border-teal-200 rounded-lg text-xs font-bold font-mono">
              Zero-Liquid-Discharge (ZLD)
            </span>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex space-x-2 mt-6 border-b border-slate-200 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveSection('LIGNIN_BITUMEN')}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeSection === 'LIGNIN_BITUMEN'
                ? 'bg-emerald-50 text-emerald-800 border-b-2 border-emerald-600'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Factory className="w-4 h-4 text-emerald-600" />
            <span>Lignin-to-Bio-Bitumen (VG-30)</span>
          </button>

          <button
            onClick={() => setActiveSection('FOM_FERTILIZER')}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeSection === 'FOM_FERTILIZER'
                ? 'bg-emerald-50 text-emerald-800 border-b-2 border-emerald-600'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Droplets className="w-4 h-4 text-emerald-600" />
            <span>Digestate to FOM Bio-Fertilizer</span>
          </button>

          <button
            onClick={() => setActiveSection('PARASITIC_BIOGAS')}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeSection === 'PARASITIC_BIOGAS'
                ? 'bg-emerald-50 text-emerald-800 border-b-2 border-emerald-600'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Zap className="w-4 h-4 text-emerald-600" />
            <span>Parasitic Drying & Biogas Loop</span>
          </button>

          <button
            onClick={() => setActiveSection('MASS_BALANCE')}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeSection === 'MASS_BALANCE'
                ? 'bg-emerald-50 text-emerald-800 border-b-2 border-emerald-600'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Commercial Plant Mass Balance</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Lignin-to-Bio-Bitumen */}
      {activeSection === 'LIGNIN_BITUMEN' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Factory className="w-5 h-5 text-emerald-600" />
              Sulfur-Free Enzymatic Hydrolysis Lignin Upcycling Pipeline
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unlike toxic Kraft lignin from black liquor paper mills, enzymatic hydrolysis lignin generated from 2G bio-ethanol operations (ABRPL Numaligarh) is 100% sulfur-free, high in Klason purity (&gt;82%), and enriched with phenolic hydroxyls (2.8 mmol/g). JaivikSuraksha blends micronized lignin at 20% by weight with VG-30 paving bitumen.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[11px] text-slate-500 font-medium">Marshall Stability</span>
                <div className="text-xl font-extrabold text-emerald-700 font-mono mt-0.5">14.8 kN</div>
                <span className="text-[10px] text-slate-500">Benchmark: &gt;11.5 kN</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[11px] text-slate-500 font-medium">Rutting Resistance (60°C)</span>
                <div className="text-xl font-extrabold text-teal-700 font-mono mt-0.5">+32%</div>
                <span className="text-[10px] text-slate-500">Superior High-Temp Life</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[11px] text-slate-500 font-medium">Fossil Bitumen Displaced</span>
                <div className="text-xl font-extrabold text-blue-700 font-mono mt-0.5">200 kg / MT</div>
                <span className="text-[10px] text-slate-500">Saves ₹14,500/MT</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <h4 className="text-xs font-bold text-slate-900 mb-2">Compounding Process Parameters:</h4>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Mechanical dewatering & vacuum flash drying to &lt;2.5% moisture</li>
                <li>High-shear rotor-stator blending at 4,500 RPM, 160°C ± 5°C</li>
                <li>0.5% bio-based maleic anhydride coupling agent for interfacial adhesion</li>
                <li>Certified under IRC:SP:53 and IS 73:2018 for heavy rainfall highway corridors</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Current Production Batch</h3>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-emerald-800 font-medium">Batch Number:</span>
                <span className="font-mono font-bold text-emerald-900">BATCH-LIG-2026-081</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-emerald-800 font-medium">Feedstock Source:</span>
                <span className="font-bold text-emerald-900">Assam Bamboo Offcuts</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-emerald-800 font-medium">Output Volume:</span>
                <span className="font-mono font-bold text-emerald-900">38.4 MT Bio-Bitumen</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-emerald-800 font-medium">Designated Route:</span>
                <span className="font-bold text-emerald-900">NH-37 Numaligarh Bypass</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-slate-800">Commercial Off-Taker:</div>
              <div className="text-slate-600">PWD Assam & Regional Infrastructure Developers</div>
              <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Laboratory Pavement Quality Clearance Signed
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: FOM Bio-Fertilizer */}
      {activeSection === 'FOM_FERTILIZER' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Droplets className="w-5 h-5 text-emerald-600" />
            Fermented Organic Manure (FOM) & Liquid Digestate Upcycling
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Spent digestate slurry from anaerobic biogas units is centrifuged into solid cake and liquid fraction (LFOM). The solid cake is fortified with rock phosphate, *Azotobacter*, and *Trichoderma viride* to supply organic tea estates in Golaghat, Jorhat, and Dibrugarh, fulfilling Fertilizer Control Order (FCO 1985) standards.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-xs text-slate-500 font-medium">Organic Carbon</span>
              <div className="text-2xl font-extrabold text-emerald-700 font-mono mt-1">21.4%</div>
              <span className="text-[10px] text-slate-400">Min Norm: 14%</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-xs text-slate-500 font-medium">Total NPK (N+P+K)</span>
              <div className="text-2xl font-extrabold text-emerald-700 font-mono mt-1">4.61%</div>
              <span className="text-[10px] text-slate-400">Min Norm: 3.0%</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-xs text-slate-500 font-medium">C:N Ratio</span>
              <div className="text-2xl font-extrabold text-blue-700 font-mono mt-1">11.6:1</div>
              <span className="text-[10px] text-slate-400">Optimal: &lt;18:1</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-xs text-slate-500 font-medium">Offtake Value</span>
              <div className="text-2xl font-extrabold text-teal-700 font-mono mt-1">₹6,500/MT</div>
              <span className="text-[10px] text-slate-400">Tea Estate Standard</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Parasitic Biogas & Drying Loop */}
      {activeSection === 'PARASITIC_BIOGAS' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-600" />
            Closed-Loop Parasitic Drying Heat & Biogas Integration
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Biorefinery process condensates with high chemical oxygen demand (COD: 12,000–25,000 mg/L) are digested in high-rate anaerobic upflow sludge bed (UASB) reactors to generate green biomethane. This biomethane, paired with 140°C boiler stack flue gas, powers the decentralized rotary flash dryers that pre-dry incoming wet monsoonal biomass to &lt;12% moisture.
          </p>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <span className="text-xs text-slate-500 font-medium">Parasitic Fuel Cost Saved</span>
              <div className="text-xl font-extrabold text-emerald-700 font-mono mt-1">₹420 / Tonne</div>
              <span className="text-[11px] text-slate-500">Zero auxiliary fossil fuel needed</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Daily Biogas Yield</span>
              <div className="text-xl font-extrabold text-teal-700 font-mono mt-1">4,200 m³ / day</div>
              <span className="text-[11px] text-slate-500">62% Methane purity</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Flue Heat Utilization</span>
              <div className="text-xl font-extrabold text-blue-700 font-mono mt-1">140°C Flue Stream</div>
              <span className="text-[11px] text-slate-500">Recovers 2.8 MJ/kg moisture</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Plant Mass Balance */}
      {activeSection === 'MASS_BALANCE' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            Commercial Scale-Up Mass Balance (1,000 MT/Day Feedstock Basis)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                  <th className="p-3">Stream / Process Node</th>
                  <th className="p-3">Input Material</th>
                  <th className="p-3">Daily Output</th>
                  <th className="p-3">Commercial Application</th>
                  <th className="p-3">Annual Revenue Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <tr>
                  <td className="p-3 font-bold text-slate-900">Main Fermentation</td>
                  <td className="p-3">1,000 MT Dry Straw/Bamboo</td>
                  <td className="p-3 font-mono font-bold text-emerald-700">260,000 L 2G Ethanol</td>
                  <td className="p-3">National E20 Petrol Blending</td>
                  <td className="p-3 font-bold text-emerald-800">+₹65 Crore / Year</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">Hydrolysis Lignin Cake</td>
                  <td className="p-3">Enzymatic Filter Residue</td>
                  <td className="p-3 font-mono font-bold text-teal-700">120 MT Micronized Lignin</td>
                  <td className="p-3">VG-30 Bio-Bitumen Extender</td>
                  <td className="p-3 font-bold text-teal-800">+₹5.2 Crore / Year</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">Digestate Slurry (FOM)</td>
                  <td className="p-3">Centrifuged Digestate Cake</td>
                  <td className="p-3 font-mono font-bold text-blue-700">90 MT Fortified Manure</td>
                  <td className="p-3">Organic Tea Garden Nutrition</td>
                  <td className="p-3 font-bold text-blue-800">+₹2.1 Crore / Year</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">Process Wastewater</td>
                  <td className="p-3">500 m³ High-COD Effluent</td>
                  <td className="p-3 font-mono font-bold text-amber-700">4,200 m³ Green Biogas</td>
                  <td className="p-3">Rotary Feedstock Flash Dryers</td>
                  <td className="p-3 font-bold text-amber-800">Saves ₹1.4 Crore / Year</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
