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
      className="w-80 h-full bg-background border-r flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3 mb-4">
          <GradientIcon icon={FileText} size={24} />
          <h2 className="text-lg font-semibold">Documents</h2>
        </div>
        
        <Button
          onClick={onUploadClick}
          className="w-full flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Upload Document
        </Button>
      </div>

      {/* Document List */}
      <div className="flex-1 overflow-y-auto p-4">
        {documents.length > 0 ? (
          <DocList />
        ) : (
          <Card className="p-6 text-center">
            <GradientIcon icon={FileText} size={32} className="mx-auto mb-3" />
            <p className="text-sm text-muted-foreground mb-3">
              No documents uploaded yet
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={onUploadClick}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Upload First Document
            </Button>
          </Card>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="text-xs text-muted-foreground text-center">
          {documents.length} document{documents.length === 1 ? '' : 's'} uploaded
        </div>
      </div>
    </motion.div>
  );
}