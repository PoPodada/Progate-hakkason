import React from "react";
import MeetingCard from "../components/MeetingCard";
import { useLocation } from "react-router-dom";

const Team: React.FC = () => {
  const locationState = useLocation();
  const teamName = locationState.state;

  const urlCopyHandler = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      alert("URLのコピーに失敗しました");
    }
  };

  return (
    <div>
      team:{teamName}
      <div>{location.href}</div>
      <button onClick={() => urlCopyHandler(location.href)}>copy</button>
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
