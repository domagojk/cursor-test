export interface ProjectLink {
  title: string;
  url: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  links: ProjectLink[];
  authors: string[];
  cycle: string;
  suggestedBy?: string;
}
