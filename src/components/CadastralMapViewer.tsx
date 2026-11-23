import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Layers, 
  MapPin, 
  Eye, 
  Sliders, 
  Compass, 
  Send,
  Flame,
  Factory
} from 'lucide-react';
import { FeedstockDepotRecord } from '../types/cropHealth';

interface CadastralMapViewerProps {
  records: FeedstockDepotRecord[];
  selectedRecord: FeedstockDepotRecord | null;
  onSelectRecord: (record: FeedstockDepotRecord) => void;
  onDispatchScouting: (record: FeedstockDepotRecord) => void;
}

type FeedstockLayer = 'BQVI' | 'MOISTURE_HEATMAP' | 'CORE_TEMP' | 'TRUE_COLOR';

export const CadastralMapViewer: React.FC<CadastralMapViewerProps> = ({
  records,
  selectedRecord,
  onSelectRecord,
  onDispatchScouting
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const polygonsGroupRef = useRef<L.FeatureGroup | null>(null);
  const [activeLayer, setActiveLayer] = useState<FeedstockLayer>('BQVI');
  const [opacity, setOpacity] = useState<number>(0.85);
  const [filterDistrict, setFilterDistrict] = useState<string>('ALL');

  // Initialize Leaflet Map centered on Assam (Brahmaputra Valley)
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [26.40, 93.10], // Centered between Numaligarh and Nagaon
        zoom: 8,
        zoomControl: false
      });

      L.control.zoom({ position: 'topright' }).addTo(map);

      // Clean Light Carto Voyager Basemap
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap contributors | Assam Bioenergy Grid',
        maxZoom: 19
      }).addTo(map);

      polygonsGroupRef.current = L.featureGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Render Polygons and Spectral Highlights whenever records or activeLayer change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const group = polygonsGroupRef.current;
    if (!map || !group) return;

    group.clearLayers();

    const displayRecords = filterDistrict === 'ALL' 
      ? records 
      : records.filter(r => r.district.toLowerCase().includes(filterDistrict.toLowerCase()));

    displayRecords.forEach(record => {
      let fillColor = '#10b981';
      let borderColor = '#059669';

      if (activeLayer === 'BQVI') {
        if (record.cropHealthIndex >= 85) {
          fillColor = '#15803d';
          borderColor = '#166534';
        } else if (record.cropHealthIndex >= 70) {
          fillColor = '#2563eb';
          borderColor = '#1d4ed8';
        } else if (record.cropHealthIndex >= 50) {
          fillColor = '#f59e0b';
          borderColor = '#d97706';
        } else {
          fillColor = '#ef4444';
          borderColor = '#b91c1c';
        }
      } else if (activeLayer === 'MOISTURE_HEATMAP') {
        if (record.spectral.moisturePct > 45) {
          fillColor = '#0284c7';
          borderColor = '#0369a1';
        } else if (record.spectral.moisturePct > 20) {
          fillColor = '#06b6d4';
          borderColor = '#0891b2';
        } else {
          fillColor = '#10b981';
          borderColor = '#047857';
        }
      } else if (activeLayer === 'CORE_TEMP') {
        if (record.spectral.coreTempC > 52) {
          fillColor = '#dc2626';
          borderColor = '#991b1b';
        } else if (record.spectral.coreTempC > 40) {
          fillColor = '#f59e0b';
          borderColor = '#d97706';
        } else {
          fillColor = '#10b981';
          borderColor = '#047857';
        }
      }

      const isSelected = selectedRecord?.plotId === record.plotId;

      const polygon = L.polygon(record.polygon, {
        color: isSelected ? '#0284c7' : borderColor,
        weight: isSelected ? 4 : 2,
        fillColor: fillColor,
        fillOpacity: opacity,
        dashArray: isSelected ? '5, 5' : undefined
      });

      const popupContent = `
        <div style="font-family: system-ui, sans-serif; font-size: 12px; color: #0f172a; min-width: 200px;">
          <div style="font-weight: 700; color: #064e3b; margin-bottom: 2px;">${record.dagNumber}</div>
          <div style="font-size: 11px; color: #64748b; margin-bottom: 6px;">${record.pattaNumber} • ${record.district}</div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 6px; border-radius: 6px; margin-bottom: 6px;">
            <div><strong>Feedstock:</strong> ${record.crop}</div>
            <div><strong>Tonnage:</strong> <span style="font-weight: 700; color: #059669;">${record.tonnage} MT</span></div>
            <div><strong>Moisture:</strong> <strong>${record.spectral.moisturePct}%</strong> | <strong>Temp:</strong> ${record.spectral.coreTempC}°C</div>
            <div><strong>Ensilage pH:</strong> <strong>${record.spectral.ensilagePh}</strong></div>
            <div><strong>BQVI Quality:</strong> <span style="font-weight: 700; color: ${record.cropHealthIndex > 80 ? '#059669' : '#dc2626'};">${record.cropHealthIndex}/100</span></div>
          </div>
          <div style="font-size: 10px; color: #475569;">Click polygon to inspect telemetry & refinery off-take</div>
        </div>
      `;

      polygon.bindPopup(popupContent);
      polygon.on('click', () => {
        onSelectRecord(record);
      });
      polygon.addTo(group);
    });

    if (displayRecords.length > 0 && !selectedRecord) {
      map.fitBounds(group.getBounds(), { padding: [40, 40], maxZoom: 11 });
    }
  }, [records, activeLayer, opacity, filterDistrict, selectedRecord, onSelectRecord]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedRecord) return;

    map.flyTo([selectedRecord.lat, selectedRecord.lng], 13, {
      duration: 1.2
    });
  }, [selectedRecord]);

  const activeRecord = selectedRecord || records[0];

  return (
    <div className="space-y-4">
      {/* Header and Controls in White Theme */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            Bioenergy Supply Shed & Cluster Depots WebGIS
          </h2>
          <p className="text-xs text-slate-500">
            Spatio-temporal mapping of Assam biomass reserves, Numaligarh/SATAT economic haulage radii & silo telemetry
          </p>
        </div>

        {/* Layer Switcher & Opacity Slider */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setActiveLayer('BQVI')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeLayer === 'BQVI'
                  ? 'bg-emerald-600 text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              BQVI Index
            </button>
            <button
              onClick={() => setActiveLayer('MOISTURE_HEATMAP')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeLayer === 'MOISTURE_HEATMAP'
                  ? 'bg-sky-600 text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Moisture %
            </button>
            <button
              onClick={() => setActiveLayer('CORE_TEMP')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeLayer === 'CORE_TEMP'
                  ? 'bg-rose-600 text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Core Temp °C
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Sliders className="w-3.5 h-3.5 text-slate-400" />
            <span>Opacity:</span>
            <input
              type="range"
              min="0.3"
              max="1.0"
              step="0.05"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="w-20 accent-emerald-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Map & Telemetry Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Leaflet Map Canvas */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs h-[520px] relative">
          <div ref={mapContainerRef} className="w-full h-full z-10" />

          {/* Map Floating Legend */}
          <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-sm border border-slate-200 p-3 rounded-xl shadow-md text-xs space-y-1.5 font-medium">
            <span className="font-bold text-slate-900 block border-b border-slate-100 pb-1">
              {activeLayer === 'BQVI' ? 'BQVI Quality Tier' : activeLayer === 'MOISTURE_HEATMAP' ? 'Moisture Range' : 'Thermal Alarm'}
            </span>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-700"></span>
              <span>Grade A Optimal (&gt;85)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-600"></span>
              <span>Grade B Stable (70–84)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span>Grade C Monsoon Risk (50–69)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-600"></span>
              <span>Grade D Critical Self-Heating (&lt;50)</span>
            </div>
          </div>
        </div>

        {/* Selected Depot Telemetry Panel */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex justify-between items-start pb-2 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {activeRecord.plotId}
                </span>
                <h3 className="text-sm font-extrabold text-slate-900 mt-1">{activeRecord.dagNumber}</h3>
                <span className="text-xs text-slate-500">{activeRecord.pattaNumber} • {activeRecord.district}</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                activeRecord.grade === 'GRADE_A' ? 'bg-emerald-100 text-emerald-800' :
                activeRecord.grade === 'GRADE_B' ? 'bg-blue-100 text-blue-800' :
                activeRecord.grade === 'GRADE_C' ? 'bg-amber-100 text-amber-800' :
                'bg-rose-100 text-rose-800'
              }`}>
                {activeRecord.grade}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-500 font-medium">Bale Moisture</span>
                <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">{activeRecord.spectral.moisturePct}%</div>
                <span className="text-[10px] text-slate-500">Sensor Probe FDR</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-500 font-medium">Core Temp</span>
                <div className={`text-lg font-bold font-mono mt-0.5 ${activeRecord.spectral.coreTempC > 50 ? 'text-rose-600' : 'text-slate-900'}`}>
                  {activeRecord.spectral.coreTempC}°C
                </div>
                <span className="text-[10px] text-slate-500">Alarm: &gt;52°C</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-500 font-medium">Ensilage pH</span>
                <div className="text-lg font-bold font-mono text-emerald-700 mt-0.5">{activeRecord.spectral.ensilagePh}</div>
                <span className="text-[10px] text-slate-500">Lactic Target: &lt;4.0</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-500 font-medium">Inventory</span>
                <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">{activeRecord.tonnage} MT</div>
                <span className="text-[10px] text-slate-500">Residue Volume</span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs space-y-1">
              <div className="font-bold text-emerald-950 flex items-center gap-1">
                <Factory className="w-3.5 h-3.5 text-emerald-700" />
                <span>Designated Biorefinery Off-Take:</span>
              </div>
              <div className="text-emerald-900 font-medium">{activeRecord.allocatedBiorefinery}</div>
              <div className="text-[11px] text-emerald-700 font-mono pt-1">
                Transport Distance: 18.4 km (Within Economic Radius)
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => onDispatchScouting(activeRecord)}
              className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Dispatch Depot QA Team</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
