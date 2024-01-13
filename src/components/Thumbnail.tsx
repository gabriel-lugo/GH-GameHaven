import { Box, Image, Spoiler, Text, Title } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { GiCrownedHeart, GiStabbedNote } from "react-icons/gi";
import { IoHeartOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { BookmarkContext, GameData } from "../context/FavoritesContext";
import "../css/Thumbnail.css";
import { auth } from "../firebase";

interface Game {
  name: string;
  cover: string;
  rating: number;
  total_rating: number;
  id: number;
  summary: string;
}

const Thumbnail: React.FC<{ game: Game }> = ({ game }) => {
  const { bookmarks, addBookmark, removeBookmark } =
    useContext(BookmarkContext);
  const [isHeartCrowned, setIsHeartCrowned] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setUserId(user ? user.uid : "");
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const isBookmarked = bookmarks.some((b) => b.id === game.id);
    console.log(
      "Updating heart icon for game:",
      game.id,
      "Is Bookmarked:",
      isBookmarked
    );
    setIsHeartCrowned(isBookmarked);
  }, [bookmarks, game.id]);

  const getRatingClass = (rating: number) => {
    if (rating === null || rating === undefined) {
      return "rating-tbd";
    } else if (rating >= 75) {
      return "rating-high";
    } else if (rating >= 50) {
      return "rating-medium";
    } else {
      return "rating-low";
    }
  };
  const getRatingText = (rating: number) => {
    if (rating === null || rating === undefined) {
      return "No Rating";
    } else if (rating >= 75) {
      return "Acclaimed";
    } else if (rating >= 50) {
      return "Average";
    } else {
      return "Unfavorable";
    }
  };

  const handleHeartClick = () => {
    console.log("clicked");
    const gameData: GameData = {
      ...game,
      userId: userId,
    };

    if (isHeartCrowned) {
      removeBookmark(gameData);
    } else {
      addBookmark({ ...game, userId });
    }
    setIsHeartCrowned(!isHeartCrowned);
  };
  return (
    <Box className="thumbnail-card-container">
      <NavLink to={`/game/${game.id}`} className="game-link">
        <Box className="thumbnail-image">
          <Image src={game.cover} alt={game.name} />
          <Box className="hover-content">
            <Spoiler maxHeight={200} showLabel="" hideLabel="">
              <GiStabbedNote
                style={{
                  fontSize: "2rem",
                  color: "#FFF",
                }}
              />
              <Text style={{ padding: "1rem" }} size="sm" className="game-info">
                {game.summary}
              </Text>
            </Spoiler>
          </Box>
        </Box>
      </NavLink>
      <Box className="thumbnail-content-container">
        {isHeartCrowned ? (
          <GiCrownedHeart className="heart-icon" onClick={handleHeartClick} />
        ) : (
          <IoHeartOutline className="heart-icon" onClick={handleHeartClick} />
        )}
        <Title mb="sm" order={5}>
          {game.name}
        </Title>
      </Box>
      <Box className="rating-content">
        <Text className={`rating ${getRatingClass(game.total_rating)}`}>
          {game.total_rating === null || game.total_rating === undefined
            ? "TBD"
            : Math.round(game.total_rating)}
        </Text>
        <Text className="rating-text" ml="xs">
          {getRatingText(game.total_rating)}
        </Text>
      </Box>
    </Box>
  );
};

export default Thumbnail;
