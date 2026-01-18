import { motion } from 'framer-motion';
import { ArrowLeft, Navigation, Search, Mic, MapPin, Clock, Star } from 'lucide-react';

interface MapsScreenProps {
  onBack: () => void;
}

const MapsScreen = ({ onBack }: MapsScreenProps) => {
  const recentPlaces = [
    { name: 'Maison', address: '12 Rue de Paris', icon: Star },
    { name: 'Bureau', address: '45 Avenue des Champs-Élysées', icon: MapPin },
    { name: 'Supermarché', address: '8 Rue du Commerce', icon: Clock },
  ];

  return (
    <div className="screen-transition h-full pt-16 pb-28">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {[...Array(10)].map((_, i) => (
              <line
                key={`h${i}`}
                x1="0"
                y1={i * 10}
                x2="100"
                y2={i * 10}
                stroke="currentColor"
                strokeWidth="0.2"
                className="text-muted-foreground"
              />
            ))}
            {[...Array(10)].map((_, i) => (
              <line
                key={`v${i}`}
                x1={i * 10}
                y1="0"
                x2={i * 10}
                y2="100"
                stroke="currentColor"
                strokeWidth="0.2"
                className="text-muted-foreground"
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 pt-4">
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-primary mb-4"
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Retour</span>
        </motion.button>

        {/* Search Bar */}
        <motion.div
          className="glass-effect rounded-2xl p-4 flex items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher une destination..."
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          />
          <button className="p-2 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors">
            <Mic className="w-5 h-5 text-primary" />
          </button>
        </motion.div>
      </div>

      {/* Current Location Indicator */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring' }}
      >
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-primary/20 animate-ping absolute" />
          <div className="w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center">
            <Navigation className="w-8 h-8 text-primary" />
          </div>
        </div>
      </motion.div>

      {/* Recent Places */}
      <motion.div
        className="absolute bottom-32 left-6 right-6 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Récents</h3>
        <div className="space-y-2">
          {recentPlaces.map((place, index) => (
            <motion.button
              key={place.name}
              className="w-full glass-effect rounded-xl p-4 flex items-center gap-4 text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 rounded-xl bg-carplay-maps/20 flex items-center justify-center">
                <place.icon className="w-5 h-5 text-carplay-maps" />
              </div>
              <div>
                <p className="font-medium text-foreground">{place.name}</p>
                <p className="text-sm text-muted-foreground">{place.address}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MapsScreen;
