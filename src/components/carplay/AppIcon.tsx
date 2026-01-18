import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface AppIconProps {
  icon: LucideIcon;
  label: string;
  color: string;
  onClick: () => void;
  size?: 'normal' | 'large';
}

const AppIcon = ({ icon: Icon, label, color, onClick, size = 'normal' }: AppIconProps) => {
  const isLarge = size === 'large';
  
  return (
    <motion.button
      onClick={onClick}
      className={`app-icon ${isLarge ? 'col-span-2 row-span-2' : ''}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`${isLarge ? 'w-20 h-20' : 'w-14 h-14'} rounded-2xl flex items-center justify-center`}
        style={{ backgroundColor: color }}
      >
        <Icon className={`${isLarge ? 'w-10 h-10' : 'w-7 h-7'} text-white`} />
      </div>
      <span className="text-xs font-medium text-foreground/90 mt-1">{label}</span>
    </motion.button>
  );
};

export default AppIcon;
