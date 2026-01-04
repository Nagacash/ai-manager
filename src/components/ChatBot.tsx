"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm Maie, your AI assistant from Naga Codex. I'm here to help you learn about Maurice Holda's services, portfolio, and work. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("API Error:", data);
        throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      if (!data.message) {
        throw new Error("Invalid response format from API");
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      let errorMessage = "Sorry, I encountered an error. Please try again.";
      
      if (error instanceof Error) {
        // Show more specific error messages
        if (error.message.includes("API key")) {
          errorMessage = "API key error. Please check your configuration.";
        } else if (error.message.includes("HTTP 401")) {
          errorMessage = "Authentication failed. Please check your API key.";
        } else if (error.message.includes("HTTP 429")) {
          errorMessage = "Rate limit exceeded. Please try again in a moment.";
        } else if (error.message.includes("HTTP 500")) {
          errorMessage = "Server error. Please try again later.";
        } else {
          errorMessage = `Error: ${error.message}`;
        }
      }
      
      const errorMsg: Message = {
        role: "assistant",
        content: errorMessage,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[800px] w-full">
      {/* Chat Header */}
      <div className="border-b border-slate-200/60 bg-white/95 backdrop-blur-sm p-4 sm:p-5 rounded-t-3xl">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-full bg-white flex items-center justify-center shadow-md border border-slate-200/50 overflow-hidden">
            <Image
              src="/images/logo.png"
              alt="Naga Codex Logo"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-foreground">Maie Assistant</h2>
            <p className="text-xs text-slate-500">AI Assistant by Naga Codex</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 bg-gradient-to-b from-slate-50/50 to-white scrollbar-hide">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className={`flex items-start gap-2.5 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="size-7 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5 border border-slate-200/50 overflow-hidden">
                  <Image
                    src="/images/logo.png"
                    alt="Naga Codex Logo"
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
              )}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2.5 ${
                  message.role === "user"
                    ? "bg-gradient-primary text-white rounded-br-sm shadow-sm"
                    : "bg-white text-foreground rounded-bl-sm shadow-sm border border-slate-100"
                }`}
              >
                {message.role === "assistant" ? (
                  <div className="markdown-content text-sm leading-relaxed">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                )}
              </div>
              {message.role === "user" && (
                <div className="size-7 rounded-full bg-slate-300 flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                  <User className="size-3.5 text-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-2.5 justify-start"
          >
            <div className="size-7 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5 border border-slate-200/50 overflow-hidden">
              <Image
                src="/images/logo.png"
                alt="Naga Codex Logo"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm">
              <div className="flex items-center gap-2">
                <Loader2 className="size-3.5 text-slate-400 animate-spin" />
                <span className="text-sm text-slate-500">Maie is thinking...</span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-200/60 bg-white/95 backdrop-blur-sm p-4 sm:p-5 rounded-b-3xl">
        <div className="flex gap-2.5 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 min-h-[52px] max-h-[120px] px-4 py-3 rounded-2xl border border-slate-200/80 bg-white text-foreground placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 resize-none text-sm shadow-sm transition-all"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="gradient-primary text-white shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed h-[52px] w-[52px] p-0 rounded-full flex items-center justify-center transition-all"
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-slate-400 mt-2.5 text-center">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}

