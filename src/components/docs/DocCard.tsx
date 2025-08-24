import React from 'react';
import { motion } from 'framer-motion';
import { FileText, MessageSquare, Calendar } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { DocumentMeta } from '../../types';
import { formatBytes, timeAgo } from '../../utils/format';
import { useAppContext } from '../../context/AppContext';
import { GradientIcon } from '../common/GradientIcon';

interface DocCardProps {
  document: DocumentMeta;
  onClick: () => void;
  isActive?: boolean;
}

export function DocCard({ document, onClick, isActive = false }: DocCardProps) {
  const { getQAForDoc } = useAppContext();
  const qaCount = getQAForDoc(document.id).length;

  const getFileTypeIcon = (type: string) => {
    if (type.includes('pdf')) return FileText;
    if (type.includes('text')) return FileText;
    return FileText;
  };

  const FileIcon = getFileTypeIcon(document.type);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card 
        className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
          isActive ? 'ring-2 ring-blue-500 border-blue-500' : ''
        }`}
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <GradientIcon icon={FileIcon} size={20} />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm truncate mb-1" title={document.name}>
                {document.name}
              </h3>
              
              <div className="space-y-1">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{formatBytes(document.size)}</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{timeAgo(document.createdAt)}</span>
                  </div>
                </div>
                
                {qaCount > 0 && (
                  <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                    <MessageSquare className="w-3 h-3" />
                    <span>{qaCount} question{qaCount === 1 ? '' : 's'}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}