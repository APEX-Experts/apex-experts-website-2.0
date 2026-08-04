# Subservice Pages Authoring & Schema Guide

This document serves as the authoritative technical and copywriting guide for creating, updating, and seeding subservice landing pages in `backup/pages.json` and Payload CMS.

---

## 1. General Rules & Copywriting Standards

### Copywriting Constraints
- **Forbidden Phrasing (STRICTLY PROHIBITED)**:
  - ❌ NEVER use `"From ... to ..."` anywhere in the content.
  - ❌ NEVER use `"Not just ... but ..."` anywhere in the content.
- **Tone & Style**: High-converting, professional, technical, and marketing-driven copy designed for enterprise decision-makers and optimized for AI agent scraping (RAG/SEO).

### Seeding Command
To seed a specific page into the Payload database, use:
```bash
pnpm seed pages --force --slug "<slug>"
```
*(Do not run any other Payload or seeding commands).*

---

## 2. 9-Block Layout Structure & Specific Schema Rules

Each subservice page consists of 9 specific Payload CMS layout blocks in exact sequence:

```
1. about-hero
2. subservice-pipeline
3. subservice-features-steps (1st Instance - Features & Steps)
4. subservice-use-cases (Capabilities & Use Cases)
5. subservice-text-and-tags (Outcomes & Tags)
6. subservice-features-steps (2nd Instance - Process & Operations)
7. readiness-check
8. subservice-deliverables
9. common-cta
```

---

### Block 0: `about-hero`
- **Title**: High-impact headline.
- **Subtitle**: Summary of service scope and enterprise value.
- **Tags**: `tags: []` *(Empty array - do not add tags in hero for subservice pages)*.
- **CTA Group**: 
  - Primary CTA: `text: "Explore the Service"`, `href: "#slug-fit"` (or `/contact-us`).
  - Secondary CTA: `text: "Discuss Your Project"`, `href: "/contact-us"`.

---

### Block 1: `subservice-pipeline`
- **Eyebrow**: Must use slashes format: `"/ Eyebrow Text /"`.
- **Title**: `titleBeforeHighlight` (and optional `highlightedTitle`).
- **Pipeline Steps**: Array of 4 steps (`id`, `title`, `description`, `images`).

---

### Block 2: `subservice-features-steps` (1st Instance - Features & Steps)
- **Eyebrow**: `"/ Eyebrow Text /"`.
- **Items Array Rules**: MUST contain **EXACTLY 2 items** in the `items` array!
  - `items[0]`: `eyebrow: "/ Solution Focus /"`, `titleBeforeHighlight`, `subitems: [...]` (**MUST have an ODD number of subitems: 3 or 5!**).
  - `items[1]`: `eyebrow: "/ Solution Scope /"`, `titleBeforeHighlight`, `subitems: [...]` (**MUST have an ODD number of subitems: 3 or 5!**).
- **Steps Array Rules**: MUST contain **EXACTLY 3 steps** in the `steps` array! (`iconSvg`, `eyebrow`, `title`, `description`).
  - **`eyebrow` in steps**: MUST be formatted strictly as `"01 / EYEBROW_NAME"`, `"02 / EYEBROW_NAME"`, `"03 / EYEBROW_NAME"` *(Space before and after slash! Number + space + slash + space + text)*.

---

### Block 3: `subservice-use-cases` (Capabilities)
- **Root Eyebrow**: `"/ Capabilities & Enterprise Use Cases /"`.
- **Capabilities Array Rules**: Each capability item MUST contain all of the following fields:
  - **`eyebrow`**: MUST be formatted strictly as `"01 / EYEBROW_NAME"`, `"02 / EYEBROW_NAME"`, `"03 / EYEBROW_NAME"` *(Space before and after slash! Number + space + slash + space + name)*.
  - **`supertitle`**: Category title (e.g., `"Enterprise Architecture"`).
  - **`title`**: Capability headline.
  - **`description`**: Detailed capability breakdown.
  - **`useCasesLabel`**: `"Common Use Cases"`.
  - **`useCases`**: Array of `{ id, useCase }`.
  - **`sideNoteIconSvg`**: Hexagon SVG string.
  - **`sideNoteTitle`**: `"Typical delivery:"`.
  - **`sideNoteDescription`**: Summary of delivered components.

---

### Block 4: `subservice-text-and-tags`
- **Eyebrow**: `None` / `null` *(DO NOT add an eyebrow)*.
- **Subtitle**: `None` / `null` *(DO NOT add a subtitle)*.
- **Title**: `titleBeforeHighlight` headline.
- **Tags Array Rules**: MUST contain **EXACTLY 8 tags** (`[ { id, tag }, ... ]`).

---

### Block 5: `subservice-features-steps` (2nd Instance - Process)
- **Eyebrow**: `"/ Delivery & Process /"`.
- **Items Array Rules**: MUST contain **EXACTLY 2 items** in the `items` array!
  - `items[0]`: `eyebrow: "/ Delivery Lifecycle /"`, `titleBeforeHighlight`, `subitems: [...]` (**MUST have an ODD number of subitems: 3 or 5!**).
  - `items[1]`: `eyebrow: "/ Production Operations /"`, `titleBeforeHighlight`, `subitems: [...]` (**MUST have an ODD number of subitems: 3 or 5!**).
- **Steps Array Rules**: MUST contain **NO steps** (`steps: []`).

---

