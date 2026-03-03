export interface MovieDetails {
  imdbID: string;
  title: string;
  year: string;
  rated: string;
  plot: string;
  poster: string;
  imdbRating: string;
  runtime: string;
  director: string;
  cast: string;
  genre: string;
  type: string;
}

export interface Review {
  author: string;
  text: string;
  rating?: number;
}

export interface SentimentAnalysis {
  summary: string;
  classification: 'positive' | 'mixed' | 'negative';
  confidence: number;
  keyThemes: string[];
}

export interface MovieInsight {
  movieDetails: MovieDetails;
  sentiment: SentimentAnalysis;
}
