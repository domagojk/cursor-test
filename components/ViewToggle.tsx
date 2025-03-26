"use client";

import { Button } from "@/components/ui/button";
import { GridIcon, ListIcon } from "lucide-react";

export type ViewMode = "grid" | "list";

interface ViewToggleProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={currentView === "grid" ? "default" : "outline"}
        size="sm"
        onClick={() => onViewChange("grid")}
        aria-label="Grid View"
      >
        <GridIcon className="h-4 w-4" />
      </Button>
      <Button
        variant={currentView === "list" ? "default" : "outline"}
        size="sm"
        onClick={() => onViewChange("list")}
        aria-label="List View"
      >
        <ListIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
