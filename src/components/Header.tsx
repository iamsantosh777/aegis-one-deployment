import React, { useState } from 'react';
import { 
  Shield, 
  Wifi, 
  WifiOff, 
  Navigation, 
  Globe, 
  Download, 
  Menu, 
  X,
  AlertTriangle 
} from 'lucide-react';
import { SupportedLanguage, NavigationTab } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface HeaderProps {
  currentTab: NavigationTab;
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  isOnline: boolean;
  locationStatus: string;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onNavigateToSos: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  language,
  onLanguageChange,
  isOnline,
  locationStatus,
  mobileMenuOpen,
  onToggleMobileMenu,
  onNavigateToSos,
}) => {
  const t = TRANSLATIONS[language];
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  const getTabLabel = (tab: NavigationTab) => {
    switch (tab) {
      case 'overview': return t.tabs.overview;
      case 'sos': return t.tabs.sos;
      case 'nearby': return t.tabs.nearby;
      case 'guides': return t.tabs.guides;
      case 'contacts': return t.tabs.contacts;
      case 'simulator': return t.tabs.simulator;
      case 'settings': return t.tabs.settings;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b1329]/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo & Mobile Drawer Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500/20 to-red-500/20 border border-teal-500/40 flex items-center justify-center shadow-inner">
              <Shield className="w-5 h-5 text-teal-400" />
              <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-wider text-base sm:text-lg text-white">
                  AEGIS<span className="text-teal-400 ml-1">ONE</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-semibold text-teal-400/80 tracking-widest px-1.5 py-0.5 rounded bg-teal-950/60 border border-teal-800/40">
                  DEFENSE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden md:block">
                {t.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Current Section Title (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span className="text-slate-600">/</span>
          <span className="text-slate-200 font-medium tracking-wide uppercase">{getTabLabel(currentTab)}</span>
        </div>

        {/* Status Indicators & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Quick SOS Trigger in Header */}
          {currentTab !== 'sos' && (
            <button
              onClick={onNavigateToSos}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-wide shadow-md shadow-red-900/30 transition transform active:scale-95"
            >
              <AlertTriangle className="w-3.5 h-3.5 fill-current" />
              <span>SOS</span>
            </button>
          )}

          {/* Online/Offline Status Indicator */}
          <div 
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${
              isOnline 
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40' 
                : 'bg-amber-950/50 text-amber-300 border-amber-800/50'
            }`}
            title={isOnline ? t.header.online : t.header.offline}
          >
            {isOnline ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden sm:inline">{t.header.online}</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">{t.header.offline}</span>
              </>
            )}
          </div>

          {/* Location Status Indicator */}
          <div 
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${
              locationStatus === 'granted'
                ? 'bg-teal-950/40 text-teal-300 border-teal-800/40'
                : locationStatus === 'denied'
                ? 'bg-red-950/40 text-red-300 border-red-800/40'
                : 'bg-slate-800/50 text-slate-400 border-slate-700/50'
            }`}
            title={`GPS: ${locationStatus}`}
          >
            <Navigation className={`w-3.5 h-3.5 ${locationStatus === 'granted' ? 'text-teal-400' : 'text-slate-400'}`} />
            <span>
              {locationStatus === 'granted'
                ? t.header.locationReady
                : locationStatus === 'denied'
                ? t.header.locationDenied
                : t.header.locationPrompt}
            </span>
          </div>

          {/* Language Selector */}
          <div className="relative flex items-center">
            <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
              aria-label="Select Language"
              className="pl-7 pr-3 py-1 text-xs rounded-md bg-slate-900 border border-slate-700 text-slate-200 hover:border-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer transition font-medium"
            >
              <option value="en">EN</option>
              <option value="hi">हिन्दी</option>
              <option value="es">ESP</option>
              <option value="fr">FRA</option>
              <option value="te">తెలుగు</option>
            </select>
          </div>

          {/* PWA Install Button */}
          {!isInstalled && isInstallable && (
            <button
              onClick={install}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-sm transition"
              title="Install AEGIS ONE as native app"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.header.installApp}</span>
            </button>
          )}

          {!isInstalled && isIOS && (
            <button
              onClick={() => setShowIOSModal(true)}
              className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded-md border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>iOS</span>
            </button>
          )}
        </div>
      </div>

      {/* iOS Install Guidance Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Download className="w-5 h-5 text-teal-400" />
              Install AEGIS ONE on iOS
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed space-y-2 mb-4">
              1. Tap the <strong>Share</strong> button at bottom of Safari.<br />
              2. Scroll down and choose <strong>Add to Home Screen</strong>.<br />
              3. The app is immediately available offline.
            </p>
            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
