import React from "react";

import MeetingCreate from "../components/MeetingCreate";
import MeetingCard from "../components/MeetingCard";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import { useParams } from "react-router-dom";
import { getTeamFromId } from "../database/Team";
import { useAuthContext } from "../utils/AuthContext";
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

  const auth = useAuthContext();

  const onClickLogin = () => {
    auth.login();
  };

  const onClickLogout = () => {
    auth.logout();
  };

  return (
    <div className=" ">
      <div className=" items-center bg-neutral-200 flex w-full  justify-between pl-10 pr-8 py-4 mb-36">
        <Link
          to="/"
          className="text-4xl font-bold  text-neutral-600 tracking-wider  block  text-center  hover:underline underline-offset-4 "
        >
          調整くん
        </Link>

        <div className="flex">
          {/* 右寄せにgridがいる */}
          {auth.user ? (
            <>
              <button
                onClick={onClickLogout}
                className=" border-2  border-neutral-600 fill-neutral-600 bg-neutral-50 text-neutral-600 font-extrabold py-2 pl-4 pr-3 rounded flex gap-x-1 hover:shadow-inner   hover:bg-neutral-600 hover:text-white hover:border-transparent hover:fill-white"
              >
                logout
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 500 500"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_187_24)">
                    <path
                      opacity="0.974"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M46.5 -0.5C122.5 -0.5 198.5 -0.5 274.5 -0.5C297.945 5.44264 313.112 20.1093 320 43.5C321.634 79.1277 321.967 114.794 321 150.5C317.052 160.223 309.886 163.723 299.5 161C294.572 159.073 291.406 155.573 290 150.5C289.667 118.167 289.333 85.8333 289 53.5C286.585 42.0857 279.752 34.919 268.5 32C196.167 31.3333 123.833 31.3333 51.5 32C41.6667 35.1667 35.1667 41.6667 32 51.5C31.3333 183.5 31.3333 315.5 32 447.5C35.1667 457.333 41.6667 463.833 51.5 467C123.833 467.667 196.167 467.667 268.5 467C279.752 464.081 286.585 456.914 289 445.5C289.333 410.167 289.667 374.833 290 339.5C293.999 330.583 300.832 327.083 310.5 329C315.667 330.833 319.167 334.333 321 339.5C321.667 376.5 321.667 413.5 321 450.5C315.51 476.487 300.01 492.82 274.5 499.5C198.5 499.5 122.5 499.5 46.5 499.5C21.8333 492.833 6.16667 477.167 -0.5 452.5C-0.5 317.167 -0.5 181.833 -0.5 46.5C6.16667 21.8333 21.8333 6.16667 46.5 -0.5Z"
                    />
                    <path
                      opacity="0.974"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M499.5 245.5C499.5 249.5 499.5 253.5 499.5 257.5C456.091 302.41 412.091 346.91 367.5 391C352.868 398.13 343.868 393.797 340.5 378C340.726 374.988 341.559 372.155 343 369.5C376.139 335.361 409.639 301.528 443.5 268C332.833 267.667 222.167 267.333 111.5 267C103.149 264.978 98.8155 259.645 98.5 251C98.9317 241.905 103.598 236.571 112.5 235C222.833 234.667 333.167 234.333 443.5 234C410.667 201.167 377.833 168.333 345 135.5C338.7 126.926 339.2 118.76 346.5 111C354.087 106.133 361.42 106.466 368.5 112C413.146 155.81 456.812 200.31 499.5 245.5Z"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_187_24">
                      <rect width="500" height="500" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>

              <br />
            </>
          ) : (
            <>
              <button
                onClick={onClickLogin}
                className="block  bg-neutral-400 text-white border-neutral-400 tracking-wider font-medium py-2 w-24 rounded hover:bg-white hover:text-neutral-700 hover:border-none"
              >
                login
              </button>
              <br />
            </>
          )}
        </div>
      </div>

      <div />

      <div>
        <div className="max-w-[900px] mx-auto mt-10 mb-20 tracking-wider relative">
          <div className=" items-end">
            <h1 className="text-5xl  text-neutral-700  font-bold  py-2 pl-4 border-b-4 drop-shadow-sm mb-8">
              {teamData.name}
            </h1>
          </div>

          <div className="  grid grid-cols-10 bg-neutral-100 py-4 px-6 text-lg  border border-neutral-200  rounded-sm text-neutral-900  text-opacity-60 tracking-wider">
            <h2 className=" decoration-solid t  break-all  col-span-9">
              {location.href}
            </h2>
            <Tooltip anchorSelect=".copy" content="copied!" isOpen={tooltip} />
            <button
              onClick={() => urlCopyHandler(location.href)}
              className="copy   col-span-1 justify-self-end"
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.25 18.75H5C4.33696 18.75 3.70107 18.4866 3.23223 18.0178C2.76339 17.5489 2.5 16.913 2.5 16.25V5C2.5 4.33696 2.76339 3.70107 3.23223 3.23223C3.70107 2.76339 4.33696 2.5 5 2.5H16.25C16.913 2.5 17.5489 2.76339 18.0178 3.23223C18.4866 3.70107 18.75 4.33696 18.75 5V6.25"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="max-w-[900px] mx-auto mt-10 mb-20 tracking-wider">
          <h2 className=" text-2xl font-extrabold mt-20 mb-4">メンバー</h2>
          <div className=" text-xl tracking-wider flex gap-x-2">
            <div className=" bg-neutral-300 h-12 w-12 rounded-full "></div>
            <div className=" bg-neutral-300 h-12 w-12 rounded-full "></div>
            <div className=" bg-neutral-300 h-12 w-12 rounded-full "></div>
          </div>
          <div className="max-w-[900px] mx-auto mt-10 mb-20">
            <MeetingCreate teamData={teamData}></MeetingCreate>
            <h2 className="text-2xl font-bold mt-40">会議一覧</h2>
            <div className=" bg-neutral-300 py-12 px-12 rounded-md mt-2 space-y-10">
              {meetings
                ? meetings.map((meeting, index) => {
                    return <MeetingCard key={index} detail={meeting} />;
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
