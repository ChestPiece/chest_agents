"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buttonHover } from "@/lib/animation-variants";

interface AnimatedButtonProps extends ButtonProps {
  animateOnHover?: boolean;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, animateOnHover = true, children, ...props }, ref) => {
    return (
      <motion.div
        whileHover={animateOnHover ? buttonHover : undefined}
        whileTap={{ scale: 0.98 }}
        className="inline-block"
      >
        <Button
          ref={ref}
          className={cn(
            "transition-all duration-300 shadow-sm hover:shadow-md",
            className
          )}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton };
