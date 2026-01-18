import { motion } from 'framer-motion';
import { ArrowLeft, Phone, PhoneOff, User, Clock, Star } from 'lucide-react';
import { useState } from 'react';

interface PhoneScreenProps {
  onBack: () => void;
}

const PhoneScreen = ({ onBack }: PhoneScreenProps) => {
  const [dialedNumber, setDialedNumber] = useState('');

  const dialPad = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#'],
  ];

  const recentCalls = [
    { name: 'Marie Dupont', number: '+33 6 12 34 56 78', type: 'incoming', time: 'Il y a 2h' },
    { name: 'Jean Martin', number: '+33 6 98 76 54 32', type: 'outgoing', time: 'Hier' },
    { name: 'Bureau', number: '+33 1 23 45 67 89', type: 'missed', time: 'Hier' },
  ];

  const handleDial = (num: string) => {
    if (dialedNumber.length < 15) {
      setDialedNumber((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    setDialedNumber((prev) => prev.slice(0, -1));
  };

  return (
    <div className="screen-transition h-full pt-16 pb-28 px-6">
      {/* Header */}
      <motion.button
        onClick={onBack}
        className="flex items-center gap-2 text-primary mb-6"
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Retour</span>
      </motion.button>

      <div className="max-w-md mx-auto">
        {/* Display */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-3xl font-light text-foreground tracking-wider min-h-[2.5rem]">
            {dialedNumber || 'Entrez un numéro'}
          </p>
        </motion.div>

        {/* Dial Pad */}
        <motion.div
          className="grid grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {dialPad.flat().map((num) => (
            <motion.button
              key={num}
              onClick={() => handleDial(num)}
              className="h-16 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors flex items-center justify-center"
              whileTap={{ scale: 0.95, backgroundColor: 'hsl(var(--primary) / 0.2)' }}
            >
              <span className="text-2xl font-medium text-foreground">{num}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Call Buttons */}
        <div className="flex justify-center gap-6 mb-8">
          <motion.button
            onClick={handleDelete}
            className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center"
            whileTap={{ scale: 0.9 }}
          >
            <PhoneOff className="w-6 h-6 text-destructive" />
          </motion.button>
          <motion.button
            className="w-20 h-20 rounded-full bg-carplay-phone flex items-center justify-center shadow-glow"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <Phone className="w-8 h-8 text-white" />
          </motion.button>
        </div>

        {/* Recent Calls */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Appels récents
          </h3>
          <div className="space-y-2">
            {recentCalls.map((call, index) => (
              <motion.button
                key={index}
                className="w-full glass-effect rounded-xl p-4 flex items-center gap-4 text-left"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{call.name}</p>
                  <p className="text-sm text-muted-foreground">{call.time}</p>
                </div>
                <Phone
                  className={`w-5 h-5 ${
                    call.type === 'missed' ? 'text-destructive' : 'text-carplay-phone'
                  }`}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneScreen;
