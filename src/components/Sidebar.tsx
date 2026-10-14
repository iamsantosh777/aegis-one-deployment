import React from 'react';
import { 
  LayoutDashboard, 
  AlertCircle, 
  MapPin, 
  BookOpen, 
  PhoneCall, 
  Target, 
  Settings,
  ShieldCheck,
  Zap,
  ExternalLink
} from 'lucide-react';
import { NavigationTab, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  language: SupportedLanguage;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  primaryContactCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  language,
  mobileOpen,
  onCloseMobile,
  primaryContactCount,
}) => {
  const t = TRANSLATIONS[language];

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string; isAlert?: boolean }[] = [
    {
      id: 'overview',
      label: t.tabs.overview,
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      id: 'sos',
      label: t.tabs.sos,
      icon: <AlertCircle className="w-5 h-5 text-red-400" />,
      badge: 'PRIORITY',
      isAlert: true,
    },
    {
      id: 'nearby',
      label: t.tabs.nearby,
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      id: 'guides',
      label: t.tabs.guides,
      icon: <BookOpen className="w-5 h-5" />,
      badge: 'OFFLINE',
    },
    {
      id: 'contacts',
      label: t.tabs.contacts,
      icon: <PhoneCall className="w-5 h-5" />,
      badge: primaryContactCount > 0 ? `${primaryContactCount}` : undefined,
    },
    {
      id: 'simulator',
      label: t.tabs.simulator,
      icon: <Target className="w-5 h-5 text-amber-400" />,
      badge: 'DRILL',
    },
    {
      id: 'settings',
      label: t.tabs.settings,
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const handleItemClick = (id: NavigationTab) => {
    onSelectTab(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-16 left-0 z-45 md:z-20 h-[calc(100vh-4rem)] w-64 bg-[#090f20] border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-200 ease-in-out md:translate-x-0 ${
          mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="p-4 flex flex-col gap-1.5 overflow-y-auto">
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Defense Modules
          </div>

          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all group ${
                  isActive
                    ? item.isAlert
                      ? 'bg-red-950/60 text-red-200 border border-red-800/60 shadow-sm'
                      : 'bg-teal-950/60 text-teal-200 border border-teal-800/60 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`${isActive ? (item.isAlert ? 'text-red-400' : 'text-teal-400') : 'text-slate-400 group-hover:text-slate-200'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.isAlert
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30 animate-pulse'
                        : item.id === 'simulator'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer info in sidebar */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span className="font-semibold text-slate-300">AEGIS Core v1.2</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-snug">
            Autonomous emergency framework. Operates offline without external cloud dependency.
          </p>
        </div>
      </aside>
    </>
  );
};
