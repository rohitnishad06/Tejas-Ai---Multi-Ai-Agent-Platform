import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, googleProvider } from "../utils/firebase";
import api from "../utils/AXIOS.JS";

const App = () => {
  const handleLogin = async (token) => {
    try {
      const { data } = await api.post("/auth/login", { token });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const googleAuth = async () => {
    const data = await signInWithPopup(auth, googleProvider);
    const token = await data.user.getIdToken();
    console.log(token);
    await handleLogin(token);
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center">
      <button className="w-50 h-10 bg-amber-400" onClick={googleAuth}>
        continue with google
      </button>
    </div>
  );
};

export default App;
