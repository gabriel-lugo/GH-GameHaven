import { Box, Text, Title } from "@mantine/core";

interface PlatformsProps {
  platforms: Array<{ name: string }> | undefined;
}

const Platforms: React.FC<PlatformsProps> = ({ platforms }) => {
  return (
    <Box className="responsive-style" pl={10}>
      <Title order={4}>Platforms</Title>
      {platforms && platforms.length > 0 ? (
        platforms.map((platform, index) => (
          <Text key={index}>{platform.name}</Text>
        ))
      ) : (
        <Text fs="italic">Not available</Text>
      )}
    </Box>
  );
};

export default Platforms;
