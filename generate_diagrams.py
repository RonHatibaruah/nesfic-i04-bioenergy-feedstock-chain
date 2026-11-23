import os
os.environ['MPLCONFIGDIR'] = '/tmp/matplotlib-cache'
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, Rectangle, Circle, Polygon
import numpy as np
workspace_dir = os.path.dirname(os.path.abspath(__file__))
out_dir = os.path.join(workspace_dir, 'assets', 'proposal_images')
os.makedirs(out_dir, exist_ok=True)

# -------------------------------------------------------------
# DIAGRAM 1: Seasonal Biomass Degradation vs JaivikSuraksha Assurance
# -------------------------------------------------------------
def create_diagram_1():
    fig, ax = plt.subplots(figsize=(12, 6.5), dpi=200)
    ax.set_facecolor('#f8fafc')
    fig.patch.set_facecolor('#f8fafc')
    ax.axis('off')

    # Title
    ax.text(0.5, 0.95, "PARADIGM SHIFT: MONSOON FEEDSTOCK DEGRADATION VS. JAIVIKSURAKSHA ASSURANCE", 
            ha='center', va='center', fontsize=13, fontweight='bold', color='#0f172a')
    ax.text(0.5, 0.90, "Industry Track • MC² Foundation • NESFIC-I-04 • Bioenergy Feedstock Preservation & Waste Valorisation", 
            ha='center', va='center', fontsize=9, color='#059669')

    # Left Box - Current Vulnerability
    box_left = FancyBboxPatch((0.04, 0.08), 0.43, 0.76, boxstyle="round,pad=0.02,rounding_size=0.03", 
                              facecolor='#fff1f2', edgecolor='#fda4af', linewidth=2)
    ax.add_patch(box_left)
    ax.text(0.255, 0.80, "CONVENTIONAL SUPPLY CHAIN (MONSOON FAILURE)", ha='center', va='center', 
            fontsize=11, fontweight='bold', color='#9f1239')

    left_steps = [
        ("1. Open-Air Ambient Storage", "Unsealed stacks exposed to 2,500+ mm rain & >90% RH.\nMoisture content skyrockets from 14% to >45%.", '#ffe4e6'),
        ("2. Microbial Rot & Matter Loss", "Rapid mold proliferation (Aspergillus, Trichoderma).\n30%–45% dry-matter loss & severe cellulose decay.", '#ffe4e6'),
        ("3. Spontaneous Combustion Hazard", "Exothermic microbial self-heating hits 65°C–80°C.\nCatastrophic warehouse & depot fires destroy reserves.", '#fecdd3'),
        ("4. Monsoon Refinery Starvation", "Feedstock supply halts; Plant Load Factor drops <45%.\nLignin & digestate dumped as costly liabilities.", '#fda4af')
    ]

    for i, (stitle, sdesc, scolor) in enumerate(left_steps):
        y_pos = 0.65 - (i * 0.16)
        patch = FancyBboxPatch((0.07, y_pos - 0.05), 0.37, 0.12, boxstyle="round,pad=0.01,rounding_size=0.02",
                               facecolor=scolor, edgecolor='#f43f5e', linewidth=1)
        ax.add_patch(patch)
        ax.text(0.09, y_pos + 0.03, stitle, fontsize=9.5, fontweight='bold', color='#881337', va='center')
        ax.text(0.09, y_pos - 0.02, sdesc, fontsize=8, color='#4c0519', va='center')

    # Right Box - JaivikSuraksha Solution
    box_right = FancyBboxPatch((0.53, 0.08), 0.43, 0.76, boxstyle="round,pad=0.02,rounding_size=0.03", 
                               facecolor='#f0fdf4', edgecolor='#86efac', linewidth=2)
    ax.add_patch(box_right)
    ax.text(0.745, 0.80, "JAIVIKSURAKSHA (CLIMATE-RESILIENT CIRCULAR GRID)", ha='center', va='center', 
            fontsize=11, fontweight='bold', color='#166534')

    right_steps = [
        ("1. Engineered Anaerobic Ensiling", "Wet biomass inoculated with lactic bacteria in bunker silos.\nRapid pH drop <4.0 arrests mold and locks glucan/xylan.", '#dcfce7'),
        ("2. Parasitic Flue-Gas Pre-Drying", "Harnesses 140°C refinery waste heat to dry straw <12%.\nHydrophobic botanical coating prevents humidity regain.", '#dcfce7'),
        ("3. IoT Smart Probe Telemetry", "Multi-depth SS316 spears track moisture, temp & CO2.\nAutomated nitrogen purge averts self-heating fires.", '#bbf7d0'),
        ("4. 365-Day 92%+ Biorefinery PLF", "Guaranteed year-round feedstock off-take buffer.\n100% waste valorisation: Lignin -> Bio-Bitumen, Slurry -> FOM.", '#86efac')
    ]

    for i, (stitle, sdesc, scolor) in enumerate(right_steps):
        y_pos = 0.65 - (i * 0.16)
        patch = FancyBboxPatch((0.56, y_pos - 0.05), 0.37, 0.12, boxstyle="round,pad=0.01,rounding_size=0.02",
                               facecolor=scolor, edgecolor='#22c55e', linewidth=1)
        ax.add_patch(patch)
        ax.text(0.58, y_pos + 0.03, stitle, fontsize=9.5, fontweight='bold', color='#14532d', va='center')
        ax.text(0.58, y_pos - 0.02, sdesc, fontsize=8, color='#052e16', va='center')

    plt.tight_layout()
    plt.savefig(os.path.join(out_dir, 'diagram_1_before_after_workflow.jpg'), dpi=200)
    plt.close()

