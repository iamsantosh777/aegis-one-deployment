/**
 * AEGIS ONE - Main Application Component
 * "One Tap. One Response. One Step Toward Safety."
 */

import React, { useState, useEffect } from 'react';
import { 
  NavigationTab, 
  SupportedLanguage, 
  EmergencyContact, 
  SafeLocation, 
  PreparednessChecklistItem, 
  EmergencyProfile 
} from './types';
import { StorageService, REGIONAL_DIRECTORIES, INITIAL_SAFETY_GUIDES } from './services/storage';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { useGeolocation } from './hooks/useGeolocation';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { OverviewView } from './views/OverviewView';
import { EmergencySosView } from './views/EmergencySosView';
import { NearbyHelpView } from './views/NearbyHelpView';
import { SafetyGuidesView } from './views/SafetyGuidesView';
import { ContactsView } from './views/ContactsView';
import { SimulatorView } from './views/SimulatorView';
import { SettingsView } from './views/SettingsView';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  MapPin, 
  BookOpen, 
  PhoneCall, 
  WifiOff 
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('overview');
  const [language, setLanguage] = useState<SupportedLanguage>(() => StorageService.getLanguage());
  const [contacts, setContacts] = useState<EmergencyContact[]>(() => StorageService.getContacts());
  const [safeLocations, setSafeLocations] = useState<SafeLocation[]>(() => StorageService.getSafeLocations());
  const [checklist, setChecklist] = useState<PreparednessChecklistItem[]>(() => StorageService.getChecklist());
  const [profile, setProfile] = useState<EmergencyProfile>(() => StorageService.getProfile());
  const [selectedRegionCode, setSelectedRegionCode] = useState<string>(() => StorageService.getSelectedRegion());
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const isOnline = useOnlineStatus();
  const {
    location,
    permissionState,
    requestLocation,
    getGoogleMapsUrl,
    getOpenStreetMapUrl,
  } = useGeolocation();

  const currentRegionalDirectory = 
    REGIONAL_DIRECTORIES.find((r) => r.countryCode === selectedRegionCode) || 
    REGIONAL_DIRECTORIES[0];

  // Language update
  const handleLanguageChange = (lang: SupportedLanguage) => {
    setLanguage(lang);
    StorageService.saveLanguage(lang);
  };

  // Contacts update
  const handleSaveContacts = (updated: EmergencyContact[]) => {
    setContacts(updated);
    StorageService.saveContacts(updated);
  };

  // Safe locations update
  const handleSaveLocations = (updated: SafeLocation[]) => {
    setSafeLocations(updated);
    StorageService.saveSafeLocations(updated);
  };

  // Checklist update
  const handleToggleChecklist = (id: string) => {
    const updated = checklist.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setChecklist(updated);
    StorageService.saveChecklist(updated);
  };

  // Profile update
  const handleSaveProfile = (updated: EmergencyProfile) => {
    setProfile(updated);
    StorageService.saveProfile(updated);
  };

  // Region update
  const handleSelectRegion = (code: string) => {
    setSelectedRegionCode(code);
    StorageService.saveSelectedRegion(code);
  };

  // Reload all data (from backup import or reset)
  const handleReloadAllData = () => {
    setContacts(StorageService.getContacts());
    setSafeLocations(StorageService.getSafeLocations());
    setChecklist(StorageService.getChecklist());
    setProfile(StorageService.getProfile());
    setSelectedRegionCode(StorageService.getSelectedRegion());
    setLanguage(StorageService.getLanguage());
  };

  const primaryContactsCount = contacts.filter((c) => c.isPrimary).length;

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      
      {/* Header */}
      <Header
        currentTab={currentTab}
        language={language}
        onLanguageChange={handleLanguageChange}
        isOnline={isOnline}
        locationStatus={location.status}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        onNavigateToSos={() => setCurrentTab('sos')}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Left Navigation Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          language={language}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
          primaryContactCount={primaryContactsCount}
        />

        {/* View Content Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden min-h-[calc(100vh-4rem)]">
          {currentTab === 'overview' && (
            <OverviewView
              language={language}
              contacts={contacts}
              checklist={checklist}
              safeLocations={safeLocations}
              profile={profile}
              location={location}
              isOnline={isOnline}
              onNavigate={setCurrentTab}
              onToggleChecklist={handleToggleChecklist}
            />
          )}

          {currentTab === 'sos' && (
            <EmergencySosView
              language={language}
              contacts={contacts}
              profile={profile}
              regionalDirectory={currentRegionalDirectory}
              location={location}
              onRequestLocation={requestLocation}
              getGoogleMapsUrl={getGoogleMapsUrl}
              getOpenStreetMapUrl={getOpenStreetMapUrl}
              onBackToOverview={() => setCurrentTab('overview')}
            />
          )}

          {currentTab === 'nearby' && (
            <NearbyHelpView
              language={language}
              locations={safeLocations}
              onSaveLocations={handleSaveLocations}
              userLocation={location}
              isOnline={isOnline}
              onRequestLocation={requestLocation}
            />
          )}

          {currentTab === 'guides' && (
            <SafetyGuidesView
              language={language}
              guides={INITIAL_SAFETY_GUIDES}
            />
          )}

          {currentTab === 'contacts' && (
            <ContactsView
              language={language}
              contacts={contacts}
              onSaveContacts={handleSaveContacts}
              selectedRegionCode={selectedRegionCode}
              onSelectRegion={handleSelectRegion}
            />
          )}

          {currentTab === 'simulator' && (
            <SimulatorView
              language={language}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              language={language}
              profile={profile}
              onSaveProfile={handleSaveProfile}
              selectedRegionCode={selectedRegionCode}
              onSelectRegion={handleSelectRegion}
              onReloadAllData={handleReloadAllData}
            />
          )}
        </main>
      </div>

      {/* Mobile Sticky Quick Navigation Bar (Touch Targets >= 44x44px) */}
      <nav aria-label="Mobile Bottom Navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090f20]/95 backdrop-blur-md border-t border-slate-800/80 px-2 py-1.5 flex items-center justify-around">
        <button
          onClick={() => setCurrentTab('overview')}
          className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] px-2 py-1 rounded-xl text-[10px] font-bold transition ${
            currentTab === 'overview' ? 'text-teal-400 bg-teal-950/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setCurrentTab('sos')}
          className={`flex flex-col items-center justify-center min-w-[54px] min-h-[48px] px-2.5 py-1 rounded-xl text-[10px] font-black transition ${
            currentTab === 'sos' ? 'text-red-300 bg-red-950/60 border border-red-800' : 'text-red-400 hover:text-red-300'
          }`}
        >
          <AlertTriangle className="w-5 h-5 mb-0.5 animate-pulse" />
          <span>SOS</span>
        </button>

        <button
          onClick={() => setCurrentTab('nearby')}
          className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] px-2 py-1 rounded-xl text-[10px] font-bold transition ${
            currentTab === 'nearby' ? 'text-teal-400 bg-teal-950/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <MapPin className="w-5 h-5 mb-0.5" />
          <span>Nearby</span>
        </button>

        <button
          onClick={() => setCurrentTab('guides')}
          className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] px-2 py-1 rounded-xl text-[10px] font-bold transition ${
            currentTab === 'guides' ? 'text-teal-400 bg-teal-950/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span>Guides</span>
        </button>

        <button
          onClick={() => setCurrentTab('contacts')}
          className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] px-2 py-1 rounded-xl text-[10px] font-bold transition ${
            currentTab === 'contacts' ? 'text-teal-400 bg-teal-950/40' : 'text-slate-400 hover:text-white'
          }`}
        >
          <PhoneCall className="w-5 h-5 mb-0.5" />
          <span>Contacts</span>
        </button>
      </nav>

      {/* Floating Offline Notification when disconnected */}
      {!isOnline && (
        <div className="fixed bottom-16 sm:bottom-6 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-500/90 text-slate-950 font-bold px-3.5 py-2 text-xs shadow-2xl backdrop-blur-sm border border-amber-300">
          <WifiOff className="w-4 h-4 shrink-0" />
          <span>Offline Mode Active · Safety guides & saved contacts fully cached</span>
        </div>
      )}

    </div>
  );
}
