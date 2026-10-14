import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  UserCheck, 
  Globe, 
  Download, 
  Upload, 
  Trash2, 
  ShieldCheck, 
  Check, 
  Heart,
  HardDrive
} from 'lucide-react';
import { EmergencyProfile, RegionalEmergencyDirectory, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { REGIONAL_DIRECTORIES, StorageService } from '../services/storage';

interface SettingsViewProps {
  language: SupportedLanguage;
  profile: EmergencyProfile;
  onSaveProfile: (profile: EmergencyProfile) => void;
  selectedRegionCode: string;
  onSelectRegion: (code: string) => void;
  onReloadAllData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  language,
  profile,
  onSaveProfile,
  selectedRegionCode,
  onSelectRegion,
  onReloadAllData,
}) => {
  const t = TRANSLATIONS[language];

  const [formData, setFormData] = useState<EmergencyProfile>(profile);
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const bloodTypeOptions = ['Unknown', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setShowSavedFeedback(true);
    setTimeout(() => setShowSavedFeedback(false), 3000);
  };

  const handleExport = () => {
    const jsonStr = StorageService.exportAllData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aegis-one-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = StorageService.importAllData(content);
      if (success) {
        setImportStatus('Backup restored successfully!');
        onReloadAllData();
        setFormData(StorageService.getProfile());
        setTimeout(() => setImportStatus(null), 3000);
      } else {
        setImportStatus('Invalid backup file. Import failed.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    if (window.confirm('WARNING: Are you sure you want to reset all contacts, safe locations, checklist items, and profile details to factory defaults?')) {
      StorageService.resetAllData();
      onReloadAllData();
      setFormData(StorageService.getProfile());
      alert('Local data reset complete.');
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <SettingsIcon className="w-7 h-7 text-teal-400" />
          <span>{t.settings.title}</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {t.settings.subtitle}
        </p>
      </div>

      {/* SECTION 1: EMERGENCY MEDICAL (ICE) PROFILE */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">{t.settings.emergencyProfile}</h2>
              <p className="text-xs text-slate-400">Included in SOS emergency distress messages</p>
            </div>
          </div>

          {showSavedFeedback && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
              <Check className="w-3.5 h-3.5" />
              <span>{t.settings.savedSuccess}</span>
            </div>
          )}
        </div>

        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.settings.fullName}
              </label>
              <input
                type="text"
                placeholder="e.g. Alexander Reed"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.settings.bloodType}
              </label>
              <select
                value={formData.bloodType}
                onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                {bloodTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.settings.allergies}
              </label>
              <input
                type="text"
                placeholder="e.g. Penicillin, Peanuts, Latex"
                value={formData.allergies}
                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.settings.chronicConditions}
              </label>
              <input
                type="text"
                placeholder="e.g. Type-1 Diabetes, Cardiac Pacemaker, Asthma"
                value={formData.chronicConditions}
                onChange={(e) => setFormData({ ...formData, chronicConditions: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {t.settings.medications}
            </label>
            <input
              type="text"
              placeholder="e.g. Insulin, Albuterol Inhaler, Warfarin"
              value={formData.medications}
              onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {t.settings.emergencyNotes}
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Wheelchair user on 2nd floor, service dog on site, deaf in left ear"
              value={formData.emergencyNotes}
              onChange={(e) => setFormData({ ...formData, emergencyNotes: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="organDonorCheck"
              checked={formData.organDonor}
              onChange={(e) => setFormData({ ...formData, organDonor: e.target.checked })}
              className="w-4 h-4 rounded text-teal-600 bg-slate-950 border-slate-700 focus:ring-teal-500"
            />
            <label htmlFor="organDonorCheck" className="text-xs text-slate-300 select-none cursor-pointer flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              <span>{t.settings.organDonor}</span>
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-semibold transition shadow-md shadow-teal-950/40"
            >
              {t.settings.saveProfile}
            </button>
          </div>
        </form>
      </div>

      {/* SECTION 2: REGIONAL DISPATCH SELECTION */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">{t.settings.regionalDirectory}</h2>
            <p className="text-xs text-slate-400">Sets the default 1-tap SOS voice dialer target</p>
          </div>
        </div>

        <div className="max-w-md">
          <label className="block text-xs font-medium text-slate-300 mb-1">
            {t.settings.selectRegion}
          </label>
          <select
            value={selectedRegionCode}
            onChange={(e) => onSelectRegion(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 font-semibold"
          >
            {REGIONAL_DIRECTORIES.map((reg) => (
              <option key={reg.countryCode} value={reg.countryCode}>
                {reg.countryName} — National Hotline: {reg.general}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* SECTION 3: OFFLINE CACHE & BACKUP RESILIENCE */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">{t.settings.dataManagement}</h2>
            <p className="text-xs text-slate-400">Export and restore your encrypted local safety parameters</p>
          </div>
        </div>

        {importStatus && (
          <div className="p-3 rounded-xl bg-teal-950/80 border border-teal-800 text-teal-300 text-xs font-semibold">
            {importStatus}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition"
          >
            <Download className="w-4 h-4 text-teal-400" />
            <span>{t.settings.exportData}</span>
          </button>

          <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition cursor-pointer">
            <Upload className="w-4 h-4 text-teal-400" />
            <span>{t.settings.importData}</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>

          <button
            onClick={handleResetData}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-950/80 text-red-300 text-xs font-semibold border border-red-900/60 transition ml-auto"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
            <span>{t.settings.resetAll}</span>
          </button>
        </div>
      </div>

    </div>
  );
};
