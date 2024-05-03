import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { UsersConverter, UsersDBName } from "./DBSchema";
import { User as UserImpl } from "firebase/auth";
import { User } from "../types";

// usersコレクションの参照を作成
const usersRef = collection(db, UsersDBName).withConverter(UsersConverter);

/**
 * Userの情報を取得し、存在しない場合は新規作成する
 * @param user Authのユーザー情報
 * @returns types.tsのUser型
 */
export const getOrCreateUser = async (user: UserImpl): Promise<User | null> => {
  const querySnapshot = await getDocs(
    query(
      usersRef,
      where("userId", "==", user.uid),
      where("delFlag", "==", false),
      limit(1)
    )
  );

  // ユーザーが存在する場合はそのデータを返す
  if (querySnapshot.size > 0) {
    const result = querySnapshot.docs[0];
    const returnUser: User = {
      id: result.id,
      userId: result.data().userId,
      name: result.data().name,
      iconUrl: result.data().iconUrl,
    };

    return returnUser;
  }

  // ユーザーが存在しない場合は新規作成
  const docRef = await addDoc(usersRef, {
    userId: user.uid,
    name: user.displayName ?? "",
    iconUrl: user.photoURL ?? "",
  });
  // addした際に自動で生成される値があるので、取得を行う.
  const result = await getDoc(docRef);

  const returnUser: User = {
    id: result.id,
    userId: result.data()!.userId,
    name: result.data()!.name,
    iconUrl: result.data()!.iconUrl,
  };

  return returnUser;
};

/**
 * uidからUser情報を取得する
 * 存在しない場合はidが-1のユーザーを返す
 * @param uid ユーザーのuid
 * @returns types.tsのUser型
 */
export const getUserFromUid = async (uid: string): Promise<User> => {
  const querySnapshot = await getDocs(
    query(
      usersRef,
      where("userId", "==", uid),
      where("delFlag", "==", false),
      limit(1)
    )
  );

  // ユーザーが存在する場合はそのデータを返す
  if (querySnapshot.size > 0) {
    const result = querySnapshot.docs[0];
    const returnUser: User = {
      id: result.id,
      userId: result.data().userId,
      name: result.data().name,
      iconUrl: result.data().iconUrl,
    };

    return returnUser;
  }

  // 存在しない場合
  const returnUser: User = {
    id: "-1",
    userId: "-1",
    name: "存在しないユーザー",
    iconUrl: "",
  };
  return returnUser;
};
