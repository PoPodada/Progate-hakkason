import React from "react";
import { useAuthContext } from "../utils/AuthContext";

const Home: React.FC = () => {
  const auth = useAuthContext();

  const onClickLogin = () => {
    auth.login();
  };

  const onClickLogout = () => {
    auth.logout();
  };

  return (
    <div className="text-slate-400">
      home
      <br />
      {auth.user ? "ログイン中" : "未ログイン"}
      <br />
      <button onClick={onClickLogin}>login</button>
      <br />
      <button onClick={onClickLogout}>logout</button>
      <br />
    </div>
  );
};

export default Home;
