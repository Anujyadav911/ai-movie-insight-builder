import { describe, it, expect } from 'vitest';
import { analyzeSentiment } from '@/lib/aiService';
import { Review } from '@/types/movie';

describe('aiService', () => {
  it('should return mixed sentiment for empty reviews', async () => {
    const result = await analyzeSentiment([]);
    expect(result.classification).toBe('mixed');
    expect(result.confidence).toBe(0);
  });

  it('should classify positive sentiment with high rating', async () => {
    const reviews: Review[] = [
      { author: 'User1', text: 'Amazing and wonderful movie!', rating: 5 },
      { author: 'User2', text: 'Great film, truly excellent!', rating: 5 },
      { author: 'User3', text: 'Loved it, fantastic performance!', rating: 4 },
    ];

    const result = await analyzeSentiment(reviews);
    expect(result.classification).toBe('positive');
    expect(result.confidence).toBeGreaterThan(0);
  });

  it('should classify negative sentiment with low rating', async () => {
    const reviews: Review[] = [
      { author: 'User1', text: 'Terrible and awful movie', rating: 1 },
      { author: 'User2', text: 'Really bad, disappointed', rating: 2 },
      { author: 'User3', text: 'Worst film ever', rating: 1 },
    ];

    const result = await analyzeSentiment(reviews);
    expect(result.classification).toBe('negative');
    expect(result.confidence).toBeGreaterThan(0);
  });

  it('should classify mixed sentiment with moderate rating', async () => {
    const reviews: Review[] = [
      { author: 'User1', text: 'Average film, okay plot', rating: 3 },
      { author: 'User2', text: 'Some good parts but slow', rating: 3 },
    ];

    const result = await analyzeSentiment(reviews);
    expect(result.classification).toBe('mixed');
  });

  it('should extract key themes from reviews', async () => {
    const reviews: Review[] = [
      { author: 'User1', text: 'Amazing cinematography and visual', rating: 5 },
      { author: 'User2', text: 'Great acting and performance', rating: 5 },
    ];

    const result = await analyzeSentiment(reviews);
    expect(result.keyThemes.length).toBeGreaterThan(0);
    expect(result.keyThemes[0]).toBeDefined();
  });
});
