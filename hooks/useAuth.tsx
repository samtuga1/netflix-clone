import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../firebase";
import toast from "react-hot-toast";

interface IAuth {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<IAuth>({
  user: null,
  loading: false,
  signIn: async () => {},
  signUp: async () => {},
  error: null,
  logout: async () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in...
          setUser(user);
          setLoading(false);
        } else {
          // Not logged in...
          setUser(null);
          setLoading(true);
          router.push("/login");
        }
        setInitialLoading(false);
      }),
    [auth]
  );

  const signUp = async (email: string, password: string) => {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        setUser(userCredentials.user);
        router.push("/");
      })
      .catch((error) => {
        let message = "An error occured";
        if (error.code == "auth/email-already-in-use") {
          message = "Email address already in use";
        } else if (error.code == "auth/invalid-email") {
          message = "Invalid email address";
        } else if (error.code == "auth/weak-password") {
          message = "Weak password";
        }
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        setUser(userCredentials.user);
        router.push("/");
      })
      .catch((error) => {
        console.log(error.code);
        let message = "An error occured";
        if (error.code == "auth/invalid-login-credentials") {
          message = "Invalid login credentials";
        } else if (error.code == "auth/invalid-email") {
          message = "Invalid email address";
        }
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = async () => {
    setLoading(true);
    await signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const memoedValue = useMemo<IAuth>(
    () => ({
      user,
      loading,
      signIn,
      signUp,
      error,
      logout,
    }),
    [loading, user]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
