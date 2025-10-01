# Politrack Africa - Political Polling Platform

![Politrack Africa](./public/logo.jpg)

A comprehensive polling and voting platform designed for political opinion tracking across African regions. Built with Next.js, TypeScript, and Tailwind CSS.

## 🌟 Features

- **🗳️ Multi-Type Polling System**: Support for presidential, regional, and local polls
- **📊 Real-Time Analytics**: Live voting results with interactive charts
- **🌍 Geographic Targeting**: Region → County → Constituency → Ward level targeting
- **👤 Admin Dashboard**: Complete poll and content management system
- **📝 Integrated Blog System**: Content management for news and updates
- **📱 Responsive Design**: Mobile-first design for all devices
- **🔒 Secure Authentication**: Admin authentication and session management

## 🚀 Quick Start

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm**, **yarn**, or **pnpm**
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/joselivia/Polling_site.git
   cd Polling_site
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment**

   Create a `.env.local` file in the root directory:

   ```env
   # Server Configuration
   NODE_ENV=development
   PORT=3001
   HOSTNAME=localhost

   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:8082
   NEXT_PUBLIC_API_URL_SECONDARY=http://localhost:8081
   ```

4. **Update API endpoints**

   Edit `config/baseUrl.ts` for your backend URLs:

   ```typescript
   export const baseURL = "http://localhost:8082"; // Your backend API
   export const baseURL2 = "http://localhost:8081"; // Secondary API
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3001](http://localhost:3001)

## 🏗️ Technology Stack

- **Frontend**: Next.js 15.4.2, React 19.1.0, TypeScript 5
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts 3.1.0
- **Icons**: Lucide React, React Icons
- **State Management**: Zustand 5.0.6
- **HTTP Client**: Axios 1.10.0
- **PDF Generation**: html2pdf.js, react-pdf
- **Server**: Custom Node.js server

## 📁 Project Structure

```
polling_site/
├── app/                          # Next.js App Router
│   ├── Login/                   # Authentication pages
│   ├── Reports/                 # Admin dashboard
│   ├── dummyCreatePoll/         # Poll creation workflow
│   ├── PollVoting/             # Voting interface
│   ├── PollVotingResults/      # Results display
│   ├── BlogPostForm/           # Blog management
│   ├── components/             # Reusable components
│   └── ...
├── config/                     # Configuration files
│   ├── baseUrl.ts             # API endpoints
│   └── mediastore.ts          # Media configuration
├── public/                     # Static assets
├── server.js                   # Custom server
└── package.json               # Dependencies
```

## 🛠️ Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 🔧 Configuration

### Backend Integration

The application requires a backend API running on the configured ports. Update the API endpoints in `config/baseUrl.ts`:

```typescript
// Development
export const baseURL = "http://localhost:8082";
export const baseURL2 = "http://localhost:8081";

// Production
// export const baseURL = "https://yourdomain.com/api";
```

### Environment Variables

| Variable              | Description      | Default                 |
| --------------------- | ---------------- | ----------------------- |
| `NODE_ENV`            | Environment mode | `development`           |
| `PORT`                | Server port      | `3001`                  |
| `HOSTNAME`            | Server hostname  | `localhost`             |
| `NEXT_PUBLIC_API_URL` | Primary API URL  | `http://localhost:8082` |

## 🚀 Production Deployment

### Build and Deploy

```bash
# Build the application
npm run build

# Start production server
NODE_ENV=production npm start
```

### Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start application with PM2
pm2 start server.js --name "politrack-africa"

