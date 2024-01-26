import { Box, Button, Image } from "@mantine/core";
import { GiCrownedHeart } from "react-icons/gi";
import { IoHeartOutline } from "react-icons/io5";
import logo from "../assets/GH-logo.png";

interface CoverImageProps {
  gameDetails: {
    cover: string;
    name: string;
  };
  handleFavoriteClick: () => void;
  isFavorited: boolean;
}

const CoverImage: React.FC<CoverImageProps> = ({
  gameDetails,
  handleFavoriteClick,
  isFavorited,
}) => {
  return (
    <Box className="cover-image-container">
      <Image
        src={gameDetails.cover}
        alt={`Cover of ${gameDetails.name}`}
        className="game-cover-img"
        fallbackSrc={logo}
      />
      <Button
        className="cover-img-btn"
        onClick={handleFavoriteClick}
        style={{
          backgroundColor: isFavorited ? "#E3735E" : "#f2c341",
          color: isFavorited ? "#FFF" : "#262626",
        }}
      >
        {isFavorited ? (
          <>
            <GiCrownedHeart style={{ marginRight: "8px" }} /> Unfavorite
          </>
        ) : (
          <>
            <IoHeartOutline style={{ marginRight: "8px" }} /> Favorite
          </>
        )}
      </Button>
    </Box>
  );
};

export default CoverImage;
