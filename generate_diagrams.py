import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, Rectangle, Circle, Polygon
import numpy as np

# Set temporary cache dir
os.environ['MPLCONFIGDIR'] = '/tmp/matplotlib-cache'
workspace_dir = os.path.dirname(os.path.abspath(__file__))
out_dir = os.path.join(workspace_dir, 'assets', 'proposal_images')
os.makedirs(out_dir, exist_ok=True)

# -------------------------------------------------------------
# DIAGRAM 1: Current Reactive Loss vs Proactive Early Warning
# -------------------------------------------------------------
def create_diagram_1():
    fig, ax = plt.subplots(figsize=(12, 6.5), dpi=200)
    ax.set_facecolor('#f8fafc')
    fig.patch.set_facecolor('#f8fafc')
    ax.axis('off')

    # Title
    ax.text(0.5, 0.95, "PARADIGM SHIFT: CURRENT REACTIVE CROP LOSS VS. SASYASWASTHYA PROACTIVE ASSURANCE", 
            ha='center', va='center', fontsize=13, fontweight='bold', color='#0f172a')
    ax.text(0.5, 0.90, "Government of Assam • Dept. of Agriculture & ASSAC (Science & Tech) • NESFIC-D-11", 
            ha='center', va='center', fontsize=9, color='#059669')

    # Left Box - Current Reactive Approach
    box_left = FancyBboxPatch((0.04, 0.08), 0.43, 0.76, boxstyle="round,pad=0.02,rounding_size=0.03", 
                              facecolor='#fff1f2', edgecolor='#fda4af', linewidth=2)
    ax.add_patch(box_left)
    ax.text(0.255, 0.80, "CURRENT WORKFLOW (REACTIVE FIREFIGHTING)", ha='center', va='center', 
            fontsize=11, fontweight='bold', color='#9f1239')

    left_steps = [
        ("1. Pathogen Inoculum at Rest", "Fungal spores & insect eggs incubate silently.\nMicro-climatic risk triggers remain undetected.", '#ffe4e6'),
        ("2. Widespread Visual Damage", "Foliar blast lesions & stem borer dead-hearts spread.\nETL breached before extension visit.", '#ffe4e6'),
        ("3. Late Discovery & Panic Spray", "Farmer discovers destruction after 25-35% crop loss.\nIndiscriminate chemical pesticide drenching.", '#fecdd3'),
        ("4. Severe Debt & Yield Loss", "High input costs, toxic runoff, damaged soil health,\nand devastating rural household economic loss.", '#fda4af')
    ]

    for i, (stitle, sdesc, scolor) in enumerate(left_steps):
        y_pos = 0.65 - (i * 0.16)
        patch = FancyBboxPatch((0.07, y_pos - 0.05), 0.37, 0.12, boxstyle="round,pad=0.01,rounding_size=0.02",
                               facecolor=scolor, edgecolor='#f43f5e', linewidth=1)
        ax.add_patch(patch)
        ax.text(0.09, y_pos + 0.03, stitle, fontsize=9.5, fontweight='bold', color='#881337', va='center')
        ax.text(0.09, y_pos - 0.02, sdesc, fontsize=8, color='#4c0519', va='center')

    # Right Box - SasyaSwasthya Proactive Solution
    box_right = FancyBboxPatch((0.53, 0.08), 0.43, 0.76, boxstyle="round,pad=0.02,rounding_size=0.03", 
                               facecolor='#f0fdf4', edgecolor='#86efac', linewidth=2)
    ax.add_patch(box_right)
    ax.text(0.745, 0.80, "SASYASWASTHYA (PROACTIVE SPACE-TO-GROUND)", ha='center', va='center', 
            fontsize=11, fontweight='bold', color='#166534')

    right_steps = [
        ("1. Continuous Space Surveillance", "Sentinel-2 10m NDVI & IMD weather telemetry.\nAlgorithms flag humidity >88% & thermal spikes.", '#dcfce7'),
        ("2. 72-Hour Pre-Symptomatic Warning", "Epidemiological model forecasts blast & borer risk.\nAutomated Grade D Outbreak alerts generated.", '#dcfce7'),
        ("3. Targeted Extension PWA Scouting", "AEO/ADO dispatched with RTK GPS coordinate lock.\nOn-device AI leaf symptom classification.", '#bbf7d0'),
        ("4. Vernacular Agro-Advisory", "Instant SMS/WhatsApp bulletin in Assamese & English.\nBio-controls (Trichoderma, NSKE 5%) & 30% cost savings.", '#86efac')
    ]

    for i, (stitle, sdesc, scolor) in enumerate(right_steps):
        y_pos = 0.65 - (i * 0.16)
        patch = FancyBboxPatch((0.56, y_pos - 0.05), 0.37, 0.12, boxstyle="round,pad=0.01,rounding_size=0.02",
                               facecolor=scolor, edgecolor='#22c55e', linewidth=1)
        ax.add_patch(patch)
        ax.text(0.58, y_pos + 0.03, stitle, fontsize=9.5, fontweight='bold', color='#14532d', va='center')
        ax.text(0.58, y_pos - 0.02, sdesc, fontsize=8, color='#052e16', va='center')

    # Central Arrow
    ax.annotate("", xy=(0.52, 0.45), xytext=(0.48, 0.45),
                arrowprops=dict(arrowstyle="simple,tail_width=0.4,head_width=1.0,head_length=1.0",
                                facecolor='#10b981', edgecolor='#059669'))

    plt.tight_layout()
    plt.savefig(os.path.join(out_dir, "diagram_1_before_after_workflow.jpg"), dpi=200, bbox_inches='tight')
    plt.close()
    print("Created Diagram 1")

