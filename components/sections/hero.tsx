'use client';

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Briefcase } from "lucide-react";
import { PopupWidget } from "react-calendly";

export default function Hero() {
  useEffect(() => {
    if (!window.Calendly) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleBookConsultation = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/your-calendly-url' });
    }
  };

  const handleViewWork = () => {
    const portfolioSection = document.querySelector("#portfolio");
    portfolioSection?.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <section 
      id="home" 
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-muted/50" />
      
      <div className="container px-4 flex flex-col items-center text-center">
        <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm leading-none mb-8 animate-fade-in">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
          <span>Hi! We're Zach & Dylan</span>
        </div>
        
        <h1 className="font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 max-w-5xl md:leading-tight">
          We build <span className="text-primary">beautiful</span> websites that{" "}
          <span className="relative text-primary inline-block">
            work
            <span className="absolute -bottom-1 left-0 h-[6px] w-full bg-primary/20 rounded-sm"></span>
          </span>
        </h1>
        
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10">
          We're two developers passionate about helping small businesses grow online. 
          We build fast, mobile-first websites that make your business look great.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button size="lg" className="group animate-fade-in" onClick={handleBookConsultation}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Book Free Consultation</span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="animate-fade-in delay-100" onClick={handleViewWork}>
            <Briefcase className="mr-2 h-4 w-4" />
            <span>View Our Work</span>
          </Button>
        </div>
      </div>
      
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-3xl rounded-full -z-10"></div>
    </section>
  );
}