import { renderHook, act } from '@testing-library/react';
import { useQA } from '../hooks/useQA';
import { QAItem } from '../types';

describe('Q&A Hook', () => {
  const mockQAItems: QAItem[] = [
    {
      id: 'qa1',
      docId: 'doc1',
      question: 'What is this about?',
      answer: 'This is a test document.',
      createdAt: new Date().toISOString()
    }
  ];

  const mockAddQA = jest.fn();

  beforeEach(() => {
    mockAddQA.mockClear();
  });

  test('filters QA items by document ID', () => {
    const { result } = renderHook(() => 
      useQA('doc1', mockQAItems, mockAddQA)
    );

    expect(result.current.qaItems).toHaveLength(1);
    expect(result.current.qaItems[0].docId).toBe('doc1');
  });

  test('asks question and generates answer', async () => {
    const { result } = renderHook(() => 
      useQA('doc1', [], mockAddQA)
    );

    let questionPromise: Promise<QAItem>;

    act(() => {
      questionPromise = result.current.ask('What is TypeScript?');
    });

    expect(result.current.loading).toBe(true);

    const qaItem = await questionPromise!;

    expect(mockAddQA).toHaveBeenCalledWith(qaItem);
    expect(qaItem.question).toBe('What is TypeScript?');
    expect(qaItem.answer).toBeTruthy();
    expect(qaItem.docId).toBe('doc1');
  });

  test('throws error when no document selected', async () => {
    const { result } = renderHook(() => 
      useQA(null, [], mockAddQA)
    );

    await expect(result.current.ask('test question')).rejects.toThrow('No document selected');
  });
});