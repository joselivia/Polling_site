# API Documentation

## Overview

This document outlines the API endpoints required for the Polling Site application. The frontend expects specific request/response formats for proper integration.

## Base Configuration

```typescript
// config/baseUrl.ts
export const baseURL = "http://localhost:8082"; // Primary API
export const baseURL2 = "http://localhost:8081"; // Secondary API
```

## Authentication

### Admin Login

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

## Poll Management

### Get All Polls

```http
GET /api/polls
```

**Response:**

```json
{
  "polls": [
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
      "voting_expires_at": "2024-01-30T23:59:59Z",
      "published": true,
      "totalVotes": 1250,
      "spoiled_votes": 5
    }
  ]
}
```

### Get Specific Poll

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
          "optionText": "Candidate A"
        }
      ]
    }
  ]
}
```

### Create Poll

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

**Response:**

```json
{
  "success": true,
  "message": "Poll created successfully",
  "id": 2,
  "poll": {
    "id": 2,
    "title": "Local Election 2024"
    // ... other poll data
  }
}
```

### Update Poll

```http
PUT /api/polls/{id}
Content-Type: multipart/form-data

title=Updated Poll Title
category=Governor
region=Central
county=Nairobi
constituency=Westlands
ward=Parklands
voting_expires_at=2024-02-20T23:59:59Z
competitors[0][name]=Jane Smith
competitors[0][party]=Progressive Party
competitors[0][profile_image]=<file>
```

### Delete Poll

```http
DELETE /api/polls/{id}
```

**Response:**

```json
{
  "success": true,
  "message": "Poll deleted successfully"
}
```

## Poll Results

### Get Poll Results

```http
GET /api/polls/{id}/results
```

**Response:**

```json
{
  "poll": {
    "id": 1,
    "title": "Presidential Election 2024",
    "category": "Presidential",
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
        "isCompetitorQuestion": true
      }
    ]
  },
  "aggregatedResponses": [
    {
      "questionId": 1,
      "questionText": "Who is your preferred candidate?",
      "type": "single-choice",
      "isCompetitorQuestion": true,
      "totalResponses": 1000,
      "choices": [
        {
          "id": 1,
          "label": "John Doe",
          "count": 650,
          "percentage": 65.0
        },
        {
          "id": 2,
          "label": "Jane Smith",
          "count": 350,
          "percentage": 35.0
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
      },
      {
        "label": "Female",
        "count": 400,
        "percentage": 40.0
      }
    ],
    "ageRanges": [
      {
        "label": "18-25",
        "count": 200,
        "percentage": 20.0
      },
      {
        "label": "26-35",
        "count": 350,
        "percentage": 35.0
      },
      {
        "label": "36-50",
        "count": 300,
        "percentage": 30.0
      },
      {
        "label": "50+",
        "count": 150,
        "percentage": 15.0
      }
    ]
  }
}
```

## Voting

### Submit Vote

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
    },
    {
      "questionId": 2,
      "selectedCompetitorId": null,
      "selectedOptionId": 3,
      "openEndedResponse": null
    },
    {
      "questionId": 3,
      "selectedCompetitorId": null,
      "selectedOptionId": null,
      "openEndedResponse": "This is my opinion on the topic."
    }
  ]
}
```

**Response:**

```json
{
  "success": true,
  "message": "Vote recorded successfully",
  "voteId": "uuid-vote-id"
}
```

### Submit Aspirant Vote (Alternative format)

```http
POST /api/votes
Content-Type: application/json

{
  "id": 1,
  "competitorId": 2,
  "voter_id": "uuid-voter-id"
}
```

## Blog Management

### Create Blog Post

```http
POST /api/blogs/posts
Content-Type: multipart/form-data

title=Election Updates
content=<rich_text_content>
media=<file1>
media=<file2>
```

**Response:**

```json
{
  "success": true,
  "message": "Blog post created successfully",
  "post": {
    "id": 1,
    "title": "Election Updates",
    "content": "...",
    "media_urls": [
      "https://example.com/media1.jpg",
      "https://example.com/media2.mp4"
    ],
    "created_at": "2024-01-15T10:00:00Z"
  }
}
```

### Get Blog Posts

```http
GET /api/blogs/posts
```

**Response:**

```json
{
  "posts": [
    {
      "id": 1,
      "title": "Election Updates",
      "content": "...",
      "media_urls": ["https://example.com/media1.jpg"],
      "created_at": "2024-01-15T10:00:00Z",
      "updated_at": "2024-01-15T10:00:00Z"
    }
  ]
}
```

## Error Responses

All endpoints should return appropriate HTTP status codes and error messages:

### 400 Bad Request

```json
{
  "success": false,
  "message": "Invalid request data",
  "errors": {
    "title": ["Title is required"],
    "email": ["Invalid email format"]
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

## Data Types and Validation

### Poll Categories

- "Presidential"
- "Governor"
- "Senator"
- "MP"
- "MCA"
- "Custom"

### Question Types

- "single-choice" - Single selection from options
- "open-ended" - Free text response
- "yes-no-notsure" - Three option choice

### Geographic Levels

- Region (required)
- County (required)
- Constituency (optional)
- Ward (optional)

### File Upload Requirements

- **Profile Images**: JPG, PNG, GIF (max 5MB)
- **Blog Media**: JPG, PNG, GIF, MP4, MOV (max 10MB)
- **Supported Formats**: multipart/form-data

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

## Rate Limiting

Consider implementing rate limiting for:

- Voting endpoints: 1 request per minute per IP
- Poll creation: 10 requests per hour per user
- Login attempts: 5 attempts per 15 minutes per IP

## Security Considerations

1. **Authentication**: Use JWT tokens for admin authentication
2. **Input Validation**: Validate all input data server-side
3. **File Upload Security**: Scan uploaded files for malware
4. **SQL Injection Prevention**: Use parameterized queries
5. **XSS Protection**: Sanitize user-generated content
6. **CSRF Protection**: Implement CSRF tokens for state-changing operations

---

This API documentation should help backend developers implement the required endpoints for the Polling Site application.
