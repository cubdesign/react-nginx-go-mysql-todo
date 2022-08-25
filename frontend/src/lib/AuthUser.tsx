import { Auth, getAuth, User as AuthUser } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

export type AuthUserContextType = {
  authUser: AuthUser | null;
  login: (user: AuthUser, callback: () => void) => void;
  logout: (callback: () => void) => void;
};

const AuthUserContext = createContext<AuthUserContextType>(
  {} as AuthUserContextType
);

export const useAuthUserContext = (): AuthUserContextType => {
  return useContext<AuthUserContextType>(AuthUserContext);
};

type AuthUserProviderProps = {
  children: React.ReactNode;
};

const AuthUserProvider: React.FC<AuthUserProviderProps> = ({ children }) => {
  const auth: Auth = getAuth();
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [initialize, setInitialize] = useState<boolean>(false);

  const router = useRouter();
  console.log(router.pathname);

  // TODO ここログインチェック　＆　リダイレクト
  // ログインしていなくても表示するページ
  // /login /register

  // ログインしていたら、トップページにリダイレクトするページ
  // /login /register

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((authUser) => {
      console.log("onAuthStateChanged", authUser);
      setInitialize(true);
      setAuthUser(authUser);
    });
    return () => {
      // cleanup
      unSubscribe();
    };
  }, []);

  const login = (authUser: AuthUser, callback: () => void) => {
    setAuthUser(authUser);
    callback();
  };

  const logout = (callback: () => void) => {
    setAuthUser(null);
    callback();
  };

  const value: AuthUserContextType = {
    authUser,
    login,
    logout,
  };

  return (
    <AuthUserContext.Provider value={value}>
      {initialize && children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserProvider;
