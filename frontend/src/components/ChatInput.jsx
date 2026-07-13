import React, { useState } from "react";
import { Mic, Paperclip, Send } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../features/sendMessage";
import { createConversation } from "../features/createConversation";
import { addConversation, setSelectedConversation } from "../redux/conversationSlice";
import { addMessage } from "../redux/messageSlice";


const ChatInput = () => {

  const dispatch = useDispatch()

  const { messages } = useSelector((state) => state.message);
  const { selectedConversation } = useSelector((state) => state.conversation);

  const [value, setValue] = useState("");

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

  const payload = {
    conversationId: conversation._id,
    prompt: value.trim(),
  };

  
  dispatch(addMessage({role:"user", content:value.trim()}))
  setValue("")
  const data = await sendMessage(payload);
    dispatch(addMessage({role:"assistant", content:data}))

  console.log(data);

  setValue("");
};

  return (
    <div className="w-full overflow-hidden px-3 md:px-5 py-4 border-t border-white/[0.06] bg-[#0d0f14]">
      <div className="flex flex-col gap-2 bg-white/[0.03] border border-white/[0.03] rounded-2xl px-4 pt-3.5 pb-3">
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
