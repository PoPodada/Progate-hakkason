import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, provider } from "../firebase";
import {
  signInWithCustomToken,
  signInWithPopup,
  signInWithRedirect,
  User,
} from "firebase/auth";
import { updateOrCreateUser } from "../database/User";
import {
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth/cordova";
import { getCalendarEvents } from "./GoogleAPI";

// Contextの処理
export type AuthContextType = {
  user: User | null;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
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
  const [user, setUser] = useState<User | null>(null);

  // Authの状態を監視
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  // login, logoutの処理
  const login = async () => {
    signInWithRedirect;
    const result = await signInWithPopup(auth, provider);

    const credintial = GoogleAuthProvider.credentialFromResult(result);

    if (credintial?.accessToken !== undefined) {
      updateOrCreateUser(result.user, credintial.accessToken);
      console.log(credintial);

      const date = new Date(2024, 4, 1, 0, 0, 0);

      console.log(credintial.accessToken);
      const events = await getCalendarEvents(
        credintial.accessToken,
        new Date(2024, 5, 1, 0, 0, 0),
        new Date(2024, 6, 1, 0, 0, 0)
      );
      console.log(events);
    }
  };

  const logout = async () => {
    await auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        login: login,
        logout: logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
