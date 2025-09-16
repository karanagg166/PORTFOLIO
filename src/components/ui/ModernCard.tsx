import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

const ModernCard: React.FC<ModernCardProps> = ({
  children,
  className,
  hover = true,
  delay = 0,
}) => {
  return (
    <motion.div
      className={cn(
        "relative rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 p-6",
        hover && "hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20",
        className
      )}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={hover ? { 
        y: -10, 
        rotateX: 5,
        transition: { duration: 0.3 }
      } : {}}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-600/10 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default ModernCard;
