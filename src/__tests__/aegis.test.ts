import { describe, it, expect } from 'vitest';
import { calculateHaversineDistance } from '../hooks/useGeolocation';
import { REGIONAL_DIRECTORIES, INITIAL_CHECKLIST, INITIAL_SAFETY_GUIDES } from '../services/storage';

describe('AEGIS ONE Safety Engine Unit Tests', () => {

  describe('Haversine Geolocation Distance Calculation', () => {
    it('calculates 0 distance for identical coordinates', () => {
      const distance = calculateHaversineDistance(28.5672, 77.1990, 28.5672, 77.1990);
      expect(distance).toBe(0);
    });

    it('calculates reasonable distance between New Delhi and Mumbai', () => {
      // New Delhi (28.6139, 77.2090) to Mumbai (19.0760, 72.8777) ~ 1150-1160 km
      const distance = calculateHaversineDistance(28.6139, 77.2090, 19.0760, 72.8777);
      expect(distance).toBeGreaterThan(1140);
      expect(distance).toBeLessThan(1180);
    });

    it('calculates short neighborhood distances accurately', () => {
      // 1 km difference roughly ~0.009 degrees latitude
      const distance = calculateHaversineDistance(28.5670, 77.2100, 28.5760, 77.2100);
      expect(distance).toBeCloseTo(1.0, 1);
    });
  });

  describe('Regional Emergency Directories', () => {
    it('provides India (IN) directory with 112 national emergency and 100, 101, 108', () => {
      const india = REGIONAL_DIRECTORIES.find((r) => r.countryCode === 'IN');
      expect(india).toBeDefined();
      expect(india?.general).toBe('112');
      expect(india?.police).toBe('100');
      expect(india?.fire).toBe('101');
      expect(india?.ambulance).toBe('108');
      expect(india?.womenHelpline).toBe('1091');
      expect(india?.childline).toBe('1098');
    });

    it('provides United States (US) directory with 911', () => {
      const us = REGIONAL_DIRECTORIES.find((r) => r.countryCode === 'US');
      expect(us).toBeDefined();
      expect(us?.general).toBe('911');
      expect(us?.police).toBe('911');
    });

    it('provides UK directory with 999 and European Union with 112', () => {
      const uk = REGIONAL_DIRECTORIES.find((r) => r.countryCode === 'GB');
      const eu = REGIONAL_DIRECTORIES.find((r) => r.countryCode === 'EU');
      expect(uk?.general).toBe('999');
      expect(eu?.general).toBe('112');
    });
  });

  describe('Preparedness Checklist & Offline Safety Guides', () => {
    it('contains essential life-support checklist items', () => {
      expect(INITIAL_CHECKLIST.length).toBeGreaterThanOrEqual(10);
      const waterItem = INITIAL_CHECKLIST.find((i) => i.id === 'c1');
      expect(waterItem).toBeDefined();
      expect(waterItem?.priority).toBe('critical');
      expect(waterItem?.completed).toBe(false);
    });

    it('includes critical CPR and Severe Bleeding emergency guides', () => {
      const cpr = INITIAL_SAFETY_GUIDES.find((g) => g.id === 'guide-cpr');
      const bleeding = INITIAL_SAFETY_GUIDES.find((g) => g.id === 'guide-bleeding');
      const earthquake = INITIAL_SAFETY_GUIDES.find((g) => g.id === 'guide-earthquake');

      expect(cpr).toBeDefined();
      expect(cpr?.urgencyLevel).toBe('immediate');
      expect(cpr?.steps.length).toBeGreaterThanOrEqual(4);

      expect(bleeding).toBeDefined();
      expect(bleeding?.dos.length).toBeGreaterThan(0);
      expect(bleeding?.donts.length).toBeGreaterThan(0);

      expect(earthquake).toBeDefined();
    });
  });

});
