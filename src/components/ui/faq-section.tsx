"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronDown } from "@tabler/icons-react";
import { ContentWrapper } from "@/components/ui/section-wrapper";
import { fadeIn, staggerContainer } from "@/lib/animation-variants";
import { AnimatedButton } from "./animated-button";

const FaqItem = ({
  question,
  answer,
  isOpen,
  toggleOpen,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
}) => {
  return (
    <motion.div
      className="border-b border-gray-200 dark:border-gray-800 last:border-none"
      whileHover={{
        backgroundColor: "rgba(0, 0, 0, 0.02)",
        transition: { duration: 0.2 },
      }}
    >
      <button
        className="flex w-full items-center justify-between py-5 text-left"
        onClick={toggleOpen}
      >
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          className="flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 p-1"
        >
          <IconChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              type: "spring",
              damping: 25,
              stiffness: 120,
            }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-gray-600 dark:text-gray-300">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData = [
    {
      question: "How do your AI agents work?",
      answer:
        "Our AI agents use advanced machine learning models and natural language processing to understand and perform tasks. Each agent is custom-built for your specific business needs, trained on your data and workflows, and continuously improves through feedback and usage patterns. They can automate repetitive tasks, analyze data, interact with customers, and integrate with your existing systems.",
    },
    {
      question:
        "What types of businesses can benefit from Chest Piece AI agents?",
      answer:
        "Organizations across industries can benefit from our AI agents. We've implemented solutions for customer service, healthcare, finance, e-commerce, manufacturing, and more. Our agents are highly adaptable and can be customized for specific industry requirements, compliance standards, and business processes.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, we offer a 14-day free trial with access to our core AI agent capabilities. During the trial, you'll work with our team to configure a demo agent for your specific use case. No credit card is required to start, and you'll receive full support throughout the evaluation period.",
    },
    {
      question: "How secure are your AI agents?",
      answer:
        "Security is fundamental to our platform. All data is encrypted in transit and at rest, and we implement strict access controls. Our AI agents operate within defined parameters and permissions. We're compliant with industry standards including GDPR, CCPA, HIPAA (for healthcare applications), and SOC 2. We also provide detailed audit trails of all agent activities.",
    },
    {
      question: "What kind of support do you offer?",
      answer:
        "We provide 24/7 technical support through multiple channels including live chat, email, and phone. Our AI specialists are available for consultation during business hours. All clients receive access to our comprehensive documentation and video tutorials. Enterprise plans include a dedicated account manager and priority support with guaranteed response times.",
    },
  ];

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faqs" className="w-full">
      <ContentWrapper>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn("up")}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-[oklch(0.65_0.24_30)] mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about our AI agents and how they can
            transform your business operations.
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto bg-white dark:bg-black rounded-xl shadow-md overflow-hidden"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)" }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6 md:p-8">
            {faqData.map((faq, index) => (
              <motion.div key={index} variants={fadeIn("up", index * 0.1)}>
                <FaqItem
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  toggleOpen={() => toggleItem(index)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeIn("up", 0.5)} className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Still have questions?
          </p>
          <AnimatedButton>Contact our AI specialists</AnimatedButton>
        </motion.div>
      </ContentWrapper>
    </div>
  );
}
