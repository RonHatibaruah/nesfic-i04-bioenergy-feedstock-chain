import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, Rectangle, Circle, Polygon, PathPatch
import numpy as np

os.environ['MPLCONFIGDIR'] = '/tmp/matplotlib-cache'
workspace_dir = os.path.dirname(os.path.abspath(__file__))
out_dir = os.path.join(workspace_dir, 'assets', 'proposal_images')
os.makedirs(out_dir, exist_ok=True)

# -----------------------------------------------------------------------------
# Color Palette: Clean White & High-Impact Tech Framework
# Matching Data Centers & Way Ahead Widescreen Infographics
# -----------------------------------------------------------------------------
BG_WHITE = '#ffffff'
BG_LIGHT = '#f8fafc'
GRID_COLOR = '#e2e8f0'

NAVY_TITLE = '#0f172a'
NAVY_BODY = '#1e293b'
SLATE_MUTED = '#64748b'
SLATE_BORDER = '#cbd5e1'

BLUE_PRIMARY = '#1d4ed8'
BLUE_LIGHT = '#eff6ff'
BLUE_BORDER = '#93c5fd'

EMERALD_PRIMARY = '#059669'
EMERALD_LIGHT = '#ecfdf5'
EMERALD_BORDER = '#6ee7b7'

CYAN_PRIMARY = '#0891b2'
CYAN_LIGHT = '#ecfeff'
CYAN_BORDER = '#67e8f9'

AMBER_PRIMARY = '#d97706'
AMBER_LIGHT = '#fffbeb'
AMBER_BORDER = '#fcd34d'

ROSE_PRIMARY = '#e11d48'
ROSE_LIGHT = '#fff1f2'
ROSE_BORDER = '#fda4af'

PURPLE_PRIMARY = '#7c3aed'
PURPLE_LIGHT = '#f5f3ff'
PURPLE_BORDER = '#c4b5fd'

def draw_blueprint_grid(ax):
    """Draw subtle technical blueprint gridlines in the background."""
    for x in np.linspace(0, 1, 21):
        ax.axvline(x, color=GRID_COLOR, linewidth=0.5, linestyle=':', alpha=0.6, zorder=0)
    for y in np.linspace(0, 1, 13):
        ax.axhline(y, color=GRID_COLOR, linewidth=0.5, linestyle=':', alpha=0.6, zorder=0)

def add_header(ax, title, subtitle, track_tag="NESFIC-D-11 TECH FRAMEWORK"):
    """Standardized 16:9 Widescreen Header Banner."""
    # Top banner card
    banner = FancyBboxPatch((0.025, 0.895), 0.95, 0.082, boxstyle="round,pad=0.008,rounding_size=0.012",
                            facecolor='#ffffff', edgecolor=SLATE_BORDER, linewidth=1.5, zorder=2)
    ax.add_patch(banner)
    
    # Track Tag Badge
    tag_bg = FancyBboxPatch((0.04, 0.922), 0.17, 0.034, boxstyle="round,pad=0.004,rounding_size=0.008",
                            facecolor=EMERALD_LIGHT, edgecolor=EMERALD_PRIMARY, linewidth=1.2, zorder=3)
    ax.add_patch(tag_bg)
    ax.text(0.125, 0.939, track_tag, ha='center', va='center', fontsize=7.5, fontweight='bold', color=EMERALD_PRIMARY, zorder=4)
    
    # Title & Subtitle
    ax.text(0.23, 0.942, title, fontsize=12, fontweight='bold', color=NAVY_TITLE, zorder=4)
    ax.text(0.23, 0.915, subtitle, fontsize=8.2, fontweight='medium', color=CYAN_PRIMARY, zorder=4)
    
    # Right Govt Badge
    gov_badge = FancyBboxPatch((0.795, 0.922), 0.165, 0.034, boxstyle="round,pad=0.004,rounding_size=0.008",
                                facecolor=BG_LIGHT, edgecolor=SLATE_BORDER, linewidth=1, zorder=3)
    ax.add_patch(gov_badge)
    ax.text(0.877, 0.939, "GOVT OF ASSAM • AGRI & ASSAC", ha='center', va='center', fontsize=7.2, fontweight='bold', color=NAVY_BODY, zorder=4)

def save_dual(fig, basename):
    """Save both PNG and JPG in assets/proposal_images/."""
    png_path = os.path.join(out_dir, f"{basename}.png")
    jpg_path = os.path.join(out_dir, f"{basename}.jpg")
    plt.tight_layout()
    fig.savefig(png_path, dpi=180, bbox_inches='tight', facecolor=fig.get_facecolor(), edgecolor='none')
    fig.savefig(jpg_path, dpi=180, bbox_inches='tight', facecolor=fig.get_facecolor(), edgecolor='none')
    plt.close(fig)
    print(f"Generated: {basename}.png & .jpg")

# =============================================================================
# DIAGRAM 1: Paradigm Shift (Current Reactive Loss vs SasyaSwasthya Early Warning)
# =============================================================================
def make_diagram_1():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=180)
    ax.set_facecolor(BG_WHITE)
    fig.patch.set_facecolor(BG_WHITE)
    ax.axis('off')
    draw_blueprint_grid(ax)

    add_header(ax, "PARADIGM SHIFT: CURRENT REACTIVE EXTENSION VS. SASYASWASTHYA PROACTIVE SURVEILLANCE",
               "Transformation from 35% Catastrophic Crop Losses to 72-Hour Satellite-Triggered Preventative Action",
               "PARADIGM SHIFT FRAMEWORK")

    # LEFT COLUMN: Reactive Legacy Baseline
    box_left = FancyBboxPatch((0.025, 0.08), 0.455, 0.79, boxstyle="round,pad=0.012,rounding_size=0.018",
                              facecolor=ROSE_LIGHT, edgecolor=ROSE_BORDER, linewidth=2, zorder=1)
    ax.add_patch(box_left)
    
    lh = FancyBboxPatch((0.045, 0.785), 0.415, 0.065, boxstyle="round,pad=0.006,rounding_size=0.01",
                        facecolor='#ffe4e6', edgecolor=ROSE_PRIMARY, linewidth=1.5, zorder=2)
    ax.add_patch(lh)
    ax.text(0.252, 0.817, "CURRENT AS-IS WORKFLOW (REACTIVE FIREFIGHTING)", ha='center', va='center',
            fontsize=10.5, fontweight='bold', color=ROSE_PRIMARY, zorder=3)

    left_cards = [
        ("STAGE 1 • LATENT PATHOGEN INCUBATION", 
         "Fungal spores (Rice Blast) & Stem Borer eggs incubate quietly in canopy.\nMicroclimate triggers (RH >88%, wetness) pass completely undetected at rest.",
         ROSE_PRIMARY),
        ("STAGE 2 • MONSOON CLOUD-COVER BLINDSPOTS", 
         "Optical satellites (Landsat/Sentinel-2) are 100% blinded by June-Oct clouds.\nExtension officers cannot monitor 2.8M hectares; outbreaks spread unseen.",
         ROSE_PRIMARY),
        ("STAGE 3 • DELAYED PHYSICAL DISCOVERY (8-14 DAYS)", 
         "Officer or farmer only discovers destruction after visual dead-hearts appear.\nBy this time, plot has breached Grade D ETL damage (>35% defoliation).",
         ROSE_PRIMARY),
        ("STAGE 4 • PANIC OVER-SPRAY & CROP LOSS", 
         "Farmers resort to toxic chemical drenching without dosage calibration.\nResults in 25-35% yield loss, destroyed beneficial predators, and debt.",
         ROSE_PRIMARY)
    ]

    for idx, (head, desc, clr) in enumerate(left_cards):
        y = 0.665 - idx * 0.17
        card = FancyBboxPatch((0.045, y - 0.035), 0.415, 0.135, boxstyle="round,pad=0.008,rounding_size=0.012",
                              facecolor='#ffffff', edgecolor=ROSE_BORDER, linewidth=1.2, zorder=2)
        ax.add_patch(card)
        
        # Number badge
        num_bg = FancyBboxPatch((0.055, y + 0.05), 0.05, 0.032, boxstyle="round,pad=0.002,rounding_size=0.006",
                                facecolor='#ffe4e6', edgecolor=ROSE_PRIMARY, linewidth=1, zorder=3)
        ax.add_patch(num_bg)
        ax.text(0.08, 0.066 + y, f"0{idx+1}", ha='center', va='center', fontsize=8, fontweight='bold', color=ROSE_PRIMARY, zorder=4)
        
        ax.text(0.12, y + 0.066, head, fontsize=8.5, fontweight='bold', color=NAVY_TITLE, va='center', zorder=3)
        ax.text(0.06, y + 0.005, desc, fontsize=8, color=SLATE_MUTED, linespacing=1.25, va='center', zorder=3)

    # RIGHT COLUMN: SasyaSwasthya Solution
    box_right = FancyBboxPatch((0.52, 0.08), 0.455, 0.79, boxstyle="round,pad=0.012,rounding_size=0.018",
                               facecolor=EMERALD_LIGHT, edgecolor=EMERALD_BORDER, linewidth=2, zorder=1)
    ax.add_patch(box_right)

    rh = FancyBboxPatch((0.54, 0.785), 0.415, 0.065, boxstyle="round,pad=0.006,rounding_size=0.01",
                        facecolor='#dcfce7', edgecolor=EMERALD_PRIMARY, linewidth=1.5, zorder=2)
    ax.add_patch(rh)
    ax.text(0.747, 0.817, "SASYASWASTHYA TO-BE WORKFLOW (SPACE-TO-GROUND)", ha='center', va='center',
            fontsize=10.5, fontweight='bold', color=EMERALD_PRIMARY, zorder=3)

    right_cards = [
        ("STAGE 1 • ALL-WEATHER SAR & SPACE INGESTION", 
         "Sentinel-1 C-band Radar penetrates 100% monsoon cloud barriers.\nAutomated 5-day Sentinel-2 computes 8 vegetative indices (NDVI, NDWI, SAVI).",
         EMERALD_PRIMARY),
        ("STAGE 2 • 72-HOUR AI PREDICTIVE EPIDEMIOLOGY", 
         "Algorithms combine IMD weather (RH >88%, GDD) with canopy stress anomalies.\nForecasts pathogen spore germination trajectories 72h before visual onset.",
         EMERALD_PRIMARY),
        ("STAGE 3 • GPS-LOCKED EXTENSION PWA GROUND-TRUTH", 
         "Automated task dispatch to local ADO with sub-meter RTK GPS lock (±0.8m).\nOn-device MobileNetV3 edge AI classifies leaf lesions offline in seconds.",
         EMERALD_PRIMARY),
        ("STAGE 4 • VERNACULAR ADVISORY & 85% CROP SAVED", 
         "Instant SMS/WhatsApp bulletin in Assamese/Bodo/English with calibrated bigha dosage.\nPrioritizes Trichoderma bio-control, reducing pesticide costs by 30%.",
         EMERALD_PRIMARY)
    ]

    for idx, (head, desc, clr) in enumerate(right_cards):
        y = 0.665 - idx * 0.17
        card = FancyBboxPatch((0.54, y - 0.035), 0.415, 0.135, boxstyle="round,pad=0.008,rounding_size=0.012",
                              facecolor='#ffffff', edgecolor=EMERALD_BORDER, linewidth=1.2, zorder=2)
        ax.add_patch(card)
        
        num_bg = FancyBboxPatch((0.55, y + 0.05), 0.05, 0.032, boxstyle="round,pad=0.002,rounding_size=0.006",
                                facecolor='#dcfce7', edgecolor=EMERALD_PRIMARY, linewidth=1, zorder=3)
        ax.add_patch(num_bg)
        ax.text(0.575, 0.066 + y, f"0{idx+1}", ha='center', va='center', fontsize=8, fontweight='bold', color=EMERALD_PRIMARY, zorder=4)
        
        ax.text(0.615, y + 0.066, head, fontsize=8.5, fontweight='bold', color=NAVY_TITLE, va='center', zorder=3)
        ax.text(0.555, y + 0.005, desc, fontsize=8, color=SLATE_MUTED, linespacing=1.25, va='center', zorder=3)

    # Central Transformation Arrow & Metric Badges
    ax.annotate("", xy=(0.515, 0.48), xytext=(0.485, 0.48),
                arrowprops=dict(arrowstyle="simple,tail_width=0.6,head_width=1.4,head_length=1.2",
                                facecolor=CYAN_PRIMARY, edgecolor=BLUE_PRIMARY, zorder=5))
    
    # Bottom Metric Strip
    metrics = [
        ("RESPONSE LATENCY", "12-21 Days -> 18 Hours", "-85% Faster", BLUE_PRIMARY, BLUE_LIGHT, BLUE_BORDER),
        ("PESTICIDE INPUT", "Toxic Over-Spray -> Bio-Control", "-25% Chemical", EMERALD_PRIMARY, EMERALD_LIGHT, EMERALD_BORDER),
        ("CROP RETENTION", "35% Loss -> 90% Protected", "+15-20% Yield", CYAN_PRIMARY, CYAN_LIGHT, CYAN_BORDER),
        ("MONSOON SURVEILLANCE", "Zero Optical Visibility -> SAR Radar", "100% Continuity", PURPLE_PRIMARY, PURPLE_LIGHT, PURPLE_BORDER)
    ]

    for i, (mtitle, msub, mbadge, pclr, bgclr, bdrclr) in enumerate(metrics):
        x = 0.025 + i * 0.245
        mcard = FancyBboxPatch((x, 0.015), 0.22, 0.055, boxstyle="round,pad=0.004,rounding_size=0.008",
                               facecolor=bgclr, edgecolor=bdrclr, linewidth=1.2, zorder=2)
        ax.add_patch(mcard)
        ax.text(x + 0.01, 0.052, mtitle, fontsize=7, fontweight='bold', color=pclr, zorder=3)
        ax.text(x + 0.01, 0.027, msub, fontsize=6.8, color=NAVY_BODY, zorder=3)
        ax.text(x + 0.21, 0.038, mbadge, fontsize=7.2, fontweight='bold', color=pclr, ha='right', zorder=3)

    save_dual(fig, "diagram_1_before_after_workflow")

