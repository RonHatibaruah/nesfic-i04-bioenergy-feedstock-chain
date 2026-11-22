import React, { useState } from 'react';
import { 
  Radio, 
  Search, 
  MapPin, 
  Download, 
  AlertCircle, 
  CheckCircle2, 
  Sprout, 
  Bug, 
  Droplets, 
  ShieldCheck, 
  MessageSquare
} from 'lucide-react';
import { CropHealthRecord } from '../types/cropHealth';

interface CitizenHealthPortalProps {
  records: CropHealthRecord[];
  onSelectRecord: (record: CropHealthRecord) => void;
}

export const CitizenHealthPortal: React.FC<CitizenHealthPortalProps> = ({
  records
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
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-200 rounded-2xl p-6 shadow-xs relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-semibold mb-2">
              <Radio className="w-3.5 h-3.5 text-emerald-700" />
              <span>Sasya Seva (শস্য সেৱা) • Farmer Advisory Portal</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {isAssamese ? 'অসম শস্য স্বাস্থ্য আৰু পৰামৰ্শ সেৱা' : 'Assam Crop Health & Hyper-Local Agro-Advisory'}
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              {isAssamese 
                ? 'কৃষি বিভাগ আৰু অসম মহাকাশ প্ৰয়োগ কেন্দ্ৰ (ASSAC) ৰ উপগ্ৰহীয় তথ্যৰ আধাৰত আপোনাৰ পথাৰৰ বাবে সঠিক সময়োপযোগী ৰোগ-পোক নিবাৰণৰ নিৰ্দেশনা।'
                : 'Satellite & meteorological early warning advisory delivering location-specific pest intervention and weather advisories to Assam farmers.'}
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 p-1 rounded-xl self-start md:self-auto shadow-xs">
            <button
              onClick={() => setLanguage('AS')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                language === 'AS' 
                  ? 'bg-emerald-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              অসমীয়া (Assamese)
            </button>
            <button
              onClick={() => setLanguage('EN')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                language === 'EN' 
                  ? 'bg-emerald-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
          </div>
        </div>
      </div>

      {/* Search & Location Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-3 shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isAssamese ? "কৃষকৰ নাম, দাগ নম্বৰ, গাঁও অথবা ব্লক বিচাৰক..." : "Search by Farmer Name, Dag Number, Village or Block..."}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <select
          aria-label="Filter records by district"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 w-full sm:w-auto"
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
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-700">
              {isAssamese ? 'নিৰ্বাচিত পথাৰসমূহ' : 'Monitored Farm Plots'} ({filteredRecords.length})
            </span>
            <span className="text-[10px] text-emerald-700 font-mono font-medium">Geo-Tagged ASSAC</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[640px] overflow-y-auto">
            {filteredRecords.map(record => {
              const isSelected = activeRecord.plotId === record.plotId;
              const isCritical = record.grade === 'GRADE_D';

              return (
                <div
                  key={record.plotId}
                  onClick={() => setActiveRecord(record)}
                  className={`p-3.5 cursor-pointer transition-all ${
                    isSelected ? 'bg-emerald-50/70 border-l-4 border-emerald-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{record.farmerName}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isCritical ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                      record.grade === 'GRADE_A' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {record.grade.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{record.village}, {record.block}</span>
                  </div>

                  <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
                    {record.crop} • {record.dagNumber}
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 font-mono border-t border-slate-100 pt-1.5">
                    <span>CHI: {record.cropHealthIndex}/100</span>
                    <span className={record.pestRiskScore > 70 ? 'text-rose-600 font-bold' : 'text-slate-500'}>
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
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs relative">
            {/* Bulletin Official Seal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
              <div>
                <span className="text-[11px] font-mono text-emerald-700 font-semibold">{advisory.advisoryId}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {isAssamese ? advisory.headlineAs : advisory.headlineEn}
                </h3>
                <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                  <span>{activeRecord.village}, {activeRecord.block}, {activeRecord.district}</span>
                  <span>•</span>
                  <span>Valid: {advisory.validUntil}</span>
                </div>
              </div>

              <div className="text-right">
                <span className={`px-2.5 py-1 rounded text-xs font-bold inline-block ${
                  activeRecord.grade === 'GRADE_D' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                  activeRecord.grade === 'GRADE_A' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {activeRecord.grade.replace('_', ' ')}
                </span>
                <div className="text-[10px] text-slate-500 mt-1">Health Index: {activeRecord.cropHealthIndex}/100</div>
              </div>
            </div>

            {/* Weather & Field Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-4 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-slate-500 text-[10px]">{isAssamese ? 'ফসলৰ প্ৰকাৰ' : 'Crop Type'}</span>
                <div className="text-slate-800 font-semibold mt-0.5">{activeRecord.crop.split('(')[0]}</div>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-slate-500 text-[10px]">{isAssamese ? 'বতৰ আৰু বৰষুণ' : '24h Rainfall'}</span>
                <div className="text-sky-700 font-semibold mt-0.5">{activeRecord.weather.rainfall24h} mm</div>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-slate-500 text-[10px]">{isAssamese ? 'বায়ুৰ আৰ্দ্ৰতা' : 'Relative Humidity'}</span>
                <div className="text-amber-700 font-semibold mt-0.5">{activeRecord.weather.rhMorning}% RH</div>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-slate-500 text-[10px]">{isAssamese ? 'উপগ্ৰহ সংকেত (NDVI)' : 'Satellite NDVI'}</span>
                <div className="text-emerald-700 font-semibold mt-0.5">{activeRecord.spectral.ndvi.toFixed(2)}</div>
              </div>
            </div>

            {/* Diagnostic Summary */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 text-xs mb-4">
              <div className="font-semibold text-amber-900 mb-1 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>{isAssamese ? 'পৰিস্থিতিৰ বিৱৰণ' : 'Field Situation & Threat Assessment'}</span>
              </div>
              <p className="text-amber-950/90 leading-relaxed">
                {isAssamese ? advisory.summaryAs : advisory.summaryEn}
              </p>
            </div>

            {/* Action Directives (Cultural, Bio, Chemical) */}
            <div className="space-y-3 text-xs">
              {/* Cultural Water Action */}
              <div className="bg-slate-50 border border-slate-200 border-l-4 border-l-emerald-600 p-3.5 rounded-xl">
                <div className="font-bold text-emerald-800 mb-1 flex items-center gap-1.5">
                  <Sprout className="w-4 h-4" />
                  <span>{isAssamese ? '১. পথাৰ ব্যৱস্থাপনা আৰু পানী পৰিচালনা' : '1. Cultural & Water Management'}</span>
                </div>
                <p className="text-slate-700">
                  {isAssamese ? advisory.culturalActionAs : advisory.culturalActionEn}
                </p>
              </div>

              {/* Bio-Pesticide Intervention */}
              <div className="bg-slate-50 border border-slate-200 border-l-4 border-l-teal-600 p-3.5 rounded-xl">
                <div className="font-bold text-teal-800 mb-1 flex items-center gap-1.5">
                  <Bug className="w-4 h-4" />
                  <span>{isAssamese ? '২. জৈৱিক নিবাৰণ (Bio-Control / IPM)' : '2. Biological & Integrated Pest Management (IPM)'}</span>
                </div>
                <p className="text-slate-700">
                  {isAssamese ? advisory.bioPesticideAs : advisory.bioPesticideEn}
                </p>
              </div>

              {/* Chemical Intervention (If ETL breached) */}
              <div className="bg-slate-50 border border-slate-200 border-l-4 border-l-amber-600 p-3.5 rounded-xl">
                <div className="font-bold text-amber-800 mb-1 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4" />
                  <span>{isAssamese ? '৩. ৰাসায়নিক কীটনাশক (প্ৰয়োজনীয় ক্ষেত্ৰত)' : '3. Chemical Intervention (Only if ETL Breached)'}</span>
                </div>
                <p className="text-slate-700">
                  {isAssamese ? advisory.chemicalInterventionAs : advisory.chemicalInterventionEn}
                </p>
                <div className="mt-1 text-[11px] text-amber-800 font-mono font-medium">
                  {isAssamese ? 'প্ৰতি বিঘাত মাত্ৰা:' : 'Dosage:'} {advisory.dosagePerBigha}
                </div>
              </div>
            </div>

            {/* Free SMS / WhatsApp Alerts Subscription Box */}
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>{isAssamese ? 'মোবাইলত বিনামূলীয়া এছ এম এছ / হোৱাটছএপ জাননী লওক' : 'Subscribe to Free Mobile SMS / WhatsApp Alerts'}</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {isAssamese 
                      ? 'আপোনাৰ জিলা আৰু ব্লকৰ বতৰ আৰু ৰোগৰ আগজাননী পোনে পোনে মোবাইলত পাব।' 
                      : 'Get real-time weather and pest outbreak alerts dispatched to your mobile.'}
                  </p>
                </div>

                {isSubscribed ? (
                  <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs rounded-xl font-semibold flex items-center gap-1.5 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{isAssamese ? 'পঞ্জীকৰণ সফল হ\'ল!' : 'Subscribed Successfully!'}</span>
                  </span>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                    <input
                      type="tel"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="+91 Mobile Number"
                      className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 w-36 shadow-xs"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
                    >
                      {isAssamese ? 'পঞ্জীয়ন কৰক' : 'Subscribe'}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Official Issuing Footer */}
            <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{advisory.issuingAuthority}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="hover:text-emerald-700 text-slate-600 transition-colors flex items-center gap-1"
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
