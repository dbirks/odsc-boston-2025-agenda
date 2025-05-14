# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Setup and Installation
```bash
# Install dependencies
pnpm install
```

### Development
```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint codebase
pnpm lint
```

## Project Architecture

### Overview
This project is a responsive React application for displaying the ODSC Boston 2025 conference agenda. It allows users to filter sessions by ticket type and conference day, with preferences saved in local storage.

### Data Flow
1. Agenda data is stored in JSON format at `/data/agenda.json`
2. Data is automatically fetched via GitHub Actions every 30 minutes (if set up with proper secrets)
3. The main `AgendaDisplay` component loads and filters the data
4. Users can filter by day using `DaySelector` and by ticket type using `FilterBar`
5. Individual sessions are displayed as `SessionCard` components

### Key Components

#### AgendaDisplay
The main component that:
- Loads agenda data from JSON
- Manages state for filtering (by ticket type and day)
- Filters sessions based on user selections
- Displays session cards

#### DaySelector
Allows users to switch between conference days:
- Saves selected day in local storage
- Default selection is the current day if it's a conference day, or the first day otherwise
- Uses Eastern Time (America/New_York) for date handling

#### FilterBar
Provides buttons to filter sessions by ticket type:
- Supports "All", "General", "Premium", "Platinum", and "Gold" ticket types
- Saves selected type in local storage

#### SessionCard
Displays information about individual sessions:
- Collapsible cards with "Show More/Less" functionality
- Compact view shows basic info: title, time, duration
- Expanded view shows full details: description, speaker info, tags, etc.
- Color-coded badges for different ticket types

#### LastUpdatedIndicator
Shows when agenda data was last updated based on metadata in the JSON.

### Technologies
- React 19
- TypeScript
- Tailwind CSS
- Vite
- ShadCN UI / DaisyUI components

### Data Model
The application revolves around the `SessionItem` interface as defined in `src/types.d.ts`:
- Contains details like session title, description, speaker info, date/time
- Includes metadata for filtering (active status, ticket type/access level)
- Supports various content fields like links, prerequisites, topic tags

### Timezone Handling
The application standardizes on Eastern Time (America/New_York) for consistency with the conference's physical location.