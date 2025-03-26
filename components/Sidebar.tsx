"use client";

import { Project } from "@/types";
import { ProjectFilters } from "./ProjectFilters";
import { cn } from "@/lib/utils";

interface SidebarProps {
  projects: Project[];
  onFiltersChange: (filteredProjects: Project[]) => void;
  className?: string;
}

export function Sidebar({
  projects,
  onFiltersChange,
  className,
}: SidebarProps) {
  return (
    <div className={cn("w-full lg:w-64 shrink-0", className)}>
      <div className="p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <ProjectFilters projects={projects} onFiltersChange={onFiltersChange} />
      </div>
    </div>
  );
}
