"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      const cards = containerRef.current.querySelectorAll('.animated-card');
      cards.forEach((card) => {
        if (card instanceof HTMLElement) {
          card.style.transform = `perspective(1000px) rotateY(${x * 4}deg) rotateX(${y * -4}deg) translateZ(10px)`;
        }
      });
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const handleBookConsult = () => {
    const contactSection = document.querySelector("#contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleViewWork = () => {
    const portfolioSection = document.querySelector("#portfolio");
    portfolioSection?.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <section 
      id="home" 
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden"
      ref={containerRef}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-blue-500/5 to-background"></div>
      
      <div className="container px-4 flex flex-col items-center text-center">
        <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm leading-none mb-8 animate-fade-in gradient-border">
          <span className="flex h-2 w-2 rounded-full bg-gradient-to-r from-primary via-blue-500 to-cyan-500 mr-2"></span>
          <span>Hi! We're Zach & Dylan</span>
        </div>
        
        <h1 className="font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 max-w-5xl md:leading-tight">
          We build <span className="gradient-text">beautiful</span> websites that{" "}
          <span className="relative gradient-text inline-block">
            work
            <span className="absolute -bottom-1 left-0 h-[6px] w-full bg-gradient-to-r from-primary via-blue-500 to-cyan-500 rounded-sm opacity-50"></span>
          </span>
        </h1>
        
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10">
          We're two developers passionate about helping small businesses grow online. 
          We build fast, mobile-first websites that make your business look great.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-20">
          <Button size="lg" className="group animate-fade-in gradient-border bg-background" onClick={handleBookConsult}>
            <span>Book Free Consultation</span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="animate-fade-in delay-100" onClick={handleViewWork}>
            View Our Work
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mx-auto">
          {[
            {
              icon: <Code className="h-12 w-12 mb-4" />,
              title: "Clean Code",
              description: "We write clean, maintainable code that scales with your business.",
              gradient: "from-primary via-blue-500 to-cyan-500",
            },
            {
              icon: <Sparkles className="h-12 w-12 mb-4" />,
              title: "Beautiful Design",
              description: "Pixel-perfect UI/UX design that engages and delights your users.",
              gradient: "from-purple-500 via-pink-500 to-rose-500",
            },
            {
              icon: <Zap className="h-12 w-12 mb-4" />,
              title: "Fast Performance",
              description: "Optimized for speed to ensure the best user experience.",
              gradient: "from-amber-500 via-orange-500 to-red-500",
            },
          ].map((card, index) => (
            <div
              key={index}
              className={cn(
                "group relative p-8 rounded-xl transition-all duration-300 animated-card animate-fade-in overflow-hidden",
                "bg-gradient-to-br from-background to-background border",
                "hover:border-transparent"
              )}
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              <div className={cn(
                "absolute inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                "bg-gradient-to-br",
                card.gradient,
                "blur-xl"
              )} />
              <div className="relative bg-background/80 backdrop-blur-sm rounded-lg p-6">
                <div className={cn(
                  "inline-flex p-3 rounded-lg mb-4",
                  "bg-gradient-to-br",
                  card.gradient,
                  "bg-clip-text"
                )}>
                  {React.cloneElement(card.icon, {
                    className: cn(
                      card.icon.props.className,
                      "text-transparent"
                    )
                  })}
                </div>
                <h3 className="font-semibold text-xl mb-2">{card.title}</h3>
                <p className="text-muted-foreground">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-primary/20 via-blue-500/10 to-transparent blur-3xl rounded-full -z-10"></div>
    </section>
  );
}