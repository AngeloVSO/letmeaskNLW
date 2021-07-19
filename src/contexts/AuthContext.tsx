import { createContext, useState, ReactNode, useEffect } from "react";
import { auth, firebase } from "../services/firebase";

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
};

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = (props:AuthContextProviderProps) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        const { displayName, uid, photoURL } = user

        if(!displayName || !photoURL) {
          throw new Error("Informações incompletas da sua conta Google.")
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    const res = await auth.signInWithPopup(provider);

    if (res.user) {
      const { displayName, photoURL, uid } = res.user;

      if (!displayName || !photoURL) {
        throw new Error("Informações incompletas da sua conta Google.");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
        {props.children}
    </AuthContext.Provider>
  );
};
