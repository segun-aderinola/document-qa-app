import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { DocCard } from './DocCard';
import { EmptyState } from '../common/EmptyState';
import { useAppContext } from '../../context/AppContext';

export function DocList() {
  const navigate = useNavigate();
  const { id: activeDocId } = useParams();
  const { documents } = useAppContext();

  const handleDocClick = (docId: string) => {
    navigate(`/doc/${docId}`);
  };

  if (documents.length === 0) {
    return (
      <div className="px-2 sm:px-0">
        <EmptyState
          title="No documents yet"
          description="Upload your first document to get started with Q&A"
          icon="FileText"
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Grid layout for larger screens, single column for mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.05 }}
        className="grid grid-cols-1 xl:grid-cols-1 gap-2 sm:gap-3"
      >
        {documents.map((document, index) => (
          <motion.div
            key={document.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="w-full"
          >
            <DocCard
              document={document}
              onClick={() => handleDocClick(document.id)}
              isActive={activeDocId === document.id}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Show count on mobile */}
      <div className="mt-4 sm:hidden text-center">
        <p className="text-xs text-muted-foreground">
          {documents.length} document{documents.length === 1 ? '' : 's'}
        </p>
      </div>
    </div>
  );
}