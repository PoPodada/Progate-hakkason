import React from "react";

const MeetingCard: React.FC = () => {
  return (
    <div className=" bg-white  rounded-lg">
      <div className=" bg-neutral-0 py-6 px-8 rounded-lg text-xl tracking-wider ">
        <p className="text-2xl mb-2">会議1</p>
        <p className="text-xl mb-1">日程：12/24 12:00~</p>
        <p className="text-xl mb-1">メンバー：</p>
        <div className="flex gap-x-2"> {/**flexで横並び、gapで間を指定、↓の丸にはアイコンが入る */}
          <div className=" bg-neutral-300 h-12 w-12 rounded-full mt-2"></div>
          <div className=" bg-neutral-300 h-12 w-12 rounded-full mt-2"></div>
          <div className=" bg-neutral-300 h-12 w-12 rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default MeetingCard;
