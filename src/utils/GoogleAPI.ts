export const getCalendarEvents = async (
  accessToken: string,
  timeMin: Date,
  timeMax: Date
) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
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
      return data.items;
    } else {
      throw new Error("Failed to fetch calendar events");
    }
  } catch (error) {
    console.error(error);
  }
};
