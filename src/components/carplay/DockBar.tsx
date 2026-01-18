import { Home, Map, Music, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

interface DockBarProps {
  onNavigate: (screen: string) => void;
  currentScreen: string;
}

const DockBar = ({ onNavigate, currentScreen }: DockBarProps) => {
  const dockItems = [
    { id: 'home', icon: Home, label: 'Accueil' },
    { id: 'maps', icon: Map, label: 'Plans' },
    { id: 'music', icon: Music, label: 'Musique' },
    { id: 'phone', icon: Phone, label: 'Téléphone' },
  ];

  return (
    <div className="dock-bar fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      {dockItems.map((item) => {
        const isActive = currentScreen === item.id;
        return (
          <motion.button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`relative p-3 rounded-2xl transition-all duration-300 ${
              isActive ? 'bg-primary/20' : 'hover:bg-secondary/50'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <item.icon
              className={`w-7 h-7 transition-colors duration-300 ${
                isActive ? 'text-primary' : 'text-foreground/70'
              }`}
            />
            {isActive && (
              <motion.div
                layoutId="dock-indicator"
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default DockBar;
