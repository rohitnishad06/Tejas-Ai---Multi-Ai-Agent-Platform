import redis from "../../shared/redis/redis.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const sessionId = req.cookies?.session;

    if (!sessionId) {
      return res.status(400).json({ message: "unauthorised" });
    }

    //get data from redis
    const sessionData = await redis.get(`session-${sessionId}`);

    if (!sessionData) {
      return res.status(400).json({ message: "session Expires" });
    }

    req.user = JSON.parse(sessionData);
    next();
  } catch (error) {
    return res.status(500).json({ message: `authmiddleware error ${error}` });
  }
};
