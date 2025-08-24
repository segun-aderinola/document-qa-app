import React from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '../ui/button';
import { useAppContext } from '../../context/AppContext';

export function ScaleControl() {
  const { uiScale, setUIScale } = useAppContext();

  const scaleOptions = [0.8, 0.85, 0.9, 0.95, 1.0];
  
  const increaseScale = () => {
    const currentIndex = scaleOptions.indexOf(uiScale);
    const nextIndex = Math.min(currentIndex + 1, scaleOptions.length - 1);
    setUIScale(scaleOptions[nextIndex]);
  };

  const decreaseScale = () => {
    const currentIndex = scaleOptions.indexOf(uiScale);
    const prevIndex = Math.max(currentIndex - 1, 0);
    setUIScale(scaleOptions[prevIndex]);
  };

  const canIncrease = uiScale < 1.0;
  const canDecrease = uiScale > 0.8;

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={decreaseScale}
        disabled={!canDecrease}
        title="Decrease UI scale"
        className="h-8 w-8"
      >
        <ZoomOut className="h-3 w-3" />
      </Button>
      
      <span className="text-xs text-muted-foreground min-w-[3rem] text-center">
        {Math.round(uiScale * 100)}%
      </span>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={increaseScale}
        disabled={!canIncrease}
        title="Increase UI scale"
        className="h-8 w-8"
      >
        <ZoomIn className="h-3 w-3" />
      </Button>
    </div>
  );
}