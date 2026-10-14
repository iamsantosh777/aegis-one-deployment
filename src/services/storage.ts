/**
 * AEGIS ONE - Storage & Offline Data Service
 * Manages persistent state in localStorage with resilient fallbacks.
 */

import {
  EmergencyContact,
  SafeLocation,
  PreparednessChecklistItem,
  EmergencyProfile,
  SafetyGuide,
  DrillScenario,
  SimulationResult,
  RegionalEmergencyDirectory,
  SupportedLanguage,
} from '../types';

export const REGIONAL_DIRECTORIES: RegionalEmergencyDirectory[] = [
  {
    countryCode: 'IN',
    countryName: 'India',
    general: '112',
    police: '100',
    ambulance: '108',
    fire: '101',
    disaster: '1070',
    womenHelpline: '1091',
    childline: '1098',
  },
  {
    countryCode: 'US',
    countryName: 'United States',
    general: '911',
    police: '911',
    ambulance: '911',
    fire: '911',
    disaster: '1-800-621-3362',
    womenHelpline: '1-800-799-7233',
    childline: '1-800-422-4453',
  },
  {
    countryCode: 'GB',
    countryName: 'United Kingdom',
    general: '999',
    police: '999',
    ambulance: '999',
    fire: '999',
    disaster: '0800-111-999',
    womenHelpline: '0808-2000-247',
    childline: '0800-1111',
  },
  {
    countryCode: 'EU',
    countryName: 'European Union',
    general: '112',
    police: '112',
    ambulance: '112',
    fire: '112',
    womenHelpline: '116 016',
    childline: '116 111',
  },
  {
    countryCode: 'AU',
    countryName: 'Australia',
    general: '000',
    police: '000',
    ambulance: '000',
    fire: '000',
    disaster: '1800-226-226',
    womenHelpline: '1800-737-732',
    childline: '1800-55-1800',
  },
  {
    countryCode: 'CA',
    countryName: 'Canada',
    general: '911',
    police: '911',
    ambulance: '911',
    fire: '911',
    womenHelpline: '1-866-863-0511',
    childline: '1-800-668-6868',
  },
];

export const INITIAL_CHECKLIST: PreparednessChecklistItem[] = [
  {
    id: 'c1',
    title: 'Drinking Water (3-Day Supply)',
    description: 'At least 3-4 liters per person per day for drinking and sanitation.',
    category: 'water_food',
    completed: false,
    priority: 'critical',
  },
  {
    id: 'c2',
    title: 'Non-Perishable Food',
    description: 'Minimum 3-day supply of canned goods, dry rations, energy bars.',
    category: 'water_food',
    completed: false,
    priority: 'critical',
  },
  {
    id: 'c3',
    title: 'Comprehensive First Aid Kit',
    description: 'Bandages, sterile gauze, antiseptic wipes, burn dressing, medical tape.',
    category: 'first_aid',
    completed: false,
    priority: 'critical',
  },
  {
    id: 'c4',
    title: 'Essential Prescription Medications',
    description: 'At least 7-day backup supply of chronic prescriptions and inhalers.',
    category: 'first_aid',
    completed: false,
    priority: 'critical',
  },
  {
    id: 'c5',
    title: 'High-Lumen Flashlight & Spare Batteries',
    description: 'Heavy duty LED flashlight plus headlamp for hands-free navigation.',
    category: 'gear',
    completed: false,
    priority: 'essential',
  },
  {
    id: 'c6',
    title: 'High-Pitch Rescue Whistle',
    description: 'Audible signaling device that penetrates smoke, fog, and debris.',
    category: 'gear',
    completed: false,
    priority: 'essential',
  },
  {
    id: 'c7',
    title: 'Charged Power Bank & Charging Cables',
    description: 'Minimum 10,000mAh external battery kept at 100% charge for phones.',
    category: 'communication',
    completed: false,
    priority: 'essential',
  },
  {
    id: 'c8',
    title: 'Emergency Contact Card & Physical Paper Copy',
    description: 'Laminated paper with family numbers, doctors, insurance in waterproof bag.',
    category: 'documents',
    completed: false,
    priority: 'essential',
  },
  {
    id: 'c9',
    title: 'Government IDs, Passports & Property Copies',
    description: 'Scanned digital files on encrypted USB drive and physical paper backups.',
    category: 'documents',
    completed: false,
    priority: 'recommended',
  },
  {
    id: 'c10',
    title: 'Emergency Cash in Small Denominations',
    description: 'ATMs and card terminals often fail during grid outages and natural disasters.',
    category: 'documents',
    completed: false,
    priority: 'recommended',
  },
  {
    id: 'c11',
    title: 'Multi-Tool & Heavy Work Gloves',
    description: 'Pliers, wire cutter, can opener, and leather work gloves for debris handling.',
    category: 'gear',
    completed: false,
    priority: 'recommended',
  },
];

