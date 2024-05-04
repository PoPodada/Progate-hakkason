import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { Meeting } from "../types";
import { MeetingsConverter, MeetingsDBName, TeamsDBName } from "./DBSchema";
import { updateTeamTimestamp } from "./Team";

/**
 * チームIDからミーティングのリストを取得
 * @param teamDid チームID
 * @returns types.tsのMeeting型の配列
 */
export const getTeamMeetingListFromTeamId = async (teamDid: string) => {
  const meetingRef = collection(
    db,
    TeamsDBName,
    teamDid,
    MeetingsDBName
  ).withConverter(MeetingsConverter);
  const querySnapshot = await getDocs(
    query(meetingRef, where("delFlag", "==", 0), orderBy("updatedAt", "desc"))
  );

  const meetings: Meeting[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    meetings.push({
      id: doc.id,
      name: data.name,
      time: data.time.toDate(),
      members: data.meetingMembers,
    });
  });

  return meetings;
};

/**
 * チームIDとミーティングIDからミーティング情報を取得
 * @param teamDid チームID
 * @param meetingId ミーティングID
 * @returns types.tsのMeeting型
 */
export const createMeeting = async (teamDid: string, meeting: Meeting) => {
  const meetingRef = collection(
    db,
    TeamsDBName,
    teamDid,
    MeetingsDBName
  ).withConverter(MeetingsConverter);

  await addDoc(meetingRef, {
    name: meeting.name,
    time: Timestamp.fromDate(meeting.time),
    meetingMembers: meeting.members,
  });
  await updateTeamTimestamp(teamDid);
};

/**
 * チームIDとミーティングIDからミーティング情報を取得
 * @param teamDid チームID
 * @param meetingId ミーティングID
 */
export const deleteMeeting = async (teamDid: string, meetingId: string) => {
  const meetingRef = collection(
    db,
    TeamsDBName,
    teamDid,
    MeetingsDBName
  ).withConverter(MeetingsConverter);
  const docRef = doc(meetingRef, meetingId);

  await updateDoc(docRef, {
    delFlag: 1,
  });
  await updateTeamTimestamp(teamDid);
};
