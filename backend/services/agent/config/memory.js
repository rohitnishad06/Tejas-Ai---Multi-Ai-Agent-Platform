import redis from "../../../shared/redis/redis.js";
import { getMessages } from "../utils/getMessages.js";

// save messages to redis memory
export const getMemory = async (conversationId) => {
  const key = `messages-${conversationId}`;
  const cached = await redis.get(key);

  if (cached) {
    return JSON.parse(cached);
  }

  const messages = await getMessages(conversationId);
  await redis.set(key, JSON.stringify(messages), "EX", 24 * 60 * 60);
  return messages;
};

// add new msg to memory
export const addMessages = async (conversationId, role, content) => {
  const key = `messages-${conversationId}`;
  const rowMessages = await redis.get(key);

  const messages = rowMessages ? JSON.parse(rowMessages) : [];

  messages.push({
    role,
    content,
  });

  if (messages.length > 20) {
    messages.shift();
  }

  await redis.set(key, JSON.stringify(messages));
};
