import React, { useEffect, useState } from "react";
import CreateTeamModal from "../components/CreateTeamModal";

import { useAuthContext } from "../utils/AuthContext";
import TeamPreview from "../components/TeamPreview";
import MeetingCard from "../components/MeetingCard";

import data from "../sampleData/teamData.json";
// import { set } from "firebase/database";

type team = {
  id: string;
  name: string;
  members: string[];
};

export type meeting = {
  id: string;
  members: string[];
  time: string;
};

const Home: React.FC = () => {
  const auth = useAuthContext();

  const onClickLogin = () => {
    auth.login();
  };

  const onClickLogout = () => {
    auth.logout();
  };

  const [teams, setTeams] = useState<team[]>();
  const [userMeetings, setUserMeetings] = useState<meeting[]>();
  const userId = "2";
  useEffect(() => {
    const teamsData = data;
    const userTeam = teamsData.filter((team) => {
      return team.members.includes(userId); // currentUserが含まれているデータのみを取得
    });
    setTeams(userTeam);
    const userMeetingList = userTeam
      .map((team) => {
        return team.meetings;
      })
      .flat(1);
    setUserMeetings(userMeetingList);
  }, []);

  return (
    <div className=" ">
      <div className=" items-center bg-neutral-200 flex w-full  justify-between pl-10 pr-8 py-4">
        <div className="text-4xl font-bold  text-neutral-600 tracking-wider"> サービス名</div>
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

      <div className="max-w-[900px] mx-auto ">
        {/*}
          <div className="grid justify-items-end">
          {auth.user ? "ログイン中" : "未ログイン"}
          
    </div>*/}

        <div className="max-w-[900px] mx-auto mt-10">
          <CreateTeamModal></CreateTeamModal>
          <div className="mt-20">
            <h2 className="text-2xl font-bold">入っているチーム一覧</h2>
            {teams
              ? teams.map((team) => (
                  <TeamPreview key={team.id} name={team.name}></TeamPreview>
                ))
              : ""}

            <div className="mt-24 mb-20">
              <h2 className="text-2xl font-bold">あなたが参加する会議の予定</h2>
              <div className=" bg-neutral-300 py-12 px-12 rounded-md mt-2 space-y-10">
                {userMeetings
                  ? userMeetings.map((meeting) => {
                      console.log(meeting);
                      return <MeetingCard detail={meeting}></MeetingCard>;
                    })
                  : ""}

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
