# Legal One Integration Documentation

## Overview

This document describes the integration between Ploomes CRM and Legal One legal management platform.

## Integration Architecture

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Ploomes   │ <-----> │  Integration │ <-----> │ Legal One   │
│     CRM     │         │    Service   │         │   Platform  │
└─────────────┘         └──────────────┘         └─────────────┘
```

## Data Flow

### 1. Client Synchronization
- New clients created in Ploomes are automatically synced to Legal One
- Client updates in either system trigger bidirectional sync
- Contact information, company details, and legal status are synchronized

### 2. Case/Deal Mapping
- Ploomes Deals (opportunities) can be linked to Legal One cases
- Status updates flow between systems
- Document attachments are synchronized

### 3. Legal Validation Workflow
- When a legal validation is completed in Legal One, the client status is updated in Ploomes
- Automated notifications are sent to relevant stakeholders
- Audit trail is maintained in both systems

## API Endpoints

### Ploomes API
- Base URL: `https://api2.ploomes.com`
- Authentication: User-Key header
- Main endpoints:
  - `POST /Contacts` - Create client
  - `GET /Contacts({id})` - Get client details
  - `PATCH /Contacts({id})` - Update client
  - `POST /Deals` - Create opportunity
  - `GET /Deals({id})` - Get deal details
  - `PATCH /Deals({id})` - Update deal

### Legal One API
- Base URL: TBD (to be configured)
- Authentication: TBD (API key or OAuth)
- Main endpoints:
  - TBD - Create case
  - TBD - Update case status
  - TBD - Get case details

## Field Mappings

### Contact/Client Mapping

| Ploomes Field | Legal One Field | Notes |
|---------------|-----------------|-------|
| Name | client_name | Company or person name |
| TypeId | entity_type | 1=Person, 2=Company |
| Email | primary_email | Main contact email |
| Phones | contact_phones | Array of phone numbers |
| CNPJ/CPF | tax_id | Brazilian tax identification |

### Deal/Case Mapping

| Ploomes Field | Legal One Field | Notes |
|---------------|-----------------|-------|
| Title | case_title | Deal/case description |
| Amount | case_value | Monetary value |
| StatusId | case_status | Status mapping required |
| ContactId | client_id | Linked client reference |

## Configuration

### Environment Variables

```bash
# Ploomes Configuration
PLOOMES_API_URL=https://api2.ploomes.com
PLOOMES_API_KEY=your_user_key_here

# Legal One Configuration
LEGALONE_API_URL=https://api.legalone.com.br
LEGALONE_API_KEY=your_api_key_here

# Sync Settings
SYNC_INTERVAL=3600  # Sync every hour
SYNC_MODE=bidirectional  # or unidirectional
LOG_LEVEL=info
```

## Error Handling

The integration includes comprehensive error handling:
- API request failures with retry logic
- Data validation before sync
- Conflict resolution for simultaneous updates
- Detailed logging for troubleshooting

## Testing

Use the demo panel (`public/index.html`) to test the Ploomes API integration workflow before connecting to Legal One.

## Deployment

### Prerequisites
- Node.js 16+
- npm or yarn
- Ploomes Trial account with API access
- Legal One API credentials

### Steps
1. Clone the repository
2. Install dependencies: `npm install`
3. Configure environment variables in `.env`
4. Run tests: `npm test`
5. Start the service: `npm start`

## Monitoring

Monitor the integration using:
- Application logs (stdout/files)
- Error tracking
- Sync status dashboard (TBD)
- API call metrics

## Support

For issues or questions:
- Check logs for error details
- Verify API credentials
- Review field mappings
- Contact technical support
