import os
import re
from xml.sax.saxutils import escape
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable, Image
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        
        # Header (pages after page 1)
        if self._pageNumber > 1:
            self.drawString(54, letter[1] - 36, "Government of Assam • Industry Track (MC2 Foundation) • NESFIC-I-04")
            self.drawRightString(letter[0] - 54, letter[1] - 36, "JaivikSuraksha — Ron Hatibaruah")
            self.setStrokeColor(colors.HexColor("#cbd5e1"))
            self.setLineWidth(0.5)
            self.line(54, letter[1] - 42, letter[0] - 54, letter[1] - 42)

        # Footer (all pages)
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.5)
        self.line(54, 45, letter[0] - 54, 45)
        self.drawString(54, 32, "NESFIC 2026 Proposal • Problem NESFIC-I-04 • Applicant: Ron Hatibaruah")
        self.drawRightString(letter[0] - 54, 32, f"Page {self._pageNumber} of {page_count}")
        self.restoreState()

def clean_inline_markdown(text):
    if not text:
        return ""
    t = str(text).strip()
    
    # 1. Clean Unicode characters not supported by standard PDF Helvetica
    t = t.replace('₹', 'Rs. ')
    t = t.replace('জৈৱিক সুৰক্ষা', 'JaivikSuraksha')
    t = t.replace('শস্য স্বাস্থ্য', 'SasyaSwasthya')
    t = t.replace('অসমীয়া', 'Assamese')
    t = t.replace('বড়ো', 'Bodo').replace('बड़ो', 'Bodo')
    t = t.replace('বাংলা', 'Bengali')
    t = t.replace('–', '-').replace('—', ' - ')
    t = t.replace('’', "'").replace('‘', "'").replace('“', '"').replace('”', '"')
    
    # 2. LaTeX Math Cleanup to clean plain readable English
    t = re.sub(r'\\left\s*\(', '(', t)
    t = re.sub(r'\\right\s*\)', ')', t)
    t = re.sub(r'\\left\s*\[', '[', t)
    t = re.sub(r'\\right\s*\]', ']', t)
    t = t.replace('\\left', '').replace('\\right', '')
    t = t.replace('\\%', '%').replace('\\_', '_').replace('\\&', ' and ')
    t = re.sub(r'\\text\{([^}]+)\}', r'\1', t)
    t = re.sub(r'\\le', 'Smaller than or equal to ', t)
    t = re.sub(r'\\ge', 'Greater than or equal to ', t)
    t = re.sub(r'\\rightarrow', ' -> ', t)
    t = re.sub(r'\\times', ' x ', t)
    t = re.sub(r'\\cdot', ' . ', t)
    t = re.sub(r'\\approx', ' ~ ', t)
    t = t.replace('$', '')
    
    # 3. Replace comparison symbols
    t = t.replace('<=', 'Smaller than or equal to ')
    t = t.replace('>=', 'Greater than or equal to ')
    
    # 4. Convert markdown bold/italic/code to ReportLab tags
    t = re.sub(r'\*\*([^*]+)\*\*', r'<b>\1</b>', t)
    t = re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)', r'<i>\1</i>', t)
    t = re.sub(r'`([^`]+)`', r'<font face="Courier" color="#0369a1">\1</font>', t)
    
    # 5. Tokenize and protect valid ReportLab XML tags
    valid_tags = []
    def save_tag(m):
        idx = len(valid_tags)
        valid_tags.append(m.group(0))
        return f"___VALID_TAG_{idx}___"
    
    t = re.sub(r'</?(?:b|i|u|sup|sub|font(?:\s+[^>]+)?)/?>', save_tag, t, flags=re.IGNORECASE)
    
    # 6. Any remaining '<' or '>' characters
    t = t.replace('<', 'Smaller than ').replace('>', 'Greater than ')
    
    # 7. Escape standalone ampersands
    t = re.sub(r'&(?!(?:amp|lt|gt|quot|apos|deg);)', '&amp;', t)
    
    # 8. Restore valid tags
    for idx, tag in enumerate(valid_tags):
        t = t.replace(f"___VALID_TAG_{idx}___", tag)
    
    return t

def safe_paragraph(text, style):
    cleaned = clean_inline_markdown(text)
    try:
        return Paragraph(cleaned, style)
    except Exception as e:
        raw_text = re.sub(r'<[^>]+>', '', cleaned)
        return Paragraph(escape(raw_text), style)

