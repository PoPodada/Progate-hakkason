import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
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
 * @param teamDid チームDocumentID
 * @returns types.tsのMeeting型の配列
 */
export const getTeamMeetingListFromTeamId = async (
  teamDid: string
): Promise<Meeting[]> => {
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
      time: data.time.toDate().toLocaleString(),
      members: data.meetingMembers,
    });
  });

  return meetings;
};

/**
 * チームIDとミーティングIDからミーティング情報を取得
 * @param teamDid チームDocumentID
 * @param meetingId ミーティングDocumentID
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
    time: Timestamp.fromDate(new Date(meeting.time)),
    meetingMembers: meeting.members,
    createdAt: serverTimestamp(),
  });
  await updateTeamTimestamp(teamDid);
};

/**
 * チームIDとミーティングIDからミーティング情報を取得
 * @param teamId チームID
 * @param meetingId ミーティングID
 */
export const deleteMeeting = async (teamId: string, meetingId: string) => {
  const meetingRef = collection(
    db,
    TeamsDBName,
    teamId,
    MeetingsDBName
  ).withConverter(MeetingsConverter);
  const docRef = doc(meetingRef, meetingId);

  await updateDoc(docRef, {
    delFlag: 1,
  });
  await updateTeamTimestamp(teamId);
};
