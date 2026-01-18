import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Wifi,
  Bluetooth,
  Volume2,
  Sun,
  Moon,
  Car,
  Smartphone,
  Info,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

interface SettingsScreenProps {
  onBack: () => void;
}

const SettingsScreen = ({ onBack }: SettingsScreenProps) => {
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);

  const settingsGroups = [
    {
      title: 'Connectivité',
      items: [
        {
          icon: Wifi,
          label: 'Wi-Fi',
          toggle: true,
          value: wifiEnabled,
          onToggle: () => setWifiEnabled(!wifiEnabled),
        },
        {
          icon: Bluetooth,
          label: 'Bluetooth',
          toggle: true,
          value: bluetoothEnabled,
          onToggle: () => setBluetoothEnabled(!bluetoothEnabled),
        },
      ],
    },
    {
      title: 'Affichage',
      items: [
        { icon: Sun, label: 'Luminosité', detail: '75%' },
        { icon: Moon, label: 'Mode nuit automatique', detail: 'Activé' },
      ],
    },
    {
      title: 'Audio',
      items: [{ icon: Volume2, label: 'Volume', detail: '60%' }],
    },
    {
      title: 'Véhicule',
      items: [
        { icon: Car, label: 'Information véhicule', detail: 'BMW 320d' },
        { icon: Smartphone, label: 'Appareils connectés', detail: '2 appareils' },
      ],
    },
    {
      title: 'À propos',
      items: [{ icon: Info, label: 'Version', detail: '2.1.0' }],
    },
  ];

  return (
    <div className="screen-transition h-full pt-16 pb-28 px-6 overflow-y-auto">
      <motion.button
        onClick={onBack}
        className="flex items-center gap-2 text-primary mb-6"
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Retour</span>
      </motion.button>

      <h1 className="text-2xl font-bold text-foreground mb-6">Réglages</h1>

      <div className="max-w-md mx-auto space-y-6">
        {settingsGroups.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.1 }}
          >
            <h3 className="text-sm font-medium text-muted-foreground mb-3">{group.title}</h3>
            <div className="glass-effect rounded-2xl overflow-hidden">
              {group.items.map((item, itemIndex) => (
                <motion.button
                  key={item.label}
                  className="w-full p-4 flex items-center gap-4 text-left hover:bg-secondary/30 transition-colors"
                  style={{
                    borderBottom:
                      itemIndex < group.items.length - 1
                        ? '1px solid hsl(var(--border))'
                        : 'none',
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={item.toggle ? item.onToggle : undefined}
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <span className="flex-1 font-medium text-foreground">{item.label}</span>
                  {item.toggle ? (
                    <div
                      className={`w-12 h-7 rounded-full transition-colors ${
                        item.value ? 'bg-carplay-phone' : 'bg-secondary'
                      }`}
                    >
                      <motion.div
                        className="w-5 h-5 rounded-full bg-white mt-1"
                        animate={{ x: item.value ? 26 : 4 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    </div>
                  ) : (
                    <>
                      <span className="text-sm text-muted-foreground">{item.detail}</span>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SettingsScreen;