# =============================================================================
# DIAGRAM 2: Multi-Tier Space-to-Ground Data Fusion & Surveillance Architecture
# =============================================================================
def make_diagram_2():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=180)
    ax.set_facecolor(BG_WHITE)
    fig.patch.set_facecolor(BG_WHITE)
    ax.axis('off')
    draw_blueprint_grid(ax)

    add_header(ax, "SPACE-TO-GROUND SURVEILLANCE & MULTI-TIER DATA FUSION ARCHITECTURE",
               "Synchronized Hierarchical Pipeline: Satellite Space Ingestion, RTK Drone Sensing & Mobile Edge AI",
               "SURVEILLANCE ARCHITECTURE")

    # 4 TIER STAGES
    tiers = [
        ("TIER 1A: OPTICAL SPACE TELEMETRY", "Sentinel-2A/2B & Landsat-8/9", 
         ["10m Multi-Spectral Surface Reflectance (BOA)", "5-Day Continuous Automated Revisit Cycle", "Calculates NDVI (Vigor) & NDWI (Moisture Stress)", "Automated SCL Cloud/Shadow Scene Masking"],
         BLUE_PRIMARY, BLUE_LIGHT, BLUE_BORDER, 0.025),
        ("TIER 1B: RADAR CLOUD INVERSION", "Sentinel-1 Synthetic Aperture Radar",
         ["C-Band 5.4 GHz Active Microwave Radar", "100% Penetration of Monsoon Overcast & Fog", "VV/VH Polarization Ratio for Canopy Water", "Lee 5x5 Speckle Filter & Soil Wetness Index"],
         PURPLE_PRIMARY, PURPLE_LIGHT, PURPLE_BORDER, 0.268),
        ("TIER 2: MESO-SCALE DRONE FLEET", "NavIC RTK Hexacopters & VTOL",
         ["Sub-5cm GSD 5-Band Multispectral + LWIR", "Indian NavIC RTK GNSS (<1.5 cm Precision)", "Onboard NVIDIA Jetson Orin Nano AI (40 TOPS)", "Autonomous Pre-Programmed Flight Waypoints"],
         CYAN_PRIMARY, CYAN_LIGHT, CYAN_BORDER, 0.511),
        ("TIER 3: MICRO-GROUND EXTENSION", "ADO Mobile Ground-Truthing PWA",
         ["Sub-Meter GPS Geofenced Parcel Locking (±0.8m)", "On-Device MobileNetV3 Edge Leaf Diagnostic", "Pheromone Trap Counter (ETL Threshold Gating)", "Offline SQLite Storage with ASSAC Sync"],
         EMERALD_PRIMARY, EMERALD_LIGHT, EMERALD_BORDER, 0.754)
    ]

    for title, subtitle, points, pclr, bgclr, bdrclr, x in tiers:
        # Outer Card
        card = FancyBboxPatch((x, 0.33), 0.22, 0.53, boxstyle="round,pad=0.01,rounding_size=0.015",
                              facecolor=bgclr, edgecolor=bdrclr, linewidth=1.5, zorder=2)
        ax.add_patch(card)
        
        # Header Badge
        hbadge = FancyBboxPatch((x + 0.01, 0.78), 0.20, 0.065, boxstyle="round,pad=0.005,rounding_size=0.008",
                                facecolor='#ffffff', edgecolor=pclr, linewidth=1.2, zorder=3)
        ax.add_patch(hbadge)
        ax.text(x + 0.11, 0.825, title, ha='center', va='center', fontsize=7.2, fontweight='bold', color=pclr, zorder=4)
        ax.text(x + 0.11, 0.798, subtitle, ha='center', va='center', fontsize=6.8, color=SLATE_MUTED, zorder=4)

        # Bullet Points
        for p_idx, pt in enumerate(points):
            py = 0.72 - p_idx * 0.095
            pcard = FancyBboxPatch((x + 0.012, py - 0.035), 0.196, 0.075, boxstyle="round,pad=0.004,rounding_size=0.006",
                                   facecolor='#ffffff', edgecolor=SLATE_BORDER, linewidth=0.8, zorder=3)
            ax.add_patch(pcard)
            ax.text(x + 0.02, py + 0.015, f"• {pt.split('(')[0]}", fontsize=7.2, fontweight='bold', color=NAVY_TITLE, zorder=4)
            rem = pt[len(pt.split('(')[0]):]
            if rem:
                ax.text(x + 0.025, py - 0.015, rem, fontsize=6.5, color=SLATE_MUTED, zorder=4)
            else:
                ax.text(x + 0.025, py - 0.015, "Standard Operating Telemetry", fontsize=6.5, color=SLATE_MUTED, zorder=4)

    # CENTRAL CONVERGENCE ENGINE BOX
    engine_box = FancyBboxPatch((0.025, 0.09), 0.95, 0.20, boxstyle="round,pad=0.012,rounding_size=0.018",
                                facecolor='#ffffff', edgecolor=BLUE_PRIMARY, linewidth=2, zorder=2)
    ax.add_patch(engine_box)

    eh = FancyBboxPatch((0.045, 0.235), 0.91, 0.042, boxstyle="round,pad=0.004,rounding_size=0.008",
                        facecolor=BLUE_LIGHT, edgecolor=BLUE_BORDER, linewidth=1, zorder=3)
    ax.add_patch(eh)
    ax.text(0.50, 0.256, "CENTRAL AGRO-EPIDEMIOLOGICAL INFERENCE & COMPOSITE SCORING ENGINE (FASTAPI & PYTORCH)",
            ha='center', va='center', fontsize=9.2, fontweight='bold', color=BLUE_PRIMARY, zorder=4)

    # 3 Engine Sub-Modules
    sub_modules = [
        ("1. SPATIAL SENSOR FUSION", "Combines 10m Sentinel, SAR Radar,\nand 5cm Drone orthomosaics with PostGIS\ncadastral Dag boundaries.", BLUE_PRIMARY),
        ("2. PATHOGEN MICROCLIMATE RULES", "Evaluates AAU epidemiological matrices:\n14h RH >88%, GDD degree days,\nand temperature oscillations.", EMERALD_PRIMARY),
        ("3. AUTOMATED MULTILINGUAL ADVISORY", "Generates bigha-calibrated bulletins\nin Assamese, Bodo, and English with\nSMS/WhatsApp broadcast dispatch.", CYAN_PRIMARY)
    ]

    for s_idx, (stitle, sdesc, sclr) in enumerate(sub_modules):
        sx = 0.045 + s_idx * 0.31
        scard = FancyBboxPatch((sx, 0.11), 0.29, 0.105, boxstyle="round,pad=0.006,rounding_size=0.01",
                               facecolor=BG_LIGHT, edgecolor=SLATE_BORDER, linewidth=1, zorder=3)
        ax.add_patch(scard)
        ax.text(sx + 0.015, 0.185, stitle, fontsize=8, fontweight='bold', color=sclr, zorder=4)
        ax.text(sx + 0.015, 0.14, sdesc, fontsize=7.2, color=NAVY_BODY, linespacing=1.2, zorder=4)

    # Downward Convergence Arrows
    for arrow_x in [0.135, 0.378, 0.621, 0.864]:
        ax.annotate("", xy=(arrow_x, 0.295), xytext=(arrow_x, 0.325),
                    arrowprops=dict(arrowstyle="simple,tail_width=0.4,head_width=1.0,head_length=0.8",
                                    facecolor=BLUE_PRIMARY, edgecolor=BLUE_BORDER, zorder=5))

    save_dual(fig, "diagram_2_dual_system_reconciliation")

