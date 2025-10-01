# API Documentation - Backend Integration Guide

This document outlines the API endpoints required for the Politrack Africa polling platform frontend to function properly.

## Base Configuration

```typescript
// Frontend configuration (config/baseUrl.ts)
export const baseURL = "http://localhost:8082"; // Primary API
export const baseURL2 = "http://localhost:8081"; // Secondary API
```

## Required API Endpoints

### Authentication

#### Admin Login

```http
POST /api/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### Poll Management

#### Get All Polls

```http
GET /api/polls
```

**Response:**

```json
[
  {
    "id": 1,
    "title": "Presidential Election 2024",
    "category": "Presidential",
    "presidential": "Presidential Election",
    "region": "Central",
    "county": "Nairobi",
    "constituency": "Westlands",
    "ward": "Parklands",
    "created_at": "2024-01-15T10:00:00Z",
    "voting_expires_at": "2024-01-30T23:59:59Z"
  }
]
```

#### Get Specific Poll

```http
GET /api/polls/{id}
```

**Response:**

```json
{
  "id": 1,
  "title": "Presidential Election 2024",
  "category": "Presidential",
  "presidential": "Presidential Election",
  "region": "Central",
  "county": "Nairobi",
  "constituency": "Westlands",
  "ward": "Parklands",
  "createdAt": "2024-01-15T10:00:00Z",
  "competitors": [
    {
      "id": 1,
      "name": "John Doe",
      "party": "Democratic Party",
      "profileImage": "https://example.com/profile1.jpg"
    }
  ],
  "questions": [
    {
      "id": 1,
      "type": "single-choice",
      "questionText": "Who is your preferred candidate?",
      "isCompetitorQuestion": true,
      "options": [
        {
          "id": 1,
          "optionText": "Option A"
        }
      ]
    }
  ]
}
```

#### Create Poll

```http
POST /api/polls
Content-Type: application/json

{
  "title": "Local Election 2024",
  "category": "Governor",
  "presidential": null,
  "region": "Central",
  "county": "Nairobi",
  "constituency": "Westlands",
  "ward": "Parklands",
  "voting_expires_at": "2024-02-15T23:59:59Z"
}
```

#### Update Poll

```http
PUT /api/polls/{id}
Content-Type: multipart/form-data

{
  "title": "Updated Poll Title",
  "category": "Governor",
  "region": "Central",
  "county": "Nairobi",
  "competitors": [
    {
      "name": "Jane Smith",
      "party": "Progressive Party",
      "profile_image": "<file>"
    }
  ]
}
```

#### Delete Poll

```http
DELETE /api/polls/{id}
```

### Voting System

#### Submit Vote

```http
POST /api/votes
Content-Type: application/json

{
  "pollId": 1,
  "respondentName": "Alice Johnson",
  "respondentGender": "Female",
  "respondentAge": "28",
  "responses": [
    {
      "questionId": 1,
      "selectedCompetitorId": 1,
      "selectedOptionId": null,
      "openEndedResponse": null
    }
  ]
}
```

#### Get Poll Results

```http
GET /api/polls/{id}/results
```

**Response:**

```json
{
  "poll": {
    "id": 1,
    "title": "Presidential Election 2024",
    "competitors": [...],
    "questions": [...]
  },
  "aggregatedResponses": [
    {
      "questionId": 1,
      "questionText": "Who is your preferred candidate?",
      "type": "single-choice",
      "totalResponses": 1000,
      "choices": [
        {
          "id": 1,
          "label": "John Doe",
          "count": 650,
          "percentage": 65.0
        }
      ]
    }
  ],
  "demographics": {
    "totalRespondents": 1000,
    "gender": [
      {
        "label": "Male",
        "count": 600,
        "percentage": 60.0
      }
    ],
    "ageRanges": [
      {
        "label": "18-25",
        "count": 200,
        "percentage": 20.0
      }
    ]
  }
}
```

### Blog Management

#### Create Blog Post

```http
POST /api/blogs/posts
Content-Type: multipart/form-data

{
  "title": "Election Updates",
  "content": "Blog content here...",
  "media": "<files>"
}
```

#### Get Blog Posts

```http
GET /api/blogs/posts
```

**Response:**

```json
[
  {
    "id": 1,
    "title": "Election Updates",
    "content": "Blog content...",
    "media_urls": ["https://example.com/media1.jpg"],
    "created_at": "2024-01-15T10:00:00Z"
  }
]
```

## Error Handling

All endpoints should return appropriate HTTP status codes and error messages:

### 400 Bad Request

```json
{
  "success": false,
  "message": "Invalid request data",
  "errors": {
    "title": ["Title is required"]
  }
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "message": "Authentication required"
}
```

### 403 Forbidden

```json
{
  "success": false,
  "message": "You have already voted in this poll."
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "Poll not found"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Internal server error occurred"
}
```

## Data Validation

### Poll Categories

- "Presidential"
- "Governor"
- "Senator"
- "MP"
- "MCA"

### Question Types

- "single-choice" - Single selection from options
- "open-ended" - Free text response
- "yes-no-notsure" - Three option choice

### Geographic Requirements

- Region (required)
- County (required)
- Constituency (optional)
- Ward (optional)

## CORS Configuration

Ensure your backend API allows requests from:

- `http://localhost:3001` (development)
- `https://admin.jitumemkenya.com` (production)

```javascript
// Example CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3001", "https://admin.jitumemkenya.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
```

## Security Considerations

1. **Authentication**: Implement JWT or session-based authentication
2. **Input Validation**: Validate all input data server-side
3. **File Upload Security**: Validate file types and sizes
4. **Rate Limiting**: Implement rate limiting for voting endpoints
5. **CSRF Protection**: Implement CSRF tokens for state-changing operations

---

This API documentation should help backend developers implement the required endpoints for the Politrack Africa polling platform.
