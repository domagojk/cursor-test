"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Project } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/project/${project.id}`);
  };

  return (
    <Card
      className="overflow-hidden transition-all hover:shadow-lg h-full cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative h-48 w-full">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{project.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Cycle: {project.cycle}
          {project.suggestedBy && (
            <div>Suggested by: {project.suggestedBy}</div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{project.description}</p>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Authors:</h4>
          <ul className="text-sm text-muted-foreground">
            {project.authors.map((author, index) => (
              <li key={index}>{author}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        <h4 className="text-sm font-medium">Links:</h4>
        <div
          className="flex flex-wrap gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {project.links.map((link, index) => (
            <Button key={index} variant="outline" size="sm" asChild>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.title}
              </a>
            </Button>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
