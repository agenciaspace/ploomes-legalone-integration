# Ploomes & Legal One Integration

[![Deploy Status](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://ploomes-legalone-integration.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/agenciaspace/ploomes-legalone-integration)
[![License](https://img.shields.io/badge/License-ISC-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v24.2.0-brightgreen?logo=node.js)](https://nodejs.org)

Integration service that connects Ploomes CRM with Legal One legal management platform to synchronize data and automate workflows between the two systems.

## 🚀 Live Demo

**Try it now:** [https://ploomes-legalone-integration.vercel.app/index.html](https://ploomes-legalone-integration.vercel.app/index.html)

## Overview

This integration enables seamless data exchange between:
- **Ploomes**: A comprehensive CRM platform for managing sales pipelines, contacts, and business processes
- **Legal One**: A legal management platform for case management, document handling, and legal workflows

## ✨ Features

- 🔄 **Bi-directional data synchronization**
- ⏱️ **Real-time or scheduled sync operations**
- 🛠️ **Configurable field mappings**
- 🚨 **Error handling and logging**
- 🔐 **API authentication management**
- 🎮 **Interactive demo panel** for testing Ploomes API integration
- 🧹 **Data cleanup tools** with visual feedback
- 💾 **API key persistence** with localStorage
- ☁️ **Serverless API endpoints** on Vercel

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/agenciaspace/ploomes-legalone-integration.git
cd ploomes-legalone-integration

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env and add your PLOOMES_API_KEY

# Run tests
npm test

# Open demo panel
npm run demo
```

**Full documentation:** See [QUICKSTART.md](QUICKSTART.md) for a 5-minute setup guide.

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

## 📚 Documentation

- [QUICKSTART.md](QUICKSTART.md) - 5-minute setup guide
- [START_HERE.md](START_HERE.md) - Quick reference
- [COMO_TESTAR.md](COMO_TESTAR.md) - Local testing guide (Portuguese)
- [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) - Vercel deployment guide
- [docs/USAGE.md](docs/USAGE.md) - Detailed usage instructions
- [docs/CLEANUP.md](docs/CLEANUP.md) - Data cleanup guide
- [docs/LEGALONE_INTEGRATION.md](docs/LEGALONE_INTEGRATION.md) - Legal One integration details

## 🚀 Deployment

### Vercel (Production)

The project is deployed on Vercel and includes:
- ✅ Static demo panel
- ✅ Serverless API endpoints
- ✅ Automatic HTTPS
- ✅ Environment variables configured

```bash
# Deploy to production
vercel --prod --yes
```

**Live URL:** https://ploomes-legalone-integration.vercel.app

See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for detailed deployment instructions.

## 🛠️ Development

```bash
npm run dev      # Run with auto-reload
npm test         # Run tests
npm run lint     # Lint code
npm run cleanup  # Interactive data cleanup
npm run stats    # View sync statistics
```

## 💻 Available Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start sync service |
| `npm run dev` | Development mode with nodemon |
| `npm test` | Run Jest tests |
| `npm run demo` | Open demo panel in browser |
| `npm run cleanup` | Interactive cleanup tool |
| `npm run stats` | View sync statistics |
| `npm run cli` | CLI help |

## 🧪 API Endpoints

### Health Check
```
GET https://ploomes-legalone-integration.vercel.app/api/health
```

### Ploomes Proxy
```
POST https://ploomes-legalone-integration.vercel.app/api/ploomes
Content-Type: application/json

{
  "action": "createContact",
  "contactData": {
    "Name": "Cliente Teste",
    "Email": "teste@exemplo.com"
  }
}
```

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

ISC

## 👤 Author

Built with ❤️ by the Space Agency team
