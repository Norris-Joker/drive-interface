import { motion } from 'framer-motion';
import {
  Map,
  Music,
  Phone,
  MessageSquare,
  Cloud,
  Settings,
  Podcast,
  Radio,
  Calendar,
  Clock,
} from 'lucide-react';
import AppIcon from '../AppIcon';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

const HomeScreen = ({ onNavigate }: HomeScreenProps) => {
  const apps = [
    { id: 'maps', icon: Map, label: 'Plans', color: 'hsl(142, 70%, 45%)' },
    { id: 'music', icon: Music, label: 'Musique', color: 'hsl(340, 80%, 55%)' },
    { id: 'phone', icon: Phone, label: 'Téléphone', color: 'hsl(142, 70%, 50%)' },
    { id: 'messages', icon: MessageSquare, label: 'Messages', color: 'hsl(142, 70%, 45%)' },
    { id: 'weather', icon: Cloud, label: 'Météo', color: 'hsl(200, 90%, 55%)' },
    { id: 'podcast', icon: Podcast, label: 'Podcasts', color: 'hsl(280, 70%, 55%)' },
    { id: 'radio', icon: Radio, label: 'Radio', color: 'hsl(25, 95%, 55%)' },
    { id: 'calendar', icon: Calendar, label: 'Calendrier', color: 'hsl(0, 70%, 55%)' },
    { id: 'clock', icon: Clock, label: 'Horloge', color: 'hsl(30, 10%, 30%)' },
    { id: 'settings', icon: Settings, label: 'Réglages', color: 'hsl(220, 15%, 45%)' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <div className="screen-transition h-full pt-20 pb-28 px-6 overflow-y-auto">
      <motion.div
        className="grid grid-cols-4 gap-4 max-w-2xl mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {apps.map((app, index) => (
          <AppIcon
            key={app.id}
            icon={app.icon}
            label={app.label}
            color={app.color}
            onClick={() => onNavigate(app.id)}
            size={index === 0 ? 'large' : 'normal'}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default HomeScreen;