# -------------------------------------------------------------
# DIAGRAM 2: Dual-Pillar End-to-End System Architecture
# -------------------------------------------------------------
def create_diagram_2():
    fig, ax = plt.subplots(figsize=(12, 6.5), dpi=200)
    ax.set_facecolor('#f8fafc')
    fig.patch.set_facecolor('#f8fafc')
    ax.axis('off')

    ax.text(0.5, 0.95, "DUAL-PILLAR ARCHITECTURE: MONSOON PRESERVATION & CIRCULAR WASTE VALORISATION", 
            ha='center', va='center', fontsize=12.5, fontweight='bold', color='#0f172a')
    ax.text(0.5, 0.90, "Integrated Bioenergy Supply Chain & Zero-Waste Biorefinery Refinery Loop (NESFIC-I-04)", 
            ha='center', va='center', fontsize=9, color='#0284c7')

    # Top Pipeline: Biomass Harvest -> Aggregation -> Preservation -> Biorefinery
    p1 = FancyBboxPatch((0.03, 0.52), 0.94, 0.33, boxstyle="round,pad=0.02,rounding_size=0.02",
                        facecolor='#eff6ff', edgecolor='#93c5fd', linewidth=1.5)
    ax.add_patch(p1)
    ax.text(0.05, 0.82, "PILLAR 1: RESILIENT FEEDSTOCK PRESERVATION & BUFFER STORAGE CHAIN", 
            fontsize=10.5, fontweight='bold', color='#1e40af')

    boxes_p1 = [
        ("Harvest & Village FPOs", "Paddy Straw (Kharif/Boro)\nBamboo Waste (30+ Species)\nMustard Stover & Bagasse", 0.06),
        ("Decentralized Cluster Hubs", "25-35 km Economic Radius\nRapid In-situ Moisture QA\nAutomated Weighbridge DBT", 0.29),
        ("Preservation Dual-Path", "A: Anaerobic Ensiling (pH<4)\nB: Parasitic Flue-Gas Drying\nC: Hydrophobic Densification", 0.52),
        ("Continuous Refinery Intake", "Guaranteed 60-Day Buffer\nNumaligarh 2G & CBG Units\n92%+ Sustained Plant PLF", 0.75)
    ]

    for title, desc, x in boxes_p1:
        box = FancyBboxPatch((x, 0.56), 0.20, 0.22, boxstyle="round,pad=0.01,rounding_size=0.02",
                             facecolor='#ffffff', edgecolor='#3b82f6', linewidth=1)
        ax.add_patch(box)
        ax.text(x + 0.10, 0.73, title, fontsize=8.5, fontweight='bold', color='#1e3a8a', ha='center')
        ax.text(x + 0.10, 0.64, desc, fontsize=7.5, color='#334155', ha='center', va='center')

    # Arrows for top pipeline
    for ax_x in [0.265, 0.495, 0.725]:
        ax.annotate('', xy=(ax_x + 0.02, 0.67), xytext=(ax_x - 0.01, 0.67),
                    arrowprops=dict(facecolor='#2563eb', edgecolor='#2563eb', arrowstyle='->', lw=2))

    # Bottom Pipeline: Biorefinery -> Secondary Waste Streams -> Valorisation
    p2 = FancyBboxPatch((0.03, 0.08), 0.94, 0.38, boxstyle="round,pad=0.02,rounding_size=0.02",
                        facecolor='#f0fdf4', edgecolor='#86efac', linewidth=1.5)
    ax.add_patch(p2)
    ax.text(0.05, 0.42, "PILLAR 2: BIO-REFINERY SECONDARY WASTE STREAM VALORISATION LOOP", 
            fontsize=10.5, fontweight='bold', color='#166534')

    boxes_p2 = [
        ("Enzymatic Lignin Cake", "120 Tonnes/day Solid Residue\nSulfur-Free, Klason Lignin >82%\nReplaces Petroleum Bitumen", 0.06, '#ecfdf5', '#059669'),
        ("Bio-Bitumen & Resins", "20% Bitumen Extender (VG-30)\nIRC:SP:53 Pavement Standard\nThermoset Phenolic Resins", 0.29, '#ecfdf5', '#059669'),
        ("Digestate Slurry (FOM)", "High-Nutrient Centrifuged Slurry\nFortified with Azotobacter & P\nCertified FCO 1985 Tea Manure", 0.52, '#ecfdf5', '#059669'),
        ("Parasitic Biomethane Loop", "High-COD Process Wastewater\nAnaerobic Digestion to Biogas\nPowers Rotary Feedstock Dryer", 0.75, '#ecfdf5', '#059669')
    ]

    for title, desc, x, bg, bd in boxes_p2:
        box = FancyBboxPatch((x, 0.12), 0.20, 0.26, boxstyle="round,pad=0.01,rounding_size=0.02",
                             facecolor=bg, edgecolor=bd, linewidth=1)
        ax.add_patch(box)
        ax.text(x + 0.10, 0.33, title, fontsize=8.5, fontweight='bold', color='#065f46', ha='center')
        ax.text(x + 0.10, 0.22, desc, fontsize=7.5, color='#1e293b', ha='center', va='center')

    # Connecting arrows for circular flow
    for ax_x in [0.265, 0.495, 0.725]:
        ax.annotate('', xy=(ax_x + 0.02, 0.25), xytext=(ax_x - 0.01, 0.25),
                    arrowprops=dict(facecolor='#059669', edgecolor='#059669', arrowstyle='->', lw=2))

    plt.tight_layout()
    plt.savefig(os.path.join(out_dir, 'diagram_2_dual_system_reconciliation.jpg'), dpi=200)
    plt.close()

# -------------------------------------------------------------
# DIAGRAM 3: Feedstock & Waste Stream Catalog
# -------------------------------------------------------------
def create_diagram_3():
    fig, ax = plt.subplots(figsize=(12, 6.5), dpi=200)
    ax.set_facecolor('#f8fafc')
    fig.patch.set_facecolor('#f8fafc')
    ax.axis('off')

    ax.text(0.5, 0.95, "ASSAM & NORTH-EAST BIOMASS FEEDSTOCK & REFINERY WASTE STREAM CATALOG", 
            ha='center', va='center', fontsize=12.5, fontweight='bold', color='#0f172a')
    ax.text(0.5, 0.90, "Biochemical Profiling, Seasonal Harvest Windows & Circular Conversion Parameters", 
            ha='center', va='center', fontsize=9, color='#475569')

    streams = [
        ("1. Sali/Boro Paddy Straw", "4.8M MT/yr • Glucan: 38% • Xylan: 21%\nMoisture at Harvest: 25%–60%\nSolution: Lactic Ensiling & Flue Drying", 0.05, 0.50, '#dbeafe', '#2563eb'),
        ("2. Bamboo Harvest Offcuts", "2.6M MT/yr • Glucan: 44% • Lignin: 26%\nMoisture at Harvest: 35%–55%\nSolution: Chipping & Hermetic Bunker Silos", 0.36, 0.50, '#dbeafe', '#2563eb'),
        ("3. Mustard Stover & Bagasse", "1.4M MT/yr • Cellulose: 41% • Ash: 6.2%\nMoisture at Harvest: 16%–30%\nSolution: Hydrophobic Pelletization", 0.67, 0.50, '#dbeafe', '#2563eb'),
        ("4. Hydrolysed Lignin Cake", "38,000 MT/yr • Klason Lignin: >82%\nSulfur-Free • Moisture: 38%–42%\nValorisation: VG-30 Bio-Bitumen Extender", 0.05, 0.12, '#fef3c7', '#d97706'),
        ("5. Fermented Digestate (FOM)", "28,000 MT/yr • Organic Carbon: >21%\nNPK >3.6% • Pathogen-Free Slurry\nValorisation: Fortified Tea Bio-Fertilizer", 0.36, 0.12, '#dcfce7', '#16a34a'),
        ("6. Thin Stillage / Condensate", "150,000 m³/yr • COD: 18,000 mg/L\nHigh Volatile Fatty Acids (VFA)\nValorisation: Closed-Loop Biomethane Fuel", 0.67, 0.12, '#ccfbf1', '#0d9488')
    ]

    for title, desc, x, y, bg, bd in streams:
        box = FancyBboxPatch((x, y), 0.28, 0.34, boxstyle="round,pad=0.015,rounding_size=0.02",
                             facecolor=bg, edgecolor=bd, linewidth=1.5)
        ax.add_patch(box)
        ax.text(x + 0.14, y + 0.28, title, fontsize=9.5, fontweight='bold', color='#0f172a', ha='center')
        ax.text(x + 0.14, y + 0.14, desc, fontsize=8, color='#334155', ha='center', va='center')

    plt.tight_layout()
    plt.savefig(os.path.join(out_dir, 'diagram_3_cadastral_anomaly_catalog.jpg'), dpi=200)
    plt.close()

