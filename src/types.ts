export interface User {
  id: string; // ドキュメントID
  userId: string; // アカウントのuid
  name: string;
  iconUrl: string;
}

export interface Team {
  id: string;
  name: string;
  teamMembers: string[]; // uid[]
}

export interface Meeting {
  id: string;
  time: Date;
  meetingMembers: string[]; // uid[]
}
