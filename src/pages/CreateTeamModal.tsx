import React from "react";
import Modal from "react-modal";

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

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
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
          <form action="" className="flex flex-col gap-8 mt-8 items-center">
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