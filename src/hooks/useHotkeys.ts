import { useHotkeys as useHotkeysHook } from 'react-hotkeys-hook';

interface UseHotkeysProps {
  onFocusSearch: () => void;
  onFocusQuestion: () => void;
  onToggleTheme: () => void;
  onShowShortcuts: () => void;
  onClearSearch: () => void;
}

export function useHotkeys({
  onFocusSearch,
  onFocusQuestion,
  onToggleTheme,
  onShowShortcuts,
  onClearSearch
}: UseHotkeysProps) {
  // Focus search - allow in form elements since it's specifically for search
  useHotkeysHook('/', (event) => {
    event.preventDefault();
    onFocusSearch();
  }, {
    enableOnFormTags: ['INPUT', 'TEXTAREA', 'SELECT']
  });

  // Focus question input
  useHotkeysHook('n', (event) => {
    // Only if not in an input
    if (!['INPUT', 'TEXTAREA', 'SELECT'].includes((event.target as HTMLElement).tagName)) {
      event.preventDefault();
      onFocusQuestion();
    }
  });

  // Toggle theme
  useHotkeysHook('d', (event) => {
    // Only if not in an input
    if (!['INPUT', 'TEXTAREA', 'SELECT'].includes((event.target as HTMLElement).tagName)) {
      event.preventDefault();
      onToggleTheme();
    }
  });

  // Show shortcuts
  useHotkeysHook('shift+/', (event) => {
    event.preventDefault();
    onShowShortcuts();
  });

  // Clear search
  useHotkeysHook('escape', (event) => {
    event.preventDefault();
    onClearSearch();
  });
}