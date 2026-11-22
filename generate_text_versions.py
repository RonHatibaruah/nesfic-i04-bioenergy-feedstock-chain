#!/usr/bin/env python3
"""
Generate clean, copy-paste-ready plain text versions of the NESFIC 2026 Submission files:
1. NESFIC_D11_Proposal_Ron_Hatibaruah.txt
2. NESFIC_D11_Proof_of_Work_Ron_Hatibaruah.txt
"""

import re
import os

def format_markdown_table_to_plain_text(table_match):
    lines = [l.strip() for l in table_match.strip().split('\n') if l.strip()]
    if len(lines) < 2:
        return table_match
    
    # Must have a genuine markdown separator in line 1: |---|---|
    if not re.match(r'^\|?[\s\-:|]+\|?$', lines[1]):
        return table_match

    rows = []
    for idx, line in enumerate(lines):
        if idx == 1:
            continue  # Separator line
        cells = [c.strip() for c in line.split('|')]
        if cells and cells[0] == '':
            cells = cells[1:]
        if cells and cells[-1] == '':
            cells = cells[:-1]
        if cells:
            rows.append(cells)
            
    if not rows:
        return table_match

    # Compute column widths
    num_cols = max(len(r) for r in rows)
    col_widths = [0] * num_cols
    for r in rows:
        for idx, cell in enumerate(r):
            clean_cell = re.sub(r'<br\s*/?>', ' ', cell, flags=re.IGNORECASE)
            clean_cell = re.sub(r'\s*\n\s*', ' ', re.sub(r'[*`_]', '', clean_cell)).strip()
            col_widths[idx] = max(col_widths[idx], len(clean_cell))

    col_widths = [max(w, 8) for w in col_widths]

    # Build ASCII formatted table
    sep_line = '+' + '+'.join('-' * (w + 2) for w in col_widths) + '+'
    output = [sep_line]
    for idx, r in enumerate(rows):
        padded_cells = []
        for c_idx in range(num_cols):
            val = r[c_idx] if c_idx < len(r) else ''
            clean_val = re.sub(r'<br\s*/?>', ' ', val, flags=re.IGNORECASE)
            clean_val = re.sub(r'\s*\n\s*', ' ', re.sub(r'[*`_]', '', clean_val)).strip()
            padded_cells.append(clean_val.ljust(col_widths[c_idx]))
        output.append('| ' + ' | '.join(padded_cells) + ' |')
        if idx == 0:
            output.append(sep_line)
    output.append(sep_line)
    return '\n' + '\n'.join(output) + '\n'

def convert_md_to_plain_text(markdown_text):
    text = markdown_text

    # Replace markdown tables with plain text ASCII tables
    table_pattern = re.compile(r'((?:^[ \t]*\|[^\n]+\|[ \t]*\n)+)', re.MULTILINE)
    text = table_pattern.sub(lambda m: format_markdown_table_to_plain_text(m.group(0)), text)

    # Convert headers
    text = re.sub(r'^# (.*)$', r'================================================================================\n\1\n================================================================================', text, flags=re.MULTILINE)
    text = re.sub(r'^## (.*)$', r'\n--------------------------------------------------------------------------------\n\1\n--------------------------------------------------------------------------------', text, flags=re.MULTILINE)
    text = re.sub(r'^### (.*)$', r'\n[ \1 ]', text, flags=re.MULTILINE)

    # Clean markdown bold, italic, code
    text = re.sub(r'\*\*\*(.*?)\*\*\*', r'\1', text)
    text = re.sub(r'\*\*(.*?)\*\*', r'\1', text)
    text = re.sub(r'\*(.*?)\*', r'\1', text)
    text = re.sub(r'`(.*?)`', r'\1', text)

    # Clean markdown links [label](url) -> label (url)
    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'\1 (\2)', text)

    # Format bullet points
    text = re.sub(r'^\s*[-*]\s+', '  • ', text, flags=re.MULTILINE)

    # Clean excessive empty lines
    text = re.sub(r'\n{3,}', '\n\n', text)

    return text.strip() + '\n'

def generate_text_files():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 1. Proposal Text Version
    proposal_md_path = os.path.join(base_dir, 'proposal_contents.md')
    proposal_txt_path = os.path.join(base_dir, 'NESFIC_D11_Proposal_Ron_Hatibaruah.txt')
    
    with open(proposal_md_path, 'r', encoding='utf-8') as f:
        proposal_md = f.read()

    proposal_txt = convert_md_to_plain_text(proposal_md)
    with open(proposal_txt_path, 'w', encoding='utf-8') as f:
        f.write(proposal_txt)
    print(f"Generated {proposal_txt_path} ({len(proposal_txt.splitlines())} lines)")

    # 2. Proof of Work Dossier Text Version
    pow_md_path = os.path.join(base_dir, 'proof_of_work_dossier.md')
    pow_txt_path = os.path.join(base_dir, 'NESFIC_D11_Proof_of_Work_Ron_Hatibaruah.txt')

    with open(pow_md_path, 'r', encoding='utf-8') as f:
        pow_md = f.read()

    pow_txt = convert_md_to_plain_text(pow_md)
    with open(pow_txt_path, 'w', encoding='utf-8') as f:
        f.write(pow_txt)
    print(f"Generated {pow_txt_path} ({len(pow_txt.splitlines())} lines)")

if __name__ == '__main__':
    generate_text_files()
