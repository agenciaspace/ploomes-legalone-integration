/**
 * Tests for Legal One API Client
 */

const LegalOneClient = require('../src/legalOneClient');

describe('LegalOneClient', () => {
  let client;

  beforeEach(() => {
    client = new LegalOneClient('https://api.legalone.com.br', 'test-api-key');
  });

  test('should initialize with API URL and key', () => {
    expect(client.apiUrl).toBe('https://api.legalone.com.br');
    expect(client.apiKey).toBe('test-api-key');
  });

  test('should use default API URL if not provided', () => {
    const defaultClient = new LegalOneClient(null, 'test-key');
    expect(defaultClient.apiUrl).toBe('https://api.legalone.com.br');
  });

  describe('mapPloomesContactToLegalOne', () => {
    test('should map Ploomes contact fields to Legal One format', () => {
      const ploomesContact = {
        Name: 'Test Company',
        TypeId: 2,
        Email: 'test@example.com',
        Phones: [{ PhoneNumber: '11999999999' }]
      };

      const mapped = client.mapPloomesContactToLegalOne(ploomesContact);

      expect(mapped.client_name).toBe('Test Company');
      expect(mapped.entity_type).toBe(2);
      expect(mapped.primary_email).toBe('test@example.com');
      expect(mapped.contact_phones).toEqual(['11999999999']);
    });

    test('should handle contacts without phones', () => {
      const ploomesContact = {
        Name: 'Test Company',
        Email: 'test@example.com'
      };

      const mapped = client.mapPloomesContactToLegalOne(ploomesContact);

      expect(mapped.client_name).toBe('Test Company');
      expect(mapped.contact_phones).toBeUndefined();
    });
  });

  describe('mapPloomesDealToLegalOne', () => {
    test('should map Ploomes deal fields to Legal One format', () => {
      const ploomesdeal = {
        Title: 'Test Deal',
        Amount: 15000.00,
        StatusId: 1,
        ContactId: 123
      };

      const mapped = client.mapPloomesDealToLegalOne(ploomesdeal);

      expect(mapped.case_title).toBe('Test Deal');
      expect(mapped.case_value).toBe(15000.00);
      expect(mapped.case_status).toBe('pending');
      expect(mapped.client_id).toBe(123);
    });

    test('should map status correctly', () => {
      const deal1 = { StatusId: 2 };
      const mapped1 = client.mapPloomesDealToLegalOne(deal1);
      expect(mapped1.case_status).toBe('in_progress');

      const deal2 = { StatusId: 3 };
      const mapped2 = client.mapPloomesDealToLegalOne(deal2);
      expect(mapped2.case_status).toBe('completed');
    });
  });

  // TODO: Add tests for API methods (requires mocking fetch)
  // - createClient
  // - getClient
  // - updateClient
  // - createCase
  // - getCase
  // - updateCase
});
