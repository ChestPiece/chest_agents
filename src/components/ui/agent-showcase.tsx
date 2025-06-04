"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChartBar,
  IconMessageChatbot,
  IconSearch,
  IconRobot,
} from "@tabler/icons-react";

export function AgentShowcase() {
  const [titleNumber, setTitleNumber] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Use useMemo to prevent recreating the array on each render
  const titles = useMemo(() => ["AI Agents", "Smart Solutions"], []);

  const agents = [
    {
      name: "DataSense",
      category: "Analytics Agent",
      description:
        "Advanced data analysis and visualization AI that transforms complex datasets into actionable insights.",
      icon: <IconChartBar size={32} stroke={1.5} />,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      name: "AssistAI",
      category: "Customer Service",
      description:
        "Intelligent conversational AI that handles customer inquiries with empathy and precision.",
      icon: <IconMessageChatbot size={32} stroke={1.5} />,
      image:
        "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "ResearchPro",
      category: "Research Agent",
      description:
        "Knowledge discovery AI that navigates vast information landscapes to find precise answers.",
      icon: <IconSearch size={32} stroke={1.5} />,
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1290&q=80",
    },
    {
      name: "AutoPilot",
      category: "Process Automation",
      description:
        "Workflow automation AI that streamlines repetitive tasks and complex business processes.",
      icon: <IconRobot size={32} stroke={1.5} />,
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === agents.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? agents.length - 1 : prev - 1));
  };

  return (
    <div id="team" className="py-12 bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-10">
          <div className="inline-flex items-center justify-center px-3 py-1.5 mb-5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium">
            <span className="flex w-2 h-2 mr-2 rounded-full bg-primary animate-pulse"></span>
            Our AI Ecosystem
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-6xl max-w-2xl tracking-tighter text-center font-regular mx-auto mb-4">
            <span className="text-gray-900 dark:text-white">Some of our</span>
            <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-3 md:pt-1">
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

          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-5 md:mb-6">
            Discover our specialized AI solutions that automate tasks, enhance
            decision-making, and transform how businesses operate in the digital
            age.
          </p>

          <div className="w-12 md:w-20 h-1 bg-gradient-to-r from-primary to-[oklch(0.65_0.24_30)] mx-auto rounded-full mb-6 md:mb-8"></div>
        </div>

        {/* Agent Showcase */}
        <div className="max-w-5xl mx-auto">
          {/* Navigation Dots */}
          <div className="flex justify-center mb-4 space-x-2">
            {agents.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === i
                    ? "bg-gradient-to-r from-primary to-[oklch(0.65_0.24_30)] w-8"
                    : "bg-gray-300 dark:bg-gray-700 w-2.5 hover:bg-primary/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Showcase Card */}
          <div className="relative bg-white dark:bg-black rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800">
            <div className="relative overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* Image Side */}
                <div className="relative h-64 md:h-80 w-full overflow-hidden">
                  {agents.map((agent, idx) => (
                    <motion.div
                      key={idx}
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: activeIndex === idx ? 1 : 0,
                        zIndex: activeIndex === idx ? 10 : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={agent.image}
                        alt={agent.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-[oklch(0.65_0.24_30)]/20" />
                    </motion.div>
                  ))}
                </div>

                {/* Content Side */}
                <div className="p-6 md:p-8 flex flex-col justify-center relative">
                  {agents.map((agent, idx) => (
                    <motion.div
                      key={idx}
                      className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{
                        opacity: activeIndex === idx ? 1 : 0,
                        x: activeIndex === idx ? 0 : 50,
                        pointerEvents: activeIndex === idx ? "auto" : "none",
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="inline-flex p-2.5 rounded-xl bg-gradient-to-r from-primary to-[oklch(0.65_0.24_30)] text-white mb-4 w-fit shadow-md">
                        {agent.icon}
                      </div>
                      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                        {agent.name}
                      </h2>
                      <p className="text-primary text-sm font-medium mb-3">
                        {agent.category}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-5">
                        {agent.description}
                      </p>

                      <button className="px-5 py-2 rounded-full bg-gradient-to-r from-primary to-[oklch(0.65_0.24_30)] text-white text-sm font-medium w-fit hover:shadow-lg transition-shadow">
                        Learn More
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 dark:bg-black/80 p-1.5 rounded-full shadow-lg border border-gray-200 dark:border-gray-800 hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors backdrop-blur-sm"
              aria-label="Previous slide"
            >
              <IconChevronLeft className="h-5 w-5 text-gray-700 dark:text-white" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 dark:bg-black/80 p-1.5 rounded-full shadow-lg border border-gray-200 dark:border-gray-800 hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors backdrop-blur-sm"
              aria-label="Next slide"
            >
              <IconChevronRight className="h-5 w-5 text-gray-700 dark:text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
