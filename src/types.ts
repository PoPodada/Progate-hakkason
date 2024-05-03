export interface User {
  id: string; // ドキュメントID
  userId: string; // アカウントのuid
  name: string;
  iconUrl: string;
}

export interface Team {
  id: string;
  name: string;
  members: string[]; // uid[]
}

export interface Meeting {
  id: string;
  name: string;
  time: Date;
  members: string[]; // uid[]
}