# -------------------------------------------------------------
# DIAGRAM 4: Biomass Quality & Rot Vulnerability Index (BQVI)
# -------------------------------------------------------------
def create_diagram_4():
    fig, ax = plt.subplots(figsize=(12, 6.5), dpi=200)
    ax.set_facecolor('#f8fafc')
    fig.patch.set_facecolor('#f8fafc')
    ax.axis('off')

    ax.text(0.5, 0.95, "BIOMASS QUALITY & ROT VULNERABILITY INDEX (BQVI 0–100) HIERARCHY", 
            ha='center', va='center', fontsize=12.5, fontweight='bold', color='#0f172a')
    ax.text(0.5, 0.90, "Multi-Criteria Sensor Telemetry & Biochemical Classification for Depot Storage Triage", 
            ha='center', va='center', fontsize=9, color='#059669')

    # 4 Classification Tiers
    tiers = [
        ("GRADE A: OPTIMAL PRESERVATION (BQVI 85–100)", "Moisture: <14% (Dry) or pH 3.8–4.2 (Ensiled) • Core Temp: <35°C • Spores: <100 CFU/g\nAction: Ready for continuous 365-day biorefinery off-take. Zero mold, zero matter loss.", 0.72, '#dcfce7', '#15803d'),
        ("GRADE B: STABLE BUFFER RESERVE (BQVI 70–84)", "Moisture: 14%–18% • Ensilage pH: 4.2–4.5 • Core Temp: 35°C–42°C • Low CO2 flux\nAction: Normal automated ventilation schedule; scheduled for processing within 90 days.", 0.52, '#eff6ff', '#2563eb'),
        ("GRADE C: ACTIVE MONSOON RISK (BQVI 50–69)", "Moisture: 18%–25% • Core Temp: 43°C–52°C • Elevated CO2 (>1,200 ppm) • Mild mold\nAction: Priority dry-flue purge triggered; divert directly to boiler or ensiling bunker.", 0.32, '#fef9c3', '#ca8a04'),
        ("GRADE D: CRITICAL HEATING / SPOILAGE (BQVI <50)", "Moisture: >25% • Core Temp: >55°C • Self-heating fire precursor • High bacterial putrefaction\nAction: EMERGENCY Nitrogen purge activated; isolate stack immediately to avert blaze.", 0.12, '#fee2e2', '#b91c1c')
    ]

    for title, desc, y, bg, bd in tiers:
        box = FancyBboxPatch((0.08, y), 0.84, 0.16, boxstyle="round,pad=0.015,rounding_size=0.02",
                             facecolor=bg, edgecolor=bd, linewidth=1.5)
        ax.add_patch(box)
        ax.text(0.11, y + 0.11, title, fontsize=9.5, fontweight='bold', color=bd)
        ax.text(0.11, y + 0.04, desc, fontsize=8, color='#1e293b')

    plt.tight_layout()
    plt.savefig(os.path.join(out_dir, 'diagram_4_land_health_score_hierarchy.jpg'), dpi=200)
    plt.close()

# -------------------------------------------------------------
# DIAGRAM 5: Depot QA & IoT Sensor Telemetry Console
# -------------------------------------------------------------
def create_diagram_5():
    fig, ax = plt.subplots(figsize=(12, 6.5), dpi=200)
    ax.set_facecolor('#f8fafc')
    fig.patch.set_facecolor('#f8fafc')
    ax.axis('off')

    ax.text(0.5, 0.95, "DECENTRALIZED DEPOT QA & IOT SENSOR SPEAR TELEMETRY SUITE", 
            ha='center', va='center', fontsize=12.5, fontweight='bold', color='#0f172a')
    ax.text(0.5, 0.90, "LoRaWAN-Connected Smart Depot Monitoring & In-Situ Moisture Classification Portal", 
            ha='center', va='center', fontsize=9, color='#0284c7')

    # Left: Smart Sensor Spear Specs
    box1 = FancyBboxPatch((0.05, 0.10), 0.43, 0.74, boxstyle="round,pad=0.02,rounding_size=0.02",
                          facecolor='#ffffff', edgecolor='#cbd5e1', linewidth=1.5)
    ax.add_patch(box1)
    ax.text(0.265, 0.80, "SMART PROBE SPEAR (SS-316)", fontsize=10.5, fontweight='bold', color='#1e293b', ha='center')
    
    spear_specs = [
        "• 1.8m Stainless Steel (SS316) Penetrating Shaft",
        "• 4-Tier DS18B20 Digital Temp Sensors (±0.1°C)",
        "• Frequency Domain Reflectometry (FDR) Moisture (5–80%)",
        "• Headspace NDIR CO2 (0–50,000 ppm) & CO Gas Sensor",
        "• LoRaWAN 865–867 MHz Transceiver (12 km range)",
        "• 10W Solar PV + LiFePO4 Battery (14-day zero-sun autonomy)",
        "• Automated Relay Output for Dry N2 / Vent Fans"
    ]
    for i, spec in enumerate(spear_specs):
        ax.text(0.08, 0.72 - (i * 0.08), spec, fontsize=8.5, color='#334155')

    # Right: Depot QA & In-situ Workflow
    box2 = FancyBboxPatch((0.52, 0.10), 0.43, 0.74, boxstyle="round,pad=0.02,rounding_size=0.02",
                          facecolor='#ffffff', edgecolor='#cbd5e1', linewidth=1.5)
    ax.add_patch(box2)
    ax.text(0.735, 0.80, "DEPOT QA & TRIAGE WORKFLOW", fontsize=10.5, fontweight='bold', color='#1e293b', ha='center')

    qa_steps = [
        ("1. Consignment Arrival", "Truck/Tractor weighed on digital weighbridge.\nBale density & species registered in mobile app."),
        ("2. Instant Moisture Testing", "Calibrated RF handheld probe checks core moisture.\nClassifies into Dry Path (<20%) vs Wet Path (>40%)."),
        ("3. Ensiling / Storage Routing", "High-moisture straw routed to anaerobic bunker silo;\nInoculated with Lactobacillus plantarum (10^6 CFU/g)."),
        ("4. Automated Farmer Settlement", "Instant SMS/DBT payment voucher generated;\nWeight, moisture discount & net rate certified.")
    ]
    for i, (title, desc) in enumerate(qa_steps):
        y_pos = 0.70 - (i * 0.14)
        ax.text(0.55, y_pos + 0.03, title, fontsize=9, fontweight='bold', color='#0284c7')
        ax.text(0.55, y_pos - 0.03, desc, fontsize=7.5, color='#475569')

    plt.tight_layout()
    plt.savefig(os.path.join(out_dir, 'diagram_5_lat_mandal_mobile_app.jpg'), dpi=200)
    plt.close()