# =============================================================================
# DIAGRAM 3: Pathogen Epidemiology Catalog & Microclimate Matrix
# =============================================================================
def make_diagram_3():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=180)
    ax.set_facecolor(BG_WHITE)
    fig.patch.set_facecolor(BG_WHITE)
    ax.axis('off')
    draw_blueprint_grid(ax)

    add_header(ax, "ASSAM CROP PATHOGEN EPIDEMIOLOGY CATALOG & MICROCLIMATE TRIGGER MATRIX",
               "Target Diseases, Incubation Environmental Vectors, Economic Threshold Levels & Bio-Control Formulations",
               "PATHOGEN EPIDEMIOLOGY MATRIX")

    # 4 KEY PATHOGENS
    pathogens = [
        ("1. RICE BLAST (Magnaporthe oryzae)", "Foliar Spindle Lesions & Neck Rot",
         "Sali & Boro Paddy Landraces",
         "14+ Consecutive Hours RH >88%\nOptimal Temp: 20°C - 28°C\nOvercast Skies & Leaf Wetness Duration",
         "ETL: 2-5% Leaf Area Lesions (Vegetative)\n1-2% Neck Infection (Panicle Stage)",
         "Trichoderma harzianum (5g/L spray)\nPseudomonas fluorescens seed treatment\nWater draining to lower canopy humidity",
         "Tricyclazole 75% WP @ 0.6g/L\nAzoxystrobin 23% SC @ 1 ml/L\n(Strictly Gated to ETL Breach)",
         ROSE_PRIMARY, ROSE_LIGHT, ROSE_BORDER, 0.025),
        ("2. YELLOW STEM BORER (Scirpophaga incertulas)", "Larval Dead-Hearts & White Ears",
         "All Paddy Crops (Sali, Ahu, Boro)",
         "Growing Degree Days (GDD) Accrual >450\nNight Temp >22°C & High Canopy Humidity\nAdult Oviposition Flights at Dusk",
         "ETL: 1 Moth / m² or 1 Egg Mass / m²\n>5% Dead-Hearts at Tillering Stage",
         "Scirpo-Lure Pheromone Traps (8 traps/bigha)\nTrichogramma japonicum parasitoids\nClipping seedling tips before transplant",
         "Cartap Hydrochloride 4G @ 3 kg/bigha\nChlorantraniliprole 18.5% SC @ 0.3 ml/L\n(Calibrated to Assam Bigha)",
         AMBER_PRIMARY, AMBER_LIGHT, AMBER_BORDER, 0.268),
        ("3. SHEATH BLIGHT (Rhizoctonia solani)", "Irregular Snake-Skin Lesions on Sheaths",
         "High-Density Sali Paddy & Hybrid Varieties",
         "Excessive Nitrogen Fertilizer Application\nRH >90% within Dense Plant Canopy\nStagnant Flood Waters & Warm Temps (28-32°C)",
         "ETL: 10% Affected Tillers at Maximum\nTillering to Panicle Initiation",
         "Neem Seed Kernel Extract (NSKE 5%)\nOptimized plant spacing (20cm x 15cm)\nField bund weeding & water drainage",
         "Validamycin 3% L @ 2 ml/L\nHexaconazole 5% EC @ 2 ml/L\n(Restricted to severe clusters)",
         CYAN_PRIMARY, CYAN_LIGHT, CYAN_BORDER, 0.511),
        ("4. BROWN PLANTHOPPER (Nilaparvata lugens)", "Hopper Burn & Plant Wilting",
         "Late Kharif & Boro Intensive Parcels",
         "Continuous Submergence / Stagnant Water\nHigh Humid Microclimate at Base of Plant\nIndiscriminate Synthetic Pyrethroid Misuse",
         "ETL: 5-10 Nymphs/Adults per Hill\n(Tillering to Flowering Phase)",
         "Formation of Alleyways (1 row per 2m)\nIntermittent Irrigation (AWD Wet-Dry)\nPredatory Mirid Bugs & Spiders Conservation",
         "Pymetrozine 50% WDG @ 0.6g/L\nTriflumuron 20% + Deltamethrin\n(Targeted strictly to base of hill)",
         PURPLE_PRIMARY, PURPLE_LIGHT, PURPLE_BORDER, 0.754)
    ]

    for title, subtitle, crop, triggers, etl, bio, chem, pclr, bgclr, bdrclr, x in pathogens:
        card = FancyBboxPatch((x, 0.05), 0.22, 0.81, boxstyle="round,pad=0.01,rounding_size=0.015",
                              facecolor=bgclr, edgecolor=bdrclr, linewidth=1.5, zorder=2)
        ax.add_patch(card)

        # Header Badge
        hbadge = FancyBboxPatch((x + 0.01, 0.77), 0.20, 0.075, boxstyle="round,pad=0.005,rounding_size=0.008",
                                facecolor='#ffffff', edgecolor=pclr, linewidth=1.2, zorder=3)
        ax.add_patch(hbadge)
        ax.text(x + 0.11, 0.815, title, ha='center', va='center', fontsize=6.8, fontweight='bold', color=pclr, zorder=4)
        ax.text(x + 0.11, 0.79, subtitle, ha='center', va='center', fontsize=6.5, color=SLATE_MUTED, zorder=4)

        sections = [
            ("VULNERABLE CROPS", crop, NAVY_TITLE),
            ("MICROCLIMATE TRIGGERS", triggers, pclr),
            ("ECONOMIC THRESHOLD (ETL)", etl, ROSE_PRIMARY),
            ("BIO-CONTROL & IPM (PRIORITY)", bio, EMERALD_PRIMARY),
            ("CHEMICAL INTERVENTION", chem, NAVY_BODY)
        ]

        for s_idx, (stitle, scontent, sclr) in enumerate(sections):
            sy = 0.68 - s_idx * 0.138
            scard = FancyBboxPatch((x + 0.01, sy - 0.04), 0.20, 0.115, boxstyle="round,pad=0.004,rounding_size=0.006",
                                   facecolor='#ffffff', edgecolor=SLATE_BORDER, linewidth=0.8, zorder=3)
            ax.add_patch(scard)
            ax.text(x + 0.018, sy + 0.052, stitle, fontsize=6.5, fontweight='bold', color=sclr, zorder=4)
            ax.text(x + 0.018, sy - 0.005, scontent, fontsize=6.2, color=NAVY_BODY, linespacing=1.2, zorder=4)

    save_dual(fig, "diagram_3_cadastral_anomaly_catalog")

