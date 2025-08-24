import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FileText, MessageSquare, Bot } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { EmptyState } from './EmptyState';
import { GradientIcon } from './GradientIcon';
import { useAppContext } from '../../context/AppContext';
import { highlightText } from '../../utils/format';

export function SearchResults() {
  const { searchResults, debouncedSearchQuery, setSearchQuery } = useAppContext();
  const navigate = useNavigate();

  const handleResultClick = (docId: string) => {
    navigate(`/doc/${docId}`);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  if (!debouncedSearchQuery.trim()) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Search Results</h3>
          <p className="text-sm text-muted-foreground">
            Enter a search query to find Q&A across all documents
          </p>
        </div>
      </div>
    );
  }

  if (searchResults.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Search Results</h3>
            <Button variant="ghost" size="sm" onClick={handleClearSearch}>
              Clear
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            No results for "{debouncedSearchQuery}"
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <EmptyState
            title="No matches found"
            description="Try a different search term or check your spelling"
            icon="Search"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Search Results</h3>
          <Button variant="ghost" size="sm" onClick={handleClearSearch}>
            Clear
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {searchResults.length} result{searchResults.length === 1 ? '' : 's'} for "{debouncedSearchQuery}"
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {searchResults.map((result, index) => (
          <motion.div
            key={`${result.qaItem.id}-${result.type}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <SearchResultCard
              result={result}
              query={debouncedSearchQuery}
              onClick={() => handleResultClick(result.document.id)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface SearchResultCardProps {
  result: any;
  query: string;
  onClick: () => void;
}

function SearchResultCard({ result, query, onClick }: SearchResultCardProps) {
  const isQuestion = result.type === 'question';
  const icon = isQuestion ? MessageSquare : Bot;
  const title = isQuestion ? 'Question' : 'Answer';
  
  // Truncate text and highlight matches
  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const displayText = truncateText(result.matchedText);
  const highlightedText = highlightText(displayText, query);

  return (
    <Card 
      className="p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start gap-3">
          <GradientIcon icon={FileText} size={16} />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate">
              {result.document.name}
            </h4>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <GradientIcon icon={icon} size={12} />
              <span>{title}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div 
          className="text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: highlightedText }}
        />
      </div>
    </Card>
  );
}