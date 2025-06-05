"use client";

import { Hero } from "@/components/ui/animated-hero";
import { StudyChatAgent } from "@/components/ui/study-chat-agent";
import { Navbar1 } from "@/components/ui/navbar-1";
import { FeaturesSectionWithHoverEffects } from "@/components/feature-section-with-hover-effects";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { FaqSection } from "@/components/ui/faq-section";
import { Cta11 } from "@/components/shadcnblocks-com-cta11";
import { Footerdemo } from "@/components/ui/footer-section";
import { AgentShowcase } from "@/components/ui/agent-showcase";
import { useEffect } from "react";
import { useLogin } from "@/context/login-context";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const { openLogin } = useLogin();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if login parameter is in URL and open login modal
    if (searchParams.get("login") === "true") {
      openLogin();
    }
  }, [searchParams, openLogin]);

  const testimonials = [
    {
      quote:
        "Chest Piece's AI agents have completely transformed our customer service operations. Response times are down 70% and customer satisfaction is up 40% since implementation.",
      name: "Sarah Johnson",
      designation: "CTO at RetailTech",
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    },
    {
      quote:
        "The customizable AI agents developed by Chest Piece seamlessly integrated with our existing systems. We've automated 85% of our routine data analysis tasks, freeing our team for strategic work.",
      name: "Michael Chen",
      designation: "Data Science Director at AnalyticsPro",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    },
    {
      quote:
        "As a healthcare provider, we needed AI agents that are both intelligent and compliant with regulations. Chest Piece delivered on both fronts, and their agents have improved our patient scheduling efficiency by 60%.",
      name: "Emma Rodriguez",
      designation: "Operations Director at HealthFirst",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar1 />
      <main className="flex-1 w-full mx-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />
          <StudyChatAgent />
          <FeaturesSectionWithHoverEffects />
        </div>
        <AgentShowcase />
        <div className="bg-gradient-to-r from-[oklch(0.97_0.05_60)] to-[oklch(0.97_0.03_30)] dark:from-black dark:to-gray-900 py-16 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                What Our Clients Say
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-[oklch(0.65_0.24_30)] mx-auto rounded-full"></div>
            </div>
            <div className="bg-white dark:bg-black rounded-2xl shadow-lg p-4 md:p-8">
              <AnimatedTestimonials
                testimonials={testimonials}
                autoplay={true}
              />
            </div>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-black py-16">
          <FaqSection />
        </div>
        <div className="flex justify-center items-center w-full">
          <Cta11
            heading="Ready to Streamline Your Business with AI Agents?"
            description="Join forward-thinking businesses using our AI agents to automate tasks, increase productivity, and drive innovation."
            buttons={{
              primary: {
                text: "Get Started",
                url: "#",
              },
              secondary: {
                text: "Book a Demo",
                url: "#",
              },
            }}
          />
        </div>
      </main>
      <Footerdemo />
    </div>
  );
}