def parse_markdown_content(lines, available_width=490):
    styles = getSampleStyleSheet()
    body_style = ParagraphStyle('CustBody', parent=styles['Normal'], fontName='Helvetica', fontSize=8.5, leading=11.5, textColor=colors.HexColor('#1e293b'), spaceAfter=4)
    h3_style = ParagraphStyle('CustH3', parent=styles['Heading3'], fontName='Helvetica-Bold', fontSize=9.5, leading=12.5, textColor=colors.HexColor('#064e3b'), spaceBefore=5, spaceAfter=2, keepWithNext=True)
    bullet_style = ParagraphStyle('CustBullet', parent=body_style, leftIndent=12, bulletIndent=4, spaceAfter=2)
    tbl_cell_style = ParagraphStyle('TblCell', parent=styles['Normal'], fontName='Helvetica', fontSize=7.5, leading=9.5, textColor=colors.HexColor('#1e293b'))
    tbl_hdr_style = ParagraphStyle('TblHdr', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=7.5, leading=9.5, textColor=colors.HexColor('#064e3b'))

    flowables = []
    in_table = False
    table_rows = []

    for line in lines:
        stripped = line.strip()

        if stripped.startswith('|') and stripped.endswith('|'):
            if '---' in stripped:
                continue
            cols = [c.strip() for c in stripped[1:-1].split('|')]
            if not in_table:
                in_table = True
                table_rows = [cols]
            else:
                table_rows.append(cols)
            continue
        else:
            if in_table:
                in_table = False
                if table_rows:
                    num_cols = len(table_rows[0])
                    col_w = available_width / float(num_cols)
                    t_data = []
                    for r_idx, r in enumerate(table_rows):
                        row_cells = []
                        for cell_text in r:
                            st = tbl_hdr_style if r_idx == 0 else tbl_cell_style
                            row_cells.append(safe_paragraph(cell_text, st))
                        t_data.append(row_cells)
                    t = Table(t_data, colWidths=[col_w] * num_cols)
                    t.setStyle(TableStyle([
                        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#f0fdf4')),
                        ('BOX', (0,0), (-1,-1), 0.75, colors.HexColor('#059669')),
                        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
                        ('PADDING', (0,0), (-1,-1), 3),
                        ('VALIGN', (0,0), (-1,-1), 'TOP'),
                    ]))
                    flowables.append(Spacer(1, 3))
                    flowables.append(t)
                    flowables.append(Spacer(1, 4))
                table_rows = []

        if not stripped:
            continue

        if stripped.startswith('### '):
            flowables.append(safe_paragraph(stripped[4:], h3_style))
        elif stripped.startswith('- ') or stripped.startswith('* '):
            flowables.append(safe_paragraph(f"&bull; {stripped[2:]}", bullet_style))
        elif re.match(r'^\d+\.\s', stripped):
            flowables.append(safe_paragraph(stripped, bullet_style))
        else:
            flowables.append(safe_paragraph(stripped, body_style))

    if in_table and table_rows:
        num_cols = len(table_rows[0])
        col_w = available_width / float(num_cols)
        t_data = []
        for r_idx, r in enumerate(table_rows):
            row_cells = []
            for cell_text in r:
                st = tbl_hdr_style if r_idx == 0 else tbl_cell_style
                row_cells.append(safe_paragraph(cell_text, st))
            t_data.append(row_cells)
        t = Table(t_data, colWidths=[col_w] * num_cols)
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#f0fdf4')),
            ('BOX', (0,0), (-1,-1), 0.75, colors.HexColor('#059669')),
            ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
            ('PADDING', (0,0), (-1,-1), 3),
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ]))
        flowables.append(Spacer(1, 3))
        flowables.append(t)
        flowables.append(Spacer(1, 4))

    return flowables

