// Vercel Serverless Function for Ploomes API
const fetch = require('node-fetch');

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Ploomes Client
class PloomesClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api2.ploomes.com';
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'User-Key': this.apiKey,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Ploomes API error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  async createContact(contactData) {
    return this.request('/Contacts', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  async getContact(contactId) {
    return this.request(`/Contacts(${contactId})`);
  }

  async searchContacts(filter) {
    const query = filter ? `?$filter=${encodeURIComponent(filter)}` : '';
    return this.request(`/Contacts${query}`);
  }

  async deleteContact(contactId) {
    return this.request(`/Contacts(${contactId})`, {
      method: 'DELETE',
    });
  }

  async createDeal(dealData) {
    return this.request('/Deals', {
      method: 'POST',
      body: JSON.stringify(dealData),
    });
  }

  async getDeal(dealId) {
    return this.request(`/Deals(${dealId})`);
  }

  async deleteDeal(dealId) {
    return this.request(`/Deals(${dealId})`, {
      method: 'DELETE',
    });
  }
}

module.exports = async (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  // Set CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  try {
    const apiKey = req.headers['x-api-key'] || process.env.PLOOMES_API_KEY;
    
    if (!apiKey) {
      return res.status(401).json({ 
        error: 'API key is required. Provide via x-api-key header or PLOOMES_API_KEY env variable.' 
      });
    }

    const client = new PloomesClient(apiKey);
    const { action, ...params } = req.body || {};

    switch (action) {
      case 'createContact':
        const contact = await client.createContact(params.contactData);
        return res.status(200).json(contact);

      case 'getContact':
        const contactData = await client.getContact(params.contactId);
        return res.status(200).json(contactData);

      case 'searchContacts':
        const contacts = await client.searchContacts(params.filter);
        return res.status(200).json(contacts);

      case 'deleteContact':
        await client.deleteContact(params.contactId);
        return res.status(200).json({ success: true });

      case 'createDeal':
        const deal = await client.createDeal(params.dealData);
        return res.status(200).json(deal);

      case 'getDeal':
        const dealData = await client.getDeal(params.dealId);
        return res.status(200).json(dealData);

      case 'deleteDeal':
        await client.deleteDeal(params.dealId);
        return res.status(200).json({ success: true });

      default:
        return res.status(400).json({ 
          error: 'Invalid action. Supported: createContact, getContact, searchContacts, deleteContact, createDeal, getDeal, deleteDeal' 
        });
    }
  } catch (error) {
    console.error('Ploomes API error:', error);
    return res.status(500).json({ 
      error: error.message || 'Internal server error' 
    });
  }
};
