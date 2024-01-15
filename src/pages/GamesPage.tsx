import {
  Box,
  Button,
  Container,
  Divider,
  Group,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { fetchFilteredGames } from "../api/igdbApi";
import Thumbnail from "../components/Thumbnail";
import "../css/GamesPage.css";

function GamesPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("pc");
  const [selectedGenre, setSelectedGenre] = useState<string>("Adventure");
  const [selectedGameMode, setSelectedGameMode] =
    useState<string>("Singleplayer");
  const [games, setGames] = useState<any[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const platformFilter = selectedPlatform
        ? [{ name: selectedPlatform }]
        : [];
      const genreFilter = selectedGenre ? [{ name: selectedGenre }] : [];

      const gameModeFilter = selectedGameMode
        ? [{ name: selectedGameMode }]
        : [];

      const filteredGames = await fetchFilteredGames(
        platformFilter,
        genreFilter,
        gameModeFilter
      );
      setGames(filteredGames);
    };

    fetchGames();
  }, [selectedPlatform, selectedGenre, selectedGameMode]);

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
  };

  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform);
  };

  const handleGameModeSelect = (gameMode: string) => {
    setSelectedGameMode(gameMode);
  };

  const isActiveButton = (
    buttonType: "platform" | "genre" | "gameMode",
    value: string
  ) => {
    switch (buttonType) {
      case "platform":
        return selectedPlatform === value;
      case "genre":
        return selectedGenre === value;
      case "gameMode":
        return selectedGameMode === value;
      default:
        return false;
    }
  };
  return (
    <Container mb={"xl"} className="games-buttons" size="xl">
      <Box>
        <Title mb={"sm"} mt={"sm"} order={5}>
          Platform:
        </Title>
        <Group>
          {[
            "pc",
            "playstation",
            "xbox",
            "nintendo",
            "n64",
            "nes",
            "snes",
            "gcn",
          ].map((platform) => (
            <Button
              color="#f2c341"
              key={platform}
              onClick={() => handlePlatformSelect(platform)}
              variant={
                isActiveButton("platform", platform) ? "filled" : "outline"
              }
            >
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </Button>
          ))}
        </Group>
      </Box>
      <Box>
        <Title mb={"sm"} mt={"sm"} order={5}>
          Genre:
        </Title>
        <Group>
          {["Adventure", "RPG", "Strategy"].map((genre) => (
            <Button
              color="#f2c341"
              key={genre}
              onClick={() => handleGenreSelect(genre)}
              variant={isActiveButton("genre", genre) ? "filled" : "outline"}
            >
              {genre}
            </Button>
          ))}
        </Group>
      </Box>

      <Box>
        <Title mb={"sm"} mt={"sm"} order={5}>
          Game Mode:
        </Title>
        <Group>
          {["Singleplayer", "Multiplayer", "Coop"].map((gameMode) => (
            <Button
              autoContrast
              color="#f2c341"
              key={gameMode}
              onClick={() => handleGameModeSelect(gameMode)}
              variant={
                isActiveButton("gameMode", gameMode) ? "filled" : "outline"
              }
            >
              {gameMode}
            </Button>
          ))}
        </Group>
      </Box>

      <Title mt={"lg"} ta="center" order={3}>
        {selectedPlatform.toUpperCase() || "None"}
      </Title>
      <Text size="lg" ta="center">
        {selectedGenre || "None"}
      </Text>
      <Text size="lg" ta="center">
        {selectedGameMode || "None"}
      </Text>
      <Container mt={"md"} size={"xl"}>
        <Divider color="#262626" />
      </Container>
      <div>
        <SimpleGrid
          cols={{ base: 1, xs: 3, sm: 4, lg: 6 }}
          spacing={"xs"}
          verticalSpacing={"lg"}
          mt="md"
        >
          {games.map((game) => (
            <Thumbnail key={game.id} game={game} />
          ))}
        </SimpleGrid>
      </div>
    </Container>
  );
}

export default GamesPage;