# -----------------------------------------------------------------------------
# 1. BUILD OFFICIAL PROPOSAL PDF (ALL 7 ARCHITECTURAL DIAGRAMS EMBEDDED)
# -----------------------------------------------------------------------------
def build_proposal_pdf(output_path, workspace_dir):
    doc = SimpleDocTemplate(output_path, pagesize=letter, leftMargin=54, rightMargin=54, topMargin=54, bottomMargin=54)
    styles = getSampleStyleSheet()

    title_style = ParagraphStyle('DocTitle', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=15, leading=19, textColor=colors.HexColor('#064e3b'), spaceAfter=4)
    subtitle_style = ParagraphStyle('DocSubTitle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=9, leading=12, textColor=colors.HexColor('#0284c7'), spaceAfter=6)
    meta_style = ParagraphStyle('MetaStyle', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=10.5, textColor=colors.HexColor('#334155'))
    field_title_style = ParagraphStyle('FieldTitle', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=10.5, leading=13.5, textColor=colors.HexColor('#064e3b'), spaceBefore=8, spaceAfter=4, keepWithNext=True)

    story = []
    story.append(safe_paragraph("NORTH EAST SEVA FIRST INNOVATION CHALLENGE (NESFIC) 2026", title_style))
    story.append(safe_paragraph("OFFICIAL PROPOSAL SUBMISSION DOSSIER — INDUSTRY TRACK", subtitle_style))
    
    meta_data = [
        [safe_paragraph("<b>Problem Statement ID:</b> NESFIC-I-04", meta_style), safe_paragraph("<b>Challenge Partner:</b> MC2 Foundation", meta_style)],
        [safe_paragraph("<b>Title:</b> Bioenergy Feedstock Chain & Waste Valorisation", meta_style), safe_paragraph("<b>Lead Applicant:</b> Ron Hatibaruah", meta_style)],
        [safe_paragraph("<b>Solution Name:</b> JaivikSuraksha", meta_style), safe_paragraph("<b>Technology Readiness:</b> TRL 6 (Validated)", meta_style)],
        [safe_paragraph("<b>Live Prototype:</b> https://nesfic-i04-bioenergy-feedstock-chain.pages.dev", meta_style), safe_paragraph("<b>Target Refinery:</b> ABRPL Numaligarh & SATAT CBG", meta_style)]
    ]
    t_meta = Table(meta_data, colWidths=[245, 259])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#059669')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('PADDING', (0,0), (-1,-1), 4),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 6))

    img_dir = os.path.join(workspace_dir, 'assets', 'proposal_images')
    field_to_image = {
        'Field 1': [
            ('diagram_1_before_after_workflow.jpg', "Figure 1: Paradigm Shift - Monsoon Feedstock Degradation vs. JaivikSuraksha Preservation")
        ],
        'Field 2': [
            ('diagram_2_dual_system_reconciliation.jpg', "Figure 2: Dual-Pillar Architecture - Monsoon Preservation & Biorefinery Waste Upcycling")
        ],
        'Field 3': [
            ('diagram_5_lat_mandal_mobile_app.jpg', "Figure 3: Decentralized Depot QA & LoRaWAN Smart Probe Telemetry Console"),
            ('diagram_12_user_journey_persona_progression.jpg', "Figure 4: Multi-Stakeholder Digital Platform Progression & User Journey")
        ],
        'Field 4': [
            ('diagram_9_lorawan_smart_probe_spear.jpg', "Figure 5: LoRaWAN IoT Smart Probe Spear (SS316) Hardware Blueprint & Sensor Array"),
            ('diagram_7_enterprise_system_architecture.jpg', "Figure 6: Industrial Enterprise SCADA & Cloud Telemetry Architecture")
        ],
        'Field 5': [
            ('diagram_11_biorefinery_circular_mass_balance.jpg', "Figure 7: 1,000 MT/Day Commercial Biorefinery Circular Mass Balance Flowsheet")
        ],
        'Field 6': [
            ('diagram_3_cadastral_anomaly_catalog.jpg', "Figure 8: Assam Agro-Climatic Biomass Feedstock & Waste Stream Matrix")
        ],
        'Field 7': [],
        'Field 8': [],
        'Field 9': [
            ('diagram_8_ensiling_kinetics_curves.jpg', "Figure 9: 180-Day Biochemical Ensiling & Polymer Wrap Preservation Kinetics"),
            ('diagram_10_lignin_biobitumen_pavement_engineering.jpg', "Figure 10: Hydrolytic Lignin Bio-Bitumen (VG-30) Cross-Section & Pavement Performance")
        ],
        'Field 10': [
            ('diagram_6_citizen_land_health_certificate.jpg', "Figure 11: Cryptographic Bilingual Farmer Off-Take Settlement & Quality Certificate")
        ],
        'Field 11': [
            ('diagram_4_land_health_score_hierarchy.jpg', "Figure 12: Biomass Quality & Rot Vulnerability Index (BQVI) Multi-Criteria Decision Hierarchy")
        ],
        'Field 12': []
    }

    prop_path = os.path.join(workspace_dir, 'proposal_contents.md')
    with open(prop_path, 'r', encoding='utf-8') as f:
        content = f.read()

    sections = content.split('\n## ')
    for sec in sections[1:]:
        lines = sec.strip().split('\n')
        field_header = lines[0].strip()
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#059669'), spaceBefore=8, spaceAfter=4))
        story.append(safe_paragraph(field_header, field_title_style))

        matched_field_key = None
        for k in field_to_image.keys():
            if k in field_header:
                matched_field_key = k
                break

        if matched_field_key and field_to_image[matched_field_key]:
            for img_file, caption in field_to_image[matched_field_key]:
                img_path = os.path.join(img_dir, img_file)
                if os.path.exists(img_path):
                    story.append(Spacer(1, 4))
                    story.append(Image(img_path, width=490, height=265))
                    cap_style = ParagraphStyle('CapStyle', parent=styles['Normal'], fontName='Helvetica-Oblique', fontSize=7.5, leading=9.5, textColor=colors.HexColor('#475569'), alignment=1, spaceAfter=4)
                    story.append(safe_paragraph(caption, cap_style))
                    story.append(Spacer(1, 4))

        if matched_field_key == 'Field 12':
            budget_data = [
                [safe_paragraph("<b>Project Phase / Line Item</b>", meta_style), safe_paragraph("<b>Estimated Cost</b>", meta_style), safe_paragraph("<b>Share</b>", meta_style), safe_paragraph("<b>Primary Deliverable & Milestones</b>", meta_style)],
                [safe_paragraph("Decentralized Bunker Silos & Ensiling Packs", meta_style), safe_paragraph("Rs. 14.00 Lakh", meta_style), safe_paragraph("35.00%", meta_style), safe_paragraph("500 MT pilot bunker silos in Golaghat near Numaligarh", meta_style)],
                [safe_paragraph("IoT Smart Probe Spears & LoRaWAN Nodes", meta_style), safe_paragraph("Rs. 8.50 Lakh", meta_style), safe_paragraph("21.25%", meta_style), safe_paragraph("10 multi-depth SS316 probes, CO2 & moisture telemetry", meta_style)],
                [safe_paragraph("Lignin Bio-Bitumen & Digestate Trials", meta_style), safe_paragraph("Rs. 6.50 Lakh", meta_style), safe_paragraph("16.25%", meta_style), safe_paragraph("IRC:SP:53 Marshall stability & tea garden FOM trials", meta_style)],
                [safe_paragraph("Cloud WebGIS & SCADA Platform", meta_style), safe_paragraph("Rs. 6.00 Lakh", meta_style), safe_paragraph("15.00%", meta_style), safe_paragraph("Full-stack React/FastAPI, TimescaleDB, SHA-256 audit ledger", meta_style)],
                [safe_paragraph("Farmer & Aggregator Field Onboarding", meta_style), safe_paragraph("Rs. 5.00 Lakh", meta_style), safe_paragraph("12.50%", meta_style), safe_paragraph("50+ FPOs, 5,000 farmers trained on off-take and DBT", meta_style)],
                [safe_paragraph("<b>Total Project Budget</b>", meta_style), safe_paragraph("<b>Rs. 40.00 Lakh</b>", meta_style), safe_paragraph("<b>100.0%</b>", meta_style), safe_paragraph("<b>Full 9-Month Pilot & Commercial Integration</b>", meta_style)],
            ]
            t_budget = Table(budget_data, colWidths=[140, 75, 50, 225])
            t_budget.setStyle(TableStyle([
                ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#f0fdf4')),
                ('BACKGROUND', (0,-1), (-1,-1), colors.HexColor('#e0f2fe')),
                ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#059669')),
                ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
                ('PADDING', (0,0), (-1,-1), 3.5),
                ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ]))
            story.append(Spacer(1, 4))
            story.append(t_budget)
            story.append(Spacer(1, 6))

        body_flowables = parse_markdown_content(lines[1:], available_width=490)
        story.extend(body_flowables)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated Proposal PDF: {output_path}")

# -----------------------------------------------------------------------------
# 2. BUILD PROOF OF WORK PDF (ALL ARCHITECTURAL INFOGRAPHICS EMBEDDED)
# -----------------------------------------------------------------------------
def build_proof_of_work_pdf(output_path, workspace_dir):
    doc = SimpleDocTemplate(output_path, pagesize=letter, leftMargin=54, rightMargin=54, topMargin=54, bottomMargin=54)
    styles = getSampleStyleSheet()

    title_style = ParagraphStyle('DocTitle', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=15, leading=19, textColor=colors.HexColor('#064e3b'), spaceAfter=4)
    subtitle_style = ParagraphStyle('DocSubTitle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=9, leading=12, textColor=colors.HexColor('#0284c7'), spaceAfter=6)
    meta_style = ParagraphStyle('MetaStyle', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=10.5, textColor=colors.HexColor('#334155'))
    h2_style = ParagraphStyle('H2Style', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=10.5, leading=13.5, textColor=colors.HexColor('#064e3b'), spaceBefore=8, spaceAfter=4, keepWithNext=True)

    story = []
    story.append(safe_paragraph("PROOF OF WORK & TECHNICAL DOSSIER", title_style))
    story.append(safe_paragraph("JaivikSuraksha — North-East Bioenergy Feedstock Preservation & Waste Valorisation", subtitle_style))
    story.append(safe_paragraph("<b>Empirical Ensiling Kinetics, LoRaWAN IoT Telemetry & Bio-Bitumen Assays</b>", subtitle_style))
    
    meta_data = [
        [safe_paragraph("<b>Challenge ID:</b> NESFIC-I-04 (Industry Track)", meta_style), safe_paragraph("<b>Partner:</b> MC2 Foundation", meta_style)],
        [safe_paragraph("<b>Lead Applicant:</b> Ron Hatibaruah", meta_style), safe_paragraph("<b>Technology Readiness:</b> TRL 6 (Validated)", meta_style)],
        [safe_paragraph("<b>Live Prototype:</b> https://nesfic-i04-bioenergy-feedstock-chain.pages.dev", meta_style), safe_paragraph("<b>Status:</b> Fully Built & Verified", meta_style)]
    ]
    t_meta = Table(meta_data, colWidths=[240, 264])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#eff6ff')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#93c5fd')),
        ('PADDING', (0,0), (-1,-1), 4),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 8))

    img_dir = os.path.join(workspace_dir, 'assets', 'proposal_images')
    pow_path = os.path.join(workspace_dir, 'proof_of_work_dossier.md')
    with open(pow_path, 'r', encoding='utf-8') as f:
        content = f.read()

    sections = content.split('\n## ')
    if sections[0].strip():
        story.extend(parse_markdown_content(sections[0].strip().split('\n'), available_width=490))

    cap_style = ParagraphStyle('CapStylePoW', parent=styles['Normal'], fontName='Helvetica-Oblique', fontSize=7.5, leading=9.5, textColor=colors.HexColor('#475569'), alignment=1, spaceAfter=4)

    for sec in sections[1:]:
        lines = sec.strip().split('\n')
        sec_title = lines[0].strip()
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#0284c7'), spaceBefore=8, spaceAfter=5))
        story.append(safe_paragraph(sec_title, h2_style))

        if '1. Executive Summary' in sec_title:
            imgs = [
                ('diagram_1_before_after_workflow.jpg', "Figure 1: Paradigm Shift - Monsoon Feedstock Degradation vs. JaivikSuraksha Preservation"),
                ('diagram_2_dual_system_reconciliation.jpg', "Figure 2: Dual-Pillar Architecture - Monsoon Preservation & Biorefinery Waste Upcycling"),
                ('diagram_11_biorefinery_circular_mass_balance.jpg', "Figure 5: 1,000 MT/Day Commercial Biorefinery Circular Mass Balance Flowsheet")
            ]
            for img_name, cap in imgs:
                img_path = os.path.join(img_dir, img_name)
                if os.path.exists(img_path):
                    story.append(Spacer(1, 4))
                    story.append(Image(img_path, width=490, height=265))
                    story.append(safe_paragraph(cap, cap_style))
                    story.append(Spacer(1, 4))
        elif '2. Experimental Data' in sec_title:
            imgs = [
                ('diagram_8_ensiling_kinetics_curves.jpg', "Figure 3: 180-Day Biochemical Ensiling & Polymer Wrap Preservation Kinetics"),
                ('diagram_3_cadastral_anomaly_catalog.jpg', "Figure 6: Assam Agro-Climatic Biomass Feedstock & Waste Stream Catalog"),
                ('diagram_4_land_health_score_hierarchy.jpg', "Figure 11: Multi-Criteria Biomass Quality & Rot Vulnerability Index (BQVI) Hierarchy")
            ]
            for img_name, cap in imgs:
                img_path = os.path.join(img_dir, img_name)
                if os.path.exists(img_path):
                    story.append(Spacer(1, 4))
                    story.append(Image(img_path, width=490, height=265))
                    story.append(safe_paragraph(cap, cap_style))
                    story.append(Spacer(1, 4))
        elif '3. Hardware Architecture' in sec_title:
            imgs = [
                ('diagram_9_lorawan_smart_probe_spear.jpg', "Figure 10: LoRaWAN IoT Smart Probe Spear (SS316) Hardware Blueprint & Sensor Array"),
                ('diagram_5_lat_mandal_mobile_app.jpg', "Figure 7: Decentralized Depot QA & LoRaWAN Smart Probe Telemetry Console")
            ]
            for img_name, cap in imgs:
                img_path = os.path.join(img_dir, img_name)
                if os.path.exists(img_path):
                    story.append(Spacer(1, 4))
                    story.append(Image(img_path, width=490, height=265))
                    story.append(safe_paragraph(cap, cap_style))
                    story.append(Spacer(1, 4))
        elif '4. Biorefinery Waste Stream' in sec_title:
            imgs = [
                ('diagram_10_lignin_biobitumen_pavement_engineering.jpg', "Figure 4: Hydrolytic Lignin Bio-Bitumen (VG-30) Cross-Section & Pavement Performance"),
                ('diagram_6_citizen_land_health_certificate.jpg', "Figure 8: Bilingual Farmer Off-Take Settlement & Quality Certificate (Assamese/English)")
            ]
            for img_name, cap in imgs:
                img_path = os.path.join(img_dir, img_name)
                if os.path.exists(img_path):
                    story.append(Spacer(1, 4))
                    story.append(Image(img_path, width=490, height=265))
                    story.append(safe_paragraph(cap, cap_style))
                    story.append(Spacer(1, 4))
        elif '5. Live Prototype' in sec_title:
            imgs = [
                ('diagram_12_user_journey_persona_progression.jpg', "Figure 9: Multi-Stakeholder Digital Platform Progression & User Journey"),
                ('diagram_7_enterprise_system_architecture.jpg', "Figure 12: Industrial Enterprise SCADA & Cloud Telemetry Architecture")
            ]
            for img_name, cap in imgs:
                img_path = os.path.join(img_dir, img_name)
                if os.path.exists(img_path):
                    story.append(Spacer(1, 4))
                    story.append(Image(img_path, width=490, height=265))
                    story.append(safe_paragraph(cap, cap_style))
                    story.append(Spacer(1, 4))

        body_flowables = parse_markdown_content(lines[1:], available_width=490)
        story.extend(body_flowables)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated Proof of Work PDF: {output_path}")

