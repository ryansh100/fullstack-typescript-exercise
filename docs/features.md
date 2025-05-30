# Movie Tracking Application Features

## Overview
This application allows users to track their watched movies using the OMDB API. The application provides a modern, responsive interface built with Next.js and uses SQLite for data persistence.

## Core Features

### Movie Management
- **Movie Search**: Users can search for movies using the OMDB API
- **Watched Movies List**: 
  - Add movies to your watched list
  - View your watched movies in a grid layout
  - Movies are displayed with their posters, titles, and release years
  - Watched movies are sorted by most recently watched

## Technical Features

### Data Models
1. **User**
   - Unique identifier
   - Name
   - Email (optional)
   - Profile image (optional)
   - One-to-many relationship with watched movies

2. **WatchedMovie**
   - Unique identifier
   - IMDB ID
   - Movie title
   - Poster URL (optional)
   - Watch date
   - Associated user

### API Integration
- **OMDB API Integration**:
  - Movie search functionality
  - Detailed movie information retrieval
  - TypeScript interfaces for type safety
  - Error handling for API requests

### API Endpoints
1. **Watched Movies**
   - `GET /api/watched-movies`: Retrieve user's watched movies
   - `POST /api/watched-movies`: Add a movie to watched list

## User Interface
- Responsive grid layouts for movies
- Modern UI components with Tailwind CSS styling
- Loading states for better user experience
- Error handling and user feedback

## Setup Requirements
1. OMDB API key (required)
2. Environment variables:
   ```
   OMDB_API_KEY=your_api_key_here
   ```