### Block 6: `readiness-check`
- **Eyebrow**: `"/ Readiness Assessment /"`.
- **Title**: `titleBeforeHighlight` & `highlightedTitle`.
- **Checklist Items**: Array of 3 items (`id`, `title`, `description`).

---

### Block 7: `subservice-deliverables`
- **Eyebrow**: `"/ Core Deliverables /"`.
- **Title**: `titleBeforeHighlight` & `highlightedTitle`.
- **Deliverables Array Rules**: MUST contain **EXACTLY 8 deliverables** (`[ { id, deliverable }, ... ]`).
- **Formatting Constraint**: Deliverables MUST be **concise titles ONLY** (e.g., `"Production Source Code Repository"`).
  - ❌ NEVER use `Title: Description` colon format!

---

### Block 8: `common-cta`
- **Title**: Closing call-to-action headline.
- **Description**: Supporting invitation text.
- **Primary CTA**: `text: "Book Consultation"`, `href: "/contact-us"`.
- **Secondary CTA**: `text: "Contact Us"`, `href: "/contact-us"`.

---

## 3. Eyebrow Format Quick Reference Matrix

| Block / Location | Eyebrow Format Example | Notes |
|---|---|---|
| Pipeline (`subservice-pipeline`) | `"/ Enterprise System Connectivity /"` | Surrounding slashes |
| Features Steps (Block 1 & 2 Root) | `"/ Solution Scope /"`, `"/ Delivery & Process /"` | Surrounding slashes |
| Features Steps Item Eyebrow | `"/ Solution Focus /"`, `"/ Delivery Lifecycle /"` | Surrounding slashes |
| **Features Steps Step Eyebrow** | `"01 / BLUEPRINT"`, `"02 / SPRINT"` | **Space before & after slash! Number + space + slash + space + text** |
| Use Cases Root | `"/ Capabilities & Enterprise Use Cases /"` | Surrounding slashes |
| **Capability Item Eyebrow** | `"01 / APPLICATIONS"`, `"02 / LOB APPS"` | **Space before & after slash! Number + space + slash + space + text** |
| Text and Tags Block | `null` | **No eyebrow field** |
| Readiness Check | `"/ Readiness Assessment /"` | Surrounding slashes |
| Deliverables Block | `"/ Core Deliverables /"` | Surrounding slashes |

---

## 4. Verification & Audit Script Checklist

Before seeding any newly authored subservice page, run a Python verification check matching the following logic:

```python
import json, re

def verify_page(page_obj):
    dump = json.dumps(page_obj).lower()
    
    # 1. Check forbidden phrases
    assert not re.search(r'from [^\"]+ to [^\"]+', dump), "Forbidden phrase 'from ... to ...' found!"
    assert not re.search(r'not just [^\"]+ but [^\"]+', dump), "Forbidden phrase 'not just ... but ...' found!"
    
    layout = page_obj['layout']
    
    # 2. Check about-hero tags
    hero = layout[0]
    assert hero.get('tags') == [], "AboutHero tags must be empty []!"
    
    # 3. Check features-steps blocks
    fs_blocks = [b for b in layout if b['blockType'] == 'subservice-features-steps']
    assert len(fs_blocks[0]['items']) == 2, "FS Block 1 items count must be 2!"
    assert len(fs_blocks[0]['steps']) == 3, "FS Block 1 steps count must be 3!"
    for it in fs_blocks[0]['items']:
        assert len(it.get('subitems', [])) in (3, 5), "Subitems count per item in FS Block 1 must be 3 or 5!"
    for step in fs_blocks[0]['steps']:
        eb = step.get('eyebrow', '')
        assert re.match(r'^\d{2}\s\/\s+.*$', eb), f"Step eyebrow '{eb}' must match '01 / TITLE' format!"
        
    assert len(fs_blocks[1]['items']) == 2, "FS Block 2 items count must be 2!"
    assert len(fs_blocks[1]['steps']) == 0, "FS Block 2 steps count must be 0!"
    for it in fs_blocks[1]['items']:
        assert len(it.get('subitems', [])) in (3, 5), "Subitems count per item in FS Block 2 must be 3 or 5!"
    
    # 4. Check capabilities eyebrows format
    uc_block = [b for b in layout if b['blockType'] == 'subservice-use-cases'][0]
    for cap in uc_block.get('capabilities', []):
        eb = cap.get('eyebrow', '')
        assert re.match(r'^\d{2}\s\/\s+.*$', eb), f"Capability eyebrow '{eb}' must match '01 / TITLE' format!"
        
    # 5. Check text-and-tags
    tt_block = [b for b in layout if b['blockType'] == 'subservice-text-and-tags'][0]
    assert tt_block.get('eyebrow') is None, "Text & Tags eyebrow must be None!"
    assert tt_block.get('subtitle') is None, "Text & Tags subtitle must be None!"
    assert len(tt_block.get('tags', [])) == 8, "Text & Tags must have exactly 8 tags!"
    
    # 6. Check deliverables (exactly 8, no colons)
    deliv_block = [b for b in layout if b['blockType'] == 'subservice-deliverables'][0]
    assert len(deliv_block.get('deliverables', [])) == 8, "Deliverables count must be exactly 8!"
    for d in deliv_block.get('deliverables', []):
        assert ':' not in d['deliverable'], f"Deliverable '{d['deliverable']}' must not contain colons!"
        
    print("Page verification PASSED 100%!")
```
