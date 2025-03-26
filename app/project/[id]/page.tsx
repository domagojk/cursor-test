import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import projects from "@/data/projects.json";
import { Project } from "@/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(
  props: ProjectPageProps
): Promise<Metadata> {
  const params = await props.params;
  const project = projects.find((p) => p.id === parseInt(params.id));

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Hackathon Project`,
    description: project.description,
  };
}

export default async function ProjectPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const project = projects.find((p) => p.id === parseInt(params.id)) as Project;

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 md:px-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        ← Back to all projects
      </Link>

      <Card className="overflow-hidden">
        <div className="relative h-64 w-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <CardHeader>
          <CardTitle className="text-2xl">{project.title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Cycle: {project.cycle}
            {project.suggestedBy && (
              <div>Suggested by: {project.suggestedBy}</div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{project.description}</p>

          <div className="mt-6">
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
    </div>
  );
}