# Save PM2 configuration
pm2 save
pm2 startup
```

### Docker Deployment

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

## 📖 API Integration

The application integrates with external APIs for:

- **Poll Management**: Create, read, update, delete polls
- **Voting System**: Submit and retrieve votes
- **Authentication**: Admin login and session management
- **Blog Management**: Content creation and management

### Key Endpoints

- `GET /api/polls` - Fetch all polls
- `POST /api/polls` - Create new poll
- `POST /api/votes` - Submit vote
- `POST /api/login` - Admin authentication
- `POST /api/blogs/posts` - Create blog post

## 🔐 Authentication

The application uses admin authentication with:

- Email/password login system
- Session management via localStorage
- Protected admin routes
- Automatic logout functionality

## 🎨 UI Components

### Key Components

- **AllPollsPage**: Survey poll management
- **AllAspirantPoll**: Candidate poll management
- **voterInterface**: Voting interface
- **PollVotingResults**: Results visualization
- **BlogPostForm**: Content management

### Styling

- **Tailwind CSS** for utility-first styling
- **Responsive design** with mobile-first approach
- **Lucide React** for consistent iconography
- **Custom color schemes** for brand consistency

## 📊 Analytics & Reporting

- **Real-time vote tracking**
- **Demographic analysis** (age, gender, location)
- **Interactive charts** using Recharts
- **PDF export** functionality
- **Geographic voting patterns**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Use TypeScript for type safety
- Follow Next.js best practices
- Implement proper error handling
- Add loading states for async operations
- Write meaningful commit messages

## � Documentation

For comprehensive documentation, see [DOCUMENTATION.md](./DOCUMENTATION.md) which includes:

- Detailed architecture overview
- Component documentation
- API integration guide
- Deployment strategies
- Troubleshooting guide

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Errors**

   - Check backend server status
   - Verify API endpoints in `config/baseUrl.ts`
   - Ensure CORS is configured properly

2. **Build Errors**

   - Clear Next.js cache: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`
   - Check TypeScript errors: `npx tsc --noEmit`

3. **Authentication Issues**
   - Clear browser localStorage
   - Verify admin credentials
   - Check API endpoint configuration

## 📞 Support

For support and questions:

