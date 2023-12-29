import { Box, Image, Title } from "@mantine/core";
// import { GiCrownedHeart } from "react-icons/gi";
import { IoHeartOutline } from "react-icons/io5";
import "../css/Thumbnail.css";

interface Game {
  name: string;
  cover: string;
}

const Thumbnail: React.FC<{ game: Game }> = ({ game }) => {
  return (
    // <Card radius="md" shadow="sm" className="card-container">
    <Box className="card-container">
      <Image src={game.cover} alt={game.name} radius="md" />
      {/* <GiCrownedHeart /> */}
      <IoHeartOutline className="heart-icon" />
      <Title order={5}>{game.name}</Title>
    </Box>
    // </Card>
  );
};

export default Thumbnail;
