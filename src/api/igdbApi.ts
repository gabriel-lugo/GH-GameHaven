import axiosClient from "./axiosClient";

const platformIds: { [key: string]: number } = {
  pc: 6, // Platform ID for PC
  playstation: 48, // Platform ID for PlayStation
  xbox: 49, // Platform ID for Xbox
  // Add more platforms as needed
};

export const searchGames = async (query: string, platform: string) => {
  const endpoint = "games/";
  const url = `${endpoint}`;

  const platformId = platformIds[platform.toLowerCase()];
  if (platformId === undefined) {
    throw new Error(`Unsupported platform: ${platform}`);
  }

  const requestBody = `fields name, summary; where name = "${query}" & platforms = ${platformId};`;

  try {
    const response = await axiosClient.post(url, requestBody);
    return response.data;
  } catch (error) {
    console.error("Error making request:", error);
    throw error;
  }
};

export const getTopRatedGames = async (platform: string) => {
  const endpoint = "games/";
  const url = `${endpoint}?fields=name,rating,cover.image_id&order=rating:desc&limit=10 & platforms = ${
    platformIds[platform.toLowerCase()] || platformIds.pc
  };`;

  try {
    const response = await axiosClient.get(url);
    const topRatedGames = response.data;

    // Fetch covers for each top-rated game
    const coversPromises = topRatedGames.map(async (game: any) => {
      const cover = await getGameCoverUrl(game.cover.image_id);
      return { ...game, cover };
    });

    // Wait for all covers to be fetched
    const gamesWithCovers = await Promise.all(coversPromises);

    console.log("Top Rated Games with Covers:", gamesWithCovers);
    return gamesWithCovers;
  } catch (error) {
    console.error("Error making request:", error);
    throw error;
  }
};

export const getGameCoverUrl = (imageId: string) => {
  return `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.png`;
};

export const getGameCover = async (imageId: string) => {
  const endpoint = `covers/${imageId}`;
  const url = `${endpoint}?fields=image_id`;

  try {
    const response = await axiosClient.get(url);
    return getGameCoverUrl(response.data.image_id);
  } catch (error) {
    console.error("Error making request:", error);
    throw error;
  }
};

// Add more functions for other IGDB API calls

export default {
  searchGames,
  getTopRatedGames,
  // Add more functions here if needed
};
