import React from 'react';
import { motion } from 'framer-motion';
import { FileText, MessageSquare, Search, Upload } from 'lucide-react';
import { GradientIcon } from './GradientIcon';

interface EmptyStateProps {
  title: string;
  description: string;
  icon: 'FileText' | 'MessageSquare' | 'Search' | 'Upload';
  action?: React.ReactNode;
}

const iconMap = {
  FileText,
  MessageSquare,
  Search,
  Upload
};

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  const Icon = iconMap[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
        className="mb-6"
      >
        <GradientIcon icon={Icon} size={64} />
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg font-semibold mb-2"
      >
        {title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-muted-foreground text-sm max-w-sm mb-6"
      >
        {description}
      </motion.p>
      
      {action && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  );
}