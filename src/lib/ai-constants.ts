import {
  Bot,
  Brain,
  Cpu,
  MessageSquare,
  Mic,
  Network,
  Sparkles,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type AICapability = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const AI_CAPABILITIES: AICapability[] = [
  {
    title: "AI Development",
    description:
      "Custom AI-powered products built with modern LLM APIs, embeddings, and production-grade architecture.",
    icon: Brain,
  },
  {
    title: "GPT Apps",
    description:
      "ChatGPT-style applications with custom knowledge bases, streaming responses, and branded experiences.",
    icon: MessageSquare,
  },
  {
    title: "Voice AI",
    description:
      "Real-time voice agents, transcription, text-to-speech, and conversational interfaces for your users.",
    icon: Mic,
  },
  {
    title: "Automation",
    description:
      "Intelligent workflows that eliminate manual tasks and connect your tools with AI-driven decision making.",
    icon: Workflow,
  },
  {
    title: "Agents",
    description:
      "Autonomous AI agents that research, plan, execute tasks, and integrate with your existing systems.",
    icon: Bot,
  },
  {
    title: "RAG",
    description:
      "Retrieval-augmented generation — chat with your docs, data, and knowledge base with accurate answers.",
    icon: Cpu,
  },
];

export const AI_STACK = [
  { name: "OpenAI", color: "from-emerald-500/10 to-teal-500/5" },
  { name: "Claude", color: "from-orange-500/10 to-amber-500/5" },
  { name: "n8n", color: "from-rose-500/10 to-pink-500/5" },
  { name: "MCP", color: "from-violet-500/10 to-purple-500/5" },
] as const;

export const AI_STATS = [
  { value: "10x", label: "Faster workflows" },
  { value: "85%", label: "Cost reduction" },
  { value: "24/7", label: "AI availability" },
] as const;
