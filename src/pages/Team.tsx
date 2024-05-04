import React from "react";

import MeetingCreate from "../components/MeetingCreate";
import MeetingCard from "../components/MeetingCard";
import { Link } from "react-router-dom";
import data from "../sampleData/teamData.json";
import { useEffect } from "react";
import { useState } from "react";
import { meeting } from "../pages/Home";
import { useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";

//propsで会議idを受け取る予定
const Team: React.FC = () => {
  const [meetings, setMeetings] = useState<meeting[]>();
  useEffect(() => {
    let teamid = "1";
    const teamData = data;
    const MeetingList = teamData.filter((data) => data.id === teamid);
    console.log(MeetingList[0].meetings);
    setMeetings(MeetingList[0].meetings);
  }, []);

  const locationState = useLocation();
  const teamName = locationState.state;
  const [tooltip, setTooltip] = useState(false);

  const urlCopyHandler = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setTooltip(true);
      setTimeout(function () {
        setTooltip(false);
      }, 1000);
    } catch {
      alert("URLのコピーに失敗しました");
      setTooltip(false);
    }
  };

  return (
    <div>
      <div>
        <Link
          to="/"
          className="block  bg-neutral-300 py-4 w-36 rounded mt-16 ml-20 text-xl text-center align-middle justify-self-auto hover:underline underline-offset-2"
        >
          HOME
        </Link>
        <div className="max-w-[900px] mx-auto mt-10 mb-20 tracking-wider">
          <div className=" items-end">
            <h1 className="text-5xl  text-neutral-700  font-bold  py-2 pl-4 border-b-4 drop-shadow-sm mb-8">
              {teamName}
            </h1>
          </div>

          <div className="flex gap-x-2">
            <h2 className="text-xl  underline decoration-solid t">
              {location.href}
            </h2>
            <Tooltip anchorSelect=".copy" content="copied!" isOpen={tooltip} />
            <button
              onClick={() => urlCopyHandler(location.href)}
              className="copy"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25 11.25H13.75C12.3693 11.25 11.25 12.3693 11.25 13.75V25C11.25 26.3807 12.3693 27.5 13.75 27.5H25C26.3807 27.5 27.5 26.3807 27.5 25V13.75C27.5 12.3693 26.3807 11.25 25 11.25Z"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.25 18.75H5C4.33696 18.75 3.70107 18.4866 3.23223 18.0178C2.76339 17.5489 2.5 16.913 2.5 16.25V5C2.5 4.33696 2.76339 3.70107 3.23223 3.23223C3.70107 2.76339 4.33696 2.5 5 2.5H16.25C16.913 2.5 17.5489 2.76339 18.0178 3.23223C18.4866 3.70107 18.75 4.33696 18.75 5V6.25"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="max-w-[900px] mx-auto mt-10 mb-20 tracking-wider">
          <h2 className="text-2xl font-bold mt-20 mb-4">メンバー</h2>
          <div className=" text-xl tracking-wider flex gap-x-2">
            <div className=" bg-neutral-300 h-12 w-12 rounded-full "></div>
            <div className=" bg-neutral-300 h-12 w-12 rounded-full "></div>
            <div className=" bg-neutral-300 h-12 w-12 rounded-full "></div>
          </div>
          <div className="max-w-[900px] mx-auto mt-10 mb-20">
            <MeetingCreate></MeetingCreate>
            <h2 className="text-2xl font-bold mt-40">会議一覧</h2>
            <div className=" bg-neutral-300 py-12 px-12 rounded-md mt-2 space-y-10">
              {meetings
                ? meetings.map((meeting) => {
                    return <MeetingCard detail={meeting} />;
                  })
                : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