# -------------------------------------------------------------
# DIAGRAM 2: Multi-Tier Space-to-Ground Data Fusion Pipeline
# -------------------------------------------------------------
def create_diagram_2():
    fig, ax = plt.subplots(figsize=(12, 6.5), dpi=200)
    ax.set_facecolor('#f8fafc')
    fig.patch.set_facecolor('#f8fafc')
    ax.axis('off')

    ax.text(0.5, 0.95, "SPACE-TO-GROUND DATA FUSION & EPIDEMIOLOGICAL FORECASTING PIPELINE", 
            ha='center', va='center', fontsize=13, fontweight='bold', color='#0f172a')
    ax.text(0.5, 0.90, "Automated 4-Stream Ingestion Engine • Sentinel-2, UAV Drone, IMD AWS, Extension PWA", 
            ha='center', va='center', fontsize=9, color='#0284c7')

    # 4 Input Source Pillars
    sources = [
        ("ESA Sentinel-2 & Landsat", "10m Multi-spectral (Red, NIR, SWIR)\n5-day automated revisit ingestion", '#e0f2fe', '#0284c7', 0.14),
        ("ASSAC UAV Drone Fleet", "5cm High-res orthomosaics\nMicro-canopy chlorosis & weed index", '#f0fdf4', '#16a34a', 0.38),
        ("IMD Agromet AWS Grids", "35+ Automated weather stations\nTemp, morning RH >88%, 24h rain", '#fef3c7', '#d97706', 0.62),
        ("Field Extension PWA", "ADO & Krishi Sakhi ground scouting\nPheromone trap counts & leaf photos", '#f3e8ff', '#9333ea', 0.86)
    ]

    for title, desc, fcol, ecol, xpos in sources:
        box = FancyBboxPatch((xpos - 0.10, 0.60), 0.20, 0.22, boxstyle="round,pad=0.01,rounding_size=0.02",
                             facecolor=fcol, edgecolor=ecol, linewidth=2)
        ax.add_patch(box)
        ax.text(xpos, 0.77, title, ha='center', va='center', fontsize=9, fontweight='bold', color=ecol)
        ax.text(xpos, 0.68, desc, ha='center', va='center', fontsize=7.5, color='#334155')

        # Downward arrows
        ax.annotate("", xy=(0.50, 0.44), xytext=(xpos, 0.59),
                    arrowprops=dict(arrowstyle="->", color=ecol, lw=2))

    # Central Ingestion & Analytics Box
    center_box = FancyBboxPatch((0.15, 0.25), 0.70, 0.18, boxstyle="round,pad=0.02,rounding_size=0.03",
                                facecolor='#064e3b', edgecolor='#10b981', linewidth=2)
    ax.add_patch(center_box)
    ax.text(0.50, 0.37, "SASYASWASTHYA EPIDEMIOLOGICAL ANALYTICS & ML CORE", ha='center', va='center',
            fontsize=11, fontweight='bold', color='#ffffff')
    ax.text(0.50, 0.30, "Spectral Index Engine (NDVI, NDWI, SAVI) • Blast Germination Index (BGI) • Stem Borer Degree-Day Model\n"
                        "Composite Crop Health Index (CHI 0-100) • On-Device MobileNet Leaf Diagnostic Classifier",
            ha='center', va='center', fontsize=8.5, color='#a7f3d0')

    # Output Pillars
    outputs = [
        ("Executive Agro-Dashboard", "State CHI & Hotspot Analytics", 0.25),
        ("Field Extension Mobile PWA", "GPS Work Orders & Trap Audits", 0.50),
        ("Farmer Sasya Seva Portal", "Assamese/English Advisories", 0.75)
    ]

    for otitle, odesc, oxpos in outputs:
        ax.annotate("", xy=(oxpos, 0.16), xytext=(0.50, 0.24),
                    arrowprops=dict(arrowstyle="->", color='#059669', lw=2))
        obox = FancyBboxPatch((oxpos - 0.11, 0.05), 0.22, 0.10, boxstyle="round,pad=0.01,rounding_size=0.02",
                              facecolor='#ffffff', edgecolor='#059669', linewidth=1.5)
        ax.add_patch(obox)
        ax.text(oxpos, 0.11, otitle, ha='center', va='center', fontsize=8.5, fontweight='bold', color='#065f46')
        ax.text(oxpos, 0.07, odesc, ha='center', va='center', fontsize=7.5, color='#475569')

    plt.tight_layout()
    plt.savefig(os.path.join(out_dir, "diagram_2_dual_system_reconciliation.jpg"), dpi=200, bbox_inches='tight')
    plt.close()
    print("Created Diagram 2")

