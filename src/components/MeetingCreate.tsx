import React, { useState } from "react";

enum Time {
  "0h" = 0,
  "0h15" = 15,
  "0h30" = 30,
  "0h45" = 45,
  "1h" = 60,
  "1h30" = 90,
  "2h" = 120,
  "2h30" = 150,
  "3h" = 180,
  "4h" = 240,
  "5h" = 300,
}

type MeetingCreateProps = {};

const Team: React.FC = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState<number>(0);

  ////// コンポーネントに使う関数を定義 //////
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const startDateTime = new Date(e.target.value);
    // if (endDate == "" && startDateTime.getTime() > new Date().getTime()) {
    //   alert("開始日時は終了日時より前に設定してください");
    //   return;
    // }
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (startDateTime < now) {
      alert("開始日時は現在時刻より後に設定してください");
      return;
    }

    setStartDate(e.target.value);

    runCalculateDate();
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const endDateTime = new Date(e.target.value);
    // if (
    //   startDate == "" &&
    //   endDateTime.getTime() < new Date(startDate).getTime()
    // ) {
    //   alert("終了日時は開始日時より後に設定してください");
    //   return;
    // }
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (endDateTime < new Date()) {
      alert("終了日時は現在時刻より後に設定してください");
      return;
    }

    setEndDate(e.target.value);

    runCalculateDate();
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setDuration(parseInt(e.target.value));

    runCalculateDate();
  };

  ////// 処理を実行する関数を定義 //////
  const runCalculateDate = async () => {
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);
  };

  return (
    <div>
      <div className="mx-auto mt-10  px-16 py-8 bg-neutral-100 shadow-lg border-t-8 border-neutral-500">
        <div className="max-w-[900px] mx-auto mt-10 mb-20">
          <h2 className="text-2xl font-bold">会議名</h2>
          <div className="py-2 text-xl tracking-wider">
            <input
              className=" p-1"
              type="text"
              id="name"
              name="name"
              required
            />
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-2">期間</h2>
          <div className=" text-xl tracking-wider flex">
            <label htmlFor="start">Start date：</label>
            <input
              type="date"
              id="start"
              name="trip-start"
              value={startDate}
              onChange={handleStartDateChange}
            />

            <div className="text-xl place-self-center px-2">～</div>
            <label htmlFor="start">End date：</label>
            <input
              type="date"
              id="end"
              name="trip-end"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-2">時間</h2>
          <div className="text-xl tracking-wider ">
            <select
              name="time"
              className="border border-neutral-800"
              onChange={handleSelectChange}
            >
              <option value={Time["0h"]}>0分</option>
              <option value={Time["0h15"]}>15分</option>
              <option value={Time["0h30"]}>30分</option>
              <option value={Time["0h45"]}>45分</option>
              <option value={Time["1h"]}>1時間</option>
              <option value={Time["1h30"]}>1時間30分</option>
              <option value={Time["2h"]}>2時間</option>
              <option value={Time["2h30"]}>2時間30分</option>
              <option value={Time["3h"]}>3時間</option>
              <option value={Time["4h"]}>4時間</option>
              <option value={Time["5h"]}>5時間</option>
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

            <label className="block w-full relative py-2 px-8 rounded text-xl bg-white has-[:checked]:bg-sky-600 has-[:checked]:text-white cursor-pointe has-[:checked]:shadow-inner has-[:checked]:font-semibold">
              <input
                className="opacity-0 absolute left-0"
                type="radio"
                id="Date1"
                name="schedule"
                value="AA/AA AA:AA~AA:AA"
              />
              候補日1 ○○/○○ ○○:○○~○○:○○
            </label>

            <label className="block w-full relative py-2 px-8 rounded text-xl bg-white has-[:checked]:bg-sky-600 has-[:checked]:text-white cursor-pointe has-[:checked]:shadow-inner has-[:checked]:font-semibold">
              <input
                className="opacity-0 absolute left-0"
                type="radio"
                id="Date1"
                name="schedule"
                value="AA/AA AA:AA~AA:AA"
              />
              候補日2 ○○/○○ ○○:○○~○○:○○
            </label>
          </div>

          <button
            className="block relative opacity-50 bg-neutral-300 py-2 px-8 rounded place-self-center mx-auto mt-10 hover:opacity-100"
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
