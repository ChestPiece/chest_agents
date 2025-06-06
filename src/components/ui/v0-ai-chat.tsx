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
  Link,
  ExternalLink,
  BookMarked,
  FileText,
  BookOpen as BookOpenIcon,
} from "lucide-react";

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
      "Learn the basics of algebra, equations, variables, and functions. Perfect for beginners.",
    url: "https://example.com/math/algebra-foundations",
    keywords: ["math", "algebra", "equations", "variables", "functions"],
    type: "article",
  },
  {
    id: "math-2",
    title: "Calculus Made Easy",
    snippet:
      "Comprehensive guide to differential and integral calculus with step-by-step examples.",
    url: "https://example.com/math/calculus-guide",
    keywords: ["math", "calculus", "differential", "integral", "limits"],
    type: "book",
  },
  {
    id: "history-1",
    title: "Ancient Civilizations Timeline",
    snippet:
      "Interactive timeline of major ancient civilizations from Mesopotamia to Rome.",
    url: "https://example.com/history/ancient-civilizations",
    keywords: [
      "history",
      "ancient",
      "civilization",
      "mesopotamia",
      "rome",
      "egypt",
    ],
    type: "article",
  },
  {
    id: "history-2",
    title: "World War II: A Complete Overview",
    snippet:
      "Detailed analysis of causes, major events, and consequences of World War II.",
    url: "https://example.com/history/world-war-2",
    keywords: ["history", "war", "world war", "20th century", "military"],
    type: "document",
  },
  {
    id: "science-1",
    title: "Introduction to Chemistry",
    snippet: "Learn about atoms, molecules, reactions, and the periodic table.",
    url: "https://example.com/science/intro-chemistry",
    keywords: ["science", "chemistry", "atoms", "molecules", "periodic table"],
    type: "video",
  },
  {
    id: "science-2",
    title: "Physics Principles and Problems",
    snippet:
      "Comprehensive physics guide covering mechanics, thermodynamics, electricity, and more.",
    url: "https://example.com/science/physics-principles",
    keywords: [
      "science",
      "physics",
      "mechanics",
      "thermodynamics",
      "electricity",
    ],
    type: "book",
  },
  {
    id: "language-1",
    title: "Grammar Essentials",
    snippet:
      "Master the fundamentals of grammar, sentence structure, and punctuation.",
    url: "https://example.com/language/grammar-essentials",
    keywords: [
      "language",
      "grammar",
      "writing",
      "punctuation",
      "sentence structure",
    ],
    type: "article",
  },
  {
    id: "language-2",
    title: "Effective Writing Techniques",
    snippet:
      "Learn how to improve your writing with style, clarity, and purpose.",
    url: "https://example.com/language/writing-techniques",
    keywords: ["language", "writing", "composition", "style", "clarity"],
    type: "document",
  },
  {
    id: "study-1",
    title: "Memory Improvement Techniques",
    snippet:
      "Research-backed methods to enhance memory retention for better learning outcomes.",
    url: "https://example.com/study/memory-techniques",
    keywords: ["study", "memory", "retention", "learning", "techniques"],
    type: "article",
  },
  {
    id: "study-2",
    title: "Effective Study Habits",
    snippet:
      "Develop productive study routines and habits for academic success.",
    url: "https://example.com/study/effective-habits",
    keywords: ["study", "habits", "productivity", "academic", "success"],
    type: "video",
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
    .filter((result) => result.score > 5)
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

// Generate a response based on the user's message
function generateStudyAgentResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  let responseArray = studyResponses.study; // Default to general study tips

  // Check for subject-specific keywords
  if (
    lowerMessage.includes("math") ||
    lowerMessage.includes("calculus") ||
    lowerMessage.includes("algebra") ||
    lowerMessage.includes("equation")
  ) {
    responseArray = studyResponses.math;
  } else if (
    lowerMessage.includes("history") ||
    lowerMessage.includes("civilization") ||
    lowerMessage.includes("century") ||
    lowerMessage.includes("war")
  ) {
    responseArray = studyResponses.history;
  } else if (
    lowerMessage.includes("science") ||
    lowerMessage.includes("biology") ||
    lowerMessage.includes("chemistry") ||
    lowerMessage.includes("physics")
  ) {
    responseArray = studyResponses.science;
  } else if (
    lowerMessage.includes("language") ||
    lowerMessage.includes("grammar") ||
    lowerMessage.includes("vocabulary") ||
    lowerMessage.includes("writing")
  ) {
    responseArray = studyResponses.language;
  }

  // Return a random response from the appropriate category
  return responseArray[Math.floor(Math.random() * responseArray.length)];
}

export function VercelV0Chat() {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      content:
        "Hi there! I'm your Study Agent. How can I help you with your learning today? I can provide study tips or search for educational materials.",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 60,
    maxHeight: 200,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!value.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: value.trim(),
      role: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setValue("");
    adjustHeight(true);

    // Show typing indicator
    setIsLoading(true);

    // Check if this is a search query
    const isSearchQuery =
      value.toLowerCase().includes("search") ||
      value.toLowerCase().includes("find") ||
      value.toLowerCase().includes("looking for") ||
      value.toLowerCase().includes("resources") ||
      value.toLowerCase().includes("materials");

    setTimeout(() => {
      // Generate response
      const responseContent = generateStudyAgentResponse(userMessage.content);

      if (isSearchQuery) {
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
          content: responseContent,
          role: "assistant",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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
        return <Link className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 space-y-4 mb-12">
      <div className="flex items-center gap-2">
        <BookOpen className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Study Chat Agent
        </h1>
      </div>

      <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-md overflow-hidden">
        {/* Messages display */}
        <div className="h-[400px] overflow-y-auto p-4 space-y-4">
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
                      : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
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
                      className="flex bg-gray-50 dark:bg-gray-800/50 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 max-w-[90%]"
                    >
                      <div className="bg-gray-100 dark:bg-gray-700 p-3 flex items-center justify-center">
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
              <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg px-4 py-2">
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
        <div className="border-t border-gray-200 dark:border-gray-800 p-3">
          <div className="relative bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                adjustHeight();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question or search for materials..."
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
            <Button
              onClick={handleSendMessage}
              disabled={!value.trim() || isLoading}
              className="absolute bottom-2 right-2 h-8 w-8 rounded-full p-0 cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2 px-2 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Sparkles className="h-3 w-3" />
              <span>AI-powered responses with resource search</span>
            </div>
            <span>Try "search for calculus materials"</span>
          </div>
        </div>
      </div>
    </div>
  );
}