# -------------------------------------------------------------
# DIAGRAM 3: Assam Crop Pathogen & Biotic Stress Catalog
# -------------------------------------------------------------
def create_diagram_3():
    fig, ax = plt.subplots(figsize=(12, 6.5), dpi=200)
    ax.set_facecolor('#f8fafc')
    fig.patch.set_facecolor('#f8fafc')
    ax.axis('off')

    ax.text(0.5, 0.95, "ASSAM CROP BIOTIC STRESS & PATHOGEN FORECASTING CATALOG", 
            ha='center', va='center', fontsize=13, fontweight='bold', color='#0f172a')
    ax.text(0.5, 0.90, "Targeted Pests & Pathogens Under NESFIC-D-11 Multi-Criteria Surveillance", 
            ha='center', va='center', fontsize=9, color='#e11d48')

    cards = [
        ("1. Rice Blast (Magnaporthe oryzae)", 
         "Target Crop: Sali & Boro Paddy\nConditions: Morning RH > 88%, Min Temp 20-25°C, prolonged leaf wetness.\nSpectral Signature: Sudden NDVI drop <0.52 due to foliar spindle necrosis.\nAdvisory Action: Immediate field drainage; Tricyclazole 75% WP @ 15g/Bigha.", 
         '#ffe4e6', '#e11d48', 0.05, 0.50),
        ("2. Yellow Stem Borer (Scirpophaga)", 
         "Target Crop: Active Tillering Paddy\nConditions: Cumulative GDD > 620°C-days + monsoon precipitation.\nSymptoms: Vegetative 'dead-hearts' & panicle 'white-heads'.\nAdvisory Action: Scirpo-lure pheromone traps (3/Bigha); Chlorantraniliprole 18.5% SC.", 
         '#fef3c7', '#d97706', 0.52, 0.50),
        ("3. Sheath Blight (Rhizoctonia solani)", 
         "Target Crop: Sali Paddy (Dense Canopy)\nConditions: Prolonged flood ponding, high nitrogen application, RH > 90%.\nSymptoms: Snake-skin lesions starting at waterline moving upward.\nAdvisory Action: Intermittent drying; Validamycin 3% L or Trichoderma spray.", 
         '#e0e7ff', '#4f46e5', 0.05, 0.08),
        ("4. Mustard Aphid (Lipaphis erysimi)", 
         "Target Crop: Rapeseed & Mustard (Rabi Season)\nConditions: Cloudy, overcast, rainless spells during flowering.\nSymptoms: Foliar curling, floral bud desiccation, sooty mold.\nAdvisory Action: 5% Neem Seed Kernel Extract (NSKE) or Azadirachtin 1500ppm.", 
         '#f0fdf4', '#16a34a', 0.52, 0.08)
    ]

    for title, desc, fcol, ecol, xpos, ypos in cards:
        box = FancyBboxPatch((xpos, ypos), 0.43, 0.36, boxstyle="round,pad=0.015,rounding_size=0.02",
                             facecolor=fcol, edgecolor=ecol, linewidth=2)
        ax.add_patch(box)
        ax.text(xpos + 0.02, ypos + 0.31, title, fontsize=10, fontweight='bold', color=ecol)
        
        lines = desc.split('\n')
        for idx, line in enumerate(lines):
            ax.text(xpos + 0.02, ypos + 0.24 - (idx * 0.06), line, fontsize=8, color='#1e293b')

    plt.tight_layout()
    plt.savefig(os.path.join(out_dir, "diagram_3_cadastral_anomaly_catalog.jpg"), dpi=200, bbox_inches='tight')
    plt.close()
    print("Created Diagram 3")

