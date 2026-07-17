import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenRouter } from "@langchain/openrouter";
import dotenv from "dotenv";
dotenv.config();

const groq = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.3-70b-versatile",
  temperature: 0,
  maxTokens: undefined,
  maxRetries: 2,
});

const gemini = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-pro",
  temperature: 0,
  maxRetries: 2,
});

const openRouter = new ChatOpenRouter({
  model: "deepseek/deepseek-chat",
  temperature: 0,
  maxTokens: 2500,
  // other params...
});

export const getModel = async (agent) => {
  switch (agent) {
    case "chat":
      return groq;
    case "search":
      return groq;
    case "coding":
      return openRouter;

    default:
      return groq;
  }
};
