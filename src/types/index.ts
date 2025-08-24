export type DocId = string;

export interface DocumentMeta {
  id: DocId;
  name: string;
  size: number;       // bytes
  type: string;       // MIME
  createdAt: string;  // ISO
}

export interface QAItem {
  id: string;
  docId: DocId;
  question: string;
  answer: string;
  createdAt: string;  // ISO
}

export type UploadStatus = "idle" | "uploading" | "done" | "error";

export interface UploadProgress {
  docId: DocId;
  percent: number;    // 0-100
  status: UploadStatus;
}

export interface SearchResult {
  qaItem: QAItem;
  document: DocumentMeta;
  matchedText: string;
  type: 'question' | 'answer';
}

export type Theme = 'light' | 'dark' | 'system';

export interface AppState {
  documents: DocumentMeta[];
  qaItems: QAItem[];
  uploads: Record<string, UploadProgress>;
  theme: Theme;
  uiScale: number;
  searchQuery: string;
}