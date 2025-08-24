import { useState, useCallback } from 'react';
import { DocumentMeta, UploadProgress } from '../types';
import { generateDocId } from '../utils/id';

interface UseUploadSimulatorResult {
  uploads: Record<string, UploadProgress>;
  startUpload: (file: File) => Promise<DocumentMeta>;
  cancelUpload: (docId: string) => void;
}

export function useUploadSimulator(): UseUploadSimulatorResult {
  const [uploads, setUploads] = useState<Record<string, UploadProgress>>({});

  const startUpload = useCallback(async (file: File): Promise<DocumentMeta> => {
    const docId = generateDocId();
    
    // Initialize upload progress
    setUploads(prev => ({
      ...prev,
      [docId]: {
        docId,
        percent: 0,
        status: 'uploading'
      }
    }));

    return new Promise((resolve, reject) => {
      const updateProgress = () => {
        setUploads(prev => {
          const current = prev[docId];
          if (!current || current.status !== 'uploading') return prev;

          const increment = Math.floor(Math.random() * 8) + 5; // 5-12%
          const newPercent = Math.min(current.percent + increment, 100);
          
          // 5% chance of failure between 20-60%
          if (newPercent >= 20 && newPercent <= 60 && Math.random() < 0.05) {
            return {
              ...prev,
              [docId]: {
                ...current,
                status: 'error'
              }
            };
          }

          if (newPercent >= 100) {
            return {
              ...prev,
              [docId]: {
                ...current,
                percent: 100,
                status: 'done'
              }
            };
          }

          return {
            ...prev,
            [docId]: {
              ...current,
              percent: newPercent
            }
          };
        });
      };

      const interval = setInterval(() => {
        updateProgress();
        
        setUploads(current => {
          const upload = current[docId];
          
          if (upload?.status === 'error') {
            clearInterval(interval);
            reject(new Error('Upload failed'));
            return current;
          }
          
          if (upload?.status === 'done') {
            clearInterval(interval);
            
            const documentMeta: DocumentMeta = {
              id: docId,
              name: file.name,
              size: file.size,
              type: file.type,
              createdAt: new Date().toISOString()
            };
            
            // Clean up upload tracking after a short delay
            setTimeout(() => {
              setUploads(prev => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { [docId]: _removed, ...rest } = prev;
                return rest;
              });
            }, 1000);
            
            resolve(documentMeta);
            return current;
          }
          
          return current;
        });
      }, Math.floor(Math.random() * 40) + 40); // 40-80ms intervals
    });
  }, []);

  const cancelUpload = useCallback((docId: string) => {
    setUploads(prev => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [docId]: _removed, ...rest } = prev;
      return rest;
    });
  }, []);

  return {
    uploads,
    startUpload,
    cancelUpload
  };
}