import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MessageSquare, Bot } from 'lucide-react';
import { Card } from '../ui/card';
import { QAItem } from '../../types';
import { timeAgo } from '../../utils/format';
import { EmptyState } from '../common/EmptyState';
import { GradientIcon } from '../common/GradientIcon';

interface QAListProps {
  qaItems: QAItem[];
  loading?: boolean;
}

export function QAList({ qaItems, loading = false }: QAListProps) {
  if (qaItems.length === 0 && !loading) {
    return (
      <EmptyState
        title="No questions yet"
        description="Ask your first question about this document to get started"
        icon="MessageSquare"
      />
    );
  }

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {qaItems.map((qa, index) => (
          <motion.div
            key={qa.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <QAItemComponent qa={qa} />
          </motion.div>
        ))}
      </motion.div>
      
      {loading && <LoadingQA />}
    </div>
  );
}

function QAItemComponent({ qa }: { qa: QAItem }) {
  return (
    <div className="space-y-3">
      {/* Question */}
      <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <div className="flex gap-3">
          <div className="flex-shrink-0 mt-1">
            <GradientIcon icon={MessageSquare} size={16} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
              {qa.question}
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              {timeAgo(qa.createdAt)}
            </p>
          </div>
        </div>
      </Card>

      {/* Answer */}
      <Card className="p-4">
        <div className="flex gap-3">
          <div className="flex-shrink-0 mt-1">
            <GradientIcon icon={Bot} size={16} />
          </div>
          <div className="flex-1 prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-lg font-semibold gradient-text mb-3">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-base font-semibold gradient-text mb-2">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-sm font-semibold gradient-text mb-2">{children}</h3>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-4 space-y-1">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-4 space-y-1">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-sm leading-relaxed">{children}</li>
                ),
                p: ({ children }) => (
                  <p className="text-sm leading-relaxed mb-3 last:mb-0">{children}</p>
                ),
                code: ({ children }) => (
                  <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-xs">
                    {children}
                  </code>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-foreground">{children}</strong>
                ),
              }}
            >
              {qa.answer}
            </ReactMarkdown>
          </div>
        </div>
      </Card>
    </div>
  );
}

function LoadingQA() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-4">
        <div className="flex gap-3">
          <div className="flex-shrink-0 mt-1">
            <GradientIcon icon={Bot} size={16} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              <span className="text-sm text-muted-foreground ml-2">Thinking...</span>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/5" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/5" />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}