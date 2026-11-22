import React, { useState } from 'react';
import { 
  Plane, 
  Cpu, 
  Layers, 
  Camera, 
  Compass, 
  BatteryCharging, 
  ShieldCheck, 
  CloudSun, 
  Radio, 
  Sparkles, 
  CheckCircle2, 
  Sliders, 
  Download, 
  Play, 
  Activity,
  Droplets,
  Zap,
  Navigation
} from 'lucide-react';
import { 
  initialDroneFleet, 
  multispectralSensors, 
  initialDroneMissions 
} from '../data/mockAssamCropData';
import { DroneAirframe, DroneFlightMission } from '../types/cropHealth';

export const DroneTechnologyPage: React.FC = () => {
  const [selectedAirframe, setSelectedAirframe] = useState<DroneAirframe>(initialDroneFleet[0]);
  const [missions, setMissions] = useState<DroneFlightMission[]>(initialDroneMissions);
  const [activeTabSection, setActiveTabSection] = useState<'AIRFRAMES' | 'SENSORS' | 'AVIONICS' | 'EDGE_AI' | 'ASSAM_ADAPTATIONS'>('AIRFRAMES');

  return (
    <div className="space-y-6">
      {/* Page Title & Context Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-2">
              <Plane className="w-3.5 h-3.5 text-emerald-600" />
              <span>Assam State Space Application Centre (ASSAC) • UAV Fleet Directorate</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Drone Technology & Remote Sensing Systems for Assam Agriculture
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Comprehensive hardware architectures, 5-band multispectral sensor payloads, centimeter-level RTK positioning, and onboard Edge AI photogrammetry pipelines engineered for Assam's unique riverine topography and micro-climates under <strong>NESFIC-D-11</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold font-mono">
              3 Active Fleet Airframes
            </span>
            <span className="px-3 py-1.5 bg-sky-50 text-sky-800 border border-sky-200 rounded-lg text-xs font-bold font-mono">
              Sub-5cm GSD Resolution
            </span>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-200 pt-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTabSection('AIRFRAMES')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTabSection === 'AIRFRAMES'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Plane className="w-4 h-4" />
            <span>1. Airframe Architectures</span>
          </button>

          <button
            onClick={() => setActiveTabSection('SENSORS')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTabSection === 'SENSORS'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>2. Multispectral & Thermal Sensors</span>
          </button>

          <button
            onClick={() => setActiveTabSection('AVIONICS')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTabSection === 'AVIONICS'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>3. RTK/PPK GNSS & Autonomy</span>
          </button>

          <button
            onClick={() => setActiveTabSection('EDGE_AI')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTabSection === 'EDGE_AI'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>4. Edge AI & Photogrammetry</span>
          </button>

          <button
            onClick={() => setActiveTabSection('ASSAM_ADAPTATIONS')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTabSection === 'ASSAM_ADAPTATIONS'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>5. Assam Agro-Climatic Adaptations</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: Airframes & Platforms */}
      {activeTabSection === 'AIRFRAMES' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Airframe Selection Cards */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Fleet Airframe Platforms ({initialDroneFleet.length})
              </h3>
              {initialDroneFleet.map(drone => (
                <div
                  key={drone.id}
                  onClick={() => setSelectedAirframe(drone)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedAirframe.id === drone.id
                      ? 'bg-emerald-50 border-emerald-500 shadow-sm ring-1 ring-emerald-500'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-800">{drone.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {drone.type}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">{drone.name}</h4>
                  <div className="text-xs text-slate-600 mt-1">Assigned: {drone.assignedDistrict}</div>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-200/80 pt-2 font-mono">
                    <span>Flight: {drone.flightTimeMin} min</span>
                    <span>Coverage: {drone.coveragePerFlightHa} Ha</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Airframe Specification Sheet (2 Cols) */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Plane className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-lg font-bold text-slate-900">{selectedAirframe.name}</h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manufacturer: {selectedAirframe.manufacturer} • DGCA Type-Certified
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 self-start sm:self-auto">
                  {selectedAirframe.status === 'READY' ? 'Ready for Mission' : 'Active In-Flight'}
                </span>
              </div>

              {/* Grid of Key Technical Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-[11px] block">Flight Endurance</span>
                  <span className="text-lg font-bold text-slate-900 font-mono">{selectedAirframe.flightTimeMin} min</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Continuous survey</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-[11px] block">Coverage / Battery</span>
                  <span className="text-lg font-bold text-emerald-700 font-mono">{selectedAirframe.coveragePerFlightHa} Ha</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Single mission sweep</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-[11px] block">Payload Capacity</span>
                  <span className="text-lg font-bold text-sky-700 font-mono">{selectedAirframe.payloadCapacityKg} kg</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Multispectral + TIR</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-[11px] block">Ingress Protection</span>
                  <span className="text-lg font-bold text-amber-700 font-mono">{selectedAirframe.ipRating.split(' ')[0]}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Monsoon moisture proof</span>
                </div>
              </div>

              {/* Deep Architecture Breakdown */}
              <div className="space-y-3 text-xs text-slate-700">
                <h4 className="font-bold text-slate-900 text-sm">Airframe Engineering Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-semibold text-slate-900 block">Structural Frame & Dimensions</span>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      Constructed with aerospace-grade 3K Toray carbon-fiber tubes with CNC aluminum joint brackets. Diagonal/Wingspan: <strong>{selectedAirframe.wingspanOrDiagonal}</strong>. Maximum Takeoff Weight (MTOW): <strong>{selectedAirframe.mtowKg} kg</strong>.
                    </p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-semibold text-slate-900 block">Power System & Propulsion</span>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      High-efficiency field-swappable battery: <strong>{selectedAirframe.batterySpecs}</strong>. Brushless DC outrunner motors with 28-inch carbon fiber folding propellers for whisper-quiet low-altitude flight.
                    </p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-semibold text-slate-900 block">Avionics & Fail-Safe Suite</span>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      <strong>{selectedAirframe.avionics}</strong>. Triple-redundant IMU with internal vibration damping. Automated Return-to-Home (RTH) on signal loss, geofence breach, or low battery ($&lt;20\%$).
                    </p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-semibold text-slate-900 block">Certified Remote Pilot</span>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      Assigned Pilot: <strong>{selectedAirframe.pilotName}</strong>. DGCA Remote Pilot License: <strong>{selectedAirframe.pilotLicense}</strong>. Complete Digital Sky green-zone compliance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Operational Suitability Matrix */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-950">
                <span className="font-bold block mb-1">Assam Agricultural Terrain Suitability:</span>
                <p className="leading-relaxed">
                  {selectedAirframe.type === 'Multi-Rotor Hexacopter' 
                    ? 'The Multi-Rotor Hexacopter is optimized for smallholder fragmented rice fields across Kamrup, Jorhat, and Barpeta. Vertical takeoff capability enables immediate launch from village bunds (ails), bamboo groves, and muddy field tracks without requiring clear runways.'
                    : 'The Hybrid VTOL Fixed-Wing is engineered for large contiguous agricultural circles along the Brahmaputra River floodplain in Nagaon and Golaghat. Combining vertical rotor takeoff with efficient fixed-wing cruise, it covers over 450 Hectares in a single battery sortie.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: Multispectral & Thermal Sensors */}
      {activeTabSection === 'SENSORS' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Camera className="w-5 h-5 text-emerald-600" />
                <span>6-Band Multispectral & Radiometric Thermal Sensing Payload</span>
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Synchronized global-shutter optical array providing sub-5cm Ground Sampling Distance (GSD) at 80m flight altitude
              </p>
            </div>

            {/* Sensor Optical Bands Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Spectral Band</th>
                    <th className="py-3 px-3">Central Wavelength</th>
                    <th className="py-3 px-3">Bandwidth (FWHM)</th>
                    <th className="py-3 px-4">Agronomic Application in Assam Agriculture</th>
                    <th className="py-3 px-3">Optical Sensitivity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-800">
                  {multispectralSensors.map((s, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${
                          s.band.includes('Blue') ? 'bg-sky-500' :
                          s.band.includes('Green') ? 'bg-emerald-500' :
                          s.band.includes('RedEdge') ? 'bg-amber-500' :
                          s.band.includes('Red') ? 'bg-rose-500' :
                          s.band.includes('NIR') ? 'bg-purple-600' : 'bg-red-700'
                        }`}></span>
                        <span>{s.band}</span>
                      </td>
                      <td className="py-3 px-3 font-mono font-semibold text-emerald-700">{s.wavelengthNm} nm</td>
                      <td className="py-3 px-3 font-mono text-slate-600">&plusmn;{s.bandwidthNm} nm</td>
                      <td className="py-3 px-4 text-slate-700">{s.primaryAgronomicIndicator}</td>
                      <td className="py-3 px-3 text-[11px] text-slate-500 font-medium">{s.sensitivity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Radiometric Calibration Accessories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <CloudSun className="w-4 h-4 text-amber-500" />
                  <span>Downwelling Light Sensor (DLS 2)</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Mounted on top of the drone fuselage, the DLS 2 measures ambient solar irradiance and sun angle continuously during flight. It normalizes image reflectance in real-time, preventing spectral errors caused by sudden cloud cover fluctuations in Assam.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Sliders className="w-4 h-4 text-emerald-600" />
                  <span>Calibrated Reflectance Panel (CRP)</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  A high-grade diffuse radiometric target photographed on the ground before and after every flight. Provides ground-truth absolute reflectance calibration across all 5 optical bands for repeatable longitudinal time-series analytics.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: Avionics & Autonomy */}
      {activeTabSection === 'AVIONICS' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-600" />
                <span>Centimeter RTK/PPK GNSS Positioning & Autonomous Navigation</span>
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Precision spatial locking ensuring every multispectral pixel aligns perfectly with cadastral Dag boundaries
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Navigation className="w-4 h-4 text-emerald-600" />
                  <span>Dual RTK/PPK GNSS</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Multi-constellation support for Indian <strong>NavIC</strong>, GPS L1/L2, GLONASS, and Galileo. Achieves horizontal precision &le; 1.5 cm without requiring manual Ground Control Points (GCPs).
                </p>
                <div className="pt-2 text-[10px] text-emerald-700 font-mono font-semibold">
                  RMS Accuracy: 0.8 cm (H) / 1.5 cm (V)
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <ShieldCheck className="w-4 h-4 text-sky-600" />
                  <span>LiDAR & Stereo Obstacle Avoidance</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Omnidirectional 360-degree millimeter-wave radar and binocular stereo vision sensors. Automatically halts and detours around tall Assam betel nut trees, bamboo groves, and high-tension transmission towers.
                </p>
                <div className="pt-2 text-[10px] text-sky-700 font-mono font-semibold">
                  Detection Range: 35 meters
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Radio className="w-4 h-4 text-purple-600" />
                  <span>Encrypted 15km Telemetry Link</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  AES-256 encrypted dual-band (2.4GHz / 5.8GHz) frequency-hopping radio link. Streams live 1080p video telemetry and flight coordinates directly to the mobile Ground Control Station (GCS).
                </p>
                <div className="pt-2 text-[10px] text-purple-700 font-mono font-semibold">
                  Max Range: 15 km Line-of-Sight
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: Edge AI & Photogrammetry */}
      {activeTabSection === 'EDGE_AI' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-emerald-600" />
                <span>Onboard Edge AI Compute & ASSAC Photogrammetry Pipeline</span>
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Real-time in-flight computer vision coupled with distributed Structure-from-Motion (SfM) processing
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Onboard Edge AI (NVIDIA Jetson Orin Nano)</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  A dedicated 40 TOPS onboard AI module processes multispectral video frames in real time as the drone flies. Running quantized TensorRT U-Net and MobileNet models, it detects severe chlorosis patches and weed clusters instantly, alerting pilots without post-flight latency.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Layers className="w-4 h-4 text-sky-600" />
                  <span>Cloud-Optimized GeoTIFF (COG) Output</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Captured aerial images are converted via automated SfM photogrammetry into sub-meter Digital Surface Models (DSM) and orthomosaics. Exported directly as Cloud-Optimized GeoTIFFs (COG) for instant WebGIS streaming into the ASSAC GeoServer.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: Assam Agro-Climatic Adaptations */}
      {activeTabSection === 'ASSAM_ADAPTATIONS' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Field-Tested Operational Adaptations for Assam</span>
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Engineered to withstand extreme monsoon humidity, riverine char isolation, and North East terrain
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-950">
                  <Droplets className="w-4 h-4 text-emerald-600" />
                  <span>IP54 Tropicalized Weatherproofing</span>
                </div>
                <p className="text-emerald-900 text-[11px] leading-relaxed">
                  Internal PCBs conformal-coated with silicone elastomer to resist 95% morning relative humidity and light tropical drizzle common during Assam's Sali paddy season.
                </p>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-950">
                  <BatteryCharging className="w-4 h-4 text-amber-600" />
                  <span>Mobile Solar Fast-Charging Hub</span>
                </div>
                <p className="text-amber-900 text-[11px] leading-relaxed">
                  Deployable field charging station with 1.2kW solar panels and LiFePO4 power bank, allowing continuous survey operations in remote Brahmaputra char islands lacking grid power.
                </p>
              </div>

              <div className="p-4 bg-sky-50 rounded-xl border border-sky-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sky-950">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  <span>DGCA & Northeast SOP Protocol</span>
                </div>
                <p className="text-sky-900 text-[11px] leading-relaxed">
                  Pre-configured compliance with DGCA Digital Sky requirements, automatic No-Fly-Zone (NFZ) caging for border districts, and standardized field logging for ADO officers.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Flight Operations Log */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              <span>Assam Agricultural Drone Flight Mission Log</span>
            </h3>
            <p className="text-xs text-slate-500">
              Active and scheduled UAV remote sensing missions across Kamrup, Nagaon, and Jorhat agricultural blocks
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono">ASSAC Fleet Dispatch</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Mission ID</th>
                <th className="py-2.5 px-3">Drone Airframe</th>
                <th className="py-2.5 px-3">District & Block</th>
                <th className="py-2.5 px-3">Survey Targets</th>
                <th className="py-2.5 px-3">Altitude & GSD</th>
                <th className="py-2.5 px-3">Coverage (Ha)</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {missions.map(m => (
                <tr key={m.missionId} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-emerald-700">{m.missionId}</td>
                  <td className="py-3 px-3 font-medium text-slate-900">{m.droneName}</td>
                  <td className="py-3 px-3">{m.block}, {m.district}</td>
                  <td className="py-3 px-3 text-slate-600">{m.targetPlots}</td>
                  <td className="py-3 px-3 font-mono text-slate-600">{m.altitudeM}m ({m.gsdCmPerPixel} cm/px)</td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">{m.areaSurveyedHa} Ha</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      m.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' :
                      m.status === 'IN_FLIGHT' ? 'bg-sky-100 text-sky-800 animate-pulse' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {m.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
