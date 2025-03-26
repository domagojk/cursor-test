"use client";

import { Project } from "@/types";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ProjectFiltersProps {
  projects: Project[];
  onFiltersChange: (filteredProjects: Project[]) => void;
}

export function ProjectFilters({
  projects,
  onFiltersChange,
}: ProjectFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("all");
  const [selectedCycle, setSelectedCycle] = useState("all");
  const [selectedSuggestedBy, setSelectedSuggestedBy] = useState("all");

  // Extract unique values for filter dropdowns
  const uniqueAuthors = Array.from(
    new Set(projects.flatMap((project) => project.authors))
  ).sort();

  const uniqueCycles = Array.from(
    new Set(projects.map((project) => project.cycle))
  ).sort((a, b) => b.localeCompare(a)); // Sort cycles in reverse order (newest first)

  const uniqueSuggestedBy = Array.from(
    new Set(
      projects.map((project) => project.suggestedBy).filter(Boolean) as string[]
    )
  ).sort();

  // Apply filters when any filter value changes
  useEffect(() => {
    const filtered = projects.filter((project) => {
      // Search term filter (title or description)
      const matchesSearch =
        searchTerm === "" ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Author filter
      const matchesAuthor =
        selectedAuthor === "all" || project.authors.includes(selectedAuthor);

      // Cycle filter
      const matchesCycle =
        selectedCycle === "all" || project.cycle === selectedCycle;

      // Suggested by filter
      const matchesSuggestedBy =
        selectedSuggestedBy === "all" ||
        project.suggestedBy === selectedSuggestedBy;

      return (
        matchesSearch && matchesAuthor && matchesCycle && matchesSuggestedBy
      );
    });

    onFiltersChange(filtered);
  }, [
    searchTerm,
    selectedAuthor,
    selectedCycle,
    selectedSuggestedBy,
    projects,
    onFiltersChange,
  ]);

  return (
    <div className="mb-8 grid gap-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-1">
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="author">Author</Label>
        <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
          <SelectTrigger id="author">
            <SelectValue placeholder="All authors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All authors</SelectItem>
            {uniqueAuthors.map((author) => (
              <SelectItem key={author} value={author}>
                {author}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cycle">Cycle</Label>
        <Select value={selectedCycle} onValueChange={setSelectedCycle}>
          <SelectTrigger id="cycle">
            <SelectValue placeholder="All cycles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All cycles</SelectItem>
            {uniqueCycles.map((cycle) => (
              <SelectItem key={cycle} value={cycle}>
                {cycle}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="suggestedBy">Suggested By</Label>
        <Select
          value={selectedSuggestedBy}
          onValueChange={setSelectedSuggestedBy}
        >
          <SelectTrigger id="suggestedBy">
            <SelectValue placeholder="All suggesters" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All suggesters</SelectItem>
            {uniqueSuggestedBy.map((suggester) => (
              <SelectItem key={suggester} value={suggester}>
                {suggester}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
