# Ploomes & Legal One Integration

Integration service that connects Ploomes CRM with Legal One legal management platform to synchronize data and automate workflows between the two systems.

## Overview

This integration enables seamless data exchange between:
- **Ploomes**: A comprehensive CRM platform for managing sales pipelines, contacts, and business processes
- **Legal One**: A legal management platform for case management, document handling, and legal workflows

## Features

- Bi-directional data synchronization
- Real-time or scheduled sync operations
- Configurable field mappings
- Error handling and logging
- API authentication management
- Interactive demo panel for testing Ploomes API integration

## Project Structure

```
├── src/              # Source code for integration backend
├── public/           # Demo panel (HTML frontend)
│   └── index.html   # Interactive testing interface
├── config/           # Configuration files
├── tests/            # Test files
├── docs/             # Documentation
├── firebase.json     # Firebase hosting configuration
├── .env.example      # Environment variables template
└── package.json      # Project dependencies
```

## Demo Panel

The project includes an interactive demo panel (`public/index.html`) that demonstrates the Ploomes API integration workflow:

1. **Client Registration**: Creates a new contact in Ploomes CRM
2. **Deal Creation**: Creates an opportunity linked to the client
3. **Status Update**: Updates client information with legal validation status

### Running the Demo Panel

You can open the demo panel directly in your browser or deploy it using Firebase:

**Local Usage:**
```bash
open public/index.html
```

**Firebase Deployment:**
```bash
firebase deploy
```

## Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your API credentials
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the integration:
   ```bash
   npm start
   ```

## Configuration

Configure the integration by setting the following environment variables in your `.env` file:

- `PLOOMES_API_URL`: Ploomes API endpoint (default: https://api2.ploomes.com)
- `PLOOMES_API_KEY`: Ploomes API authentication key (User-Key)
- `LEGALONE_API_URL`: Legal One API endpoint
- `LEGALONE_API_KEY`: Legal One API authentication key
- `SYNC_INTERVAL`: Synchronization interval in seconds (default: 3600)
- `LOG_LEVEL`: Logging level (default: info)

## Development

```bash
npm run dev    # Run with auto-reload
npm test       # Run tests
npm run lint   # Lint code
```

## License

ISC
