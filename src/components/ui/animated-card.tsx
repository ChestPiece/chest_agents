"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cardHover } from "@/lib/animation-variants";

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: "lift" | "tilt" | "glow" | "none";
  delayIndex?: number;
}

export function AnimatedCard({
  children,
  className,
  hoverEffect = "lift",
  delayIndex = 0,
  ...props
}: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Different hover animations
  const hoverAnimations = {
    lift: {
      rest: { y: 0, scale: 1 },
      hover: { y: -8, scale: 1.02 },
    },
    tilt: {
      rest: { rotate: 0, scale: 1 },
      hover: { rotate: 1, scale: 1.01 },
    },
    glow: {
      rest: {
        boxShadow: "0px 0px 0px rgba(0,0,0,0)",
      },
      hover: {
        boxShadow: "0px 5px 15px rgba(255, 107, 0, 0.3)",
      },
    },
    none: {
      rest: {},
      hover: {},
    },
  };

  const selectedAnimation =
    hoverEffect !== "none"
      ? hoverAnimations[hoverEffect]
      : hoverAnimations.none;

  return (
    <motion.div
      className={cn(
        "bg-white dark:bg-black rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 25,
          stiffness: 100,
          delay: delayIndex * 0.1,
        },
      }}
      viewport={{ once: true, margin: "-100px" }}
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      animate={isHovered ? "hover" : "rest"}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        ...selectedAnimation.rest,
      }}
      {...props}
    >
      {/* Card content with optional parallax effect */}
      <div className="relative overflow-hidden">
        {children}

        {/* Subtle gradient overlay on hover */}
        {hoverEffect !== "none" && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 pointer-events-none"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>
    </motion.div>
  );
}
