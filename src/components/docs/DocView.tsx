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
      focusQuestionInput
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
        title: "Question submitted",
        description: "Your answer is being generated..."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit question. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleExport = () => {
    exportDocumentQA(id);
    toast({
      title: "Export complete",
      description: `Q&A data for ${document.name} has been downloaded.`
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Document Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-shrink-0 p-6 border-b bg-background/95 backdrop-blur"
      >
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <GradientIcon icon={FileText} size={32} />
                <div>
                  <CardTitle className="text-xl mb-2">{document.name}</CardTitle>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-4 h-4" />
                      <span>{formatBytes(document.size)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Uploaded {timeAgo(document.createdAt)}</span>
                    </div>
                    <div className="text-blue-600 dark:text-blue-400">
                      {docQAItems.length} question{docQAItems.length === 1 ? '' : 's'}
                    </div>
                  </div>
                </div>
              </div>
              
              {docQAItems.length > 0 && (
                <Button
                  variant="outline"
                  onClick={handleExport}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export Q&A
                </Button>
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
            <QAForm
              ref={qaFormRef}
              onSubmit={handleAskQuestion}
              loading={loading}
            />

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