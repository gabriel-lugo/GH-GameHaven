import { Box, Title } from "@mantine/core";

interface GameTitleProps {
  title: string;
}

const GameTitle: React.FC<GameTitleProps> = ({ title }) => {
  return (
    <Box className="details-title">
      <Title className="title-size" pl={10} order={2}>
        {title}
      </Title>
    </Box>
  );
};

export default GameTitle;
