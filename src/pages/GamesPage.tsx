import {
  Box,
  Button,
  Container,
  Group,
  SimpleGrid,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { fetchFilteredGames } from "../api/igdbApi";
import Thumbnail from "../components/Thumbnail";

function GamesPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<any>("");
  const [selectedGenre, setSelectedGenre] = useState<any>("");
  const [games, setGames] = useState<any[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const platformFilter = selectedPlatform
        ? [{ name: selectedPlatform }]
        : [];
      const genreFilter = selectedGenre ? [{ name: selectedGenre }] : [];

      const filteredGames = await fetchFilteredGames(
        platformFilter,
        genreFilter
      );
      setGames(filteredGames);
    };

    fetchGames();
  }, [selectedPlatform, selectedGenre]);

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
  };

  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform);
  };

  const isActiveButton = (buttonType: "platform" | "genre", value: string) => {
    return (
      (buttonType === "platform" ? selectedPlatform : selectedGenre) === value
    );
  };

  return (
    <Container size="xl">
      <Box>
        <Title order={5}>Platform:</Title>
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
        <Title order={5}>Genre:</Title>
        <Group>
          {["Adventure", "RPG", "Strategy"].map((genre) => (
            <Button
              key={genre}
              onClick={() => handleGenreSelect(genre)}
              variant={isActiveButton("genre", genre) ? "filled" : "outline"}
            >
              {genre}
            </Button>
          ))}
        </Group>
      </Box>

      <Title ta="center" order={3}>
        {" "}
        Selected Platform: {selectedPlatform || "None"} | Selected Genre:{" "}
        {selectedGenre || "None"}
      </Title>
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
