import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  HeartPulse, 
  Droplet, 
  Activity, 
  Flame, 
  Waves, 
  Wind, 
  AlertOctagon, 
  ShieldAlert, 
  PhoneCall, 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  VolumeX,
  ChevronDown,
  ChevronUp,
  AlertTriangle
} from 'lucide-react';
import { SafetyGuide, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { useAudioAlert } from '../hooks/useAudioAlert';

interface SafetyGuidesViewProps {
  language: SupportedLanguage;
  guides: SafetyGuide[];
}

export const SafetyGuidesView: React.FC<SafetyGuidesViewProps> = ({
  language,
  guides,
}) => {
  const t = TRANSLATIONS[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedGuideId, setExpandedGuideId] = useState<string>(guides[0]?.id || '');

  const {
    activeSound,
    startCprMetronome,
    stopAll,
  } = useAudioAlert();

  const getGuideIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse': return <HeartPulse className="w-5 h-5 text-rose-400" />;
      case 'Droplet': return <Droplet className="w-5 h-5 text-red-400" />;
      case 'Activity': return <Activity className="w-5 h-5 text-amber-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-orange-400" />;
      case 'Waves': return <Waves className="w-5 h-5 text-blue-400" />;
      case 'Wind': return <Wind className="w-5 h-5 text-cyan-400" />;
      case 'AlertOctagon': return <AlertOctagon className="w-5 h-5 text-red-400" />;
      default: return <ShieldAlert className="w-5 h-5 text-teal-400" />;
    }
  };

  const filteredGuides = guides.filter((guide) => {
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    const matchesSearch = 
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.steps.some((s) => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.instruction.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      
      {/* Title & Search Bar */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-teal-400" />
            {t.guides.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {t.guides.subtitle}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.guides.searchPlaceholder}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 transition shadow-inner"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'all', label: t.guides.allCategories },
            { id: 'medical', label: t.guides.medical },
            { id: 'natural_disaster', label: t.guides.disaster },
            { id: 'fire_hazards', label: t.guides.fire },
            { id: 'security', label: t.guides.security },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Guides Accordion List */}
      <div className="space-y-4">
        {filteredGuides.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/40 border border-dashed border-slate-800 rounded-3xl">
            <BookOpen className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-xs text-slate-400">No emergency guide matches your search query.</p>
          </div>
        ) : (
          filteredGuides.map((guide) => {
            const isExpanded = expandedGuideId === guide.id;
            const isCPR = guide.id === 'guide-cpr';

            return (
              <div
                key={guide.id}
                className={`rounded-3xl border transition-all overflow-hidden ${
                  isExpanded
                    ? 'bg-slate-900/90 border-teal-500/60 shadow-xl'
                    : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Guide Header Banner */}
                <div
                  onClick={() => setExpandedGuideId(isExpanded ? '' : guide.id)}
                  className="p-5 sm:p-6 cursor-pointer flex items-center justify-between gap-4 select-none"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 shadow-inner">
                      {getGuideIcon(guide.icon)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="font-extrabold text-white text-base sm:text-lg">
                          {guide.title}
                        </h2>
                        {guide.urgencyLevel === 'immediate' && (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-800">
                            CRITICAL
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1 sm:line-clamp-none">
                        {guide.summary}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>

                {/* Expanded Detailed Step by Step Content */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-6">
                    
                    {/* Interactive CPR Metronome Tool (If CPR Guide) */}
                    {isCPR && (
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 via-red-950/30 to-slate-950 border border-rose-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <div className="text-xs font-bold text-rose-200 flex items-center gap-1.5">
                            <HeartPulse className="w-4 h-4 text-rose-400 animate-pulse" />
                            <span>Acoustic CPR Compression Metronome (110 BPM)</span>
                          </div>
                          <p className="text-[11px] text-slate-300 mt-1">
                            {t.guides.cprCadenceNotice}
                          </p>
                        </div>

                        <button
                          onClick={() => (activeSound === 'metronome' ? stopAll() : startCprMetronome())}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
                            activeSound === 'metronome'
                              ? 'bg-rose-600 text-white animate-pulse shadow-lg shadow-rose-950/60'
                              : 'bg-slate-800 text-rose-300 hover:bg-slate-700 border border-rose-900/50'
                          }`}
                        >
                          {activeSound === 'metronome' ? (
                            <>
                              <VolumeX className="w-4 h-4" />
                              <span>{t.guides.stopCprMetronome}</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-4 h-4" />
                              <span>{t.guides.startCprMetronome}</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* Steps List */}
                    <div className="space-y-4">
                      {guide.steps.map((step) => (
                        <div
                          key={step.stepNumber}
                          className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-400 font-bold text-xs flex items-center justify-center shrink-0 border border-teal-500/30">
                              {step.stepNumber}
                            </span>
                            <h3 className="font-bold text-white text-sm">
                              {step.title}
                            </h3>
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed pl-8.5">
                            {step.instruction}
                          </p>

                          {step.warning && (
                            <div className="ml-8.5 p-2.5 rounded-xl bg-red-950/30 border border-red-900/40 text-[11px] text-red-200 flex items-start gap-2">
                              <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                              <span>{step.warning}</span>
                            </div>
                          )}

                          {step.tip && (
                            <div className="ml-8.5 text-[11px] text-teal-300/90 font-medium">
                              Tip: {step.tip}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Do's and Don'ts Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Do's */}
                      <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/30 space-y-2">
                        <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{t.guides.dos}</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {guide.dos.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-emerald-400">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Don'ts */}
                      <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/30 space-y-2">
                        <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                          <XCircle className="w-4 h-4" />
                          <span>{t.guides.donts}</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {guide.donts.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-rose-400">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Direct Emergency Call Button */}
                    {guide.emergencyCall && (
                      <div className="pt-2 flex justify-end">
                        <a
                          href={`tel:${guide.emergencyCall}`}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition shadow-md shadow-red-950/50"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>Call Emergency ({guide.emergencyCall})</span>
                        </a>
                      </div>
                    )}

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
