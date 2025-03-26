import { ProjectGrid } from "@/components/ProjectGrid";
import projects from "@/data/projects.json";
import { Project } from "@/types";

export default function Home() {
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
          <ProjectGrid projects={projects as Project[]} />
        </main>

        <footer className="mt-20 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Company Name. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
