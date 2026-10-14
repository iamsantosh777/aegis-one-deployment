import React, { useState } from 'react';
import { 
  PhoneCall, 
  Plus, 
  Star, 
  Trash2, 
  Edit3, 
  UserCheck, 
  Shield, 
  Flame, 
  HeartPulse, 
  Users, 
  HelpCircle,
  ExternalLink,
  Globe
} from 'lucide-react';
import { EmergencyContact, RegionalEmergencyDirectory, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { REGIONAL_DIRECTORIES } from '../services/storage';

interface ContactsViewProps {
  language: SupportedLanguage;
  contacts: EmergencyContact[];
  onSaveContacts: (contacts: EmergencyContact[]) => void;
  selectedRegionCode: string;
  onSelectRegion: (code: string) => void;
}

export const ContactsView: React.FC<ContactsViewProps> = ({
  language,
  contacts,
  onSaveContacts,
  selectedRegionCode,
  onSelectRegion,
}) => {
  const t = TRANSLATIONS[language];
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phone, setPhone] = useState('');
  const [secondaryPhone, setSecondaryPhone] = useState('');
  const [isPrimary, setIsPrimary] = useState(false);
  const [notes, setNotes] = useState('');

  const currentRegion = REGIONAL_DIRECTORIES.find((r) => r.countryCode === selectedRegionCode) || REGIONAL_DIRECTORIES[0];

  const resetForm = () => {
    setName('');
    setRelationship('');
    setPhone('');
    setSecondaryPhone('');
    setIsPrimary(false);
    setNotes('');
    setEditingContact(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setShowAddModal(true);
  };

  const handleOpenEdit = (contact: EmergencyContact) => {
    setEditingContact(contact);
    setName(contact.name);
    setRelationship(contact.relationship);
    setPhone(contact.phone);
    setSecondaryPhone(contact.secondaryPhone || '');
    setIsPrimary(contact.isPrimary);
    setNotes(contact.notes || '');
    setShowAddModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Please enter a name and phone number.');
      return;
    }

    let updatedList = [...contacts];

    // If setting as primary, demote other primaries
    if (isPrimary) {
      updatedList = updatedList.map((c) => ({ ...c, isPrimary: false }));
    }

    if (editingContact) {
      updatedList = updatedList.map((c) =>
        c.id === editingContact.id
          ? {
              ...c,
              name: name.trim(),
              relationship: relationship.trim() || 'Family / Friend',
              phone: phone.trim(),
              secondaryPhone: secondaryPhone.trim() || undefined,
              isPrimary,
              notes: notes.trim() || undefined,
            }
          : c
      );
    } else {
      const newContact: EmergencyContact = {
        id: `contact-${Date.now()}`,
        name: name.trim(),
        relationship: relationship.trim() || 'Family / Friend',
        phone: phone.trim(),
        secondaryPhone: secondaryPhone.trim() || undefined,
        isPrimary: isPrimary || contacts.length === 0, // auto-primary if first
        notes: notes.trim() || undefined,
        createdAt: Date.now(),
      };
      updatedList.unshift(newContact);
    }

    onSaveContacts(updatedList);
    setShowAddModal(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Remove this contact from your emergency list?')) {
      const updated = contacts.filter((c) => c.id !== id);
      onSaveContacts(updated);
    }
  };

  const handleTogglePrimary = (id: string) => {
    const updated = contacts.map((c) => ({
      ...c,
      isPrimary: c.id === id,
    }));
    onSaveContacts(updated);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <PhoneCall className="w-7 h-7 text-teal-400" />
            <span>Emergency Contacts & Services</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Organize personal In Case of Emergency (ICE) contacts and verified civil hotlines.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-teal-950/40 transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Trusted Contact</span>
        </button>
      </div>

      {/* SECTION 1: PERSONAL EMERGENCY CONTACTS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-teal-400" />
            <span>My Trusted Personal Contacts ({contacts.length})</span>
          </h2>
          <span className="text-xs text-slate-400">Stored safely in browser local memory</span>
        </div>

        {contacts.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/40 border border-dashed border-slate-800 rounded-3xl space-y-3">
            <Users className="w-10 h-10 text-slate-600 mx-auto" />
            <div className="space-y-1">
              <h3 className="font-bold text-white text-sm">No Emergency Contacts Registered</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                During an emergency, AEGIS ONE allows you to call your primary ICE contact or share your exact GPS coordinates in one tap.
              </p>
            </div>
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold"
            >
              Add First Contact
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-5 rounded-3xl border transition-all ${
                  contact.isPrimary
                    ? 'bg-slate-900 border-red-500/50 shadow-xl'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-base">{contact.name}</h3>
                      {contact.isPrimary && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-800">
                          PRIMARY ICE
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {contact.relationship}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleTogglePrimary(contact.id)}
                      className={`p-1.5 rounded-lg text-xs transition ${
                        contact.isPrimary
                          ? 'text-yellow-400 hover:bg-slate-800'
                          : 'text-slate-500 hover:text-yellow-400 hover:bg-slate-800'
                      }`}
                      title={contact.isPrimary ? 'Primary ICE contact' : 'Set as Primary ICE'}
                    >
                      <Star className={`w-4 h-4 ${contact.isPrimary ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => handleOpenEdit(contact)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                      title="Edit contact"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition"
                      title="Delete contact"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <div className="text-xs font-mono text-slate-300">
                    <div>{contact.phone}</div>
                    {contact.secondaryPhone && (
                      <div className="text-[11px] text-slate-400">Alt: {contact.secondaryPhone}</div>
                    )}
                  </div>

                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-md transition active:scale-95"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Now</span>
                  </a>
                </div>

                {contact.notes && (
                  <div className="text-[11px] text-slate-400 mt-2.5 bg-slate-950/60 p-2 rounded-xl border border-slate-800/60">
                    {contact.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: OFFICIAL REGIONAL EMERGENCY DIRECTORY */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-teal-400" />
              <span>Official Emergency Helplines</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified national civil defense, police, ambulance, and disaster lines.
            </p>
          </div>

          {/* Region Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Region:</span>
            <select
              value={selectedRegionCode}
              onChange={(e) => onSelectRegion(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              {REGIONAL_DIRECTORIES.map((reg) => (
                <option key={reg.countryCode} value={reg.countryCode}>
                  {reg.countryName} ({reg.countryCode})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* General Emergency */}
          <div className="p-4 rounded-2xl bg-red-950/40 border border-red-900/60 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <Shield className="w-5 h-5 text-red-400" />
              <span className="text-xl font-black text-white">{currentRegion.general}</span>
            </div>
            <div>
              <div className="text-xs font-bold text-white">National Emergency Number</div>
              <div className="text-[11px] text-slate-400 mb-3">All services & dispatch</div>
              <a
                href={`tel:${currentRegion.general}`}
                className="w-full py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                <PhoneCall className="w-3 h-3" />
                <span>Dial {currentRegion.general}</span>
              </a>
            </div>
          </div>

          {/* Police */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-xl font-black text-white">{currentRegion.police}</span>
            </div>
            <div>
              <div className="text-xs font-bold text-white">Police / Law Enforcement</div>
              <div className="text-[11px] text-slate-400 mb-3">Crime & immediate security</div>
              <a
                href={`tel:${currentRegion.police}`}
                className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                <PhoneCall className="w-3 h-3" />
                <span>Dial {currentRegion.police}</span>
              </a>
            </div>
          </div>

          {/* Fire */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="text-xl font-black text-white">{currentRegion.fire}</span>
            </div>
            <div>
              <div className="text-xs font-bold text-white">Fire & Rescue Service</div>
              <div className="text-[11px] text-slate-400 mb-3">Fire, hazmat & entrapment</div>
              <a
                href={`tel:${currentRegion.fire}`}
                className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                <PhoneCall className="w-3 h-3" />
                <span>Dial {currentRegion.fire}</span>
              </a>
            </div>
          </div>

          {/* Ambulance */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <HeartPulse className="w-5 h-5 text-rose-400" />
              <span className="text-xl font-black text-white">{currentRegion.ambulance}</span>
            </div>
            <div>
              <div className="text-xs font-bold text-white">Ambulance & Medical</div>
              <div className="text-[11px] text-slate-400 mb-3">Critical medical trauma</div>
              <a
                href={`tel:${currentRegion.ambulance}`}
                className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                <PhoneCall className="w-3 h-3" />
                <span>Dial {currentRegion.ambulance}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Specialized Hotlines (Disaster, Women, Childline) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {currentRegion.womenHelpline && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">Women's Safety Helpline</div>
                <div className="text-xs font-mono text-teal-400 font-bold">{currentRegion.womenHelpline}</div>
              </div>
              <a href={`tel:${currentRegion.womenHelpline}`} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
                <PhoneCall className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {currentRegion.childline && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">Child Helpline Emergency</div>
                <div className="text-xs font-mono text-teal-400 font-bold">{currentRegion.childline}</div>
              </div>
              <a href={`tel:${currentRegion.childline}`} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
                <PhoneCall className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {currentRegion.disaster && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">Disaster Management Helpline</div>
                <div className="text-xs font-mono text-teal-400 font-bold">{currentRegion.disaster}</div>
              </div>
              <a href={`tel:${currentRegion.disaster}`} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
                <PhoneCall className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-1">
              {editingContact ? 'Edit Emergency Contact' : 'Add Trusted Emergency Contact'}
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Configured contacts will appear on your SOS screen and quick dialers.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Relationship</label>
                  <input
                    type="text"
                    placeholder="e.g. Spouse, Parent, Doctor"
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Primary Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Alternative Phone (Optional)</label>
                <input
                  type="tel"
                  placeholder="e.g. Work or landline"
                  value={secondaryPhone}
                  onChange={(e) => setSecondaryPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Notes / Instructions</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Has spare house keys, lives 2 miles away"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isPrimaryCheckbox"
                  checked={isPrimary}
                  onChange={(e) => setIsPrimary(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 bg-slate-950 border-slate-700 focus:ring-teal-500"
                />
                <label htmlFor="isPrimaryCheckbox" className="text-xs text-slate-300 select-none cursor-pointer">
                  Set as Primary In Case of Emergency (ICE) Contact
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold transition"
                >
                  {editingContact ? 'Save Changes' : 'Add Contact'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
