import { showNotification } from "@mantine/notifications";
import { useContext, useEffect, useState } from "react";
import { MdOutlineError } from "react-icons/md";
import { FavoritesContext, GameData } from "../context/FavoritesContext";
import { auth } from "../firebase";
import { GameDetails } from "./GameUtils";

export function useFavorites(gameDetails: GameDetails | null) {
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoritesContext);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setUserId(user ? user.uid : "");
    });
    return () => unsubscribe();
  }, []);

  const isFavorited = favorites.some(
    (favorite) => favorite.id === gameDetails?.id
  );

  const handleFavoriteClick = () => {
    if (!gameDetails) return;

    const gameData: GameData = {
      ...gameDetails,
      userId: userId,
    };

    if (userId) {
      if (isFavorited) {
        removeFavorite(gameData);
      } else {
        addFavorite(gameData);
      }
    } else {
      showNotification({
        title: "Sign In Needed",
        message: "You need to sign in to favorite a game",
        color: "red",
        icon: <MdOutlineError />,
      });
    }
  };

  return { isFavorited, handleFavoriteClick };
}
