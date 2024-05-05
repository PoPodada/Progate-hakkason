import React from "react";

import MeetingCreate from "../components/MeetingCreate";
import MeetingCard from "../components/MeetingCard";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import { useParams } from "react-router-dom";
import { getTeamFromId } from "../database/Team";
import { Meeting, Team } from "../types";
import { getTeamMeetingListFromTeamId } from "../database/Meeting";

//propsで会議idを受け取る予定
const TeamPage: React.FC = () => {
  const { id } = useParams();
  // number が 0 の場合はローディング中
  // number が 1 の場合はエラー
  const [teamData, setTeamData] = useState<Team | number>(0);
  const [meetings, setMeetings] = useState<Meeting[]>();
  const [tooltip, setTooltip] = useState(false);

  // idの処理
  if (!id) {
    return <div>Error 404 Not found</div>;
  }

  useEffect(() => {
    (async () => {
      const teamData = await getTeamFromId(id);
      if (!teamData) {
        setTeamData(1);
        return;
      }

      const meetings = await getTeamMeetingListFromTeamId(id);
      setMeetings(meetings);
      setTeamData(teamData);
    })();
  }, []);

  // チームデータの取得
  if (teamData == 0) {
    return <div>Loading...</div>;
  }
  if (typeof teamData == "number") {
    return <div>Error 404 Not found</div>;
  }

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
              {teamData.name}
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

export default TeamPage;
