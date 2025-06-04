"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  IconArrowRight,
  IconArrowLeft,
  IconChartBar,
  IconMessageChatbot,
  IconSearch,
  IconRobot,
} from "@tabler/icons-react";

export function AIAgentsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["AI Agents", "Smart Solutions"], []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  const agents = [
    {
      name: "DataSense",
      category: "Analytics Agent",
      description:
        "Advanced data analysis and visualization AI that transforms complex datasets into actionable insights.",
      capabilities: [
        "Real-time data processing",
        "Predictive analytics",
        "Custom dashboards",
        "Anomaly detection",
      ],
      icon: <IconChartBar size={48} stroke={1.5} />,
      color: "from-primary to-[oklch(0.65_0.24_30)]",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      name: "AssistAI",
      category: "Customer Service Agent",
      description:
        "Intelligent conversational AI that handles customer inquiries with empathy and precision.",
      capabilities: [
        "24/7 availability",
        "Multi-language support",
        "Context awareness",
        "Seamless handoffs",
      ],
      icon: <IconMessageChatbot size={48} stroke={1.5} />,
      color: "from-primary to-[oklch(0.65_0.24_30)]",
      image:
        "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "ResearchPro",
      category: "Research Agent",
      description:
        "Knowledge discovery AI that navigates vast information landscapes to find precise answers.",
      capabilities: [
        "Deep web searching",
        "Academic research",
        "Content summarization",
        "Citation tracking",
      ],
      icon: <IconSearch size={48} stroke={1.5} />,
      color: "from-primary to-[oklch(0.65_0.24_30)]",
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1290&q=80",
    },
    {
      name: "AutoPilot",
      category: "Process Automation Agent",
      description:
        "Workflow automation AI that streamlines repetitive tasks and complex business processes.",
      capabilities: [
        "Workflow orchestration",
        "System integration",
        "Error handling",
        "Audit trails",
      ],
      icon: <IconRobot size={48} stroke={1.5} />,
      color: "from-primary to-[oklch(0.65_0.24_30)]",
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  useEffect(() => {
    // This hook previously set carousel width, but is no longer needed
    // Keeping it empty for now in case we need to add initialization logic later
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === agents.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? agents.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="py-20 bg-gray-100 dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 mb-6 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground text-sm font-medium">
            <span className="flex w-2 h-2 mr-2 rounded-full bg-primary animate-pulse"></span>
            Our AI Ecosystem
          </div>

          <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular mx-auto mb-6">
            <span className="text-gray-800 dark:text-white">Some of our</span>
            <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
              &nbsp;
              {titles.map((title, index) => (
                <motion.span
                  key={index}
                  className="absolute font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-[oklch(0.65_0.24_30)]"
                  initial={{ opacity: 0, y: "-100" }}
                  transition={{ type: "spring", stiffness: 50 }}
                  animate={
                    titleNumber === index
                      ? {
                          y: 0,
                          opacity: 1,
                        }
                      : {
                          y: titleNumber > index ? -150 : 150,
                          opacity: 0,
                        }
                  }
                >
                  {title}
                </motion.span>
              ))}
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto dark:text-gray-300">
            Discover our specialized AI solutions that automate tasks, enhance
            decision-making, and transform how businesses operate in the digital
            age.
          </p>

          <div className="w-24 h-1 bg-gradient-to-r from-primary to-[oklch(0.65_0.24_30)] mx-auto rounded-full mt-8"></div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-white/80 dark:bg-black/80 p-4 rounded-full shadow-lg border border-gray-200 dark:border-gray-800 hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <IconArrowLeft className="h-6 w-6 text-gray-700 dark:text-white" />
          </button>

          <div className="overflow-hidden mx-4 md:mx-12">
            <motion.div
              ref={carousel}
              className="flex"
              animate={{ x: -currentIndex * 100 + "%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {agents.map((agent, index) => (
                <motion.div
                  key={agent.name}
                  className="min-w-full px-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: currentIndex === index ? 1 : 0.4,
                    scale: currentIndex === index ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-white dark:bg-black rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 transform transition-all duration-500 hover:translate-y-[-5px]">
                    <div className="grid md:grid-cols-2">
                      <div className="h-64 md:h-auto relative overflow-hidden">
                        <Image
                          src={agent.image}
                          alt={agent.name}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${agent.color} opacity-30`}
                        ></div>
                      </div>
                      <div className="p-6 md:p-10 flex flex-col justify-center">
                        <div
                          className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${agent.color} text-white mb-4 shadow-lg`}
                        >
                          {agent.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-1 dark:text-white">
                          {agent.name}
                        </h3>
                        <p className="text-sm text-primary dark:text-primary font-medium mb-4">
                          {agent.category}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                          {agent.description}
                        </p>
                        <div>
                          <h4 className="font-semibold mb-2 text-sm text-gray-900 dark:text-white">
                            Key Capabilities:
                          </h4>
                          <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                            {agent.capabilities.map((capability) => (
                              <li
                                key={capability}
                                className="text-sm text-gray-600 dark:text-gray-300 flex items-center"
                              >
                                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-[oklch(0.65_0.24_30)] mr-2 animate-pulse"></span>
                                {capability}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-white/80 dark:bg-black/80 p-4 rounded-full shadow-lg border border-gray-200 dark:border-gray-800 hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors backdrop-blur-sm"
            aria-label="Next slide"
          >
            <IconArrowRight className="h-6 w-6 text-gray-700 dark:text-white" />
          </button>

          <div className="flex justify-center mt-8 gap-2">
            {agents.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-gradient-to-r from-primary to-[oklch(0.65_0.24_30)] w-10 shadow-md"
                    : "bg-gray-300 dark:bg-gray-800 w-3 hover:bg-primary/30 dark:hover:bg-primary/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
 