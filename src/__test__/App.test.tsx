import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  motion: {
    div: 'div',
    button: 'button',
    form: 'form',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock react-markdown to avoid issues with remark plugins
jest.mock('react-markdown', () => {
  return function MockReactMarkdown({ children }: { children: string }) {
    return <div data-testid="markdown-content">{children}</div>;
  };
});

describe('App', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('renders app and shows home page', () => {
    render(<App />);
    
    expect(screen.getByText('Document Q&A Suite')).toBeInTheDocument();
    expect(screen.getByText(/Upload your documents and ask intelligent questions/)).toBeInTheDocument();
  });

  test('toggles theme', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Find theme toggle button
    const themeButton = screen.getByTitle(/theme/i);
    expect(themeButton).toBeInTheDocument();
    
    // Click to toggle theme
    await user.click(themeButton);
    
    // Check if theme changed (this would require checking the document class or localStorage)
    expect(localStorage.getItem('docqa:theme')).toBeTruthy();
  });

  test('shows keyboard shortcuts modal', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Find shortcuts button
    const shortcutsButton = screen.getByTitle(/keyboard shortcuts/i);
    await user.click(shortcutsButton);
    
    // Check if modal appears
    expect(screen.getByText('Keyboard Shortcuts')).toBeInTheDocument();
  });

  test('has file upload capability', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Create a mock file
    const file = new File(['hello world'], 'test.txt', { type: 'text/plain' });
    
    // Look for dropzone text to ensure upload area is present
    expect(screen.getByText(/Upload Document/i)).toBeInTheDocument();
    expect(screen.getByText(/Drag and drop a file here/i)).toBeInTheDocument();
    
    // Verify the upload area accepts the correct file types
    expect(screen.getByText(/Supports: PDF, DOC, DOCX, TXT, MD/i)).toBeInTheDocument();
  });
});