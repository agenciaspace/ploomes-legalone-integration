/**
 * Ploomes API Client
 * Handles communication with Ploomes CRM
 */

const https = require('https');

class PloomesClient {
  constructor(apiKey, apiUrl = 'https://api2.ploomes.com') {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  /**
   * Make HTTP request to Ploomes API
   * @param {string} method - HTTP method
   * @param {string} endpoint - API endpoint
   * @param {Object} body - Request body (optional)
   * @returns {Promise<Object>} API response
   */
  async request(method, endpoint, body = null) {
    const url = new URL(endpoint, this.apiUrl);
    
    const options = {
      method,
      headers: {
        'User-Key': this.apiKey,
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await fetch(url.toString(), {
        ...options,
        body: body ? JSON.stringify(body) : undefined
      });

      if (!response.ok) {
        throw new Error(`Ploomes API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Ploomes API request failed:', error);
      throw error;
    }
  }

  /**
   * Create a contact in Ploomes
   * @param {Object} contactData - Contact information
   * @returns {Promise<Object>} Created contact with ID
   */
  async createContact(contactData) {
    return this.request('POST', '/Contacts', contactData);
  }

  /**
   * Get contact details
   * @param {number} contactId - Contact ID
   * @returns {Promise<Object>} Contact details
   */
  async getContact(contactId) {
    return this.request('GET', `/Contacts(${contactId})`);
  }

  /**
   * Update contact
   * @param {number} contactId - Contact ID
   * @param {Object} updateData - Fields to update
   * @returns {Promise<Object>} Updated contact
   */
  async updateContact(contactId, updateData) {
    return this.request('PATCH', `/Contacts(${contactId})`, updateData);
  }

  /**
   * Create a deal in Ploomes
   * @param {Object} dealData - Deal information
   * @returns {Promise<Object>} Created deal with ID
   */
  async createDeal(dealData) {
    return this.request('POST', '/Deals', dealData);
  }

  /**
   * Get deal details
   * @param {number} dealId - Deal ID
   * @returns {Promise<Object>} Deal details
   */
  async getDeal(dealId) {
    return this.request('GET', `/Deals(${dealId})`);
  }

  /**
   * Update deal
   * @param {number} dealId - Deal ID
   * @param {Object} updateData - Fields to update
   * @returns {Promise<Object>} Updated deal
   */
  async updateDeal(dealId, updateData) {
    return this.request('PATCH', `/Deals(${dealId})`, updateData);
  }
}

module.exports = PloomesClient;
