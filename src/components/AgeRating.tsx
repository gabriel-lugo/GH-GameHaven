import { Box, Image } from "@mantine/core";
import { getPegiImage } from "../utils/PegiUtility";

interface AgeRatingProps {
  ageRating: string;
}

const AgeRating: React.FC<AgeRatingProps> = ({ ageRating }) => {
  return (
    <Box className="age-rating-box">
      <Image src={getPegiImage(ageRating)} alt={`PEGI Rating: ${ageRating}`} />
    </Box>
  );
};

export default AgeRating;
