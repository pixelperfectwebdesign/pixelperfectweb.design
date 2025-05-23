"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { InlineWidget } from "react-calendly";
import { 
  Mail, 
  Phone,
  ArrowRight
} from "lucide-react";

interface ContactInfoProps {
  icon: React.ReactNode;
  title: string;
  details: string;
  href: string;
}

function ContactInfo({ icon, title, details, href }: ContactInfoProps) {
  return (
    <a 
      href={href} 
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-4 p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors"
    >
      <div className="p-2.5 rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{details}</p>
      </div>
    </a>
  );
}

export default function Contact() {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the form data to your backend
      // For now, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container px-4">
        <Badge className="mb-4" variant="outline">Contact Us</Badge>
        <div className="flex flex-col md:flex-row justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold max-w-md mb-4 md:mb-0">
            Ready to <span className="text-primary">transform</span> your digital presence?
          </h2>
          <p className="text-muted-foreground max-w-md">
            Schedule a free consultation or send us a message. We'd love to hear about your project.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Schedule a Free Consultation</h3>
              <div className="rounded-lg border bg-card/50">
                <InlineWidget 
                  url="https://calendly.com/your-calendly-url" 
                  styles={{
                    height: '650px',
                    width: '100%',
                  }}
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Or Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Smith"
                      value={formState.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Project Inquiry"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project..."
                    rows={6}
                    value={formState.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span>Sending Message</span>
                      <svg className="ml-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
          
          <div className="space-y-6">
            <ContactInfo
              icon={<Mail className="h-5 w-5" />}
              title="Email Us"
              details="contact@pixelperfect.design"
              href="mailto:contact@pixelperfect.design"
            />
            <ContactInfo
              icon={<Phone className="h-5 w-5" />}
              title="Call Us"
              details="+1 (316) 469-4365"
              href="tel:+13164694365"
            />
            <div className="p-6 rounded-lg border bg-card/50 mt-8">
              <h3 className="font-medium mb-2">Our Availability</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We're available Monday through Friday, 9am to 5pm CST.
              </p>
              <div className="space-y-2">
                {[
                  { day: "Monday - Friday", hours: "9:00 AM - 5:00 PM" },
                  { day: "Saturday", hours: "By appointment" },
                  { day: "Sunday", hours: "Closed" },
                ].map((schedule, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{schedule.day}</span>
                    <span>{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}