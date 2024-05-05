import { useEffect, useState } from "react";
import { getuserFromUserDocumentId } from "../database/User";

const MeetingCard = (props:any) => {
  const [membersInfo,setMembersInfo] = useState([""]);

useEffect(() => {
  const fetchMembersInfo = async () => {
    try {
      const info = await Promise.all(props.detail.members.map((member:string) => getuserFromUserDocumentId(member)));
      setMembersInfo(info);
    } catch (error) {
      console.error("Failed to fetch members info:", error);
    }
  };

  fetchMembersInfo();
}, [props.detail.members]);
  return (

    <div className=" bg-white  rounded-lg">
      <div className=" bg-neutral-0 py-6 px-8 rounded-lg text-xl tracking-wider ">
        {
          props.detail.id ? 
          (
            <>
              <p className="text-2xl mb-2">会議：{props.detail.name}</p>
              <p className="text-xl mb-1">日程：{props.detail.time}</p>
              <p className="text-xl mb-1">メンバー：
                {membersInfo.map((member: any, index: number) => {
                  return (
                    <span key={index}>
                      {member.name}
                      {index !== membersInfo.length - 1 ? ", " : ""}
                    </span>
                  );
                })}
              </p>
            </>
          ) : (
            ""
          )
        }
        

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