# -------------------------------------------------------------
# DIAGRAM 4: Composite Crop Health Index (CHI) Hierarchy
# -------------------------------------------------------------
def create_diagram_4():
    fig, ax = plt.subplots(figsize=(12, 6.5), dpi=200)
    ax.set_facecolor('#f8fafc')
    fig.patch.set_facecolor('#f8fafc')
    ax.axis('off')

    ax.text(0.5, 0.95, "COMPOSITE CROP HEALTH INDEX (CHI 0–100) EVALUATION HIERARCHY", 
            ha='center', va='center', fontsize=13, fontweight='bold', color='#0f172a')
    ax.text(0.5, 0.90, "Multi-Criteria Weighted Aggregation Core For Plot-Level Agro-Climatic Triage", 
            ha='center', va='center', fontsize=9, color='#059669')

    # Top Central Metric Box
    top_box = FancyBboxPatch((0.25, 0.68), 0.50, 0.16, boxstyle="round,pad=0.02,rounding_size=0.03",
                             facecolor='#064e3b', edgecolor='#10b981', linewidth=2)
    ax.add_patch(top_box)
    ax.text(0.50, 0.79, "COMPOSITE CROP HEALTH INDEX (CHI 0–100)", ha='center', va='center',
            fontsize=12, fontweight='bold', color='#ffffff')
    ax.text(0.50, 0.72, "CHI = 0.40(NDVI) + 0.25(NDWI) + 0.20(Weather Risk) + 0.15(Ground Scouting)", ha='center', va='center',
            fontsize=8.5, color='#a7f3d0')

    # 4 Branch Weights
    weights = [
        ("Satellite NDVI (40%)", "Canopy vigor & chlorophyll absorption\nSentinel-2 10m Bands", 0.15),
        ("Canopy NDWI (25%)", "Water stress & flood inundation\nShort-wave infrared bands", 0.38),
        ("Weather Pathogen (20%)", "IMD AWS morning RH >88%, temp,\nand rainfall degree-days", 0.62),
        ("In-Situ Scouting (15%)", "AEO pheromone trap counts &\nMobileNet leaf diagnosis", 0.85)
    ]

    for wtitle, wdesc, wxpos in weights:
        ax.annotate("", xy=(wxpos, 0.54), xytext=(0.50, 0.67),
                    arrowprops=dict(arrowstyle="->", color='#059669', lw=1.5))
        wbox = FancyBboxPatch((wxpos - 0.10, 0.40), 0.20, 0.14, boxstyle="round,pad=0.01,rounding_size=0.02",
                              facecolor='#ffffff', edgecolor='#059669', linewidth=1.5)
        ax.add_patch(wbox)
        ax.text(wxpos, 0.49, wtitle, ha='center', va='center', fontsize=8.5, fontweight='bold', color='#065f46')
        ax.text(wxpos, 0.43, wdesc, ha='center', va='center', fontsize=7, color='#475569')

    # 4 Output Tiers
    tiers = [
        ("GRADE A (80-100)", "Optimal Crop Vigor", "Routine agronomic practice", '#dcfce7', '#166534', 0.15),
        ("GRADE B (65-79)", "Mild Vegetative Stress", "Nutrient top-dressing", '#dbeafe', '#1e40af', 0.38),
        ("GRADE C (45-64)", "High-Risk Watchlist", "Pheromone trap scouting", '#fef3c7', '#92400e', 0.62),
        ("GRADE D (<45)", "Critical Outbreak", "Immediate broadcast & spray", '#fee2e2', '#991b1b', 0.85)
    ]

    for ttitle, tsub, tact, tfcol, tecol, txpos in tiers:
        ax.annotate("", xy=(txpos, 0.26), xytext=(txpos, 0.39),
                    arrowprops=dict(arrowstyle="->", color=tecol, lw=1.5))
        tbox = FancyBboxPatch((txpos - 0.10, 0.08), 0.20, 0.17, boxstyle="round,pad=0.01,rounding_size=0.02",
                              facecolor=tfcol, edgecolor=tecol, linewidth=2)
        ax.add_patch(tbox)
        ax.text(txpos, 0.20, ttitle, ha='center', va='center', fontsize=8.5, fontweight='bold', color=tecol)
        ax.text(txpos, 0.15, tsub, ha='center', va='center', fontsize=7.5, color='#334155')
        ax.text(txpos, 0.11, tact, ha='center', va='center', fontsize=7, fontweight='semibold', color=tecol)

    plt.tight_layout()
    plt.savefig(os.path.join(out_dir, "diagram_4_land_health_score_hierarchy.jpg"), dpi=200, bbox_inches='tight')
    plt.close()
    print("Created Diagram 4")

