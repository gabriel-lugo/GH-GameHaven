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

const defaultMinRating = 85;
const defaultMinRatingCount = 20;

export const getGameScreenshotUrl = (imageId: string) => {
  return `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${imageId}.png`;
};

export const getGameCoverUrl = (imageId: string) => {
  return `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.png`;
};

export const getArtworkUrl = (imageID: string) => {
  return `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${imageID}.jpg`;
};

const fetchGameCoversAndScreenshots = async (
  games: any[],
  platform: string
) => {
  const promises = games.map(async (game: any) => {
    let cover,
      artworks = [],
      screenshots = [];

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
      screenshots = game.screenshots.map((ss: any) =>
        getGameScreenshotUrl(ss.image_id)
      );
    }

    if (game.artworks && game.artworks.length > 0) {
      artworks = game.artworks.map((artwork: any) =>
        getArtworkUrl(artwork.image_id)
      );
    }

    console.log(
      `Fetching cover, screenshots, and artworks for game on platform ${platform}:`,
      game
    );

    return { ...game, cover, screenshots, artworks };
  });

  return Promise.all(promises);
};

export const searchGames = async (query: number, platform: string) => {
  const endpoint = "games/";
  const url = `${endpoint}`;

  const platformId = platformIds[platform.toLowerCase()];
  if (platformId === undefined) {
    throw new Error(`Unsupported platform: ${platform}`);
  }

  const requestBody = `fields name, summary, themes.name, franchises.name, release_dates.date, cover.image_id, involved_companies.company.name, game_modes.name, artworks.*, screenshots.*, genres.name, websites.*, videos.*, total_rating, total_rating_count, platforms.name, similar_games.*, similar_games.cover.image_id; where id = ${query};`;

  try {
    const response = await axiosClient.post(url, requestBody);
    const gameDetails = response.data;

    const gameWithCover = await fetchGameCoversAndScreenshots(
      gameDetails,
      platform
    );

    // Process similar games' cover data to match Thumbnail component's expectations
    let similarGamesWithCovers: Array<any> = [];

    if (
      gameWithCover[0].similar_games &&
      gameWithCover[0].similar_games.length > 0
    ) {
      similarGamesWithCovers = gameWithCover[0].similar_games.map(
        (similarGame: any) => ({
          ...similarGame,
          cover: similarGame.cover.image_id
            ? getGameCoverUrl(similarGame.cover.image_id)
            : "https://github.com/gabriel-lugo/GH-GameHaven/assets/117975295/03250a04-e515-4fd2-901d-89f4951b75a6",
        })
      );
    }

    return [{ ...gameWithCover[0], similar_games: similarGamesWithCovers }];
  } catch (error) {
    console.error("Error making request:", error);
    throw error;
  }
};

export const getTopRatedGames = async (
  platform: string,
  minRating: number = defaultMinRating,
  minRatingCount: number = defaultMinRatingCount,
  limit: number = 15
) => {
  const endpoint = "games/";
  const url = `${endpoint}?fields=name,total_rating,total_rating_count,cover.image_id&order=rating:desc&limit=${limit}&platforms=${
    platformIds[platform.toLowerCase()] || platformIds.pc
  }&filter[rating][gt]=${minRating}&filter[rating_count][gt]=${minRatingCount};`;

  try {
    const response = await axiosClient.get(url);
    const topRatedGames = response.data;

    // Fetch covers for each top-rated game
    const gamesWithCovers = await fetchGameCoversAndScreenshots(
      topRatedGames,
      platform
    );

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

export const getNewGames = async (
  platform: string,
  limit: number = 15,
  maxReleaseDateTimestamp: number = Date.now()
) => {
  const endpoint = "games/";
  const url = `${endpoint}?fields=name,total_rating,release_dates.date,cover.image_id,screenshots.image_id&filter[release_dates.date][lt]=${maxReleaseDateTimestamp}&limit=${limit}`;

  try {
    const response = await axiosClient.get(url);
    const newGames = response.data;

    if (!newGames || newGames.length === 0) {
      console.warn("No new games found in the response.");
      return [];
    }

    // Log the raw response for inspection
    console.log("Raw API response:", response.data);

    // Fetch covers for each new game, passing the platform information
    const gamesWithCoversAndScreenshots = await fetchGameCoversAndScreenshots(
      newGames,
      platform
    );

    // Log intermediate results for inspection
    console.log(
      `Newest Games (${limit} games) with Covers:`,
      gamesWithCoversAndScreenshots
    );

    return gamesWithCoversAndScreenshots;
  } catch (error) {
    console.error("Error making request or fetching covers:", error);
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
