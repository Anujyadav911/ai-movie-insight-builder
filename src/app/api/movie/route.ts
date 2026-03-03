import { NextRequest, NextResponse } from 'next/server';
import { fetchMovieDetails, fetchMovieReviews } from '@/lib/movieService';
import { generateMockReviews } from '@/lib/reviewService';
import { analyzeSentiment } from '@/lib/aiService';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const imdbId = searchParams.get('imdbId');

  if (!imdbId) {
    return NextResponse.json(
      { error: 'IMDb ID is required' },
      { status: 400 }
    );
  }

  try {
    // Fetch movie details
    const movieDetails = await fetchMovieDetails(imdbId);
    
    // Get reviews (using mock reviews for now)
    const reviews = generateMockReviews(movieDetails.title);
    
    // Analyze sentiment
    const sentiment = await analyzeSentiment(reviews);

    return NextResponse.json({
      movieDetails,
      sentiment,
      reviews,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
