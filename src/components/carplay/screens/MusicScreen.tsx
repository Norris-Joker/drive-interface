import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  Shuffle,
  Repeat,
} from 'lucide-react';
import { useState } from 'react';

interface MusicScreenProps {
  onBack: () => void;
}

const MusicScreen = ({ onBack }: MusicScreenProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [isLiked, setIsLiked] = useState(false);

  const currentTrack = {
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:20',
    current: '1:10',
  };

  return (
    <div className="screen-transition h-full pt-16 pb-28 px-6 flex flex-col">
      {/* Header */}
      <motion.button
        onClick={onBack}
        className="flex items-center gap-2 text-primary mb-6"
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Retour</span>
      </motion.button>

      {/* Album Art */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          className="w-64 h-64 rounded-3xl bg-gradient-to-br from-carplay-music to-purple-900 shadow-glow-lg flex items-center justify-center mb-8 float-animation"
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={isPlaying ? { duration: 20, repeat: Infinity, ease: 'linear' } : {}}
        >
          <div className="w-20 h-20 rounded-full bg-background/20 backdrop-blur" />
        </motion.div>

        {/* Track Info */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-1">{currentTrack.title}</h2>
          <p className="text-lg text-muted-foreground">{currentTrack.artist}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full mb-6">
          <div className="h-1 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-carplay-music rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>{currentTrack.current}</span>
            <span>{currentTrack.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <motion.button
            className="p-3 text-muted-foreground hover:text-foreground transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <Shuffle className="w-5 h-5" />
          </motion.button>
          <motion.button
            className="p-3 text-foreground"
            whileTap={{ scale: 0.9 }}
          >
            <SkipBack className="w-8 h-8" />
          </motion.button>
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 rounded-full bg-carplay-music flex items-center justify-center shadow-glow"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white ml-1" />
            )}
          </motion.button>
          <motion.button
            className="p-3 text-foreground"
            whileTap={{ scale: 0.9 }}
          >
            <SkipForward className="w-8 h-8" />
          </motion.button>
          <motion.button
            className="p-3 text-muted-foreground hover:text-foreground transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <Repeat className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between w-full">
          <motion.button
            onClick={() => setIsLiked(!isLiked)}
            className="p-3"
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              className={`w-6 h-6 transition-colors ${
                isLiked ? 'text-carplay-music fill-carplay-music' : 'text-muted-foreground'
              }`}
            />
          </motion.button>
          <motion.button className="p-3" whileTap={{ scale: 0.9 }}>
            <Volume2 className="w-6 h-6 text-muted-foreground" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default MusicScreen;
