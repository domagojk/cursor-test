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

          <section id="about" className="mt-24 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">
              About Our Hackathons
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Our company regularly hosts hackathons to foster innovation,
                collaboration, and creativity among our teams. These events
                provide a platform for employees to explore new technologies,
                develop prototypes, and showcase their skills.
              </p>
              <p>
                Each hackathon has a unique theme and challenges that align with
                our company&apos;s goals and vision for the future. Participants
                form cross-functional teams and work intensively over a period
                of 24-48 hours to develop their projects.
              </p>
              <p>
                Many of the projects featured in this archive have gone on to
                become integral parts of our product ecosystem or have inspired
                new features and capabilities in our existing products.
              </p>
            </div>
          </section>
        </main>

        <footer className="mt-20 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Company Name. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
