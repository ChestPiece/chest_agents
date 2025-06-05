"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type FloatingActionItem = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color?: string;
};

interface FloatingActionButtonProps {
  items: FloatingActionItem[];
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  mainIcon?: React.ReactNode;
  className?: string;
}

const buttonVariants: Variants = {
  closed: {
    rotate: 0,
    scale: 1,
  },
  open: {
    rotate: 45,
    scale: 1.1,
  },
};

const menuVariants: Variants = {
  closed: {
    opacity: 0,
    y: 20,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  closed: {
    opacity: 0,
    x: -20,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
};

export function FloatingActionButton({
  items,
  position = "bottom-right",
  mainIcon = <Plus className="h-6 w-6" />,
  className,
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    "bottom-right": "right-6 bottom-6",
    "bottom-left": "left-6 bottom-6",
    "top-right": "right-6 top-6",
    "top-left": "left-6 top-6",
  };

  return (
    <div className={cn("fixed z-50", positionClasses[position], className)}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(
              "absolute mb-2 pb-2 origin-bottom-right",
              position.includes("bottom") ? "bottom-14" : "top-14",
              position.includes("right") ? "right-0" : "left-0"
            )}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {items.map((item, index) => (
              <motion.div
                key={index}
                className={cn(
                  "flex items-center mb-2 cursor-pointer",
                  position.includes("right") ? "justify-end" : "justify-start"
                )}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg px-3 py-2 flex items-center"
                  onClick={() => {
                    setIsOpen(false);
                    item.onClick();
                  }}
                >
                  <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">
                    {item.label}
                  </span>
                  <div
                    className={cn(
                      "p-2 rounded-full",
                      item.color || "bg-primary text-white"
                    )}
                  >
                    {item.icon}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        variants={buttonVariants}
        animate={isOpen ? "open" : "closed"}
        onClick={() => setIsOpen(!isOpen)}
      >
        {mainIcon}
      </motion.button>
    </div>
  );
}
