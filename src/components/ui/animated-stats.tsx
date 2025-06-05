"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionWrapper, ContentWrapper } from "./section-wrapper";

interface StatItemProps {
  value: number;
  label: string;
  icon?: React.ReactNode;
  suffix?: string;
  prefix?: string;
  className?: string;
  delay?: number;
}

const StatItem = ({
  value,
  label,
  icon,
  suffix = "",
  prefix = "",
  className,
  delay = 0,
}: StatItemProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startValue = 0;
      const duration = 2000; // 2 seconds
      const stepTime = 20; // Update every 20ms
      const totalSteps = duration / stepTime;
      const incrementValue = value / totalSteps;

      // Start counting after the delay
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          startValue += incrementValue;
          setDisplayValue(Math.min(Math.floor(startValue), value));

          if (startValue >= value) {
            clearInterval(interval);
          }
        }, stepTime);

        return () => clearInterval(interval);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      className={cn("flex flex-col items-center p-6", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: "easeOut",
      }}
    >
      {icon && (
        <motion.div
          className="text-primary mb-4 text-3xl"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={
            isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }
          }
          transition={{
            duration: 0.5,
            delay: delay + 0.2,
            type: "spring",
            stiffness: 200,
          }}
        >
          {icon}
        </motion.div>
      )}
      <motion.div
        className="text-4xl font-bold text-gray-900 dark:text-white mb-2"
        initial={{ y: 20, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
        transition={{
          duration: 0.5,
          delay: delay + 0.1,
        }}
      >
        {prefix}
        {displayValue.toLocaleString()}
        {suffix}
      </motion.div>
      <motion.div
        className="text-gray-600 dark:text-gray-300 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
        transition={{
          duration: 0.5,
          delay: delay + 0.3,
        }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
};

interface AnimatedStatsProps {
  title?: string;
  description?: string;
  stats: {
    value: number;
    label: string;
    icon?: React.ReactNode;
    suffix?: string;
    prefix?: string;
  }[];
  className?: string;
}

export const AnimatedStats = ({
  title,
  description,
  stats,
  className,
}: AnimatedStatsProps) => {
  return (
    <SectionWrapper className={cn("py-16", className)}>
      <ContentWrapper>
        {(title || description) && (
          <div className="text-center mb-12">
            {title && (
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {title}
              </motion.h2>
            )}
            {title && (
              <motion.div
                className="w-20 h-1 bg-gradient-to-r from-primary to-[oklch(0.65_0.24_30)] mx-auto rounded-full mb-4"
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: 80, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            )}
            {description && (
              <motion.p
                className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {description}
              </motion.p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              label={stat.label}
              icon={stat.icon}
              suffix={stat.suffix}
              prefix={stat.prefix}
              delay={index * 0.1}
            />
          ))}
        </div>
      </ContentWrapper>
    </SectionWrapper>
  );
};
