import { Title } from "@mantine/core";
import { useEffect } from "react";
import { searchGames } from "../api/igdbApi";

function DetailsPage() {
  useEffect(() => {
    const query = "The Elder Scrolls IV: Oblivion";
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

  return <Title order={2}>Details</Title>;
}

export default DetailsPage;
