# Service Pages Arabic Translation Workflow Guide

This document details every step performed to translate and seed the Service Pages into Payload CMS with dual-locale support (`en` and `ar`).

---

## 📋 Standards & Guidelines Followed (`ARABIC_TRANSLATION_GUIDE.md`)

1. **Brand Identity**:
   - **"APEX Experts"** is translated as **"أبيكس إكسبرتس"**.
2. **Eyebrows & Structure**:
   - Eyebrows retain prefix slash wrapping (`/ ... /`) and number prefixes (`01 / ...`).
3. **Field Exclusions**:
   - System/Media fields are preserved as non-localized plain values: `slug`, `id`, `blockType`, `blockName`, `url`, `filename`, `mimeType`, `filesize`, `width`, `height`, `focalX`, `focalY`, `sizes`, `href`, `ctaPrimaryHref`, `ctaSecondaryHref`, `viewAllHref`, `name`, `icon`, `type`, `updatedAt`, `createdAt`, `relationTo`, `primaryCtaHref`, `secondaryCtaHref`, `markerSvg`, `iconSvg`.
4. **Phrasing Constraints**:
   - Strictly avoid literal translations like `"من ... إلى ..."` or `"ليس فقط ... بل ..."`.
5. **Technical Terminology**:
   - Retain or pair technical terms (*Node.js*, *Python*, *React*, *Next.js*, *TypeScript*, *GraphQL*, *REST APIs*, *OAuth2*, *JWT*, *ZATCA*, *ETA*, *FTA*, *UBL 2.1 XML*, *ECDSA*, *CSID*, *Terraform*, *Kubernetes*, *Docker*, *Ansible*, *Puppet*, *DevSecOps*, *FinOps*, *Amazon Web Services*, *AWS*, *EKS*, *ECS*, *Lambda*, *EC2*, *RDS*, *Aurora*, *CloudFront*, *WAF*, *GuardDuty*, *CloudWatch*, *GCP*, *GKE*, *Cloud Run*, *BigQuery*, *Azure*, *AKS*, *Entra ID*, *Bicep*, *VMware*, *vSphere*, *ESXi*, *vCenter*, *vSAN*, *NSX*, *vMotion*, *SRM*, *Veeam*, *PostgreSQL*, *MongoDB*, *Tailwind CSS*, *CI/CD*, *OpenAPI/Swagger*, *Lighthouse*, *WCAG 2.1 AA*).

---

## 🛠️ Step-by-Step Workflow for Each Page

For every service page, the following 6-step lifecycle is strictly executed:

### Step 1: Dump Raw Page JSON
Extract the target page object from `backup/pages.json` to `scratch/<page_name>_raw.json` for precise analysis.

### Step 2: Extract & Categorize All Text Strings
Traverse all layout blocks recursively and extract every string needing translation into `scratch/<page_name>_strings.txt`.

### Step 3: Write Translation Script with Normalized Lookup
Create a dedicated Python translation script `scratch/translate_<page_name>.py`.
- **String Normalization**: Use `re.sub(r'\s+', ' ', string.strip())` for string lookup keys to account for line breaks in raw copy.
- **Dictionary Mapping**: Map every English string to its professional Arabic translation adhering strictly to `ARABIC_TRANSLATION_GUIDE.md`.

### Step 4: Run Translation Script
Execute `python3 scratch/translate_<page_name>.py` to update `backup/pages.json`.

### Step 5: Run Automated Pre-Seed Audit Scanner
Execute an automated Python scanner to recursively verify that **every** user-facing text string is converted into a dual-locale dictionary `{ "en": ..., "ar": ... }`.
- **Criteria**: `Unlocalized Plain Strings Count: 0`.

### Step 6: Seed into Payload CMS
Execute the Payload CMS seed CLI command:
```bash
pnpm seed pages --force --slug "<page-slug>"
```
Verify CLI output confirms successful update for both EN & AR:
`✔ Page: "<Page Title>" [<slug>] (updated existing EN & AR)`

---

## 📑 Completed Service Pages

