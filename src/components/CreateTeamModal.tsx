import React, { useEffect } from "react";
import Modal from "react-modal";
import { createTeam } from "../database/Team";
import { useNavigate } from "react-router-dom";
import userData from "../sampleData/userData.json";
import { useAuthContext } from "../utils/AuthContext";
import { getUserFromUid } from "../database/User";
import { User } from "../types";

const customStyles = {
  overlay: {
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const CreateTeamModal: React.FC = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [userinfo,setUserinfo] = React.useState<User>();
  const { user } = useAuthContext()

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  useEffect(()=> {
    (async ()=> {

    if(user){
      const userinfo = await getUserFromUid(user.uid)
      setUserinfo(userinfo)
    }
    })()
  },[])

  const navigate = useNavigate();
  async function handleTeamCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const teamName = form.get("teamName");
    if (teamName === null) {
      return alert("チーム名を入力してください");
    }


    if(userinfo){
      try {
      
        const { id } = await createTeam(teamName.toString(), userinfo);
        console.log("Created team:", id);
        return navigate(`/team/${id}`, { state: teamName });
      } catch (error) {
        console.error("Failed to create team:", error);
        alert("チームの作成に失敗しました");
      }

    }
  }

  return (
    <div className="">
      <button
        onClick={openModal}
        className="bg-neutral-200 rounded-md py-4 px-8 mt-10 mx-auto block"
      >
        チーム作成
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Create Team Modal"
      >
        <div className="relative p-12">
          <button onClick={closeModal} className="absolute right-0 top-0">
            ×
          </button>
          <h2 className="font-bold text-2xl text-center">チーム作成</h2>
          <form
            action=""
            className="flex flex-col gap-8 mt-8 items-center"
            onSubmit={(event) => handleTeamCreate(event)}
          >
            <label htmlFor="teamName" className="flex flex-col gap-2">
              チーム名
              <input
                type="text"
                name="teamName"
                className="border border-neutral-300 py-1 px-2 rounded-md w-80"
              />
            </label>
            <button
              type="submit"
              className="border border-neutral-300 hover:bg-neutral-100 py-2 px-4 w-fit rounded-md"
            >
              作成
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CreateTeamModal;
