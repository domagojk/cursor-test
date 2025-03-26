# Hackathon Project Archive

A web application for showcasing company hackathon projects. Built with Next.js, React, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- Displays a collection of hackathon projects
- Each project includes:
  - Title and description
  - Project image
  - Team members
  - External links
  - Hackathon event and date
- Responsive design that works on mobile and desktop
- Clean, modern UI using shadcn/ui components

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd hackathon-history-cursor
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Run the development server

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Project Structure

- `app/` - Next.js app router pages and layouts
- `components/` - Reusable React components
  - `ui/` - shadcn UI components
  - `ProjectCard.tsx` - Card component for displaying project details
  - `ProjectGrid.tsx` - Grid component for displaying multiple projects
  - `Navbar.tsx` - Navigation bar component
- `data/` - JSON data for projects
- `public/` - Static assets including images
- `types/` - TypeScript type definitions

## Customizing Projects

To add, modify or remove projects, edit the `data/projects.json` file. Each project should follow this structure:

```json
{
  "id": 1,
  "title": "Project Title",
  "description": "Project description text",
  "image": "/images/project-image.jpg",
  "links": [
    {
      "title": "Link Title",
      "url": "https://example.com"
    }
  ],
  "team": ["Team Member 1", "Team Member 2"],
  "hackathon": "Hackathon Name",
  "date": "Month Year"
}
```

## License

This project is licensed under the MIT License.
