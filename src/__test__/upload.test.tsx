import { renderHook, act } from '@testing-library/react';
import { useUploadSimulator } from '../hooks/useUploadSimulator';

describe('Upload Simulator', () => {
  test('simulates upload progress', async () => {
    const { result } = renderHook(() => useUploadSimulator());
    
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
    
    let uploadPromise: Promise<any>;
    
    act(() => {
      uploadPromise = result.current.startUpload(file);
    });
    
    // Check that upload started
    expect(Object.keys(result.current.uploads)).toHaveLength(1);
    
    const uploadId = Object.keys(result.current.uploads)[0];
    expect(result.current.uploads[uploadId].status).toBe('uploading');
    expect(result.current.uploads[uploadId].percent).toBe(0);
    
    // Wait for upload to complete
    const document = await uploadPromise!;
    
    expect(document).toEqual({
      id: expect.any(String),
      name: 'test.txt',
      size: file.size,
      type: 'text/plain',
      createdAt: expect.any(String)
    });
  });
  
  test('can cancel upload', () => {
    const { result } = renderHook(() => useUploadSimulator());
    
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    
    act(() => {
      result.current.startUpload(file);
    });
    
    const uploadId = Object.keys(result.current.uploads)[0];
    
    act(() => {
      result.current.cancelUpload(uploadId);
    });
    
    expect(Object.keys(result.current.uploads)).toHaveLength(0);
  });
});