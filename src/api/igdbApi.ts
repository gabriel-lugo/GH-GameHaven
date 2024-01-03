import axiosClient from "./axiosClient";

const platformIds: { [key: string]: number } = {
  pc: 6, // Platform ID for PC
  playstation: 48, // Platform ID for PlayStation
  xbox: 49, // Platform ID for Xbox
  // Add more platforms as needed
};

// release_dates
// game_videos
// screenshots

const defaultMinRating = 90;
const defaultMinRatingCount = 20;

export const getGameScreenshotUrl = (imageId: string) => {
  return `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${imageId}.png`;
};

export const getGameCoverUrl = (imageId: string) => {
  return `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.png`;
};

const fetchGameCoversAndScreenshots = async (games: any[], platform: string) => {
  const promises = games.map(async (game: any) => {
    let cover, screenshots = [];

    if (game.cover && game.cover.image_id) {
      // If the game has a cover with a valid image_id, use it
      cover = await getGameCoverUrl(game.cover.image_id);
    } else if (game.screenshots && game.screenshots.length > 0) {
      // If the game doesn't have a cover but has screenshots, use the first screenshot as the cover
      cover = await getGameCoverUrl(game.screenshots[0].image_id);
    } else {
      // If the game doesn't have a cover or screenshots, set cover to a default cover URL
      cover =
        "https://github.com/gabriel-lugo/GH-GameHaven/assets/117975295/03250a04-e515-4fd2-901d-89f4951b75a6";
    }

    console.log(`Fetching cover for game on platform ${platform}:`, game);

    if (game.screenshots && game.screenshots.length > 0) {
      screenshots = game.screenshots.map((ss: any) => getGameScreenshotUrl(ss.image_id));
    }

    console.log(`Fetching cover and screenshots for game on platform ${platform}:`, game);

    return { ...game, cover, screenshots };
  });

  return Promise.all(promises);
};

export const searchGames = async (query: string, platform: string) => {
  const endpoint = "games/";
  const url = `${endpoint}`;

  const platformId = platformIds[platform.toLowerCase()];
  if (platformId === undefined) {
    throw new Error(`Unsupported platform: ${platform}`);
  }

  const requestBody = `fields name, summary, themes.name, franchises.name, release_dates.date, involved_companies.company.name, game_modes.name, artworks.*, genres.name, websites.*, videos.*, total_rating, total_rating_count, platforms.name; where name = "${query}";`;

  try {
    const response = await axiosClient.post(url, requestBody);
    return response.data;
  } catch (error) {
    console.error("Error making request:", error);
    throw error;
  }
};

export const getTopRatedGames = async (
  platform: string,
  minRating: number = defaultMinRating,
  minRatingCount: number = defaultMinRatingCount,
  limit: number = 10
) => {
  const endpoint = "games/";
  const url = `${endpoint}?fields=name,total_rating,total_rating_count,cover.image_id&order=rating:desc&limit=${limit}&platforms=${
    platformIds[platform.toLowerCase()] || platformIds.pc
  }&filter[rating][gt]=${minRating}&filter[rating_count][gt]=${minRatingCount};`;

  try {
    const response = await axiosClient.get(url);
    const topRatedGames = response.data;

    // Fetch covers for each top-rated game
    const gamesWithCovers = await fetchGameCoversAndScreenshots(topRatedGames, platform);

    console.log(
      `Top Rated Games with Covers (Rating > ${minRating}, Rating Count > ${minRatingCount}):`,
      gamesWithCovers
    );
    return gamesWithCovers;
  } catch (error) {
    console.error("Error making request:", error);
    throw error;
  }
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

export const getNewGames = async (platform: string, limit: number = 10) => {
  const endpoint = "games/";
  const url = `${endpoint}?fields=name,total_rating,release_dates.date,cover.image_id,screenshots.image_id&order=release_dates.date:desc&limit=${limit}&platforms=${platformIds[platform.toLowerCase()] || platformIds.pc};`;

  try {
    const response = await axiosClient.get(url);
    const newGames = response.data;

    // Fetch covers for each new game
    const gamesWithCoversAndScreenshots = await fetchGameCoversAndScreenshots(newGames, platform);

    console.log(`Newest Games (${limit} games) with Covers:`, gamesWithCoversAndScreenshots);
    return gamesWithCoversAndScreenshots;
  } catch (error) {
    console.error("Error making request:", error);
    throw error;
  }
};

// ... (other functions and exports)

// Add more functions for other IGDB API calls

export default {
  searchGames,
  getTopRatedGames,
  getNewGames,
  // Add more functions here if needed
};
