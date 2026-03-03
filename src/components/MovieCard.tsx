import { motion } from 'framer-motion';
import { MovieDetails } from '@/types/movie';

interface MovieCardProps {
  movie: MovieDetails;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 shadow-2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
        {/* Poster */}
        <div className="md:col-span-1">
          {movie.poster && movie.poster !== 'N/A' ? (
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={movie.poster}
              alt={movie.title}
              className="w-full rounded-lg shadow-lg object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="300"%3E%3Crect fill="%23374151" width="200" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="%23fff"%3ENo Image%3C/text%3E%3C/svg%3E';
              }}
            />
          ) : (
            <div className="w-full h-80 bg-slate-700 rounded-lg flex items-center justify-center text-slate-400">
              No Image
            </div>
          )}
        </div>

        {/* Details */}
        <div className="md:col-span-3 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-3xl font-bold text-white mb-2">{movie.title}</h2>
            <p className="text-slate-400 text-sm mb-4">
              {movie.year} • {movie.runtime} • {movie.rated}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-slate-400 text-xs font-semibold mb-1">RATING</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-yellow-400">
                    {movie.imdbRating}
                  </span>
                  <span className="text-slate-400">/10</span>
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-semibold mb-1">GENRE</p>
                <p className="text-white">{movie.genre}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-slate-400 text-xs font-semibold mb-1">DIRECTOR</p>
              <p className="text-white">{movie.director}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
