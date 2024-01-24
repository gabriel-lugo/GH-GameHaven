import { Box, Text, Title } from "@mantine/core";

interface GameModesProps {
  gameModes: Array<{ name: string }> | undefined;
}

const GameModes: React.FC<GameModesProps> = ({ gameModes }) => {
  return (
    <Box mb="sm" className="left-margin" pl={10}>
      <Title order={4}>Game Modes</Title>
      {gameModes && gameModes.length > 0 ? (
        gameModes.map((mode, index) => <Text key={index}>{mode.name}</Text>)
      ) : (
        <Text fs="italic">Not available</Text>
      )}
    </Box>
  );
};

export default GameModes;
