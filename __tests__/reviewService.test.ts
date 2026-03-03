import { describe, it, expect } from 'vitest';
import { generateMockReviews } from '@/lib/reviewService';
import { Review } from '@/types/movie';

describe('reviewService', () => {
  it('should generate mock reviews for a movie', () => {
    const reviews = generateMockReviews('Test Movie');
    expect(Array.isArray(reviews)).toBe(true);
    expect(reviews.length).toBeGreaterThan(0);
  });

  it('should generate reviews with required fields', () => {
    const reviews = generateMockReviews('Test Movie');
    reviews.forEach((review: Review) => {
      expect(review.author).toBeDefined();
      expect(typeof review.author).toBe('string');
      expect(review.text).toBeDefined();
      expect(typeof review.text).toBe('string');
      expect(review.rating).toBeDefined();
      expect(typeof review.rating).toBe('number');
    });
  });

  it('should include movie title in review text', () => {
    const movieTitle = 'Test Movie';
    const reviews = generateMockReviews(movieTitle);
    const hasMovieTitleInAnyReview = reviews.some((review: Review) =>
      review.text.includes(movieTitle)
    );
    expect(hasMovieTitleInAnyReview).toBe(true);
  });

  it('should generate reviews with valid ratings', () => {
    const reviews = generateMockReviews('Test Movie');
    reviews.forEach((review: Review) => {
      expect(review.rating).toBeGreaterThanOrEqual(1);
      expect(review.rating).toBeLessThanOrEqual(5);
    });
  });

  it('should generate different authors', () => {
    const reviews = generateMockReviews('Test Movie');
    const authors = reviews.map((r: Review) => r.author);
    const uniqueAuthors = new Set(authors);
    expect(uniqueAuthors.size).toBeGreaterThan(1);
  });
});
