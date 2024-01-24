import { Box, Spoiler, Text, Title } from "@mantine/core";

interface GameSummaryProps {
  summary: string | undefined;
}

const GameSummary: React.FC<GameSummaryProps> = ({ summary }) => {
  return (
    <Box className="margin-box">
      <Title order={4}>Summary</Title>
      {summary ? (
        <Spoiler maxHeight={70} showLabel="Read More" hideLabel="Hide">
          <Text>{summary}</Text>
        </Spoiler>
      ) : (
        <Text fs="italic">Not available</Text>
      )}
    </Box>
  );
};

export default GameSummary;
