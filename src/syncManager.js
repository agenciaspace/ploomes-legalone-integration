/**
 * Sync Manager
 * Coordinates synchronization between Ploomes and Legal One
 */

const fs = require('fs');
const path = require('path');

class SyncManager {
  constructor(ploomesClient, legalOneClient) {
    this.ploomesClient = ploomesClient;
    this.legalOneClient = legalOneClient;
    this.syncMapPath = path.join(__dirname, '../data/sync-map.json');
    this.syncMap = this.loadSyncMap();
  }

  /**
   * Load sync mapping from file
   * @returns {Object} Sync mapping
   */
  loadSyncMap() {
    try {
      const dataDir = path.dirname(this.syncMapPath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      if (fs.existsSync(this.syncMapPath)) {
        return JSON.parse(fs.readFileSync(this.syncMapPath, 'utf8'));
      }
    } catch (error) {
      console.warn('Could not load sync map:', error.message);
    }

    return {
      contacts: {}, // ploomesId -> legalOneId
      deals: {}     // ploomesId -> legalOneId (case)
    };
  }

  /**
   * Save sync mapping to file
   */
  saveSyncMap() {
    try {
      const dataDir = path.dirname(this.syncMapPath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      fs.writeFileSync(this.syncMapPath, JSON.stringify(this.syncMap, null, 2));
    } catch (error) {
      console.error('Could not save sync map:', error.message);
    }
  }

  /**
   * Get Legal One client ID from Ploomes contact ID
   * @param {number} ploomesContactId - Ploomes contact ID
   * @returns {string|null} Legal One client ID or null
   */
  getLegalOneClientId(ploomesContactId) {
    return this.syncMap.contacts[ploomesContactId] || null;
  }

  /**
   * Map Ploomes contact to Legal One client
   * @param {number} ploomesContactId - Ploomes contact ID
   * @param {string} legalOneClientId - Legal One client ID
   */
  mapContact(ploomesContactId, legalOneClientId) {
    this.syncMap.contacts[ploomesContactId] = legalOneClientId;
    this.saveSyncMap();
  }

  /**
   * Map Ploomes deal to Legal One case
   * @param {number} ploomesdealId - Ploomes deal ID
   * @param {string} legalOneCaseId - Legal One case ID
   */
  mapDeal(ploomesdealId, legalOneCaseId) {
    this.syncMap.deals[ploomesdealId] = legalOneCaseId;
    this.saveSyncMap();
  }

  /**
   * Sync a contact from Ploomes to Legal One
   * @param {number} contactId - Ploomes contact ID
   * @returns {Promise<Object>} Sync result
   */
  async syncContact(contactId) {
    console.log(`\n[SYNC CONTACT] Syncing contact ${contactId}...`);

    try {
      // Get contact from Ploomes
      const ploomesContact = await this.ploomesClient.getContact(contactId);
      console.log(`[SYNC CONTACT] Retrieved contact: ${ploomesContact.value?.Name || ploomesContact.Name}`);

      // Sync to Legal One
      const legalOneClient = await this.legalOneClient.syncClient(
        ploomesContact.value || ploomesContact
      );
      
      const legalOneClientId = legalOneClient.id || legalOneClient.data?.id;
      console.log(`[SYNC CONTACT] Synced to Legal One (ID: ${legalOneClientId})`);

      // Store mapping
      this.mapContact(contactId, legalOneClientId);

      return {
        success: true,
        ploomesId: contactId,
        legalOneId: legalOneClientId
      };
    } catch (error) {
      console.error(`[SYNC CONTACT] Failed to sync contact ${contactId}:`, error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Sync a deal from Ploomes to Legal One
   * @param {number} dealId - Ploomes deal ID
   * @returns {Promise<Object>} Sync result
   */
  async syncDeal(dealId) {
    console.log(`\n[SYNC DEAL] Syncing deal ${dealId}...`);

    try {
      // Get deal from Ploomes
      const ploomesdeal = await this.ploomesClient.getDeal(dealId);
      const dealData = ploomesdeal.value || ploomesdeal;
      console.log(`[SYNC DEAL] Retrieved deal: ${dealData.Title}`);

      // Get or sync the related contact
      const contactId = dealData.ContactId;
      let legalOneClientId = this.getLegalOneClientId(contactId);

      if (!legalOneClientId) {
        console.log(`[SYNC DEAL] Contact ${contactId} not synced yet, syncing now...`);
        const contactSyncResult = await this.syncContact(contactId);
        if (!contactSyncResult.success) {
          throw new Error('Failed to sync related contact');
        }
        legalOneClientId = contactSyncResult.legalOneId;
      }

      // Sync deal to Legal One as a case
      const legalOneCase = await this.legalOneClient.syncDeal(dealData, legalOneClientId);
      const legalOneCaseId = legalOneCase.id || legalOneCase.data?.id;
      console.log(`[SYNC DEAL] Synced to Legal One (Case ID: ${legalOneCaseId})`);

      // Store mapping
      this.mapDeal(dealId, legalOneCaseId);

      return {
        success: true,
        ploomesId: dealId,
        legalOneId: legalOneCaseId
      };
    } catch (error) {
      console.error(`[SYNC DEAL] Failed to sync deal ${dealId}:`, error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Sync recent contacts from Ploomes to Legal One
   * @param {number} limit - Maximum number of contacts to sync
   * @returns {Promise<Object>} Sync results
   */
  async syncRecentContacts(limit = 10) {
    console.log(`\n[SYNC] Syncing recent contacts (limit: ${limit})...`);

    try {
      // Note: This is a simplified version. In production, you'd want to:
      // 1. Query contacts with a specific filter (e.g., created/modified since last sync)
      // 2. Handle pagination
      // 3. Track last sync timestamp

      const results = {
        total: 0,
        synced: 0,
        failed: 0,
        errors: []
      };

      console.log('[SYNC] Recent contacts sync would run here.');
      console.log('[SYNC] To implement: Query Ploomes API for recent contacts and sync each one.');

      return results;
    } catch (error) {
      console.error('[SYNC] Failed to sync recent contacts:', error.message);
      throw error;
    }
  }

  /**
   * Get sync statistics
   * @returns {Object} Sync statistics
   */
  getStats() {
    return {
      totalContactsMapped: Object.keys(this.syncMap.contacts).length,
      totalDealsMapped: Object.keys(this.syncMap.deals).length,
      syncMapPath: this.syncMapPath
    };
  }
}

module.exports = SyncManager;
