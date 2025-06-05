"use client";

import { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Send,
  Loader2,
  BookOpen,
  Sparkles,
  Search,
  ExternalLink,
  BookMarked,
  FileText,
  Lock,
  LogIn,
} from "lucide-react";
import { useSupabase } from "@/context/supabase-context";
import { useLogin } from "@/context/login-context";
import { AnimatedButton } from "./animated-button";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animation-variants";

interface UseAutoResizeTextareaProps {
  minHeight: number;
  maxHeight?: number;
}

interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  searchResults?: SearchResult[];
}

interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  url: string;
  type: "article" | "video" | "book" | "document";
}

// Sample educational resources database
const educationalResources = [
  {
    id: "math-1",
    title: "Algebra Foundations",
    snippet:
      "Learn the basics of algebra, equations, variables, and functions.",
    url: "https://example.com/math/algebra-foundations",
    keywords: ["math", "algebra", "equations", "variables"],
    type: "article",
  },
  {
    id: "math-2",
    title: "Calculus Made Easy",
    snippet: "Comprehensive guide to differential and integral calculus.",
    url: "https://example.com/math/calculus-guide",
    keywords: ["math", "calculus", "differential", "integral"],
    type: "book",
  },
  {
    id: "history-1",
    title: "Ancient Civilizations Timeline",
    snippet: "Interactive timeline of major ancient civilizations.",
    url: "https://example.com/history/ancient-civilizations",
    keywords: ["history", "ancient", "civilization", "rome", "egypt"],
    type: "article",
  },
  {
    id: "history-2",
    title: "World War II: A Complete Overview",
    snippet: "Detailed analysis of causes and events of World War II.",
    url: "https://example.com/history/world-war-2",
    keywords: ["history", "war", "world war", "20th century"],
    type: "document",
  },
  {
    id: "science-1",
    title: "Introduction to Chemistry",
    snippet: "Learn about atoms, molecules, reactions, and the periodic table.",
    url: "https://example.com/science/intro-chemistry",
    keywords: ["science", "chemistry", "atoms", "molecules"],
    type: "video",
  },
  {
    id: "language-1",
    title: "Grammar Essentials",
    snippet: "Master the fundamentals of grammar and sentence structure.",
    url: "https://example.com/language/grammar-essentials",
    keywords: ["language", "grammar", "writing", "punctuation"],
    type: "article",
  },
];

