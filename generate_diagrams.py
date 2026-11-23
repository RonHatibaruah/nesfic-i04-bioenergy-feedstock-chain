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

if __name__ == '__main__':
    print("Generating NESFIC-I-04 diagrams...")
    create_diagram_1()
    create_diagram_2()
    create_diagram_3()
    create_diagram_4()
    create_diagram_5()
    create_diagram_6()
    create_diagram_7()
    print("All 7 architectural diagrams successfully generated.")
