import React, { useEffect, useState } from "react";
import CreateTeamModal from "./CreateTeamModal";

import { useAuthContext } from "../utils/AuthContext";
import TeamPreview from "./TeamPreview";
import MeetingCard from "./MeetingCard";

import data from "../sampleData/teamData.json";
// import { set } from "firebase/database";

type team = {
  id: string;
  name: string;
  members: string[];
};

export type meeting = {
  id:string,
  members:string[],
  time:string
}

const Home: React.FC = () => {
  const auth = useAuthContext();

  const onClickLogin = () => {
    auth.login();
  };

  const onClickLogout = () => {
    auth.logout();
  };

  const [teams, setTeams] = useState<team[]>();
  const [userMeetings,setUserMeetings] = useState<meeting[]>();
  const userId = "2";
  useEffect(() => {
    const teamsData = data;
    const userTeam = teamsData.filter((team) => {
      return team.members.includes(userId); // currentUserが含まれているデータのみを取得
    });
    setTeams(userTeam);
    const userMeetingList = userTeam.map((team) => {
      return team.meetings
    } 
    ).flat(1);
    setUserMeetings(userMeetingList);
  }, []);

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
            {teams
              ? teams.map((team) => (
                  <TeamPreview key={team.id} name={team.name}></TeamPreview>
                ))
              : ""}

            <div className="mt-24 mb-20">
              <h2 className="text-2xl font-bold">あなたが参加する会議の予定</h2>
              <div className=" bg-neutral-300 py-12 px-12 rounded-md mt-2 space-y-10">
                {
                  userMeetings ? userMeetings.map((meeting)=>{
                    console.log(meeting)
                    return (
                    <MeetingCard  detail={meeting}></MeetingCard>
                  )
                  
                  }):""
                }

                {/* <MeetingCard></MeetingCard>
                <MeetingCard></MeetingCard>
                <MeetingCard></MeetingCard> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
