import React from "react";

const Team: React.FC = () => {
  return (
    <div>
      team
      <div className="mx-auto mt-10  px-16 py-8 bg-neutral-100 shadow-lg border-t-8 border-neutral-500">
        <div className="max-w-[900px] mx-auto mt-10 mb-20">
          <h2 className="text-2xl font-bold">会議名</h2>
          <div className="py-2 text-xl tracking-wider">
            <input
              className="border border-black p-1"
              type="text"
              id="name"
              name="name"
              required
            />
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-2">期間</h2>
          <div className=" text-xl tracking-wider flex">
            <label htmlFor="start">Start date：</label>
            <input type="date" id="start" name="trip-start" value="" />

            <div className="text-xl place-self-center px-2">～</div>
            <label htmlFor="start">End date：</label>
            <input type="date" id="start" name="trip-start" value="" />
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-2">時間</h2>
          <div className="text-xl tracking-wider">
            <select name="time" className="border border-black">
              <option value="0">0分</option>
              <option value="15">15分</option>
              <option value="30">30分</option>
              <option value="45">45分</option>
              <option value="1h">1時間</option>
              <option value="1h30">1時間30分</option>
              <option value="2h">2時間</option>
              <option value="2h30">2時間30分</option>
              <option value="3h">3時間</option>
              <option value="4h">4時間</option>
              <option value="5h">5時間</option>
            </select>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-2">参加者</h2>
          <div className=" text-xl tracking-wider flex gap-x-2">
            <div className=" bg-neutral-300 h-12 w-12 rounded-full "></div>
            <div className=" bg-neutral-300 h-12 w-12 rounded-full "></div>
            <div className=" bg-neutral-300 h-12 w-12 rounded-full "></div>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-2">候補日</h2>
          <div className=" bg-neutral-300 py-6 px-6 rounded-lg text-xl tracking-wider space-y-6">
            {/*候補日の背景*/}
            <button
              className=" block w-full bg-white py-2 px-8 rounded text-left"
              type="button"
            >
              候補日1 ○○/○○ ○○:○○~○○:○○
            </button>

            <button
              className=" block w-full bg-white py-2 px-8 rounded text-left"
              type="button"
            >
              候補日1 ○○/○○ ○○:○○~○○:○○
            </button>

            {/*buttonにすると普通のdivタグのときの余白にならない*/}
          </div>

          <button
            className="block bg-neutral-300 py-2 px-8 rounded place-self-center mx-auto mt-10"
            type="button"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Team;
