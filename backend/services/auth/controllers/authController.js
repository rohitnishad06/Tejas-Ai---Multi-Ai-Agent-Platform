import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import userModel from "../models/userModel.js";
import crypto from "crypto";
import redis from "../../../shared/redis/redis.js";

// login
export const login = async (req, res) => {
  try {
    const { token } = req.body;

    const decode = await getAuth(app).verifyIdToken(token);

    // find user
    let user = await userModel.findOne({
      firebaseUid: decode.uid,
    });

    // if user not found then create user
    if (!user) {
      user = await userModel.create({
        firebaseUid: decode.uid,
        name: decode.name,
        email: decode.email,
        avatar: decode.picture,
      });
    }

    // generating session cookie
    const sessionId = crypto.randomUUID();

    // storing user data in redis
    await redis.set(
      `session-${sessionId}`,
      JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      }),
      "EX",
      7 * 24 * 60 * 60,
    );

    res.cookie("session", sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `login error : ${error}` });
  }
};


// logout
export const logout = async (req, res) => {
  try {
    const sessionId = req.cookies?.session;

    // clear cookie from redis
    redis.del(`session-${sessionId}`);

    // clear cookie from browser
    res.clearCookie("session");

    return res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    return res.status(500).json({ message: `logout error : ${error}` });
  }
};
