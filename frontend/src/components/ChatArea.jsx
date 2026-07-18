import React, { useEffect } from "react";
import Nav from "./Nav";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../features/getMessages";
import { setArtifacts, setMessages } from "../redux/messageSlice";

const chatArea = () => {
  const { selectedConversation } = useSelector((state) => state.conversation);

  const { messages } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  console.log(selectedConversation?._id);

  // get the current msg
  useEffect(() => {
    if (!selectedConversation?._id) {
      dispatch(setMessages([]));
      return;
    }

    const getMsg = async () => {
      const res = await getMessages(selectedConversation?._id);
      console.log(res);
      dispatch(setMessages(res));
      const latestArtifactsMsg = [...res].reverse().find(msg=>msg.artifacts && msg.artifacts.length>0)
      dispatch(setArtifacts(latestArtifactsMsg.artifacts || []))
    };

    getMsg();
  }, [selectedConversation]);

  return (
    <div className="flex-1 min-w-0  flex flex-col">
      <Nav />
      <MessageList />
      <ChatInput />
    </div>
  );
};

export default chatArea;