# -------------------------------------------------------------
# DIAGRAM 5: AEO Field Ground-Truthing & Edge AI PWA
# -------------------------------------------------------------
def create_diagram_5():
    fig, ax = plt.subplots(figsize=(12, 6.5), dpi=200)
    ax.set_facecolor('#f8fafc')
    fig.patch.set_facecolor('#f8fafc')
    ax.axis('off')

    ax.text(0.5, 0.95, "AGRICULTURAL EXTENSION OFFICER (ADO) GROUND-TRUTHING & EDGE AI PWA", 
            ha='center', va='center', fontsize=13, fontweight='bold', color='#0f172a')
    ax.text(0.5, 0.90, "Mobile Progressive Web App with Sub-Meter RTK GPS Geofencing & Offline SQLite Sync", 
            ha='center', va='center', fontsize=9, color='#0284c7')

    # Phone Frame representation
    phone = FancyBboxPatch((0.08, 0.08), 0.36, 0.76, boxstyle="round,pad=0.02,rounding_size=0.04",
                           facecolor='#0f172a', edgecolor='#334155', linewidth=4)
    ax.add_patch(phone)

    # Screen
    screen = FancyBboxPatch((0.10, 0.11), 0.32, 0.70, boxstyle="round,pad=0.01,rounding_size=0.02",
                            facecolor='#1e293b', edgecolor='#475569', linewidth=1)
    ax.add_patch(screen)

    # App Header in Phone
    ax.text(0.26, 0.77, "SasyaSwasthya PWA", ha='center', va='center', fontsize=10, fontweight='bold', color='#38bdf8')
    ax.text(0.26, 0.73, "ADO Officer: Pranab Sarma", ha='center', va='center', fontsize=7.5, color='#94a3b8')

    # Phone Cards
    pcard1 = FancyBboxPatch((0.12, 0.58), 0.28, 0.12, boxstyle="round,pad=0.01,rounding_size=0.01", facecolor='#064e3b', edgecolor='#10b981', linewidth=1)
    ax.add_patch(pcard1)
    ax.text(0.14, 0.66, "GPS RTK Geofence Locked", fontsize=8, fontweight='bold', color='#a7f3d0')
    ax.text(0.14, 0.61, "Plot: ASM-KAM-AZR-101 (±0.8m)", fontsize=7, color='#dcfce7')

    pcard2 = FancyBboxPatch((0.12, 0.42), 0.28, 0.13, boxstyle="round,pad=0.01,rounding_size=0.01", facecolor='#451a03', edgecolor='#d97706', linewidth=1)
    ax.add_patch(pcard2)
    ax.text(0.14, 0.51, "Pheromone Trap Counter", fontsize=8, fontweight='bold', color='#fde68a')
    ax.text(0.14, 0.45, "Scirpo-Lure: 14 Moths (ETL Exceeded)", fontsize=7, color='#fed7aa')

    pcard3 = FancyBboxPatch((0.12, 0.26), 0.28, 0.13, boxstyle="round,pad=0.01,rounding_size=0.01", facecolor='#4c0519', edgecolor='#f43f5e', linewidth=1)
    ax.add_patch(pcard3)
    ax.text(0.14, 0.35, "Leaf Symptom AI Camera", fontsize=8, fontweight='bold', color='#fecdd3')
    ax.text(0.14, 0.29, "Rice Blast Classified: 95.8% Conf.", fontsize=7, color='#fda4af')

    pbutton = FancyBboxPatch((0.14, 0.14), 0.24, 0.08, boxstyle="round,pad=0.01,rounding_size=0.02", facecolor='#10b981', edgecolor='#059669', linewidth=1)
    ax.add_patch(pbutton)
    ax.text(0.26, 0.18, "Submit In-Situ Audit", ha='center', va='center', fontsize=8.5, fontweight='bold', color='#022c22')

    # Right Explanatory Feature Cards
    rfeatures = [
        ("Sub-Meter RTK Geofencing", "Prevents fraudulent off-site data entry. Officers must stand within\nthe cadastral boundary coordinates before inspection forms unlock.", '#f0fdf4', '#16a34a', 0.65),
        ("Pheromone Trap Calibration", "Direct entry of adult moth flight counts against Economic Threshold Levels\n(ETL) calibrated by Assam Agricultural University (AAU) Jorhat.", '#fef3c7', '#d97706', 0.45),
        ("MobileNet V3 Edge AI Diagnosis", "Runs on-device deep learning computer vision directly inside browser cache.\nInstant leaf lesion classification without needing mobile network.", '#fdf2f8', '#db2777', 0.25),
        ("Offline SQLite Synchronization", "Complete inspection data and field photos persist locally when in remote\nBrahmaputra riverine chars, auto-syncing when network restores.", '#e0f2fe', '#0284c7', 0.05)
    ]

    for rtitle, rdesc, rfcol, recol, rypos in rfeatures:
        rbox = FancyBboxPatch((0.50, rypos), 0.45, 0.16, boxstyle="round,pad=0.015,rounding_size=0.02",
                              facecolor=rfcol, edgecolor=recol, linewidth=1.5)
        ax.add_patch(rbox)
        ax.text(0.52, rypos + 0.11, rtitle, fontsize=9.5, fontweight='bold', color=recol)
        ax.text(0.52, rypos + 0.05, rdesc, fontsize=7.5, color='#334155')

    plt.tight_layout()
    plt.savefig(os.path.join(out_dir, "diagram_5_lat_mandal_mobile_app.jpg"), dpi=200, bbox_inches='tight')
    plt.close()
    print("Created Diagram 5")

