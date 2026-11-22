import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Layers, 
  MapPin, 
  Maximize2, 
  Eye, 
  ShieldAlert, 
  Sliders, 
  Sprout, 
  Droplets, 
  Sun, 
  Compass, 
  Send
} from 'lucide-react';
import { CropHealthRecord } from '../types/cropHealth';

interface CadastralMapViewerProps {
  records: CropHealthRecord[];
  selectedRecord: CropHealthRecord | null;
  onSelectRecord: (record: CropHealthRecord) => void;
  onDispatchScouting: (record: CropHealthRecord) => void;
}

type SpectralLayer = 'NDVI' | 'NDWI' | 'TRUE_COLOR' | 'DRONE_ORTHO' | 'PEST_HEATMAP';

export const CadastralMapViewer: React.FC<CadastralMapViewerProps> = ({
  records,
  selectedRecord,
  onSelectRecord,
  onDispatchScouting
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const polygonsGroupRef = useRef<L.FeatureGroup | null>(null);
  const [activeLayer, setActiveLayer] = useState<SpectralLayer>('NDVI');
  const [opacity, setOpacity] = useState<number>(0.85);
  const [filterDistrict, setFilterDistrict] = useState<string>('ALL');

  // Initialize Leaflet Map centered on Assam (Brahmaputra Valley)
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Center of Assam (near Nagaon/Kaliabor)
      const map = L.map(mapContainerRef.current, {
        center: [26.25, 92.65],
        zoom: 8,
        zoomControl: false
      });

      L.control.zoom({ position: 'topright' }).addTo(map);

      // Dark Basemap suitable for GIS & remote sensing overlays
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap contributors | ASSAC GIS',
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
      // Determine color by active spectral index
      let fillColor = '#10b981'; // Green default
      let borderColor = '#059669';

      if (activeLayer === 'NDVI') {
        if (record.spectral.ndvi >= 0.75) {
          fillColor = '#15803d'; // High vigor dark green
          borderColor = '#166534';
        } else if (record.spectral.ndvi >= 0.60) {
          fillColor = '#84cc16'; // Moderate lime green
          borderColor = '#65a30d';
        } else if (record.spectral.ndvi >= 0.50) {
          fillColor = '#facc15'; // Mild stress yellow
          borderColor = '#ca8a04';
        } else {
          fillColor = '#ef4444'; // Severe stress/chlorosis red
          borderColor = '#b91c1c';
        }
      } else if (activeLayer === 'NDWI') {
        if (record.spectral.ndwi > 0.25) {
          fillColor = '#0284c7'; // Saturated / Waterlogging
          borderColor = '#0369a1';
        } else if (record.spectral.ndwi >= 0.05) {
          fillColor = '#06b6d4'; // Optimal moisture
          borderColor = '#0891b2';
        } else {
          fillColor = '#f97316'; // Moisture deficit / drought
          borderColor = '#ea580c';
        }
      } else if (activeLayer === 'PEST_HEATMAP') {
        if (record.pestRiskScore > 75) {
          fillColor = '#dc2626'; // High Outbreak corridor
          borderColor = '#991b1b';
        } else if (record.pestRiskScore > 40) {
          fillColor = '#f59e0b';
          borderColor = '#d97706';
        } else {
          fillColor = '#10b981';
          borderColor = '#047857';
        }
      } else if (activeLayer === 'DRONE_ORTHO') {
        fillColor = '#10b981';
        borderColor = '#38bdf8';
      }

      const isSelected = selectedRecord?.plotId === record.plotId;

      const polygon = L.polygon(record.polygon, {
        color: isSelected ? '#38bdf8' : borderColor,
        weight: isSelected ? 4 : 2,
        fillColor: fillColor,
        fillOpacity: opacity,
        dashArray: isSelected ? '5, 5' : undefined
      });

      // Interactive popup
      const popupContent = `
        <div style="font-family: system-ui, sans-serif; font-size: 12px; color: #0f172a; min-width: 180px;">
          <div style="font-weight: 700; color: #064e3b; margin-bottom: 2px;">${record.farmerName}</div>
          <div style="font-size: 11px; color: #64748b; margin-bottom: 6px;">${record.dagNumber} • ${record.block}</div>
          <div style="background: #f1f5f9; padding: 4px 6px; border-radius: 4px; margin-bottom: 6px;">
            <div><strong>Crop:</strong> ${record.crop}</div>
            <div><strong>NDVI:</strong> <span style="font-weight: 700; color: #059669;">${record.spectral.ndvi.toFixed(2)}</span></div>
            <div><strong>Pest Risk:</strong> <span style="font-weight: 700; color: ${record.pestRiskScore > 70 ? '#dc2626' : '#2563eb'};">${record.pestRiskScore}%</span></div>
            <div><strong>Grade:</strong> <strong>${record.grade}</strong></div>
          </div>
          <div style="font-size: 10px; color: #475569;">Click polygon to view full advisory</div>
        </div>
      `;

      polygon.bindPopup(popupContent);

      polygon.on('click', () => {
        onSelectRecord(record);
      });

      polygon.addTo(group);
    });

    if (displayRecords.length > 0 && !selectedRecord) {
      map.fitBounds(group.getBounds(), { padding: [40, 40], maxZoom: 12 });
    }
  }, [records, activeLayer, opacity, filterDistrict, selectedRecord, onSelectRecord]);

  // Zoom to selected record
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedRecord) return;

    map.flyTo([selectedRecord.lat, selectedRecord.lng], 14, {
      duration: 1.2
    });
  }, [selectedRecord]);

  const activeRecord = selectedRecord || records[0];

  return (
    <div className="space-y-4">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            Satellite & Drone Multispectral WebGIS Viewer
          </h2>
          <p className="text-xs text-slate-400">
            Assam State Space Application Centre (ASSAC) Sentinel-2 & UAV Orthomosaic Telemetry
          </p>
        </div>

        {/* Layer Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex rounded-lg border border-slate-700 bg-slate-900 p-0.5">
            <button
              onClick={() => setActiveLayer('NDVI')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                activeLayer === 'NDVI' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Normalized Difference Vegetation Index (Canopy Vigor)"
            >
              NDVI Vigor
            </button>
            <button
              onClick={() => setActiveLayer('NDWI')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                activeLayer === 'NDWI' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Normalized Difference Water Index (Moisture & Flood)"
            >
              NDWI Moisture
            </button>
            <button
              onClick={() => setActiveLayer('PEST_HEATMAP')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                activeLayer === 'PEST_HEATMAP' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Epidemiological Outbreak Vulnerability Corridors"
            >
              Pest Outbreak
            </button>
            <button
              onClick={() => setActiveLayer('DRONE_ORTHO')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                activeLayer === 'DRONE_ORTHO' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="ASSAC Sub-Meter Drone Orthomosaic"
            >
              Drone 5cm
            </button>
          </div>

          {/* Opacity slider */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 px-2.5 py-1 rounded-lg">
            <span className="text-slate-400 text-[11px]">Opacity:</span>
            <input
              type="range"
              min="0.3"
              max="1.0"
              step="0.05"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Main Map + Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Map Container (2 Cols) */}
        <div className="lg:col-span-2 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden relative shadow-lg min-h-[500px]">
          <div ref={mapContainerRef} className="w-full h-[520px] z-0"></div>

          {/* Map Floating Legend */}
          <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-3 rounded-lg text-xs z-10 text-white shadow-xl max-w-xs">
            <div className="font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>Layer: {activeLayer} Legend</span>
            </div>
            
            {activeLayer === 'NDVI' && (
              <div className="space-y-1 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-emerald-700"></span>
                  <span>&gt; 0.75: Dense Healthy Canopy</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-lime-500"></span>
                  <span>0.60 - 0.75: Moderate Vigor</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-amber-400"></span>
                  <span>0.50 - 0.60: Early Stress / Nutrient Deficit</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-rose-500"></span>
                  <span>&lt; 0.50: Severe Chlorosis / Disease Blight</span>
                </div>
              </div>
            )}

            {activeLayer === 'NDWI' && (
              <div className="space-y-1 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-sky-600"></span>
                  <span>&gt; 0.25: Excessive Ponding / Flood Inundation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-cyan-500"></span>
                  <span>0.05 - 0.25: Optimal Irrigation Level</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-orange-500"></span>
                  <span>&lt; 0.05: Moisture Deficit / Drought Stress</span>
                </div>
              </div>
            )}

            {activeLayer === 'PEST_HEATMAP' && (
              <div className="space-y-1 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-rose-600"></span>
                  <span>High Risk Outbreak Corridor (&gt;75%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-amber-500"></span>
                  <span>Moderate Pathogen Exposure (40-75%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-emerald-500"></span>
                  <span>Low Risk (&lt;40%)</span>
                </div>
              </div>
            )}

            {activeLayer === 'DRONE_ORTHO' && (
              <div className="text-[11px] text-slate-300">
                UAV 5cm/pixel resolution orthomosaics provided by Assam State Space Application Centre.
              </div>
            )}
          </div>
        </div>

        {/* Right Plot Inspector Panel (1 Col) */}
        {activeRecord && (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex flex-col justify-between shadow-lg space-y-4">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-700">
                <span className="text-xs font-mono text-emerald-400">{activeRecord.plotId}</span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  activeRecord.grade === 'GRADE_A' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                  activeRecord.grade === 'GRADE_B' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                  activeRecord.grade === 'GRADE_C' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                  'bg-rose-950 text-rose-300 border border-rose-800 animate-pulse'
                }`}>
                  {activeRecord.grade.replace('_', ' ')}
                </span>
              </div>

              {/* Farmer and Plot Identity */}
              <div className="mt-3">
                <h3 className="text-base font-bold text-white">{activeRecord.farmerName}</h3>
                <div className="text-xs text-slate-400 mt-0.5">
                  {activeRecord.dagNumber} • {activeRecord.pattaNumber}
                </div>
                <div className="text-xs text-slate-300 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{activeRecord.village}, {activeRecord.block}, {activeRecord.district}</span>
                </div>
              </div>

              {/* Crop & Acreage */}
              <div className="mt-4 bg-slate-900/80 p-3 rounded-lg border border-slate-700/60 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Crop:</span>
                  <span className="text-slate-200 font-medium">{activeRecord.crop}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Phenological Stage:</span>
                  <span className="text-emerald-400 font-medium">{activeRecord.stage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Area:</span>
                  <span className="text-slate-200 font-mono">
                    {activeRecord.area.bigha}B {activeRecord.area.katha}K {activeRecord.area.lesa}L ({(activeRecord.area.sqMeters / 10000).toFixed(2)} Ha)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Health Index (CHI):</span>
                  <span className="font-bold text-emerald-300 font-mono">{activeRecord.cropHealthIndex}/100</span>
                </div>
              </div>

              {/* Spectral Telemetry Gauges */}
              <div className="mt-4">
                <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Space Telemetry (Sentinel-2 10m Bands)</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/60">
                    <span className="text-slate-400 text-[11px]">NDVI Vigor</span>
                    <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">
                      {activeRecord.spectral.ndvi.toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/60">
                    <span className="text-slate-400 text-[11px]">NDWI Moisture</span>
                    <div className="text-lg font-bold font-mono text-sky-400 mt-0.5">
                      {activeRecord.spectral.ndwi.toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/60">
                    <span className="text-slate-400 text-[11px]">Soil Moisture</span>
                    <div className="text-sm font-bold font-mono text-slate-200 mt-0.5">
                      {activeRecord.spectral.soilMoisturePct}% Vol
                    </div>
                  </div>
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/60">
                    <span className="text-slate-400 text-[11px]">Canopy Temp</span>
                    <div className="text-sm font-bold font-mono text-amber-300 mt-0.5">
                      {activeRecord.spectral.canopyTemp}°C
                    </div>
                  </div>
                </div>
              </div>

              {/* Pest & Disease Diagnostic */}
              <div className="mt-4 bg-rose-950/20 border border-rose-800/40 p-3 rounded-lg text-xs">
                <div className="flex items-center justify-between text-rose-300 font-semibold">
                  <span>Pest Risk: {activeRecord.primaryPest.split('(')[0]}</span>
                  <span className="font-mono">{activeRecord.pestProbabilityPct}%</span>
                </div>
                <div className="mt-1 text-[11px] text-slate-300">
                  Trajectory: <strong className="text-rose-400">{activeRecord.riskTrajectory}</strong> over next 5 days.
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2 border-t border-slate-700">
              <button
                onClick={() => onSelectRecord(activeRecord)}
                className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Open Full Advisory & Diagnostics</span>
              </button>

              {activeRecord.grade === 'GRADE_D' && (
                <button
                  onClick={() => onDispatchScouting(activeRecord)}
                  className="w-full py-2 px-3 rounded-lg bg-rose-700 hover:bg-rose-600 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Extension Officer (ADO)</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
