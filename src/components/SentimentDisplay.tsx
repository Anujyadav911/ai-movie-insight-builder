import { motion } from 'framer-motion';
import { SentimentAnalysis } from '@/types/movie';
import { FiThumbsUp, FiThumbsDown, FiMinus } from 'react-icons/fi';

interface SentimentDisplayProps {
  sentiment: SentimentAnalysis;
}

export default function SentimentDisplay({ sentiment }: SentimentDisplayProps) {
  const getSentimentColor = () => {
    switch (sentiment.classification) {
      case 'positive':
        return 'from-green-600 to-emerald-600';
      case 'negative':
        return 'from-red-600 to-rose-600';
      default:
        return 'from-amber-600 to-orange-600';
    }
  };

  const getSentimentIcon = () => {
    switch (sentiment.classification) {
      case 'positive':
        return <FiThumbsUp className="w-8 h-8" />;
      case 'negative':
        return <FiThumbsDown className="w-8 h-8" />;
      default:
        return <FiMinus className="w-8 h-8" />;
    }
  };

  const getSentimentLabel = () => {
    return sentiment.classification.charAt(0).toUpperCase() + sentiment.classification.slice(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-slate-800 rounded-lg p-6 border border-slate-700 sticky top-8"
    >
      {/* Sentiment Classification */}
      <div
        className={`bg-gradient-to-br ${getSentimentColor()} rounded-lg p-6 mb-6 text-white`}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold">Audience Sentiment</h3>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {getSentimentIcon()}
          </motion.div>
        </div>
        <p className="text-2xl font-bold mb-2">{getSentimentLabel()}</p>
        <div className="w-full bg-white/20 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${sentiment.confidence * 100}%` }}
            transition={{ duration: 1 }}
            className={`h-full bg-gradient-to-r ${getSentimentColor()} rounded-full`}
          />
        </div>
        <p className="text-xs mt-2 opacity-90">
          Confidence: {(sentiment.confidence * 100).toFixed(0)}%
        </p>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-slate-300 mb-3">Summary</h4>
        <p className="text-slate-300 text-sm leading-relaxed">{sentiment.summary}</p>
      </div>

      {/* Key Themes */}
      <div>
        <h4 className="text-sm font-semibold text-slate-300 mb-3">Key Themes</h4>
        <div className="space-y-2">
          {sentiment.keyThemes.map((theme, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 text-sm text-slate-300"
            >
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              {theme}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
