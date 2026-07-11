import {
  MessageSquare,
  PanelLeftIcon,
  PenBoxIcon,
  PenSquareIcon,
  Plus,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { getConversation } from "../features/getConversations";
import { useDispatch, useSelector } from "react-redux";
import {
  addConversation,
  setConversations,
  setSelectedConversation,
} from "../redux/conversationSlice";
import { createConversation } from "../features/createConversation";

const SideBar = () => {
  const dispatch = useDispatch();
  const { conversations, selectedConversation } = useSelector(
    (state) => state.conversation,
  );

  const [collapsed, setCollapsed] = useState(false);

  // create new conv
  const handleCreateConversation = async () => {
    const data = await createConversation();
    dispatch(addConversation(data));
  };

  // get all the conversation
  useEffect(() => {
    const getCon = async () => {
      const data = await getConversation();
      dispatch(setConversations(data));
    };
    getCon();
  }, []);

  return (
    <div className="fixed lg:static inset-y-0 left-0 z-50 w-[270px] h-screen shrink-0 bg-[#0d0f14] border-r border-white/[0.06]">
      {/* top bar */}
      <div className="flex flex-col h-full">
        {/* Header bar */}
        <div className=" flex items-center gap-2.5 px-4 py-4 border-b  border-white/[0.06]">
          {/* pannel icon */}
          <div
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer"
            onClick={handleCreateConversation}
          >
            <PanelLeftIcon />
          </div>
          {/* logo */}
          <span className="text-[16px] font-semibold text-slate-100 tracking-tight flex-1">
            Tejas AI
          </span>
          {/* plan */}
          <span className="text-[10px] font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full tracking-wide">
            Free
          </span>
          {/* pencil Icon */}
          <button
            className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer"
            onClick={handleCreateConversation}
          >
            <PenSquareIcon size={14} />
          </button>
        </div>

        {/* New Chat */}
        <div className="px-4 pt-4 pb-1">
          <button
            className="w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-linear-to-br from-indigo-500 to-violet-700 rounded-xl py-[10px] border-none cursor-pointer hover:opacity-90 transition-opacity duration-150 rounded-xl"
            onClick={() => createConversation()}
          >
            <Plus size={15} />
            New Chat
          </button>
        </div>

        {/* conversation */}
        {conversations.length == 0 ? (
          <div className="px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600">
            No Recent Conversation
          </div>
        ) : (
          <div className="px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600">
            RECENTS
          </div>
        )}

        {/* mapping all the conversation */}
        <div className="flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {conversations.map((conv) => {
            const isActive = selectedConversation?._id === conv?._id;

            return (
              <div
                key={conv?._id}
                onClick={() => dispatch(setSelectedConversation(conv))}
                className={`flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5 rounded-[10px] border transition-colors duration-150 ${
                  isActive
                    ? "bg-indigo-500/10 border-indigo-500/[0.18]"
                    : "bg-transparent border-transparent"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-[28px] h-[28px] shrink-0 rounded-lg transition-colors duration-150 ${
                    isActive
                      ? "bg-indigo-500/15 text-indigo-400"
                      : "bg-white/[0.05] text-slate-500"
                  }`}
                >
                  <MessageSquare size={13} />
                </div>

                <span className={`text-[13px] font-medium truncate ${isActive ? "text-slate-100" : "text-slate-300"}`}>{conv?.title || "New Chat"}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
