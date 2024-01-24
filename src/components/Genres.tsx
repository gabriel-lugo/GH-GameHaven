import { Box, Text, Title } from "@mantine/core";

interface GenresProps {
  genres: Array<{ name: string }> | undefined;
}

const Genres: React.FC<GenresProps> = ({ genres }) => {
  return (
    <Box mb="sm" className="responsive-style" pl={10}>
      <Title order={4}>Genres</Title>
      {genres && genres.length > 0 ? (
        genres.map((genre, index) => <Text key={index}>{genre.name}</Text>)
      ) : (
        <Text fs="italic">Not available</Text>
      )}
    </Box>
  );
};

export default Genres;