# =============================================================================
# DIAGRAM 4: Crop Health Index (CHI 1-100) Multi-Tier Scoring Hierarchy
# =============================================================================
def make_diagram_4():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=180)
    ax.set_facecolor(BG_WHITE)
    fig.patch.set_facecolor(BG_WHITE)
    ax.axis('off')
    draw_blueprint_grid(ax)

    add_header(ax, "CROP HEALTH INDEX (CHI 1–100): HIERARCHICAL COMPOSITE SCORING FORMULA",
               "Multi-Factor Algorithmic Synthesis: Spaceborne Spectral Indices, Radar Backscatter, Weather & Ground Telemetry",
               "HEALTH SCORING HIERARCHY")

    # LEFT: FORMULA & WEIGHTING PYRAMID (0.58 width)
    box_formula = FancyBboxPatch((0.025, 0.07), 0.58, 0.80, boxstyle="round,pad=0.012,rounding_size=0.018",
                                 facecolor=BG_LIGHT, edgecolor=BLUE_BORDER, linewidth=2, zorder=1)
    ax.add_patch(box_formula)

    # Formula Header
    fh = FancyBboxPatch((0.045, 0.785), 0.54, 0.065, boxstyle="round,pad=0.006,rounding_size=0.01",
                        facecolor=BLUE_LIGHT, edgecolor=BLUE_PRIMARY, linewidth=1.5, zorder=2)
    ax.add_patch(fh)
    ax.text(0.315, 0.817, "CHI COMPOSITE MATHEMATICAL FORMULA & FACTOR WEIGHTING", ha='center', va='center',
            fontsize=10, fontweight='bold', color=BLUE_PRIMARY, zorder=3)

    tiers = [
        ("TIER 1 (35% WEIGHT) • OPTICAL VEGETATIVE INDICES (W_v)", 
         "NDVI (Canopy Vigor) + NDWI (Moisture Deficit) + SAVI (Soil Adjusted Canopy Cover)",
         "Calculated from 10m Sentinel-2 multi-spectral surface reflectance bands (B4, B8, B11).\nDeviation from historical 5-year running baseline detects early chlorosis and biomass loss.",
         BLUE_PRIMARY, BLUE_LIGHT, BLUE_BORDER),
        ("TIER 2 (25% WEIGHT) • RADAR & THERMAL SURFACE DYNAMICS (W_r)", 
         "Sentinel-1 SAR C-Band Backscatter (VV/VH) + Landsat/UAV Thermal Infrared (LWIR)",
         "All-weather radar penetrates monsoon clouds to measure volumetric canopy structure.\nThermal depression identifies stomatal closure and early fungal infection 48h early.",
         PURPLE_PRIMARY, PURPLE_LIGHT, PURPLE_BORDER),
        ("TIER 3 (20% WEIGHT) • EPIDEMIOLOGICAL MICROCLIMATE RISK (W_m)", 
         "IMD AWS 14h Relative Humidity (>88%) + Growing Degree Days (GDD) + Rainfall (mm)",
         "Dynamic spore germination trajectory models for Rice Blast, Stem Borer, and Sheath Blight.\nCalculates environmental disease receptivity before spores penetrate leaf cuticles.",
         CYAN_PRIMARY, CYAN_LIGHT, CYAN_BORDER),
        ("TIER 4 (20% WEIGHT) • IN-SITU GROUND-TRUTH TELEMETRY (W_g)", 
         "AEO Pheromone Trap Moth Counts + On-Device MobileNetV3 AI Leaf Lesion Confidence",
         "Sub-meter RTK GPS verified ground inspections feed real-time calibration to space data.\nEconomic Threshold Level (ETL) breaches lock high-priority intervention status.",
         EMERALD_PRIMARY, EMERALD_LIGHT, EMERALD_BORDER)
    ]

    for idx, (head, sub, desc, pclr, bgclr, bdrclr) in enumerate(tiers):
        y = 0.66 - idx * 0.17
        tcard = FancyBboxPatch((0.045, y - 0.035), 0.54, 0.14, boxstyle="round,pad=0.008,rounding_size=0.012",
                               facecolor='#ffffff', edgecolor=bdrclr, linewidth=1.2, zorder=2)
        ax.add_patch(tcard)
        ax.text(0.065, y + 0.07, head, fontsize=8.2, fontweight='bold', color=pclr, zorder=3)
        ax.text(0.065, y + 0.038, sub, fontsize=7.5, fontweight='semibold', color=NAVY_TITLE, zorder=3)
        ax.text(0.065, y - 0.012, desc, fontsize=7.2, color=SLATE_MUTED, linespacing=1.2, zorder=3)

    # RIGHT: GRADING MATRIX & TRIAGE ACTIONS (0.35 width)
    box_matrix = FancyBboxPatch((0.625, 0.07), 0.35, 0.80, boxstyle="round,pad=0.012,rounding_size=0.018",
                                facecolor=BG_LIGHT, edgecolor=SLATE_BORDER, linewidth=2, zorder=1)
    ax.add_patch(box_matrix)

    mh = FancyBboxPatch((0.645, 0.785), 0.31, 0.065, boxstyle="round,pad=0.006,rounding_size=0.01",
                        facecolor='#ffffff', edgecolor=EMERALD_PRIMARY, linewidth=1.5, zorder=2)
    ax.add_patch(mh)
    ax.text(0.80, 0.817, "HEALTH GRADE TRIAGE & INTERVENTION", ha='center', va='center',
            fontsize=10, fontweight='bold', color=EMERALD_PRIMARY, zorder=3)

    grades = [
        ("GRADE A • CHI 85 - 100", "EXCELLENT CANOPY VIGOR", "No disease symptoms detected.\nStandard cultural maintenance.", EMERALD_PRIMARY, EMERALD_LIGHT, EMERALD_BORDER),
        ("GRADE B • CHI 70 - 84", "MILD MICROCLIMATE STRESS", "Early humidity warning flagged.\nBio-preventative spray advised.", CYAN_PRIMARY, CYAN_LIGHT, CYAN_BORDER),
        ("GRADE C • CHI 50 - 69", "MODERATE PEST PRESSURE", "Approaching ETL thresholds.\nADO scouting roster dispatched.", AMBER_PRIMARY, AMBER_LIGHT, AMBER_BORDER),
        ("GRADE D • CHI < 50", "CRITICAL OUTBREAK DETECTED", "Immediate emergency intervention.\nCalibrated chemical spray authorized.", ROSE_PRIMARY, ROSE_LIGHT, ROSE_BORDER)
    ]

    for g_idx, (gtitle, gsub, gaction, pclr, bgclr, bdrclr) in enumerate(grades):
        gy = 0.66 - g_idx * 0.17
        gcard = FancyBboxPatch((0.645, gy - 0.035), 0.31, 0.14, boxstyle="round,pad=0.008,rounding_size=0.012",
                               facecolor=bgclr, edgecolor=bdrclr, linewidth=1.2, zorder=2)
        ax.add_patch(gcard)
        ax.text(0.66, gy + 0.07, gtitle, fontsize=8.5, fontweight='bold', color=pclr, zorder=3)
        ax.text(0.66, gy + 0.04, gsub, fontsize=7.2, fontweight='bold', color=NAVY_TITLE, zorder=3)
        ax.text(0.66, gy - 0.012, gaction, fontsize=7.2, color=NAVY_BODY, linespacing=1.2, zorder=3)

    save_dual(fig, "diagram_4_land_health_score_hierarchy")

# =============================================================================
# DIAGRAM 5: Field Ground-Truthing & Extension Officer PWA Workflow
# =============================================================================
def make_diagram_5():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=180)
    ax.set_facecolor(BG_WHITE)
    fig.patch.set_facecolor(BG_WHITE)
    ax.axis('off')
    draw_blueprint_grid(ax)

    add_header(ax, "AGRICULTURAL EXTENSION OFFICER (ADO) GROUND-TRUTHING PWA WORKFLOW",
               "Progressive Web App Architecture with Sub-Meter RTK GPS Plot Geofencing & Offline Edge AI Diagnosis",
               "FIELD EXTENSION PWA WORKFLOW")

    steps = [
        ("1. TASK ALLOCATION", "Automated Roster Push",
         ["Executive Dashboard flags Grade D parcel", "Geo-tagged task pushed to local ADO PWA", "Contains Farmer Name, Dag Number & Village", "Offline task queue pre-cached in local SQLite"],
         BLUE_PRIMARY, BLUE_LIGHT, BLUE_BORDER, 0.025),
        ("2. IN-SITU GPS LOCK", "Sub-Meter Cadastral Lock",
         ["ADO arrives at field plot in Assam valley", "NavIC / GPS RTK geofence locks ±0.8m accuracy", "In-situ verification timestamp & audit tag", "Guarantees extension officer was on actual Dag"],
         CYAN_PRIMARY, CYAN_LIGHT, CYAN_BORDER, 0.268),
        ("3. TRAP & LESION SCOUTING", "Pheromone & Defoliation Scan",
         ["ADO inspects Scirpo-Lure pheromone traps", "Logs moth count against ETL (8 moths/trap)", "Evaluates visual canopy defoliation %", "Records cultural water drainage conditions"],
         AMBER_PRIMARY, AMBER_LIGHT, AMBER_BORDER, 0.511),
        ("4. EDGE AI INFERENCE", "On-Device MobileNetV3 AI",
         ["Smartphone camera captures suspect leaf blade", "Runs quantized INT8 AI model locally (82ms)", "Classifies Rice Blast / Stem Borer (95.8% conf)", "Zero internet required; instant diagnosis"],
         EMERALD_PRIMARY, EMERALD_LIGHT, EMERALD_BORDER, 0.754)
    ]

    for title, subtitle, points, pclr, bgclr, bdrclr, x in steps:
        card = FancyBboxPatch((x, 0.28), 0.22, 0.58, boxstyle="round,pad=0.01,rounding_size=0.015",
                              facecolor=bgclr, edgecolor=bdrclr, linewidth=1.5, zorder=2)
        ax.add_patch(card)

        hbadge = FancyBboxPatch((x + 0.01, 0.79), 0.20, 0.065, boxstyle="round,pad=0.005,rounding_size=0.008",
                                facecolor='#ffffff', edgecolor=pclr, linewidth=1.2, zorder=3)
        ax.add_patch(hbadge)
        ax.text(x + 0.11, 0.835, title, ha='center', va='center', fontsize=7.2, fontweight='bold', color=pclr, zorder=4)
        ax.text(x + 0.11, 0.808, subtitle, ha='center', va='center', fontsize=6.8, color=SLATE_MUTED, zorder=4)

        for p_idx, pt in enumerate(points):
            py = 0.72 - p_idx * 0.105
            pcard = FancyBboxPatch((x + 0.012, py - 0.04), 0.196, 0.082, boxstyle="round,pad=0.004,rounding_size=0.006",
                                   facecolor='#ffffff', edgecolor=SLATE_BORDER, linewidth=0.8, zorder=3)
            ax.add_patch(pcard)
            ax.text(x + 0.02, py + 0.015, f"Step {p_idx+1}: {pt.split('(')[0]}", fontsize=7.2, fontweight='bold', color=NAVY_TITLE, zorder=4)
            rem = pt[len(pt.split('(')[0]):]
            ax.text(x + 0.02, py - 0.018, rem if rem else "Verified Operational Parameter", fontsize=6.6, color=SLATE_MUTED, zorder=4)

    # BOTTOM SYNC BAR
    sync_bar = FancyBboxPatch((0.025, 0.06), 0.95, 0.17, boxstyle="round,pad=0.012,rounding_size=0.018",
                              facecolor=BG_LIGHT, edgecolor=EMERALD_PRIMARY, linewidth=2, zorder=2)
    ax.add_patch(sync_bar)

    ax.text(0.50, 0.195, "OFFLINE-TO-ONLINE BACKGROUND SYNCHRONIZATION PIPELINE (SQLITE -> POSTGIS -> ASSAC)",
            ha='center', va='center', fontsize=9.2, fontweight='bold', color=EMERALD_PRIMARY, zorder=4)

    sync_steps = [
        ("LOCAL STORAGE ENGINE", "IndexedDB / SQLite stores telemetry\nand encrypted photo blobs securely on\nthe mobile device when offline.", EMERALD_PRIMARY),
        ("BACKGROUND SYNC SERVICE", "Service Worker monitors cellular signal.\nAuto-syncs upon entering mobile range\nwithout manual officer intervention.", CYAN_PRIMARY),
        ("CRYPTOGRAPHIC AUDIT LOG", "Every verification creates a SHA-256 hash\nlinking officer ID, GPS coordinates,\nand AI confidence into state ledger.", BLUE_PRIMARY)
    ]

    for s_idx, (stitle, sdesc, sclr) in enumerate(sync_steps):
        sx = 0.045 + s_idx * 0.31
        scard = FancyBboxPatch((sx, 0.08), 0.29, 0.095, boxstyle="round,pad=0.006,rounding_size=0.01",
                               facecolor='#ffffff', edgecolor=SLATE_BORDER, linewidth=1, zorder=3)
        ax.add_patch(scard)
        ax.text(sx + 0.015, 0.145, stitle, fontsize=8, fontweight='bold', color=sclr, zorder=4)
        ax.text(sx + 0.015, 0.105, sdesc, fontsize=7.2, color=NAVY_BODY, linespacing=1.2, zorder=4)

    save_dual(fig, "diagram_5_lat_mandal_mobile_app")

