# 🚀 Mini Social Post App

Production-ready backend for a mini social media platform.

## Setup

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and update MongoDB URI
3. Start: `npm start` or `npm run dev`

## API Endpoints

**Auth:**
- `POST /api/auth/signup`
- `POST /api/auth/login`

**Posts:**
- `POST /api/posts` (authenticated)
- `GET /api/posts?page=1&limit=10`
- `PUT /api/posts/:id/like` (authenticated)
- `POST /api/posts/:id/comment` (authenticated)

**Health:**
- `GET /health`
