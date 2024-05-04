const TeamPreview = (props: { name: string }) => {
  return (
    <div className="max-w-[900px] mx-auto mt-4">
      <div className=" bg-neutral-300 py-2 px-6 rounded-lg text-xl tracking-wider">
        {props.name}
      </div>
    </div>
  );
};

export default TeamPreview;