# -------------------------------------------------------------
# DIAGRAM 6: Bilingual Farmer Off-take & Settlement Slip
# -------------------------------------------------------------
def create_diagram_6():
    fig, ax = plt.subplots(figsize=(12, 6.5), dpi=200)
    ax.set_facecolor('#f8fafc')
    fig.patch.set_facecolor('#f8fafc')
    ax.axis('off')

    ax.text(0.5, 0.95, "BILINGUAL FARMER OFF-TAKE SETTLEMENT SLIP (ASSAMESE / ENGLISH)", 
            ha='center', va='center', fontsize=12.5, fontweight='bold', color='#0f172a')
    ax.text(0.5, 0.90, "Government-Approved Bioenergy Feedstock Procurement & DBT Compensation Certificate", 
            ha='center', va='center', fontsize=9, color='#059669')

    slip_box = FancyBboxPatch((0.15, 0.08), 0.70, 0.78, boxstyle="round,pad=0.02,rounding_size=0.02",
                              facecolor='#ffffff', edgecolor='#059669', linewidth=2)
    ax.add_patch(slip_box)

    ax.text(0.5, 0.81, "JAIVIKSURAKSHA BIOENERGY AGGREGATION CERTIFICATE", 
            fontsize=11, fontweight='bold', color='#065f46', ha='center')
    ax.text(0.5, 0.76, "Jaivik Suraksha -- Bioenergy Feedstock Aggregation & Direct Payout Slip", 
            fontsize=9.5, fontweight='bold', color='#047857', ha='center')

    details = [
        ("Voucher ID / Receipt Number:", "JS-GOL-2026-0842 (Bokakhat Cluster Depot Hub)"),
        ("Farmer / Aggregator Name:", "Sri Bhaben Kalita [Farmer ID: AS-GOL-4819]"),
        ("Crop Residue / Feedstock Type:", "Sali Paddy Straw (High-Moisture Harvest Residue)"),
        ("Certified Gross Weight:", "14.850 Metric Tonnes (14,850 kg Net)"),
        ("Tested Moisture Content:", "48.2% (Wet Basis) -> Routed to Anaerobic Silo Pod"),
        ("Base Price Guarantee:", "Rs. 2,200.00 / Metric Tonne"),
        ("Net DBT Bank Transfer:", "Rs. 32,670.00 (Credited via DBT to SBI A/c ***4812)"),
        ("Carbon Offset Credit:", "18.42 MT CO2e Stubble Burning Prevented")
    ]

    for i, (k, v) in enumerate(details):
        y_pos = 0.69 - (i * 0.065)
        ax.text(0.20, y_pos, k, fontsize=8.5, fontweight='bold', color='#1e293b')
        ax.text(0.52, y_pos, v, fontsize=8.5, color='#334155')

    ax.text(0.5, 0.14, "Security Hash: SHA-256 e4f901ab...8912 | Verified by MC2 Foundation & AEDA", 
            fontsize=7.5, color='#64748b', ha='center', style='italic')

    plt.tight_layout()
    plt.savefig(os.path.join(out_dir, 'diagram_6_citizen_land_health_certificate.jpg'), dpi=200)
    plt.close()

# -------------------------------------------------------------
# DIAGRAM 7: Industrial Enterprise SCADA & Cloud Architecture
# -------------------------------------------------------------
def create_diagram_7():
    fig, ax = plt.subplots(figsize=(12, 6.5), dpi=200)
    ax.set_facecolor('#f8fafc')
    fig.patch.set_facecolor('#f8fafc')
    ax.axis('off')

    ax.text(0.5, 0.95, "ENTERPRISE SCADA & CLOUD SYSTEM ARCHITECTURE (NESFIC-I-04)", 
            ha='center', va='center', fontsize=12.5, fontweight='bold', color='#0f172a')
    ax.text(0.5, 0.90, "LoRaWAN Depot Sensors • TimescaleDB • FastAPI • React WebGIS • Biorefinery SCADA", 
            ha='center', va='center', fontsize=9, color='#0284c7')

    layers = [
        ("Layer 1: Field Sensing & IoT Telemetry", "Smart Probe Spears (SS316) • NDIR CO2 Sensors • Digital Weighbridges • LoRaWAN 865MHz • 4G Gateways", 0.72, '#eff6ff', '#3b82f6'),
        ("Layer 2: Edge Ingestion & Message Broker", "AWS IoT Core / MQTT Broker • Kafka Event Streaming • Redis 7 Cache • Micro-aeration Actuators", 0.52, '#f0fdf4', '#22c55e'),
        ("Layer 3: Core Analytical & Storage Layer", "PostgreSQL 16 + PostGIS • TimescaleDB Time-Series • Python FastAPI • Ensiling Decay Kinetics Models", 0.32, '#fef3c7', '#f59e0b'),
        ("Layer 4: Application & Decision Support", "React 18 / Vite / Tailwind • Leaflet 1.9 WebGIS • Jaivik Seva Citizen Portal • SHA-256 Audit Ledger", 0.12, '#fae8ff', '#d946ef')
    ]

    for title, desc, y, bg, bd in layers:
        box = FancyBboxPatch((0.08, y), 0.84, 0.16, boxstyle="round,pad=0.015,rounding_size=0.02",
                             facecolor=bg, edgecolor=bd, linewidth=1.5)
        ax.add_patch(box)
        ax.text(0.11, y + 0.11, title, fontsize=9.5, fontweight='bold', color='#0f172a')
        ax.text(0.11, y + 0.04, desc, fontsize=8, color='#334155')

    plt.tight_layout()
    plt.savefig(os.path.join(out_dir, 'diagram_7_enterprise_system_architecture.jpg'), dpi=200)
    plt.close()

