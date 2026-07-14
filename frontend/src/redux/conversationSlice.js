import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversations: [],
    selectedConversation: null,
  },
  reducers: {
    //get all the con
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    //add conv in existing con
    addConversation: (state, action) => {
      state.conversations.unshift(action.payload);
    },
    // selected conv
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    // change the title of conv
    setConvTitle: (state, action) => {
      const { title, conversationId } = action.payload;
      state.conversations = state.conversations.map((conv) =>
        conv._id == conversationId ? { ...conv, title } : conv,
      );

      if (state.selectedConversation?._id == conversationId) {
        state.selectedConversation = { ...state.selectedConversation, title };
      }
    },
  },
});

export const {
  setConversations,
  addConversation,
  setSelectedConversation,
  setConvTitle,
} = conversationSlice.actions;

export default conversationSlice.reducer;
