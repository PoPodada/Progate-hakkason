import React from "react";
import { auth } from "../firebase";
import { useAuthContext } from "../utils/AuthContext";

const Home: React.FC = () => {
  const auth = useAuthContext();
  auth;

  const onClick = () => {
    auth.login();
  };

  return (
    <div className="text-slate-400">
      home
      <button onClick={onClick}>login</button>
    </div>
  );
};

export default Home;
