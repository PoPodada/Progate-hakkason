import React, { useEffect, useState } from "react";
import CreateTeamModal from "../components/CreateTeamModal";

import { useAuthContext } from "../utils/AuthContext";
import TeamPreview from "../components/TeamPreview";
import MeetingCard from "../components/MeetingCard";
import { getTeamListFromUid } from "../database/Team";
import { getUserFromUid } from "../database/User";
import { getTeamMeetingListFromTeamId } from "../database/Meeting";
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
  const {user} = useAuthContext();
  const onClickLogin = () => {
    auth.login();
  };

  const onClickLogout = () => {
    auth.logout();
  };
  
  const [teams, setTeams] = useState<team[]>();
  const [userMeetings,setUserMeetings] = useState<meeting[]>();
  
  useEffect(() => {
    (async () => {
      const userId = user?.uid ? user.uid:"";
      const userInfo = await getUserFromUid(userId);
      const userTeamList = await getTeamListFromUid(userInfo.id);
      console.log(userTeamList,"userteamlist")
      setTeams(userTeamList)
      
      //ここを直したいけど、会議の情報が取れない
      
      // const userMeetingLists = userTeamList.map((team)=>{
      //   return team.meetings
      // }).flat(1);
      // setUserMeetings(userMeetingLists)
    })();
    
    

    
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
