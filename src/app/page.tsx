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
import {
  SectionWrapper,
  ContentWrapper,
} from "@/components/ui/section-wrapper";
import { motion } from "framer-motion";
import { pageVariants } from "@/lib/animation-variants";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { AnimatedStats } from "@/components/ui/animated-stats";
import {
  Users,
  Brain,
  Clock,
  Building,
  MessageSquare,
  HelpCircle,
  Home as HomeIcon,
  Sparkles,
} from "lucide-react";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { smoothScrollTo } from "@/lib/smooth-scroll";

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

  const quickNavItems = [
    {
      icon: <HomeIcon className="h-4 w-4" />,
      label: "Home",
      onClick: () => smoothScrollTo("#", 0),
    },
    {
      icon: <Sparkles className="h-4 w-4" />,
      label: "Features",
      onClick: () => smoothScrollTo("#features", 80),
    },
    {
      icon: <Users className="h-4 w-4" />,
      label: "Agents",
      onClick: () => smoothScrollTo("#agents", 80),
    },
    {
      icon: <MessageSquare className="h-4 w-4" />,
      label: "Testimonials",
      onClick: () => smoothScrollTo("#testimonials", 80),
    },
    {
      icon: <HelpCircle className="h-4 w-4" />,
      label: "FAQs",
      onClick: () => smoothScrollTo("#faqs", 80),
    },
  ];

  return (
    <motion.div
      className="flex flex-col min-h-screen"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Navbar1 />
      <main className="flex-1 w-full mx-auto">
        <SectionWrapper className="bg-background">
          <ContentWrapper>
            <Hero />
          </ContentWrapper>
        </SectionWrapper>

        <SectionWrapper className="bg-background py-10 lg:py-20">
          <ContentWrapper>
            <StudyChatAgent />
          </ContentWrapper>
        </SectionWrapper>

        <AnimatedStats
          title="Our Impact"
          description="Discover how our AI agents are transforming businesses and education"
          stats={[
            {
              value: 10000,
              label: "Active Users",
              icon: <Users />,
              suffix: "+",
            },
            {
              value: 95,
              label: "User Satisfaction",
              icon: <Brain />,
              suffix: "%",
            },
            {
              value: 80,
              label: "Time Saved",
              icon: <Clock />,
              suffix: "%",
            },
            {
              value: 500,
              label: "Businesses Powered",
              icon: <Building />,
              suffix: "+",
            },
          ]}
        />

        <FeaturesSectionWithHoverEffects />

        <SectionWrapper className="bg-background">
          <AgentShowcase />
        </SectionWrapper>

        <SectionWrapper
          className="bg-gradient-to-r from-[oklch(0.97_0.05_60)] to-[oklch(0.97_0.03_30)] dark:from-black dark:to-gray-900 py-16"
          direction="up"
          delay={0.1}
        >
          <ContentWrapper>
            <div className="text-center mb-12">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                What Our Clients Say
              </motion.h2>
              <motion.div
                className="w-20 h-1 bg-gradient-to-r from-primary to-[oklch(0.65_0.24_30)] mx-auto rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              ></motion.div>
            </div>
            <motion.div
              className="bg-white dark:bg-black rounded-2xl shadow-lg p-4 md:p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <AnimatedTestimonials
                testimonials={testimonials}
                autoplay={true}
              />
            </motion.div>
          </ContentWrapper>
        </SectionWrapper>

        <SectionWrapper className="bg-gray-50 dark:bg-black py-16" delay={0.1}>
          <FaqSection />
        </SectionWrapper>

        <SectionWrapper className="bg-background py-10">
          <ContentWrapper className="flex justify-center items-center w-full">
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
          </ContentWrapper>
        </SectionWrapper>
      </main>
      <Footerdemo />
      <ScrollToTop />
      <FloatingActionButton
        items={quickNavItems}
        position="bottom-right"
        mainIcon={<Sparkles className="h-5 w-5" />}
      />
    </motion.div>
  );
}
