import { Box, Image, Text, Title } from '@mantine/core';
// import { GiCrownedHeart } from "react-icons/gi";
import { IoHeartOutline } from 'react-icons/io5';
import '../css/Thumbnail.css';

interface Game {
  name: string;
  cover: string;
  rating: number;
}

const Thumbnail: React.FC<{ game: Game }> = ({ game }) => {
  const getRatingClass = (rating: number) => {
    if (rating >= 75) {
      return 'rating-high';
    } else if (rating >= 50) {
      return 'rating-medium';
    } else {
      return 'rating-low';
    }
  };
  return (
    // <Card radius="md" shadow="sm" className="card-container">
    <Box className="card-container">
      <Box className="thumbnail-image">
        <Image src={game.cover} alt={game.name} />
        <Box className="hover-content">
          <Title className="game-info" order={5}>
            Game Info
          </Title>
        </Box>
      </Box>
      {/* <GiCrownedHeart /> */}
      <IoHeartOutline className="heart-icon" />
      <Title order={5}>{game.name}</Title>
      <Text className={`rating ${getRatingClass(game.rating)}`}>
        {Math.round(game.rating)}
      </Text>
    </Box>
    // </Card>
  );
};

export default Thumbnail;