export const INITIAL_SAFETY_GUIDES: SafetyGuide[] = [
  {
    id: 'guide-cpr',
    title: 'Cardiopulmonary Resuscitation (CPR)',
    category: 'medical',
    icon: 'HeartPulse',
    summary: 'Hands-only chest compressions for unresponsive persons who are not breathing normally.',
    urgencyLevel: 'immediate',
    emergencyCall: '112',
    steps: [
      {
        stepNumber: 1,
        title: 'Check Safety & Responsiveness',
        instruction: 'Ensure the scene is safe. Tap both shoulders firmly and ask loudly: "Are you okay?" Look for normal breathing.',
        warning: 'Do not delay compressions if the person is only gasping or unresponsive.',
      },
      {
        stepNumber: 2,
        title: 'Call 112 / Emergency Immediately',
        instruction: 'Put phone on speaker while calling 112 or direct someone specifically: "You, call 112 and find an AED!"',
      },
      {
        stepNumber: 3,
        title: 'Position Your Hands',
        instruction: 'Place the heel of one hand on the center of the chest (lower half of the breastbone). Interlock fingers of your other hand on top.',
      },
      {
        stepNumber: 4,
        title: 'Compress Hard and Fast (100–120 BPM)',
        instruction: 'Lock your elbows. Push straight down at least 5 cm (2 inches) deep at a cadence of 100 to 120 beats per minute (e.g., to the rhythm of "Stayin Alive"). Allow chest to fully recoil between compressions.',
        timerSeconds: 120,
      },
      {
        stepNumber: 5,
        title: 'Continue Without Pauses',
        instruction: 'Do not stop compressions until emergency medical personnel take over or an AED arrives and advises analyzing.',
      },
    ],
    dos: [
      'Push hard and fast in the exact center of the chest',
      'Allow full chest recoil between every push',
      'Swap compressors every 2 minutes if someone is available to prevent exhaustion',
    ],
    donts: [
      'Do not lean on the chest between compressions',
      'Do not stop to check pulse repeatedly if untrained',
      'Do not give up before medical responders arrive',
    ],
  },
  {
    id: 'guide-bleeding',
    title: 'Severe Bleeding & Hemorrhage Control',
    category: 'medical',
    icon: 'Droplet',
    summary: 'Direct pressure, wound packing, and emergency tourniquet application.',
    urgencyLevel: 'immediate',
    emergencyCall: '112',
    steps: [
      {
        stepNumber: 1,
        title: 'Ensure Scene Safety & Protect Yourself',
        instruction: 'Look for ongoing danger (traffic, machinery, collapse). Use gloves or a clean barrier if available.',
      },
      {
        stepNumber: 2,
        title: 'Apply Immediate Firm Direct Pressure',
        instruction: 'Place clean cloth, trauma pad, or clothing directly onto the bleeding site. Push down with both hands using your upper body weight.',
        warning: 'Do not remove saturated bandages; layer additional clean material directly on top.',
      },
      {
        stepNumber: 3,
        title: 'Pack Deep Wounds',
        instruction: 'If bleeding from groin, armpit, or neck (junctional areas), pack sterile gauze tightly into the wound cavity until packed tight, then apply continuous hard pressure.',
      },
      {
        stepNumber: 4,
        title: 'Apply Tourniquet for Extremities',
        instruction: 'For severe, spurting bleeding on an arm or leg, apply a commercial or improvised tourniquet 5–7 cm (2–3 inches) above the wound, closer to the torso. Tighten until bleeding stops. Record application time!',
        tip: 'Write the exact time (HH:MM) on the victim forehead or tourniquet band.',
      },
    ],
    dos: [
      'Apply continuous, unrelenting direct pressure',
      'Keep patient warm with a blanket or jacket to prevent hypothermia-induced shock',
      'Keep the wound elevated above the heart if bones are not fractured',
    ],
    donts: [
      'Do not loosen or remove a tourniquet once applied',
      'Do not place a tourniquet directly over a joint (elbow/knee)',
      'Do not probe or remove impaled objects from the wound',
    ],
  },
  {
    id: 'guide-choking',
    title: 'Choking Relief (Heimlich Maneuver)',
    category: 'medical',
    icon: 'ShieldAlert',
    summary: 'Abdominal thrusts and back blows for complete upper airway obstruction.',
    urgencyLevel: 'immediate',
    steps: [
      {
        stepNumber: 1,
        title: 'Recognize Universal Choking Sign',
        instruction: 'Victim cannot speak, cry, or cough loudly, and hands may clutch their throat. Ask: "Are you choking?" If they nod and cannot speak, act immediately.',
      },
      {
        stepNumber: 2,
        title: 'Give 5 Firm Back Blows',
        instruction: 'Stand behind and slightly to the side. Support chest with one hand and lean victim forward. Deliver 5 sharp blows between shoulder blades with the heel of your hand.',
      },
      {
        stepNumber: 3,
        title: 'Perform 5 Abdominal Thrusts',
        instruction: 'Stand behind, wrap arms around their waist. Make a fist with one hand, thumb inwards, just above their navel (well below ribcage). Grasp fist with other hand and pull sharply inward and upward.',
      },
      {
        stepNumber: 4,
        title: 'Repeat Until Cleared or Unresponsive',
        instruction: 'Alternate 5 back blows and 5 abdominal thrusts. If victim becomes unconscious, lower gently to the floor, call 112, and begin CPR.',
      },
    ],
    dos: [
      'Lean the person forward so dislodged object exits the mouth',
      'Call emergency services if obstruction does not clear within 30 seconds',
    ],
    donts: [
      'Do not perform blind finger sweeps in the mouth',
      'Do not give liquids or water to a choking person',
      'Do not use abdominal thrusts on infants under 1 year (use chest thrusts and back slaps)',
    ],
  },
  {
    id: 'guide-earthquake',
    title: 'Earthquake: Drop, Cover, Hold On',
    category: 'natural_disaster',
    icon: 'Activity',
    summary: 'Immediate physical protection protocols during seismic tremors and aftershocks.',
    urgencyLevel: 'immediate',
    steps: [
      {
        stepNumber: 1,
        title: 'DROP onto Hands and Knees',
        instruction: 'Drop to the floor before the earthquake knocks you down. This position protects your vital organs and allows mobility if needed.',
      },
      {
        stepNumber: 2,
        title: 'COVER Your Head and Neck',
        instruction: 'Crawl underneath a sturdy desk or table. If no shelter is nearby, crawl next to an interior wall away from windows, glass, and heavy hanging fixtures. Cover head and neck with your arms.',
      },
      {
        stepNumber: 3,
        title: 'HOLD ON Until Shaking Stops',
        instruction: 'Hold onto your shelter with one hand and be prepared to move with it. Keep your other hand covering your head and neck.',
      },
      {
        stepNumber: 4,
        title: 'Post-Tremor Inspection & Evacuation',
        instruction: 'Once tremors cease, check yourself for injuries. Check for gas smell; do NOT turn on light switches or open flames. Evacuate via stairs, NEVER use elevators.',
      },
    ],
    dos: [
      'Stay indoors until shaking completely stops',
      'Cover your face and head with pillows or arms if in bed',
      'Be prepared for strong aftershocks in the coming hours',
    ],
    donts: [
      'Do NOT run outside during active shaking due to falling glass/façades',
      'Do NOT stand in doorways; modern doorways are not reinforced',
      'Do NOT use elevators during or after seismic events',
    ],
  },
  {
    id: 'guide-flood',
    title: 'Flooding & Flash Flood Safety',
    category: 'natural_disaster',
    icon: 'Waves',
    summary: 'Surviving rapid rising waters, urban flash floods, and vehicle entrapment.',
    urgencyLevel: 'high',
    steps: [
      {
        stepNumber: 1,
        title: 'Seek Immediate High Ground',
        instruction: 'Move immediately to higher ground. Do not wait for instructions if you see water rising rapidly.',
      },
      {
        stepNumber: 2,
        title: 'Turn Around, Don’t Drown!',
        instruction: 'Never walk, swim, or drive through floodwaters. Just 15 cm (6 inches) of moving water can knock down an adult; 30 cm (12 inches) can sweep away a car.',
      },
      {
        stepNumber: 3,
        title: 'Disconnect Utilities If Safe',
        instruction: 'If advised or time permits, turn off main electrical breaker and gas valve before water enters living spaces.',
      },
      {
        stepNumber: 4,
        title: 'If Trapped in a Building',
        instruction: 'Go to highest level. Do NOT enter a closed attic where you could be trapped by rising water; get onto the roof only if necessary and signal for help.',
      },
    ],
    dos: [
      'Boil or purify all water before drinking after flooding',
      'Wear sturdy shoes and long pants to prevent infection from contaminated debris',
      'Report downed power lines immediately',
    ],
    donts: [
      'Do not touch electrical equipment if you are wet or standing in water',
      'Do not drive around barricades on flooded roads',
      'Do not let children or pets play in flood runoff',
    ],
  },
  {
    id: 'guide-fire',
    title: 'Building Fire & Smoke Evacuation',
    category: 'fire_hazards',
    icon: 'Flame',
    summary: 'Escape routes, smoke navigation, and immediate burn management.',
    urgencyLevel: 'immediate',
    emergencyCall: '101',
    steps: [
      {
        stepNumber: 1,
        title: 'Get Low and Crawl Under Smoke',
        instruction: 'Smoke and toxic gases rise. Cleaner, cooler air is 30–60 cm (1–2 feet) from the floor. Crawl on hands and knees toward the exit.',
      },
      {
        stepNumber: 2,
        title: 'Test Doors with the Back of Your Hand',
        instruction: 'Feel the door handle and door surface with back of your hand. If hot, DO NOT open it; fire is on the other side. Use alternate route or window.',
      },
      {
        stepNumber: 3,
        title: 'Stop, Drop, and Roll If Clothes Catch Fire',
        instruction: 'Do not run. Immediately drop to the floor, cover face with hands, and roll over and over to smother the flames.',
      },
      {
        stepNumber: 4,
        title: 'Once Outside, Stay Outside',
        instruction: 'Never go back into a burning building for pets, phones, or possessions. Call 101/112 and inform firefighters of anyone still inside.',
      },
    ],
    dos: [
      'Close doors behind you as you escape to slow the spread of fire and smoke',
      'Use stairwells, never elevators',
      'Cover mouth with a damp cloth if available',
    ],
    donts: [
      'Do not waste seconds gathering personal belongings',
      'Do not jump from high floors unless instructed by emergency responders',
      'Do not open hot doors',
    ],
  },
  {
    id: 'guide-cyclone',
    title: 'Severe Cyclone & Storm Preparedness',
    category: 'natural_disaster',
    icon: 'Wind',
    summary: 'Structural protection, sheltering in place, and surviving the eye of the storm.',
    urgencyLevel: 'high',
    steps: [
      {
        stepNumber: 1,
        title: 'Secure Windows & Structural Openings',
        instruction: 'Close shutters or tape heavy windows. Secure outdoor furniture, trash bins, and loose roof sheets that could become projectiles.',
      },
      {
        stepNumber: 2,
        title: 'Shelter in an Interior Windowless Room',
        instruction: 'Stay in the central bathroom, hallway, or lowest floor. Bring your Go-Bag, battery-powered radio, and water.',
      },
      {
        stepNumber: 3,
        title: 'Beware the Calm Eye of the Cyclone',
        instruction: 'When the eye passes overhead, winds suddenly drop to near calm. DO NOT venture outside; winds will violently resume from the opposite direction within minutes.',
      },
    ],
    dos: [
      'Store ample fresh drinking water in sanitized containers',
      'Keep mobile devices and power banks at maximum charge',
      'Monitor official weather alerts via radio or offline apps',
    ],
    donts: [
      'Do not go near windows during peak wind gusts',
      'Do not assume the storm is over during the calm eye',
      'Do not walk under power poles or tall trees post-storm',
    ],
  },
  {
    id: 'guide-active-threat',
    title: 'Active Threat: Run, Hide, Fight',
    category: 'security',
    icon: 'AlertOctagon',
    summary: 'Response protocols for hostile armed threats in public or workplace settings.',
    urgencyLevel: 'immediate',
    steps: [
      {
        stepNumber: 1,
        title: 'RUN (Evacuate If Safe)',
        instruction: 'Have an escape route and plan in mind. Leave belongings behind. Keep hands visible and follow police instructions.',
      },
      {
        stepNumber: 2,
        title: 'HIDE (If Escape Is Impossible)',
        instruction: 'Hide out of the threat’s view. Lock and barricade doors with heavy furniture. Silence your phone (turn off vibration and ringer) and turn off lights.',
      },
      {
        stepNumber: 3,
        title: 'FIGHT (As an Absolute Last Resort)',
        instruction: 'Only when your life is in imminent danger. Act with physical aggression, improvise weapons (fire extinguishers, chairs), and commit completely to your actions.',
      },
    ],
    dos: [
      'Silence phones completely (mute audio & disable vibration)',
      'Keep hands raised with fingers spread when encountering law enforcement',
      'Remain calm and call emergency services once safely hidden or evacuated',
    ],
    donts: [
      'Do not stop to film on mobile phones',
      'Do not point, yell, or make sudden movements towards arriving officers',
      'Do not open barricaded doors until verified safe by authorities',
    ],
  },
];

