import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StatusBar from './StatusBar';
import DockBar from './DockBar';
import HomeScreen from './screens/HomeScreen';
import MapsScreen from './screens/MapsScreen';
import MusicScreen from './screens/MusicScreen';
import PhoneScreen from './screens/PhoneScreen';
import MessagesScreen from './screens/MessagesScreen';
import WeatherScreen from './screens/WeatherScreen';
import SettingsScreen from './screens/SettingsScreen';

const CarPlayApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} />;
      case 'maps':
        return <MapsScreen onBack={handleBack} />;
      case 'music':
        return <MusicScreen onBack={handleBack} />;
      case 'phone':
        return <PhoneScreen onBack={handleBack} />;
      case 'messages':
        return <MessagesScreen onBack={handleBack} />;
      case 'weather':
        return <WeatherScreen onBack={handleBack} />;
      case 'settings':
        return <SettingsScreen onBack={handleBack} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden">
      {/* Ambient Glow Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-carplay-music/5 blur-[80px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-carplay-maps/5 blur-[80px] rounded-full" />
      </div>

      <StatusBar />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="h-screen"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      <DockBar onNavigate={handleNavigate} currentScreen={currentScreen} />
    </div>
  );
};

export default CarPlayApp;
