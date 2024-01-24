import { Box, Text } from "@mantine/core";
import React from "react";

interface InvolvedCompaniesProps {
  involvedCompanies: Array<{ company: { name: string } }> | undefined;
}

const InvolvedCompanies: React.FC<InvolvedCompaniesProps> = ({
  involvedCompanies,
}) => {
  return (
    <Box className="game-companies">
      {involvedCompanies && involvedCompanies.length > 0 ? (
        <Text>{involvedCompanies[0].company.name}</Text>
      ) : (
        <Text>No involved companies available</Text>
      )}
    </Box>
  );
};

export default InvolvedCompanies;
