import axios from 'axios';
import { MovieDetails, Review } from '@/types/movie';

const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY || '';
const OMDB_BASE_URL = 'https://www.omdbapi.com';

export async function fetchMovieDetails(imdbID: string): Promise<MovieDetails> {
  if (!imdbID || !imdbID.startsWith('tt')) {
    throw new Error('Invalid IMDb ID format');
  }

  try {
    const response = await axios.get(OMDB_BASE_URL, {
      params: {
        i: imdbID,
        apikey: OMDB_API_KEY,
        type: 'movie',
      },
    });

    if (response.data.Response === 'False') {
      throw new Error(response.data.Error || 'Movie not found');
    }

    return {
      imdbID: response.data.imdbID,
      title: response.data.Title,
      year: response.data.Year,
      rated: response.data.Rated,
      plot: response.data.Plot,
      poster: response.data.Poster,
      imdbRating: response.data.imdbRating,
      runtime: response.data.Runtime,
      director: response.data.Director,
      cast: response.data.Actors,
      genre: response.data.Genre,
      type: response.data.Type,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch movie: ${error.message}`);
    }
    throw error;
  }
}

export async function fetchMovieReviews(title: string): Promise<Review[]> {
  // Mock reviews data - in production, you'd scrape or use an API
  const mockReviews = [
    {
      author: 'John D.',
      text: 'Amazing movie! The plot was incredible and the cinematography was stunning. Highly recommended!',
      rating: 5,
    },
    {
      author: 'Sarah M.',
      text: 'Really enjoyed this film. Great acting performances throughout.',
      rating: 4,
    },
    {
      author: 'Mike L.',
      text: 'Good movie but the pacing was a bit slow in the second half.',
      rating: 3,
    },
    {
      author: 'Emma W.',
      text: 'One of my favorite films ever! Absolutely loved every minute of it.',
      rating: 5,
    },
    {
      author: 'David K.',
      text: 'Interesting concept but could have been executed better.',
      rating: 3,
    },
  ];

  return mockReviews;
}
