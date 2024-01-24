import { Box, Text, Title } from "@mantine/core";

interface FranchisesProps {
  franchises: Array<{ name: string }> | undefined;
}

const Franchises: React.FC<FranchisesProps> = ({ franchises }) => {
  return (
    <Box className="left-margin" pl={10}>
      <Title order={4}>Franchises</Title>
      {franchises && franchises.length > 0 ? (
        franchises.map((franchise, index) => (
          <Text key={index}>{franchise.name}</Text>
        ))
      ) : (
        <Text fs="italic">Not available</Text>
      )}
    </Box>
  );
};

export default Franchises;
