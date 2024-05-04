export type Event = {
  start: Time;
  end: Time;
};

export type Time = {
  dateTime: string;
  timeZone: string;
};

export const getCalendarEvents = async (
  accessToken: string
): Promise<Event[]> => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${new Date(
        Date.now()
      ).toISOString()}`,
      // ↓時間指定した場合のURL
      //`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin.toISOString()}&timeMax=${timeMax.toISOString()}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      const events = data.items as Event[];

      // 必要な情報だけを取り出す
      const normalizedEvents = [];
      for (const event of events) {
        normalizedEvents.push({
          start: event.start,
          end: event.end,
        });
      }

      return normalizedEvents;
    } else {
      throw new Error("Failed to fetch calendar events");
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};
