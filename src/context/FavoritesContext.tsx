import { User, onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
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
      await addDoc(collection(db, "favorites"), {
        ...gameData,
        userId: currentUser.uid,
      });
      setBookmarks([...bookmarks, gameData]);
    } catch (error) {
      console.error("Error adding bookmark to Firestore: ", error);
    }
  };

  const removeBookmark = async (bookmark: GameData) => {
    if (!bookmark.userId || !bookmark.id) {
      console.error("Bookmark data is incomplete");
      return;
    }

    try {
      const q = query(
        collection(db, "favorites"),
        where("userId", "==", bookmark.userId),
        where("id", "==", bookmark.id)
      );
      const querySnapshot = await getDocs(q);
      console.log("Documents found for removal:", querySnapshot.docs.length);

      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
      setBookmarks(bookmarks.filter((b) => b.id !== bookmark.id));
    } catch (error) {
      console.error("Error removing bookmark from Firestore: ", error);
    }
  };

  const fetchBookmarks = async (userId: string) => {
    if (!userId) return;

    try {
      const q = query(
        collection(db, "favorites"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      const fetchedBookmarks = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as GameData),
        firestoreId: doc.id,
      }));
      setBookmarks(fetchedBookmarks);
      console.log("success");
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
