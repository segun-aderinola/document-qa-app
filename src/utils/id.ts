import { nanoid } from 'nanoid';

export const generateId = (): string => nanoid();
export const generateDocId = (): string => `doc_${nanoid()}`;
export const generateQAId = (): string => `qa_${nanoid()}`;