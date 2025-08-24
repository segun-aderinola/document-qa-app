import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import { DocumentMeta, QAItem, SearchResult, Theme } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTheme } from '../hooks/useTheme';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { STORAGE_KEYS } from '../utils/storageKeys';

interface AppContextType {
  // Documents
  documents: DocumentMeta[];
  addDocument: (document: DocumentMeta) => void;
  removeDocument: (docId: string) => void;
  getDocument: (docId: string) => DocumentMeta | undefined;
  
  // Q&A
  qaItems: QAItem[];
  addQAItem: (qaItem: QAItem) => void;
  getQAForDoc: (docId: string) => QAItem[];
  
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  debouncedSearchQuery: string;
  searchResults: SearchResult[];
  
  // Theme
  theme: Theme;
  effectiveTheme: 'light' | 'dark';
  toggleTheme: () => void;
  
  // UI Scale
  uiScale: number;
  setUIScale: (scale: number) => void;
  
  // Export
  exportDocumentQA: (docId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [documents, setDocuments] = useLocalStorage<DocumentMeta[]>(STORAGE_KEYS.DOCS, []);
  const [qaItems, setQAItems] = useLocalStorage<QAItem[]>(STORAGE_KEYS.QA, []);
  const [searchQuery, setSearchQuery] = useLocalStorage<string>('docqa:search', '');
  const [uiScale, setUIScale] = useLocalStorage<number>(STORAGE_KEYS.SCALE, 0.9);
  
  const { theme, effectiveTheme, toggleTheme } = useTheme();
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);

  // Document operations
  const addDocument = useCallback((document: DocumentMeta) => {
    setDocuments(prev => [document, ...prev]);
  }, [setDocuments]);

  const removeDocument = useCallback((docId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId));
    setQAItems(prev => prev.filter(qa => qa.docId !== docId));
  }, [setDocuments, setQAItems]);

  const getDocument = useCallback((docId: string) => {
    return documents.find(doc => doc.id === docId);
  }, [documents]);

  // Q&A operations
  const addQAItem = useCallback((qaItem: QAItem) => {
    setQAItems(prev => [qaItem, ...prev]);
  }, [setQAItems]);

  const getQAForDoc = useCallback((docId: string) => {
    return qaItems.filter(qa => qa.docId === docId);
  }, [qaItems]);

  // Search
  const searchResults = React.useMemo(() => {
    if (!debouncedSearchQuery.trim()) return [];

    const query = debouncedSearchQuery.toLowerCase();
    const results: SearchResult[] = [];

    qaItems.forEach(qaItem => {
      const document = documents.find(doc => doc.id === qaItem.docId);
      if (!document) return;

      // Search in question
      if (qaItem.question.toLowerCase().includes(query)) {
        results.push({
          qaItem,
          document,
          matchedText: qaItem.question,
          type: 'question'
        });
      }

      // Search in answer
      if (qaItem.answer.toLowerCase().includes(query)) {
        results.push({
          qaItem,
          document,
          matchedText: qaItem.answer,
          type: 'answer'
        });
      }
    });

    return results;
  }, [debouncedSearchQuery, qaItems, documents]);

  // Export functionality
  const exportDocumentQA = useCallback((docId: string) => {
    const documentMeta = getDocument(docId);
    const docQAItems = getQAForDoc(docId);

    if (!documentMeta) return;

    const exportData = {
      document: documentMeta,
      qaItems: docQAItems,
      exportedAt: new Date().toISOString(),
      totalQuestions: docQAItems.length
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });

    const url = URL.createObjectURL(blob);
    const link = window.document.createElement('a');
    link.href = url;
    link.download = `doc-${docId}.json`;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [getDocument, getQAForDoc]);

  // Update CSS custom property for UI scale
  React.useEffect(() => {
    document.documentElement.style.setProperty('--ui-scale', uiScale.toString());
  }, [uiScale]);

  const value: AppContextType = {
    documents,
    addDocument,
    removeDocument,
    getDocument,
    qaItems,
    addQAItem,
    getQAForDoc,
    searchQuery,
    setSearchQuery,
    debouncedSearchQuery,
    searchResults,
    theme,
    effectiveTheme,
    toggleTheme,
    uiScale,
    setUIScale,
    exportDocumentQA
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}