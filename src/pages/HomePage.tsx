import { Container, SimpleGrid, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { getNewGames, getTopRatedGames, searchGames } from "../api/igdbApi";
import GhInfo from "../components/GhInfo";
import Thumbnail from "../components/Thumbnail";
import HeroSlide from "../components/HeroSlide";

interface Game {
  id: number;
  name: string;
  cover: string;
  rating: number;
  screenshots: string[];
}

function HomePage() {
  const [topRatedGames, setTopRatedGames] = useState<Game[]>([]);
  const [newestGames, setNewestGames] = useState<Game[]>([]);

  useEffect(() => {
    const query = "Hades"; // Replace with the desired game name
    const platform = "pc";

    searchGames(query, platform)
      .then((gameData) => {
        // Log the game information to the console
        console.log("Game Information:", gameData);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    getTopRatedGames("playstation")
      .then((topRatedGames) => {
        // Log the top-rated games information to the console
        console.log("Top Rated Games:", topRatedGames);
        setTopRatedGames(topRatedGames);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    getNewGames("playstation")
      .then((newGames) => {
        // Log the newest games information to the console
        console.log("Newest Games:", newGames);
        setNewestGames(newGames);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <HeroSlide games={newestGames} />
      <Container size={"xl"}>
        <Title order={2} mb={"md"}>
          Top Rated Games
        </Title>
        <SimpleGrid cols={{ base: 1, xs: 4, sm: 4, lg: 6 }} mb={"xl"}>
          {topRatedGames.map((game) => (
            <Thumbnail key={game.id} game={game} />
          ))}
        </SimpleGrid>
      </Container>
      <GhInfo />
      <Container size={"xl"}>
        <Title order={2} mb={"md"}>
          Newest Games
        </Title>
        <SimpleGrid cols={{ base: 1, xs: 4, sm: 4, lg: 6 }} mb={"xl"}>
          {newestGames.map((game) => (
            <Thumbnail key={game.id} game={game} />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}

export default HomePage;
