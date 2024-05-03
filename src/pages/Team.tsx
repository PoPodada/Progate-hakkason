import React from "react";
import MeetingCard from "./MeetingCard";
import MeetingCreate from "./MeetingCreate";

const Team: React.FC = () => {
  return (
    <div>
      team
      <div className="max-w-[900px] mx-auto mt-10 mb-20">
        <MeetingCreate></MeetingCreate>
        <h2 className="text-2xl font-bold mt-10">会議一覧</h2>
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
