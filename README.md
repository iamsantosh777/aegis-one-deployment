# AEGIS ONE

> **Intelligent Emergency Response & Personal Safety Platform**  
> *"One Tap. One Response. One Step Toward Safety."*

---

## 🛡️ Overview

**AEGIS ONE** is an autonomous, privacy-first, offline-capable emergency response and personal safety web platform built for high-stress civil emergencies, natural disasters, medical crises, and personal distress situations.

Built to comply with strict safety engineering requirements, **AEGIS ONE operates entirely on the client device without requiring external cloud accounts, paid APIs, or AI keys**. Core safety protocols and emergency records remain 100% functional even when cellular networks fail or the device is completely disconnected from the internet.

---

## 🚨 Core Modules & Capabilities

### 1. Two-Stage Emergency SOS Command Center
- **Ethical, Non-Misleading UX**: Unlike deceptive apps that claim to silently dial emergency services from inside a web browser, AEGIS ONE provides an explicit two-stage interaction:
  - **Stage 1 (Gateway & Transparency)**: Clear operational disclosure and safety overview.
  - **Stage 2 (Active Emergency Command)**: Direct 1-tap triggers to launch the device's native phone dialer for national emergency services (`tel:112` default for India or region of choice) and primary In Case of Emergency (ICE) contacts.
- **Structured Distress Message Generator**: Generates clean, reviewed emergency text containing exact GPS coordinates, accuracy radius, live map links (Google Maps & OpenStreetMap), timestamp, and critical medical ICE data (blood type, severe allergies, medications).
- **Zero-Presumption Dispatch**: Emergency messages are never falsely claimed to be delivered; users review the text and dispatch it via native Web Share API, clipboard copy, or direct SMS (`sms:?body=...`).
- **Acoustic Rescue Beacons (Web Audio API)**: Real-time client-side audio synthesis requiring zero audio files:
  - **High-Decibel Siren**: Sweeping frequency oscillation (750 Hz – 1250 Hz) to alert bystanders.
  - **Rescue Whistle**: Resonant 2800 Hz acoustic bursts designed to penetrate rubble, smoke, and outdoor environments.
  - **International Morse SOS**: Synthesized `··· --- ···` standard distress tone.
- **Visual Screen Strobe**: Flashing high-contrast beacon for nighttime rescue or search aircraft signaling with a one-tap cancel.

### 2. Browser Geolocation & Safe Route Sharing
- **Permission-First Workflow**: Explains why location is needed before requesting the browser `navigator.geolocation` API.
- **Accurate Telemetry**: Displays latitude, longitude, precision accuracy in meters, and acquisition timestamp.
- **Resilient Fallback Handling**: Gracefully handles permission denied, location unavailable, request timeouts, and offline states without crashing.

