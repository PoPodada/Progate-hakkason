import React from "react";

import MeetingCreate from "../components/MeetingCreate";

import MeetingCard from "../components/MeetingCard";
import data from "../sampleData/teamData.json";
import { useEffect } from "react";
import { useState } from "react";
import { meeting } from "../pages/Home";

//propsで会議idを受け取る
const Team: React.FC = () => {
  const [meetings,setMeetings] = useState<meeting[]>();
  useEffect(() => {
    let teamid = "1";
    const teamData = data;
    const MeetingList = teamData.filter((data) => data.id === teamid);
    console.log(MeetingList[0].meetings)
    setMeetings(MeetingList[0].meetings)
  }, []);
  return (
    <div>
      team
      <div className="max-w-[900px] mx-auto mt-10 mb-20">
        <MeetingCreate></MeetingCreate>
        <h2 className="text-2xl font-bold mt-40">会議一覧</h2>
        <div className=" bg-neutral-300 py-12 px-12 rounded-md mt-2 space-y-10">
          {
            meetings? meetings.map((meeting)=>{
              return(
                <MeetingCard detail={meeting}></MeetingCard>
              )
            }):""
          }
        </div>
      </div>
    </div>
  );
};

export default Team;