# -------------------------------------------------------------
# DIAGRAM 6: Verified Bilingual Agro-Advisory Bulletin Card
# -------------------------------------------------------------
def create_diagram_6():
    fig, ax = plt.subplots(figsize=(12, 6.5), dpi=200)
    ax.set_facecolor('#f8fafc')
    fig.patch.set_facecolor('#f8fafc')
    ax.axis('off')

    ax.text(0.5, 0.95, "VERIFIED BILINGUAL AGRO-ADVISORY BULLETIN (SASYASWASTHYA)", 
            ha='center', va='center', fontsize=13, fontweight='bold', color='#0f172a')
    ax.text(0.5, 0.90, "Official Public Farmer Advisory Card in Assamese (অসমীয়া) and English", 
            ha='center', va='center', fontsize=9, color='#059669')

    # Main Certificate Card
    cbox = FancyBboxPatch((0.08, 0.08), 0.84, 0.78, boxstyle="round,pad=0.02,rounding_size=0.03",
                          facecolor='#ffffff', edgecolor='#059669', linewidth=3)
    ax.add_patch(cbox)

    # Seal & Header
    ax.text(0.50, 0.80, "GOVERNMENT OF ASSAM • DIRECTORATE OF AGRICULTURE & ASSAC", 
            ha='center', va='center', fontsize=10, fontweight='bold', color='#064e3b')
    ax.text(0.50, 0.75, "OFFICIAL LOCATION-SPECIFIC CROP HEALTH & PEST ADVISORY BULLETIN", 
            ha='center', va='center', fontsize=12, fontweight='bold', color='#0f172a')
    ax.text(0.50, 0.71, "Advisory ID: ADV-ASSAM-KAM-2026-901 • Valid Until: 2026-11-27", 
            ha='center', va='center', fontsize=8.5, color='#64748b')

    # Left Section: Farm & Weather Metadata
    lmeta = FancyBboxPatch((0.12, 0.32), 0.36, 0.34, boxstyle="round,pad=0.015,rounding_size=0.02",
                           facecolor='#f8fafc', edgecolor='#cbd5e1', linewidth=1)
    ax.add_patch(lmeta)
    ax.text(0.14, 0.61, "FARM CLUSTER TELEMETRY", fontsize=8.5, fontweight='bold', color='#0f172a')
    
    mdetails = [
        "Farmer: Biren Kalita (Dag 248, Patta KP 42)",
        "Location: Mikirpara Chakardo, Azara, Kamrup",
        "Crop: Sali Paddy (Panicle Initiation Stage)",
        "Area: 3 Bigha 2 Katha 10 Lesa (0.46 Ha)",
        "Sentinel-2 NDVI: 0.48 (Chlorosis Anomaly)",
        "IMD AWS: 92% Morning RH, 42.5mm Rainfall",
        "Health Grade: GRADE D (CHI: 42/100)"
    ]
    for idx, md in enumerate(mdetails):
        ax.text(0.14, 0.56 - (idx * 0.038), md, fontsize=7.5, color='#334155')

    # Right Section: Bilingual Action Instructions
    rmeta = FancyBboxPatch((0.51, 0.32), 0.38, 0.34, boxstyle="round,pad=0.015,rounding_size=0.02",
                           facecolor='#f0fdf4', edgecolor='#86efac', linewidth=1)
    ax.add_patch(rmeta)
    ax.text(0.53, 0.61, "ADVISORY DIRECTIVES (পৰামৰ্শ নিৰ্দেশনা)", fontsize=8.5, fontweight='bold', color='#166534')

    rdetails = [
        "1. Field Drainage (পানী নিকাশ):",
        "   Drain standing water for 48h to reduce canopy micro-humidity.",
        "   আক্ৰান্ত পথাৰৰ পৰা ৪৮ ঘণ্টাৰ বাবে পানী উলিয়াই দিয়ক।",
        "2. Biological IPM (জৈৱিক নিবাৰণ):",
        "   Spray Pseudomonas fluorescens @ 5g/Litre in morning.",
        "3. Therapeutic Chemical Spray (ৰাসায়নিক প্ৰয়োগ):",
        "   Apply Tricyclazole 75% WP @ 15g in 30L water per Bigha."
    ]
    for idx, rd in enumerate(rdetails):
        is_header = rd.startswith("1.") or rd.startswith("2.") or rd.startswith("3.")
        ax.text(0.53, 0.56 - (idx * 0.038), rd, fontsize=7.5, 
                fontweight='bold' if is_header else 'normal',
                color='#14532d' if is_header else '#334155')

    # Footer verification token
    ax.text(0.14, 0.20, "QR Verification Token: SHA256: 8f4e2b9c7a1d... (Tamper-Proof Digital Seal)", 
            fontsize=7.5, fontfamily='monospace', color='#475569')
    ax.text(0.14, 0.16, "Authorized By: District Agricultural Officer (DAO) Kamrup & Director, ASSAC", 
            fontsize=7.5, color='#64748b')
    ax.text(0.14, 0.12, "Dispatched via: NIC National SMS Gateway & WhatsApp Cloud API to 1,420 Azara Farmers", 
            fontsize=7.5, fontweight='bold', color='#059669')

    plt.tight_layout()
    plt.savefig(os.path.join(out_dir, "diagram_6_citizen_land_health_certificate.jpg"), dpi=200, bbox_inches='tight')
    plt.close()
    print("Created Diagram 6")

