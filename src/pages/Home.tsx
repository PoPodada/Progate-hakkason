import React from "react";
import CreateTeamModal from "./CreateTeamModal";

import { useAuthContext } from "../utils/AuthContext";
import TeamPreview from "./TeamPreview";
import MeetingCard from "./MeetingCard";

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
      <div className="">
        home
        <br />
        {auth.user ? "ログイン中" : "未ログイン"}
        <br />
        <button onClick={onClickLogin}>login</button>
        <br />
        <button onClick={onClickLogout}>logout</button>
        <br />
        <div />
        <div className="max-w-[900px] mx-auto mt-10">
          <CreateTeamModal></CreateTeamModal>
          <div className="mt-10">
            <h2 className="text-2xl font-bold">入っているチーム一覧</h2>
            <TeamPreview></TeamPreview>

            <div className="max-w-[900px] mx-auto mt-24 mb-20">
              <h2 className="text-2xl font-bold">あなたが参加する会議の予定</h2>
              <div className=" bg-neutral-300 py-12 px-12 rounded-md mt-2 space-y-10">
                <MeetingCard></MeetingCard>
                <MeetingCard></MeetingCard>
                <MeetingCard></MeetingCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
