"use client";

import Image from "next/image";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
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
          {project.hackathon} • {project.date}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{project.description}</p>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Team:</h4>
          <div className="flex flex-wrap gap-2">
            {project.team.map((member, index) => (
              <Avatar key={index} className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {member
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        <h4 className="text-sm font-medium">Links:</h4>
        <div className="flex flex-wrap gap-2">
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