# -------------------------------------------------------------
# DIAGRAM 7: Enterprise System Architecture at ASDC
# -------------------------------------------------------------
def create_diagram_7():
    fig, ax = plt.subplots(figsize=(12, 6.5), dpi=200)
    ax.set_facecolor('#f8fafc')
    fig.patch.set_facecolor('#f8fafc')
    ax.axis('off')

    ax.text(0.5, 0.95, "ASSAM STATE DATA CENTRE (ASDC) ENTERPRISE SYSTEM ARCHITECTURE", 
            ha='center', va='center', fontsize=13, fontweight='bold', color='#0f172a')
    ax.text(0.5, 0.90, "Kubernetes Microservices, PostGIS Raster/Vector Store, Kafka Event Dispatcher", 
            ha='center', va='center', fontsize=9, color='#4338ca')

    layers = [
        ("Layer 1: External Data Ingestion", "Copernicus Sentinel-2 API • USGS Landsat • ASSAC UAV Fleet • IMD AWS Agromet Feeds", '#e0e7ff', '#4338ca', 0.72),
        ("Layer 2: Event Streaming & Pipeline", "Apache Kafka Message Brokers • Celery Distributed Tasks • Airflow Ingestion DAGs", '#ede9fe', '#6d28d9', 0.54),
        ("Layer 3: Core Analytics & ML Engine", "Spectral Engine (NDVI/NDWI) • Blast BGI Simulator • GDD Stem Borer Model • CHI Calculator", '#dcfce7', '#15803d', 0.36),
        ("Layer 4: Storage & Geoportal Edge", "PostgreSQL 16 + PostGIS 3.4 • GeoServer WMS/WFS • Cloudflare CDN • Redis Cache", '#fef3c7', '#b45309', 0.18),
        ("Layer 5: Presentation & Gateways", "Executive Agro-Dashboard • WebGIS Leaflet • Extension PWA • NIC SMS & WhatsApp Gateway", '#fce7f3', '#be185d', 0.00)
    ]

    for ltitle, ldesc, lfcol, lecol, lypos in layers:
        box = FancyBboxPatch((0.08, lypos + 0.02), 0.84, 0.13, boxstyle="round,pad=0.015,rounding_size=0.02",
                             facecolor=lfcol, edgecolor=lecol, linewidth=2)
        ax.add_patch(box)
        ax.text(0.12, lypos + 0.10, ltitle, fontsize=10, fontweight='bold', color=lecol)
        ax.text(0.12, lypos + 0.05, ldesc, fontsize=8, color='#334155')

    plt.tight_layout()
    plt.savefig(os.path.join(out_dir, "diagram_7_enterprise_system_architecture.jpg"), dpi=200, bbox_inches='tight')
    plt.close()
    print("Created Diagram 7")

if __name__ == '__main__':
    create_diagram_1()
    create_diagram_2()
    create_diagram_3()
    create_diagram_4()
    create_diagram_5()
    create_diagram_6()
    create_diagram_7()
    print("All 7 architectural diagrams created successfully!")
