import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, User } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/cordova";

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

export const AuthContextProvider = (props: Props) => {
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
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
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
