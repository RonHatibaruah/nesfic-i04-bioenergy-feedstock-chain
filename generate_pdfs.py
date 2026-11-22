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
            self.drawString(54, letter[1] - 36, "Government of Assam • Dept. of Agriculture & ASSAC (Science & Tech) • NESFIC-D-11")
            self.drawRightString(letter[0] - 54, letter[1] - 36, "SasyaSwasthya — Ron Hatibaruah")
            self.setStrokeColor(colors.HexColor("#cbd5e1"))
            self.setLineWidth(0.5)
            self.line(54, letter[1] - 42, letter[0] - 54, letter[1] - 42)

        # Footer (all pages)
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.5)
        self.line(54, 45, letter[0] - 54, 45)
        self.drawString(54, 32, "NESFIC 2026 Proposal • Problem NESFIC-D-11 • Applicant: Ron Hatibaruah")
        self.drawRightString(letter[0] - 54, 32, f"Page {self._pageNumber} of {page_count}")
        self.restoreState()

def clean_inline_markdown(text):
    if not text:
        return ""
    t = text.strip()
    
    # Clean Unicode characters not supported by standard PDF Helvetica
    t = t.replace('₹', 'Rs. ')
    t = t.replace('শস্য স্বাস্থ্য', 'SasyaSwasthya')
    t = t.replace('–', '-').replace('—', ' - ')
    t = t.replace('’', "'").replace('‘', "'").replace('“', '"').replace('”', '"')
    
    # LaTeX Math Cleanup
    t = re.sub(r'\\left\s*\(', '(', t)
    t = re.sub(r'\\right\s*\)', ')', t)
    t = re.sub(r'\\left\s*\[', '[', t)
    t = re.sub(r'\\right\s*\]', ']', t)
    t = t.replace(r'\left', '').replace(r'\right', '')
    t = t.replace(r'\%', '%').replace(r'\_', '_').replace(r'\&', '&')
    
    t = re.sub(r'\\text\{([^}]+)\}', r'\1', t)
    t = re.sub(r'\\sum_\{i=1\}\^\{?7\}?', '&Sigma;<sub>i=1</sub><sup>7</sup>', t)
    t = re.sub(r'\\sum_\{[^}]+\}', '&Sigma;', t)
    t = re.sub(r'\\sum', '&Sigma;', t)
    t = re.sub(r'\\times', '&times;', t)
    t = re.sub(r'\\cdot', '&middot;', t)
    t = re.sub(r'\\approx', '&asymp;', t)
    t = re.sub(r'\\le', '&le;', t)
    t = re.sub(r'\\ge', '&ge;', t)
    t = re.sub(r'\\in', '&isin;', t)
    t = re.sub(r'\\rho_\{([^}]+)\}', r'&rho;<sub>\1</sub>', t)
    t = re.sub(r'\\rho', '&rho;', t)
    t = re.sub(r'\\frac\{([^}]+)\}\{([^}]+)\}', r'(\1 / \2)', t)
    t = re.sub(r'\\sqrt\{([^}]+)\}', r'&radic;(\1)', t)
    t = re.sub(r'\^\{([^}]+)\}', r'<sup>\1</sup>', t)
    t = re.sub(r'_\{([^}]+)\}', r'<sub>\1</sub>', t)
    t = t.replace('^2', '<sup>2</sup>').replace('^3', '<sup>3</sup>')
    t = t.replace(r'^\circ\text{C}', ' &deg;C').replace(r'^\circ', '&deg;')
    t = t.replace('$', '')
    
    # Format inline markdown
    parts = re.split(r'(\*\*[^*]+\*\*|`[^`]+`)', t)
    cleaned = []
    for p in parts:
        if p.startswith('**') and p.endswith('**'):
            cleaned.append(f"<b>{escape(p[2:-2])}</b>")
        elif p.startswith('`') and p.endswith('`'):
            cleaned.append(f"<font fontName='Courier' color='#0f766e'>{escape(p[1:-1])}</font>")
        else:
            p_sub = re.sub(r'\*([^*]+)\*', r'<i>\1</i>', p)
            cleaned.append(p_sub)
    return ''.join(cleaned)

