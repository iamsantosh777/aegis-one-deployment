import { useState, useEffect, useCallback } from 'react';
import { UserLocationState } from '../types';

export function useGeolocation() {
  const [location, setLocation] = useState<UserLocationState>({
    status: 'idle',
    lat: null,
    lng: null,
    accuracy: null,
    timestamp: null,
    error: null,
  });

  const [permissionState, setPermissionState] = useState<'granted' | 'prompt' | 'denied' | 'unsupported'>('prompt');

  // Check initial permission status if browser supports query
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('permissions' in navigator) || !navigator.geolocation) {
      setPermissionState('unsupported');
      return;
    }

    navigator.permissions
      .query({ name: 'geolocation' as PermissionName })
      .then((status) => {
        setPermissionState(status.state as 'granted' | 'prompt' | 'denied');
        status.onchange = () => {
          setPermissionState(status.state as 'granted' | 'prompt' | 'denied');
        };
      })
      .catch(() => {
        // Fallback for browsers that don't support geolocation permission query
        setPermissionState('prompt');
      });
  }, []);

  const requestLocation = useCallback(() => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setLocation({
        status: 'unavailable',
        lat: null,
        lng: null,
        accuracy: null,
        timestamp: null,
        error: 'Geolocation is not supported by your browser or environment.',
      });
      return;
    }

    setLocation((prev) => ({ ...prev, status: 'requesting', error: null }));

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setLocation({
          status: 'granted',
          lat: Number(latitude.toFixed(6)),
          lng: Number(longitude.toFixed(6)),
          accuracy: Math.round(accuracy),
          timestamp: position.timestamp || Date.now(),
          error: null,
        });
        setPermissionState('granted');
      },
      (err: GeolocationPositionError) => {
        let errorMsg = 'An unknown error occurred while retrieving your location.';
        let errorStatus: UserLocationState['status'] = 'unavailable';

        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMsg = 'Location permission was denied. Please allow location access in your browser settings to share your coordinates.';
            errorStatus = 'denied';
            setPermissionState('denied');
            break;
          case err.POSITION_UNAVAILABLE:
            errorMsg = 'Location information is currently unavailable. Ensure GPS is enabled or try stepping outside.';
            errorStatus = 'unavailable';
            break;
          case err.TIMEOUT:
            errorMsg = 'Location request timed out. Retrying may succeed with a clearer GPS view.';
            errorStatus = 'timeout';
            break;
        }

        setLocation({
          status: errorStatus,
          lat: null,
          lng: null,
          accuracy: null,
          timestamp: Date.now(),
          error: errorMsg,
        });
      },
      options
    );
  }, []);

  // Format shareable links
  const getGoogleMapsUrl = useCallback(() => {
    if (location.lat === null || location.lng === null) return null;
    return `https://maps.google.com/?q=${location.lat},${location.lng}`;
  }, [location.lat, location.lng]);

  const getOpenStreetMapUrl = useCallback(() => {
    if (location.lat === null || location.lng === null) return null;
    return `https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lng}#map=16/${location.lat}/${location.lng}`;
  }, [location.lat, location.lng]);

  return {
    location,
    permissionState,
    requestLocation,
    getGoogleMapsUrl,
    getOpenStreetMapUrl,
  };
}

/**
 * Calculates Haversine distance between two coordinates in kilometers.
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(2));
}
