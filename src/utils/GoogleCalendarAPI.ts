import { AuthContextType } from "./AuthContext";

// イベントの型
export type Event = {
  start: Time;
  end: Time;
};

// 時間の型
export type Time = {
  dateTime: string;
  timeZone: string;
};

/**
 * Google Calendarのイベントを取得する
 * @param accessToken アクセストークン
 * @returns イベントの配列
 */
export const getCalendarEvents = async (
  accessToken: string
): Promise<Event[] | null> => {
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
      return null;
    }
  } catch (error) {
    return null;
  }
};

/**
 * 強制的にGoogle Calendarのイベントを取得する
 * 仕組み: 再ログインさせることで、アクセストークンを更新する
 * そして、そのアクセストークンを使ってイベントを取得する
 * @param auth AuthContextType
 */
export const forceGetCalendarEvents = (auth: AuthContextType) => {
  auth.login();
};
