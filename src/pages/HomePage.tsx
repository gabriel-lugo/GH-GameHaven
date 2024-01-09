import { Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { getNewGames, getTopRatedGames } from "../api/igdbApi";
import Carousel from "../components/Carousel";
import GhInfo from "../components/GhInfo";
import HeroSlide from "../components/HeroSlide";

export interface Game {
  id: number;
  name: string;
  cover: string;
  rating: number;
  total_rating: number;
  screenshots: string[];
  summary: string;
  artworks: string[];
  release_dates: Array<{ date: string }>;
}

function HomePage() {
  const [topRatedGames, setTopRatedGames] = useState<Game[]>([]);
  const [newestGames, setNewestGames] = useState<Game[]>([]);

  // useEffect(() => {
  //   const query = "Hades"; // Replace with the desired game name
  //   const platform = "pc";

  //   getGameDetails(query, platform)
  //     .then((gameData) => {
  //       // Log the game information to the console
  //       console.log("Game Information:", gameData);
  //     })
  //     .catch((error) => {
  //       // Handle errors
  //       console.error("Error:", error);
  //     });
  // }, []);

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
      <HeroSlide games={topRatedGames} />
      {/* <Container size={"xl"}>
        <Title order={2} mb={"md"}>
          Top Rated Games
        </Title>
        <SimpleGrid cols={{ base: 1, xs: 3, sm: 4, lg: 6 }} mb={"xl"}>
          {topRatedGames.map((game) => (
            <Thumbnail key={game.id} game={game} />
          ))}
        </SimpleGrid>
      </Container> */}
      <Title order={2} pl={"md"} mb={"md"}>
        Top Rated Games
      </Title>
      <Carousel games={topRatedGames} />
      <GhInfo />
      {/* <Container size={"xl"}>
        <Title order={2} mb={"md"}>
          Newest Games
        </Title>
        <SimpleGrid cols={{ base: 1, xs: 4, sm: 4, lg: 6 }} mb={"xl"}>
          {newestGames.map((game) => (
            <Thumbnail key={game.id} game={game} />
          ))}
        </SimpleGrid>
      </Container> */}
      <Title order={2} pl={"md"} mb={"md"}>
        Newest Games
      </Title>
      <Carousel games={newestGames} />
    </>
  );
}

export default HomePage;