export const INITIAL_DRILLS: DrillScenario[] = [
  {
    id: 'drill-earthquake',
    title: 'Earthquake "Drop, Cover, Hold On" Drill',
    category: 'Seismic Safety',
    durationSeconds: 60,
    description: 'Practice the international standard earthquake survival response within 60 seconds.',
    instructions: [
      '1. React instantly to the tremor alarm.',
      '2. Drop onto hands and knees beneath sturdy cover.',
      '3. Hold on to cover with one hand, protect neck with other.',
      '4. Maintain position until drill countdown completes.',
      '5. Verbally verify exit paths are clear of simulated debris.',
    ],
    tips: [
      'Check if your desk or table can support heavy objects.',
      'Practice with family or colleagues to form automatic muscle memory.',
    ],
  },
  {
    id: 'drill-gobag',
    title: '2-Minute Rapid Evacuation Go-Bag Drill',
    category: 'Evacuation Readiness',
    durationSeconds: 120,
    description: 'Test your ability to grab emergency essentials and exit the building within 120 seconds.',
    instructions: [
      '1. Start timer at simulated evacuation order.',
      '2. Locate and secure personal Go-Bag with identification documents.',
      '3. Collect daily critical medications and power bank.',
      '4. Put on sturdy footwear and grab outdoor jacket.',
      '5. Reach designated safe assembly point before timer expires.',
    ],
    tips: [
      'Keep your emergency Go-Bag in an easily accessible front closet or near the main exit.',
      'Ensure family members know the exact location of their bags.',
    ],
  },
  {
    id: 'drill-firstaid',
    title: 'Severe Bleeding Control Protocol Drill',
    category: 'Trauma First Aid',
    durationSeconds: 90,
    description: 'Step through the life-saving bleeding control sequence under time pressure.',
    instructions: [
      '1. Verbalize scene safety check.',
      '2. Position hands for maximum direct compression.',
      '3. Simulate wound packing technique.',
      '4. Practice placing tourniquet 5 cm above simulated trauma site.',
      '5. Note current timestamp for medical transfer.',
    ],
    tips: [
      'Direct pressure stops over 80% of life-threatening limb hemorrhages.',
      'Never hesitate to use full body weight for compression.',
    ],
  },
];

