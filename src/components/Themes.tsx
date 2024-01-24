import { Box, Text, Title } from "@mantine/core";

interface ThemesProps {
  themes: Array<{ name: string }> | undefined;
}

const Themes: React.FC<ThemesProps> = ({ themes }) => {
  return (
    <Box mb="sm" className="left-margin" pl={10}>
      <Title order={4}>Themes</Title>
      {themes && themes.length > 0 ? (
        themes.map((theme, index) => <Text key={index}>{theme.name}</Text>)
      ) : (
        <Text fs="italic">Not available</Text>
      )}
    </Box>
  );
};

export default Themes;