# =============================================================================
# DIAGRAM 6: Sasya Seva Multilingual Advisory Bulletin & Farmer Action Framework
# =============================================================================
def make_diagram_6():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=180)
    ax.set_facecolor(BG_WHITE)
    fig.patch.set_facecolor(BG_WHITE)
    ax.axis('off')
    draw_blueprint_grid(ax)

    add_header(ax, "SASYA SEVA (শস্য সেৱা): HYPER-LOCAL MULTILINGUAL AGRO-ADVISORY BULLETIN",
               "Automated 3-Tier Intervention Delivery: Assamese, Bodo, Bengali & English Language Distribution Engine",
               "MULTILINGUAL ADVISORY FRAMEWORK")

    # LEFT: OFFICIAL ADVISORY BULLETIN CARD (0.50 width)
    bulletin = FancyBboxPatch((0.025, 0.07), 0.465, 0.80, boxstyle="round,pad=0.012,rounding_size=0.018",
                              facecolor=BG_LIGHT, edgecolor=EMERALD_BORDER, linewidth=2, zorder=1)
    ax.add_patch(bulletin)

    bh = FancyBboxPatch((0.045, 0.785), 0.425, 0.065, boxstyle="round,pad=0.006,rounding_size=0.01",
                        facecolor='#ffffff', edgecolor=EMERALD_PRIMARY, linewidth=1.5, zorder=2)
    ax.add_patch(bh)
    ax.text(0.257, 0.825, "SASYA SEVA OFFICIAL AGRO-BULLETIN (SAMPLE DISPATCH)", ha='center', va='center',
            fontsize=9.5, fontweight='bold', color=EMERALD_PRIMARY, zorder=3)
    ax.text(0.257, 0.80, "Village: Azara • Block: Rani • District: Kamrup Rural • Dag: 142/58", ha='center', va='center',
            fontsize=7, color=SLATE_MUTED, zorder=3)

    sections = [
        ("ASSAMESE HEADLINE (অসমীয়া)", 
         "\"ধানৰ পাতপোৰা ৰোগৰ আগজাননী: পথাৰৰ পানী নিষ্কাশন কৰক আৰু জৈৱিক ঔষধ প্ৰয়োগ কৰক।\"", 
         "Valid Until: 25 Nov 2026 • Issued: Directorate of Agriculture & ASSAC", EMERALD_PRIMARY),
        ("1. CULTURAL & WATER MANAGEMENT", 
         "Drain stagnant standing water from paddy field for 48 hours to aerate soil.\nClear weeds from field bunds to eliminate alternative host plants.",
         "Action: Field Aeration & Sanitation • Zero Cost Input", BLUE_PRIMARY),
        ("2. BIO-CONTROL & IPM (MANDATORY FIRST LINE)", 
         "Foliar spray of Trichoderma harzianum @ 5g/L or Pseudomonas fluorescens @ 5g/L.\nApply Neem Seed Kernel Extract (NSKE 5%) during morning calm hours.",
         "Action: Organic Bio-Pesticide • AAU Certified Formulation", EMERALD_PRIMARY),
        ("3. CHEMICAL INTERVENTION (THRESHOLD RESTRICTED)", 
         "ONLY if disease severity exceeds 10% canopy cover:\nApply Tricyclazole 75% WP @ 0.6g/L (Dosage: 120g per Assam Bigha).\nStrictly follow 14-day pre-harvest withholding interval.",
         "Action: Gated to In-Situ ETL Breach • Precise Bigha Dosage", ROSE_PRIMARY)
    ]

    for s_idx, (stitle, sbody, ssub, sclr) in enumerate(sections):
        sy = 0.66 - s_idx * 0.17
        scard = FancyBboxPatch((0.045, sy - 0.035), 0.425, 0.14, boxstyle="round,pad=0.008,rounding_size=0.012",
                               facecolor='#ffffff', edgecolor=sclr, linewidth=1.2, zorder=2)
        ax.add_patch(scard)
        ax.text(0.065, sy + 0.07, stitle, fontsize=8, fontweight='bold', color=sclr, zorder=3)
        ax.text(0.065, sy + 0.025, sbody, fontsize=7.2, fontweight='medium', color=NAVY_TITLE, linespacing=1.2, zorder=3)
        ax.text(0.065, sy - 0.015, ssub, fontsize=6.8, color=SLATE_MUTED, zorder=3)

    # RIGHT: MULTI-CHANNEL CITIZEN DISSEMINATION PIPELINE (0.46 width)
    box_disp = FancyBboxPatch((0.515, 0.07), 0.46, 0.80, boxstyle="round,pad=0.012,rounding_size=0.018",
                              facecolor=BG_LIGHT, edgecolor=BLUE_BORDER, linewidth=2, zorder=1)
    ax.add_patch(box_disp)

    dh = FancyBboxPatch((0.535, 0.785), 0.42, 0.065, boxstyle="round,pad=0.006,rounding_size=0.01",
                        facecolor='#ffffff', edgecolor=BLUE_PRIMARY, linewidth=1.5, zorder=2)
    ax.add_patch(dh)
    ax.text(0.745, 0.817, "MULTI-CHANNEL TELECOM BROADCAST PIPELINE", ha='center', va='center',
            fontsize=10, fontweight='bold', color=BLUE_PRIMARY, zorder=3)

    channels = [
        ("CHANNEL 1 • HYPER-LOCAL SMS ALERTS", "Plain text SMS dispatched in Assamese & Bodo scripts.\nDelivered to basic feature phones without requiring data.\nInstant delivery via National Telecom Gateways (CDAC/NIC).", BLUE_PRIMARY),
        ("CHANNEL 2 • WHATSAPP RICH AGRO-CARD", "Sends visual pest advisory infographic card with photo of symptom,\naudio message snippet, and GPS verified dosage calculator.\nHigh farmer engagement across smartphone users.", EMERALD_PRIMARY),
        ("CHANNEL 3 • OUTBOUND VOICE IVR CALLS", "Automated outbound voice call in local rural dialect for\nnon-literate smallholders. Press 1 to connect to local AEO.\nEnsures 100% inclusive citizen advisory penetration.", CYAN_PRIMARY),
        ("CHANNEL 4 • KRISHI KENDRA / SIREN HUBS", "Emergency siren and loud-speaker broadcast alerts at\nvillage Panchayats for rapid-spreading vector outbreaks\n(e.g., Brown Planthopper hopper-burn swarms).", PURPLE_PRIMARY)
    ]

    for c_idx, (ctitle, cdesc, cclr) in enumerate(channels):
        cy = 0.66 - c_idx * 0.17
        ccard = FancyBboxPatch((0.535, cy - 0.035), 0.42, 0.14, boxstyle="round,pad=0.008,rounding_size=0.012",
                               facecolor='#ffffff', edgecolor=cclr, linewidth=1.2, zorder=2)
        ax.add_patch(ccard)
        ax.text(0.555, cy + 0.07, ctitle, fontsize=8.2, fontweight='bold', color=cclr, zorder=3)
        ax.text(0.555, cy + 0.01, cdesc, fontsize=7.2, color=NAVY_BODY, linespacing=1.25, zorder=3)

    save_dual(fig, "diagram_6_citizen_land_health_certificate")

# =============================================================================
# DIAGRAM 7: Enterprise System Architecture (Cloud & Edge Infrastructure)
# =============================================================================
def make_diagram_7():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=180)
    ax.set_facecolor(BG_WHITE)
    fig.patch.set_facecolor(BG_WHITE)
    ax.axis('off')
    draw_blueprint_grid(ax)

    add_header(ax, "SASYASWASTHYA ENTERPRISE CLOUD, EDGE & COMPLIANCE SYSTEM ARCHITECTURE",
               "Cloudflare Edge Network, FastAPI Microservices, PostGIS Vector Layer, Drone C2 & Cryptographic Audit Ledger",
               "ENTERPRISE SYSTEM ARCHITECTURE")

    # 4 HORIZONTAL ARCHITECTURE LAYERS
    layers = [
        ("LAYER 1: SENSOR & TELEMETRY INGESTION", 
         [("Copernicus Sentinel-2", "10m Optical Multi-Spectral", BLUE_PRIMARY),
          ("Sentinel-1 SAR Radar", "C-Band All-Weather Radar", PURPLE_PRIMARY),
          ("IMD Automatic Weather", "AWS Microclimate Stations", CYAN_PRIMARY),
          ("Drone Fleet Telemetry", "NavIC RTK 5-Band + LWIR", EMERALD_PRIMARY)],
         0.68, BLUE_LIGHT, BLUE_BORDER),
        
        ("LAYER 2: ASYNCHRONOUS AI PROCESSING & EPIDEMIOLOGY", 
         [("Sen2Cor Cloud Masking", "Atmospheric Correction BOA", BLUE_PRIMARY),
          ("Spectral Indices Engine", "NDVI, NDWI, SAVI, CI-Red", CYAN_PRIMARY),
          ("PyTorch Epidemiological", "Spore Incubation Vectors", AMBER_PRIMARY),
          ("Quantized MobileNetV3", "On-Device Leaf Inference", EMERALD_PRIMARY)],
         0.48, CYAN_LIGHT, CYAN_BORDER),
        
        ("LAYER 3: DATA STORAGE, CADASTRE & DRONE C2", 
         [("PostgreSQL 16 / PostGIS", "Cadastral Dag Boundaries", BLUE_PRIMARY),
          ("Redis 7 Cache Layer", "High-Throughput Telemetry", PURPLE_PRIMARY),
          ("Cloudflare R2 Storage", "Drone Orthomosaic GeoTIFFs", CYAN_PRIMARY),
          ("Drone Mission C2 Hub", "ArduPilot Waypoint Dispatch", EMERALD_PRIMARY)],
         0.28, PURPLE_LIGHT, PURPLE_BORDER),
        
        ("LAYER 4: CITIZEN PRESENTATION & COMPLIANCE GOVERNANCE", 
         [("Executive Agro-Dashboard", "Real-Time Outbreak Map", BLUE_PRIMARY),
          ("Offline Extension PWA", "SQLite Ground-Truthing", EMERALD_PRIMARY),
          ("Sasya Seva Multilingual", "Assamese / Bodo Portal", CYAN_PRIMARY),
          ("SHA-256 Audit Ledger", "Immutable Tamper-Evident", ROSE_PRIMARY)],
         0.08, EMERALD_LIGHT, EMERALD_BORDER)
    ]

    for ltitle, boxes, ly, bgclr, bdrclr in layers:
        # Layer Container
        lcard = FancyBboxPatch((0.025, ly), 0.95, 0.175, boxstyle="round,pad=0.008,rounding_size=0.012",
                               facecolor=bgclr, edgecolor=bdrclr, linewidth=1.5, zorder=1)
        ax.add_patch(lcard)
        ax.text(0.04, ly + 0.145, ltitle, fontsize=8.5, fontweight='bold', color=NAVY_TITLE, zorder=2)

        for b_idx, (btitle, bsub, bclr) in enumerate(boxes):
            bx = 0.04 + b_idx * 0.235
            bcard = FancyBboxPatch((bx, ly + 0.02), 0.22, 0.105, boxstyle="round,pad=0.006,rounding_size=0.008",
                                   facecolor='#ffffff', edgecolor=bclr, linewidth=1.2, zorder=2)
            ax.add_patch(bcard)
            ax.text(bx + 0.015, ly + 0.088, btitle, fontsize=7.8, fontweight='bold', color=bclr, zorder=3)
            ax.text(bx + 0.015, ly + 0.05, bsub, fontsize=7, color=SLATE_MUTED, zorder=3)

    # Connecting Flow Arrows between layers
    for flow_y in [0.655, 0.455, 0.255]:
        for flow_x in [0.15, 0.385, 0.62, 0.855]:
            ax.annotate("", xy=(flow_x, flow_y), xytext=(flow_x, flow_y + 0.025),
                        arrowprops=dict(arrowstyle="simple,tail_width=0.3,head_width=0.8,head_length=0.6",
                                        facecolor=BLUE_PRIMARY, edgecolor=SLATE_BORDER, zorder=3))

    save_dual(fig, "diagram_7_enterprise_system_architecture")