export const DEFAULT_SAFE_LOCATIONS: SafeLocation[] = [
  {
    id: 'loc-ndma',
    name: 'National Disaster Management Operations Center',
    category: 'shelter',
    lat: 28.5672,
    lng: 77.1990,
    address: 'NDMA Bhawan, A-1, Safdarjung Enclave, New Delhi, India',
    phone: '1070',
    notes: '24/7 National Emergency Support & Relief Coordination',
  },
  {
    id: 'loc-aiims',
    name: 'AIIMS Central Emergency Trauma Center',
    category: 'hospital',
    lat: 28.5670,
    lng: 77.2100,
    address: 'Sri Aurobindo Marg, Ansari Nagar, New Delhi, India',
    phone: '011-26588500',
    notes: 'Level-1 Emergency Trauma & Critical Care Facility',
  },
  {
    id: 'loc-police-hq',
    name: 'Central Police Command & Emergency Response Unit',
    category: 'police',
    lat: 28.6289,
    lng: 77.2065,
    address: 'Parliament Street, Connaught Place, New Delhi, India',
    phone: '112',
    notes: 'State Emergency Response Dispatch & Police Patrol Unit',
  },
  {
    id: 'loc-fire-hq',
    name: 'Delhi Fire Service Headquarters',
    category: 'fire_station',
    lat: 28.6315,
    lng: 77.2289,
    address: 'Barakhamba Road, Connaught Place, New Delhi, India',
    phone: '101',
    notes: 'Primary Fire Fighting, Hazmat & Structural Rescue Command',
  },
];

