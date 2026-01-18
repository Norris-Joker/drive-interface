import { useState, useEffect } from 'react';
import { Signal, Wifi, Battery, BatteryCharging } from 'lucide-react';

const StatusBar = () => {
  const [time, setTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [isCharging, setIsCharging] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="status-bar fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-3">
        <Signal className="w-4 h-4 text-foreground/80" />
        <span className="text-sm font-medium text-foreground/80">5G</span>
        <Wifi className="w-4 h-4 text-foreground/80" />
      </div>

      <div className="text-lg font-semibold tracking-wide">
        {formatTime(time)}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-foreground/80">{batteryLevel}%</span>
        {isCharging ? (
          <BatteryCharging className="w-6 h-6 text-carplay-phone" />
        ) : (
          <Battery className="w-6 h-6 text-foreground/80" />
        )}
      </div>
    </div>
  );
};

export default StatusBar;
