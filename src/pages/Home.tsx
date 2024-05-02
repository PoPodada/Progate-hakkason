import React from "react";
import CreateTeamModal from "./CreateTeamModal";

const Home: React.FC = () => {
  return (
    <div className="max-w-[900px] mx-auto mt-6">
      <h1 className="text-4xl">Home</h1>
      <CreateTeamModal />
    </div>
  );
};

export default Home;
