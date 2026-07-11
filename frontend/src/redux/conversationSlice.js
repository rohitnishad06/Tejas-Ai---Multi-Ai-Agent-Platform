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
  },
});

export const { setConversations, addConversation, setSelectedConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
