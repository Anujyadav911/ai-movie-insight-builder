import { motion } from 'framer-motion';
import { FiUser } from 'react-icons/fi';

interface CastListProps {
  castString: string;
}

export default function CastList({ castString }: CastListProps) {
  const castArray = castString
    .split(',')
    .map((actor) => actor.trim())
    .filter((actor) => actor.length > 0)
    .slice(0, 8); // Show only first 8 actors

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-slate-800 rounded-lg p-6 border border-slate-700"
    >
      <h3 className="text-xl font-bold text-white mb-4">Cast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {castArray.map((actor, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-2 p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
          >
            <FiUser className="flex-shrink-0 text-purple-400" />
            <span className="text-sm text-slate-200 truncate">{actor}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
