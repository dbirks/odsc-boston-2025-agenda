# ODSC Boston 2025 Agenda

An alternative conference agenda viewer for ODSC Boston 2025, built with Claude Code.

## Features

- View the conference agenda
- Filter sessions by ticket type (Platinum, Gold, Silver, VIP, etc.)
  - With caching the selection in LocalStorage

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

### Deployment

This project is deployed on Vercel. The production site automatically updates when changes are pushed to the main branch.

## Technologies

- React 19
- TypeScript
- Tailwind CSS with responsive design
- Vite for fast development and builds
- ShadCN UI components
- Lucide React icons
- Plausible Analytics

## Development Notes

This project was built with the assistance of [Claude Code](https://claude.ai/code), Anthropic's AI coding assistant. Claude Code was used for:

- Everything :smiling:
