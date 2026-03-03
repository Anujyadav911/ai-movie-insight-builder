import { Review } from '@/types/movie';

/**
 * ReviewService handles the retrieval and aggregation of reviews
 * In production, this could scrape IMDb, fetch from APIs, etc.
 */

export function generateMockReviews(movieTitle: string): Review[] {
  // Generate contextual mock reviews based on common themes
  const reviews: Review[] = [
    {
      author: 'Film Enthusiast',
      text: `${movieTitle} is a masterpiece! The storytelling is exceptional and the cinematography is breathtaking. This film truly stands out.`,
      rating: 5,
    },
    {
      author: 'CasualViewer',
      text: `Enjoyed watching ${movieTitle}. Good entertainment overall, though some parts felt a bit slow.`,
      rating: 4,
    },
    {
      author: 'CriticalWatcher',
      text: `${movieTitle} has its moments, but the execution could have been better. The plot is interesting but feels rushed at times.`,
      rating: 3,
    },
    {
      author: 'MovieBuff',
      text: `Absolutely fantastic! ${movieTitle} is one of those rare films that leaves a lasting impression. Highly recommend to everyone.`,
      rating: 5,
    },
    {
      author: 'AverageFan',
      text: `${movieTitle} is decent. It has good moments but also some slower scenes. Worth watching if you like this genre.`,
      rating: 3,
    },
    {
      author: 'SkepticalReviewer',
      text: `While ${movieTitle} has merit, I found it somewhat overrated. The acting is decent but the story feels predictable.`,
      rating: 2,
    },
    {
      author: 'ActionLover',
      text: `Great film! ${movieTitle} delivers on multiple fronts. The production quality is exceptional and the performances are strong.`,
      rating: 4,
    },
    {
      author: 'NostalgicViewer',
      text: `${movieTitle} is a timeless classic. Every scene is crafted with care. This is filmmaking at its finest.`,
      rating: 5,
    },
  ];

  return reviews;
}
