import React from "react";
import MeetingCard from "../components/MeetingCard";

const Team: React.FC = () => {
  return (
    <div>
      team
      <div className="max-w-[900px] mx-auto mt-10 mb-20">
        <h2 className="text-2xl font-bold">会議一覧</h2>
        <div className=" bg-neutral-300 py-12 px-12 rounded-md mt-2 space-y-10">
          <MeetingCard></MeetingCard>
          <MeetingCard></MeetingCard>
          <MeetingCard></MeetingCard>
        </div>
      </div>
    </div>
  );
};

export default Team;
