"use client";

import React from "react";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeIn } from "@/lib/animation-variants";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  asElement?: keyof JSX.IntrinsicElements;
  motionProps?: MotionProps;
  noAnimation?: boolean;
}

export function SectionWrapper({
  children,
  className,
  delay = 0,
  direction = "up",
  asElement = "section",
  motionProps,
  noAnimation = false,
  ...props
}: SectionWrapperProps) {
  const Component = motion[asElement as keyof typeof motion];

  if (noAnimation) {
    const Element = asElement;
    return (
      <Element className={cn("w-full", className)} {...props}>
        {children}
      </Element>
    );
  }

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeIn(direction, delay)}
      className={cn("w-full", className)}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
}

// Content wrapper for inside sections
export function ContentWrapper({
  children,
  className,
  delay = 0.2,
  direction = "up",
  asElement = "div",
  motionProps,
  noAnimation = false,
  ...props
}: SectionWrapperProps) {
  const Component = motion[asElement as keyof typeof motion];

  if (noAnimation) {
    const Element = asElement;
    return (
      <Element
        className={cn(
          "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
          className
        )}
        {...props}
      >
        {children}
      </Element>
    );
  }

  return (
    <Component
      variants={fadeIn(direction, delay)}
      className={cn("w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
}
