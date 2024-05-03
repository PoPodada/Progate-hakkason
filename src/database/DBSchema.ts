import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  FieldValue,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  serverTimestamp,
  Timestamp,
  WithFieldValue,
} from "firebase/firestore";

// 各スキーマのバージョン
const userSchemaVer = 1;
const teamSchemaVer = 1;

// Schema
type DefaultDBSchema = {
  id: string;
  createdAt?: FieldValue;
  updatedAt?: FieldValue;
  delFlag?: boolean;
  schemaVer?: number;
};

type UsersDBSchema = DefaultDBSchema & {
  name: string;
  iconUrl: string;
};

type TeamsDBSchema = DefaultDBSchema & {
  id: string;
  debug: string;
  name: string;
  // メモ: DocumentReferenceだとcollectionの名前変更に対して耐性がないので、stringにuidを入れる
  teamMembers: string[]; // uid[]
};

type MeetingsDBSchema = DefaultDBSchema & {
  time: Timestamp;
  meetingMembers: DocumentReference<UsersDBSchema>[];
};

// Converter
// 各コンバーターの共通処理をまとめる
// この関数を使うことで、createdAt, updatedAt, delFlag, schemaVerのデフォルト値を設定できる
const converter = <T extends DefaultDBSchema>(
  converterFunction: FirestoreDataConverter<T>
): FirestoreDataConverter<T> => ({
  toFirestore: function (data: T): WithFieldValue<DocumentData> {
    if (data.createdAt === undefined) data.createdAt = serverTimestamp();
    data.updatedAt = serverTimestamp();
    data.delFlag = data.delFlag ?? false;

    return converterFunction.toFirestore(data);
  },
  fromFirestore: function (snapshot: QueryDocumentSnapshot<T>): T {
    return converterFunction.fromFirestore(snapshot);
  },
});

// 各スキーマのコンバーター
// User
export const UsersConverter = converter<UsersDBSchema>({
  toFirestore: function (data: UsersDBSchema): WithFieldValue<DocumentData> {
    if (data.schemaVer === undefined) data.schemaVer = userSchemaVer;

    return data;
  },
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot<UsersDBSchema>
  ): UsersDBSchema {
    return snapshot.data();
  },
});
// Teams
export const TeamsConverter = converter<TeamsDBSchema>({
  toFirestore: function (data: TeamsDBSchema): WithFieldValue<DocumentData> {
    if (data.schemaVer === undefined) data.schemaVer = teamSchemaVer;

    return data;
  },
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot<TeamsDBSchema>
  ): TeamsDBSchema {
    return snapshot.data();
  },
});