| # | Page Slug | Status | Verification Audit | Seeding Status |
|---|---|---|---|---|
| 1 | `services/ai-solutions/ai-poc-services` | ✅ Complete | 0 Unlocalized Strings | Seeded (EN & AR) |
| 2 | `services/ai-solutions/custom-ai-agents` | ✅ Complete | 0 Unlocalized Strings | Seeded (EN & AR) |
| 3 | `services/ai-solutions/custom-llm-development` | ✅ Complete | 0 Unlocalized Strings | Seeded (EN & AR) |
| 4 | `services/ai-solutions/rag-as-a-service` | ✅ Complete | 0 Unlocalized Strings | Seeded (EN & AR) |
| 5 | `services/oracle-apex/apex-application-development` | ✅ Complete | 0 Unlocalized Strings | Seeded (EN & AR) |
| 6 | `services/oracle-apex/apex-ai-agents-development` | ✅ Complete | 0 Unlocalized Strings | Seeded (EN & AR) |
| 7 | `services/oracle-apex/apex-plugin-development` | ✅ Complete | 0 Unlocalized Strings | Seeded (EN & AR) |
| 8 | `services/oracle-apex/apex-integration-services` | ✅ Complete | 0 Unlocalized Strings | Seeded (EN & AR) |
| 9 | `services/oracle-apex/apex-migration-services` | ✅ Complete | 0 Unlocalized Strings | Seeded (EN & AR) |
| 10 | `services/oracle-apex/apex-theme-development` | ✅ Complete | 0 Unlocalized Strings | Seeded (EN & AR) |
| 11 | `services/oracle-apex/apex-reporting-development` | ✅ Complete | 0 Unlocalized Strings | Seeded (EN & AR) |
| 12 | `services/oracle-apex/apex-support-services` | ✅ Complete | 0 Unlocalized Strings | Seeded (EN & AR) |
| 13 | `services/software-engineering/custom-application-development` | ✅ Complete | 0 Unlocalized Strings | Seeded (EN & AR) |
| 14 | `services/software-engineering/web-application-development` | ✅ Complete | 0 Unlocalized Strings | Seeded (EN & AR) |
| 15 | `services/software-engineering/mobile-application-development` | ✅ Complete | 0 Unlocalized Strings | Seeded (EN & AR) |
| 16 | `services/software-engineering/mvp-development` | ✅ Complete | 0 Unlocalized Strings | Seeded (EN & AR) |
| 17 | `services/software-engineering/backend-frontend-development` | ✅ Complete | 0 Unlocalized Strings | Seeded (EN & AR) |
| 18 | `services/software-engineering/api-development` | ✅ Complete | 0 Unlocalized Strings | Seeded (EN & AR) |
| 19 | `services/software-engineering/third-party-integration` | ✅ Complete | 0 Unlocalized Strings | Seeded (EN & AR) |
| 20 | `services/software-engineering/e-invoice-integration` | ✅ Complete | 0 Unlocalized Strings | Seeded (EN & AR) |
| 21 | `services/cloud-devops/devops-engineering` | ✅ Complete | 0 Unlocalized Strings | Seeded (EN & AR) |
| 22 | `services/cloud-devops/devops-support-services` | ✅ Complete | 0 Unlocalized Strings | Seeded (EN & AR) |
| 23 | `services/cloud-devops/cicd-pipeline-implementation` | ✅ Complete | 0 Unlocalized Strings | Seeded (EN & AR) |
| 24 | `services/cloud-devops/aws-services` | ✅ Complete | 0 Unlocalized Strings | Seeded (EN & AR) |
| 25 | `services/cloud-devops/gcp-services` | ✅ Complete | 0 Unlocalized Strings | Seeded (EN & AR) |
| 26 | `services/cloud-devops/azure-services` | ✅ Complete | 0 Unlocalized Strings | Seeded (EN & AR) |
| 27 | `services/cloud-devops/vmware-services` | ✅ Complete | 0 Unlocalized Strings | Seeded (EN & AR) |
| 28 | `services/cloud-devops/docker-container-services` | ✅ Complete | 0 Unlocalized Strings | Seeded (EN & AR) |

---

## 🎯 Verification Summary

All 28 service pages have passed automated pre-seed string scanning (0 unlocalized plain strings) and have been successfully seeded into Payload CMS with complete English (`en`) and Arabic (`ar`) translations.
