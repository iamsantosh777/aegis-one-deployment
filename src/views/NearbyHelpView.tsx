import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  MapPin, 
  Plus, 
  PhoneCall, 
  Navigation, 
  Trash2, 
  ExternalLink, 
  AlertCircle,
  Building2,
  Shield,
  Flame,
  Home,
  HeartPulse,
  Filter
} from 'lucide-react';
import { SafeLocation, SafeLocationCategory, SupportedLanguage, UserLocationState } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { calculateHaversineDistance } from '../hooks/useGeolocation';

interface NearbyHelpViewProps {
  language: SupportedLanguage;
  locations: SafeLocation[];
  onSaveLocations: (locs: SafeLocation[]) => void;
  userLocation: UserLocationState;
  isOnline: boolean;
  onRequestLocation: () => void;
}

export const NearbyHelpView: React.FC<NearbyHelpViewProps> = ({
  language,
  locations,
  onSaveLocations,
  userLocation,
  isOnline,
  onRequestLocation,
}) => {
  const t = TRANSLATIONS[language];
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<SafeLocation | null>(null);

  // Form state for adding custom safe location
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<SafeLocationCategory>('personal');
  const [newLat, setNewLat] = useState<string>('');
  const [newLng, setNewLng] = useState<string>('');
  const [newAddress, setNewAddress] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newNotes, setNewNotes] = useState('');

  // Calculate distance for all locations relative to user's position
  const enrichedLocations = locations.map((loc) => {
    if (userLocation.lat !== null && userLocation.lng !== null) {
      const distanceKm = calculateHaversineDistance(
        userLocation.lat,
        userLocation.lng,
        loc.lat,
        loc.lng
      );
      return { ...loc, distanceKm };
    }
    return loc;
  }).sort((a, b) => {
    if (a.distanceKm !== undefined && b.distanceKm !== undefined) {
      return a.distanceKm - b.distanceKm;
    }
    return 0;
  });

  const filteredLocations = enrichedLocations.filter((loc) => {
    if (selectedCategory === 'all') return true;
    return loc.category === selectedCategory;
  });

  // Create Custom SVG Markers for Leaflet
  const createCategoryIcon = (category: SafeLocationCategory) => {
    let color = '#2dd4bf'; // teal default
    let symbol = '📍';

    if (category === 'hospital') {
      color = '#ef4444';
      symbol = '🏥';
    } else if (category === 'police') {
      color = '#3b82f6';
      symbol = '🛡️';
    } else if (category === 'fire_station') {
      color = '#f97316';
      symbol = '🔥';
    } else if (category === 'shelter') {
      color = '#10b981';
      symbol = '⛺';
    } else if (category === 'personal') {
      color = '#a855f7';
      symbol = '⭐';
    }

    return L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div style="
          background-color: ${color};
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #ffffff;
          box-shadow: 0 4px 10px rgba(0,0,0,0.5);
          font-size: 16px;
          transform: translate(-16px, -16px);
        ">
          ${symbol}
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  };

  const createUserLocationIcon = () => {
    return L.divIcon({
      className: 'user-leaflet-marker',
      html: `
        <div style="position: relative; width: 36px; height: 36px; transform: translate(-18px, -18px);">
          <div style="position: absolute; inset: 0; border-radius: 50%; background-color: rgba(45, 212, 191, 0.4); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: relative; width: 100%; height: 100%; border-radius: 50%; background-color: #0f766e; border: 3px solid #ffffff; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 11px; box-shadow: 0 4px 12px rgba(0,0,0,0.6);">
            YOU
          </div>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    });
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Default center: User location or Delhi reference center
      const defaultLat = userLocation.lat || 28.5672;
      const defaultLng = userLocation.lng || 77.1990;

      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        attributionControl: true,
      }).setView([defaultLat, defaultLng], userLocation.lat ? 13 : 11);

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Sync Markers when locations, user position, or filter changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    // Add User location marker if available
    if (userLocation.lat !== null && userLocation.lng !== null) {
      const userMarker = L.marker([userLocation.lat, userLocation.lng], {
        icon: createUserLocationIcon(),
      }).bindPopup(`
        <div style="font-family: system-ui; padding: 4px;">
          <strong style="color: #2dd4bf; font-size: 13px;">Your Current Location</strong>
          <div style="font-size: 11px; color: #cbd5e1; margin-top: 4px;">
            Coordinates: ${userLocation.lat}, ${userLocation.lng}<br />
            Accuracy: ±${userLocation.accuracy}m
          </div>
        </div>
      `);
      markersLayerRef.current.addLayer(userMarker);
    }

    // Add Safe Location markers
    filteredLocations.forEach((loc) => {
      const marker = L.marker([loc.lat, loc.lng], {
        icon: createCategoryIcon(loc.category),
      }).bindPopup(`
        <div style="font-family: system-ui; padding: 4px; min-width: 180px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
            <strong style="color: #ffffff; font-size: 13px;">${loc.name}</strong>
          </div>
          <div style="font-size: 11px; color: #94a3b8; margin: 4px 0;">
            ${loc.address}
          </div>
          ${loc.distanceKm !== undefined ? `<div style="font-size: 11px; color: #2dd4bf; font-weight: bold; margin-bottom: 6px;">Distance: ${loc.distanceKm} km away</div>` : ''}
          ${loc.phone ? `<a href="tel:${loc.phone}" style="display: inline-block; padding: 4px 8px; background: #0f766e; color: white; border-radius: 6px; text-decoration: none; font-size: 11px; font-weight: bold;">Call: ${loc.phone}</a>` : ''}
        </div>
      `);

      marker.on('click', () => {
        setSelectedLocation(loc);
      });

      markersLayerRef.current!.addLayer(marker);
    });
  }, [filteredLocations, userLocation.lat, userLocation.lng]);

  const handlePanTo = (lat: number, lng: number) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([lat, lng], 15, { duration: 1.2 });
    }
  };

  const handleAddLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const latNum = parseFloat(newLat);
    const lngNum = parseFloat(newLng);

    if (isNaN(latNum) || isNaN(lngNum) || !newName.trim()) {
      alert('Please provide a valid location name and numeric coordinates.');
      return;
    }

    const newLoc: SafeLocation = {
      id: `custom-${Date.now()}`,
      name: newName.trim(),
      category: newCategory,
      lat: Number(latNum.toFixed(6)),
      lng: Number(lngNum.toFixed(6)),
      address: newAddress.trim() || 'Custom designated safe spot',
      phone: newPhone.trim() || undefined,
      notes: newNotes.trim() || undefined,
      isCustom: true,
    };

    const updated = [newLoc, ...locations];
    onSaveLocations(updated);
    setShowAddModal(false);

    // Reset inputs
    setNewName('');
    setNewLat('');
    setNewLng('');
    setNewAddress('');
    setNewPhone('');
    setNewNotes('');

    // Pan to newly added spot
    handlePanTo(newLoc.lat, newLoc.lng);
  };

  const handleDeleteLocation = (id: string) => {
    if (window.confirm('Delete this safe location from local storage?')) {
      const updated = locations.filter((loc) => loc.id !== id);
      onSaveLocations(updated);
      if (selectedLocation?.id === id) {
        setSelectedLocation(null);
      }
    }
  };

  const handleUseCurrentGpsForNewLocation = () => {
    if (userLocation.lat !== null && userLocation.lng !== null) {
      setNewLat(userLocation.lat.toString());
      setNewLng(userLocation.lng.toString());
    } else {
      onRequestLocation();
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <MapPin className="w-7 h-7 text-teal-400" />
            {t.nearby.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {t.nearby.subtitle}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-teal-950/40 transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>{t.nearby.addCustomLocation}</span>
        </button>
      </div>

      {/* Offline Leaflet Notice */}
      <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
        <AlertCircle className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {t.nearby.offlineNotice}
          {!isOnline && (
            <span className="block mt-1 font-semibold text-amber-300">
              Offline Mode active: Displaying saved coordinates and contact numbers.
            </span>
          )}
        </p>
      </div>

      {/* Interactive Category Filter Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'all', label: t.nearby.all, icon: <Building2 className="w-3.5 h-3.5" /> },
          { id: 'hospital', label: t.nearby.hospitals, icon: <HeartPulse className="w-3.5 h-3.5" /> },
          { id: 'police', label: t.nearby.police, icon: <Shield className="w-3.5 h-3.5" /> },
          { id: 'fire_station', label: t.nearby.fire, icon: <Flame className="w-3.5 h-3.5" /> },
          { id: 'shelter', label: t.nearby.shelters, icon: <Home className="w-3.5 h-3.5" /> },
          { id: 'personal', label: t.nearby.personal, icon: <MapPin className="w-3.5 h-3.5" /> },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat.id
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Map & List Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Leaflet Map Canvas */}
        <div className="lg:col-span-7 h-[380px] sm:h-[480px] rounded-3xl overflow-hidden border border-slate-800 relative shadow-xl">
          <div ref={mapContainerRef} className="w-full h-full z-10" />

          {/* Map Floating Control: Center on User Location */}
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={() => {
                if (userLocation.lat && userLocation.lng) {
                  handlePanTo(userLocation.lat, userLocation.lng);
                } else {
                  onRequestLocation();
                }
              }}
              className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-teal-400 border border-slate-700 shadow-xl transition active:scale-95 flex items-center gap-1.5 text-xs font-semibold"
              title="Locate Me on Map"
            >
              <Navigation className="w-4 h-4" />
              <span className="hidden sm:inline">My Position</span>
            </button>
          </div>
        </div>

        {/* Directory List of Safe Locations */}
        <div className="lg:col-span-5 space-y-3 h-[380px] sm:h-[480px] overflow-y-auto pr-1">
          {filteredLocations.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/40 border border-dashed border-slate-800 rounded-3xl">
              <MapPin className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-xs text-slate-400">No facilities found in this category.</p>
            </div>
          ) : (
            filteredLocations.map((loc) => {
              const isSelected = selectedLocation?.id === loc.id;
              return (
                <div
                  key={loc.id}
                  onClick={() => {
                    setSelectedLocation(loc);
                    handlePanTo(loc.lat, loc.lng);
                  }}
                  className={`p-4 rounded-2xl border transition cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-teal-500 shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white text-sm">{loc.name}</h3>
                        {loc.isCustom && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-950/80 text-purple-300 border border-purple-800">
                            CUSTOM
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1">{loc.address}</p>
                    </div>

                    {loc.distanceKm !== undefined && (
                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono font-bold text-teal-400">
                          {loc.distanceKm} km
                        </span>
                      </div>
                    )}
                  </div>

                  {loc.notes && (
                    <div className="text-[11px] text-slate-400 mt-2 bg-slate-950/50 p-2 rounded-lg border border-slate-800/60">
                      {loc.notes}
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-slate-800/60">
                    <div className="flex items-center gap-2">
                      {loc.phone && (
                        <a
                          href={`tel:${loc.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-600/20 hover:bg-teal-600 text-teal-300 hover:text-white text-xs font-semibold transition"
                        >
                          <PhoneCall className="w-3 h-3" />
                          <span>{loc.phone}</span>
                        </a>
                      )}
                      <a
                        href={`https://maps.google.com/?q=${loc.lat},${loc.lng}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Route</span>
                      </a>
                    </div>

                    {loc.isCustom && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteLocation(loc.id);
                        }}
                        className="p-1 rounded-md text-slate-500 hover:text-red-400 hover:bg-slate-800 transition"
                        title="Delete custom location"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* Add Custom Safe Location Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <Plus className="w-5 h-5 text-teal-400" />
              Save New Safe Location
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Add your home, evacuation shelter, neighborhood clinic, or relative's place.
            </p>

            <form onSubmit={handleAddLocationSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Location Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. My Residence, Neighborhood Bunker, Aunt's House"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as SafeLocationCategory)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="personal">Personal / Family</option>
                    <option value="shelter">Evacuation Shelter</option>
                    <option value="hospital">Hospital / Clinic</option>
                    <option value="police">Police Station</option>
                    <option value="fire_station">Fire Station</option>
                    <option value="safe_haven">Community Safe Haven</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 9876543210"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-slate-300">GPS Coordinates *</label>
                  <button
                    type="button"
                    onClick={handleUseCurrentGpsForNewLocation}
                    className="text-[11px] text-teal-400 hover:underline flex items-center gap-1"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Use Current Location</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    step="any"
                    required
                    placeholder="Latitude (e.g. 28.5672)"
                    value={newLat}
                    onChange={(e) => setNewLat(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                  <input
                    type="number"
                    step="any"
                    required
                    placeholder="Longitude (e.g. 77.1990)"
                    value={newLng}
                    onChange={(e) => setNewLng(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Physical Address</label>
                <input
                  type="text"
                  placeholder="Street name, landmark, colony"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Access Notes / Gate Codes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Spare key under planter, emergency solar generator in basement"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
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
                  Save Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