def safe_paragraph(text, style):
    return Paragraph(clean_inline_markdown(text), style)

def create_styled_table(data, col_widths=None, available_width=490):
    styles = getSampleStyleSheet()
    header_style = ParagraphStyle(
        'TH',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor('#ffffff'),
        alignment=0
    )
    cell_style = ParagraphStyle(
        'TD',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor('#1e293b'),
        alignment=0
    )
    cell_bold_style = ParagraphStyle(
        'TDBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor('#064e3b'),
        alignment=0
    )

    num_cols = len(data[0]) if data else 1
    if not col_widths:
        w = available_width / num_cols
        col_widths = [w] * num_cols

    flowable_data = []
    for r_idx, row in enumerate(data):
        flowable_row = []
        for c_idx, cell in enumerate(row):
            cell_str = str(cell).strip()
            if r_idx == 0:
                p = Paragraph(clean_inline_markdown(cell_str), header_style)
            elif c_idx == 0:
                p = Paragraph(clean_inline_markdown(cell_str), cell_bold_style)
            else:
                p = Paragraph(clean_inline_markdown(cell_str), cell_style)
            flowable_row.append(p)
        flowable_data.append(flowable_row)

    t = Table(flowable_data, colWidths=col_widths)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#064e3b')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#f8fafc')]),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
    ]))
    return t

def parse_markdown_content(raw_lines, available_width=490):
    styles = getSampleStyleSheet()
    
    h3_style = ParagraphStyle('H3', parent=styles['Heading3'], fontName='Helvetica-Bold', fontSize=9.5, leading=13, textColor=colors.HexColor('#0f766e'), spaceBefore=6, spaceAfter=2, keepWithNext=True)
    body_style = ParagraphStyle('Body', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11, textColor=colors.HexColor('#334155'), spaceAfter=4)
    bullet_style = ParagraphStyle('Bullet', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11, textColor=colors.HexColor('#334155'), leftIndent=12, spaceAfter=2)
    
    flowables = []
    i = 0
    while i < len(raw_lines):
        line = raw_lines[i].strip()
        if not line or line.startswith('*(Word Count') or line.startswith('---'):
            i += 1
            continue
            
        if line.startswith('### '):
            flowables.append(safe_paragraph(line[4:].strip(), h3_style))
            i += 1
            continue

        if line.startswith('|') and '|' in line[1:]:
            table_lines = []
            while i < len(raw_lines) and raw_lines[i].strip().startswith('|'):
                table_lines.append(raw_lines[i].strip())
                i += 1
            
            t_data = []
            for t_idx, tl in enumerate(table_lines):
                if t_idx == 1 and re.match(r'^\|?[\s\-:|]+\|?$', tl):
                    continue
                cells = [c.strip() for c in tl.split('|')[1:-1]]
                if cells:
                    t_data.append(cells)
            
            if t_data:
                flowables.append(Spacer(1, 4))
                flowables.append(create_styled_table(t_data, available_width=available_width))
                flowables.append(Spacer(1, 6))
            continue

        if line.startswith('- ') or line.startswith('* '):
            flowables.append(Paragraph(f"• {clean_inline_markdown(line[2:].strip())}", bullet_style))
            i += 1
            continue

        if line[0].isdigit() and len(line) > 2 and line[1:3] in ['. ', ') ']:
            flowables.append(Paragraph(clean_inline_markdown(line), bullet_style))
            i += 1
            continue

        flowables.append(Paragraph(clean_inline_markdown(line), body_style))
        i += 1

    return flowables

