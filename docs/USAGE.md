# Usage Guide

## Prerequisites

1. **Node.js 16+** installed
2. **Ploomes API Key** (User-Key from your Ploomes account)
3. **Legal One API Key** (optional for demo, required for full integration)

## Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env and add your API keys
nano .env  # or use your preferred editor
```

## Configuration

Edit your `.env` file:

```bash
# Required - Get from Ploomes
PLOOMES_API_KEY=your_ploomes_user_key_here

# Optional for demo
LEGALONE_API_KEY=your_legalone_key_here
```

## Running the Service

### Continuous Sync Mode

Start the integration service to run continuous synchronization:

```bash
npm start
```

This will:
- Start the sync loop
- Run initial sync
- Schedule periodic syncs based on `SYNC_INTERVAL` (default: 1 hour)
- Keep running until you press Ctrl+C

### Development Mode with Auto-Reload

```bash
npm run dev
```

Changes to source files will automatically restart the service.

## Using the Demo Panel

Test the Ploomes API integration with the interactive demo panel:

```bash
npm run demo
# Or: open public/index.html
```

The demo panel allows you to:
1. Enter your Ploomes User-Key
2. Create test contacts
3. Generate opportunities
4. Update client status
5. View API call logs

## CLI Commands

### View Available Commands

```bash
npm run cli help
```

### Sync Operations

Sync a specific contact:
```bash
npm run sync:contact 12345
```

Sync a specific deal:
```bash
npm run sync:deal 67890
```

### Query Operations

Get contact details:
```bash
node src/cli.js get-contact 12345
```

Get deal details:
```bash
node src/cli.js get-deal 67890
```

### Statistics

View sync statistics:
```bash
npm run stats
```

Shows:
- Total contacts mapped
- Total deals mapped
- Sync map file location

## Integration Workflows

### Workflow 1: Contact Sync

When a contact is synced:

1. **Fetch** contact from Ploomes
2. **Map** fields to Legal One format
3. **Check** if client exists in Legal One (by tax ID)
4. **Create or Update** client in Legal One
5. **Store** mapping for future reference

### Workflow 2: Deal Sync

When a deal is synced:

1. **Fetch** deal from Ploomes
2. **Verify** related contact is synced
3. **Sync contact** if not already synced
4. **Map** deal fields to Legal One case format
5. **Create** case in Legal One
6. **Link** case to Legal One client
7. **Store** mapping for future reference

## Field Mappings

Field mappings are defined in `config/mapping.json`:

### Contact Fields

| Ploomes | Legal One |
|---------|-----------|
| Name | client_name |
| TypeId | entity_type |
| Email | primary_email |
| Phones | contact_phones |
| CNPJ/CPF | tax_id |

### Deal/Case Fields

| Ploomes | Legal One |
|---------|-----------|
| Title | case_title |
| Amount | case_value |
| StatusId | case_status |
| ContactId | client_id |

### Status Mappings

| Ploomes StatusId | Legal One Status |
|------------------|------------------|
| 1 | pending |
| 2 | in_progress |
| 3 | completed |
| 4 | cancelled |

## Data Persistence

Sync mappings are stored in `data/sync-map.json`:

```json
{
  "contacts": {
    "12345": "abc-def-ghi",
    "67890": "jkl-mno-pqr"
  },
  "deals": {
    "11111": "case-123",
    "22222": "case-456"
  }
}
```

This allows the integration to:
- Avoid duplicate syncs
- Track relationships between systems
- Resume from last state after restart

## Testing

### Run All Tests

```bash
npm test
```

### Run Specific Test File

```bash
npm test -- tests/legalOneClient.test.js
```

### Run Integration Tests

Integration tests require valid API credentials:

```bash
# Set credentials in .env first
npm test -- tests/integration.test.js
```

## Troubleshooting

### API Key Issues

**Error: PLOOMES_API_KEY not configured**
- Edit `.env` file
- Add your Ploomes User-Key
- Restart the service

### Legal One Not Configured

If Legal One API is not configured:
- The service will skip Legal One sync
- Demo panel will still work with Ploomes
- You'll see warning messages in logs

### CORS Issues with Demo Panel

The demo panel includes simulation mode if CORS blocks API calls:
- Use Firefox which handles CORS better
- Or deploy the panel using Firebase: `firebase deploy`
- Or use a CORS proxy in development

### Connection Issues

```bash
# Test Ploomes connection
node src/cli.js get-contact <any-valid-id>

# Check credentials
echo $PLOOMES_API_KEY  # Should not be empty
```

### Sync Issues

View detailed logs:
```bash
LOG_LEVEL=debug npm start
```

Check sync mappings:
```bash
cat data/sync-map.json
```

## Advanced Configuration

### Change Sync Interval

In `.env`:
```bash
SYNC_INTERVAL=1800  # 30 minutes (in seconds)
```

### Change Log Level

```bash
LOG_LEVEL=debug  # Options: debug, info, warn, error
```

### Customize Field Mappings

Edit `config/mapping.json` to match your specific requirements.

## Production Deployment

### Environment Setup

1. Create production `.env` file
2. Set secure API keys
3. Configure appropriate sync interval
4. Set log level to `info` or `warn`

### Process Management

Use a process manager like PM2:

```bash
# Install PM2
npm install -g pm2

# Start service
pm2 start src/index.js --name ploomes-legalone

# View logs
pm2 logs ploomes-legalone

# Monitor
pm2 monit

# Stop
pm2 stop ploomes-legalone
```

### Monitoring

Monitor:
- Application logs
- Sync statistics
- API error rates
- Sync success/failure ratios

## Support & Documentation

- Main README: `README.md`
- Quick Start: `QUICKSTART.md`
- Integration Details: `docs/LEGALONE_INTEGRATION.md`
- API Documentation:
  - Ploomes: https://developers.ploomes.com
  - Legal One: (Contact Legal One support)
