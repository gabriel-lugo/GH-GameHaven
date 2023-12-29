import axios from "axios";
import apiConfig from "./apiConfig";

export const searchGames = async (query: string) => {
  const endpoint = "games/";
  const url = `${apiConfig.baseUrl}${endpoint}`;

  const requestBody = `fields name, summary; where name = "${query}";`;

  try {
    const response = await axios.post(url, requestBody, {
      headers: {
        "Client-ID": apiConfig.clientID,
        Authorization: `Bearer ${apiConfig.authorization}`,
        "Content-Type": "text/plain",
      },
    });

    const gameData = response.data;

    console.log("Game Information:", gameData);

    return gameData;
  } catch (error) {
    console.error("Error making request:", error);
    throw error;
  }
};

export default searchGames;
