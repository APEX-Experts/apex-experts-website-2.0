# Arabic Translation & Localization Guide

This document serves as the authoritative technical, copywriting, and schema guide for translating website pages in `backup/pages.json` and seeding bilingual content (`en` / `ar`) into Payload CMS.

---

## 1. Core Principles & Copywriting Rules

### Brand Name Standard (CRITICAL)
- **Company Brand Name**: Always translate **"APEX Experts"** into Arabic as **"أبيكس إكسبرتس"** (never leave as "APEX Experts" in Arabic text or translate literally as "خبراء APEX").
  - *Example*: `"/ About APEX Experts /"` -> `"/ عن أبيكس إكسبرتس /"`

### Eyebrows Localization (CRITICAL)
- **Always Translate Eyebrows**: Translate all section eyebrows into authentic Arabic while preserving slash wrapping or numbered prefixes.
  - *Standard Eyebrow Example*: `{ "en": "/ Our Capabilities /", "ar": "/ قدراتنا الهندسية /" }`
  - *Numbered Eyebrow Example*: `{ "en": "01 / ARCHITECTURE", "ar": "01 / المعمارية البرمجية" }`
  - *Industry Eyebrow Example*: `{ "en": "01 / INDUSTRY", "ar": "01 / القطاع" }`

### Source Integrity (CRITICAL)
- **Preserve English Copy Exactly**: Never alter, summarize, or modify the original English source copy from `pages copy.json`. The `"en"` key of every localized field MUST retain the exact original English string.
- **Authentic Arabic Translation**: Write the `"ar"` key to convey the exact same meaning in natural, enterprise-grade Arabic without word-for-word literal phrasing.

### Tone & Style
- **Target Audience**: Enterprise decision-makers, CTOs, technical architects, and business leaders across the Middle East.
- **Tone**: High-converting, authoritative, professional, and authentic Arabic.
- **Prohibited Phrasing (STRICT)**:
  - ❌ **NEVER** use `"من ... إلى ..."` ("From ... to ...").
  - ❌ **NEVER** use `"ليس فقط ... بل ..."` ("Not just ... but ...").

### Technical Terms Handling
Keep technical industry terms in English (or paired naturally with Arabic context) where standard in Arabic tech literature:
- **Preserved Terms**: *Oracle APEX*, *AI*, *LLM*, *RAG*, *DevOps*, *Docker*, *Swift*, *Flutter*, *MVP*, *PoC*, *APIs*, *CI/CD*, *Cloud*, *Multi-Tenant*, *REST APIs*, *PostgreSQL*, *AWS*, *GCP*, *Azure*.
- **Arabic Context Pairings**:
  - *"منصات Oracle APEX"* instead of plain APEX.
  - *"حلول الذكاء الاصطناعي"* for AI Solutions.
  - *"وكلاء الذكاء الاصطناعي (AI Agents)"* for AI Agents.
  - *"أنظمة الاسترجاع المعزز (RAG)"* for RAG Platforms.

---

## 2. JSON Data Structure Standard (`backup/pages.json`)

In `backup/pages.json`, all localized fields (`localized: true` in Payload schema) are updated from plain strings to bilingual objects:

```json
{
  "title": {
    "en": "About Us",
    "ar": "عن أبيكس إكسبرتس"
  },
  "slug": "about-us",
  "layout": [ ... ]
}
```

> [!CAUTION]
> **Non-localized & Structural Fields (CRITICAL)**:
> Do **NOT** turn non-localized fields into `{ en, ar }` objects. The following structural keys MUST remain plain primitives or objects:
> - `slug` (MUST be a plain string like `"about-us"`, `"contact-us"` — turning slug into an object breaks seed matching and Next.js routing!)
> - `id`, `blockType`, `blockName`
> - `url`, `filename`, `mimeType`, `filesize`, `width`, `height`, `focalX`, `focalY`, `sizes`
> - `href`, `ctaPrimaryHref`, `ctaSecondaryHref`, `viewAllHref`
> - `name`, `icon`, `type`, `updatedAt`, `createdAt`

---

## 3. Localized Block Schema Reference

When translating any page, refer to this reference of localized text fields across layout blocks:

