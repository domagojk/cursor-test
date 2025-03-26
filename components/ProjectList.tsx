"use client";

import { Project } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const router = useRouter();

  const handleProjectClick = (projectId: number) => {
    router.push(`/project/${projectId}`);
  };

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card
          key={project.id}
          className="overflow-hidden transition-all hover:shadow-lg cursor-pointer"
          onClick={() => handleProjectClick(project.id)}
        >
          <div className="flex flex-col md:flex-row">
            <div className="relative h-48 w-full md:w-64 flex-shrink-0">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col flex-grow">
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Cycle: {project.cycle}
                  {project.suggestedBy && (
                    <div>Suggested by: {project.suggestedBy}</div>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Authors:</h4>
                    <ul className="text-sm text-muted-foreground">
                      {project.authors.map((author, index) => (
                        <li key={index}>{author}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Links:</h4>
                    <div
                      className="flex flex-wrap gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {project.links.map((link, index) => (
                        <Button key={index} variant="outline" size="sm" asChild>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.title}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
