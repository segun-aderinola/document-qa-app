import React from 'react';
import { motion } from 'framer-motion';
import { Plus, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { DocList } from '../docs/DocList';
import { useAppContext } from '../../context/AppContext';
import { GradientIcon } from '../common/GradientIcon';

interface SidebarProps {
  onUploadClick: () => void;
}

export function Sidebar({ onUploadClick }: SidebarProps) {
  const { documents } = useAppContext();

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-72 sm:w-80 lg:w-96 h-full bg-background border-r flex flex-col"
    >
      {/* Header - Responsive */}
      <div className="p-3 sm:p-4 border-b">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <GradientIcon icon={FileText} size={20} className="sm:hidden" />
          <GradientIcon icon={FileText} size={24} className="hidden sm:block" />
          <h2 className="text-base sm:text-lg font-semibold">Documents</h2>
        </div>
        
        <Button
          onClick={onUploadClick}
          className="w-full flex items-center justify-center gap-2 text-sm sm:text-base"
          size="sm"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Document</span>
        </Button>
      </div>

      {/* Document List - Scrollable */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
        {documents.length > 0 ? (
          <DocList />
        ) : (
          <Card className="p-4 sm:p-6 text-center">
            <GradientIcon icon={FileText} size={28} className="mx-auto mb-3 sm:hidden" />
            <GradientIcon icon={FileText} size={32} className="mx-auto mb-3 hidden sm:block" />
            <p className="text-xs sm:text-sm text-muted-foreground mb-3 leading-relaxed">
              No documents uploaded yet
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={onUploadClick}
              className="w-full text-xs sm:text-sm"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Upload First Document
            </Button>
          </Card>
        )}
      </div>

      {/* Footer - Show count */}
      <div className="p-3 sm:p-4 border-t bg-muted/30">
        <div className="text-xs sm:text-sm text-muted-foreground text-center">
          {documents.length} document{documents.length === 1 ? '' : 's'} uploaded
        </div>
      </div>
    </motion.div>
  );
}