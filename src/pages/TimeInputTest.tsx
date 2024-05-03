import React, { useState } from "react";

const TimeInput = () => {
  const [time, setTime] = useState("00:00");

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  return (
    <div>
      <input
        type="time"
        value={time}
        onChange={handleTimeChange}
        step={1500}
        min="00:00"
        max="23:59"
      />
      <p>入力された時間: {time}</p>
    </div>
  );
};

export default TimeInput;
