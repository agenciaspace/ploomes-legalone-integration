/**
 * Legal One API Client
 * Handles communication with Legal One platform
 * 
 * Note: This implementation is based on common REST API patterns.
 * Adjust endpoints and authentication as needed based on Legal One's actual API documentation.
 */

const mappings = require('../config/mapping.json');

class LegalOneClient {
  constructor(apiUrl, apiKey) {
    this.apiUrl = apiUrl || 'https://api.legalone.com.br';
    this.apiKey = apiKey;
  }

  /**
   * Make HTTP request to Legal One API
   * @param {string} method - HTTP method
   * @param {string} endpoint - API endpoint
   * @param {Object} body - Request body (optional)
   * @returns {Promise<Object>} API response
   */
  async request(method, endpoint, body = null) {
    if (!this.apiKey) {
      throw new Error('Legal One API key not configured');
    }

    const url = new URL(endpoint, this.apiUrl);
    
    const options = {
      method,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url.toString(), options);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Legal One API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      // Handle 204 No Content responses
      if (response.status === 204) {
        return { success: true };
      }

      return await response.json();
    } catch (error) {
      console.error('Legal One API request failed:', error);
      throw error;
    }
  }

  /**
   * Create a new client in Legal One
   * @param {Object} clientData - Client information
   * @returns {Promise<Object>} Created client with ID
   */
  async createClient(clientData) {
    return this.request('POST', '/api/v1/clients', clientData);
  }

  /**
   * Get client details
   * @param {string} clientId - Client ID
   * @returns {Promise<Object>} Client details
   */
  async getClient(clientId) {
    return this.request('GET', `/api/v1/clients/${clientId}`);
  }

  /**
   * Update client
   * @param {string} clientId - Client ID
   * @param {Object} updateData - Fields to update
   * @returns {Promise<Object>} Updated client
   */
  async updateClient(clientId, updateData) {
    return this.request('PATCH', `/api/v1/clients/${clientId}`, updateData);
  }

  /**
   * Search for client by tax ID (CPF/CNPJ)
   * @param {string} taxId - Tax ID
   * @returns {Promise<Object|null>} Client if found, null otherwise
   */
  async findClientByTaxId(taxId) {
    try {
      const response = await this.request('GET', `/api/v1/clients?tax_id=${taxId}`);
      return response.data && response.data.length > 0 ? response.data[0] : null;
    } catch (error) {
      console.warn('Error searching for client:', error.message);
      return null;
    }
  }

  /**
   * Create a new case in Legal One
   * @param {Object} caseData - Case information
   * @returns {Promise<Object>} Created case with ID
   */
  async createCase(caseData) {
    return this.request('POST', '/api/v1/cases', caseData);
  }

  /**
   * Get case details
   * @param {string} caseId - Case ID
   * @returns {Promise<Object>} Case details
   */
  async getCase(caseId) {
    return this.request('GET', `/api/v1/cases/${caseId}`);
  }

  /**
   * Update case
   * @param {string} caseId - Case ID
   * @param {Object} updateData - Fields to update
   * @returns {Promise<Object>} Updated case
   */
  async updateCase(caseId, updateData) {
    return this.request('PATCH', `/api/v1/cases/${caseId}`, updateData);
  }

  /**
   * Update case status
   * @param {string} caseId - Case ID
   * @param {string} status - New status
   * @returns {Promise<Object>} Updated case
   */
  async updateCaseStatus(caseId, status) {
    return this.updateCase(caseId, { case_status: status });
  }

  /**
   * Map Ploomes contact to Legal One client format
   * @param {Object} ploomesContact - Contact from Ploomes
   * @returns {Object} Legal One client format
   */
  mapPloomesContactToLegalOne(ploomesContact) {
    const mapped = {};
    const contactMapping = mappings.fieldMappings.contact.ploomes_to_legalone;

    for (const [ploomesField, legalOneField] of Object.entries(contactMapping)) {
      if (ploomesContact[ploomesField] !== undefined) {
        mapped[legalOneField] = ploomesContact[ploomesField];
      }
    }

    // Handle phone numbers
    if (ploomesContact.Phones && ploomesContact.Phones.length > 0) {
      mapped.contact_phones = ploomesContact.Phones.map(p => p.PhoneNumber);
    }

    return mapped;
  }

  /**
   * Map Ploomes deal to Legal One case format
   * @param {Object} ploomesdeal - Deal from Ploomes
   * @returns {Object} Legal One case format
   */
  mapPloomesDealToLegalOne(ploomesdeal) {
    const mapped = {};
    const dealMapping = mappings.fieldMappings.deal.ploomes_to_legalone;

    for (const [ploomesField, legalOneField] of Object.entries(dealMapping)) {
      if (ploomesdeal[ploomesField] !== undefined) {
        // Map status using status mappings
        if (ploomesField === 'StatusId') {
          const statusMapping = mappings.statusMappings.ploomes_to_legalone;
          mapped[legalOneField] = statusMapping[ploomesdeal[ploomesField].toString()] || 'pending';
        } else {
          mapped[legalOneField] = ploomesdeal[ploomesField];
        }
      }
    }

    return mapped;
  }

  /**
   * Sync client from Ploomes to Legal One
   * @param {Object} ploomesContact - Contact from Ploomes
   * @returns {Promise<Object>} Legal One client
   */
  async syncClient(ploomesContact) {
    const legalOneClientData = this.mapPloomesContactToLegalOne(ploomesContact);
    
    // Try to find existing client by tax ID
    let existingClient = null;
    if (legalOneClientData.tax_id) {
      existingClient = await this.findClientByTaxId(legalOneClientData.tax_id);
    }

    if (existingClient) {
      console.log(`Client already exists in Legal One (ID: ${existingClient.id}), updating...`);
      return this.updateClient(existingClient.id, legalOneClientData);
    } else {
      console.log('Creating new client in Legal One...');
      return this.createClient(legalOneClientData);
    }
  }

  /**
   * Sync deal from Ploomes to Legal One as a case
   * @param {Object} ploomesdeal - Deal from Ploomes
   * @param {string} legalOneClientId - Legal One client ID
   * @returns {Promise<Object>} Legal One case
   */
  async syncDeal(ploomesdeal, legalOneClientId) {
    const legalOneCaseData = this.mapPloomesDealToLegalOne(ploomesdeal);
    legalOneCaseData.client_id = legalOneClientId;
    
    console.log('Creating case in Legal One...');
    return this.createCase(legalOneCaseData);
  }
}

module.exports = LegalOneClient;
