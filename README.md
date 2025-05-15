# ODSC Boston 2025 Agenda

A simple, responsive conference agenda viewer for ODSC Boston 2025, built with Claude Code.

## Features

- View the complete conference agenda
- Filter sessions by ticket type (Platinum, Gold, Silver, VIP, etc.)
- Toggle between conference days with easy day selector
- Color-coded session type badges for quick identification
- Expand session cards to see detailed information
- Preferences saved in browser local storage
- Responsive design works on mobile and desktop
- Visual distinction for past sessions

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

- Implementing unique color-coded badges for session types
- Optimizing the responsive design for mobile devices
- Creating an efficient filtering system
- Adding the GitHub repository link in the footer
- General code improvements and bug fixes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.