import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams, Navigate } from 'react-router-dom';
import { Download, FileText, Calendar, HardDrive } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { QAForm, QAFormRef } from './QAForm';
import { QAList } from './QAList';
import { GradientIcon } from '../common/GradientIcon';
import { useAppContext } from '../../context/AppContext';
import { useQA } from '../../hooks/useQA';
import { useToast } from '../../hooks/useToast';
import { formatBytes, timeAgo } from '../../utils/format';

export function DocView() {
  const { id } = useParams<{ id: string }>();
  const { getDocument, qaItems, addQAItem, exportDocumentQA } = useAppContext();
  const { toast } = useToast();
  const qaFormRef = useRef<QAFormRef>(null);

  // Get document first, but don't return early yet
  const document = id ? getDocument(id) : null;

  // Always call hooks in the same order
  const { qaItems: docQAItems, loading, ask } = useQA(id || null, qaItems, addQAItem);

  // Make focus function available globally for keyboard shortcuts
  React.useEffect(() => {
    const focusQuestionInput = () => {
      qaFormRef.current?.focus();
    };

    (window as any).docViewActions = {
      focusQuestionInput,
    };

    return () => {
      delete (window as any).docViewActions;
    };
  }, []);

  // Now handle the early returns after all hooks have been called
  if (!id) {
    return <Navigate to="/" replace />;
  }

  if (!document) {
    return <Navigate to="/" replace />;
  }

  const handleAskQuestion = async (question: string) => {
    try {
      await ask(question);
      toast({
        title: 'Question submitted',
        description: 'Your answer is being generated...',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit question. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleExport = () => {
    exportDocumentQA(id);
    toast({
      title: 'Export complete',
      description: `Q&A data for ${document.name} has been downloaded.`,
    });
  };

  return (
    <div className="h-full flex flex-col mt-4">
      {/* Document Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-shrink-0 p-6 border-b bg-background/95 backdrop-blur"
      >
        <Card>
          <CardHeader className="p-3 sm:p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6">
              {/* Main content area */}
              <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
                {/* Icon - responsive sizing */}
                <div className="flex-shrink-0">
                  <GradientIcon
                    icon={FileText}
                    size={32}
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
                  />
                </div>

                {/* Document info */}
                <div className="min-w-0 flex-1">
                  {/* Title - responsive text sizing and truncation */}
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-3 pr-2">
                    {document.name}
                  </CardTitle>

                  {/* Metadata - responsive layout */}
                  <div className="flex flex-col xs:flex-row xs:flex-wrap sm:grid sm:grid-cols-2 lg:flex lg:flex-row items-start xs:items-center gap-2 xs:gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm text-muted-foreground">
                    {/* File size */}
                    <div className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                      <HardDrive className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="truncate">{formatBytes(document.size)}</span>
                    </div>

                    {/* Upload date */}
                    <div className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="truncate">
                        <span className="hidden sm:inline">Uploaded </span>
                        <span className="sm:hidden">•</span>
                        {timeAgo(document.createdAt)}
                      </span>
                    </div>

                    {/* Questions count */}
                    <div className="text-blue-600 dark:text-blue-400 whitespace-nowrap font-medium">
                      {docQAItems.length} question{docQAItems.length === 1 ? '' : 's'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Export button - responsive positioning and sizing */}
              {docQAItems.length > 0 && (
                <div className="flex-shrink-0 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    onClick={handleExport}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5 h-8 sm:h-9 lg:h-10"
                  >
                    <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">Export Q&A</span>
                    <span className="xs:hidden">Export</span>
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-4xl mx-auto p-6">
          <div className="h-full flex flex-col gap-6">
            {/* Question Form */}
            <QAForm ref={qaFormRef} onSubmit={handleAskQuestion} loading={loading} />

            {/* Q&A List */}
            <div className="flex-1 overflow-y-auto">
              <QAList qaItems={docQAItems} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