# -------------------------------------------------------------
# DIAGRAM 8: 180-Day Biochemical Degradation & Carbohydrate Kinetics
# -------------------------------------------------------------
def create_diagram_8():
    fig, (ax1, ax2, ax3) = plt.subplots(1, 3, figsize=(14, 5.5), dpi=200)
    fig.patch.set_facecolor('#f8fafc')

    # Subplot 1: pH Trajectory
    ax1.set_facecolor('#ffffff')
    days = np.array([0, 2, 7, 14, 30, 60, 90, 120, 150, 180])
    ph_ensiled = np.array([6.45, 3.84, 3.82, 3.85, 3.86, 3.88, 3.87, 3.89, 3.88, 3.88])
    ph_ambient = np.array([6.45, 6.70, 7.10, 7.35, 7.50, 7.65, 7.75, 7.80, 7.82, 7.82])

    ax1.plot(days, ph_ensiled, 'o-', color='#15803d', linewidth=2.5, label='JaivikSuraksha (Ensiled Silo)')
    ax1.plot(days, ph_ambient, 's--', color='#b91c1c', linewidth=2.5, label='Conventional Ambient Stack')
    ax1.axhline(y=4.2, color='#0284c7', linestyle=':', label='Max Safe Mold Threshold (pH 4.2)')
    ax1.set_title('A: Silo pH Acidification Velocity', fontsize=10.5, fontweight='bold', color='#0f172a')
    ax1.set_xlabel('Storage Duration (Days)', fontsize=9, color='#334155')
    ax1.set_ylabel('Internal Biomass pH', fontsize=9, color='#334155')
    ax1.set_ylim(3.0, 8.5)
    ax1.grid(True, linestyle='--', alpha=0.5)
    ax1.legend(fontsize=7.5, loc='center right')

    # Subplot 2: Cumulative Dry-Matter Loss %
    ax2.set_facecolor('#ffffff')
    loss_ensiled = np.array([0, 0.8, 1.4, 2.1, 2.8, 3.2, 3.5, 3.7, 3.8, 3.9])
    loss_ambient = np.array([0, 3.5, 8.2, 14.5, 21.0, 27.4, 30.8, 33.2, 34.5, 35.2])

    ax2.plot(days, loss_ensiled, 'o-', color='#15803d', linewidth=2.5, label='JaivikSuraksha (3.9% Loss)')
    ax2.plot(days, loss_ambient, 's--', color='#b91c1c', linewidth=2.5, label='Ambient Monsoon (35.2% Loss)')
    ax2.fill_between(days, loss_ensiled, loss_ambient, color='#fee2e2', alpha=0.5, label='Prevented Biomass Loss')
    ax2.set_title('B: Cumulative Dry-Matter Loss (%)', fontsize=10.5, fontweight='bold', color='#0f172a')
    ax2.set_xlabel('Storage Duration (Days)', fontsize=9, color='#334155')
    ax2.set_ylabel('Dry-Matter Loss (%)', fontsize=9, color='#334155')
    ax2.set_ylim(0, 40)
    ax2.grid(True, linestyle='--', alpha=0.5)
    ax2.legend(fontsize=7.5, loc='upper left')

    # Subplot 3: Structural Polymer Retention
    ax3.set_facecolor('#ffffff')
    polymers = ['Glucan (Cellulose)', 'Xylan (Hemicell.)', 'Klason Lignin']
    harvest_vals = [38.4, 21.6, 24.5]
    ensiled_vals = [37.1, 20.2, 24.2]
    ambient_vals = [24.2, 12.1, 22.0]

    x = np.arange(len(polymers))
    w = 0.25

    ax3.bar(x - w, harvest_vals, w, label='Day 0 (Harvest)', color='#94a3b8')
    ax3.bar(x, ensiled_vals, w, label='Ensiled (Day 180)', color='#22c55e')
    ax3.bar(x + w, ambient_vals, w, label='Ambient (Day 180)', color='#ef4444')
    ax3.set_title('C: Polymer Retention (% Dry Basis)', fontsize=10.5, fontweight='bold', color='#0f172a')
    ax3.set_xticks(x)
    ax3.set_xticklabels(polymers, fontsize=8, color='#334155')
    ax3.set_ylabel('Polymer Composition (%)', fontsize=9, color='#334155')
    ax3.set_ylim(0, 45)
    ax3.grid(True, linestyle='--', alpha=0.5)
    ax3.legend(fontsize=7.5, loc='upper right')

    plt.suptitle("180-DAY BIOCHEMICAL ENSILING & POLMER PRESERVATION KINETIC ASSAYS (NESFIC-I-04)", 
                 fontsize=12, fontweight='bold', color='#0f172a', y=0.98)
    plt.tight_layout(rect=[0, 0, 1, 0.95])
    plt.savefig(os.path.join(out_dir, 'diagram_8_ensiling_kinetics_curves.jpg'), dpi=200)
    plt.close()

