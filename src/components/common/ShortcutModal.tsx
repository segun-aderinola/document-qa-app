import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Card } from '../ui/card';

interface ShortcutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const shortcuts = [
  { key: '/', description: 'Focus search bar' },
  { key: 'N', description: 'Focus question input (when viewing a document)' },
  { key: 'D', description: 'Toggle theme (Light → Dark → System)' },
  { key: 'Shift + ?', description: 'Show keyboard shortcuts' },
  { key: 'Esc', description: 'Clear search or close modals' },
  { key: 'Cmd + Enter', description: 'Submit question (when typing)' },
];

export function ShortcutModal({ open, onOpenChange }: ShortcutModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <Card key={index} className="p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {shortcut.description}
                </span>
                <kbd className="px-2 py-1 bg-muted text-muted-foreground text-xs font-mono rounded border">
                  {shortcut.key}
                </kbd>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="pt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Press <kbd className="px-1 bg-muted rounded text-xs">Esc</kbd> to close
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}