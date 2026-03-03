# Movie Insight Builder

A modern web application that discovers movie details and provides AI-powered audience sentiment analysis using IMDb movie IDs.

## Features

- **Movie Search**: Enter an IMDb ID (e.g., `tt0133093`) to fetch complete movie details
- **Detailed Movie Information**: Display title, poster, release year, rating, runtime, director, genre, and cast
- **Cast Display**: View main cast members in a responsive grid
- **Plot Summary**: Read the complete plot synopsis
- **Sentiment Analysis**: AI-powered analysis of audience reviews and sentiment
- **Sentiment Classification**: Results categorized as positive, negative, or mixed
- **Key Themes Extraction**: Identifies main themes and topics from reviews
- **Responsive Design**: Fully responsive on desktop, tablet, and mobile devices
- **Beautiful UI**: Modern design with animations and smooth transitions
- **Input Validation**: Robust error handling and user guidance

## Tech Stack

### Frontend
- **Framework**: Next.js 16.1.6 (React 19.2.3)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Icons**: React Icons

### Backend
- **Runtime**: Node.js (via Next.js API Routes)
- **API Integration**: OMDb API for movie data

### Testing
- **Test Framework**: Vitest
- **Testing Library**: @testing-library/react

## Prerequisites

- Node.js 18+ and npm
- OMDb API key (free tier available at [omdbapi.com](https://www.omdbapi.com))

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ai-movie-insight-builder
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_OMDB_API_KEY=your_omdb_api_key
NEXT_PUBLIC_HF_API_KEY=your_hugging_face_api_key
```

### 4. Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

### 5. Build for Production
```bash
npm run build
npm start
```

## Usage

1. Enter an IMDb ID (e.g., `tt0133093` for The Matrix)
2. Click Search
3. View movie details, cast, and sentiment analysis

## API Reference

### GET `/api/movie?imdbId={imdbId}`

Fetches movie information and sentiment analysis.

**Parameters**: `imdbId` - Valid IMDb ID (e.g., `tt0133093`)

**Response**: Movie details, sentiment analysis, and reviews

## Testing

```bash
npm run test          # Run tests
npm run test:ui       # Run tests with UI
```

## Project Structure

```
src/
├── app/
│   ├── api/movie/route.ts        # Movie API endpoint
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Main search page
├── components/
│   ├── MovieCard.tsx             # Movie details
│   ├── SentimentDisplay.tsx       # Sentiment results
│   └── CastList.tsx              # Cast members
├── lib/
│   ├── aiService.ts              # Sentiment analysis
│   ├── movieService.ts           # OMDb integration
│   └── reviewService.ts          # Review generation
└── types/
    └── movie.ts                  # Interfaces

__tests__/
├── aiService.test.ts
└── reviewService.test.ts
```

## Design Decisions

1. **API Routes**: Used Next.js API Routes for secure backend integration
2. **Sentiment Analysis**: Keyword-based analysis for reliability and speed
3. **Mock Reviews**: Demonstrative reviews; easily replaceable with real data
4. **Dark Theme**: Modern design with smooth animations
5. **Responsive**: Mobile-first approach with Tailwind CSS

## Assumptions

- OMDb API is accessible and has sufficient rate limits
- Users know IMDb ID format (tt + numbers)
- Browser supports modern JavaScript
- Mock reviews adequate for demonstration
- Simple keyword-based sentiment analysis

## Known Limitations

- OMDb free tier has request limits
- Mock reviews used for demonstration
- Keyword-based sentiment analysis has limitations
- Some movies lack poster images
- Rate limiting on OMDb API

## Future Enhancements

- ML-based sentiment analysis
- Real IMDb review scraping
- User authentication and favorites
- Movie recommendations
- Advanced search filters
- PWA support

## License

Educational and demonstration purposes
