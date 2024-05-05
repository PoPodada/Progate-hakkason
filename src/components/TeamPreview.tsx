import { Link } from "react-router-dom";

const TeamPreview = (props: { name: string; id: string }) => {
  return (
    <Link className="max-w-[900px] mx-auto mt-4 p-1" to={"/team/" + props.id}>
      <div className=" bg-neutral-300 py-2 px-6 rounded-lg text-xl tracking-wider">
        {props.name}
      </div>
    </Link>
  );
};

export default TeamPreview;
