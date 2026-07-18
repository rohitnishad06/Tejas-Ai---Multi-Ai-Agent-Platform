import React, { useState } from "react";
import {
  Code2,
  FileText,
  Globe,
  Image,
  MessageSquare,
  Mic,
  Paperclip,
  Presentation,
  Send,
  Zap,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../features/sendMessage";
import { createConversation } from "../features/createConversation";
import {
  addConversation,
  setConvTitle,
  setSelectedConversation,
} from "../redux/conversationSlice";
import { addMessage, setArtifacts } from "../redux/messageSlice";
import { updateConversation } from "../features/updateConversation";

const ChatInput = () => {
  const dispatch = useDispatch();

  const { messages } = useSelector((state) => state.message);
  const { selectedConversation } = useSelector((state) => state.conversation);

  const [value, setValue] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("Auto");

  const isDisabled = !value.trim();

  // handle send msg
  const handleSendMsg = async () => {
    if (!value.trim()) return;

    let conversation = selectedConversation;

    // Create a new conversation if none is selected
    if (!conversation?._id) {
      const newConversation = await createConversation();

      if (!newConversation) return;

      dispatch(addConversation(newConversation));
      dispatch(setSelectedConversation(newConversation));

      conversation = newConversation;
    }

    if (conversation.title == "New Chat") {
      const conv = await updateConversation({
        id: conversation?._id,
        title: value.trim(),
      });
      dispatch(
        setConvTitle({
          conversationId: conversation?._id,
          title: value.slice(0, 40),
        }),
      );
    }

    const payload = {
      conversationId: conversation._id,
      prompt: value.trim(),
      agent: selectedAgent.toLowerCase(),
    };

    dispatch(addMessage({ role: "user", content: value.trim() }));
    setValue("");
    const data = await sendMessage(payload);
    dispatch(setArtifacts(data.artifacts || []));
    dispatch(
      addMessage({
        role: "assistant",
        content: data?.answer,
        images: data?.images,
      }),
    );

    console.log(data);

    setValue("");
  };

  const agents = [
    {
      id: "auto",
      icon: Zap,
      label: "Auto",
    },
    {
      id: "chat",
      icon: MessageSquare,
      label: "Chat",
    },
    {
      id: "coding",
      icon: Code2,
      label: "Coding",
    },
    {
      id: "pdf",
      icon: FileText,
      label: "PDF",
    },
    {
      id: "ppt",
      icon: Presentation,
      label: "PPT",
    },
    {
      id: "image",
      icon: Image,
      label: "Image",
    },
    {
      id: "search",
      icon: Globe,
      label: "Search",
    },
  ];

  return (
    <div className="w-full overflow-hidden px-3 md:px-5 py-4 border-t border-white/[0.06] bg-[#0d0f14]">
      <div className="flex flex-col gap-2 bg-white/[0.03] border border-white/[0.03] rounded-2xl px-4 pt-3.5 pb-3">
        {/* icons */}
        <div className="flex w-[80%] gap-2 pr-2 flex-wrap">
          {agents.map((agent) => {
            const isActive = selectedAgent === agent.label;
            const Icon = agent.icon;
            return (
              <div
                onClick={() => setSelectedAgent(agent.label)}
                className={`flex-shrink-0 cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-full tetx-xs font-medium border transition-all ${isActive ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-transparent shadow-[0_1px_8pxrgba(99,102,241,.35)]" : "bg-white/[0.03] text-slate-400 border-white/[0.06] hover:bg-white/[0.07]"}`}
              >
                <Icon
                  className={`${isActive}?"text-white":"tetx-slate-500"`}
                  size={14}
                />
                {agent.label}
              </div>
            );
          })}
        </div>

        {/* Text Area */}
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask Anything..."
          rows={3}
          className="w-full resize-none bg-transparent outline-none text-[14px] text-slate-200 placeholder:text-slate-600 leading-relaxed [scrollbar-width:none] [&::-webkit-scrollbar]:hidden disabled:opacity-50"
        />

        {/* Bottom Controls */}
        <div className="flex items-center justify-between">
          {/* Attachment & Mic */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/[0.05] border border-transparent hover:border-white/[0.06] transition-all duration-150 bg-transparent cursor-pointer"
            >
              <Paperclip size={16} />
            </button>

            <button
              type="button"
              className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/[0.05] border border-transparent hover:border-white/[0.06] transition-all duration-150 bg-transparent cursor-pointer"
            >
              <Mic size={16} />
            </button>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSendMsg}
            type="button"
            disabled={isDisabled}
            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-150 ${
              isDisabled
                ? "bg-white/[0.05] text-slate-600 cursor-not-allowed"
                : "bg-gradient-to-br from-indigo-500 to-violet-700 hover:opacity-90 text-white cursor-pointer"
            }`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
