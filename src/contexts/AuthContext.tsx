import firebase from 'firebase/app';
import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { auth } from '~/services/firebase';

export interface User {
  id: string;
  name: string | null;
  photoURL: string | null;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<User>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextValue);

const AuthContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signInWithGoogle = useCallback(async () => {
    setIsLoading(true);

    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(googleAuthProvider);

    if (!result.user) {
      throw new Error('Could not sign in with Google.');
    }

    const { uid, displayName, photoURL } = result.user;

    const signedInUser: User = {
      id: uid,
      name: displayName,
      photoURL,
    };
    setUser(signedInUser);
    setIsLoading(false);

    return signedInUser;
  }, []);

  const signOut = useCallback(async () => {
    await auth.signOut();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        setIsLoading(false);
        return;
      }

      const { uid, displayName, photoURL } = currentUser;
      setUser({
        id: uid,
        name: displayName,
        photoURL,
      });
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, signInWithGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}

export default AuthContextProvider;