# -------------------------------------------------------------
# DIAGRAM 9: LoRaWAN Smart Probe Spear Hardware Blueprint
# -------------------------------------------------------------
def create_diagram_9():
    fig, ax = plt.subplots(figsize=(12, 6.5), dpi=200)
    ax.set_facecolor('#f8fafc')
    fig.patch.set_facecolor('#f8fafc')
    ax.axis('off')

    ax.text(0.5, 0.95, "LORAWAN IOT SMART PROBE SPEAR (SS-316) HARDWARE BLUEPRINT", 
            ha='center', va='center', fontsize=12.5, fontweight='bold', color='#0f172a')
    ax.text(0.5, 0.90, "Multi-Depth Moisture Reflectometry, Core Thermal Telemetry & Automated N2 Fire Prevention", 
            ha='center', va='center', fontsize=9, color='#0284c7')

    # Left: Mechanical Spear Diagram Box
    b_left = FancyBboxPatch((0.05, 0.08), 0.42, 0.78, boxstyle="round,pad=0.02,rounding_size=0.02",
                            facecolor='#ffffff', edgecolor='#cbd5e1', linewidth=1.5)
    ax.add_patch(b_left)
    ax.text(0.26, 0.82, "1.8m SMART PROBE MECHANICAL ANATOMY", ha='center', fontsize=10.5, fontweight='bold', color='#1e293b')

    components = [
        ("[Top Cap Enclosure: IP67]", "10W Monocrystalline PV Panel + LiFePO4 12.8V Battery\nLoRaWAN 865-867 MHz Transceiver (12 km range) + NavIC GNSS", 0.71, '#eff6ff', '#3b82f6'),
        ("[Plenum Gas Chamber]", "NDIR CO2 Sensor (0-50,000 ppm) + Electrochemical CO Sensor\nSemiconductor CH4 Methane Headspace Detector", 0.53, '#fef3c7', '#d97706'),
        ("[Multi-Depth Sensor Nodes]", "Tier 1 (0.5m), Tier 2 (1.0m), Tier 3 (1.5m), Tier 4 (2.0m)\nCapacitive FDR Moisture (5-80%) + DS18B20 Temp (+/-0.1C)", 0.35, '#f0fdf4', '#16a34a'),
        ("[Hardened Piercing Tip & Actuator]", "SS316 Conical Tip with Soil Ground Reference Pin\nMicro-Purge Nozzle for Pressurized Dry N2 Injection", 0.17, '#f1f5f9', '#64748b')
    ]

    for title, desc, y, bg, bd in components:
        patch = FancyBboxPatch((0.07, y - 0.04), 0.38, 0.14, boxstyle="round,pad=0.01,rounding_size=0.02",
                               facecolor=bg, edgecolor=bd, linewidth=1)
        ax.add_patch(patch)
        ax.text(0.09, y + 0.05, title, fontsize=8.5, fontweight='bold', color='#0f172a')
        ax.text(0.09, y - 0.01, desc, fontsize=7.5, color='#334155')

    # Right: Telemetry & Automated Safety Logic
    b_right = FancyBboxPatch((0.52, 0.08), 0.43, 0.78, boxstyle="round,pad=0.02,rounding_size=0.02",
                             facecolor='#ffffff', edgecolor='#cbd5e1', linewidth=1.5)
    ax.add_patch(b_right)
    ax.text(0.735, 0.82, "EMBEDDED SAFETY ACTUATION LOGIC", ha='center', fontsize=10.5, fontweight='bold', color='#1e293b')

    logic_blocks = [
        ("Normal Safe State (BQVI > 85)", "Core Temp < 38°C • Moisture < 15% (Dry) or pH < 4.2\nStatus: Standard 15-min LoRaWAN telemetry heartbeat.", '#dcfce7', '#15803d'),
        ("Monsoon High Moisture Alert", "Bale Moisture > 25% with elevated ambient humidity (>85% RH)\nAction: Automated ventilation fan cycle triggered in bunker.", '#eff6ff', '#2563eb'),
        ("Self-Heating Risk Threshold", "Core Temp 42°C-50°C combined with rising CO2 (>1,200 ppm)\nAction: Push critical alert to Depot QA Officer mobile app.", '#fef9c3', '#ca8a04'),
        ("CRITICAL FIRE PREVENTION OVERRIDE", "Core Temp > 52°C OR CO2 > 3,500 ppm\nAction: Automated Dry Nitrogen (N2) valve opens; stack inerted.", '#fee2e2', '#b91c1c')
    ]

    for i, (ltitle, ldesc, lbg, lbd) in enumerate(logic_blocks):
        y_pos = 0.70 - (i * 0.17)
        lpatch = FancyBboxPatch((0.55, y_pos - 0.05), 0.37, 0.13, boxstyle="round,pad=0.01,rounding_size=0.02",
                                facecolor=lbg, edgecolor=lbd, linewidth=1)
        ax.add_patch(lpatch)
        ax.text(0.57, y_pos + 0.03, ltitle, fontsize=8.5, fontweight='bold', color=lbd)
        ax.text(0.57, y_pos - 0.02, ldesc, fontsize=7.5, color='#1e293b')

    plt.tight_layout()
    plt.savefig(os.path.join(out_dir, 'diagram_9_lorawan_smart_probe_spear.jpg'), dpi=200)
    plt.close()

