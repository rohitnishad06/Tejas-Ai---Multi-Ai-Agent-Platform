import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    artifacts:[]
  },
  reducers: {
    //get all the con
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    //add new msg
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setArtifacts: (state, action) => {
      state.artifacts = action.payload;
    },
    clearArtifacts: (state) => {
    state.artifacts = [];
  },
  },
});

export const { setMessages, setArtifacts, addMessage, clearArtifacts} = messageSlice.actions;

export default messageSlice.reducer;
