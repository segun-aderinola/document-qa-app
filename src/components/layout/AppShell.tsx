import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ShortcutModal } from '../common/ShortcutModal';
import { SearchResults } from '../common/SearchResults';
import { useAppContext } from '../../context/AppContext';
import { useHotkeys } from '../../hooks/useHotkeys';
import { useUploadSimulator } from '../../hooks/useUploadSimulator';
import { useToast } from '../../hooks/useToast';
import { Button } from '../ui/button';

export function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addDocument, searchResults, debouncedSearchQuery, setSearchQuery, toggleTheme } = useAppContext();
  const { startUpload } = useUploadSimulator();
  const { toast } = useToast();
  
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  
  const isHomePage = location.pathname === '/';
  const showSidebar = !isHomePage;
  const hasSearchResults = debouncedSearchQuery.trim() && searchResults.length > 0;

  const handleUpload = () => {
    // Create a file input element
    const input = window.document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.txt,.md';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        const document = await startUpload(file);
        addDocument(document);
        
        toast({
          title: "Upload successful",
          description: `${file.name} has been uploaded successfully.`
        });

        // Navigate to the document
        navigate(`/doc/${document.id}`);
      } catch (error) {
        toast({
          title: "Upload failed",
          description: "There was an error uploading your file. Please try again.",
          variant: "destructive"
        });
      }
    };
    
    input.click();
  };

  const handleFocusSearch = () => {
    (window as any).headerActions?.focusSearch();
  };

  const handleFocusQuestion = () => {
    (window as any).docViewActions?.focusQuestionInput();
  };

  const handleToggleTheme = () => {
    toggleTheme();
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    (window as any).headerActions?.clearSearch();
    setShowShortcuts(false);
    setShowMobileSidebar(false);
  };

  useHotkeys({
    onFocusSearch: handleFocusSearch,
    onFocusQuestion: handleFocusQuestion,
    onToggleTheme: handleToggleTheme,
    onShowShortcuts: () => setShowShortcuts(true),
    onClearSearch: handleClearSearch
  });

  return (
    <div className="h-screen bg-background overflow-hidden">
      {/* Header */}
      <Header
        onMenuClick={() => setShowMobileSidebar(true)}
        onShowShortcuts={() => setShowShortcuts(true)}
        showMenuButton={showSidebar}
      />

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Desktop Sidebar */}
        {showSidebar && (
          <div className="hidden md:block flex-shrink-0">
            <Sidebar onUploadClick={handleUpload} />
          </div>
        )}

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {showMobileSidebar && showSidebar && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={() => setShowMobileSidebar(false)}
              />
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed left-0 top-16 bottom-0 w-80 bg-background border-r z-50 md:hidden"
              >
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="font-semibold">Documents</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowMobileSidebar(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="h-[calc(100%-4rem)]">
                  <Sidebar onUploadClick={handleUpload} />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Content */}
          <div className={`flex-1 overflow-hidden ${hasSearchResults ? 'hidden lg:block' : ''}`}>
            <Outlet />
          </div>

          {/* Search Results */}
          {hasSearchResults && (
            <div className={`w-full lg:w-96 border-l bg-background overflow-hidden ${hasSearchResults ? 'block' : 'hidden lg:block'}`}>
              <SearchResults />
            </div>
          )}
        </div>
      </div>

      {/* Keyboard Shortcuts Modal */}
      <ShortcutModal
        open={showShortcuts}
        onOpenChange={setShowShortcuts}
      />
    </div>
  );
}