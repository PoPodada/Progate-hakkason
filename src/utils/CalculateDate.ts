export type DateRange = {
  start: Date;
  end: Date;
};

export type TimeRange = {
  start: number;
  end: number;
};

export const AM: TimeRange = {
  start: 0,
  end: 12,
};

export const PM: TimeRange = {
  start: 13,
  end: 24,
};

export const calculateDate = (
  possibleDateRange: DateRange,
  practicableDateRanges: TimeRange,
  eventRanges: DateRange[],
  duration: number
): DateRange[] => {
  const aviailableDateRange: DateRange[] = [];
  let currentStart = possibleDateRange.start;

  // eventRangesをstartでソートする
  eventRanges.sort((a, b) => a.start.getTime() - b.start.getTime());

  eventRanges.forEach((eventRange) => {
    // 空き時間がある場合の追加処理
    // 後の時間 - 前の時間 - 30m がdurationより大きい場合は空き時間がある
    // 後の時間 - 前の時間 - 30m で空き時間
    while (
      convertToMinutes(eventRange.start.getTime() - currentStart.getTime()) -
        30 >=
      duration
    ) {
      const startTime = addMinutesToDate(currentStart, 15);
      const endTime = addMinutesToDate(startTime, duration);

      if (
        getMinutesFromDate(startTime) >= practicableDateRanges.start * 60 &&
        getMinutesFromDate(endTime) <= practicableDateRanges.end * 60
      ) {
        aviailableDateRange.push({ start: startTime, end: endTime });
      }

      currentStart = endTime;
    }

    currentStart = eventRange.end;
  });

  // 最後に残った時間帯を追加する
  while (
    convertToMinutes(possibleDateRange.end.getTime() - currentStart.getTime()) -
      30 >=
    duration
  ) {
    const startTime = addMinutesToDate(currentStart, 15);
    const endTime = addMinutesToDate(startTime, duration);

    if (
      getMinutesFromDate(startTime) >= practicableDateRanges.start * 60 &&
      getMinutesFromDate(endTime) <= practicableDateRanges.end * 60
    ) {
      aviailableDateRange.push({ start: startTime, end: endTime });
    }
    currentStart = endTime;
  }

  return aviailableDateRange;
};

function convertToMinutes(time: number): number {
  return time / (1000 * 60); // ミリ秒を分に変換
}

function addMinutesToDate(date: Date, minutes: number): Date {
  const newDate = new Date(date.getTime() + minutes * 60 * 1000);
  return newDate;
}

function getMinutesFromDate(date: Date): number {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return hours * 60 + minutes;
}
