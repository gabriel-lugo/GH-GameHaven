import { User, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";

export interface GameData {
  id: any;
  name: string;
  cover: string;
  rating: number;
  total_rating: number;
  userId?: string;
  screenshots?: Array<{ url: string }>;
  summary: string;
  artworks?: string[];
  release_dates?: Array<{ date: string }>;
}

interface Props {
  children: React.ReactNode;
}

interface FavoritesContextValue {
  favorites: GameData[];
  addFavorite: (favorite: GameData) => void;
  removeFavorite: (favorite: GameData) => void;
}

export const FavoritesContext = createContext<FavoritesContextValue>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

export const FavoritesProvider = ({ children }: Props) => {
  const [favorites, setFavorites] = useState<GameData[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const addFavorite = async (gameData: GameData) => {
    if (!currentUser) {
      console.error("No user logged in");
      return;
    }

    try {
      const userRef = doc(db, "users", currentUser.uid);
      const userSnapshot = await getDoc(userRef);
      const userData = userSnapshot.data();

      if (userData) {
        const updatedFavorites = [...userData.favorites, gameData];

        await setDoc(userRef, {
          ...userData,
          favorites: updatedFavorites,
        });

        setFavorites(updatedFavorites);
      }
    } catch (error) {
      console.error("Error adding favorite to Firestore: ", error);
    }
  };

  const removeFavorite = async (favorite: GameData) => {
    if (!currentUser || !favorite.userId || !favorite.id) {
      console.error("Favorite data is incomplete");
      return;
    }

    try {
      const userRef = doc(db, "users", currentUser.uid);
      const userSnapshot = await getDoc(userRef);
      const userData = userSnapshot.data();

      if (userData) {
        const updatedFavorites = userData.favorites.filter(
          (b: any) => b.id !== favorite.id
        );

        await setDoc(userRef, {
          ...userData,
          favorites: updatedFavorites,
        });

        setFavorites(updatedFavorites);
      }
    } catch (error) {
      console.error("Error removing favorite from Firestore: ", error);
    }
  };

  const fetchFavorites = async (userId: string) => {
    if (!userId) return;

    try {
      const userRef = doc(db, "users", userId);
      const userSnapshot = await getDoc(userRef);
      const userData = userSnapshot.data();

      if (userData) {
        const fetchedFavorites = userData.favorites || [];
        setFavorites(fetchedFavorites);
      }
    } catch (error) {
      console.error("Error fetching favorites: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchFavorites(user.uid);
      } else {
        setFavorites([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
