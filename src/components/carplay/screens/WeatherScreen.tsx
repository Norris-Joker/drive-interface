import { motion } from 'framer-motion';
import { ArrowLeft, Sun, Cloud, CloudRain, Wind, Droplets, Thermometer } from 'lucide-react';

interface WeatherScreenProps {
  onBack: () => void;
}

const WeatherScreen = ({ onBack }: WeatherScreenProps) => {
  const forecast = [
    { day: 'Lun', icon: Sun, temp: 22, high: 24, low: 16 },
    { day: 'Mar', icon: Cloud, temp: 19, high: 21, low: 14 },
    { day: 'Mer', icon: CloudRain, temp: 15, high: 17, low: 12 },
    { day: 'Jeu', icon: Cloud, temp: 18, high: 20, low: 13 },
    { day: 'Ven', icon: Sun, temp: 23, high: 25, low: 17 },
  ];

  return (
    <div className="screen-transition h-full pt-16 pb-28 px-6">
      <motion.button
        onClick={onBack}
        className="flex items-center gap-2 text-primary mb-6"
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Retour</span>
      </motion.button>

      <div className="max-w-md mx-auto">
        {/* Current Weather */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-muted-foreground mb-2">Paris, France</p>
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <Sun className="w-24 h-24 text-yellow-400" />
            </motion.div>
            <div className="text-left">
              <p className="text-6xl font-light text-foreground">21°</p>
              <p className="text-muted-foreground">Ensoleillé</p>
            </div>
          </div>
        </motion.div>

        {/* Weather Details */}
        <motion.div
          className="grid grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="glass-effect rounded-2xl p-4 text-center">
            <Wind className="w-6 h-6 text-carplay-weather mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Vent</p>
            <p className="font-medium text-foreground">12 km/h</p>
          </div>
          <div className="glass-effect rounded-2xl p-4 text-center">
            <Droplets className="w-6 h-6 text-carplay-weather mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Humidité</p>
            <p className="font-medium text-foreground">45%</p>
          </div>
          <div className="glass-effect rounded-2xl p-4 text-center">
            <Thermometer className="w-6 h-6 text-carplay-weather mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Ressenti</p>
            <p className="font-medium text-foreground">23°</p>
          </div>
        </motion.div>

        {/* Forecast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Prévisions 5 jours</h3>
          <div className="glass-effect rounded-2xl p-4">
            <div className="flex justify-between">
              {forecast.map((day, index) => (
                <motion.div
                  key={day.day}
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <p className="text-sm text-muted-foreground mb-2">{day.day}</p>
                  <day.icon
                    className={`w-8 h-8 mx-auto mb-2 ${
                      day.icon === Sun
                        ? 'text-yellow-400'
                        : day.icon === CloudRain
                        ? 'text-carplay-weather'
                        : 'text-muted-foreground'
                    }`}
                  />
                  <p className="font-medium text-foreground">{day.temp}°</p>
                  <p className="text-xs text-muted-foreground">
                    {day.high}° / {day.low}°
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WeatherScreen;