# -----------------------------------------------------------------------------
# 3. BUILD ADDITIONAL SUPPORTING MATERIAL PDF
# -----------------------------------------------------------------------------
def build_additional_supporting_material_pdf(output_path, workspace_dir):
    doc = SimpleDocTemplate(output_path, pagesize=letter, leftMargin=54, rightMargin=54, topMargin=54, bottomMargin=54)
    styles = getSampleStyleSheet()

    title_style = ParagraphStyle('DocTitle', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=15, leading=19, textColor=colors.HexColor('#064e3b'), spaceAfter=4)
    subtitle_style = ParagraphStyle('DocSubTitle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=9, leading=12, textColor=colors.HexColor('#0284c7'), spaceAfter=6)
    meta_style = ParagraphStyle('MetaStyle', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=10.5, textColor=colors.HexColor('#334155'))
    h2_style = ParagraphStyle('H2Style', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=10.5, leading=13.5, textColor=colors.HexColor('#064e3b'), spaceBefore=8, spaceAfter=4, keepWithNext=True)

    story = []
    story.append(safe_paragraph("ADDITIONAL SUPPORTING MATERIAL & FEASIBILITY STUDY", title_style))
    story.append(safe_paragraph("JaivikSuraksha — Securing the North-East Bioenergy Feedstock Chain", subtitle_style))
    story.append(safe_paragraph("<b>Agro-Climatic Zoning, Biomass Kinetics, Techno-Economics & Carbon Accounting</b>", subtitle_style))
    
    meta_data = [
        [safe_paragraph("<b>Problem Statement ID:</b> NESFIC-I-04", meta_style), safe_paragraph("<b>Industry Partner:</b> MC2 Foundation", meta_style)],
        [safe_paragraph("<b>Lead Applicant:</b> Ron Hatibaruah", meta_style), safe_paragraph("<b>Academic Collaborator:</b> AEDA & IIT Guwahati", meta_style)],
        [safe_paragraph("<b>Live Production Platform:</b> https://nesfic-i04-bioenergy-feedstock-chain.pages.dev", meta_style), safe_paragraph("<b>Target Refinery:</b> ABRPL Numaligarh & SATAT CBG", meta_style)]
    ]
    t_meta = Table(meta_data, colWidths=[245, 259])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f0fdf4')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#059669')),
        ('PADDING', (0,0), (-1,-1), 4),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 8))

    img_dir = os.path.join(workspace_dir, 'assets', 'proposal_images')
    asm_path = os.path.join(workspace_dir, 'additional_supporting_material.md')
    with open(asm_path, 'r', encoding='utf-8') as f:
        content = f.read()

    sections = content.split('\n## ')
    if sections[0].strip():
        story.extend(parse_markdown_content(sections[0].strip().split('\n'), available_width=490))

    cap_style = ParagraphStyle('CapStyleASM', parent=styles['Normal'], fontName='Helvetica-Oblique', fontSize=7.5, leading=9.5, textColor=colors.HexColor('#475569'), alignment=1, spaceAfter=4)

    for sec in sections[1:]:
        lines = sec.strip().split('\n')
        sec_title = lines[0].strip()
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#059669'), spaceBefore=8, spaceAfter=5))
        story.append(safe_paragraph(sec_title, h2_style))

        if '1. Agro-Climatic' in sec_title:
            for img_name, cap in [('diagram_3_cadastral_anomaly_catalog.jpg', "Figure A1: Assam Agro-Climatic Biomass Availability & Monsoonal Degradation Matrix")]:
                img_path = os.path.join(img_dir, img_name)
                if os.path.exists(img_path):
                    story.append(Spacer(1, 4))
                    story.append(Image(img_path, width=490, height=265))
                    story.append(safe_paragraph(cap, cap_style))
                    story.append(Spacer(1, 4))
        elif '2. Biochemical Kinetics' in sec_title:
            for img_name, cap in [('diagram_8_ensiling_kinetics_curves.jpg', "Figure A2: 180-Day Anaerobic Lactic Acid Ensiling Carbohydrate Retention Kinetics")]:
                img_path = os.path.join(img_dir, img_name)
                if os.path.exists(img_path):
                    story.append(Spacer(1, 4))
                    story.append(Image(img_path, width=490, height=265))
                    story.append(safe_paragraph(cap, cap_style))
                    story.append(Spacer(1, 4))
        elif '3. High-Value Secondary' in sec_title:
            for img_name, cap in [
                ('diagram_11_biorefinery_circular_mass_balance.jpg', "Figure A3: 1,000 MT/Day Commercial Biorefinery Circular Mass Balance Flowsheet"),
                ('diagram_10_lignin_biobitumen_pavement_engineering.jpg', "Figure A4: Enzymatic Hydrolysis Lignin Bio-Bitumen (VG-30) Pavement Engineering")
            ]:
                img_path = os.path.join(img_dir, img_name)
                if os.path.exists(img_path):
                    story.append(Spacer(1, 4))
                    story.append(Image(img_path, width=490, height=265))
                    story.append(safe_paragraph(cap, cap_style))
                    story.append(Spacer(1, 4))

        body_flowables = parse_markdown_content(lines[1:], available_width=490)
        story.extend(body_flowables)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated Additional Supporting Material PDF: {output_path}")

if __name__ == '__main__':
    workspace_dir = os.path.dirname(os.path.abspath(__file__))
    proposal_pdf = os.path.join(workspace_dir, 'NESFIC_I04_Proposal_Ron_Hatibaruah.pdf')
    pow_pdf = os.path.join(workspace_dir, 'NESFIC_I04_Proof_of_Work_Ron_Hatibaruah.pdf')
    asm_pdf = os.path.join(workspace_dir, 'NESFIC_I04_Additional_Supporting_Material_Ron_Hatibaruah.pdf')
    
    build_proposal_pdf(proposal_pdf, workspace_dir)
    build_proof_of_work_pdf(pow_pdf, workspace_dir)
    build_additional_supporting_material_pdf(asm_pdf, workspace_dir)