# =============================================================================
# WIREFRAME 1: Executive Agro-Dashboard Interface Architecture
# =============================================================================
def make_wireframe_1():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=180)
    ax.set_facecolor(BG_WHITE)
    fig.patch.set_facecolor(BG_WHITE)
    ax.axis('off')
    draw_blueprint_grid(ax)

    add_header(ax, "EXECUTIVE AGRO-DASHBOARD UI ARCHITECTURE & STATE ANALYTICS VIEW (#dashboard)",
               "Real-Time Monitored Acreage, Outbreak Incident Counter, Health Trajectories & Administrative Triage",
               "EXECUTIVE DASHBOARD WIREFRAME")

    # Top KPI Strip (4 Cards)
    kpis = [
        ("TOTAL MONITORED AREA", "4,820 Hectares", "12,450 Cadastral Dags", BLUE_PRIMARY, BLUE_LIGHT, BLUE_BORDER),
        ("ACTIVE OUTBREAK INCIDENTS", "4 Critical Clusters", "Grade D ETL Breaches", ROSE_PRIMARY, ROSE_LIGHT, ROSE_BORDER),
        ("STATE HEALTH INDEX (CHI)", "78.4 / 100", "+4.2% W-o-W Recovery", EMERALD_PRIMARY, EMERALD_LIGHT, EMERALD_BORDER),
        ("SATELLITE & RADAR PASSES", "Sentinel-2 & SAR Active", "Last Pass: 3 Hours Ago", CYAN_PRIMARY, CYAN_LIGHT, CYAN_BORDER)
    ]

    for k_idx, (ktitle, kval, ksub, pclr, bgclr, bdrclr) in enumerate(kpis):
        kx = 0.025 + k_idx * 0.245
        kcard = FancyBboxPatch((kx, 0.74), 0.22, 0.13, boxstyle="round,pad=0.008,rounding_size=0.012",
                               facecolor=bgclr, edgecolor=bdrclr, linewidth=1.5, zorder=2)
        ax.add_patch(kcard)
        ax.text(kx + 0.015, 0.835, ktitle, fontsize=7.2, fontweight='bold', color=pclr, zorder=3)
        ax.text(kx + 0.015, 0.785, kval, fontsize=13, fontweight='bold', color=NAVY_TITLE, zorder=3)
        ax.text(kx + 0.015, 0.755, ksub, fontsize=7, color=SLATE_MUTED, zorder=3)

    # Main Left Panel: Outbreak Roster & Geo-Targeting (0.58 width)
    left_main = FancyBboxPatch((0.025, 0.07), 0.58, 0.64, boxstyle="round,pad=0.012,rounding_size=0.018",
                               facecolor='#ffffff', edgecolor=SLATE_BORDER, linewidth=1.5, zorder=2)
    ax.add_patch(left_main)

    ax.text(0.045, 0.675, "PRIORITIZED OUTBREAK ROSTER & PARCEL DISPATCH QUEUE", fontsize=9.5, fontweight='bold', color=NAVY_TITLE, zorder=3)
    ax.text(0.045, 0.65, "Sorted by Epidemiological Threat Severity • Kamrup Rural & Nagaon Focus", fontsize=7.2, color=SLATE_MUTED, zorder=3)

    parcels = [
        ("PLOT-KAM-2026-081 • Bhaben Kalita", "Kamrup Rural • Azara • Dag 142/58", "Rice Blast (Magnaporthe oryzae)", "GRADE D", "CHI: 42/100", ROSE_PRIMARY, ROSE_LIGHT, ROSE_BORDER),
        ("PLOT-NAG-2026-044 • Dipen Hazarika", "Nagaon • Raha • Dag 89/12", "Yellow Stem Borer (Dead-Hearts)", "GRADE D", "CHI: 48/100", ROSE_PRIMARY, ROSE_LIGHT, ROSE_BORDER),
        ("PLOT-JOR-2026-112 • Maniram Saikia", "Jorhat • Titabor • Dag 312/04", "Sheath Blight (Snake-Skin)", "GRADE C", "CHI: 58/100", AMBER_PRIMARY, AMBER_LIGHT, AMBER_BORDER),
        ("PLOT-BAR-2026-095 • Abdul Mazid", "Barpeta • Sarthebari • Dag 56/71", "Brown Planthopper Warning", "GRADE B", "CHI: 74/100", CYAN_PRIMARY, CYAN_LIGHT, CYAN_BORDER)
    ]

    for p_idx, (pname, ploc, ppest, pgrade, pchi, pclr, bgclr, bdrclr) in enumerate(parcels):
        py = 0.53 - p_idx * 0.135
        pcard = FancyBboxPatch((0.045, py - 0.035), 0.54, 0.115, boxstyle="round,pad=0.006,rounding_size=0.01",
                               facecolor=bgclr, edgecolor=bdrclr, linewidth=1.2, zorder=3)
        ax.add_patch(pcard)
        ax.text(0.06, py + 0.05, pname, fontsize=8.2, fontweight='bold', color=NAVY_TITLE, zorder=4)
        ax.text(0.06, py + 0.018, ploc, fontsize=7.2, color=SLATE_MUTED, zorder=4)
        ax.text(0.06, py - 0.015, f"Threat: {ppest}", fontsize=7.2, fontweight='semibold', color=pclr, zorder=4)
        
        # Badges
        gbadge = FancyBboxPatch((0.43, py + 0.01), 0.07, 0.04, boxstyle="round,pad=0.002,rounding_size=0.006",
                                facecolor='#ffffff', edgecolor=pclr, linewidth=1, zorder=4)
        ax.add_patch(gbadge)
        ax.text(0.465, py + 0.03, pgrade, ha='center', va='center', fontsize=7.2, fontweight='bold', color=pclr, zorder=5)
        ax.text(0.53, py + 0.03, pchi, ha='center', va='center', fontsize=7.5, fontweight='bold', color=NAVY_BODY, zorder=4)

    # Right Panel: District Health Breakdown (0.35 width)
    right_main = FancyBboxPatch((0.625, 0.07), 0.35, 0.64, boxstyle="round,pad=0.012,rounding_size=0.018",
                                facecolor='#ffffff', edgecolor=SLATE_BORDER, linewidth=1.5, zorder=2)
    ax.add_patch(right_main)

    ax.text(0.645, 0.675, "DISTRICT HEALTH & EPIDEMIOLOGY SPREAD", fontsize=9.5, fontweight='bold', color=NAVY_TITLE, zorder=3)
    ax.text(0.645, 0.65, "Sentinel-2 & AWS Telemetry by District", fontsize=7.2, color=SLATE_MUTED, zorder=3)

    districts = [
        ("Kamrup Rural", "1,420 Ha • 12 AWS Stns", "CHI 74.2", 0.74, EMERALD_PRIMARY),
        ("Nagaon", "1,850 Ha • 16 AWS Stns", "CHI 68.5", 0.68, AMBER_PRIMARY),
        ("Jorhat", "920 Ha • 8 AWS Stns", "CHI 82.1", 0.82, EMERALD_PRIMARY),
        ("Barpeta", "630 Ha • 6 AWS Stns", "CHI 71.0", 0.71, CYAN_PRIMARY)
    ]

    for d_idx, (dname, dmeta, dchi, dbar, dclr) in enumerate(districts):
        dy = 0.53 - d_idx * 0.135
        dcard = FancyBboxPatch((0.645, dy - 0.035), 0.31, 0.115, boxstyle="round,pad=0.006,rounding_size=0.01",
                               facecolor=BG_LIGHT, edgecolor=SLATE_BORDER, linewidth=1, zorder=3)
        ax.add_patch(dcard)
        ax.text(0.66, dy + 0.048, dname, fontsize=8.2, fontweight='bold', color=NAVY_TITLE, zorder=4)
        ax.text(0.66, dy + 0.02, dmeta, fontsize=7, color=SLATE_MUTED, zorder=4)
        ax.text(0.935, dy + 0.048, dchi, fontsize=8, fontweight='bold', color=dclr, ha='right', zorder=4)
        
        # Progress bar
        ax.add_patch(Rectangle((0.66, dy - 0.02), 0.275, 0.015, facecolor='#e2e8f0', zorder=4))
        ax.add_patch(Rectangle((0.66, dy - 0.02), 0.275 * dbar, 0.015, facecolor=dclr, zorder=5))

    save_dual(fig, "wireframe_1_executive_dashboard")

