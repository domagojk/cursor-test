"use client";

import { ProjectGrid } from "@/components/ProjectGrid";
import { ProjectList } from "@/components/ProjectList";
import { ViewToggle, ViewMode } from "@/components/ViewToggle";
import { Sidebar } from "@/components/Sidebar";
import { Pagination } from "@/components/Pagination";
import projects from "@/data/projects.json";
import { Project } from "@/types";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect, useMemo, Suspense } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function HomeContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const pageParam = searchParams.get("page");
  const perPageParam = searchParams.get("perPage");

  const [filteredProjects, setFilteredProjects] = useState<Project[]>(
    projects as Project[]
  );
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [currentPage, setCurrentPage] = useState(
    pageParam ? parseInt(pageParam) : 1
  );
  const [itemsPerPage, setItemsPerPage] = useState(
    perPageParam ? parseInt(perPageParam) : 10
  );

  // Update URL when pagination changes
  const updateUrlParams = (page: number, perPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    params.set("perPage", perPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateUrlParams(page, itemsPerPage);
  };

  // Handle items per page changes
  const handleItemsPerPageChange = (perPage: number) => {
    setItemsPerPage(perPage);
    // When changing items per page, reset to first page
    setCurrentPage(1);
    updateUrlParams(1, perPage);
  };

  // Calculate paginated projects
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProjects, currentPage, itemsPerPage]);

  useEffect(() => {
    // Check if a view preference is stored in localStorage
    const savedView = localStorage.getItem("projectViewMode");
    if (savedView === "grid" || savedView === "list") {
      setViewMode(savedView as ViewMode);
    }
  }, []);

  // If URL parameters exist, synchronize state with them
  useEffect(() => {
    if (pageParam) {
      const page = parseInt(pageParam);
      if (!isNaN(page) && page > 0) {
        setCurrentPage(page);
      }
    }

    if (perPageParam) {
      const perPage = parseInt(perPageParam);
      if (!isNaN(perPage) && [5, 10, 15, 20].includes(perPage)) {
        setItemsPerPage(perPage);
      }
    }
  }, [pageParam, perPageParam]);

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
          <div className="flex flex-col lg:flex-row gap-6">
            <Sidebar
              projects={projects as Project[]}
              onFiltersChange={setFilteredProjects}
              className="mb-6 lg:mb-0"
            />

            <div className="flex-1">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Items per page:
                  </span>
                  <Select
                    value={itemsPerPage.toString()}
                    onValueChange={(value) =>
                      handleItemsPerPageChange(parseInt(value))
                    }
                  >
                    <SelectTrigger className="w-16 h-8">
                      <SelectValue placeholder={itemsPerPage.toString()} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="15">15</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <ViewToggle
                  currentView={viewMode}
                  onViewChange={handleViewChange}
                />
              </div>

              <div>
                {viewMode === "grid" ? (
                  <ProjectGrid projects={paginatedProjects} />
                ) : (
                  <ProjectList projects={paginatedProjects} />
                )}

                <Pagination
                  totalItems={filteredProjects.length}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-20 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Company Name. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

// Add a loading fallback component
function LoadingFallback() {
  return <div className="p-4">Loading...</div>;
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <HomeContent />
    </Suspense>
  );
}
