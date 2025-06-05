"use client";

import { Button } from "@/components/ui/button";
import { useLogin } from "@/context/login-context";
import { motion } from "framer-motion";
import { fadeIn, scaleUp } from "@/lib/animation-variants";
import { AnimatedButton } from "@/components/ui/animated-button";

interface Cta11Props {
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      url?: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
}

const Cta11 = ({
  heading = "Ready to Get Started?",
  description = "Join thousands of satisfied customers using our platform to build amazing websites.",
  buttons = {
    primary: {
      text: "Get Started",
    },
    secondary: {
      text: "Learn More",
      url: "https://www.shadcnblocks.com",
    },
  },
}: Cta11Props) => {
  const { openLogin } = useLogin();

  return (
    <motion.section
      className="py-24 mx-auto w-full max-w-6xl px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={scaleUp}
    >
      <div className="container flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center rounded-lg bg-accent p-8 text-center md:rounded-xl lg:p-16 w-full"
          whileHover={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <motion.h3
            className="mb-3 max-w-3xl text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6"
            variants={fadeIn("up", 0.1)}
          >
            {heading}
          </motion.h3>
          <motion.p
            className="mb-8 max-w-3xl text-muted-foreground lg:text-lg"
            variants={fadeIn("up", 0.2)}
          >
            {description}
          </motion.p>
          <motion.div
            className="flex w-full flex-col justify-center gap-2 sm:flex-row"
            variants={fadeIn("up", 0.3)}
          >
            {buttons.secondary && (
              <AnimatedButton
                variant="outline"
                className="w-full sm:w-auto cursor-pointer"
                asChild
              >
                <a href={buttons.secondary.url}>{buttons.secondary.text}</a>
              </AnimatedButton>
            )}
            {buttons.primary && (
              <AnimatedButton
                className="w-full sm:w-auto cursor-pointer"
                onClick={openLogin}
              >
                {buttons.primary.text}
              </AnimatedButton>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export { Cta11 };
