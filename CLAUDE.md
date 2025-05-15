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
3. Data is loaded at runtime from the `/data/agenda.json` file
4. The main `AgendaDisplay` component loads and transforms the data to a compatible format
5. Users can filter by day using `DaySelector` and by ticket type using dropdown `FilterBar`
6. Individual sessions are displayed as `SessionCard` components

### Key Components

#### AgendaDisplay
The main component that:
- Loads agenda data from JSON
- Manages state for filtering (by ticket type and day)
- Filters sessions based on user selections
- Displays session cards in order by start time
- Tracks current time to determine if sessions have ended
- Applies visual styling to differentiate past sessions

#### DaySelector
Allows users to switch between conference days:
- Centered buttons for better mobile experience
- Saves selected day in local storage
- Default selection is the current day if it's a conference day, or the first day otherwise
- Uses Eastern Time (America/New_York) for date handling

#### FilterBar
Provides filtering by ticket type:
- Dropdown menu with filter icon for space efficiency
- Supports "All", "Platinum", "Gold", "Silver", "VIP", "Bootcamp", "Expo", and Business ticket types
- Saves selected type in local storage
- Higher z-index to ensure dropdown appears above sticky elements

#### SessionCard
Displays information about individual sessions:
- Collapsible cards with multiple collapse options (header click, X button, Show Less button)
- Compact view shows basic info: title, time, duration, location, session type
- Expanded view shows full details organized into sections:
  - Description
  - Session Links (webinar, Slack, replay, details, prerequisites)
  - Access Levels (with distinct color-coded badges)
  - Session Details (type, difficulty, unlockable)
  - Topics
- Visual differentiation for past sessions (light gray background)
- Mobile-optimized with responsive text and badge truncation
- Uses forward slashes instead of bullets on small screens for better wrapping

#### LastUpdatedIndicator
Shows when agenda data was last updated:
- For the original format: uses the latest _updatedAt timestamp from sessions
- For the mobile API format: uses the version timestamp from the API response
- Displays the time in Eastern Time (ET)

### UI Features and Best Practices

#### Badge Color System
- Platinum: Gradient from indigo to purple (premium feel)
- Gold: Amber/gold background with amber text
- Silver: Slate gray background with white text
- VIP: Blue background with white text
- Expo: Green background with green text
- Bootcamp: Purple background with purple text
- 2-Day Business: Cyan background with cyan text
- 3-Day Business: Indigo background with indigo text

#### Mobile Responsiveness
- Different padding/spacing for mobile vs desktop
- Responsive typography (smaller on mobile)
- Badge text truncation when space is limited
- Forward slashes (/) instead of bullets (•) on mobile for better text wrapping
- Tighter spacing on mobile to maximize screen real estate

#### Past Session Styling
- Sessions that have ended have light gray background
- Text slightly darkened for past sessions
- Badge colors slightly muted with reduced opacity
- Header hover effects adjusted for past sessions
- End time-based logic (only gray out after session is completely over)

#### Session Card Interaction
- Multiple ways to collapse expanded cards:
  - Click on card header
  - Click close (X) button in top-right corner
  - Click "Show Less" button at bottom
- Visual hover feedback on interactive elements
- Organized content sections with clear headings
- Full text displayed when space allows, truncated when necessary

### Known Issues and Solutions

#### Session Duplication Bug
When sessions appear duplicated while switching between days:
- Ensure session component keys include the day and index: `key={${selectedDay}-${session._id}-${index}}`
- Reset filtered sessions before applying new filters: `setFilteredSessions([])`
- Use a consistent filtering chain with immutable operations
- Add a fetch guard to prevent multiple data loads: `if (dataFetched) return;`

#### Azure Static Web Apps MIME Type Issues
If the site shows a white screen or MIME type errors:
- Ensure proper MIME types are defined in `staticwebapp.config.json`
- Add routes for handling .tsx and .ts files to serve index.html instead
- Use relative paths for script and asset references (./assets/ instead of /assets/)
- Make sure to include the proper build commands in the GitHub Action workflow

#### Responsive Layout Issues
- Use conditional rendering for mobile vs desktop elements using sm: breakpoint
- Keep badge text visible using max-w-full on mobile, truncate only when absolutely needed
- Use whitespace-nowrap to prevent key information from breaking across lines
- Implement flex-wrap with appropriate gap settings for mobile

### Technologies
- React 19
- TypeScript
- Tailwind CSS with responsive design
- Vite
- ShadCN UI components
- Lucide React icons
- Plausible Analytics

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

### Deployment Options
The project is configured for Azure Static Web Apps:

#### Azure Static Web Apps
- Configured via `.github/workflows/azure-static-web-apps-calm-plant-070d8830f.yml`
- Uses `staticwebapp.config.json` for routing and MIME types
- Requires specific settings for proper single-page application routing:
  ```json
  {
    "navigationFallback": {
      "rewrite": "/index.html",
      "exclude": ["/assets/*", "/images/*", "/*.css", "/*.js"]
    },
    "routes": [
      {
        "route": "/assets/*",
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      {
        "route": "/data/*",
        "headers": {
          "content-type": "application/json"
        }
      },
      {
        "route": "/*.tsx",
        "serve": "/index.html",
        "statusCode": 200
      },
      {
        "route": "/*.ts",
        "serve": "/index.html",
        "statusCode": 200
      },
      {
        "route": "/*",
        "serve": "/index.html",
        "statusCode": 200
      }
    ],
    "mimeTypes": {
      ".json": "application/json",
      ".js": "text/javascript",
      ".css": "text/css",
      ".html": "text/html",
      ".svg": "image/svg+xml",
      ".tsx": "text/plain",
      ".ts": "text/plain"
    }
  }
  ```
- Automatically deploys when changes are pushed to main