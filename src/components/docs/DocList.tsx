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
      <EmptyState
        title="No documents yet"
        description="Upload your first document to get started with Q&A"
        icon="FileText"
      />
    );
  }

  return (
    <div className="space-y-3">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.05 }}
        className="space-y-2"
      >
        {documents.map((document, index) => (
          <motion.div
            key={document.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <DocCard
              document={document}
              onClick={() => handleDocClick(document.id)}
              isActive={activeDocId === document.id}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}