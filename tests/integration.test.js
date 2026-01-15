/**
 * Integration Tests
 * 
 * These tests require valid API credentials and should only be run
 * in a development/testing environment.
 * 
 * Run with: npm test -- tests/integration.test.js
 */

require('dotenv').config();
const PloomesClient = require('../src/ploomesClient');
const LegalOneClient = require('../src/legalOneClient');
const SyncManager = require('../src/syncManager');

describe('Integration Tests', () => {
  // Skip integration tests if API keys are not configured
  const shouldRunIntegrationTests = process.env.PLOOMES_API_KEY && process.env.LEGALONE_API_KEY;

  if (!shouldRunIntegrationTests) {
    test.skip('Integration tests skipped - API keys not configured', () => {});
    return;
  }

  let ploomesClient;
  let legalOneClient;
  let syncManager;

  beforeAll(() => {
    ploomesClient = new PloomesClient(
      process.env.PLOOMES_API_KEY,
      process.env.PLOOMES_API_URL
    );

    legalOneClient = new LegalOneClient(
      process.env.LEGALONE_API_URL,
      process.env.LEGALONE_API_KEY
    );

    syncManager = new SyncManager(ploomesClient, legalOneClient);
  });

  describe('Ploomes API', () => {
    test('should connect to Ploomes API', async () => {
      // This is a placeholder - actual implementation would test a real endpoint
      expect(ploomesClient.apiKey).toBeDefined();
    }, 10000);

    // Add more Ploomes API tests here
  });

  describe('Legal One API', () => {
    test('should connect to Legal One API', async () => {
      // This is a placeholder - actual implementation would test a real endpoint
      expect(legalOneClient.apiKey).toBeDefined();
    }, 10000);

    // Add more Legal One API tests here
  });

  describe('Sync Manager', () => {
    test('should load sync map', () => {
      const stats = syncManager.getStats();
      expect(stats).toHaveProperty('totalContactsMapped');
      expect(stats).toHaveProperty('totalDealsMapped');
    });

    // Add more sync tests here
  });
});
