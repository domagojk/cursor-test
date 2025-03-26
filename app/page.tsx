"use client";

import { ProjectGrid } from "@/components/ProjectGrid";
import { ProjectList } from "@/components/ProjectList";
import { ProjectFilters } from "@/components/ProjectFilters";
import { ViewToggle, ViewMode } from "@/components/ViewToggle";
import projects from "@/data/projects.json";
import { Project } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(
    projects as Project[]
  );
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  useEffect(() => {
    // Check if a view preference is stored in localStorage
    const savedView = localStorage.getItem("projectViewMode");
    if (savedView === "grid" || savedView === "list") {
      setViewMode(savedView as ViewMode);
    }
  }, []);

  useEffect(() => {
    if (projectId) {
      const project = projects.find((p) => p.id === parseInt(projectId));
      if (project) {
        router.push(`/project/${projectId}`);
      }
    }
  }, [projectId, router]);

  const handleViewChange = (newView: ViewMode) => {
    setViewMode(newView);
    // Save view preference to localStorage
    localStorage.setItem("projectViewMode", newView);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-12 px-4 sm:px-6 md:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Company Hackathon Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcasing the innovative projects built during our company
            hackathons.
          </p>
        </header>

        <main>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex-grow">
              <ProjectFilters
                projects={projects as Project[]}
                onFiltersChange={setFilteredProjects}
              />
            </div>
            <div className="self-end sm:self-auto mt-4 sm:mt-0">
              <ViewToggle
                currentView={viewMode}
                onViewChange={handleViewChange}
              />
            </div>
          </div>

          <div className="mt-6">
            {viewMode === "grid" ? (
              <ProjectGrid projects={filteredProjects} />
            ) : (
              <ProjectList projects={filteredProjects} />
            )}
          </div>
        </main>

        <footer className="mt-20 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Company Name. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
