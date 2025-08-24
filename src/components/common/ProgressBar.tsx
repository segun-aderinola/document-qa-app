import React from 'react';
import { motion } from 'framer-motion';
import { Progress } from '../ui/progress';
import { Card } from '../ui/card';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { UploadProgress, UploadStatus } from '../../types';

interface ProgressBarProps {
  upload: UploadProgress;
  fileName: string;
  onCancel?: () => void;
}

export function ProgressBar({ upload, fileName, onCancel }: ProgressBarProps) {
  const getStatusIcon = (status: UploadStatus) => {
    switch (status) {
      case 'done':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: UploadStatus) => {
    switch (status) {
      case 'uploading':
        return 'Uploading...';
      case 'done':
        return 'Upload complete';
      case 'error':
        return 'Upload failed';
      default:
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {getStatusIcon(upload.status)}
            <div>
              <p className="text-sm font-medium truncate max-w-[200px]" title={fileName}>
                {fileName}
              </p>
              <p className="text-xs text-muted-foreground">
                {getStatusText(upload.status)}
              </p>
            </div>
          </div>
          
          {upload.status === 'uploading' && onCancel && (
            <button
              onClick={onCancel}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="space-y-2">
          <Progress value={upload.percent} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{upload.percent}%</span>
            {upload.status === 'uploading' && (
              <span>
                {upload.percent < 100 ? `${100 - upload.percent}% remaining` : 'Finalizing...'}
              </span>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}