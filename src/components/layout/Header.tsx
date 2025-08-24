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
    <header className="h-14 sm:h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="h-full px-3 sm:px-4 lg:px-6 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left section - Responsive */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          {showMenuButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="md:hidden h-8 w-8 sm:h-9 sm:w-9"
            >
              <Menu className="w-4 h-4" />
            </Button>
          )}
          
          <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
            <GradientIcon icon={HelpCircle} size={20} className="sm:hidden" />
            <GradientIcon icon={HelpCircle} size={24} className="hidden sm:block" />
            <span className="font-bold text-sm sm:text-base lg:text-lg gradient-text truncate">
              DocQA Suite
            </span>
          </Link>
        </div>

        {/* Center section - Search (Hidden on small screens if no space) */}
        {showSearch && (
          <div className="hidden sm:flex flex-1 max-w-md lg:max-w-lg mx-4">
            <SearchBar
              ref={searchRef}
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search documents and Q&A..."
              className="w-full"
            />
          </div>
        )}

        {/* Right section - Responsive controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Mobile search button */}
          {showSearch && (
            <Button
              variant="ghost"
              size="icon"
              onClick={focusSearch}
              className="sm:hidden h-8 w-8"
              title="Search"
            >
              <HelpCircle className="w-4 h-4" />
            </Button>
          )}
          
          {/* Desktop controls */}
          <div className="hidden sm:flex items-center gap-2">
            <ScaleControl />
          </div>
          
          <ThemeToggle />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onShowShortcuts}
            title="Keyboard shortcuts"
            className="h-8 w-8 sm:h-9 sm:w-9"
          >
            <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </div>
      </div>

      {/* Mobile search bar - Show below header when needed */}
      {showSearch && (
        <div className="sm:hidden border-t px-3 py-2 bg-background/95">
          <SearchBar
            ref={searchRef}
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search documents and Q&A..."
            className="w-full"
          />
        </div>
      )}
    </header>
  );
}