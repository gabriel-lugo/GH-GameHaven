import { Box, Image, Spoiler, Text, Title } from "@mantine/core";
import { useState } from "react";
import { GiCrownedHeart, GiStabbedNote } from "react-icons/gi";
import { IoHeartOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import "../css/Thumbnail.css";

interface Game {
  name: string;
  cover: string;
  rating: number;
  total_rating: number;
  id: number;
  summary: string;
}

const Thumbnail: React.FC<{ game: Game }> = ({ game }) => {
  const [isHeartCrowned, setIsHeartCrowned] = useState(false);

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
    setIsHeartCrowned(!isHeartCrowned);
  };

  return (
    <Box className="thumbnail-card-container">
      <NavLink to={`/games/${game.id}`} className="game-link">
        <Box className="thumbnail-image">
          <Image src={game.cover} alt={game.name} />
          <Box className="hover-content">
            <Spoiler maxHeight={200} showLabel="" hideLabel="">
              <GiStabbedNote
                style={{
                  marginLeft: "5.5rem",
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