| Block Type | Localized Text Fields |
| :--- | :--- |
| **`hero`** | `imageAlt`, `titleBeforeHighlight`, `highlightedTitle`, `titleAfterHighlight`, `subtitle`, `ctaPrimaryText`, `ctaSecondaryText`, `stats[].number`, `stats[].title`, `gallery[].alt` |
| **`about-hero`** | `title`, `subtitle`, `ctaGroup[].text` |
| **`clip-text-marquee`** | `textBeforeHighlight`, `highlightedText`, `textAfterHighlight`, `marqueeIcons[].alt` |
| **`home-about`** | `eyebrow`, `titleBeforeHighlight`, `highlightedTitle`, `titleAfterHighlight`, `subtitle`, `list[].title`, `list[].description` |
| **`capabilities`** | `eyebrow`, `titleBeforeHighlight`, `highlightedTitle`, `subtitle`, `viewAllText`, `capabilities[].title`, `capabilities[].description`, `capabilities[].countTitle`, `capabilities[].countDescription` |
| **`projects`** | `eyebrow`, `titleBeforeHighlight`, `highlightedTitle`, `subtitle`, `projects[].eyebrow`, `projects[].title`, `projects[].description`, `projects[].ctaText` |
| **`technologies`** | `eyebrow`, `titleBeforeHighlight`, `highlightedTitle`, `subtitle`, `services[].eyebrow`, `services[].title`, `services[].subtitle` |
| **`faq`** | `eyebrow`, `titleBeforeHighlight`, `highlightedTitle`, `subtitle`, `questions[].question`, `questions[].answer`, `ctaEyebrow`, `ctaTitle`, `ctaSubtitle`, `ctaButtonText` |
| **`home-blogs`** | `eyebrow`, `titleBeforeHighlight`, `highlightedTitle`, `subtitle`, `viewAllText`, `viewArticleText` |
| **`contact-form`** | `eyebrow`, `titleBeforeHighlight`, `highlightedTitle`, `subtitle`, `formFields[].label`, `formSubmitButtonText` |
| **`subscribe-to-newsletter`** | `title`, `description`, `emailInputPlaceholder`, `submitButtonText` |

---

## 4. Seeding & Database Workflow

To seed any single translated page into Payload CMS, run:

```bash
pnpm seed pages --force --slug "<slug>"
```

*Examples:*
```bash
pnpm seed pages --force --slug "home"
```
```bash
pnpm seed pages --force --slug "about-us"
```
```bash
pnpm seed pages --force --slug "contact-us"
```

---

## 5. Verification & Anti-Regression Protocols (CRITICAL)

To prevent missed translations, partial block coverage, or whitespace mismatch incidents:

### 1. Mandatory Pre-Seed Automated Verification
- **NEVER** claim a page is translated or run the seed command without running an automated scanner script to check `backup/pages.json`.
- The scanner MUST recursively traverse all layout blocks and flag any user-facing field that remains a plain string instead of a bilingual `{ "en": ..., "ar": ... }` object.
- **Verification Criterion**: The scanner script MUST return **ZERO plain text strings** before proceeding to database seeding.

### 2. Handling Whitespace and Linebreak Variations
- English strings in `pages copy.json` and `backup/pages.json` frequently contain leading/trailing whitespace, double spaces, or linebreaks (e.g., `"Private data &  Enterprise knowledge"`, `"Security, validation, monitoring,\ncost..."`).
- **Translation Matching Rules**:
  - Always normalize strings using `.strip()` during dictionary lookup.
  - Handle newline characters (`\n`) gracefully in both English and Arabic translations.

### 3. Deep Nested Array Auditing
Complex block schemas contain nested arrays (e.g., `items[].subitems[]`, `steps[]`, `capabilities[].useCases[]`, `pipeline[]`, `ctaGroup[]`).
- Always recursively inspect all child objects and array elements down to leaf fields (`title`, `description`, `eyebrow`, `subtitle`, `useCase`, `sideNoteTitle`, `sideNoteDescription`, `useCasesLabel`).

### 4. Database Seeding Log Audit
- After executing `pnpm seed pages --force --slug "<slug>"`, inspect the command output.
- Confirm that Payload CMS logs confirm updating both locales:
  `✔ Page: "<Page Title>" [<slug>] (updated existing EN & AR)`
