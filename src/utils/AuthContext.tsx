import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, User as UserImpl } from "firebase/auth";
import { getUserFromUid, updateOrCreateUser } from "../database/User";
import { GoogleAuthProvider } from "firebase/auth/cordova";
import { getCalendarEvents } from "./GoogleCalendarAPI";
import { User as DocumentUser } from "../types";

// Contextの処理
export type AuthContextType = {
  user: UserImpl | null;
  cachedDuser: DocumentUser | null; // document の User
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  cachedDuser: null,
  login: () => {},
  logout: () => {},
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

// ContextのProviderの作成
type Props = {
  children: ReactNode;
};

export const AuthContextProvider: React.FC<Props> = (props: Props) => {
  const [userImpl, setUserImpl] = useState<UserImpl | null>(null);
  const [cachedDuser, setCachedDuser] = useState<DocumentUser | null>(null); // [追加

  // Authの状態を監視
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserImpl(user);

      (async () => {
        if (user !== null) {
          user.getIdTokenResult().then((idTokenResult) => {
            console.log(idTokenResult.claims, "claims");
          });
          // ユーザー情報を取得
          let userDocument = await getUserFromUid(user.uid);

          // トークンが取得できた場合はカレンダー情報を取得
          if (userDocument !== null) {
            const events = await getCalendarEvents(userDocument.accessToken);

            if (events !== null) {
              userDocument = await updateOrCreateUser(
                user,
                userDocument.accessToken,
                JSON.stringify(events)
              );
              console.log(events, "events");
            }
          }

          setCachedDuser(userDocument);
        }
      })();
    });

    return () => unsubscribe();
  }, []);

  // login, logoutの処理
  const login = async () => {
    const result = await signInWithPopup(auth, provider);

    const credintial = GoogleAuthProvider.credentialFromResult(result);

    // アクセストークンが取得できた場合はカレンダー情報を取得
    // その後ユーザー情報を更新
    if (credintial?.accessToken !== undefined) {
      const data = (await getCalendarEvents(credintial.accessToken)) ?? [];

      const documentUser = await updateOrCreateUser(
        result.user,
        credintial.accessToken,
        JSON.stringify(data)
      );
      setCachedDuser(documentUser);
    }
  };

  const logout = async () => {
    await auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user: userImpl,
        cachedDuser: cachedDuser,
        login: login,
        logout: logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
