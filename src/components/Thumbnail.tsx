import { Box, Image, Text, Title } from "@mantine/core";
import { useState } from "react";
import { GiCrownedHeart } from "react-icons/gi";
import { HiUsers } from "react-icons/hi2";
import { IoHeartOutline } from "react-icons/io5";
import "../css/Thumbnail.css";

interface Game {
  name: string;
  cover: string;
  rating: number;
}

const Thumbnail: React.FC<{ game: Game }> = ({ game }) => {
  const [isHeartCrowned, setIsHeartCrowned] = useState(false);

  const getRatingClass = (rating: number) => {
    if (rating >= 75) {
      return "rating-high";
    } else if (rating >= 50) {
      return "rating-medium";
    } else {
      return "rating-low";
    }
  };

  const handleHeartClick = () => {
    setIsHeartCrowned(!isHeartCrowned);
  };
  return (
    // <Card radius="md" shadow="sm" className="card-container">
    <Box className="card-container">
      <Box className="thumbnail-image">
        <Image src={game.cover} alt={game.name} />
        <Box className="hover-content">
          <HiUsers
            style={{
              color: "white",
              fontSize: "1.5rem",
              marginRight: "0.5rem",
            }}
          />
          <Title className="game-info" order={5}>
            Multiplayer:
          </Title>
        </Box>
      </Box>
      {isHeartCrowned ? (
        <GiCrownedHeart className="heart-icon" onClick={handleHeartClick} />
      ) : (
        <IoHeartOutline className="heart-icon" onClick={handleHeartClick} />
      )}
      <Title mb="sm" order={5}>
        {game.name}
      </Title>
      <Text className={`rating ${getRatingClass(game.rating)}`}>
        {Math.round(game.rating)}
      </Text>
    </Box>
    // </Card>
  );
};

export default Thumbnail;