# -------------------------------------------------------------
# DIAGRAM 10: Lignin-Modified Bio-Bitumen (VG-30) Engineering
# -------------------------------------------------------------
def create_diagram_10():
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 6), dpi=200)
    fig.patch.set_facecolor('#f8fafc')

    # Left: Road Pavement Cross-Section
    ax1.set_facecolor('#ffffff')
    ax1.axis('off')
    ax1.text(0.5, 0.95, "ASSAM FLOOD-RESILIENT HIGHWAY CROSS-SECTION", ha='center', fontsize=10.5, fontweight='bold', color='#0f172a')
    ax1.text(0.5, 0.90, "20% Hydrolysis Lignin Modified Asphalt Surface (IRC:SP:53 Standard)", ha='center', fontsize=8, color='#059669')

    layers = [
        ("Surface Wearing Course: 20% Bio-Bitumen (40mm)", "Enzymatic Lignin-Polymer Modified Asphalt (Superior Rutting & Stripping Resistance)", 0.68, 0.16, '#334155', '#ffffff'),
        ("Dense Bituminous Macadam - DBM (75mm)", "Standard VG-30 Bitumen with high-modulus crushed aggregate", 0.49, 0.16, '#64748b', '#ffffff'),
        ("Granular Sub-Base - GSB (150mm)", "Graded crushed gravel & drainage stone for monsoonal water relief", 0.30, 0.16, '#cbd5e1', '#0f172a'),
        ("Compacted Soil Subgrade (300mm)", "Stabilized riverine alluvium subgrade with geotextile underlay", 0.11, 0.16, '#94a3b8', '#0f172a')
    ]

    for title, desc, y, h, bg, tc in layers:
        r = FancyBboxPatch((0.05, y), 0.90, h, boxstyle="round,pad=0.01,rounding_size=0.01",
                           facecolor=bg, edgecolor='#1e293b', linewidth=1)
        ax1.add_patch(r)
        ax1.text(0.50, y + (h * 0.65), title, fontsize=8.5, fontweight='bold', color=tc, ha='center')
        ax1.text(0.50, y + (h * 0.25), desc, fontsize=7, color=tc, alpha=0.9, ha='center')

    # Right: Pavement Engineering Performance Metrics
    ax2.set_facecolor('#ffffff')
    metrics = ['Marshall Stability\n(60°C, kN)', 'Softening Point\n(°C)', 'Tensile Strength\nRatio TSR (%)', 'Rutting Resistance\nIndex (x100)']
    neat_vg30 = [11.8, 48.5, 78.0, 100]
    bio_bitumen = [14.8, 53.2, 89.4, 132]

    x = np.arange(len(metrics))
    w = 0.35

    b1 = ax2.bar(x - w/2, neat_vg30, w, label='Neat Fossil VG-30 Bitumen', color='#94a3b8')
    b2 = ax2.bar(x + w/2, bio_bitumen, w, label='20% Lignin Bio-Bitumen', color='#059669')

    ax2.set_title('Mechanical Pavement Quality Benchmarks', fontsize=10.5, fontweight='bold', color='#0f172a')
    ax2.set_xticks(x)
    ax2.set_xticklabels(metrics, fontsize=8, color='#334155')
    ax2.set_ylabel('Test Measurement Value', fontsize=9, color='#334155')
    ax2.set_ylim(0, 160)
    ax2.grid(True, linestyle='--', alpha=0.5)
    ax2.legend(fontsize=8, loc='upper left')

    for bar in b1:
        yval = bar.get_height()
        ax2.text(bar.get_x() + bar.get_width()/2, yval + 2, f"{yval}", ha='center', va='bottom', fontsize=7.5, color='#64748b')
    for bar in b2:
        yval = bar.get_height()
        ax2.text(bar.get_x() + bar.get_width()/2, yval + 2, f"{yval}", ha='center', va='bottom', fontsize=7.5, fontweight='bold', color='#065f46')

    plt.suptitle("LIGNIN-MODIFIED BIO-BITUMEN (VG-30) PAVEMENT PERFORMANCE & INFRASTRUCTURE TRIAL", 
                 fontsize=12, fontweight='bold', color='#0f172a', y=0.98)
    plt.tight_layout(rect=[0, 0, 1, 0.95])
    plt.savefig(os.path.join(out_dir, 'diagram_10_lignin_biobitumen_pavement_engineering.jpg'), dpi=200)
    plt.close()

# -------------------------------------------------------------
# DIAGRAM 11: 1,000 MT/Day Commercial Biorefinery Circular Mass Balance
# -------------------------------------------------------------
def create_diagram_11():
    fig, ax = plt.subplots(figsize=(12, 6.5), dpi=200)
    ax.set_facecolor('#f8fafc')
    fig.patch.set_facecolor('#f8fafc')
    ax.axis('off')

    ax.text(0.5, 0.96, "COMMERCIAL BIOREFINERY ZERO-WASTE CIRCULAR MASS BALANCE FLOWSHEET", 
            ha='center', va='center', fontsize=12.5, fontweight='bold', color='#0f172a')
    ax.text(0.5, 0.91, "1,000 MT/Day Lignocellulosic Input Basis • Assam Bio-Refinery / Numaligarh Ecosystem", 
            ha='center', va='center', fontsize=9, color='#0284c7')

    # Raw Biomass Input Node
    r_in = FancyBboxPatch((0.04, 0.38), 0.22, 0.44, boxstyle="round,pad=0.015,rounding_size=0.02",
                          facecolor='#eff6ff', edgecolor='#3b82f6', linewidth=2)
    ax.add_patch(r_in)
    ax.text(0.15, 0.76, "RAW FEEDSTOCK INTAKE", ha='center', fontsize=9.5, fontweight='bold', color='#1e3a8a')
    ax.text(0.15, 0.68, "1,000 MT / Day Dry Basis", ha='center', fontsize=11, fontweight='bold', color='#2563eb')
    ax.text(0.15, 0.52, "• 600 MT Sali/Boro Paddy Straw\n• 400 MT Bamboo Harvest Chips\n• Ingested via Ensiled Buffer Hubs\n• Constant 92%+ Plant PLF", 
            ha='center', fontsize=8, color='#334155')

    # Central Core Refinery Node
    r_core = FancyBboxPatch((0.36, 0.40), 0.26, 0.40, boxstyle="round,pad=0.015,rounding_size=0.02",
                            facecolor='#1e293b', edgecolor='#0f172a', linewidth=2)
    ax.add_patch(r_core)
    ax.text(0.49, 0.74, "2G BIOETHANOL FACILITY", ha='center', fontsize=10, fontweight='bold', color='#ffffff')
    ax.text(0.49, 0.65, "Thermochemical Pre-Treatment\n& Enzymatic Hydrolysis", ha='center', fontsize=8, color='#94a3b8')
    ax.text(0.49, 0.48, "PRIMARY BIOFUEL OUTPUT:\n260,000 Litres / Day\n2G Ethanol (E20 Blending)", 
            ha='center', fontsize=8.5, fontweight='bold', color='#38bdf8')

    # Top Right: Solid Lignin Stream
    r_lig = FancyBboxPatch((0.71, 0.66), 0.25, 0.22, boxstyle="round,pad=0.015,rounding_size=0.02",
                           facecolor='#f0fdf4', edgecolor='#16a34a', linewidth=1.5)
    ax.add_patch(r_lig)
    ax.text(0.835, 0.82, "1. LIGNIN BIO-BITUMEN", ha='center', fontsize=9, fontweight='bold', color='#14532d')
    ax.text(0.835, 0.73, "120 MT/Day Hydrolysis Lignin\n-> 120 MT VG-30 Bitumen Extender\nRevenue: +Rs. 5.2 Crore/Year", ha='center', fontsize=7.5, color='#334155')

    # Middle Right: Slurry Digestate FOM Stream
    r_fom = FancyBboxPatch((0.71, 0.38), 0.25, 0.22, boxstyle="round,pad=0.015,rounding_size=0.02",
                           facecolor='#ecfdf5', edgecolor='#059669', linewidth=1.5)
    ax.add_patch(r_fom)
    ax.text(0.835, 0.54, "2. ENRICHED TEA MANURE", ha='center', fontsize=9, fontweight='bold', color='#065f46')
    ax.text(0.835, 0.45, "90 MT/Day Digestate Slurry\n-> Fortified FCO 1985 Tea FOM\nRevenue: +Rs. 2.1 Crore/Year", ha='center', fontsize=7.5, color='#334155')

    # Bottom Right: Parasitic Biogas & Water Stream
    r_bio = FancyBboxPatch((0.71, 0.10), 0.25, 0.22, boxstyle="round,pad=0.015,rounding_size=0.02",
                           facecolor='#fef3c7', edgecolor='#d97706', linewidth=1.5)
    ax.add_patch(r_bio)
    ax.text(0.835, 0.26, "3. PARASITIC BIOGAS LOOP", ha='center', fontsize=9, fontweight='bold', color='#92400e')
    ax.text(0.835, 0.17, "500 m3/Day High-COD Wastewater\n-> 4,200 m3 Green Biomethane\nSaves: Rs. 1.4 Crore/Yr Dryer Fuel", ha='center', fontsize=7.5, color='#334155')

    # Connecting Arrows
    ax.annotate('', xy=(0.35, 0.60), xytext=(0.27, 0.60),
                arrowprops=dict(facecolor='#2563eb', edgecolor='#2563eb', arrowstyle='->', lw=2.5))
    ax.annotate('', xy=(0.70, 0.77), xytext=(0.63, 0.65),
                arrowprops=dict(facecolor='#16a34a', edgecolor='#16a34a', arrowstyle='->', lw=2))
    ax.annotate('', xy=(0.70, 0.49), xytext=(0.63, 0.58),
                arrowprops=dict(facecolor='#059669', edgecolor='#059669', arrowstyle='->', lw=2))
    ax.annotate('', xy=(0.70, 0.21), xytext=(0.63, 0.50),
                arrowprops=dict(facecolor='#d97706', edgecolor='#d97706', arrowstyle='->', lw=2))

    # Parasitic return arrow back to dryers
    ax.annotate('Parasitic Drying Heat Recycled', xy=(0.15, 0.37), xytext=(0.70, 0.18),
                arrowprops=dict(facecolor='#f59e0b', edgecolor='#f59e0b', arrowstyle='->', lw=1.5, linestyle='--'),
                fontsize=7.5, fontweight='bold', color='#b45309')

    plt.tight_layout()
    plt.savefig(os.path.join(out_dir, 'diagram_11_biorefinery_circular_mass_balance.jpg'), dpi=200)
    plt.close()

