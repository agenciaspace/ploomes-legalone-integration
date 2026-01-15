/**
 * Ploomes & Legal One Integration
 * Main entry point
 */

require('dotenv').config();
const PloomesClient = require('./ploomesClient');
const LegalOneClient = require('./legalOneClient');

// Initialize clients
const ploomesClient = new PloomesClient(
  process.env.PLOOMES_API_KEY,
  process.env.PLOOMES_API_URL
);

const legalOneClient = new LegalOneClient(
  process.env.LEGALONE_API_URL,
  process.env.LEGALONE_API_KEY
);

console.log('Ploomes & Legal One Integration starting...');
console.log('Configuration:');
console.log('- Ploomes API:', process.env.PLOOMES_API_URL || 'https://api2.ploomes.com');
console.log('- Legal One API:', process.env.LEGALONE_API_URL || 'Not configured');
console.log('- Sync Interval:', process.env.SYNC_INTERVAL || '3600', 'seconds');

/**
 * Sync workflow: Ploomes -> Legal One
 */
async function syncPloomesToLegalOne() {
  try {
    console.log('\n[SYNC] Starting Ploomes -> Legal One sync...');
    
    // TODO: Implement sync logic
    // 1. Fetch new/updated contacts from Ploomes
    // 2. Map to Legal One format
    // 3. Create/update in Legal One
    // 4. Store mapping for future reference
    
    console.log('[SYNC] Sync completed successfully');
  } catch (error) {
    console.error('[SYNC] Sync failed:', error.message);
  }
}

/**
 * Sync workflow: Legal One -> Ploomes
 */
async function syncLegalOneToPloomes() {
  try {
    console.log('\n[SYNC] Starting Legal One -> Ploomes sync...');
    
    // TODO: Implement sync logic
    // 1. Fetch updated cases from Legal One
    // 2. Map to Ploomes format
    // 3. Update deals/contacts in Ploomes
    
    console.log('[SYNC] Sync completed successfully');
  } catch (error) {
    console.error('[SYNC] Sync failed:', error.message);
  }
}

/**
 * Main sync loop
 */
async function startSyncLoop() {
  const interval = parseInt(process.env.SYNC_INTERVAL || '3600') * 1000;
  
  console.log('\n[SYNC] Starting sync loop...');
  
  // Run initial sync
  await syncPloomesToLegalOne();
  await syncLegalOneToPloomes();
  
  // Schedule periodic syncs
  setInterval(async () => {
    await syncPloomesToLegalOne();
    await syncLegalOneToPloomes();
  }, interval);
  
  console.log(`[SYNC] Sync loop active (interval: ${interval/1000}s)`);
}

// Start the integration service
if (require.main === module) {
  startSyncLoop().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = {
  ploomesClient,
  legalOneClient,
  syncPloomesToLegalOne,
  syncLegalOneToPloomes
};
