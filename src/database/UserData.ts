import {
  collection,
  CollectionReference,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Users } from "./Schema";

const users = collection(db, "users").withConverter<Users>(;

export const getOrCreateUser = async (uid: string) => {
  const docRef = doc(users, uid);
  const userData = await getDoc(docRef);

  if (userData.exists()) {
    return userData.data();
  }
};
