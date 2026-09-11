# AgriSense AI 🌾
> **Region-aware intelligence for smarter farming.**  
> *A Region-Aware Precision Agricultural Intelligence and Data Aggregation Platform built for Agritech Hackathon Evaluation.*

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS%20%7C%20FastAPI-10b981.svg)]()
[![Zero Paid APIs](https://img.shields.io/badge/Zero%20Paid%20APIs-100%25%20Offline%20Ready-blue.svg)]()
[![Bilingual](https://img.shields.io/badge/Language-English%20%7C%20%E0%AE%A4%E0%AE%AE%E0%AE%BF%E0%AE%B4%E0%AF%8D-purple.svg)]()

---

## 📌 Executive Summary

Modern AI applications in agriculture frequently fail Indian farmers by providing **generic, country-wide or state-wide recommendations**.

Agriculture cannot be treated as a generic text-completion problem. Agricultural realities differ fundamentally across agroclimatic zones:
* **In Thanjavur (Cauvery Delta Zone)**, heavy alluvial clay retains high water tables, and high atmospheric humidity (>85%) makes a generic 35 kg/acre urea dose trigger fungal Sheath Blight (*Rhizoctonia solani*) and crop lodging.
* **In Coimbatore (Western Agroclimatic Zone)**, calcareous soils with a high pH (8.1) precipitate zinc into insoluble forms and leach nitrates rapidly through porous red loam, necessitating micro-split applications and zinc foliar sprays.
* **In Madurai (Southern Semi-Arid Zone)**, high ambient daytime temperatures cause broadcast surface urea to sublimate into ammonia gas at rates over 50% within 48 hours, requiring deep urea briquette placement.

**AgriSense AI** proves that:
$$\text{SAME QUESTION} + \text{DIFFERENT REGION} \implies \text{DIFFERENT GROUNDED ANSWER}$$

---

## 🚨 Demonstration MVP Notice

> **IMPORTANT NOTICE:**  
> This application is a **functional demonstration MVP prototype** developed for hackathon presentation and architectural validation. It is **not** a live commercial agricultural advisory service.
> 
> * **Demo Data:** All recommendations, weather windows, and soil readings in this frontend MVP are derived from a structured local dataset modeled on official institutional agronomic guidelines (**Tamil Nadu Agricultural University — TNAU Package of Practices 2024** and **IMD Agromet** guidelines).
> * **Production Roadmap:** Direct real-time REST/OGD API integration with government portals (IMD Agromet, Agmarknet OGD, Soil Health Card API) is scheduled for the production deployment phase.
> * **No Paid External APIs:** All computations, disease scan simulations, charts, and reasoning chains run 100% client-side with an optional local Python FastAPI backend.

---

## 🧭 The Core Problem

1. **Agronomic Hallucinations:** Generic LLMs hallucinate chemical dosages and pesticide timings without knowing localized soil chemistry or rain windows.
2. **Context Blindness:** A recommendation that succeeds in Punjab or Haryana will fail catastrophically in the Cauvery Delta.
3. **Absence of Hard Boundary Constraints:** Generic models lack a deterministically verified "Rules Layer" to enforce maximum safe dosages, banned pesticide filters, and phenological stage constraints.
4. **Data Fragmentation:** Farmers struggle to aggregate fragmented information across weather reports (IMD), mandi prices (Agmarknet), soil health cards, and extension advisories (TNAU/ICAR).
5. **Bandwidth Inequality in Rural India:** Rural farmers operate on intermittent 2G/3G networks where heavy JavaScript bundles and image-heavy web pages fail to load.

---

## 💡 The AgriSense AI Solution: 5-Layer Region-Aware Grounding Architecture

```
+-------------------------------------------------------------------------------+
|                       User Query / Sensor Ingestion                           |
+-------------------------------------------------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
| Layer 1: Spatial & Phenological Resolver (District, Season, Phenological Stage)|
+-------------------------------------------------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
| Layer 2: Soil & Hydrology Context Aggregator (Soil Card NPK, Canal Discharge) |
+-------------------------------------------------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
| Layer 3: Authoritative Knowledge Base Index (TNAU PoP & ICAR Regional Rules)  |
+-------------------------------------------------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
| Layer 4: Hard Agronomic Rules Layer (Dosage Bounds, Rain Spray Locks, Bans)   |
+-------------------------------------------------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
| Layer 5: Bilingual 4-Pillar Field Action Advisory (What / When / How / Why)   |
+-------------------------------------------------------------------------------+
```

1. **Spatial & Phenological Resolver:** Dissects queries into district-level agroclimatic zones, crop phenological growth stages (Basal, Tillering, Panicle Initiation, Flowering, Grain Filling, Harvest), and active seasonal windows (Kuruvai, Samba, Navarai).
2. **Soil & Hydrology Context Aggregator:** Intersects the farm's location with baseline soil chemistry (Soil Health Card portal baselines) and reservoir canal release turns (Mettur, Bhavanisagar, Vaigai).
3. **Authoritative Knowledge Base Index:** Restricts retrieval strictly to institutional packages of practices (TNAU / ICAR) mapped specifically to that agroclimatic zone.
4. **Hard Agronomic Rules Layer:** Deterministically validates all proposed chemicals, dosages per acre, and weather restrictions before output generation.
5. **Bilingual 4-Pillar Output Generation:** Returns field-actionable cards structured into:
   - **01. WHAT TO DO:** Prescribed agronomic action.
   - **02. WHEN:** Phenological stage and IMD weather window check.
   - **03. HOW MUCH:** Calibrated dosage per acre based on soil testing.
   - **04. WHY:** Scientific rationale explaining why this recommendation is region-specific and why generic advice causes crop failure.

---

## 🔬 10 Comprehensive Views & Modules

| View ID | Name | Core Features |
|---|---|---|
| `#view-landing` | **Landing Page** | Value proposition hero, animated canvas particles, quick-launch CTA buttons, problem metrics strip. |
| `#view-dashboard` | **Farm Dashboard** | **Animated Circular SVG Farm Intelligence Score Gauge (87/100)**, 4 live telemetry cards (Weather, Soil, Market, Alerts), Farmer Quick-Question Engine (8 preset query cards). |
| `#view-ai-assistant` | **Conversational Assistant** | AI chat window with realistic response streaming, source citations, quick prompt chips, Web Speech mic input, and query history. |
| `#view-crops` | **Crop Catalog** | Filterable catalog (All, Cereals, Commercial, Pulses) with suitability badges and deep-dive detail modals (TNAU varieties, water requirements, duration). |
| `#view-weather` | **Micro-Weather Studio** | **High-DPI Canvas 24-Hour Hourly Chart** (temp curve + rain probability bars), 7-day forecast cards, and field operational impact indicators (spraying, harvest, irrigation). |
| `#view-soil` | **Soil Health Studio** | **Animated SVG pH Needle Gauge**, nutrient deficiency progress bars (N, P, K, Zn, OC), and localized chemical management advice. |
| `#view-disease` | **Leaf Disease Studio** | Image upload dropzone with **animated laser sweep beam**, built-in SVG sample switcher (*Blast*, *Brown Spot*, *Healthy*), and detailed treatment protocols. |
| `#view-market` | **Mandi Market Trends** | Live modal price hero, **Interactive Canvas Price Chart** with 7d/30d timeline toggles, MSP benchmark reference lines, and AI buy/hold/sell rationale. |
| `#view-recommendations` | **4-Pillared Advisory** | Complete 4-selector matrix (District, Crop, Season, Stage), free-text query input, 4-pillar cards, regional warnings, citation badges, and text-to-speech audio. |
| `#view-comparison` | **Tri-District Divergence** | Side-by-side comparative engine comparing **Thanjavur**, **Coimbatore**, and **Madurai** under identical questions, demonstrating the mathematical divergence of localized agriculture. |
| `#view-sources` | **Data Registry** | Multi-source normalization registry tracking 5 public datasets with refresh cadences, mock stream status, pings, and open licenses. |

---

## ⚡ Interactive Modals & Power Tools

* **Command Palette (`Ctrl+K`):** Instant keyboard search and navigation across all views, district presets, and quick actions. Press `Ctrl+K` anywhere or click the Search bar.
* **AI Reasoning Trace Modal:** Click *"How was this calculated?"* on any advisory to inspect the 5-step deterministic reasoning trace chain from geo-spatial ingestion to rule match.
* **Notifications Drawer:** Real-time agroclimatic alerts and critical threshold warnings with notification badge counter.
* **Crop Detail Modal:** Comprehensive agronomic profile for selected crops including TNAU varieties, water requirements, and management guidelines.
* **Text-to-Speech (TTS) Advisory:** Click the 🔊 button on any advisory to hear it spoken aloud via Web Speech API in English or Tamil.
* **1-Click Hackathon Demo Tour ("⚡ Demo"):** Automated 5-step guided tour designed specifically for hackathon judges to experience the platform's core highlights in 18 seconds.

---

## 🌐 Public Data Source Registry

AgriSense AI aggregates and normalizes multi-source public agritech datasets:

```
+-------------------------------------------------------------------------------+
|                             AgriSense AI Engine                               |
+-------------------------------------------------------------------------------+
       ^                    ^                   ^                  ^
       |                    |                   |                  |
+--------------+   +------------------+   +-----------+   +------------------+
|  IMD Agromet |   |    Agmarknet     |   | Soil Card |   |   ICAR / TNAU    |
| (Rain, Temp, |   | (Mandi Arrivals, |   |  (N-P-K,  |   |  (PoP Rules &    |
|  RH Windows) |   |  Modal Prices)   |   |  pH, Zn)  |   |  Safety Limits)  |
+--------------+   +------------------+   +-----------+   +------------------+
```

| Source Feed | Responsible Entity | Target Agronomic Layer | Refresh Cadence | MVP Status | Open License |
|---|---|---|---|---|---|
| **IMD** | India Meteorological Department | Rain probability, temperature, RH, wind speed | Every 3 Hours | Simulated Stream | Open Government Data (OGD) |
| **Agmarknet** | Directorate of Marketing & Inspection (DMI) | Regulated mandi arrivals, price trends | Daily at 18:00 IST | Simulated Stream | Public Agricultural Domain |
| **Soil Health Card** | Ministry of Agriculture & Farmers Welfare | N-P-K baselines, organic carbon %, pH, EC, Zn | Seasonal (Bi-Annual) | Cached Seed Matrix | Ministry of Agriculture OGD |
| **data.gov.in** | National Informatics Centre (NIC) | Mettur / Vaigai canal discharge, reservoir storage | Weekly / Flow-Triggered | Simulated Stream | NDSAP Open Access |
| **ICAR / SAU (TNAU)** | Tamil Nadu Agricultural University | Package of Practices (PoP), dosage safety limits | Seasonal Revision | Grounded Rules Engine | Public Academic Extension |

---

## ⚙️ Technical Architecture & Tech Stack

AgriSense AI utilizes a **Dual-Execution Architecture**:

1. **Frontend (Primary / Standalone):** Runs 100% in any modern browser using **HTML5, CSS3, and Vanilla JavaScript (ES6+)**. Zero build step, zero Node.js runtime required, zero paid APIs.
2. **Backend (Optional Microservice):** High-performance Python **FastAPI** REST backend in `backend/` providing data contracts, telemetry endpoints, and deterministic fallback rules. The frontend automatically probes the backend at startup (`http://127.0.0.1:8000/api/v1/health`) and seamlessly integrates when online, while falling back gracefully to the client-side rule engine when offline.

### File Tree

```
HACKATHON/
├── index.html              # Main Single-Page Application (10 views, all modals)
├── style.css               # Complete styling, CSS variables, Dark/Light mode, Low-BW mode
├── script.js               # Core modular JavaScript engine (all 19 subsystems)
├── README.md               # Technical documentation & hackathon guide
├── .env                    # Environment variables (template)
├── .env.example            # Environment template
└── backend/
    ├── main.py             # FastAPI entrypoint with CORS & API routing
    ├── requirements.txt    # fastapi, uvicorn, pydantic, httpx2, python-dotenv
    └── app/
        ├── api/
        │   └── endpoints.py # 7 REST routes (health, farm-score, weather, soil, market, ai)
        ├── models/
        │   └── schemas.py   # Pydantic data schemas & response models
        └── services/
            └── ai_service.py # AIService with TNAU PoP deterministic agronomic rules
```

---

## 🚀 How to Run Locally

### Method 1: Frontend Only (VS Code Live Server — Recommended)

This project requires **no Node.js, no `npm install`, and no API keys**.

1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension (`ritwickdey.LiveServer`) if not already installed.
3. Right-click on `index.html` and select **"Open with Live Server"**.
4. The platform will immediately launch at `http://127.0.0.1:5500`.

### Method 2: Full-Stack Mode (Frontend + FastAPI Backend)

To run the optional Python FastAPI backend alongside the frontend:

1. Open a terminal in the project root:
   ```bash
   # Install dependencies
   py -m pip install -r backend/requirements.txt
   
   # Launch FastAPI server
   py -m uvicorn backend.main:app --reload --port 8000
   ```
2. Check API docs at `http://127.0.0.1:8000/docs`.
3. Open `index.html` via VS Code Live Server. The topbar status indicator will automatically show **"● Live Backend Active"**.

---

## 📈 Evaluation & Demonstration Checklist for Judges

1. **Test the 1-Click Guided Demo:**
   - Click the **"⚡ Demo"** button in the topbar.
   - Watch the automated 5-step tour seamlessly transition through the Farm Intelligence Gauge, Advisory Matrix, Tri-District Divergence, and Leaf Disease Scanner.
2. **Verify Region Awareness (The Core Proof):**
   - Navigate to **Advisories**.
   - Select **District = Thanjavur** and **Crop = Paddy**. Observe the recommendation highlighting *Cauvery Delta alluvial clay*, *Mettur canal release*, and *Sheath Blight risks*.
   - Change **District = Coimbatore**. Observe how the recommendation dynamically switches to *calcareous soil (pH 8.1)*, *split applications*, and *Zinc Sulphate foliar spray*.
   - Change **District = Madurai**. Observe the recommendation switch to *semi-arid drought*, *high temperature*, and *deep urea briquette placement*.
3. **Inspect the Tri-District Divergence Engine:**
   - Navigate to **District Divergence**.
   - Switch between **Nitrogen Management**, **Blast Disease**, and **Irrigation Scheduling** scenarios to inspect the side-by-side divergence across all 3 districts under the identical question.
4. **Test the AI Leaf Disease Scanner:**
   - Navigate to **Disease Studio**.
   - Click on the sample switcher pills (*Blast*, *Brown Spot*, *Healthy Leaf*).
   - Click **"Analyze Leaf Sample"** and observe the animated laser beam sweep across the leaf and produce calibrated diagnosis, confidence scores, and TNAU management protocols.
5. **Test Language Localization (English $\leftrightarrow$ தமிழ்):**
   - Click the **தமிழ்** button in the topbar. Notice the entire interface, selector labels, 4-pillar cards, comparison text, and alerts switch instantly to Tamil.
6. **Test Rural Low-Bandwidth Mode:**
   - Click **"Low-Bandwidth"** in the topbar. Notice that all shadows, gradients, and heavy visuals are immediately stripped into a high-contrast text-first mode optimized for rural 2G/3G networks.
7. **Test the Command Palette:**
   - Press **`Ctrl+K`** to open the Command Palette. Type a district name or navigation command to jump instantly across the platform.

---

## 🔮 Future Scope & Production Roadmap

* **Live Open Government Data Pipeline:** Connect backend worker microservices to data.gov.in and IMD RSS/GeoJSON endpoints using automated cron syncs.
* **On-Device Computer Vision:** Embed lightweight quantized TensorFlow.js / ONNX models for real-time offline leaf disease detection directly from smartphone camera feeds.
* **Progressive Web App (PWA):** Enable Service Worker caching for 100% offline advisory availability in remote fields without cellular reception.
* **IVR & Regional Voice Gateway:** Integrate open-source speech-to-text models (Bhashini / Whisper) to allow non-literate farmers to query advisories via phone calls in regional Tamil dialects.

---

## 📄 License & Attribution

* Built for academic and hackathon demonstration purposes.
* Agronomic principles sourced from official public domain materials published by the **Tamil Nadu Agricultural University (TNAU)** and **India Meteorological Department (IMD)**.
* Released under the [MIT License](LICENSE).
