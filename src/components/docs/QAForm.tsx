import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface QAFormProps {
  onSubmit: (question: string) => void;
  loading?: boolean;
  disabled?: boolean;
}

export interface QAFormRef {
  focus: () => void;
  clear: () => void;
}

const MAX_LENGTH = 500;

export const QAForm = forwardRef<QAFormRef, QAFormProps>(
  ({ onSubmit, loading = false, disabled = false }, ref) => {
    const [question, setQuestion] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        textareaRef.current?.focus();
      },
      clear: () => {
        setQuestion('');
        textareaRef.current?.focus();
      }
    }));

    const isValid = question.trim().length > 0 && question.length <= MAX_LENGTH;
    const isNearLimit = question.length > MAX_LENGTH * 0.8;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!isValid || loading || disabled) return;
      
      onSubmit(question.trim());
      setQuestion('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleSubmit(e);
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <Card className="p-3 sm:p-4 lg:p-6">
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <Textarea
                ref={textareaRef}
                placeholder="Ask a question about this document..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading || disabled}
                className="min-h-[80px] sm:min-h-[100px] lg:min-h-[120px] resize-none text-sm sm:text-base"
                maxLength={MAX_LENGTH}
              />
              
              {/* Mobile: Stack info vertically */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 text-xs">
                <span className="text-muted-foreground order-2 sm:order-1">
                  Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">
                    {navigator.platform.includes('Mac') ? 'Cmd' : 'Ctrl'}+Enter
                  </kbd> to send
                </span>
                <span 
                  className={`transition-colors order-1 sm:order-2 self-end sm:self-auto ${
                    isNearLimit 
                      ? question.length > MAX_LENGTH 
                        ? 'text-red-500' 
                        : 'text-orange-500'
                      : 'text-muted-foreground'
                  }`}
                >
                  {question.length}/{MAX_LENGTH}
                </span>
              </div>
            </div>
            
            {/* Responsive button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={!isValid || loading || disabled}
                className="flex items-center gap-2 w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6"
                size="default"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span className="sm:inline">
                  {loading ? 'Asking...' : 'Ask Question'}
                </span>
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    );
  }
);