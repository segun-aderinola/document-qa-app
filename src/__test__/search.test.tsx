import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

describe('Debounced Search', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('debounces value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebouncedValue(value, delay),
      {
        initialProps: { value: 'initial', delay: 300 }
      }
    );

    expect(result.current).toBe('initial');

    // Change value
    rerender({ value: 'changed', delay: 300 });
    
    // Value shouldn't change immediately
    expect(result.current).toBe('initial');

    // Fast forward time
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Now it should change
    expect(result.current).toBe('changed');
  });

  test('cancels previous debounce on rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebouncedValue(value, delay),
      {
        initialProps: { value: 'first', delay: 300 }
      }
    );

    // Multiple rapid changes
    rerender({ value: 'second', delay: 300 });
    rerender({ value: 'third', delay: 300 });
    
    // Advance time less than delay
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    expect(result.current).toBe('first');
    
    // Advance past delay
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    expect(result.current).toBe('third');
  });
});