# =============================================================================
# WIREFRAME 2: Satellite & Cadastral WebGIS Interface Architecture
# =============================================================================
def make_wireframe_2():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=180)
    ax.set_facecolor(BG_WHITE)
    fig.patch.set_facecolor(BG_WHITE)
    ax.axis('off')
    draw_blueprint_grid(ax)

    add_header(ax, "SATELLITE & CADASTRAL WEBGIS VIEWER ARCHITECTURE (#gis-viewer)",
               "Leaflet Geospatial Map Engine: Sentinel-2 Multi-Spectral Overlays, Dag Cadastral Vectors & Telemetry",
               "WEBGIS VIEWER WIREFRAME")

    # Left: WebGIS Interactive Map Canvas (0.64 width)
    map_box = FancyBboxPatch((0.025, 0.07), 0.64, 0.80, boxstyle="round,pad=0.012,rounding_size=0.018",
                             facecolor='#f1f5f9', edgecolor=SLATE_BORDER, linewidth=2, zorder=1)
    ax.add_patch(map_box)

    # Simulated Map Grid & Cadastral Polygons
    ax.text(0.345, 0.825, "LEAFLET WEBGIS MAP CANVAS • AZARA & RANI BLOCK, KAMRUP", ha='center', va='center',
            fontsize=9.5, fontweight='bold', color=NAVY_TITLE, zorder=3)

    # Draw stylized cadastral parcels
    dags = [
        ([(0.06, 0.45), (0.22, 0.48), (0.20, 0.72), (0.05, 0.68)], "DAG 142/58 (Outbreak)", ROSE_PRIMARY, '#ffe4e6'),
        ([(0.23, 0.47), (0.42, 0.49), (0.40, 0.73), (0.21, 0.71)], "DAG 142/59 (Healthy)", EMERALD_PRIMARY, '#dcfce7'),
        ([(0.43, 0.48), (0.60, 0.50), (0.58, 0.74), (0.41, 0.72)], "DAG 143/01 (Warning)", AMBER_PRIMARY, '#fef3c7'),
        ([(0.08, 0.16), (0.25, 0.18), (0.23, 0.43), (0.07, 0.40)], "DAG 141/02 (Healthy)", EMERALD_PRIMARY, '#dcfce7'),
        ([(0.26, 0.18), (0.45, 0.20), (0.43, 0.45), (0.24, 0.43)], "DAG 141/03 (Monitoring)", CYAN_PRIMARY, '#cffafe'),
        ([(0.46, 0.19), (0.62, 0.21), (0.60, 0.46), (0.44, 0.44)], "DAG 141/04 (Healthy)", EMERALD_PRIMARY, '#dcfce7')
    ]

    for poly_pts, label, border_clr, fill_clr in dags:
        poly = Polygon(poly_pts, closed=True, facecolor=fill_clr, edgecolor=border_clr, linewidth=1.5, zorder=2)
        ax.add_patch(poly)
        # Compute centroid
        cx = sum(p[0] for p in poly_pts) / 4
        cy = sum(p[1] for p in poly_pts) / 4
        ax.text(cx, cy, label, ha='center', va='center', fontsize=7, fontweight='bold', color=border_clr, zorder=3)

    # Map Layer Toolbar
    layer_bar = FancyBboxPatch((0.045, 0.095), 0.60, 0.055, boxstyle="round,pad=0.004,rounding_size=0.008",
                               facecolor='#ffffff', edgecolor=SLATE_BORDER, linewidth=1, zorder=3)
    ax.add_patch(layer_bar)
    layers = ["• Base: OpenStreetMap", "• Sentinel-2 NDVI (10m)", "• Sentinel-1 SAR Radar", "• Cadastral Dag Boundaries", "• IMD AWS Stations"]
    for l_idx, lyr in enumerate(layers):
        ax.text(0.06 + l_idx * 0.12, 0.122, lyr, fontsize=6.8, fontweight='semibold', color=BLUE_PRIMARY, zorder=4)

    # Right: Selected Parcel Telemetry Inspector (0.29 width)
    insp_box = FancyBboxPatch((0.685, 0.07), 0.29, 0.80, boxstyle="round,pad=0.012,rounding_size=0.018",
                              facecolor='#ffffff', edgecolor=SLATE_BORDER, linewidth=2, zorder=1)
    ax.add_patch(insp_box)

    ax.text(0.83, 0.825, "PARCEL TELEMETRY INSPECTOR", ha='center', va='center', fontsize=9.5, fontweight='bold', color=NAVY_TITLE, zorder=3)
    ax.text(0.83, 0.80, "Real-Time Spatial Diagnostics • Dag 142/58", ha='center', va='center', fontsize=7, color=SLATE_MUTED, zorder=3)

    inspect_data = [
        ("FARMER & LANDHOLDING", "Farmer: Bhaben Kalita\nPatta No: KP-492 • Dag No: 142/58\nArea: 4 Bigha 2 Katha (0.61 Ha)", NAVY_TITLE),
        ("SATELLITE MULTI-SPECTRAL", "NDVI Vigor: 0.42 (Stress Deviation: -24%)\nNDWI Moisture: 0.38 • SAVI: 0.35\nLast Pass: Sentinel-2B (Cloud: 4.2%)", BLUE_PRIMARY),
        ("IMD METEOROLOGICAL TELEMETRY", "AWS Station: Guwahati Airport (5.2 km)\n24h Rain: 48.2 mm • Morning RH: 92%\nTemp: 24.2°C • Leaf Wetness: 16 hrs", CYAN_PRIMARY),
        ("EPIDEMIOLOGICAL AI INFERENCE", "Pathogen: Rice Blast (M. oryzae)\nRisk Trajectory: OUTBREAK DETECTED\nCrop Health Grade: GRADE D (CHI: 42)", ROSE_PRIMARY),
        ("ACTION REQUIRED", "Dispatch ADO for Ground Truth Validation\nTrigger Vernacular SMS Agro-Advisory", EMERALD_PRIMARY)
    ]

    for i_idx, (ititle, idesc, iclr) in enumerate(inspect_data):
        iy = 0.69 - i_idx * 0.145
        icard = FancyBboxPatch((0.70, iy - 0.04), 0.26, 0.125, boxstyle="round,pad=0.005,rounding_size=0.008",
                               facecolor=BG_LIGHT, edgecolor=iclr, linewidth=1, zorder=2)
        ax.add_patch(icard)
        ax.text(0.712, iy + 0.062, ititle, fontsize=7.2, fontweight='bold', color=iclr, zorder=3)
        ax.text(0.712, iy + 0.005, idesc, fontsize=6.8, color=NAVY_BODY, linespacing=1.2, zorder=3)

    save_dual(fig, "wireframe_2_cadastral_webgis")

# =============================================================================
# WIREFRAME 3: Mobile Ground-Truthing & Extension PWA Interface
# =============================================================================
def make_wireframe_3():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=180)
    ax.set_facecolor(BG_WHITE)
    fig.patch.set_facecolor(BG_WHITE)
    ax.axis('off')
    draw_blueprint_grid(ax)

    add_header(ax, "OFFLINE FIELD GROUND-TRUTHING & EXTENSION PWA INTERFACE (#field-scouting)",
               "Progressive Web App Architecture for Agricultural Extension Officers (ADO) & Krishi Sakhis",
               "EXTENSION PWA WIREFRAME")

    # 3 Mobile Screen Mockups Side-by-Side
    screens = [
        ("SCREEN 1 • TASK ROSTER", "Prioritized Inspection Queue", 
         [("TASK-2026-081 • Bhaben Kalita", "Kamrup Rural • Azara • Dag 142/58", "PRIORITY: CRITICAL", ROSE_PRIMARY, ROSE_LIGHT),
          ("TASK-2026-044 • Dipen Hazarika", "Nagaon • Raha • Dag 89/12", "PRIORITY: HIGH", AMBER_PRIMARY, AMBER_LIGHT),
          ("TASK-2026-112 • Maniram Saikia", "Jorhat • Titabor • Dag 312/04", "PRIORITY: ROUTINE", EMERALD_PRIMARY, EMERALD_LIGHT)],
         BLUE_PRIMARY, 0.06),
        ("SCREEN 2 • GPS & TRAP VERIFICATION", "Sub-Meter Geofenced Plot Lock",
         [("GPS RTK Plot Lock: ±0.8m", "Lat: 26.1152°N, Lng: 91.6028°E\nIn-Situ Boundary Verified", "STATUS: LOCKED", EMERALD_PRIMARY, EMERALD_LIGHT),
          ("Pheromone Trap Counter", "Scirpophaga Incertulas Trap Count:\n18 Moths (Breaches ETL of 8)", "ALERT: BREACHED", ROSE_PRIMARY, ROSE_LIGHT),
          ("Canopy Defoliation Slider", "Visual Leaf Damage Area: 22%\nWater Stagnation: Moderate", "ACTION REQUIRED", AMBER_PRIMARY, AMBER_LIGHT)],
         CYAN_PRIMARY, 0.38),
        ("SCREEN 3 • EDGE AI LEAF DIAGNOSIS", "On-Device MobileNetV3 Camera",
         [("AI Diagnostic Inference", "Rice Blast (M. oryzae)\nSpindle Lesion Confirmed", "CONFIDENCE: 95.8%", EMERALD_PRIMARY, EMERALD_LIGHT),
          ("Offline SQLite Sync Queue", "Record cached locally in browser.\nWill auto-sync to ASSAC upon 4G.", "OFFLINE CACHED", BLUE_PRIMARY, BLUE_LIGHT),
          ("Extension Officer Sign-Off", "Pranab Jyoti Sarma (ADO)\nDigital Timestamp Signature", "VERIFIED & SIGNED", PURPLE_PRIMARY, PURPLE_LIGHT)],
         PURPLE_PRIMARY, 0.70)
    ]

    for stitle, ssub, cards, sclr, sx in screens:
        # Phone chassis
        phone = FancyBboxPatch((sx, 0.08), 0.24, 0.79, boxstyle="round,pad=0.012,rounding_size=0.025",
                               facecolor='#ffffff', edgecolor=NAVY_BODY, linewidth=2.5, zorder=2)
        ax.add_patch(phone)

        # Phone Header Bar
        ph = FancyBboxPatch((sx + 0.015, 0.77), 0.21, 0.075, boxstyle="round,pad=0.005,rounding_size=0.01",
                            facecolor=BG_LIGHT, edgecolor=sclr, linewidth=1.2, zorder=3)
        ax.add_patch(ph)
        ax.text(sx + 0.12, 0.82, stitle, ha='center', va='center', fontsize=7.2, fontweight='bold', color=sclr, zorder=4)
        ax.text(sx + 0.12, 0.792, ssub, ha='center', va='center', fontsize=6.8, color=SLATE_MUTED, zorder=4)

        for c_idx, (chead, cdesc, ctag, cclr, cbg) in enumerate(cards):
            cy = 0.65 - c_idx * 0.21
            ccard = FancyBboxPatch((sx + 0.015, cy - 0.06), 0.21, 0.18, boxstyle="round,pad=0.006,rounding_size=0.01",
                                   facecolor=cbg, edgecolor=cclr, linewidth=1, zorder=3)
            ax.add_patch(ccard)
            ax.text(sx + 0.025, cy + 0.09, chead, fontsize=7.5, fontweight='bold', color=NAVY_TITLE, zorder=4)
            ax.text(sx + 0.025, cy + 0.03, cdesc, fontsize=6.8, color=NAVY_BODY, linespacing=1.2, zorder=4)
            
            # Status Tag
            tbadge = FancyBboxPatch((sx + 0.025, cy - 0.045), 0.19, 0.032, boxstyle="round,pad=0.002,rounding_size=0.006",
                                    facecolor='#ffffff', edgecolor=cclr, linewidth=0.8, zorder=4)
            ax.add_patch(tbadge)
            ax.text(sx + 0.12, cy - 0.03, ctag, ha='center', va='center', fontsize=6.8, fontweight='bold', color=cclr, zorder=5)

    save_dual(fig, "wireframe_3_lat_mandal_mobile")