- 📧 Email: [your-email@example.com]
- 🐛 Issues: [GitHub Issues](https://github.com/joselivia/Polling_site/issues)
- 📖 Documentation: [DOCUMENTATION.md](./DOCUMENTATION.md)

## 📄 License

This project is proprietary software. All rights reserved.

---

## 🔄 Version History

- **v0.1.0** - Initial release with core polling functionality
- Admin authentication system
- Poll creation and management
- Voting interface and results
- Blog management system

---

**Politrack Africa** - Empowering democratic participation through technology.

_Last updated: October 2025_

### 📊 Analytics & Reporting

- **Interactive Charts**: Pie charts and bar graphs using Recharts
- **Demographic Analysis**: Voting patterns by age and gender
- **PDF Export**: Generate downloadable reports
- **Real-time Updates**: Live vote tracking

### 📱 User Experience

- **Responsive Design**: Mobile-first responsive interface
- **Vote Countdown**: Real-time voting deadline display
- **Duplicate Prevention**: Configurable multiple voting controls
- **Intuitive UI**: Clean, modern interface with Lucide icons

## 🛠️ Technology Stack

### Frontend

- **Framework**: Next.js 15.4.2 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand + React Hooks
- **Charts**: Recharts 3.1.0
- **Icons**: Lucide React + React Icons
- **HTTP Client**: Axios
- **PDF Generation**: html2pdf.js, react-pdf

### Backend Integration

- **Primary API**: Configurable backend endpoint
- **Authentication**: JWT-based admin authentication
- **File Upload**: Multipart form data for images/media

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (comes with Node.js)
- **Git**: For version control
- **Backend API**: The application requires a compatible backend API

### System Requirements

- **OS**: Windows, macOS, or Linux
- **Memory**: 4GB RAM minimum
- **Storage**: 500MB free space

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/joselivia/Polling_site.git
cd Polling_site
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:

- Next.js and React
- TypeScript and type definitions
- Tailwind CSS
- UI libraries (Lucide React, Recharts)
- Utility libraries (Axios, Zustand, UUID)

## ⚙️ Configuration

### 1. API Configuration

Edit `config/baseUrl.ts` to configure your backend endpoints:

```typescript
// config/baseUrl.ts
export const baseURL = "http://localhost:8082"; // Primary API endpoint
export const baseURL2 = "http://localhost:8081"; // Secondary API endpoint
```

### 2. Environment Variables

Create a `.env.local` file in the root directory (optional):

```bash
# .env.local
NODE_ENV=development
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:8082
```

### 3. Production Configuration

For production deployment, update the hostname in `server.js`:

```javascript
const hostname =
  process.env.NODE_ENV !== "production"
    ? "localhost"
    : "admin.jitumemkenya.com";
```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm run dev
```

The application will start on [http://localhost:3001](http://localhost:3001)

### Production Mode

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
polling_site/
├── app/                          # Next.js App Router
│   ├── components/               # Reusable UI components
│   │   ├── AllAspirantPoll.tsx  # Aspirant poll management
│   │   ├── AllPollsPage.tsx     # Survey poll management
│   │   ├── voterInterface.tsx   # Voting interface
│   │   ├── Navbar.tsx           # Navigation component
│   │   └── Footer.tsx           # Footer component
│   ├── dummyCreatePoll/         # Poll creation workflow
│   │   ├── createpoll/          # Basic poll setup
│   │   └── CreateQuiz/          # Question/survey creation
│   ├── PollVoting/[pollId]/     # Survey voting interface
│   ├── PollVotingResults/[pollId]/ # Survey results display
│   ├── vote/[id]/               # Aspirant voting interface
│   ├── fullvotes/[id]/          # Aspirant results display
│   ├── Login/                   # Authentication pages
│   ├── Reports/                 # Admin dashboard
│   ├── BlogPostForm/            # Blog management
│   ├── Event/                   # Event management
│   ├── Thankyou/                # Post-voting confirmation
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── config/                      # Configuration files
│   ├── baseUrl.ts              # API endpoints
│   └── mediastore.ts           # Media configuration
├── public/                      # Static assets
│   └── logo.jpg                # Site logo
├── server.js                   # Custom Next.js server
├── package.json                # Dependencies and scripts
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.mjs          # PostCSS configuration
└── README.md                   # This file
```

## 🔗 API Integration

### Required Backend Endpoints

The application expects the following API endpoints:

#### Authentication

- `POST /api/login` - Admin login

#### Polls Management

- `GET /api/polls` - Fetch all polls
- `POST /api/polls` - Create new poll
- `GET /api/polls/{id}` - Get specific poll
- `PUT /api/polls/{id}` - Update poll
- `DELETE /api/polls/{id}` - Delete poll
- `GET /api/polls/{id}/results` - Get poll results

#### Voting

- `POST /api/votes` - Submit vote

#### Blog Management

- `POST /api/blogs/posts` - Create blog post
- `GET /api/blogs/posts` - Get blog posts

### API Response Formats

Ensure your backend returns data in the expected formats. See `DOCUMENTATION.md` for detailed interface definitions.

## 📖 Usage

### For Administrators

1. **Login**: Access `/Login` and authenticate with admin credentials
2. **Dashboard**: Navigate to `/Reports` to view all polls
3. **Create Poll**: Use "Create Poll" button to start the poll creation wizard
4. **Manage Polls**: Edit, delete, or view results for existing polls
5. **Blog Management**: Create news articles and updates

### For Voters

1. **Access Poll**: Use the provided poll URL
2. **Vote**: Follow the voting interface to cast your vote
3. **View Results**: Access results page to see current standings

### Poll Types

#### Aspirant Polls (`/vote/[id]`)

- Vote for political candidates
- View candidate profiles and party affiliations
- Real-time countdown and results

#### Survey Polls (`/PollVoting/[pollId]`)

- Answer multiple questions
- Various question types (single-choice, open-ended, yes/no)
- Demographic data collection

## 🛠️ Development

### Adding New Features

1. **Components**: Add new components in `app/components/`
2. **Pages**: Create new pages in appropriate directories
3. **Styles**: Use Tailwind CSS classes for styling
4. **Types**: Define TypeScript interfaces for type safety

### Code Style Guidelines

- Use TypeScript for all new code
- Follow Next.js App Router conventions
- Use meaningful component and variable names
- Implement proper error handling
- Write responsive, mobile-first CSS

### Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:

- **Project Owner**: [joselivia](https://github.com/joselivia)
- **Issues**: [GitHub Issues](https://github.com/joselivia/Polling_site/issues)
- **Documentation**: See `DOCUMENTATION.md` for detailed technical documentation

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components powered by [Tailwind CSS](https://tailwindcss.com/)
- Charts by [Recharts](https://recharts.org/)
- Icons by [Lucide React](https://lucide.dev/)

---

**Politrack Africa** - Where Your Vote Counts 🗳️
