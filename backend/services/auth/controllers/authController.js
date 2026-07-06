import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import userModel from "../models/userModel.js";
import crypto from "crypto";

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
