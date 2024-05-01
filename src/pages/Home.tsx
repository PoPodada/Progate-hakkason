import React from "react";
import { useAuthContext } from "../utils/AuthContext";
import TeamPreview from "./TeamPreview";

const Home: React.FC = () => {
  const auth = useAuthContext();

  const onClickLogin = () => {
    auth.login();
  };

  const onClickLogout = () => {
    auth.logout();
  };

  return (
    <div>
      <div className="text-slate-400">
        home
        <br />
        {auth.user ? "ログイン中" : "未ログイン"}
        <br />
        <button onClick={onClickLogin}>login</button>
        <br />
        <button onClick={onClickLogout}>logout</button>
        <br />
        <div />
        <div className="max-w-[900px] mx-auto mt-16">
          <h2 className="text-2xl font-bold">入っているチーム一覧</h2>
          <TeamPreview></TeamPreview>
        </div>
      </div>
      <div />
    </div>
  );
};

export default Home;
