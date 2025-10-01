# Politrack Africa - Setup Guide

This guide will help you set up the Politrack Africa polling platform on your local machine.

## 🚀 Quick Setup

### 1. Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** or **pnpm**
- **Git** - [Download here](https://git-scm.com/)

### 2. Clone and Install

```bash
# Clone the repository
git clone https://github.com/joselivia/Polling_site.git
cd Polling_site

# Install dependencies
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Server Configuration
NODE_ENV=development
PORT=3001
HOSTNAME=localhost

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8082
NEXT_PUBLIC_API_URL_SECONDARY=http://localhost:8081

# Production URLs (uncomment for production)
# NEXT_PUBLIC_API_URL=https://politrackafrica.co.ke
# HOSTNAME=admin.jitumemkenya.com
```

### 4. Configure API Endpoints

Edit `config/baseUrl.ts` to match your backend:

```typescript
// config/baseUrl.ts
export const baseURL = "http://localhost:8082"; // Primary API
export const baseURL2 = "http://localhost:8081"; // Secondary API

// For production:
// export const baseURL = "https://politrackafrica.co.ke";
```

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3001](http://localhost:3001)

```bash
node --version    # Should be 18.0+
npm --version     # Should be 8.0+
```

### 2. Clone & Install

```bash
git clone https://github.com/joselivia/Polling_site.git
cd Polling_site
npm install
```

### 3. Configure API

Edit `config/baseUrl.ts`:

```typescript
export const baseURL = "YOUR_BACKEND_API_URL";
export const baseURL2 = "YOUR_SECONDARY_API_URL";
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3001](http://localhost:3001)

## 🔑 Admin Access

1. Navigate to [http://localhost:3001/Login](http://localhost:3001/Login)
2. Use your admin credentials
3. Access the dashboard at [http://localhost:3001/Reports](http://localhost:3001/Reports)

## 🏗️ Backend Requirements

Your backend API must provide these endpoints:

### Authentication

- `POST /api/login` - Admin login

### Polls

- `GET /api/polls` - List all polls
- `POST /api/polls` - Create poll
- `GET /api/polls/{id}` - Get specific poll
- `GET /api/polls/{id}/results` - Get results

### Voting

- `POST /api/votes` - Submit vote

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**

   ```bash
   lsof -ti:3001 | xargs kill -9
   ```

2. **API Connection Failed**

   - Check `config/baseUrl.ts` settings
   - Ensure backend server is running
   - Verify CORS settings on backend

3. **Build Errors**
   ```bash
   rm -rf .next node_modules
   npm install
   npm run build
   ```

### Getting Help

- 📖 Read full documentation: `DOCUMENTATION.md`
- 🐛 Report issues: [GitHub Issues](https://github.com/joselivia/Polling_site/issues)
- 💬 Contact: Project maintainers

## 🎯 Next Steps

1. **Configure Geographic Data**: Update `app/dummyCreatePoll/createpoll/Places.tsx`
2. **Customize Styling**: Modify Tailwind classes in components
3. **Add Features**: Extend existing components or create new ones
4. **Deploy**: Follow deployment guide in main README

---

Happy coding! 🎉
