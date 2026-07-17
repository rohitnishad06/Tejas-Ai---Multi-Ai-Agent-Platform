import conversationModel from "../models/conversationModel.js";
import messageModel from "../models/messageModel.js";

// create conversation
export const createConversation = async (req, res) => {
  try {
    // get userid from the gateway proxywithHeaders
    const userId = req.headers["x-user-id"];
    console.log("userId", userId);
    const conversation = await conversationModel.create({
      userId: userId,
    });

    return res.status(200).json(conversation);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `create conversation error : ${error}` });
  }
};

// get conversation
export const getConversation = async (req, res) => {
  try {
    // get userid from the gateway proxywithHeaders
    const userId = req.headers["x-user-id"];
    console.log("userId", userId);
    const conversation = await conversationModel
      .find({
        userId: userId,
      })
      .sort({ updatedAt: -1 });

    return res.status(200).json(conversation);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `get conversation error : ${error}` });
  }
};

//update conversation
export const updateConversation = async (req, res) => {
  try {
    const {id,title} = req.body
    const conversation = await conversationModel
      .findByIdAndUpdate(id,{
        title
      })

    return res.status(200).json(conversation);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `update conversation error : ${error}` });
  }
};

// save message
export const saveMessage = async (req, res) => {
  try {
    const { conversationId, role, content, images } = req.body;
    const messages = await messageModel.create({
      conversationId,
      role,
      content,
      images
    })
      

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: `save message error : ${error}` });
  }
};

// get message
export const getMessage = async (req, res) => {
  try {
    const { conversationId } = req.params

    const messages = await messageModel.find({
      conversationId,
    })

    return res.status(200).json(messages);

  } catch (error) {
    return res.status(500).json({ message: `save message error : ${error}` });
  }
};
