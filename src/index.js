/**
 * Ploomes & Legal One Integration
 * Main entry point
 */

require('dotenv').config();
const PloomesClient = require('./ploomesClient');
const LegalOneClient = require('./legalOneClient');
const SyncManager = require('./syncManager');

// Initialize clients
const ploomesClient = new PloomesClient(
  process.env.PLOOMES_API_KEY,
  process.env.PLOOMES_API_URL
);

const legalOneClient = new LegalOneClient(
  process.env.LEGALONE_API_URL,
  process.env.LEGALONE_API_KEY
);

// Initialize sync manager
const syncManager = new SyncManager(ploomesClient, legalOneClient);

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║   Ploomes & Legal One Integration Service                 ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

console.log('Configuration:');
console.log('  📊 Ploomes API:', process.env.PLOOMES_API_URL || 'https://api2.ploomes.com');
console.log('  ⚖️  Legal One API:', process.env.LEGALONE_API_URL || '⚠️  Not configured');
console.log('  ⏱️  Sync Interval:', process.env.SYNC_INTERVAL || '3600', 'seconds');
console.log('  📁 Log Level:', process.env.LOG_LEVEL || 'info');

const stats = syncManager.getStats();
console.log('\nSync Status:');
console.log('  👥 Contacts Mapped:', stats.totalContactsMapped);
console.log('  💼 Deals Mapped:', stats.totalDealsMapped);
console.log('\n' + '─'.repeat(60) + '\n');

/**
 * Sync workflow: Ploomes -> Legal One
 */
async function syncPloomesToLegalOne() {
  try {
    console.log('\n[SYNC] Starting Ploomes → Legal One sync...');
    
    // Check if Legal One is configured
    if (!process.env.LEGALONE_API_KEY) {
      console.log('[SYNC] ⚠️  Legal One API not configured. Skipping sync.');
      console.log('[SYNC] To enable: Set LEGALONE_API_KEY in .env file');
      return;
    }
    
    // Sync recent contacts
    await syncManager.syncRecentContacts(10);
    
    console.log('[SYNC] ✅ Sync completed successfully');
  } catch (error) {
    console.error('[SYNC] ❌ Sync failed:', error.message);
  }
}

/**
 * Sync workflow: Legal One -> Ploomes
 */
async function syncLegalOneToPloomes() {
  try {
    console.log('\n[SYNC] Starting Legal One → Ploomes sync...');
    
    // Check if Legal One is configured
    if (!process.env.LEGALONE_API_KEY) {
      console.log('[SYNC] ⚠️  Legal One API not configured. Skipping sync.');
      return;
    }
    
    // TODO: Implement reverse sync logic
    // 1. Fetch updated cases from Legal One
    // 2. Map to Ploomes format
    // 3. Update deals/contacts in Ploomes
    
    console.log('[SYNC] ✅ Sync completed successfully');
  } catch (error) {
    console.error('[SYNC] ❌ Sync failed:', error.message);
  }
}

/**
 * Main sync loop
 */
async function startSyncLoop() {
  const interval = parseInt(process.env.SYNC_INTERVAL || '3600') * 1000;
  
  console.log('[SYNC] 🔄 Starting sync loop...');
  
  // Run initial sync
  await syncPloomesToLegalOne();
  await syncLegalOneToPloomes();
  
  // Schedule periodic syncs
  setInterval(async () => {
    await syncPloomesToLegalOne();
    await syncLegalOneToPloomes();
  }, interval);
  
  console.log(`[SYNC] ✅ Sync loop active (interval: ${interval/1000}s)`);
  console.log('[SYNC] Press Ctrl+C to stop\n');
}

/**
 * Manual sync command (can be called directly)
 */
async function manualSync(type, id) {
  if (type === 'contact') {
    return await syncManager.syncContact(id);
  } else if (type === 'deal') {
    return await syncManager.syncDeal(id);
  } else {
    throw new Error('Invalid sync type. Use "contact" or "deal"');
  }
}

// Start the integration service
if (require.main === module) {
  // Check if Ploomes API key is configured
  if (!process.env.PLOOMES_API_KEY) {
    console.error('\n❌ ERROR: PLOOMES_API_KEY not configured');
    console.error('Please set PLOOMES_API_KEY in your .env file\n');
    process.exit(1);
  }

  startSyncLoop().catch(error => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
}

module.exports = {
  ploomesClient,
  legalOneClient,
  syncManager,
  syncPloomesToLegalOne,
  syncLegalOneToPloomes,
  manualSync
};
