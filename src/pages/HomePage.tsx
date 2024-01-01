import { Title } from "@mantine/core";
import { useEffect } from "react";
import { getNewGames, getTopRatedGames, searchGames } from "../api/igdbApi";
import GhInfo from "../components/GhInfo";

function HomePage() {
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
    getTopRatedGames("pc")
      .then((topRatedGames) => {
        // Log the top-rated games information to the console
        console.log("Top Rated Games:", topRatedGames);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    getNewGames("pc")
      .then((newGames) => {
        // Log the newest games information to the console
        console.log("Newest Games:", newGames);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <Title order={2}>Homepage</Title>
      <GhInfo />
    </>
  );
}

export default HomePage;
