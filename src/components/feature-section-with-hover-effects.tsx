"use client";

import { cn } from "@/lib/utils";
import {
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconBrain,
  IconRobot,
  IconApi,
  IconCode,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
  fadeIn,
  revealFromDirection,
  staggerContainer,
} from "@/lib/animation-variants";
import {
  SectionWrapper,
  ContentWrapper,
} from "@/components/ui/section-wrapper";
import { AnimatedCard } from "@/components/ui/animated-card";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Custom AI Agents",
      description:
        "Tailor-made AI agents designed specifically for your business needs and workflows.",
      icon: <IconRobot />,
    },
    {
      title: "Simple Integration",
      description:
        "Seamlessly integrate our AI agents with your existing tools and platforms.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Transparent Pricing",
      description:
        "Clear, predictable pricing with no hidden fees. Only pay for what you actually use.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Reliable Infrastructure",
      description:
        "Built on enterprise-grade infrastructure with 99.9% uptime guarantee.",
      icon: <IconCloud />,
    },
    {
      title: "Advanced API Access",
      description:
        "Full API access for developers to extend and customize AI agent capabilities.",
      icon: <IconApi />,
    },
    {
      title: "24/7 AI Support",
      description:
        "Get help anytime with our dedicated support agents powered by our own AI technology.",
      icon: <IconRobot />,
    },
    {
      title: "Continuous Learning",
      description:
        "Our agents improve over time by learning from interactions and your feedback.",
      icon: <IconBrain />,
    },
    {
      title: "Developer Friendly",
      description:
        "Comprehensive documentation, SDKs, and tools for seamless development.",
      icon: <IconCode />,
    },
  ];

  return (
    <SectionWrapper className="py-20" id="features">
      <ContentWrapper>
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn("up")}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Key Features
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-[oklch(0.65_0.24_30)] mx-auto rounded-full"></div>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI agents come packed with powerful features to help transform
            your business
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </ContentWrapper>
    </SectionWrapper>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <AnimatedCard
      delayIndex={index}
      hoverEffect={index % 2 === 0 ? "lift" : "glow"}
      className="p-6"
    >
      <div className="flex flex-col h-full">
        <motion.div
          className="mb-4 text-primary"
          variants={revealFromDirection("up")}
        >
          {icon}
        </motion.div>
        <motion.h3
          className="text-lg font-bold mb-2 text-gray-900 dark:text-white"
          variants={revealFromDirection("up")}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-sm text-gray-600 dark:text-gray-300"
          variants={revealFromDirection("up")}
        >
          {description}
        </motion.p>
      </div>
    </AnimatedCard>
  );
};
