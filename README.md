# ODSC Boston 2025 Agenda

A simple, responsive conference agenda viewer for ODSC Boston 2025.

## Features

- View the complete conference agenda
- Filter sessions by ticket type (General, Premium, Platinum, Gold)
- Toggle between conference days with easy day selector
- Expand session cards to see detailed information
- Preferences saved in browser local storage
- Responsive design works on mobile and desktop

## Development

### Prerequisites

- Node.js v18+ and pnpm

### Setup

1. Clone the repository
2. Install dependencies:
   ```
   pnpm install
   ```
3. Start the development server:
   ```
   pnpm dev
   ```

### Build

To build for production:
```
pnpm build
```

## Automated Data Updates

This repository includes a GitHub Action that automatically fetches updated agenda data every 30 minutes.

### Required Secrets

To enable the automated data updates, you need to add the following secrets to your GitHub repository:

- `AGENDA_API_URL`: The URL to fetch the agenda data from

And depending on your API's authentication method, one of the following:

- `AGENDA_API_TOKEN`: (Optional) Authentication token (Bearer token or Basic auth)
- `AGENDA_API_KEY`: (Optional) API key value for header-based authentication
- `AGENDA_API_KEY_HEADER`: (Optional) Custom header name for API key (defaults to 'x-api-key')

### How It Works

1. The action runs every 30 minutes
2. It fetches data from the specified API
3. It validates the data to ensure it's properly formatted
4. If the data has changed, it updates the repository
5. The changes are automatically committed and pushed

## Technologies

- React 19
- TypeScript
- Tailwind CSS
- Vite
- DaisyUI components