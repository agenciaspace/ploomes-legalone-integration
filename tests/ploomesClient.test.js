/**
 * Tests for Ploomes API Client
 */

const PloomesClient = require('../src/ploomesClient');

describe('PloomesClient', () => {
  let client;

  beforeEach(() => {
    client = new PloomesClient('test-api-key', 'https://api2.ploomes.com');
  });

  test('should initialize with API key and URL', () => {
    expect(client.apiKey).toBe('test-api-key');
    expect(client.apiUrl).toBe('https://api2.ploomes.com');
  });

  test('should use default API URL if not provided', () => {
    const defaultClient = new PloomesClient('test-key');
    expect(defaultClient.apiUrl).toBe('https://api2.ploomes.com');
  });

  // TODO: Add more tests for API methods
  // - createContact
  // - getContact
  // - updateContact
  // - createDeal
  // - getDeal
  // - updateDeal
});