# =============================================================================
# WIREFRAME 4: Sasya Seva Multilingual Citizen Portal Interface
# =============================================================================
def make_wireframe_4():
    fig, ax = plt.subplots(figsize=(16, 9), dpi=180)
    ax.set_facecolor(BG_WHITE)
    fig.patch.set_facecolor(BG_WHITE)
    ax.axis('off')
    draw_blueprint_grid(ax)

    add_header(ax, "SASYA SEVA (শস্য সেৱা) CITIZEN ADVISORY PORTAL INTERFACE (#farmer-advisory)",
               "Public Farmer Access Interface: Dag Search, Weather Telemetry, Bilingual Recommendations & SMS Subscription",
               "FARMER PORTAL WIREFRAME")

    # Top Search & Filter Bar
    search_bar = FancyBboxPatch((0.025, 0.77), 0.95, 0.10, boxstyle="round,pad=0.008,rounding_size=0.012",
                                facecolor=EMERALD_LIGHT, edgecolor=EMERALD_BORDER, linewidth=1.5, zorder=2)
    ax.add_patch(search_bar)

    ax.text(0.05, 0.835, "SASYA SEVA (শস্য সেৱা) • ASSAM FARMER AGRO-ADVISORY PORTAL", fontsize=10.5, fontweight='bold', color=EMERALD_PRIMARY, zorder=3)
    ax.text(0.05, 0.80, "Instant Search by Farmer Name, Dag Number, Village, or Revenue Circle • Assamese / English Toggle", fontsize=7.5, color=SLATE_MUTED, zorder=3)

    # Search Inputs Simulation
    ax.add_patch(FancyBboxPatch((0.60, 0.795), 0.24, 0.05, boxstyle="round,pad=0.004,rounding_size=0.008",
                                facecolor='#ffffff', edgecolor=SLATE_BORDER, linewidth=1, zorder=3))
    ax.text(0.62, 0.82, "Search: Bhaben Kalita / Dag 142...", fontsize=7.2, color=SLATE_MUTED, zorder=4)

    # Language Toggle
    ax.add_patch(FancyBboxPatch((0.855, 0.795), 0.10, 0.05, boxstyle="round,pad=0.004,rounding_size=0.008",
                                facecolor=EMERALD_PRIMARY, edgecolor=EMERALD_BORDER, linewidth=1, zorder=3))
    ax.text(0.905, 0.82, "অসমীয়া / EN", ha='center', va='center', fontsize=7.5, fontweight='bold', color='#ffffff', zorder=4)

    # Left: Monitored Farms Roster (0.35 width)
    left_farms = FancyBboxPatch((0.025, 0.07), 0.35, 0.67, boxstyle="round,pad=0.012,rounding_size=0.018",
                                facecolor='#ffffff', edgecolor=SLATE_BORDER, linewidth=1.5, zorder=2)
    ax.add_patch(left_farms)

    ax.text(0.045, 0.705, "MONITORED FARM PARCELS (KAMRUP)", fontsize=9, fontweight='bold', color=NAVY_TITLE, zorder=3)

    farm_items = [
        ("Bhaben Kalita • Dag 142/58", "Azara • Sali Paddy (Ranjit)", "GRADE D", "Pest Risk: 84%", ROSE_PRIMARY, ROSE_LIGHT),
        ("Tarun Deka • Dag 142/59", "Azara • Sali Paddy (Bahadur)", "GRADE A", "Pest Risk: 12%", EMERALD_PRIMARY, EMERALD_LIGHT),
        ("Pradip Barman • Dag 89/12", "Rani • Boro Paddy Nursery", "GRADE C", "Pest Risk: 58%", AMBER_PRIMARY, AMBER_LIGHT),
        ("Mukesh Das • Dag 56/71", "Chaygaon • Mustard Crop", "GRADE B", "Pest Risk: 28%", CYAN_PRIMARY, CYAN_LIGHT)
    ]

    for f_idx, (fname, fcrop, fgrade, frisk, fclr, fbg) in enumerate(farm_items):
        fy = 0.58 - f_idx * 0.14
        fcard = FancyBboxPatch((0.045, fy - 0.035), 0.31, 0.12, boxstyle="round,pad=0.006,rounding_size=0.01",
                               facecolor=fbg, edgecolor=fclr, linewidth=1, zorder=3)
        ax.add_patch(fcard)
        ax.text(0.06, fy + 0.052, fname, fontsize=7.8, fontweight='bold', color=NAVY_TITLE, zorder=4)
        ax.text(0.06, fy + 0.022, fcrop, fontsize=7, color=SLATE_MUTED, zorder=4)
        ax.text(0.06, fy - 0.015, frisk, fontsize=7, fontweight='semibold', color=fclr, zorder=4)
        ax.text(0.33, fy + 0.052, fgrade, fontsize=7.5, fontweight='bold', color=fclr, ha='right', zorder=4)

    # Right: Full Official Agro-Advisory Bulletin (0.58 width)
    right_bull = FancyBboxPatch((0.395, 0.07), 0.58, 0.67, boxstyle="round,pad=0.012,rounding_size=0.018",
                                facecolor='#ffffff', edgecolor=EMERALD_PRIMARY, linewidth=2, zorder=2)
    ax.add_patch(right_bull)

    ax.text(0.42, 0.705, "OFFICIAL AGRO-ADVISORY BULLETIN (ADV-2026-KAM-081)", fontsize=9.5, fontweight='bold', color=EMERALD_PRIMARY, zorder=3)
    ax.text(0.42, 0.68, "Bhaben Kalita • Azara Village, Kamrup Rural • Issued: 22 Nov 2026", fontsize=7.2, color=SLATE_MUTED, zorder=3)

    # Telemetry Grid (4 Badges)
    t_badges = [
        ("CROP TYPE", "Sali Paddy (Ranjit)", NAVY_BODY),
        ("24H RAINFALL", "48.2 mm (High)", BLUE_PRIMARY),
        ("MORNING RH", "92% (Blast Trigger)", AMBER_PRIMARY),
        ("SATELLITE NDVI", "0.42 (Stress Deviation)", ROSE_PRIMARY)
    ]

    for tb_idx, (tbtitle, tbval, tbclr) in enumerate(t_badges):
        tbx = 0.42 + tb_idx * 0.132
        tbcard = FancyBboxPatch((tbx, 0.59), 0.125, 0.065, boxstyle="round,pad=0.003,rounding_size=0.006",
                                facecolor=BG_LIGHT, edgecolor=SLATE_BORDER, linewidth=0.8, zorder=3)
        ax.add_patch(tbcard)
        ax.text(tbx + 0.01, 0.635, tbtitle, fontsize=6.2, fontweight='bold', color=SLATE_MUTED, zorder=4)
        ax.text(tbx + 0.01, 0.608, tbval, fontsize=6.8, fontweight='bold', color=tbclr, zorder=4)

    # 3 Directives
    dirs = [
        ("1. পথাৰ ব্যৱস্থাপনা (CULTURAL & WATER ACTION)", 
         "Drain stagnant water from plot for 48 hours to expose soil and aerate plant root zone.\nClear weeds from field bunds to eliminate alternative fungal host reservoirs.", BLUE_PRIMARY),
        ("2. জৈৱিক নিবাৰণ (BIO-PESTICIDE & IPM PRIORITY)", 
         "Apply foliar spray of Trichoderma harzianum @ 5g/L or Pseudomonas fluorescens @ 5g/L.\nPrioritize biological control during early morning calm hours; zero chemical toxicity.", EMERALD_PRIMARY),
        ("3. ৰাসায়নিক কীটনাশক (CALIBRATED CHEMICAL DOSAGE PER ASSAM BIGHA)", 
         "ONLY if blast lesions cover >10% leaf canopy: Spray Tricyclazole 75% WP @ 0.6g/L.\nStrict calibrated dosage: 120 grams per Assam Bigha (1,337.8 m²). Comply with 14-day safety.", ROSE_PRIMARY)
    ]

    for d_idx, (dhead, ddesc, dclr) in enumerate(dirs):
        dy = 0.46 - d_idx * 0.12
        dcard = FancyBboxPatch((0.42, dy - 0.035), 0.53, 0.105, boxstyle="round,pad=0.005,rounding_size=0.008",
                               facecolor='#ffffff', edgecolor=dclr, linewidth=1.2, zorder=3)
        ax.add_patch(dcard)
        ax.text(0.435, dy + 0.048, dhead, fontsize=7.5, fontweight='bold', color=dclr, zorder=4)
        ax.text(0.435, dy + 0.005, ddesc, fontsize=6.8, color=NAVY_BODY, linespacing=1.2, zorder=4)

    # Free SMS Subscription Box at Bottom
    sub_box = FancyBboxPatch((0.42, 0.09), 0.53, 0.065, boxstyle="round,pad=0.004,rounding_size=0.008",
                             facecolor=EMERALD_LIGHT, edgecolor=EMERALD_BORDER, linewidth=1, zorder=3)
    ax.add_patch(sub_box)
    ax.text(0.435, 0.135, "FREE MOBILE SMS & WHATSAPP ADVISORY SUBSCRIPTION (বিনামূলীয়া সেৱা)", fontsize=7.5, fontweight='bold', color=EMERALD_PRIMARY, zorder=4)
    ax.text(0.435, 0.108, "Registered Mobile: +91 98540 XXXXX • Instant Weather & Outbreak Warnings • Subscribed Successfully", fontsize=6.8, color=NAVY_BODY, zorder=4)

    save_dual(fig, "wireframe_4_citizen_certificate")

# =============================================================================
# MAIN EXECUTION
# =============================================================================
def main():
    print("==================================================================")
    print("🎨 GENERATING 16:9 WIDESCREEN TECHNOLOGICAL FRAMEWORK INFOGRAPHICS")
    print("   Problem: NESFIC-D-11 (Crop Health & Agro-Advisory Platform)")
    print("   Output:  assets/proposal_images/ (.png & .jpg)")
    print("==================================================================")
    
    make_diagram_1()
    make_diagram_2()
    make_diagram_3()
    make_diagram_4()
    make_diagram_5()
    make_diagram_6()
    make_diagram_7()
    
    make_wireframe_1()
    make_wireframe_2()
    make_wireframe_3()
    make_wireframe_4()
    
    print("\n✨ ALL 11 WIDESCREEN 16:9 INFOGRAPHIC DIAGRAMS GENERATED SUCCESSFULLY!")

if __name__ == '__main__':
    main()
