import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HelpCircle, Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { SearchBar, SearchBarRef } from '../common/SearchBar';
import { ThemeToggle } from '../common/ThemeToggle';
import { ScaleControl } from '../common/ScaleControl';
import { GradientIcon } from '../common/GradientIcon';
import { useAppContext } from '../../context/AppContext';

interface HeaderProps {
  onMenuClick?: () => void;
  onShowShortcuts: () => void;
  showMenuButton?: boolean;
}

export function Header({ onMenuClick, onShowShortcuts, showMenuButton = false }: HeaderProps) {
  const { searchQuery, setSearchQuery } = useAppContext();
  const searchRef = useRef<SearchBarRef>(null);
  const location = useLocation();

  const focusSearch = () => {
    searchRef.current?.focus();
  };

  const clearSearch = () => {
    searchRef.current?.clear();
  };

  // Expose methods to parent components
  React.useImperativeHandle(null, () => ({
    focusSearch,
    clearSearch
  }));

  // Make these methods available globally for keyboard shortcuts
  React.useEffect(() => {
    (window as any).headerActions = {
      focusSearch,
      clearSearch
    };
    
    return () => {
      delete (window as any).headerActions;
    };
  }, []);

  const showSearch = location.pathname !== '/';

  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="h-full px-4 flex items-center justify-between gap-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          {showMenuButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="md:hidden"
            >
              <Menu className="w-4 h-4" />
            </Button>
          )}
          
          <Link to="/" className="flex items-center gap-3">
            <GradientIcon icon={HelpCircle} size={24} />
            <span className="font-bold text-lg gradient-text">
              DocQA Suite
            </span>
          </Link>
        </div>

        {/* Center section - Search */}
        {showSearch && (
          <div className="flex-1 max-w-md mx-4">
            <SearchBar
              ref={searchRef}
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search documents and Q&A..."
            />
          </div>
        )}

        {/* Right section */}
        <div className="flex items-center gap-2">
          <ScaleControl />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={onShowShortcuts}
            title="Keyboard shortcuts (Shift + ?)"
            className="h-9 w-9"
          >
            <HelpCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}