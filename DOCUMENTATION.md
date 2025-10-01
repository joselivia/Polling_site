y# Politrack Africa - Comprehensive Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Features](#features)
5. [Project Structure](#project-structure)
6. [Setup and Installation](#setup-and-installation)
7. [Environment Configuration](#environment-configuration)
8. [API Integration](#api-integration)
9. [Component Documentation](#component-documentation)
10. [Deployment](#deployment)
11. [Contributing](#contributing)
12. [Troubleshooting](#troubleshooting)

---

## Project Overview

**Politrack Africa** is a comprehensive polling and voting platform designed for political opinion tracking across African regions. The application provides an admin interface for managing polls, creating blog posts, and analyzing voting results with detailed demographic breakdowns.

### Key Objectives

- Enable democratic opinion polling across African political landscapes
- Provide real-time voting and results visualization
- Support multiple poll types (Presidential, Regional, Local)
- Facilitate content management through integrated blogging system
- Generate comprehensive reports and analytics

---

## Architecture

### System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Custom        │    │   Backend API   │
│   (Next.js)     │◄──►│   Server        │◄──►│   (External)    │
│   Port: 3001    │    │   (Node.js)     │    │   Port: 8082    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Application Flow

1. **Authentication**: Admin login through secure authentication
2. **Poll Management**: Create, edit, and manage various poll types
3. **Voting Interface**: User-friendly voting experience
4. **Results Analysis**: Real-time results with demographic insights
5. **Content Management**: Blog post creation and management

---

## Technology Stack

### Frontend

- **Framework**: Next.js 15.4.2 (React 19.1.0)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React, React Icons
- **State Management**: Zustand 5.0.6
- **Data Fetching**: SWR 2.3.4, Axios 1.10.0

### Development Tools

- **PDF Generation**: html2pdf.js, react-pdf
- **Charts**: Recharts 3.1.0
- **UUID Generation**: uuid 11.1.0
- **Bundling**: Webpack 5.101.0

### Server Configuration

- **Custom Server**: Node.js HTTP server
- **Environment**: Development (localhost:3001), Production (admin.jitumemkenya.com)
- **Backend Integration**: REST API communication

---

## Features

### 🗳️ Polling System

- **Multi-level Geographic Targeting**: Region → County → Constituency → Ward
- **Poll Categories**: Presidential, Regional, Local Government
- **Question Types**:
  - Single-choice questions
  - Open-ended responses
  - Yes/No/Not Sure options
- **Competitor Management**: Add candidates with profiles and party affiliations
- **Expiry Management**: Time-bound polls with automatic closure

### 👤 Admin Dashboard

- **Secure Authentication**: Email/password login system
- **Poll Creation**: Intuitive poll creation wizard
- **Results Monitoring**: Real-time poll results and analytics
- **User Management**: Admin profile updates
- **Content Management**: Blog post creation and editing

### 📊 Analytics & Reporting

- **Vote Visualization**: Charts and graphs using Recharts
- **Demographic Analysis**: Geographic and demographic breakdowns
- **Export Functionality**: PDF report generation
- **Real-time Updates**: Live polling results

### 📝 Content Management

- **Blog System**: Create and manage blog posts
- **Media Support**: Image and video uploads
- **Rich Content**: Formatted text content
- **Publication Management**: Draft and publish workflows

### 🌍 Geographic Coverage

- **Kenya-Focused**: Comprehensive Kenyan administrative divisions
- **Scalable Design**: Architecture supports expansion to other African countries
- **Location-Based Polling**: Targeted polling by administrative levels

---

## Project Structure

```
polling_site/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Homepage (redirects to login)
│   │
│   ├── Login/                   # Authentication
│   │   ├── page.tsx            # Admin login page
│   │   └── update-admin/       # Admin profile updates
│   │
│   ├── Reports/                 # Main dashboard
│   │   └── page.tsx            # Admin dashboard with polls overview
│   │
│   ├── dummyCreatePoll/         # Poll creation
│   │   ├── createpoll/         # Poll creation form
│   │   │   ├── page.tsx        # Main creation interface
│   │   │   └── Places.tsx      # Geographic data definitions
│   │   └── CreateQuiz/         # Quiz-style polls
│   │
│   ├── PollVoting/             # Voting interface
│   │   └── [pollId]/           # Dynamic voting pages
│   │
│   ├── PollVotingResults/      # Results display
│   │   └── [pollId]/           # Dynamic results pages
│   │
│   ├── BlogPostForm/           # Content management
│   │   ├── page.tsx            # Blog creation form
│   │   ├── [id]/              # Blog editing
│   │   └── BlogList/          # Blog listing
│   │
│   ├── components/             # Reusable components
│   │   ├── AllPollsPage.tsx    # Polls listing component
│   │   ├── AllAspirantPoll.tsx # Aspirant polls component
│   │   ├── Navbar.tsx          # Navigation component
│   │   ├── Footer.tsx          # Footer component
│   │   ├── voterInterface.tsx  # Voting interface component
│   │   └── fullvotes.tsx       # Vote results component
│   │
│   ├── Event/                  # Event management
│   │   ├── page.tsx            # Event listing
│   │   └── RegisteredUsers/    # User registration management
│   │
│   ├── fullvotes/             # Detailed voting results
│   │   └── [id]/              # Dynamic vote details
│   │
│   ├── vote/                  # Vote casting
│   │   └── [id]/              # Dynamic vote pages
│   │
│   └── Thankyou/              # Post-vote confirmation
│       └── page.tsx           # Thank you page
│
├── config/                     # Configuration files
│   ├── baseUrl.ts             # API endpoint configuration
│   └── mediastore.ts          # Media storage configuration
│
├── public/                     # Static assets
│   └── logo.jpg               # Application logo
│
├── server.js                   # Custom Next.js server
├── package.json               # Dependencies and scripts
├── next.config.ts             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
├── postcss.config.mjs         # PostCSS configuration
└── README.md                  # Project documentation
```

---

## Setup and Installation

### Prerequisites

- **Node.js**: Version 18+ recommended
- **npm/yarn/pnpm**: Package manager
- **Git**: Version control

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/joselivia/Polling_site.git
   cd Polling_site
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**

   ```bash
   # Copy environment template
   cp .env.example .env.local

   # Edit environment variables
   nano .env.local
   ```

4. **Configure API Endpoints**
   Edit `config/baseUrl.ts`:

   ```typescript
   // Development
   export const baseURL = "http://localhost:8082";
   export const baseURL2 = "http://localhost:8081";

   // Production
   // export const baseURL = "https://politrackafrica.co.ke";
   ```

5. **Start Development Server**

   ```bash
   npm run dev
   ```

6. **Access Application**
   - Open browser to `http://localhost:3001`
   - Login with admin credentials

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

---

## Environment Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=3001
HOSTNAME=localhost

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8082
NEXT_PUBLIC_API_URL_SECONDARY=http://localhost:8081

# Production URLs
# NEXT_PUBLIC_API_URL=https://politrackafrica.co.ke
# HOSTNAME=admin.jitumemkenya.com

# Database Configuration (if applicable)
DATABASE_URL=your_database_url

# Authentication (if using external auth)
AUTH_SECRET=your_auth_secret

# Media Storage
MEDIA_STORAGE_PATH=/uploads
```

### Configuration Files

#### `config/baseUrl.ts`

```typescript
export const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8082";
export const baseURL2 =
  process.env.NEXT_PUBLIC_API_URL_SECONDARY || "http://localhost:8081";
```

#### `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["localhost", "politrackafrica.co.ke"],
  },
};

export default nextConfig;
```

---

## API Integration

### API Endpoints

The application integrates with external backend APIs:

#### Authentication

- `POST /api/login` - Admin authentication
- `POST /api/register` - User registration
- `POST /api/logout` - Session termination

#### Poll Management

- `GET /api/polls` - Fetch all polls
- `POST /api/polls` - Create new poll
- `GET /api/polls/:id` - Get specific poll
- `PUT /api/polls/:id` - Update poll
- `DELETE /api/polls/:id` - Delete poll

#### Voting

- `POST /api/votes` - Submit vote
- `GET /api/votes/:pollId` - Get poll results
- `GET /api/votes/:pollId/analytics` - Get detailed analytics

#### Blog Management

- `GET /api/blogs/posts` - Get all blog posts
- `POST /api/blogs/posts` - Create blog post
- `PUT /api/blogs/posts/:id` - Update blog post
- `DELETE /api/blogs/posts/:id` - Delete blog post

### API Integration Example

```typescript
// Fetch polls
const fetchPolls = async () => {
  try {
    const response = await fetch(`${baseURL}/api/polls`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching polls:", error);
    throw error;
  }
};

// Submit vote
const submitVote = async (pollId: number, responses: VoteResponse[]) => {
  try {
    const response = await fetch(`${baseURL}/api/votes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pollId,
        responses,
        sessionId: uuidv4(),
      }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error submitting vote:", error);
    throw error;
  }
};
```

---

## Component Documentation

### Core Components

#### `AllPollsPage.tsx`

**Purpose**: Displays all active polls in a grid layout

**Props**: None

**Features**:

- Fetches polls from API
- Responsive grid layout
- Loading and error states
- Admin-only features

**Usage**:

```tsx
import AllPollsPage from "./components/AllPollsPage";

<AllPollsPage />;
```

#### `Navbar.tsx`

**Purpose**: Main navigation component

**Features**:

- Responsive design
- Admin authentication status
- Navigation links

#### `voterInterface.tsx`

**Purpose**: Voting interface component

**Props**:

- `pollId`: Poll identifier
- `questions`: Array of poll questions
- `competitors`: Array of candidates

**Features**:

- Multi-question support
- Form validation
- Progress tracking

### Page Components

#### `Login/page.tsx`

**Purpose**: Admin authentication interface

**State**:

- `email`: Admin email
- `password`: Admin password
- `loading`: Authentication status
- `error`: Error messages

**Features**:

- Form validation
- Error handling
- Redirect on success

#### `dummyCreatePoll/createpoll/page.tsx`

**Purpose**: Poll creation wizard

**State**:

- Poll metadata (title, category, region, etc.)
- Geographic selections (cascading dropdowns)
- Submission status

**Features**:

- Multi-step form
- Geographic data integration
- Validation and error handling

### Utility Components

#### `Places.tsx`

**Purpose**: Geographic data definitions

**Exports**:

- `regionCountyMap`: Region to county mapping
- `countyConstituencyMap`: County to constituency mapping
- `countyAssemblyWardMap`: Constituency to ward mapping
- `CATEGORY_OPTIONS`: Poll categories
- `Presidential_category`: Presidential options

---

## Deployment

### Development Deployment

1. **Local Development**

   ```bash
   npm run dev
   ```

   Access at `http://localhost:3001`

2. **Backend Requirements**
   - Ensure backend API is running on port 8082
   - Database is properly configured
   - CORS is enabled for frontend domain

### Production Deployment

#### Option 1: Vercel (Recommended)

1. **Deploy to Vercel**

   ```bash
   npm install -g vercel
   vercel
   ```

2. **Environment Configuration**
   - Set production environment variables in Vercel dashboard
   - Update `baseURL` configuration for production

#### Option 2: Custom Server

1. **Build Application**

   ```bash
   npm run build
   ```

2. **Start Production Server**

   ```bash
   NODE_ENV=production npm start
   ```

3. **Process Management**
   ```bash
   # Using PM2
   npm install -g pm2
   pm2 start server.js --name "polling-site"
   ```

#### Option 3: Docker

1. **Create Dockerfile**

   ```dockerfile
   FROM node:18-alpine

   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production

   COPY . .
   RUN npm run build

   EXPOSE 3001
   CMD ["npm", "start"]
   ```

2. **Build and Run**
   ```bash
   docker build -t polling-site .
   docker run -p 3001:3001 polling-site
   ```

### Production Checklist

- [ ] Update `baseURL` to production API
- [ ] Set production environment variables
- [ ] Configure HTTPS
- [ ] Set up monitoring
- [ ] Configure backup strategy
- [ ] Test all features in production environment
- [ ] Set up error logging
- [ ] Configure CDN for static assets

---

## Contributing

### Development Guidelines

1. **Code Style**

   - Follow TypeScript best practices
   - Use ESLint and Prettier for formatting
   - Write meaningful commit messages

2. **Component Development**

   - Use functional components with hooks
   - Implement proper error handling
   - Add loading states for async operations

3. **Testing**

   ```bash
   # Run linting
   npm run lint

   # Run tests (when implemented)
   npm test
   ```

### Git Workflow

1. **Feature Development**

   ```bash
   git checkout -b feature/new-feature
   git commit -m "feat: add new feature"
   git push origin feature/new-feature
   ```

2. **Pull Request Process**
   - Create descriptive PR title
   - Add screenshots for UI changes
   - Request code review
   - Ensure CI passes

### Code Standards

- Use TypeScript for type safety
- Implement proper error boundaries
- Follow Next.js best practices
- Use semantic HTML
- Ensure accessibility compliance

---

## Troubleshooting

### Common Issues

#### 1. API Connection Issues

**Symptoms**:

- Failed to fetch polls
- Network errors
- CORS errors

**Solutions**:

```bash
# Check backend server status
curl http://localhost:8082/api/polls

# Verify CORS configuration
# Update baseURL in config/baseUrl.ts
```

#### 2. Authentication Problems

**Symptoms**:

- Login failures
- Redirect loops
- Session issues

**Solutions**:

```bash
# Clear browser storage
localStorage.clear()

# Check admin credentials
# Verify API endpoint
```

#### 3. Build Errors

**Symptoms**:

- TypeScript errors
- Missing dependencies
- Build failures

**Solutions**:

```bash
# Clear cache
rm -rf .next node_modules package-lock.json
npm install

# Check TypeScript configuration
npx tsc --noEmit
```

#### 4. Performance Issues

**Symptoms**:

- Slow loading
- Memory leaks
- High CPU usage

**Solutions**:

- Implement proper memoization
- Use React.lazy for code splitting
- Optimize images and assets
- Check for infinite re-renders

### Debugging Tools

1. **Next.js DevTools**

   ```bash
   # Enable debug mode
   DEBUG=* npm run dev
   ```

2. **Network Debugging**

   ```javascript
   // Add to components for API debugging
   useEffect(() => {
     console.log("API Response:", data);
   }, [data]);
   ```

3. **Performance Monitoring**
   ```javascript
   // Add performance tracking
   console.time("Component Render");
   // Component logic
   console.timeEnd("Component Render");
   ```

### Support

For additional support:

- Check GitHub Issues
- Review Next.js documentation
- Consult React documentation
- Review API documentation

---

## License

This project is proprietary software. All rights reserved.

---

## Changelog

### Version 0.1.0 (Current)

- Initial release
- Admin authentication system
- Poll creation and management
- Voting interface
- Results visualization
- Blog management system
- Geographic targeting system

---

_This documentation is maintained by the Politrack Africa development team. Last updated: October 2025_ 3. **CDN Integration**: Content delivery network 4. **Monitoring**: Application performance monitoring 5. **CI/CD Pipeline**: Automated deployment pipeline 6. **Error Tracking**: Sentry or similar error tracking 7. **Load Testing**: Performance under high load 8. **Security Audit**: Regular security assessments

---

_This documentation is maintained by the development team and should be updated with any significant changes to the application._
