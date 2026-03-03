import { SentimentAnalysis, Review } from '@/types/movie';

export async function analyzeSentiment(reviews: Review[]): Promise<SentimentAnalysis> {
  if (reviews.length === 0) {
    return {
      summary: 'No reviews available for analysis.',
      classification: 'mixed',
      confidence: 0,
      keyThemes: [],
    };
  }

  try {
    // Combine all review texts
    const combinedText = reviews.map((r) => r.text).join(' ');

    // Perform local sentiment analysis
    const sentiment = performLocalSentimentAnalysis(combinedText, reviews);
    return sentiment;
  } catch (error) {
    console.error('Sentiment analysis error:', error);
    return {
      summary: 'Unable to analyze sentiment at this time.',
      classification: 'mixed',
      confidence: 0,
      keyThemes: [],
    };
  }
}

function performLocalSentimentAnalysis(
  text: string,
  reviews: Review[]
): SentimentAnalysis {
  // Simple sentiment analysis based on keywords and review ratings
  const positiveKeywords = [
    'amazing',
    'awesome',
    'excellent',
    'great',
    'love',
    'loved',
    'fantastic',
    'wonderful',
    'incredible',
    'stunning',
    'brilliant',
    'perfect',
    'enjoyed',
    'recommend',
    'best',
  ];
  const negativeKeywords = [
    'bad',
    'terrible',
    'awful',
    'boring',
    'waste',
    'disappointed',
    'disappointing',
    'poor',
    'worst',
    'hate',
    'hated',
    'slow',
    'confusing',
    'overrated',
    'unwatchable',
  ];

  const lowerText = text.toLowerCase();
  const positiveMatches = positiveKeywords.filter((kw) => lowerText.includes(kw)).length;
  const negativeMatches = negativeKeywords.filter((kw) => lowerText.includes(kw)).length;

  // Calculate average rating if available
  const ratingsAvailable = reviews.filter((r) => r.rating !== undefined);
  const avgRating =
    ratingsAvailable.length > 0
      ? ratingsAvailable.reduce((sum, r) => sum + (r.rating || 0), 0) / ratingsAvailable.length
      : 3;

  let classification: 'positive' | 'mixed' | 'negative';
  let confidence = 0;

  if (avgRating >= 4) {
    classification = 'positive';
    confidence = Math.min(0.95, 0.5 + avgRating / 10);
  } else if (avgRating <= 2.5) {
    classification = 'negative';
    confidence = Math.min(0.95, 0.5 + (5 - avgRating) / 10);
  } else {
    classification = 'mixed';
    confidence = 0.7;
  }

  // Extract key themes
  const keyThemes: string[] = [];
  if (positiveMatches > negativeMatches) {
    keyThemes.push('Well-received story');
    if (lowerText.includes('cinematography') || lowerText.includes('visual')) {
      keyThemes.push('Strong visuals');
    }
    if (lowerText.includes('act') || lowerText.includes('performance')) {
      keyThemes.push('Excellent performances');
    }
  }
  if (lowerText.includes('slow') || lowerText.includes('pacing')) {
    keyThemes.push('Pacing concerns');
  }
  if (lowerText.includes('plot') || lowerText.includes('story')) {
    keyThemes.push('Engaging narrative');
  }

  const summary =
    classification === 'positive'
      ? `Audiences are very positive about this film. The average rating is ${avgRating.toFixed(1)}/5 stars. Viewers highlight the engaging story and strong performances.`
      : classification === 'negative'
        ? `Audiences have mixed to negative views about this film. The average rating is ${avgRating.toFixed(1)}/5 stars. Some concerns mentioned include pacing and execution.`
        : `Audiences have mixed views about this film. The average rating is ${avgRating.toFixed(1)}/5 stars. While some enjoy it, others find it less compelling.`;

  return {
    summary,
    classification,
    confidence,
    keyThemes: keyThemes.length > 0 ? keyThemes : ['Mixed audience reception'],
  };
}
