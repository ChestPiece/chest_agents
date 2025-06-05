"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  fadeIn,
  revealFromDirection,
  staggerContainer,
  textReveal,
} from "@/lib/animation-variants";
import { AnimatedButton } from "./animated-button";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["Chest Piece", "AI Agents"], []);

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

  return (
    <motion.div
      className="w-full"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className="container mx-auto">
        <div className="flex gap-8 py-10 lg:py-20 items-center justify-center flex-col">
          <motion.div
            className="flex gap-4 flex-col"
            variants={fadeIn("up", 0.1)}
          >
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <motion.span
                className="text-primary block"
                variants={revealFromDirection("up")}
              >
                Welcome to
              </motion.span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold bg-gradient-to-r from-primary to-[oklch(0.65_0.24_30)] bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{
                      type: "spring",
                      stiffness: 50,
                      damping: 14,
                    }}
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

            <motion.p
              className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center"
              variants={fadeIn("up", 0.3)}
            >
              Revolutionize your workflow with custom AI agents that automate
              tasks, analyze data, and provide intelligent assistance. Our
              mission is to make powerful AI technology accessible and practical
              for businesses of all sizes.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 justify-center mt-6"
              variants={fadeIn("up", 0.5)}
            >
              <AnimatedButton size="lg">Get Started</AnimatedButton>
              <AnimatedButton size="lg" variant="outline">
                Learn More
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export { Hero };
