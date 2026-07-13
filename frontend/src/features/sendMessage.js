import api from "../../utils/AXIOS.JS";

export const sendMessage = async (payload) => {
  try {
    const { data } = await api.post("/api/agent/chat", payload);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
