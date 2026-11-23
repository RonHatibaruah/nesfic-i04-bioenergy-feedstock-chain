import React, { useState } from 'react';
import { 
  Radio, 
  Search, 
  MapPin, 
  Download, 
  AlertCircle, 
  CheckCircle2, 
  Flame, 
  Droplets, 
  ShieldCheck, 
  MessageSquare,
  Coins,
  FileCheck
} from 'lucide-react';
import { FeedstockDepotRecord } from '../types/cropHealth';

interface CitizenHealthPortalProps {
  records: FeedstockDepotRecord[];
  onSelectRecord: (record: FeedstockDepotRecord) => void;
}

export const CitizenHealthPortal: React.FC<CitizenHealthPortalProps> = ({
  records
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [language, setLanguage] = useState<'AS' | 'EN'>('AS'); // Assamese default for local farmers
  const [activeRecord, setActiveRecord] = useState<FeedstockDepotRecord>(records[0]);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [phoneInput, setPhoneInput] = useState<string>('');
  const [simulatedTonnage, setSimulatedTonnage] = useState<number>(15);

  const filteredRecords = records.filter(r => {
    if (selectedDistrict !== 'ALL' && r.district.toLowerCase() !== selectedDistrict.toLowerCase()) return false;
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      r.farmerName.toLowerCase().includes(term) ||
      r.dagNumber.toLowerCase().includes(term) ||
      r.village.toLowerCase().includes(term) ||
      r.block.toLowerCase().includes(term) ||
      r.crop.toLowerCase().includes(term)
    );
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneInput.length >= 10) {
      setIsSubscribed(true);
    }
  };

  const advisory = activeRecord.advisory;
  const isAssamese = language === 'AS';

  // Base pricing
  const baseRate = 2200;
  const estimatedPayout = simulatedTonnage * baseRate;
  const carbonOffsetEstimate = (simulatedTonnage * 1.24).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-200 rounded-2xl p-6 shadow-xs relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
              <Flame className="w-3.5 h-3.5 text-emerald-600" />
              <span>Assam Bioenergy Citizen & Farmer Aggregation Grid</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {isAssamese ? 'জৈৱিক সেৱা — খেতিয়কৰ কেঁচামাল সংগ্ৰহ আৰু ধন পৰিশোধ পৰ্টেল' : 'Jaivik Seva — Farmer Biomass Off-Take & Settlement Portal'}
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {isAssamese 
                ? 'বৰষুণৰ দিনত পথাৰৰ নৰা, খেৰ আৰু বাঁহৰ অৱশিষ্টসমূহ চাইল’ বংকাৰলৈ আনি নিৰ্ধাৰিত মূল্য আৰু প্ৰত্যক্ষ বেংক একাউণ্টত ধন (DBT) লাভ কৰক।'
                : 'Monetize surplus crop residues and bamboo offcuts during the monsoon. Access guaranteed fair off-take pricing and direct DBT bank settlement under NESFIC-I-04.'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs text-slate-500 font-medium">ভাষা / Language:</span>
            <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5 text-xs font-bold shadow-2xs">
              <button
                onClick={() => setLanguage('AS')}
                className={`px-3 py-1.5 rounded-md transition-all ${isAssamese ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                অসমীয়া
              </button>
              <button
                onClick={() => setLanguage('EN')}
                className={`px-3 py-1.5 rounded-md transition-all ${!isAssamese ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Off-Take Value Calculator */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
          <Coins className="w-4 h-4 text-emerald-600" />
          {isAssamese ? 'কেঁচামাল বিক্ৰী আৰু ধন পৰিশোধ গণনা (DBT Calculator)' : 'Instant Residue Off-Take & DBT Payout Calculator'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600">
              {isAssamese ? 'আনুমানিক নৰা/খেৰ (মেট্ৰিক টন):' : 'Estimated Straw / Biomass (Tonnes):'}
            </label>
            <input 
              type="number" 
              min={1} 
              max={200}
              value={simulatedTonnage}
              onChange={(e) => setSimulatedTonnage(Number(e.target.value) || 1)}
              className="w-full px-3 py-2 text-sm font-bold font-mono border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600"
            />
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <span className="text-[11px] text-slate-500 font-medium">{isAssamese ? 'প্ৰতি টন নিৰ্ধাৰিত দৰ' : 'Certified Base Rate'}</span>
            <div className="text-lg font-bold font-mono text-slate-800">₹{baseRate} / MT</div>
            <span className="text-[10px] text-slate-400">{isAssamese ? 'চৰকাৰী গ্ৰেড দৰ' : 'MC² Standard Rate'}</span>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
            <span className="text-[11px] text-emerald-800 font-medium">{isAssamese ? 'মুঠ প্ৰত্যক্ষ পৰিশোধ (DBT)' : 'Total Net Payment (DBT)'}</span>
            <div className="text-xl font-extrabold font-mono text-emerald-700">₹{estimatedPayout.toLocaleString()}</div>
            <span className="text-[10px] text-emerald-600">{isAssamese ? '২৪ ঘণ্টাত একাউণ্টত জমা' : 'Credited within 24h'}</span>
          </div>
          <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-center">
            <span className="text-[11px] text-teal-800 font-medium">{isAssamese ? 'কাৰ্বন ৰাহি (প্ৰদূষণ ৰোধ)' : 'Carbon Offset Credit'}</span>
            <div className="text-xl font-extrabold font-mono text-teal-700">{carbonOffsetEstimate} MT CO2e</div>
            <span className="text-[10px] text-teal-600">{isAssamese ? 'নৰা পোৰা ৰোধ' : 'Stubble Burn Avoided'}</span>
          </div>
        </div>
      </div>

      {/* Search & Depot Records Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              {isAssamese ? 'সংগ্ৰহ কেন্দ্ৰ নিৰ্বাচন কৰক' : 'Select Cluster Depot'}
            </h3>
            <span className="text-xs text-slate-500 font-mono">{filteredRecords.length} Active</span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder={isAssamese ? 'কৃষকৰ নাম, জিলা বা গাঁও বিচৰক...' : 'Search by name, district, or block...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {filteredRecords.map(record => (
              <div
                key={record.plotId}
                onClick={() => setActiveRecord(record)}
                className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                  activeRecord.plotId === record.plotId
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                    : 'border-slate-100 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-bold text-slate-900">{record.farmerName}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    record.grade === 'GRADE_A' ? 'bg-emerald-100 text-emerald-800' :
                    record.grade === 'GRADE_B' ? 'bg-blue-100 text-blue-800' :
                    record.grade === 'GRADE_C' ? 'bg-amber-100 text-amber-800' :
                    'bg-rose-100 text-rose-800'
                  }`}>
                    {record.grade}
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{record.dagNumber} • {record.district}</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-mono">
                  {record.crop} ({record.tonnage} MT)
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advisory & Off-Take Slip Details */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <span className="text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                {advisory.advisoryId}
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mt-1.5">
                {isAssamese ? advisory.headlineAs : advisory.headlineEn}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => window.print()}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isAssamese ? 'প্ৰমাণপত্ৰ প্ৰিন্ট' : 'Print Slip'}</span>
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
            {isAssamese ? advisory.summaryAs : advisory.summaryEn}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{isAssamese ? 'সংৰক্ষণ আৰু চাইল’ প্ৰক্ৰিয়া' : 'Preservation & Ensilage Procedure'}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isAssamese ? advisory.preservationActionAs : advisory.preservationActionEn}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="text-xs font-bold text-teal-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>{isAssamese ? 'ৰিফাইনাৰী যোগান আৰু ধন লাভ' : 'Refinery Off-Take & Payout'}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isAssamese ? advisory.depotTriageAs : advisory.depotTriageEn}
              </p>
              <div className="text-[11px] font-bold text-emerald-700 pt-1 font-mono">
                {advisory.pricingRatePerTonne}
              </div>
            </div>
          </div>

          {/* SMS / WhatsApp Updates Subscription */}
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 mt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-emerald-700" />
                  {isAssamese ? 'হোৱাটছএপত সংগ্ৰহৰ সময় আৰু ধন পৰিশোধৰ তথ্য লওক' : 'Get WhatsApp Alerts for Off-Take & DBT Payments'}
                </h4>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  {isAssamese ? 'মোবাইল নম্বৰ দিয়ক আৰু নিৰ্বাচিত কেন্দ্ৰৰ আপডেট পাওক।' : 'Enter your mobile number for SMS/WhatsApp notices.'}
                </p>
              </div>
              {isSubscribed ? (
                <span className="text-xs font-bold text-emerald-800 bg-white px-3 py-1.5 rounded-lg border border-emerald-300">
                  ✓ {isAssamese ? 'সফলভাৱে অন্তৰ্ভুক্ত হ’ল' : 'Subscribed'}
                </span>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="tel"
                    placeholder="94350 XXXXX"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="px-3 py-1.5 text-xs border border-emerald-300 rounded-lg focus:outline-none bg-white font-mono"
                  />
                  <button type="submit" className="px-3 py-1.5 bg-emerald-700 text-white font-bold text-xs rounded-lg hover:bg-emerald-800">
                    {isAssamese ? 'পঞ্জীয়ন' : 'Join'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
