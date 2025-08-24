import { useState, useCallback, useMemo } from 'react';
import { QAItem, DocId } from '../types';
import { generateQAId } from '../utils/id';
import { generateMockAnswer } from './generateMockAnswer';

interface UseQAResult {
  qaItems: QAItem[];
  loading: boolean;
  ask: (question: string) => Promise<QAItem>;
  getQAForDoc: (docId: DocId) => QAItem[];
}

export function useQA(
  docId: DocId | null,
  allQAItems: QAItem[],
  onAddQA: (qaItem: QAItem) => void
): UseQAResult {
  const [loading, setLoading] = useState(false);

  const qaItems = useMemo(() => {
    return docId ? allQAItems.filter(qa => qa.docId === docId) : [];
  }, [allQAItems, docId]);

  const ask = useCallback(async (question: string): Promise<QAItem> => {
    if (!docId) {
      throw new Error('No document selected');
    }

    setLoading(true);
    
    // Create pending QA item
    const qaId = generateQAId();
    const pendingQA: QAItem = {
      id: qaId,
      docId,
      question,
      answer: '',
      createdAt: new Date().toISOString()
    };

    try {
      // Simulate API delay
      const delay = Math.floor(Math.random() * 700) + 800; // 800-1500ms
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Generate mock answer
      const answer = generateMockAnswer(question);
      
      const completedQA: QAItem = {
        ...pendingQA,
        answer
      };

      onAddQA(completedQA);
      return completedQA;
    } catch (error) {
      throw new Error('Failed to generate answer');
    } finally {
      setLoading(false);
    }
  }, [docId, onAddQA]);

  const getQAForDoc = useCallback((targetDocId: DocId): QAItem[] => {
    return allQAItems.filter(qa => qa.docId === targetDocId);
  }, [allQAItems]);

  return {
    qaItems,
    loading,
    ask,
    getQAForDoc
  };
}