function useAutoResizeTextarea({
  minHeight,
  maxHeight,
}: UseAutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      // Temporarily shrink to get the right scrollHeight
      textarea.style.height = `${minHeight}px`;

      // Calculate new height
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY)
      );

      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight]
  );

  useEffect(() => {
    // Set initial height
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${minHeight}px`;
    }
  }, [minHeight]);

  // Adjust height on window resize
  useEffect(() => {
    const handleResize = () => adjustHeight();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [adjustHeight]);

  return { textareaRef, adjustHeight };
}

// Function to search for relevant educational materials
function searchEducationalMaterials(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase();
  const queryWords = lowerQuery.split(/\s+/).filter((word) => word.length > 2);

  // Score resources based on keyword matches
  const scoredResults = educationalResources.map((resource) => {
    let score = 0;

    // Check title matches
    if (resource.title.toLowerCase().includes(lowerQuery)) {
      score += 10;
    }

    // Check keyword matches
    queryWords.forEach((word) => {
      resource.keywords.forEach((keyword) => {
        if (keyword.includes(word) || word.includes(keyword)) {
          score += 5;
        }
      });

      if (resource.title.toLowerCase().includes(word)) {
        score += 3;
      }

      if (resource.snippet.toLowerCase().includes(word)) {
        score += 2;
      }
    });

    return {
      ...resource,
      score,
    };
  });

  // Filter out low scores and sort by score
  return scoredResults
    .filter((result) => result.score > 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ id, title, snippet, url, type }) => ({
      id,
      title,
      snippet,
      url,
      type: type as "article" | "video" | "book" | "document",
    }));
}

// Sample study agent responses based on keywords
const studyResponses = {
  math: [
    "Mathematics is all about pattern recognition. Try to identify the underlying patterns in the problem.",
    "When solving math problems, break them down into smaller steps and solve each step systematically.",
    "Practice is key in mathematics. Try working through similar problems to build your intuition.",
  ],
  history: [
    "When studying history, focus on understanding cause and effect relationships between events.",
    "Creating a timeline can help you visualize the sequence of historical events and their connections.",
    "Try to understand historical events in their context, considering the social, economic, and political factors.",
  ],
  science: [
    "The scientific method is a powerful framework: observation, question, hypothesis, experiment, analysis, conclusion.",
    "When studying scientific concepts, try to connect them to real-world examples or applications.",
    "Visual aids like diagrams and models can help you understand complex scientific processes.",
  ],
  language: [
    "Regular practice is essential for language learning. Try to use new vocabulary and grammar in context.",
    "Reading widely in your target language exposes you to different styles and contexts.",
    "Consider using spaced repetition techniques for vocabulary memorization.",
  ],
  study: [
    "The Pomodoro technique (25 minutes of focused work followed by a 5-minute break) can improve productivity.",
    "Active recall is more effective than passive review. Test yourself on the material rather than just rereading it.",
    "Spaced repetition spreads your study sessions over time, which improves long-term retention.",
  ],
};

// Add casual conversation responses
const casualResponses = [
  "I'm here to help! Feel free to ask me about any study topic or just chat.",
  "That's interesting! Is there something specific you'd like to learn about?",
  "I enjoy our conversations! Let me know if you have any study-related questions.",
  "I'm your friendly study companion, but I'm happy to chat about other topics too.",
  "I'm designed to help with your studies, but I also enjoy casual conversation.",
  "Taking breaks from studying is important! What would you like to talk about?",
  "Sometimes a good conversation helps refresh the mind before diving back into studies.",
];

// Enhance the response generator to handle casual conversation
function generateResponse(message: string): {
  content: string;
  type: "study" | "casual" | "search";
} {
  const lowerMessage = message.toLowerCase();

  // Check if this is a search query
  if (
    lowerMessage.includes("search") ||
    lowerMessage.includes("find") ||
    lowerMessage.includes("looking for") ||
    lowerMessage.includes("resources") ||
    lowerMessage.includes("materials")
  ) {
    return {
      content: "I'll help you find relevant materials.",
      type: "search",
    };
  }

  // Check for subject-specific keywords
  if (
    lowerMessage.includes("math") ||
    lowerMessage.includes("calculus") ||
    lowerMessage.includes("algebra") ||
    lowerMessage.includes("equation")
  ) {
    const response =
      studyResponses.math[
        Math.floor(Math.random() * studyResponses.math.length)
      ];
    return { content: response, type: "study" };
  }

  if (
    lowerMessage.includes("history") ||
    lowerMessage.includes("civilization") ||
    lowerMessage.includes("century") ||
    lowerMessage.includes("war")
  ) {
    const response =
      studyResponses.history[
        Math.floor(Math.random() * studyResponses.history.length)
      ];
    return { content: response, type: "study" };
  }

  if (
    lowerMessage.includes("science") ||
    lowerMessage.includes("biology") ||
    lowerMessage.includes("chemistry") ||
    lowerMessage.includes("physics")
  ) {
    const response =
      studyResponses.science[
        Math.floor(Math.random() * studyResponses.science.length)
      ];
    return { content: response, type: "study" };
  }

  if (
    lowerMessage.includes("language") ||
    lowerMessage.includes("grammar") ||
    lowerMessage.includes("vocabulary") ||
    lowerMessage.includes("writing")
  ) {
    const response =
      studyResponses.language[
        Math.floor(Math.random() * studyResponses.language.length)
      ];
    return { content: response, type: "study" };
  }

  if (
    lowerMessage.includes("study") ||
    lowerMessage.includes("learn") ||
    lowerMessage.includes("exam") ||
    lowerMessage.includes("test") ||
    lowerMessage.includes("homework") ||
    lowerMessage.includes("assignment")
  ) {
    const response =
      studyResponses.study[
        Math.floor(Math.random() * studyResponses.study.length)
      ];
    return { content: response, type: "study" };
  }

  // Handle greetings
  if (
    lowerMessage.includes("hello") ||
    lowerMessage.includes("hi ") ||
    lowerMessage === "hi" ||
    lowerMessage.includes("hey") ||
    lowerMessage.includes("greetings")
  ) {
    return {
      content:
        "Hello there! I'm your study and chat assistant. How can I help you today?",
      type: "casual",
    };
  }

  // Handle questions about the agent
  if (
    lowerMessage.includes("who are you") ||
    lowerMessage.includes("what are you") ||
    lowerMessage.includes("your name") ||
    lowerMessage.includes("about you")
  ) {
    return {
      content:
        "I'm an AI study assistant designed to help with your learning journey. I can provide study tips, search for educational materials, or just chat with you!",
      type: "casual",
    };
  }

  // Default to casual conversation
  const casualResponse =
    casualResponses[Math.floor(Math.random() * casualResponses.length)];
  return { content: casualResponse, type: "casual" };
}

export function StudyChatAgent() {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      content:
        "Hi there! I'm your Study Agent. I can help with learning, provide study tips, search for educational materials, or just chat with you. How can I help?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 60,
    maxHeight: 200,
  });
  const { user } = useSupabase();
  const { openLogin } = useLogin();

  // Improved scroll to bottom function that respects auto vs smooth scrolling
  const scrollToBottom = (smooth = true) => {
    if (messagesEndRef.current && messagesContainerRef.current) {
      if (smooth) {
        messagesEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      } else {
        messagesEndRef.current.scrollIntoView({
          behavior: "auto",
          block: "end",
        });
      }
    }
  };

  // Store current scroll position
  const storeScrollPosition = () => {
    if (messagesContainerRef.current) {
      setScrollPosition(messagesContainerRef.current.scrollTop);
    }
  };

  // Restore scroll position
  const restoreScrollPosition = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = scrollPosition;
    }
  };

  // Scroll handling on message changes
  useEffect(() => {
    // Only scroll to bottom automatically on new messages if:
    // 1. User is already at bottom (within 100px of bottom)
    // 2. The new message is from the assistant
    // 3. Loading state is active
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      const isNearBottom =
        container.scrollHeight - container.clientHeight - container.scrollTop <
        100;

      const lastMessage = messages[messages.length - 1];
      const isAssistantMessage =
        lastMessage && lastMessage.role === "assistant";

      if (isLoading || (isNearBottom && isAssistantMessage)) {
        scrollToBottom(true);
      }
    }
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!value.trim()) return;

    // Store scroll position before changes
    storeScrollPosition();

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: value.trim(),
      role: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Clear input without causing scroll jumps
    setValue("");

    // Reset textarea height without affecting scroll
    if (textareaRef.current) {
      adjustHeight(true);
    }

    // Show typing indicator
    setIsLoading(true);

    // Allow DOM to update before scrolling to prevent jumps
    setTimeout(() => {
      scrollToBottom(true);
    }, 0);

    // Process the message
    setTimeout(() => {
      // Generate appropriate response
      const response = generateResponse(userMessage.content);

      if (response.type === "search") {
        setIsSearching(true);

        // Add searching message
        const searchingMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content:
            "I'll help you find relevant materials. Let me search for that...",
          role: "assistant",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, searchingMessage]);

        // Simulate search delay
        setTimeout(() => {
          const searchResults = searchEducationalMaterials(userMessage.content);

          const resultsMessage: ChatMessage = {
            id: (Date.now() + 2).toString(),
            content:
              searchResults.length > 0
                ? "Here are some resources that might help with your query:"
                : "I couldn't find specific resources for that query. Would you like some general study advice instead?",
            role: "assistant",
            timestamp: new Date(),
            searchResults: searchResults.length > 0 ? searchResults : undefined,
          };

          setMessages((prev) => [...prev, resultsMessage]);
          setIsLoading(false);
          setIsSearching(false);
        }, 1500);
      } else {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: response.content,
          role: "assistant",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }
    }, 1000);
  };

  // Handle key events with strict prevention of unwanted scrolling
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // Prevent default completely to avoid any scrolling
      e.preventDefault();
      e.stopPropagation();

      // Store scroll position
      storeScrollPosition();

      // Submit message
      handleSendMessage();

      // Return false to ensure no additional handling
      return false;
    }
  };

  // Function to get icon based on resource type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "article":
        return <FileText className="h-4 w-4" />;
      case "video":
        return <ExternalLink className="h-4 w-4" />;
      case "book":
        return <BookMarked className="h-4 w-4" />;
      case "document":
        return <FileText className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 space-y-4 mb-12">
      <div className="flex items-center gap-2">
        <BookOpen className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Study & Chat Agent
        </h1>
      </div>

      <div
        ref={chatContainerRef}
        className="w-full max-w-3xl bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 shadow-md overflow-hidden"
      >
        {/* Messages display - added ref to message container */}
        <div
          ref={messagesContainerRef}
          className="h-[400px] overflow-y-auto p-4 space-y-4 scroll-smooth bg-white dark:bg-black"
        >
          {messages.map((message) => (
            <div key={message.id} className="space-y-2">
              <div
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-gray-100 dark:bg-black dark:border dark:border-gray-800 text-gray-800 dark:text-gray-200"
                  )}
                >
                  {message.content}
                </div>
              </div>

              {/* Search Results */}
              {message.searchResults && message.searchResults.length > 0 && (
                <div className="pl-4 space-y-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400 ml-2 mb-1">
                    Related resources:
                  </p>
                  {message.searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="flex bg-gray-50 dark:bg-black dark:border dark:border-gray-800 rounded-lg overflow-hidden border border-gray-200 max-w-[90%]"
                    >
                      <div className="bg-gray-100 dark:bg-gray-900 p-3 flex items-center justify-center">
                        {getResourceIcon(result.type)}
                      </div>
                      <div className="p-3 flex-1">
                        <h3 className="font-medium text-sm">{result.title}</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                          {result.snippet}
                        </p>
                        <div className="mt-2">
                          <a
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary flex items-center gap-1 hover:underline cursor-pointer"
                          >
                            View resource <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-black dark:border dark:border-gray-800 text-gray-800 dark:text-gray-200 rounded-lg px-4 py-2">
                <div className="flex items-center space-x-2">
                  {isSearching ? (
                    <>
                      <Search className="h-4 w-4 animate-pulse" />
                      <span>Searching resources...</span>
                    </>
                  ) : (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Thinking...</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="border-t border-gray-200 dark:border-gray-800 p-3 bg-white dark:bg-black">
          <div className="relative bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
            {user ? (
              <Textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  adjustHeight();
                }}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question, chat, or search for materials..."
                className={cn(
                  "w-full px-4 py-3",
                  "resize-none",
                  "bg-transparent",
                  "border-none",
                  "text-gray-900 dark:text-white text-sm",
                  "focus:outline-none",
                  "focus-visible:ring-0 focus-visible:ring-offset-0",
                  "placeholder:text-gray-500 placeholder:text-sm",
                  "min-h-[60px]"
                )}
                style={{
                  overflow: "hidden",
                }}
              />
            ) : (
              <div
                className="w-full px-4 py-3 flex items-center cursor-pointer"
                onClick={openLogin}
              >
                <div className="flex-1 text-gray-500 text-sm">
                  Sign in to interact with the study agent...
                </div>
              </div>
            )}
            <Button
              onClick={(e) => {
                e.preventDefault();
                user ? handleSendMessage() : openLogin();
              }}
              disabled={(!user || !value.trim()) && user}
              className="absolute bottom-2 right-2 h-8 w-8 rounded-full p-0 cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2 px-2 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Sparkles className="h-3 w-3" />
              <span>AI-powered responses with casual chat</span>
            </div>
            <span>Shift + Enter for new line</span>
          </div>
        </div>
      </div>
    </div>
  );
}
