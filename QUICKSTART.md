# Quick Start Guide

## Getting Started in 5 Minutes

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your API keys:
```bash
# Ploomes Configuration
PLOOMES_API_KEY=your_ploomes_user_key_here

# Legal One Configuration (optional for demo)
LEGALONE_API_URL=https://api.legalone.com.br
LEGALONE_API_KEY=your_legalone_key_here
```

### 3. Test with Demo Panel

The easiest way to test the Ploomes integration is using the interactive demo panel:

```bash
open public/index.html
```

Or serve it locally:
```bash
npx serve public
```

Then:
1. Enter your Ploomes User-Key
2. Click through the 3-step workflow:
   - Create a test client
   - Generate an opportunity
   - Update client status

### 4. Run the Integration Service

Start the backend integration service:

```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

### 5. Run Tests

```bash
npm test
```

## What's Next?

- **Configure Legal One API**: Update `src/legalOneClient.js` with actual Legal One API endpoints
- **Customize Field Mappings**: Edit `config/mapping.json` to match your data model
- **Set Sync Interval**: Adjust `SYNC_INTERVAL` in `.env` (in seconds)
- **Deploy Demo Panel**: Use `firebase deploy` to host the demo panel online

## Project Structure

```
├── public/              # Demo panel (open index.html in browser)
├── src/
│   ├── index.js         # Main integration service
│   ├── ploomesClient.js # Ploomes API wrapper
│   └── legalOneClient.js # Legal One API wrapper (stub)
├── config/
│   └── mapping.json     # Field and status mappings
├── tests/               # Unit tests
└── docs/                # Documentation
```

## Troubleshooting

### CORS Issues with Demo Panel
The demo panel includes fallback simulation mode if direct API calls are blocked by CORS. For production, deploy the panel or use a proxy.

### Missing Dependencies
If you get module errors, run:
```bash
npm install
```

### API Authentication Errors
- Verify your Ploomes User-Key is correct
- Check that your Ploomes trial is active
- Ensure the API endpoint is accessible

## Support

For more details, see:
- `README.md` - Full documentation
- `docs/LEGALONE_INTEGRATION.md` - Integration architecture
- Ploomes API Docs: https://developers.ploomes.com
