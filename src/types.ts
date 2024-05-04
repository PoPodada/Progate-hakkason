export interface User {
  id: string; // ドキュメントID
  userId: string; // アカウントのuid
  name: string;
  iconUrl: string;
  accessToken: string;
  events: Event[];
}

export interface Team {
  id: string; // ドキュメントID
  name: string;
  members: string[]; // ドキュメントID[]
}

export interface Meeting {
  id: string; // ドキュメントID
  name: string;
  time: Date;
  members: string[]; // ドキュメントID[]
}
