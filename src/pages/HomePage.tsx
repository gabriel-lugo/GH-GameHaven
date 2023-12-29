import { Title } from "@mantine/core";
import { useEffect } from "react";
import { searchGames } from "../api/axiosClient";

function HomePage() {
  useEffect(() => {
    const query = "Super Mario Bros. Wonder"; // Replace with the desired game name
    searchGames(query)
      .then((gameData) => {
        // Log the game information to the console
        console.log("Game Information:", gameData);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  }, []);

  return <Title order={2}>Homepage</Title>;
}

export default HomePage;
