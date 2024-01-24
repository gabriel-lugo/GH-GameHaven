import { Box, Text, Title } from "@mantine/core";
import Gallery from "./Gallery";

interface GallerySectionProps {
  gameDetails: any;
}

const GallerySection: React.FC<GallerySectionProps> = ({ gameDetails }) => {
  return (
    <Box>
      <Title pl={10} order={4}>
        Gallery
      </Title>
      {gameDetails &&
      (gameDetails.screenshots?.length > 0 ||
        gameDetails.artworks?.length > 0) ? (
        <Gallery
          images={[
            ...(gameDetails.screenshots?.length > 0
              ? gameDetails.screenshots.map((s: string) => ({
                  url: s,
                  altText: `Screenshot of ${gameDetails.name}`,
                }))
              : []),
            ...(gameDetails.artworks?.length > 0
              ? gameDetails.artworks.map((a: string) => ({
                  url: a,
                  altText: `Artwork of ${gameDetails.name}`,
                }))
              : []),
          ]}
        />
      ) : (
        <Box>
          <Text pl={10}>No Screenshots or Artworks Available</Text>
        </Box>
      )}
    </Box>
  );
};

export default GallerySection;
