import { Button, Container, Group, SimpleGrid, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { fetchFilteredGames } from "../api/igdbApi";
import Thumbnail from "../components/Thumbnail";

function GamesPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<any>("");
  const [selectedGenre, setSelectedGenre] = useState<any>("");
  const [games, setGames] = useState<any[]>([]);

  type Genre = "Adventure" | "RPG" | "Indie" | "Strategy";

  const genreNameToId: { [key in Genre]: number } = {
    Adventure: 31,
    RPG: 12,
    Indie: 32,
    Strategy: 15,
  };

  useEffect(() => {
    const fetchGames = async () => {
      const platformFilter = selectedPlatform
        ? [{ name: selectedPlatform }]
        : [];
      const genreFilter = selectedGenre
        ? [{ id: genreNameToId[selectedGenre as Genre], name: selectedGenre }]
        : [];

      const filteredGames = await fetchFilteredGames(
        platformFilter,
        genreFilter
      );
      setGames(filteredGames);
    };

    fetchGames();
  }, [selectedPlatform, selectedGenre]);

  const handleGenreSelect = (genre: Genre) => {
    setSelectedGenre(genre);
  };

  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform);
  };

  return (
    <Container size="xl">
      <Group>
        <Title order={5}>Platform:</Title>
        <Button onClick={() => handlePlatformSelect("pc")}>PC</Button>
        <Button onClick={() => handlePlatformSelect("playstation")}>
          PlayStation
        </Button>
        <Button onClick={() => handlePlatformSelect("xbox")}>Xbox</Button>
        <Button onClick={() => handlePlatformSelect("nintendo")}>
          Nintendo Switch
        </Button>
        <Button onClick={() => handlePlatformSelect("n64")}>Nintendo 64</Button>
        <Button onClick={() => handlePlatformSelect("nes")}>
          Nintendo Entertainment System
        </Button>
        <Button onClick={() => handlePlatformSelect("snes")}>
          Super Nintendo Entertainment System
        </Button>
        <Button onClick={() => handlePlatformSelect("gcn")}>
          Nintendo Gamecube
        </Button>
      </Group>

      <Group>
        <Title order={5}>Genre:</Title>
        <Button onClick={() => handleGenreSelect("Adventure")}>
          Adventure
        </Button>
        <Button onClick={() => handleGenreSelect("RPG")}>RPG</Button>
        <Button onClick={() => handleGenreSelect("Strategy")}>Strategy</Button>
      </Group>

      <Title order={2}>Games</Title>
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
