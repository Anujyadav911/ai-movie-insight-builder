'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiLoader, FiAlertCircle } from 'react-icons/fi';
import MovieCard from '@/components/MovieCard';
import SentimentDisplay from '@/components/SentimentDisplay';
import CastList from '@/components/CastList';
import { MovieInsight } from '@/types/movie';

export default function Home() {
  const [imdbId, setImdbId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<MovieInsight | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!imdbId.trim()) {
      setError('Please enter an IMDb ID (e.g., tt0133093)');
      return;
    }

    if (!imdbId.startsWith('tt')) {
      setError('IMDb ID must start with "tt" (e.g., tt0133093)');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/movie?imdbId=${imdbId}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to fetch movie details');
        setLoading(false);
        return;
      }

      setResult({
        movieDetails: data.movieDetails,
        sentiment: data.sentiment,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl" />
        
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 tracking-tight">
            Movie Insight Builder
          </h1>
          <p className="text-lg text-slate-300 mb-8">
            Discover movie details and AI-powered audience sentiment analysis
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative flex gap-2">
              <input
                type="text"
                placeholder="Enter IMDb ID (e.g., tt0133093)"
                value={imdbId}
                onChange={(e) => setImdbId(e.target.value)}
                className="flex-1 px-6 py-4 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <FiLoader className="animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <FiSearch />
                    Search
                  </>
                )}
              </motion.button>
            </div>
          </form>

          {/* Error Display */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3 p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-200 mb-8"
              >
                <FiAlertCircle className="flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Results Section */}
      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
          >
            {/* Movie Card */}
            <MovieCard movie={result.movieDetails} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              {/* Left Column - Cast and Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* Cast Section */}
                <CastList castString={result.movieDetails.cast} />

                {/* Plot Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-slate-800 rounded-lg p-6 border border-slate-700"
                >
                  <h3 className="text-xl font-bold text-white mb-4">Plot Summary</h3>
                  <p className="text-slate-300 leading-relaxed">{result.movieDetails.plot}</p>
                </motion.div>
              </div>

              {/* Right Column - Sentiment */}
              <div>
                <SentimentDisplay sentiment={result.sentiment} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {!result && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center py-20 px-4"
        >
          <div className="text-center">
            <div className="text-6xl mb-4 opacity-30">🎬</div>
            <p className="text-slate-400 text-lg">
              Enter an IMDb ID to get started
            </p>
          </div>
        </motion.div>
      )}
    </main>
  );
}
