import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  PhoneCall, 
  Navigation, 
  Share2, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  Eye, 
  Info, 
  RefreshCw,
  ShieldAlert,
  ArrowLeft,
  MessageSquare
} from 'lucide-react';
import { 
  EmergencyContact, 
  EmergencyProfile, 
  RegionalEmergencyDirectory, 
  SupportedLanguage, 
  UserLocationState 
} from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { useAudioAlert } from '../hooks/useAudioAlert';
import { ScreenStrobeModal } from '../components/ScreenStrobeModal';

interface EmergencySosViewProps {
  language: SupportedLanguage;
  contacts: EmergencyContact[];
  profile: EmergencyProfile;
  regionalDirectory: RegionalEmergencyDirectory;
  location: UserLocationState;
  onRequestLocation: () => void;
  getGoogleMapsUrl: () => string | null;
  getOpenStreetMapUrl: () => string | null;
  onBackToOverview: () => void;
}

export const EmergencySosView: React.FC<EmergencySosViewProps> = ({
  language,
  contacts,
  profile,
  regionalDirectory,
  location,
  onRequestLocation,
  getGoogleMapsUrl,
  onBackToOverview,
}) => {
  const t = TRANSLATIONS[language];
  const [stage, setStage] = useState<1 | 2>(1);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [showStrobeModal, setShowStrobeModal] = useState(false);
  const [messageNote, setMessageNote] = useState('I require immediate assistance.');

  const {
    activeSound,
    startSiren,
    startWhistle,
    startMorseSOS,
    stopAll,
  } = useAudioAlert();

  // Generate structured message
  const generateEmergencyMessage = () => {
    const timestampStr = new Date().toLocaleString();
    const mapUrl = getGoogleMapsUrl();
    
    let msg = `EMERGENCY ALERT: ${messageNote}\n`;
    msg += `Timestamp: ${timestampStr}\n`;
    
    if (location.lat !== null && location.lng !== null) {
      msg += `Coordinates: ${location.lat}, ${location.lng} (Accuracy: ±${location.accuracy}m)\n`;
      if (mapUrl) {
        msg += `Map Link: ${mapUrl}\n`;
      }
    } else {
      msg += `Coordinates: Location not captured (User permission required)\n`;
    }

    if (profile.fullName) {
      msg += `Name: ${profile.fullName}\n`;
    }
    if (profile.bloodType && profile.bloodType !== 'Unknown') {
      msg += `Blood Type: ${profile.bloodType}\n`;
    }
    if (profile.allergies) {
      msg += `Allergies: ${profile.allergies}\n`;
    }
    if (profile.chronicConditions) {
      msg += `Medical Info: ${profile.chronicConditions}\n`;
    }

    const primaryContact = contacts.find((c) => c.isPrimary);
    if (primaryContact) {
      msg += `Emergency Contact: ${primaryContact.name} (${primaryContact.phone})\n`;
    }

    return msg.trim();
  };

  const emergencyMessage = generateEmergencyMessage();

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(emergencyMessage);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 3000);
    } catch {
      // Fallback
      setCopiedMessage(true);
    }
  };

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AEGIS ONE Emergency Distress Message',
          text: emergencyMessage,
        });
      } catch {
        // User cancelled share
      }
    } else {
      handleCopyMessage();
    }
  };

  // Generate SMS URI
  const primaryPhone = contacts.find((c) => c.isPrimary)?.phone || '';
  const smsHref = `sms:${primaryPhone}?body=${encodeURIComponent(emergencyMessage)}`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      
      {/* Screen Strobe Beacon Modal */}
      <ScreenStrobeModal isOpen={showStrobeModal} onClose={() => setShowStrobeModal(false)} />

      {/* Top Banner Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToOverview}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>Country Mode:</span>
          <span className="font-bold text-white px-2 py-0.5 rounded bg-slate-800">
            {regionalDirectory.countryName} ({regionalDirectory.general})
          </span>
        </div>
      </div>

      {/* STAGE 1: GATEWAY & EXPLANATION */}
      {stage === 1 ? (
        <div className="space-y-6">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#19090b] via-[#110507] to-[#090b14] border-2 border-red-600/40 shadow-2xl text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-red-600/20 border-2 border-red-500/50 flex items-center justify-center text-red-500 shadow-lg shadow-red-950/60">
              <ShieldAlert className="w-10 h-10 animate-pulse" />
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {t.sos.stage1Title}
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                {t.sos.stage1Subtitle}
              </p>
            </div>

            {/* Crucial non-misleading browser disclaimer */}
            <div className="max-w-lg mx-auto p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-left flex items-start gap-3">
              <Info className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.sos.stage1Notice}
              </p>
            </div>

            {/* Launch Command Center Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setStage(2);
                  if (location.status !== 'granted') {
                    onRequestLocation();
                  }
                }}
                className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-base sm:text-lg tracking-wider shadow-2xl shadow-red-900/60 transition transform active:scale-95 border border-red-400/50"
              >
                {t.sos.openEmergencyCenter}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* STAGE 2: ACTIVE COMMAND CENTER */
        <div className="space-y-6">
          
          {/* Active Command Status Bar */}
          <div className="p-4 rounded-2xl bg-red-950/60 border border-red-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-3.5 h-3.5 rounded-full bg-red-500 animate-ping" />
              <div>
                <div className="text-sm font-extrabold text-red-100 uppercase tracking-wider">
                  {t.sos.stage2Title}
                </div>
                <div className="text-xs text-red-200/80">
                  {t.sos.stage2Notice}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                stopAll();
                setStage(1);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 transition"
            >
              {t.sos.cancelEmergency}
            </button>
          </div>

          {/* Major Voice Calling Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* National Emergency Services Dial Link */}
            <a
              href={`tel:${regionalDirectory.general}`}
              className="p-6 rounded-3xl bg-gradient-to-br from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white shadow-xl shadow-red-950/60 flex flex-col justify-between transition group border border-red-400/30 active:scale-98"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <PhoneCall className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-black tracking-widest">{regionalDirectory.general}</span>
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight">{t.sos.dialEmergency}</h3>
                <p className="text-xs text-red-100/90 mt-1">
                  National emergency response dispatch. Opens native phone dialer.
                </p>
              </div>
            </a>

            {/* Primary ICE Contact Call Link */}
            {contacts.find((c) => c.isPrimary) ? (
              (() => {
                const primary = contacts.find((c) => c.isPrimary)!;
                return (
                  <a
                    href={`tel:${primary.phone}`}
                    className="p-6 rounded-3xl bg-slate-900/90 hover:bg-slate-850 border border-slate-700 text-white shadow-xl flex flex-col justify-between transition group active:scale-98"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                        <PhoneCall className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-teal-400 px-2 py-0.5 rounded bg-teal-950/80 border border-teal-800">
                        PRIMARY ICE
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{primary.name}</h3>
                      <p className="text-xs text-slate-400 mt-1">
                        {primary.relationship} · {primary.phone}
                      </p>
                    </div>
                  </a>
                );
              })()
            ) : (
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-dashed border-slate-800 flex flex-col justify-center items-center text-center">
                <PhoneCall className="w-8 h-8 text-slate-600 mb-2" />
                <p className="text-xs text-slate-400">No primary emergency contact configured.</p>
                <button
                  onClick={() => onBackToOverview()}
                  className="mt-2 text-xs text-teal-400 font-semibold hover:underline"
                >
                  Configure in Contacts
                </button>
              </div>
            )}
          </div>

          {/* GPS Coordinates & Verification Card */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-teal-400" />
                <h3 className="font-bold text-white text-base">{t.sos.locationSnapshot}</h3>
              </div>
              <button
                onClick={onRequestLocation}
                disabled={location.status === 'requesting'}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-semibold transition"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${location.status === 'requesting' ? 'animate-spin' : ''}`} />
                <span>{location.status === 'requesting' ? 'Acquiring...' : t.sos.refreshLocation}</span>
              </button>
            </div>

            {location.status === 'granted' && location.lat !== null && location.lng !== null ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">Latitude / Longitude</div>
                  <div className="text-sm font-mono font-bold text-white">
                    {location.lat}, {location.lng}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">GPS Accuracy</div>
                  <div className="text-sm font-bold text-teal-400">
                    ±{location.accuracy} meters
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">Acquisition Time</div>
                  <div className="text-xs font-mono text-slate-300">
                    {new Date(location.timestamp || Date.now()).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/40 text-amber-200 text-xs space-y-2">
                <p>
                  {location.error || 'GPS coordinates not yet acquired. Tap "Acquire Fresh GPS Coordinates" to query browser geolocation.'}
                </p>
                <button
                  onClick={onRequestLocation}
                  className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold"
                >
                  Request Geolocation Permission
                </button>
              </div>
            )}
          </div>

          {/* Emergency Message Composer & Review Before Dispatch */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-teal-400" />
                <h3 className="font-bold text-white text-base">Emergency Distress Message Review</h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">Review before sending</span>
            </div>

            {/* Custom emergency note input */}
            <div>
              <label className="block text-xs text-slate-400 mb-1 font-medium">
                Current Situation Statement
              </label>
              <input
                type="text"
                value={messageNote}
                onChange={(e) => setMessageNote(e.target.value)}
                placeholder="Describe danger (e.g. Trapped by floodwater, Vehicle accident)..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            {/* Formatted Message Preview */}
            <div>
              <div className="text-xs text-slate-400 mb-1 font-medium">
                Structured Dispatch Text
              </div>
              <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed select-all">
                {emergencyMessage}
              </pre>
            </div>

            {/* Action Buttons for Message */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={handleCopyMessage}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold transition active:scale-95"
              >
                {copiedMessage ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedMessage ? t.sos.copied : t.sos.copyMessage}</span>
              </button>

              <button
                onClick={handleWebShare}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-semibold transition active:scale-95 shadow-md"
              >
                <Share2 className="w-4 h-4" />
                <span>{t.sos.shareMessage}</span>
              </button>

              <a
                href={smsHref}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition active:scale-95 shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send via Device SMS</span>
              </a>
            </div>

            <p className="text-[11px] text-slate-500">
              {t.sos.messageSentNotice}
            </p>
          </div>

          {/* Rescue Beacons: Acoustic & Visual */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-teal-400" />
              <span>{t.sos.audibleBeacon}</span>
            </h3>
            <p className="text-xs text-slate-400">
              Generates resonant sound synthesized in real-time through the device speaker to guide rescue teams.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => (activeSound === 'siren' ? stopAll() : startSiren())}
                className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                  activeSound === 'siren'
                    ? 'bg-red-950/80 border-red-500 text-red-100 animate-pulse'
                    : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">{t.sos.sirenAlert}</div>
                  <div className="text-[10px] text-slate-400">750Hz–1250Hz Sweep</div>
                </div>
                {activeSound === 'siren' ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-slate-400" />}
              </button>

              <button
                onClick={() => (activeSound === 'whistle' ? stopAll() : startWhistle())}
                className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                  activeSound === 'whistle'
                    ? 'bg-red-950/80 border-red-500 text-red-100 animate-pulse'
                    : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">{t.sos.rescueWhistle}</div>
                  <div className="text-[10px] text-slate-400">2800Hz Penetrating Sound</div>
                </div>
                {activeSound === 'whistle' ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-slate-400" />}
              </button>

              <button
                onClick={() => (activeSound === 'morse' ? stopAll() : startMorseSOS())}
                className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                  activeSound === 'morse'
                    ? 'bg-red-950/80 border-red-500 text-red-100 animate-pulse'
                    : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">{t.sos.sosMorseTone}</div>
                  <div className="text-[10px] text-slate-400">International Morse Code</div>
                </div>
                {activeSound === 'morse' ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-slate-400" />}
              </button>
            </div>

            {activeSound && (
              <button
                onClick={stopAll}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-red-400 text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <VolumeX className="w-4 h-4" />
                <span>{t.sos.stopAllAudio}</span>
              </button>
            )}

            {/* Visual Beacon Trigger */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">{t.sos.visualBeacon}</div>
                <div className="text-[11px] text-slate-400">
                  Flashes screen at maximum contrast for search aircraft or night rescue.
                </div>
              </div>
              <button
                onClick={() => setShowStrobeModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition"
              >
                <Eye className="w-4 h-4 text-teal-400" />
                <span>{t.sos.strobeOn}</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
