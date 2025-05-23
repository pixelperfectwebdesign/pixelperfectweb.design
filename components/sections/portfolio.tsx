"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "Corporate Website Redesign",
    description:
      "Complete overhaul of a financial services website with improved UI/UX.",
    image:
      "https://images.pexels.com/photos/5989933/pexels-photo-5989933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["React", "Framer Motion", "TypeScript"],
  },
  {
    title: "Restaurant Deals App",
    description:
      "Mobile application for a local restaurant chain with real-time order tracking.",
    image:
      "https://images.pexels.com/photos/5053848/pexels-photo-5053848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Flutter", "Node.js", "Google Maps API"],
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const projects = sectionRef.current?.querySelectorAll(".project-card");
    projects?.forEach((project) => {
      observer.observe(project);
    });

    return () => {
      projects?.forEach((project) => {
        observer.unobserve(project);
      });
    };
  }, []);

  return (
    <section
      id="portfolio"
      className="py-20 md:py-32 bg-muted/40"
      ref={sectionRef}
    >
      <div className="container px-4">
        <Badge className="mb-4" variant="outline">
          Our Work
        </Badge>
        <div className="flex flex-col md:flex-row justify-between items-start mb-12">
          <h2 className="text-3xl md:text-4xl font-bold max-w-md mb-4 md:mb-0">
            Recent <span className="text-primary">projects</span> we're proud of
          </h2>
          <p className="text-muted-foreground max-w-md">
            Here are some examples of our recent work. Each project is crafted with attention to detail and focus on user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className={cn(
                "project-card group relative rounded-xl overflow-hidden border bg-card opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="font-normal text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button variant="outline" size="lg">
            View All Projects
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}