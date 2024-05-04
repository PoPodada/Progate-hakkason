import React from "react";

import MeetingCreate from "../components/MeetingCreate";
import MeetingCard from "../components/MeetingCard";
import { Link } from "react-router-dom";

const Team: React.FC = () => {
  return (
    <div>
      <Link
        to="/"
        className="block  bg-neutral-300 py-4 w-36 rounded mt-16 ml-20 text-xl text-center align-middle justify-self-auto hover:underline underline-offset-2"
      >
        HOME
      </Link>
      <div className="max-w-[900px] mx-auto mt-10 mb-20 tracking-wider">
        <div className="flex justify-between items-end">
          <h2 className="text-4xl font-bold">チーム名</h2>
          <div className="flex gap-x-2">
            <h2 className="text-2xl  underline decoration-solid ">
              http//00000
            </h2>

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
          </div>
        </div>
        <h2 className="text-2xl font-bold mt-20 mb-4">メンバー</h2>
        <div className=" text-xl tracking-wider flex gap-x-2">
          <div className=" bg-neutral-300 h-12 w-12 rounded-full "></div>
          <div className=" bg-neutral-300 h-12 w-12 rounded-full "></div>
          <div className=" bg-neutral-300 h-12 w-12 rounded-full "></div>
        </div>
        <MeetingCreate></MeetingCreate>
        <h2 className="text-2xl font-bold mt-40">会議一覧</h2>
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
