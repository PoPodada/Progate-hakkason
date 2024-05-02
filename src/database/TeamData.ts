import { collection } from "firebase/firestore";
import { db } from "../firebase";

const teams = collection(db, "teams");

export const getTeamsFromUserUid = async (uid: string) => {};
