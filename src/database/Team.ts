import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { TeamsConverter, TeamsDBName } from "./DBSchema";
import { Team, User } from "../types";

const teamsRef = collection(db, TeamsDBName).withConverter(TeamsConverter);

/**
 * ユーザーのuidから所属しているチームのリストを取得
 * @param uid ユーザーのドキュメントid
 * @param size 取得する数
 * @returns types.tsのTeam型の配列
 */
export const getTeamListFromUid = async (
  uid: string,
  size: number = 10
): Promise<Team[]> => {
  const querySnapshot = await getDocs(
    query(
      teamsRef,
      where("teamMembers", "array-contains", uid),
      where("delFlag", "==", 1),
      limit(size),
      orderBy("updatedAt", "desc")
    )
  );

  const teamList: Team[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    teamList.push({
      id: doc.id,
      name: data.name,
      members: data.teamMembers,
    });
  });

  return teamList;
};

/**
 * チームIDからチーム情報を取得
 * @param teamId チームID
 * @returns types.tsのTeam型
 */
export const getTeamFromId = async (teamId: string): Promise<Team | null> => {
  const docRef = doc(teamsRef, teamId);
  const result = await getDoc(docRef);

  if (!result.exists()) {
    return null;
  }

  if (result.data().delFlag === 1) {
    return null;
  }

  const returnTeam: Team = {
    id: result.id,
    name: result.data().name,
    members: result.data().teamMembers,
  };

  return returnTeam;
};

/**
 * チームを作成
 * @param teamName チーム名
 * @param author 作成者
 * @returns types.tsのTeam型
 */
export const createTeam = async (
  teamName: string,
  author: User
): Promise<Team> => {
  const result = await addDoc(teamsRef, {
    name: teamName,
    teamMembers: [author.id],
    createdAt: serverTimestamp(),
  });

  return {
    id: result.id,
    name: teamName,
    members: [author.id],
  };
};

/**
 * チームを削除
 * @param teamId チームID
 */
export const deleteTeam = async (teamId: string) => {
  const teamRef = doc(teamsRef, teamId);

  await updateDoc(teamRef, {
    delFlag: 1,
  });
};

/**
 * チームにメンバーを追加
 * @param teamId チームID
 * @param user 追加するユーザー
 * @returns types.tsのTeam型 メンバー追加後のチーム情報
 * @throws チームが見つからない場合のエラー
 */
export const addTeamMember = async (
  teamId: string,
  user: User
): Promise<Team> => {
  const teamRef = doc(teamsRef, teamId);
  // データ取得後に変更があった場合に対応するため再度取得
  const team = await getTeamFromId(teamId);

  if (!team) {
    throw new Error("Team not found");
  }

  await updateDoc(teamRef, {
    teamMembers: [...team.members, user.id],
  });

  return {
    id: teamId,
    name: team.name,
    members: [...team.members, user.id],
  };
};

/**
 * チームのタイムスタンプを更新
 * @param teamId チームID
 */
export const updateTeamTimestamp = async (teamId: string) => {
  const teamRef = collection(db, TeamsDBName);
  const docRef = doc(teamRef, teamId);

  await updateDoc(docRef, {
    updatedAt: serverTimestamp(),
  });
};
