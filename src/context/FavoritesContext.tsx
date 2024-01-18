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

interface BookmarksContextValue {
  bookmarks: GameData[];
  addBookmark: (bookmark: GameData) => void;
  removeBookmark: (bookmark: GameData) => void;
}

export const BookmarkContext = createContext<BookmarksContextValue>({
  bookmarks: [],
  addBookmark: () => {},
  removeBookmark: () => {},
});

export const BookmarkProvider = ({ children }: Props) => {
  const [bookmarks, setBookmarks] = useState<GameData[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const addBookmark = async (gameData: GameData) => {
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

        setBookmarks(updatedFavorites);
      }
    } catch (error) {
      console.error("Error adding bookmark to Firestore: ", error);
    }
  };

  const removeBookmark = async (bookmark: GameData) => {
    if (!currentUser || !bookmark.userId || !bookmark.id) {
      console.error("Bookmark data is incomplete");
      return;
    }

    try {
      const userRef = doc(db, "users", currentUser.uid);
      const userSnapshot = await getDoc(userRef);
      const userData = userSnapshot.data();

      if (userData) {
        const updatedFavorites = userData.favorites.filter(
          (b: any) => b.id !== bookmark.id
        );

        await setDoc(userRef, {
          ...userData,
          favorites: updatedFavorites,
        });

        setBookmarks(updatedFavorites);
      }
    } catch (error) {
      console.error("Error removing bookmark from Firestore: ", error);
    }
  };

  const fetchBookmarks = async (userId: string) => {
    if (!userId) return;

    try {
      const userRef = doc(db, "users", userId);
      const userSnapshot = await getDoc(userRef);
      const userData = userSnapshot.data();

      if (userData) {
        const fetchedBookmarks = userData.favorites || [];
        setBookmarks(fetchedBookmarks);
        console.log("success");
      }
    } catch (error) {
      console.error("Error fetching bookmarks: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchBookmarks(user.uid);
      } else {
        setBookmarks([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};
