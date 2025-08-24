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
      >
        <Card className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Textarea
                ref={textareaRef}
                placeholder="Ask a question about this document..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading || disabled}
                className="min-h-[100px] resize-none"
                maxLength={MAX_LENGTH}
              />
              
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">
                  Press Cmd+Enter to send
                </span>
                <span 
                  className={`transition-colors ${
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
            
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={!isValid || loading || disabled}
                className="flex items-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {loading ? 'Asking...' : 'Ask Question'}
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    );
  }
);