### 3. Interactive Leaflet Map & Safe Havens
- **Interactive OpenStreetMap Integration**: Smooth pan, zoom, and location centering via Leaflet.
- **Offline Disclosure**: Transparently informs users that map tiles require network access, while saved coordinates, phone numbers, and addresses remain accessible offline.
- **Haversine Distance Engine**: Computes precise real-time distances in kilometers between the user's position and safe locations.
- **Personal Safe Spot Manager**: Add, edit, and store custom locations (home, evacuation shelter, neighborhood clinic, relative's residence) with GPS coordinates, access notes, and direct click-to-call links.

### 4. 100% Offline Medical & Safety Guides
- **Clinically Sound Protocols**:
  - **Cardiopulmonary Resuscitation (CPR)** (Adult & Pediatric)
  - **Severe Bleeding Control & Tourniquet Application**
  - **Choking Relief (Heimlich Maneuver)**
  - **Earthquake: Drop, Cover, Hold On**
  - **Flooding & Flash Flood Survival**
  - **Building Fire & Smoke Evacuation**
  - **Severe Cyclones & Extreme Windstorms**
  - **Active Threat Response (Run, Hide, Fight)**
- **Acoustic CPR Metronome**: Integrated 110 BPM synthesizer metronome providing audio and visual rhythm to pace chest compressions accurately.
- **Structured Action Rules**: Every guide includes categorized step-by-step instructions, essential **Do's**, dangerous **Don'ts**, and direct emergency service dial links.
- **Instant Search & Filter**: Real-time filtering across emergency keywords.

### 5. Trusted Contacts & Official Helplines Directory
- **ICE Manager**: Designate primary emergency contacts, secondary phone numbers, relationships, and emergency access notes.
- **Verified Civil Defense Hotlines**: Pre-configured emergency directories with direct click-to-call links:
  - **India**: 112 (National Emergency), 100 (Police), 101 (Fire), 108 (Ambulance), 1070 (Disaster Management), 1091 (Women's Safety), 1098 (Childline).
  - **International Presets**: United States (911), United Kingdom (999), European Union (112), Canada (911), Australia (000).

### 6. Readiness Simulator (Drill Mode)
- **Zero Ambiguity**: Clear, high-visibility **"SIMULATION / DRILL MODE — NOT A REAL EMERGENCY"** banner ensures users and bystanders understand no actual emergency services are being summoned.
- **Interactive Timed Exercises**:
  - 60-Second Earthquake Survival Drill
  - 2-Minute Rapid Evacuation Go-Bag Speed Run
  - Severe Bleeding Trauma Response Checklist
- **Readiness Rating**: Evaluates drill performance and tracks training history in local storage.

### 7. Medical In Case of Emergency (ICE) Profile & Data Portability
- Secure local storage for Full Name, Blood Group (A+, A-, B+, B-, AB+, AB-, O+, O-), Severe Allergies, Chronic Conditions, Critical Daily Medications, and Organ Donor status.
- **Data Resiliency**: Export entire application state (contacts, safe locations, checklist, profile) as a standalone JSON backup file, or restore existing backups across devices.

### 8. Multilingual Architecture
Complete localized interfaces for:
- 🇺🇸 English (`en`)
- 🇮🇳 Hindi (`hi` - हिन्दी)
- 🇪🇸 Spanish (`es` - Español)
- 🇫🇷 French (`fr` - Français)
- 🇮🇳 Telugu (`te` - తెలుగు)

### 9. Progressive Web App (PWA)
- Powered by `vite-plugin-pwa` and Service Worker asset precaching.
- Installable on Android, ChromeOS, Windows, macOS, and iOS Safari.
- In-app install banner with iOS Safari guidance modal.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, TypeScript, Vite |
| **Styling & Design System** | Tailwind CSS v4, Lucide React icons |
| **Mapping Engine** | Leaflet with OpenStreetMap tile layers & custom dark SVG markers |
| **Offline & PWA** | `vite-plugin-pwa`, Service Worker CacheFirst/NetworkFirst strategies, Web App Manifest |
| **Audio Synthesis** | Browser Web Audio API (`AudioContext`, `OscillatorNode`, `GainNode`) |
| **Hardware APIs** | Browser Geolocation API, Web Share API, Battery API (where available) |
| **Testing** | Vitest, TypeScript compiler verification (`tsc --noEmit`) |

---

## 🔒 Security & Privacy Guarantees

1. **No Cloud Account or Sign-In Required**: All data stays exclusively within the user's browser `localStorage`.
2. **Zero Third-Party Telemetry**: No trackers, analytics, or behavioral cookies.
3. **No External AI Key Dependency**: Operates independently without remote LLM latency or API quota failures.
4. **Transparent Browser Invocation**: Adheres strictly to browser security constraints; never makes unauthorized outbound calls or automated background SMS transmissions.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or bun

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Development Server
Start the local Vite development server:
```bash
npm run dev
```
The application will be accessible at `http://localhost:3000`.

### 3. Production Build
Create an optimized production bundle:
```bash
npm run build
```

### 4. Running Tests
Execute the unit test suite using Vitest:
```bash
npm test
```

---

## 🧪 Test Suite Coverage

The automated test suite verifies:
- Mathematical accuracy of Haversine distance calculations between coordinates.
- Regional emergency directory configurations (India 112/100/101/108, US 911, UK 999, EU 112).
- Structural validity of emergency preparedness checklists and critical life-saving guides (CPR, Bleeding Control, Earthquake).

---

## 📱 Mobile-First Accessibility Compliance

- **Touch Targets**: All interactive buttons, telephone triggers, and navigation elements meet or exceed the $44 \times 44\text{ CSS px}$ touch standard.
- **Color Contrast**: Complies with WCAG AA standards with high-contrast text against `#070b14` / `#0b1329` deep navy surfaces.
- **Reduced Motion**: Automatically honors the user's `prefers-reduced-motion` operating system setting.

---

## 📄 License

Licensed under the Apache License, Version 2.0.
