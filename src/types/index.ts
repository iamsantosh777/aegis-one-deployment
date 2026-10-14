/**
 * AEGIS ONE - Type Definitions
 */

export type NavigationTab = 
  | 'overview' 
  | 'sos' 
  | 'nearby' 
  | 'guides' 
  | 'contacts' 
  | 'simulator' 
  | 'settings';

export type SupportedLanguage = 'en' | 'hi' | 'es' | 'fr' | 'te';

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  secondaryPhone?: string;
  isPrimary: boolean;
  notes?: string;
  createdAt: number;
}

export type SafeLocationCategory = 
  | 'hospital' 
  | 'police' 
  | 'fire_station' 
  | 'shelter' 
  | 'safe_haven' 
  | 'personal';

export interface SafeLocation {
  id: string;
  name: string;
  category: SafeLocationCategory;
  lat: number;
  lng: number;
  address: string;
  phone?: string;
  notes?: string;
  isCustom?: boolean;
  distanceKm?: number;
}

export interface PreparednessChecklistItem {
  id: string;
  title: string;
  description: string;
  category: 'water_food' | 'first_aid' | 'documents' | 'gear' | 'communication';
  completed: boolean;
  priority: 'critical' | 'essential' | 'recommended';
}

export interface EmergencyProfile {
  fullName: string;
  bloodType: string;
  dateOfBirth?: string;
  allergies: string;
  chronicConditions: string;
  medications: string;
  organDonor: boolean;
  emergencyNotes: string;
  primaryLanguage: string;
}

export interface SafetyGuideStep {
  stepNumber: number;
  title: string;
  instruction: string;
  warning?: string;
  tip?: string;
  timerSeconds?: number;
}

export interface SafetyGuide {
  id: string;
  title: string;
  category: 'medical' | 'natural_disaster' | 'fire_hazards' | 'security';
  icon: string;
  summary: string;
  urgencyLevel: 'immediate' | 'high' | 'medium';
  emergencyCall?: string;
  steps: SafetyGuideStep[];
  dos: string[];
  donts: string[];
}

export interface DrillScenario {
  id: string;
  title: string;
  category: string;
  durationSeconds: number;
  description: string;
  instructions: string[];
  tips: string[];
}

export interface SimulationResult {
  id: string;
  drillId: string;
  drillTitle: string;
  timestamp: number;
  durationTakenSeconds: number;
  completedStepsCount: number;
  totalStepsCount: number;
  passed: boolean;
  score: number;
  notes?: string;
}

export interface RegionalEmergencyDirectory {
  countryCode: string;
  countryName: string;
  general: string;
  police: string;
  ambulance: string;
  fire: string;
  disaster?: string;
  womenHelpline?: string;
  childline?: string;
}

export interface UserLocationState {
  status: 'idle' | 'requesting' | 'granted' | 'denied' | 'unavailable' | 'timeout';
  lat: number | null;
  lng: number | null;
  accuracy: number | null;
  timestamp: number | null;
  error: string | null;
  address?: string;
}