def build_proposal_pdf(output_path, workspace_dir):
    doc = SimpleDocTemplate(output_path, pagesize=letter, leftMargin=54, rightMargin=54, topMargin=54, bottomMargin=54)
    styles = getSampleStyleSheet()

    title_style = ParagraphStyle('DocTitle', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=18, leading=22, textColor=colors.HexColor('#064e3b'), spaceAfter=4)
    subtitle_style = ParagraphStyle('DocSubTitle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=10.5, leading=14, textColor=colors.HexColor('#0f766e'), spaceAfter=10)
    meta_style = ParagraphStyle('MetaStyle', parent=styles['Normal'], fontName='Helvetica', fontSize=8.5, leading=12, textColor=colors.HexColor('#334155'))
    field_title_style = ParagraphStyle('FieldTitle', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=11, leading=15, textColor=colors.HexColor('#064e3b'), spaceBefore=10, spaceAfter=4, keepWithNext=True)

    story = []
    story.append(safe_paragraph("SASYASWASTHYA (Crop Health Assurance)", title_style))
    story.append(safe_paragraph("Space-to-Ground Agro-Climatic Intelligence & Hyper-Local Advisory System", subtitle_style))
    story.append(safe_paragraph("<b>NESFIC 2026 Official Government Track Proposal Submission</b>", subtitle_style))
    
    meta_data = [
        [safe_paragraph("<b>Problem Statement ID:</b> NESFIC-D-11 (Govt Track)", meta_style), safe_paragraph("<b>Challenge Owner:</b> Dept of Agriculture & ASSAC", meta_style)],
        [safe_paragraph("<b>Lead Applicant:</b> Ron Hatibaruah", meta_style), safe_paragraph("<b>Knowledge Partner:</b> AAU Jorhat", meta_style)],
        [safe_paragraph("<b>Live Demo:</b> https://sasya-swasthya.pages.dev/", meta_style), safe_paragraph("<b>Status:</b> Working Prototype Verified", meta_style)]
    ]
    t_meta = Table(meta_data, colWidths=[240, 264])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f0fdf4')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#86efac')),
        ('PADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 10))

    img_dir = os.path.join(workspace_dir, 'assets', 'proposal_images')
    proposal_path = os.path.join(workspace_dir, 'proposal_contents.md')
    with open(proposal_path, 'r', encoding='utf-8') as f:
        content = f.read()

    sections = content.split('## Field ')
    for sec in sections[1:]:
        lines = sec.strip().split('\n')
        sec_header = lines[0].strip()
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#059669'), spaceBefore=8, spaceAfter=6))
        story.append(safe_paragraph(f"Field {sec_header}", field_title_style))

        if '1: Problem understanding' in sec_header:
            img1 = os.path.join(img_dir, 'diagram_1_before_after_workflow.jpg')
            if os.path.exists(img1):
                story.append(Spacer(1, 4))
                story.append(Image(img1, width=490, height=265))
                story.append(Spacer(1, 6))
        elif '2: Proposed solution' in sec_header:
            img2 = os.path.join(img_dir, 'diagram_2_dual_system_reconciliation.jpg')
            if os.path.exists(img2):
                story.append(Spacer(1, 4))
                story.append(Image(img2, width=490, height=265))
                story.append(Spacer(1, 6))
        elif '3: Expected impact' in sec_header:
            img4 = os.path.join(img_dir, 'diagram_4_land_health_score_hierarchy.jpg')
            if os.path.exists(img4):
                story.append(Spacer(1, 4))
                story.append(Image(img4, width=490, height=265))
                story.append(Spacer(1, 6))
        elif '4: Technical architecture' in sec_header:
            img7 = os.path.join(img_dir, 'diagram_7_enterprise_system_architecture.jpg')
            if os.path.exists(img7):
                story.append(Spacer(1, 4))
                story.append(Image(img7, width=490, height=265))
                story.append(Spacer(1, 6))

        body_flowables = parse_markdown_content(lines[1:], available_width=490)
        story.extend(body_flowables)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated Proposal PDF: {output_path}")

def build_proof_of_work_pdf(output_path, workspace_dir):
    doc = SimpleDocTemplate(output_path, pagesize=letter, leftMargin=54, rightMargin=54, topMargin=54, bottomMargin=54)
    styles = getSampleStyleSheet()

    title_style = ParagraphStyle('DocTitle', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=16, leading=20, textColor=colors.HexColor('#064e3b'), spaceAfter=4)
    subtitle_style = ParagraphStyle('DocSubTitle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=9.5, leading=13, textColor=colors.HexColor('#0284c7'), spaceAfter=8)
    meta_style = ParagraphStyle('MetaStyle', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11, textColor=colors.HexColor('#334155'))
    h2_style = ParagraphStyle('H2Style', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=11, leading=15, textColor=colors.HexColor('#064e3b'), spaceBefore=8, spaceAfter=4, keepWithNext=True)

    story = []
    story.append(safe_paragraph("PROOF OF WORK & TECHNICAL DOSSIER", title_style))
    story.append(safe_paragraph("SasyaSwasthya — Crop Health, Pest Forecasting & Advisory System", subtitle_style))
    story.append(safe_paragraph("<b>Empirical Formulations, Spectral Indices & Validation Benchmarks</b>", subtitle_style))
    
    meta_data = [
        [safe_paragraph("<b>Challenge ID:</b> NESFIC-D-11 (Govt Track)", meta_style), safe_paragraph("<b>Department:</b> Agriculture & ASSAC, Assam", meta_style)],
        [safe_paragraph("<b>Lead Applicant:</b> Ron Hatibaruah", meta_style), safe_paragraph("<b>Technology Readiness:</b> TRL 6 (Validated)", meta_style)],
        [safe_paragraph("<b>Live Prototype:</b> https://sasya-swasthya.pages.dev/", meta_style), safe_paragraph("<b>Verification Status:</b> Fully Built & Verified", meta_style)]
    ]
    t_meta = Table(meta_data, colWidths=[240, 264])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#eff6ff')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#93c5fd')),
        ('PADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 10))

    img_dir = os.path.join(workspace_dir, 'assets', 'proposal_images')
    pow_path = os.path.join(workspace_dir, 'proof_of_work_dossier.md')
    with open(pow_path, 'r', encoding='utf-8') as f:
        content = f.read()

    sections = content.split('\n## ')
    if sections[0].strip():
        story.extend(parse_markdown_content(sections[0].strip().split('\n'), available_width=490))

    for sec in sections[1:]:
        lines = sec.strip().split('\n')
        sec_title = lines[0].strip()
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#0284c7'), spaceBefore=8, spaceAfter=5))
        story.append(safe_paragraph(sec_title, h2_style))

        if 'Mathematical Formulations' in sec_title or 'Spectral Physics' in sec_title:
            img3 = os.path.join(img_dir, 'diagram_3_cadastral_anomaly_catalog.jpg')
            if os.path.exists(img3):
                story.append(Spacer(1, 4))
                story.append(Image(img3, width=490, height=265))
                story.append(Spacer(1, 6))
        elif 'System Architecture' in sec_title:
            img2 = os.path.join(img_dir, 'diagram_2_dual_system_reconciliation.jpg')
            if os.path.exists(img2):
                story.append(Spacer(1, 4))
                story.append(Image(img2, width=490, height=265))
                story.append(Spacer(1, 6))
        elif 'Field Validation' in sec_title:
            img5 = os.path.join(img_dir, 'diagram_5_lat_mandal_mobile_app.jpg')
            if os.path.exists(img5):
                story.append(Spacer(1, 4))
                story.append(Image(img5, width=490, height=265))
                story.append(Spacer(1, 6))

        body_flowables = parse_markdown_content(lines[1:], available_width=490)
        story.extend(body_flowables)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated Proof of Work PDF: {output_path}")

if __name__ == '__main__':
    workspace_dir = os.path.dirname(os.path.abspath(__file__))
    proposal_pdf = os.path.join(workspace_dir, 'NESFIC_D11_Proposal_Ron_Hatibaruah.pdf')
    pow_pdf = os.path.join(workspace_dir, 'NESFIC_D11_Proof_of_Work_Ron_Hatibaruah.pdf')
    
    build_proposal_pdf(proposal_pdf, workspace_dir)
    build_proof_of_work_pdf(pow_pdf, workspace_dir)
