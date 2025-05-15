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

### Version Control
```bash
# Stage all changes
git add .

# Commit changes with descriptive message
git commit -m "Brief description of changes"

# Push to remote repository
git push
```

You should commit and push changes frequently:
- After implementing a new feature
- After fixing a bug
- After refactoring code
- After updating documentation
- After making significant UI changes
- After completing a logical chunk of work

IMPORTANT: Always push after committing changes to ensure the remote repository stays up-to-date.

## Project Architecture

### Overview
This project is a responsive React application for displaying the ODSC Boston 2025 conference agenda. It allows users to filter sessions by ticket type and conference day, with preferences saved in local storage.

### Data Flow
1. Agenda data is stored in JSON format at `/data/agenda.json`
2. The application supports two data formats:
   - Original array format with specific fields
   - Mobile API format with nested response structure (success, data, version)
3. Data is automatically fetched via GitHub Actions every 30 minutes (if set up with proper secrets)
4. The main `AgendaDisplay` component loads and transforms the data to a compatible format
5. Users can filter by day using `DaySelector` and by ticket type using `FilterBar`
6. Individual sessions are displayed as `SessionCard` components

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
- Supports "All", "General", "Premium", "Platinum", "Gold", "Silver", and other ticket types
- Saves selected type in local storage
- Uses color-coded badges: blue for General, green for Premium, silver/slate for Platinum, and amber for Gold

#### SessionCard
Displays information about individual sessions:
- Collapsible cards with "Show More/Less" functionality
- Compact view shows basic info: title, time, duration, session type
- Expanded view shows full details: description, speaker info, tags, links, etc.
- Expanded view displays all available ticket types with color-coded badges
- Provides direct access to session resources (webinar links, Slack channels, etc.)
- Shows special indicators for unlockable content

#### LastUpdatedIndicator
Shows when agenda data was last updated:
- For the original format: uses the latest _updatedAt timestamp from sessions
- For the mobile API format: uses the version timestamp from the API response
- Displays the time in Eastern Time (ET)

### Known Issues and Solutions

#### Session Duplication Bug
When sessions appear duplicated while switching between days:
- Ensure session component keys include the day and index: `key={${selectedDay}-${session._id}-${index}}`
- Reset filtered sessions before applying new filters: `setFilteredSessions([])`
- Use a consistent filtering chain with immutable operations
- Add a fetch guard to prevent multiple data loads: `if (dataFetched) return;`

### Technologies
- React 19
- TypeScript
- Tailwind CSS
- Vite
- ShadCN UI / DaisyUI components

### Data Model
The application supports two data models with adapter logic to ensure compatibility:

#### Original Format (`SessionItem` interface)
- Fields like `_id`, `talkTitle`, `speakerName`, `access`, etc.
- Simple flat structure for each session
- Single speaker per session
- Topic tags in separate fields (topicTag1, topicTag2, etc.)

#### Mobile API Format
- Nested response with `success`, `data`, and metadata fields
- Session data in `data.sessions` array
- Renamed fields: `title` instead of `talkTitle`, `sessionType` instead of `subtrack`
- Multiple speakers in a `speakers` array with details for each
- Topics in a string array rather than separate fields
- Additional metadata like `isHighlighted`, `isNetworking`, and `isFavorite`
- Available ticket types as an array rather than a single field

The application maps between these formats to maintain consistent behavior regardless of data source.

### Timezone Handling
The application standardizes on Eastern Time (America/New_York) for consistency with the conference's physical location:
- Date formatting uses explicit America/New_York timezone
- Default day selection logic uses ET to determine the current day
- Adds 'T12:00:00' to date strings to avoid timezone offset issues
- Shows ET suffix on the last updated time

### API Integration
The application can be updated with new agenda data using:
1. Direct update of the data/agenda.json file
2. Calling the mobile API endpoint with curl:
   ```bash
   curl 'https://live.odsc.com/api/v1/mobile/agenda' > data/agenda.json
   ```
3. Automatic updates via GitHub Actions (if configured)

### Deployment Options
The project is configured for multiple deployment platforms:

#### Azure Static Web Apps
- Configured via `.github/workflows/azure-static-web-apps-calm-plant-070d8830f.yml`
- Uses `staticwebapp.config.json` for routing and MIME types
- Automatically deploys when changes are pushed to main

#### GitHub Pages
- Configured via `.github/workflows/github-pages.yml`
- Deploys to gh-pages branch when changes are pushed to main
- Alternative deployment method if Azure has issues

#### Netlify
- Configured via `netlify.toml`
- Supports SPA routing for React
- Can be linked to the GitHub repository for automatic deployments