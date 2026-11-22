import React, { useState } from 'react';
import { 
  Radio, 
  Search, 
  MapPin, 
  Download, 
  Share2, 
  AlertCircle, 
  CheckCircle2, 
  Sprout, 
  CloudSun, 
  Bug, 
  Droplets, 
  ShieldCheck, 
  PhoneCall, 
  MessageSquare,
  QrCode
} from 'lucide-react';
import { CropHealthRecord } from '../types/cropHealth';

interface CitizenHealthPortalProps {
  records: CropHealthRecord[];
  onSelectRecord: (record: CropHealthRecord) => void;
}

export const CitizenHealthPortal: React.FC<CitizenHealthPortalProps> = ({
  records,
  onSelectRecord
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [language, setLanguage] = useState<'AS' | 'EN'>('AS'); // Assamese default for local farmers
  const [activeRecord, setActiveRecord] = useState<CropHealthRecord>(records[0]);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [phoneInput, setPhoneInput] = useState<string>('');

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

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-800/60 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-2">
              <Radio className="w-3.5 h-3.5" />
              <span>Sasya Seva (শস্য সেৱা) • Farmer Advisory Portal</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              {isAssamese ? 'অসম শস্য স্বাস্থ্য আৰু পৰামৰ্শ সেৱা' : 'Assam Crop Health & Hyper-Local Agro-Advisory'}
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              {isAssamese 
                ? 'কৃষি বিভাগ আৰু অসম মহাকাশ প্ৰয়োগ কেন্দ্ৰ (ASSAC) ৰ উপগ্ৰহীয় তথ্যৰ আধাৰত আপোনাৰ পথাৰৰ বাবে সঠিক সময়োপযোগী ৰোগ-পোক নিবাৰণৰ নিৰ্দেশনা।'
                : 'Satellite & meteorological early warning advisory delivering location-specific pest intervention and weather advisories to Assam farmers.'}
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-slate-900/90 border border-emerald-700/60 p-1 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setLanguage('AS')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                language === 'AS' 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              অসমীয়া (Assamese)
            </button>
            <button
              onClick={() => setLanguage('EN')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                language === 'EN' 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              English
            </button>
          </div>
        </div>
      </div>

      {/* Search & Location Filter Bar */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-3 shadow-md">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isAssamese ? "কৃষকৰ নাম, দাগ নম্বৰ, গাঁও অথবা ব্লক বিচাৰক..." : "Search by Farmer Name, Dag Number, Village or Block..."}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <select
          aria-label="Filter records by district"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 w-full sm:w-auto"
        >
          <option value="ALL">All Districts</option>
          <option value="Kamrup Rural">Kamrup Rural</option>
          <option value="Nagaon">Nagaon</option>
          <option value="Jorhat">Jorhat</option>
          <option value="Barpeta">Barpeta</option>
          <option value="Sonitpur">Sonitpur</option>
          <option value="Cachar">Cachar</option>
          <option value="Dhubri">Dhubri</option>
          <option value="Golaghat">Golaghat</option>
        </select>
      </div>

      {/* Main Advisory Bulletin & Farm Selector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Plot List (1 Col) */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden shadow-lg">
          <div className="p-3 bg-slate-900 border-b border-slate-700 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-300">
              {isAssamese ? 'নিৰ্বাচিত পথাৰসমূহ' : 'Monitored Farm Plots'} ({filteredRecords.length})
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">Geo-Tagged ASSAC</span>
          </div>

          <div className="divide-y divide-slate-700/60 max-h-[640px] overflow-y-auto">
            {filteredRecords.map(record => {
              const isSelected = activeRecord.plotId === record.plotId;
              const isCritical = record.grade === 'GRADE_D';

              return (
                <div
                  key={record.plotId}
                  onClick={() => setActiveRecord(record)}
                  className={`p-3.5 cursor-pointer transition-all ${
                    isSelected ? 'bg-slate-700/90 border-l-4 border-emerald-500' : 'hover:bg-slate-700/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{record.farmerName}</span>
                    <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                      isCritical ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                      record.grade === 'GRADE_A' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {record.grade.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-300 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{record.village}, {record.block}</span>
                  </div>

                  <div className="text-[11px] text-emerald-400 mt-0.5">
                    {record.crop} • {record.dagNumber}
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono border-t border-slate-700/50 pt-1.5">
                    <span>CHI: {record.cropHealthIndex}/100</span>
                    <span className={record.pestRiskScore > 70 ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                      Pest Risk: {record.pestRiskScore}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Full Official Agro-Advisory Bulletin Card (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl relative">
            {/* Bulletin Official Seal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-700 gap-3">
              <div>
                <span className="text-[11px] font-mono text-emerald-400 font-semibold">{advisory.advisoryId}</span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {isAssamese ? advisory.headlineAs : advisory.headlineEn}
                </h3>
                <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                  <span>{activeRecord.village}, {activeRecord.block}, {activeRecord.district}</span>
                  <span>•</span>
                  <span>Valid: {advisory.validUntil}</span>
                </div>
              </div>

              <div className="text-right">
                <span className={`px-2.5 py-1 rounded text-xs font-bold inline-block ${
                  activeRecord.grade === 'GRADE_D' ? 'bg-rose-950 text-rose-300 border border-rose-800 animate-pulse' :
                  activeRecord.grade === 'GRADE_A' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                  'bg-amber-950 text-amber-300 border border-amber-800'
                }`}>
                  {activeRecord.grade.replace('_', ' ')}
                </span>
                <div className="text-[10px] text-slate-400 mt-1">Health Index: {activeRecord.cropHealthIndex}/100</div>
              </div>
            </div>

            {/* Weather & Field Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-4 text-xs">
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-400 text-[10px]">{isAssamese ? 'ফসলৰ প্ৰকাৰ' : 'Crop Type'}</span>
                <div className="text-slate-200 font-semibold mt-0.5">{activeRecord.crop.split('(')[0]}</div>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-400 text-[10px]">{isAssamese ? 'বতৰ আৰু বৰষুণ' : '24h Rainfall'}</span>
                <div className="text-sky-400 font-semibold mt-0.5">{activeRecord.weather.rainfall24h} mm</div>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-400 text-[10px]">{isAssamese ? 'বায়ুৰ আৰ্দ্ৰতা' : 'Relative Humidity'}</span>
                <div className="text-amber-300 font-semibold mt-0.5">{activeRecord.weather.rhMorning}% RH</div>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700">
                <span className="text-slate-400 text-[10px]">{isAssamese ? 'উপগ্ৰহ সংকেত (NDVI)' : 'Satellite NDVI'}</span>
                <div className="text-emerald-400 font-semibold mt-0.5">{activeRecord.spectral.ndvi.toFixed(2)}</div>
              </div>
            </div>

            {/* Diagnostic Summary */}
            <div className="bg-slate-900/60 border border-slate-700/80 rounded-lg p-3.5 text-xs mb-4">
              <div className="font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>{isAssamese ? 'পৰিস্থিতিৰ বিৱৰণ' : 'Field Situation & Threat Assessment'}</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {isAssamese ? advisory.summaryAs : advisory.summaryEn}
              </p>
            </div>

            {/* Action Directives (Cultural, Bio, Chemical) */}
            <div className="space-y-3 text-xs">
              {/* Cultural Water Action */}
              <div className="bg-slate-900/80 border-l-4 border-emerald-500 p-3 rounded-r-lg">
                <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                  <Sprout className="w-4 h-4" />
                  <span>{isAssamese ? '১. পথাৰ ব্যৱস্থাপনা আৰু পানী পৰিচালনা' : '1. Cultural & Water Management'}</span>
                </div>
                <p className="text-slate-300">
                  {isAssamese ? advisory.culturalActionAs : advisory.culturalActionEn}
                </p>
              </div>

              {/* Bio-Pesticide Intervention */}
              <div className="bg-slate-900/80 border-l-4 border-teal-500 p-3 rounded-r-lg">
                <div className="font-bold text-teal-400 mb-1 flex items-center gap-1.5">
                  <Bug className="w-4 h-4" />
                  <span>{isAssamese ? '২. জৈৱিক নিবাৰণ (Bio-Control / IPM)' : '2. Biological & Integrated Pest Management (IPM)'}</span>
                </div>
                <p className="text-slate-300">
                  {isAssamese ? advisory.bioPesticideAs : advisory.bioPesticideEn}
                </p>
              </div>

              {/* Chemical Intervention (If ETL breached) */}
              <div className="bg-slate-900/80 border-l-4 border-amber-500 p-3 rounded-r-lg">
                <div className="font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4" />
                  <span>{isAssamese ? '৩. ৰাসায়নিক কীটনাশক (প্ৰয়োজনীয় ক্ষেত্ৰত)' : '3. Chemical Intervention (Only if ETL Breached)'}</span>
                </div>
                <p className="text-slate-300">
                  {isAssamese ? advisory.chemicalInterventionAs : advisory.chemicalInterventionEn}
                </p>
                <div className="mt-1 text-[11px] text-amber-300/90 font-mono">
                  {isAssamese ? 'প্ৰতি বিঘাত মাত্ৰা:' : 'Dosage:'} {advisory.dosagePerBigha}
                </div>
              </div>
            </div>

            {/* Free SMS / WhatsApp Alerts Subscription Box */}
            <div className="mt-6 p-4 rounded-xl bg-slate-900 border border-slate-700">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>{isAssamese ? 'মোবাইলত বিনামূলীয়া এছ এম এছ / হোৱাটছএপ জাননী লওক' : 'Subscribe to Free Mobile SMS / WhatsApp Alerts'}</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {isAssamese 
                      ? 'আপোনাৰ জিলা আৰু ব্লকৰ বতৰ আৰু ৰোগৰ আগজাননী পোনে পোনে মোবাইলত পাব।' 
                      : 'Get real-time weather and pest outbreak alerts dispatched to your mobile.'}
                  </p>
                </div>

                {isSubscribed ? (
                  <span className="px-3 py-1.5 bg-emerald-950 text-emerald-300 border border-emerald-700 text-xs rounded-lg font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{isAssamese ? 'পঞ্জীকৰণ সফল হ\'ল!' : 'Subscribed Successfully!'}</span>
                  </span>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                    <input
                      type="tel"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="+91 Mobile Number"
                      className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 w-36"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-all"
                    >
                      {isAssamese ? 'পঞ্জীয়ন কৰক' : 'Subscribe'}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Official Issuing Footer */}
            <div className="mt-4 pt-3 border-t border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{advisory.issuingAuthority}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isAssamese ? 'পৰামৰ্শ পত্ৰ সংৰক্ষণ কৰক' : 'Download Bulletin'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
