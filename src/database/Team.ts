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
 * @param did ユーザーのドキュメントid
 * @param size 取得する数
 * @returns types.tsのTeam型の配列
 */
export const getTeamListFromUid = async (
  did: string,
  size: number = 10
): Promise<Team[]> => {
  const querySnapshot = await getDocs(
    query(
      teamsRef,
      where("teamMembers", "array-contains", did),
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
  });

  return {
    id: result.id,
    name: teamName,
    members: [author.id],
  };
};

/**
 * チームを削除
 * @param teamDid チームID
 */
export const deleteTeam = async (teamDid: string) => {
  const teamRef = doc(teamsRef, teamDid);

  await updateDoc(teamRef, {
    delFlag: 1,
  });
};

/**
 * チームにメンバーを追加
 * @param teamDid チームID
 * @param user 追加するユーザー
 * @returns types.tsのTeam型 メンバー追加後のチーム情報
 * @throws チームが見つからない場合のエラー
 */
export const addTeamMember = async (
  teamDid: string,
  user: User
): Promise<Team> => {
  const teamRef = doc(teamsRef, teamDid);
  // データ取得後に変更があった場合に対応するため再度取得
  const team = await getTeamFromId(teamDid);

  if (!team) {
    throw new Error("Team not found");
  }

  await updateDoc(teamRef, {
    teamMembers: [...team.members, user.id],
  });

  return {
    id: teamDid,
    name: team.name,
    members: [...team.members, user.id],
  };
};

/**
 * チームのタイムスタンプを更新
 * @param teamDid チームID
 */
export const updateTeamTimestamp = async (teamDid: string) => {
  const teamRef = collection(db, TeamsDBName);
  const docRef = doc(teamRef, teamDid);

  await updateDoc(docRef, {
    updatedAt: serverTimestamp(),
  });
};