const KEYS = {
  CONTACTS: 'aegis_contacts_v1',
  SAFE_LOCATIONS: 'aegis_safe_locations_v1',
  CHECKLIST: 'aegis_checklist_v1',
  PROFILE: 'aegis_profile_v1',
  SELECTED_REGION: 'aegis_selected_region_v1',
  LANGUAGE: 'aegis_lang_v1',
  DRILL_RESULTS: 'aegis_drill_results_v1',
};

export const StorageService = {
  // Contacts
  getContacts(): EmergencyContact[] {
    try {
      const data = localStorage.getItem(KEYS.CONTACTS);
      if (!data) return [];
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  saveContacts(contacts: EmergencyContact[]): void {
    try {
      localStorage.setItem(KEYS.CONTACTS, JSON.stringify(contacts));
    } catch (e) {
      console.error('Failed to save contacts to localStorage', e);
    }
  },

  // Safe Locations
  getSafeLocations(): SafeLocation[] {
    try {
      const data = localStorage.getItem(KEYS.SAFE_LOCATIONS);
      if (!data) {
        localStorage.setItem(KEYS.SAFE_LOCATIONS, JSON.stringify(DEFAULT_SAFE_LOCATIONS));
        return DEFAULT_SAFE_LOCATIONS;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_SAFE_LOCATIONS;
    }
  },

  saveSafeLocations(locations: SafeLocation[]): void {
    try {
      localStorage.setItem(KEYS.SAFE_LOCATIONS, JSON.stringify(locations));
    } catch (e) {
      console.error('Failed to save safe locations', e);
    }
  },

  // Checklist
  getChecklist(): PreparednessChecklistItem[] {
    try {
      const data = localStorage.getItem(KEYS.CHECKLIST);
      if (!data) {
        localStorage.setItem(KEYS.CHECKLIST, JSON.stringify(INITIAL_CHECKLIST));
        return INITIAL_CHECKLIST;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_CHECKLIST;
    }
  },

  saveChecklist(items: PreparednessChecklistItem[]): void {
    try {
      localStorage.setItem(KEYS.CHECKLIST, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save checklist', e);
    }
  },

  // Emergency Profile (ICE)
  getProfile(): EmergencyProfile {
    const defaultProfile: EmergencyProfile = {
      fullName: '',
      bloodType: 'Unknown',
      allergies: '',
      chronicConditions: '',
      medications: '',
      organDonor: false,
      emergencyNotes: '',
      primaryLanguage: 'English',
    };
    try {
      const data = localStorage.getItem(KEYS.PROFILE);
      if (!data) return defaultProfile;
      return { ...defaultProfile, ...JSON.parse(data) };
    } catch {
      return defaultProfile;
    }
  },

  saveProfile(profile: EmergencyProfile): void {
    try {
      localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile', e);
    }
  },

  // Region
  getSelectedRegion(): string {
    return localStorage.getItem(KEYS.SELECTED_REGION) || 'IN';
  },

  saveSelectedRegion(code: string): void {
    localStorage.setItem(KEYS.SELECTED_REGION, code);
  },

  // Language
  getLanguage(): SupportedLanguage {
    const lang = localStorage.getItem(KEYS.LANGUAGE) as SupportedLanguage;
    return lang || 'en';
  },

  saveLanguage(lang: SupportedLanguage): void {
    localStorage.setItem(KEYS.LANGUAGE, lang);
  },

  // Drill Results
  getDrillResults(): SimulationResult[] {
    try {
      const data = localStorage.getItem(KEYS.DRILL_RESULTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveDrillResult(result: SimulationResult): void {
    try {
      const list = this.getDrillResults();
      list.unshift(result);
      // Keep max 20 recent records
      localStorage.setItem(KEYS.DRILL_RESULTS, JSON.stringify(list.slice(0, 20)));
    } catch (e) {
      console.error('Failed to save drill result', e);
    }
  },

  // Export / Import
  exportAllData(): string {
    const exportObject = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      contacts: this.getContacts(),
      safeLocations: this.getSafeLocations(),
      checklist: this.getChecklist(),
      profile: this.getProfile(),
      region: this.getSelectedRegion(),
      language: this.getLanguage(),
      drillResults: this.getDrillResults(),
    };
    return JSON.stringify(exportObject, null, 2);
  },

  importAllData(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.contacts) this.saveContacts(parsed.contacts);
      if (parsed.safeLocations) this.saveSafeLocations(parsed.safeLocations);
      if (parsed.checklist) this.saveChecklist(parsed.checklist);
      if (parsed.profile) this.saveProfile(parsed.profile);
      if (parsed.region) this.saveSelectedRegion(parsed.region);
      if (parsed.language) this.saveLanguage(parsed.language);
      if (parsed.drillResults) {
        localStorage.setItem(KEYS.DRILL_RESULTS, JSON.stringify(parsed.drillResults));
      }
      return true;
    } catch {
      return false;
    }
  },

  resetAllData(): void {
    localStorage.removeItem(KEYS.CONTACTS);
    localStorage.removeItem(KEYS.SAFE_LOCATIONS);
    localStorage.removeItem(KEYS.CHECKLIST);
    localStorage.removeItem(KEYS.PROFILE);
    localStorage.removeItem(KEYS.DRILL_RESULTS);
  },
};
