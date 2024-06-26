import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
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
export const getOrCreateUser = async (
  user: UserImpl,
  accsessToken: string
): Promise<User | null> => {
  const querySnapshot = await getDocs(
    query(
      usersRef,
      where("userId", "==", user.uid),
      where("delFlag", "==", 0),
      limit(1)
    )
  );

  // ユーザーが存在する場合はそのデータを返す
  if (querySnapshot.size > 0) {
    const result = querySnapshot.docs[0];

    const e = result
      .data()
      .events.replace(/\\n/g, "\\n")
      .replace(/\\'/g, "\\'")
      .replace(/\\"/g, '\\"')
      .replace(/\\&/g, "\\&")
      .replace(/\\r/g, "\\r")
      .replace(/\\t/g, "\\t")
      .replace(/\\b/g, "\\b")
      .replace(/\\f/g, "\\f");

    const returnUser: User = {
      id: result.id,
      userId: result.data().userId,
      name: result.data().name,
      iconUrl: result.data().iconUrl,
      accessToken: result.data().accsessToken,
      events: JSON.parse(e),
    };

    return returnUser;
  }

  // ユーザーが存在しない場合は新規作成
  const docRef = await addDoc(usersRef, {
    userId: user.uid,
    name: user.displayName ?? "",
    iconUrl: user.photoURL ?? "",
    accsessToken: accsessToken,
    events: "",
    createdAt: serverTimestamp(),
  });

  const returnUser: User = {
    id: docRef.id,
    userId: user.uid,
    name: user.displayName ?? "",
    iconUrl: user.photoURL ?? "",
    accessToken: accsessToken,
    events: [],
  };
  return returnUser;
};

/**
 * Userの情報を取得し、存在しない場合は新規作成する
 * また情報の更新も行う
 * @param user Authのユーザー情報
 * @returns types.tsのUser型
 */
export const updateOrCreateUser = async (
  user: UserImpl,
  accsessToken: string,
  events: string
): Promise<User> => {
  const querySnapshot = await getDocs(
    query(
      usersRef,
      where("userId", "==", user.uid),
      where("delFlag", "==", 0),
      limit(1)
    )
  );

  // ユーザーが存在する場合はそのデータを返す
  if (querySnapshot.size > 0) {
    // 更新処理
    const docRef = querySnapshot.docs[0].ref;
    await setDoc(
      docRef,
      {
        accsessToken: accsessToken,
        events: events,
      },
      { merge: true }
    );

    // 返却処理
    const result = querySnapshot.docs[0];
    const returnUser: User = {
      id: result.id,
      userId: result.data().userId,
      name: result.data().name,
      iconUrl: result.data().iconUrl,
      accessToken: result.data().accsessToken,
      events: JSON.parse(result.data().events),
    };

    return returnUser;
  }

  // ユーザーが存在しない場合は新規作成
  const docRef = await addDoc(usersRef, {
    userId: user.uid,
    name: user.displayName ?? "",
    iconUrl: user.photoURL ?? "",
    accsessToken: accsessToken,
    events: "",
    createdAt: serverTimestamp(),
  });

  const returnUser: User = {
    id: docRef.id,
    userId: user.uid,
    name: user.displayName ?? "",
    iconUrl: user.photoURL ?? "",
    accessToken: accsessToken,
    events: [],
  };
  return returnUser;
};

/**
 * カレンダー情報を更新する
 * @param did ユーザーの
 * @param events カレンダー情報
 */
export const updateCalendar = async (did: string, events: string[]) => {
  const querySnapshot = await getDocs(
    query(
      usersRef,
      where("userId", "==", did),
      where("delFlag", "==", 0),
      limit(1)
    )
  );

  // ユーザーが存在する場合はそのデータを返す
  if (querySnapshot.size > 0) {
    // 更新処理
    const docRef = querySnapshot.docs[0].ref;
    await updateDoc(docRef, {
      events: events,
    });
  }
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
      where("delFlag", "==", 0),
      limit(1)
    )
  );

  // ユーザーが存在する場合はそのデータを返す
  if (querySnapshot.size > 0) {
    const result = querySnapshot.docs[0];
    const e = result
      .data()
      .events.replace(/\\n/g, "\\n")
      .replace(/\\'/g, "\\'")
      .replace(/\\"/g, '\\"')
      .replace(/\\&/g, "\\&")
      .replace(/\\r/g, "\\r")
      .replace(/\\t/g, "\\t")
      .replace(/\\b/g, "\\b")
      .replace(/\\f/g, "\\f");
    console.log(e);

    const returnUser: User = {
      id: result.id,
      userId: result.data().userId,
      name: result.data().name,
      iconUrl: result.data().iconUrl,
      accessToken: result.data().accsessToken,
      events: JSON.parse(e || "null"),
    };

    return returnUser;
  }

  // 存在しない場合
  const returnUser: User = {
    id: "-1",
    userId: "-1",
    name: "存在しないユーザー",
    iconUrl: "",
    accessToken: "",
    events: [],
  };
  return returnUser;
};

/**
 * documentIdからUser情報を取得する
 * 存在しない場合はidが-1のユーザーを返す
 * @param documentId ユーザーのdocumentId
 * @returns types.tsのUser型
 */
export const getuserFromUserDocumentId = async (
  documentId: string
): Promise<User> => {
  const docRef = doc(usersRef, documentId);
  const docSnapshot = await getDoc(docRef);

  // ユーザーが存在する場合はそのデータを返す
  if (docSnapshot.exists()) {
    const data = docSnapshot.data();
    const returnUser: User = {
      id: docSnapshot.id,
      userId: data.userId,
      name: data.name,
      iconUrl: data.iconUrl,
      accessToken: data.accsessToken,
      events: JSON.parse(data.events),
    };

    return returnUser;
  }

  // 存在しない場合
  const returnUser: User = {
    id: "-1",
    userId: "-1",
    name: "存在しないユーザー",
    iconUrl: "",
    accessToken: "",
    events: [],
  };
  return returnUser;
};
