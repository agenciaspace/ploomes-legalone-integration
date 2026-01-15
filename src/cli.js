#!/usr/bin/env node

/**
 * CLI Tool for Manual Operations
 * Usage: node src/cli.js <command> [args]
 */

require('dotenv').config();
const PloomesClient = require('./ploomesClient');
const LegalOneClient = require('./legalOneClient');
const SyncManager = require('./syncManager');

const ploomesClient = new PloomesClient(
  process.env.PLOOMES_API_KEY,
  process.env.PLOOMES_API_URL
);

const legalOneClient = new LegalOneClient(
  process.env.LEGALONE_API_URL,
  process.env.LEGALONE_API_KEY
);

const syncManager = new SyncManager(ploomesClient, legalOneClient);

const commands = {
  'sync-contact': async (contactId) => {
    if (!contactId) {
      console.error('Usage: node src/cli.js sync-contact <contactId>');
      process.exit(1);
    }
    console.log(`\n🔄 Syncing contact ${contactId}...\n`);
    const result = await syncManager.syncContact(parseInt(contactId));
    console.log('\n✅ Result:', JSON.stringify(result, null, 2));
  },

  'sync-deal': async (dealId) => {
    if (!dealId) {
      console.error('Usage: node src/cli.js sync-deal <dealId>');
      process.exit(1);
    }
    console.log(`\n🔄 Syncing deal ${dealId}...\n`);
    const result = await syncManager.syncDeal(parseInt(dealId));
    console.log('\n✅ Result:', JSON.stringify(result, null, 2));
  },

  'get-contact': async (contactId) => {
    if (!contactId) {
      console.error('Usage: node src/cli.js get-contact <contactId>');
      process.exit(1);
    }
    console.log(`\n📋 Fetching contact ${contactId} from Ploomes...\n`);
    const contact = await ploomesClient.getContact(parseInt(contactId));
    console.log(JSON.stringify(contact, null, 2));
  },

  'get-deal': async (dealId) => {
    if (!dealId) {
      console.error('Usage: node src/cli.js get-deal <dealId>');
      process.exit(1);
    }
    console.log(`\n📋 Fetching deal ${dealId} from Ploomes...\n`);
    const deal = await ploomesClient.getDeal(parseInt(dealId));
    console.log(JSON.stringify(deal, null, 2));
  },

  'stats': async () => {
    console.log('\n📊 Sync Statistics\n');
    const stats = syncManager.getStats();
    console.log(`  👥 Contacts Mapped: ${stats.totalContactsMapped}`);
    console.log(`  💼 Deals Mapped: ${stats.totalDealsMapped}`);
    console.log(`  📁 Sync Map Path: ${stats.syncMapPath}\n`);
  },

  'help': async () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║   Ploomes & Legal One Integration - CLI Tool              ║
╚════════════════════════════════════════════════════════════╝

Available Commands:

  sync-contact <id>    Sync a contact from Ploomes to Legal One
  sync-deal <id>       Sync a deal from Ploomes to Legal One
  get-contact <id>     Fetch contact details from Ploomes
  get-deal <id>        Fetch deal details from Ploomes
  stats                Show sync statistics
  help                 Show this help message

Examples:

  node src/cli.js sync-contact 12345
  node src/cli.js sync-deal 67890
  node src/cli.js get-contact 12345
  node src/cli.js stats

`);
  }
};

// Main CLI handler
async function main() {
  const command = process.argv[2];
  const args = process.argv.slice(3);

  if (!command || command === 'help' || command === '--help' || command === '-h') {
    await commands.help();
    process.exit(0);
  }

  if (!commands[command]) {
    console.error(`\n❌ Unknown command: ${command}\n`);
    console.error('Run "node src/cli.js help" for available commands\n');
    process.exit(1);
  }

  // Check API key
  if (!process.env.PLOOMES_API_KEY) {
    console.error('\n❌ ERROR: PLOOMES_API_KEY not configured');
    console.error('Please set PLOOMES_API_KEY in your .env file\n');
    process.exit(1);
  }

  try {
    await commands[command](...args);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (process.env.LOG_LEVEL === 'debug') {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Run CLI
if (require.main === module) {
  main();
}

module.exports = { commands };