# -------------------------------------------------------------
# DIAGRAM 12: Multi-Persona End-to-End User Experience Progression
# -------------------------------------------------------------
def create_diagram_12():
    fig, ax = plt.subplots(figsize=(12, 6.5), dpi=200)
    ax.set_facecolor('#f8fafc')
    fig.patch.set_facecolor('#f8fafc')
    ax.axis('off')

    ax.text(0.5, 0.95, "MULTI-PERSONA DIGITAL PLATFORM PROGRESSION & USER EXPERIENCE JOURNEY", 
            ha='center', va='center', fontsize=12.5, fontweight='bold', color='#0f172a')
    ax.text(0.5, 0.90, "End-to-End Supply Chain Interaction from Smallholder Farmer to Refinery SCADA Console", 
            ha='center', va='center', fontsize=9, color='#059669')

    personas = [
        ("Persona 1: Smallholder Farmer / FPO", 
         "Module: Jaivik Seva Citizen Portal (Assamese & English)\n• Logs surplus 15 Bighas straw (18 MT)\n• Automated routing to Bokakhat Hub (8.4 km)\n• Guaranteed DBT payout: Rs. 32,670\n• Receives verified carbon offset certificate", 
         0.04, '#eff6ff', '#3b82f6', '#1e40af'),
        ("Persona 2: Depot QA Inspector", 
         "Module: Offline-First Depot Mobile PWA\n• Scans incoming bale with handheld RF probe (48.2%)\n• Routes consignment to Anaerobic Silo Pod #04\n• Micro-doses Lactobacillus inoculant\n• Issues digital weighbridge gate receipt", 
         0.28, '#f0fdf4', '#22c55e', '#166534'),
        ("Persona 3: Plant Feedstock Manager", 
         "Module: Central Bioenergy SCADA Dashboard\n• Tracks 64-day statewide buffer reserve\n• Monitors IoT probe moisture & core temp (32.4°C)\n• Coordinates continuous Numaligarh boiler intake\n• Sustains 92%+ Plant Load Factor through monsoon", 
         0.52, '#fef3c7', '#f59e0b', '#92400e'),
        ("Persona 4: State Environmental Auditor", 
         "Module: Compliance & Audit Command Console\n• Verifies Zero-Liquid-Discharge (ZLD) mass balance\n• Tracks 100% lignin & FOM product dispatch\n• Validates 88,000 MT CO2e avoided burning credits\n• Reviews tamper-evident SHA-256 audit ledger", 
         0.76, '#fae8ff', '#d946ef', '#86198f')
    ]

    for title, desc, x, bg, bd, tc in personas:
        box = FancyBboxPatch((x, 0.12), 0.20, 0.72, boxstyle="round,pad=0.015,rounding_size=0.02",
                             facecolor=bg, edgecolor=bd, linewidth=1.5)
        ax.add_patch(box)
        ax.text(x + 0.10, 0.78, title, fontsize=8.5, fontweight='bold', color=tc, ha='center', va='center')
        ax.text(x + 0.10, 0.44, desc, fontsize=7.5, color='#1e293b', ha='center', va='center')

    # Arrow connections between steps
    for ax_x in [0.245, 0.485, 0.725]:
        ax.annotate('', xy=(ax_x + 0.03, 0.48), xytext=(ax_x, 0.48),
                    arrowprops=dict(facecolor='#475569', edgecolor='#475569', arrowstyle='->', lw=2))

    plt.tight_layout()
    plt.savefig(os.path.join(out_dir, 'diagram_12_user_journey_persona_progression.jpg'), dpi=200)
    plt.close()

if __name__ == '__main__':
    print("Generating NESFIC-I-04 diagrams...")
    create_diagram_1()
    create_diagram_2()
    create_diagram_3()
    create_diagram_4()
    create_diagram_5()
    create_diagram_6()
    create_diagram_7()
    create_diagram_8()
    create_diagram_9()
    create_diagram_10()
    create_diagram_11()
    create_diagram_12()
    print("All 12 architectural diagrams successfully generated.")
