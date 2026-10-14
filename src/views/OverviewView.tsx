import React from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  BookOpen, 
  Target, 
  PhoneCall, 
  CheckCircle2, 
  Circle, 
  Compass, 
  HardDrive, 
  UserCheck, 
  ArrowRight,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { 
  EmergencyContact, 
  PreparednessChecklistItem, 
  SafeLocation, 
  EmergencyProfile, 
  NavigationTab, 
  SupportedLanguage,
  UserLocationState
} from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface OverviewViewProps {
  language: SupportedLanguage;
  contacts: EmergencyContact[];
  checklist: PreparednessChecklistItem[];
  safeLocations: SafeLocation[];
  profile: EmergencyProfile;
  location: UserLocationState;
  isOnline: boolean;
  onNavigate: (tab: NavigationTab) => void;
  onToggleChecklist: (id: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  language,
  contacts,
  checklist,
  safeLocations,
  profile,
  location,
  isOnline,
  onNavigate,
  onToggleChecklist,
}) => {
  const t = TRANSLATIONS[language];

  const primaryContacts = contacts.filter((c) => c.isPrimary);
  const completedChecklistCount = checklist.filter((i) => i.completed).length;
  const checklistPercent = Math.round((completedChecklistCount / checklist.length) * 100) || 0;

  // Calculate profile completeness
  const profileFieldsFilled = [
    profile.fullName,
    profile.bloodType !== 'Unknown',
    profile.allergies,
    profile.medications,
    profile.emergencyNotes,
  ].filter(Boolean).length;
  const profilePercent = Math.round((profileFieldsFilled / 5) * 100);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      
      {/* Hero Welcome & Major SOS Action */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e172e] via-[#091024] to-[#050811] border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>AEGIS AUTONOMOUS SAFETY SYSTEM</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.overview.welcomeTitle}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              {t.overview.welcomeSubtitle}
            </p>
          </div>

          {/* Prominent Emergency SOS Button */}
          <div className="w-full md:w-auto">
            <button
              onClick={() => onNavigate('sos')}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-lg sm:text-xl tracking-wider shadow-2xl shadow-red-950/60 transition-all transform active:scale-95 group border border-red-400/40"
            >
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white group-hover:animate-bounce" />
              </div>
              <div className="text-left">
                <div className="leading-tight">{t.overview.sosQuickLaunch}</div>
                <div className="text-[11px] font-normal text-red-100 opacity-90">
                  {t.overview.sosSubtitle}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />
      </div>

      {/* System Status Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* GPS Readiness */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-4">
          <div className={`p-3 rounded-xl ${location.status === 'granted' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/30' : 'bg-slate-800 text-slate-400'}`}>
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">{t.overview.gpsStatus}</div>
            <div className="text-sm font-bold text-white">
              {location.status === 'granted'
                ? `Acquired (±${location.accuracy}m)`
                : location.status === 'denied'
                ? 'Access Denied'
                : 'Ready to Request'}
            </div>
          </div>
        </div>

        {/* Offline Readiness */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">{t.overview.offlineReadiness}</div>
            <div className="text-sm font-bold text-emerald-300">
              {isOnline ? 'Online + Cached Offline' : '100% Offline Active'}
            </div>
          </div>
        </div>

        {/* Profile Completeness */}
        <div 
          onClick={() => onNavigate('settings')} 
          className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4 cursor-pointer hover:border-slate-700 transition"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">{t.overview.profileCompleteness}</div>
              <div className="text-sm font-bold text-white">{profilePercent}% Complete</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Quick Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigate('nearby')}
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-850 text-left transition group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-3 group-hover:scale-105 transition">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-base mb-1">{t.overview.exploreMap}</h3>
          <p className="text-xs text-slate-400">
            {safeLocations.length} safe locations saved locally with directions and direct dial.
          </p>
        </button>

        <button
          onClick={() => onNavigate('guides')}
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-850 text-left transition group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-3 group-hover:scale-105 transition">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-base mb-1">{t.overview.browseGuides}</h3>
          <p className="text-xs text-slate-400">
            CPR metronome, severe bleeding protocols, seismic & flood guides.
          </p>
        </button>

        <button
          onClick={() => onNavigate('simulator')}
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-850 text-left transition group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-105 transition">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-base mb-1">{t.overview.launchDrill}</h3>
          <p className="text-xs text-slate-400">
            Practice earthquake response, Go-Bag drills, and emergency simulations.
          </p>
        </button>
      </div>

      {/* Main Section: Saved Contacts & Preparedness Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Trusted Contacts Panel */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-teal-400" />
                {t.overview.primaryContacts}
              </h2>
              <p className="text-xs text-slate-400">
                1-tap direct phone dialer triggers
              </p>
            </div>
            <button
              onClick={() => onNavigate('contacts')}
              className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {contacts.length === 0 ? (
            <div className="text-center py-8 px-4 border border-dashed border-slate-800 rounded-2xl">
              <PhoneCall className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-xs text-slate-400 mb-3">{t.overview.noContacts}</p>
              <button
                onClick={() => onNavigate('contacts')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold transition"
              >
                <Plus className="w-4 h-4" />
                <span>{t.overview.addContact}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {contacts.slice(0, 3).map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-sm">{contact.name}</span>
                      {contact.isPrimary && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-800/50">
                          PRIMARY ICE
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400">{contact.relationship} · {contact.phone}</div>
                  </div>
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-sm transition active:scale-95"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Preparedness Checklist Panel */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-teal-400" />
                {t.overview.checklistProgress}
              </h2>
              <p className="text-xs text-slate-400">
                {completedChecklistCount} of {checklist.length} items verified ({checklistPercent}%)
              </p>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-slate-800 flex items-center justify-center font-bold text-xs text-teal-400 bg-slate-950">
              {checklistPercent}%
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-teal-500 to-emerald-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${checklistPercent}%` }}
            />
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {checklist.slice(0, 5).map((item) => (
              <div
                key={item.id}
                onClick={() => onToggleChecklist(item.id)}
                className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/60 hover:bg-slate-950/80 cursor-pointer transition select-none"
              >
                <button
                  type="button"
                  className="mt-0.5 text-slate-400 hover:text-teal-400"
                  aria-label={`Toggle ${item.title}`}
                >
                  {item.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-600" />
                  )}
                </button>
                <div className="flex-1">
                  <div className={`text-xs font-semibold ${item.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-1">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
