import axiosClient from "./axiosClient";

const platformIds: { [key: string]: number } = {
  pc: 6, // Platform ID for PC
  playstation: 48, // Platform ID for PlayStation
  xbox: 49, // Platform ID for Xbox
  "nintendo switch": 130,
  n64: 4,
  nes: 18,
  snes: 19,
  gcn: 21,
  // Add more platforms as needed
};

const genreNameToId: { [key: string]: number } = {
  Adventure: 31,
  RPG: 12,
  Indie: 32,
  Strategy: 15,
  Platform: 8,
  Arcade: 33,
};

const gameModeNameToId: { [key: string]: number } = {
 Singleplayer: 1,
 Multiplayer: 2,
 Coop: 3
};

const defaultMinRating = 85;
const defaultMinRatingCount = 20;
const defaultCoverUrl =
  "https://github.com/gabriel-lugo/GH-GameHaven/assets/117975295/03250a04-e515-4fd2-901d-89f4951b75a6";

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
    } else if (game.similar_games && game.similar_games.length > 0) {
      // If the game doesn't have a cover or screenshots, and it's a similar game,
      // set cover to a default cover URL for similar games
      cover = defaultCoverUrl;
    } else {
      // If the game doesn't have a cover or screenshots, set cover to a default cover URL
      cover = defaultCoverUrl;
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

const fetchSimilarGamesCoversAndScreenshots = async (
  similarGames: any[],
  platform: string
) => {
  const promises = similarGames.map(async (similarGame: any) => {
    let cover,
      artworks = [],
      screenshots = [];

    if (similarGame.cover && similarGame.cover.image_id) {
      // If the similar game has a cover with a valid image_id, use it
      cover = await getGameCoverUrl(similarGame.cover.image_id);
    } else if (similarGame.screenshots && similarGame.screenshots.length > 0) {
      // If the similar game doesn't have a cover but has screenshots, use the first screenshot as the cover
      cover = await getGameCoverUrl(similarGame.screenshots[0].image_id);
    } else {
      // If the similar game doesn't have a cover or screenshots, set cover to a default cover URL
      cover = defaultCoverUrl;
    }

    console.log(
      `Fetching cover for similar game on platform ${platform}:`,
      similarGame
    );

    if (similarGame.screenshots && similarGame.screenshots.length > 0) {
      screenshots = similarGame.screenshots.map((ss: any) =>
        getGameScreenshotUrl(ss.image_id)
      );
    }

    if (similarGame.artworks && similarGame.artworks.length > 0) {
      artworks = similarGame.artworks.map((artwork: any) =>
        getArtworkUrl(artwork.image_id)
      );
    }

    console.log(
      `Fetching cover, screenshots, and artworks for similar game on platform ${platform}:`,
      similarGame
    );

    return { ...similarGame, cover, screenshots, artworks };
  });

  return Promise.all(promises);
};

export const searchForGames = async (query: string, platforms: string[], currentPage = 1, limit = 20) => {
  // Generate a unique cache key based on query, platforms, current page, and limit
  const cacheKey = `searchForGames-${query}-${platforms.join("-")}-${currentPage}-${limit}`;
  const cachedData = sessionStorage.getItem(cacheKey);

  // Use cached data if available
  if (cachedData) {
    console.log("Using cached data for search query:", query);
    return JSON.parse(cachedData);
  }

  const endpoint = "games/";
  const url = `${endpoint}`;

  const platformIdsArray = platforms
    .map((platform) => {
      const id = platformIds[platform.toLowerCase()];
      if (id === undefined) {
        throw new Error(`Unsupported platform: ${platform}`);
      }
      return id;
    })
    .join(",");

  const offset = (currentPage - 1) * limit;

  const requestBody = `fields name, summary, themes.name, franchises.name, release_dates.date, cover.image_id, involved_companies.company.name, game_modes.name, artworks.*, screenshots.*, genres.name, websites.*, videos.*, total_rating, total_rating_count, platforms.name, similar_games.*, similar_games.cover.image_id; 
  search "${query}"; where platforms = (${platformIdsArray}); limit ${limit}; offset ${offset};`;

  try {
    const response = await axiosClient.post(url, requestBody);
    const searchResults = response.data;

    const processedResults = searchResults.map((game: any) => ({
      ...game,
      cover: game.cover
        ? getGameCoverUrl(game.cover.image_id)
        : "default_image_url",
    }));

    // Attempt to cache the processed results in sessionStorage
    try {
      sessionStorage.setItem(cacheKey, JSON.stringify(processedResults));
    } catch (e) {
      if (
        e instanceof DOMException &&
        e.code === DOMException.QUOTA_EXCEEDED_ERR
      ) {
        console.warn("Session storage is full, unable to cache the results");
      } else {
        console.error("Error during caching:", e);
      }
    }

    return processedResults;
  } catch (error) {
    console.error("Error making request:", error);
    throw error;
  }
};

export const fetchFilteredGames = async (
  platforms: Array<{ name: string }> = [],
  genres: Array<{ name: string }> = [],
  gameModes: Array<{ name: string }> = [],
  currentPage: number = 1,
  limit: number = 42
) => {

  const cacheKey = `fetchFilteredGames-${platforms.map(p => p.name).join(',')}-${genres.map(g => g.name).join(',')}-${gameModes.map(gm => gm.name).join(',')}-${currentPage}-${limit}`;

  const cachedData = sessionStorage.getItem(cacheKey);
  if (cachedData) {
    console.log("Using cached data for fetchFilteredGames:", cacheKey);
    return JSON.parse(cachedData);
  }

  const platformIdsArray = platforms
    .map(platform => platformIds[platform.name.toLowerCase()])
    .filter(id => id !== undefined);
    const genreIdsArray = genres.map(genre => genreNameToId[genre.name]);
    const gameModeIdsArray = gameModes.map(gameMode => gameModeNameToId[gameMode.name]);

  const offset = (currentPage - 1) * limit;

  let query = `fields name, cover.image_id, total_rating, summary, platforms.name, genres.name, game_modes.name; limit ${limit}; offset ${offset};`;

  if (platformIdsArray.length > 0) {
    query += ` where platforms = (${platformIdsArray.join(',')})`;
  }

  if (genreIdsArray.length > 0) {
    query += ` & genres = [${genreIdsArray.join(',')}]`;
  }
  if (gameModeIdsArray.length > 0) {
    query += ` & game_modes = [${gameModeIdsArray.join(',')}]`;
  }
  query += ';';


  try {
    const response = await axiosClient.post('games/', query);
    const data = response.data;
    
      const processedGames = data.map((game: any) => {
        return {
            ...game,
            cover: game.cover ? getGameCoverUrl(game.cover.image_id) : "https://github.com/gabriel-lugo/GH-GameHaven/assets/117975295/03250a04-e515-4fd2-901d-89f4951b75a6",
            total_rating: game.total_rating !== undefined ? game.total_rating : null
        };
    });
      console.log("Genres", processedGames);

      try {
        sessionStorage.setItem(cacheKey, JSON.stringify(processedGames));
      } catch (e) {
        if (
          e instanceof DOMException &&
          e.code === DOMException.QUOTA_EXCEEDED_ERR
        ) {
          console.warn("Session storage is full, unable to cache the results");
        } else {
          console.error("Error during caching:", e);
        }
      }
      return processedGames;
      
    } catch (error) {
    console.error('Error fetching filtered games:', error);
    throw error;
    }
    };

export const getGameDetails = async (query: number, platform: string) => {
  // Generate a unique cache key
  const cacheKey = `getGameDetails-${query}-${platform}`;
  const cachedData = sessionStorage.getItem(cacheKey);

  // Use cached data if available
  if (cachedData) {
    console.log("Using cached data for game details:", cacheKey);
    return JSON.parse(cachedData);
  }

  const endpoint = "games/";
  const url = `${endpoint}`;

  const platformId = platformIds[platform.toLowerCase()];
  if (platformId === undefined) {
    throw new Error(`Unsupported platform: ${platform}`);
  }

  const requestBody = `fields name, summary, themes.name, franchises.name, release_dates.date, cover.image_id, involved_companies.company.name, game_modes.name, artworks.*, screenshots.*, genres.name, websites.*, videos.*, total_rating, total_rating_count, platforms.name, similar_games.*, similar_games.cover.image_id, similar_games.screenshots.*; where id = ${query};`;

  try {
    const response = await axiosClient.post(url, requestBody);
    const gameDetails = response.data;

    const gameWithCover = await fetchGameCoversAndScreenshots(
      gameDetails,
      platform
    );

    // Process similar games' cover data
    let similarGamesWithCovers = [];

    if (
      gameWithCover[0].similar_games &&
      gameWithCover[0].similar_games.length > 0
    ) {
      similarGamesWithCovers = await fetchSimilarGamesCoversAndScreenshots(
        gameWithCover[0].similar_games,
        platform
      );
    }

    const result = [
      { ...gameWithCover[0], similar_games: similarGamesWithCovers },
    ];

    // Attempt to cache the result in sessionStorage
    try {
      sessionStorage.setItem(cacheKey, JSON.stringify(result));
    } catch (e) {
      if (
        e instanceof DOMException &&
        e.code === DOMException.QUOTA_EXCEEDED_ERR
      ) {
        console.warn("Session storage is full, unable to cache the results");
        // Log the warning but continue with the function
      } else {
        console.error("Error during caching:", e);
        // Log other errors that may occur during caching
      }
    }

    return result;
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
  const cacheKey = `topRatedGames-${platform}-${minRating}-${minRatingCount}-${limit}`;
  const cachedData = sessionStorage.getItem(cacheKey);

  if (cachedData) {
    console.log("Using cached data for top rated games");
    return JSON.parse(cachedData);
  }

  const endpoint = "games/";
  const url = `${endpoint}?fields=name, summary, total_rating,total_rating_count,cover.image_id,artworks.*,screenshots.image_id,websites&order=rating:desc&limit=${limit}&platforms=${
    platformIds[platform.toLowerCase()] || platformIds.pc
  }&filter[rating][gt]=${minRating}&filter[rating_count][gt]=${minRatingCount};`;

  try {
    const response = await axiosClient.get(url);
    const topRatedGames = response.data;

    const gamesWithCovers = await fetchGameCoversAndScreenshots(
      topRatedGames,
      platform
    );

    console.log(
      `Top Rated Games with Covers (Rating > ${minRating}, Rating Count > ${minRatingCount}):`,
      gamesWithCovers
    );

    // Attempt to cache the results in sessionStorage
    try {
      sessionStorage.setItem(cacheKey, JSON.stringify(gamesWithCovers));
    } catch (e) {
      if (
        e instanceof DOMException &&
        e.code === DOMException.QUOTA_EXCEEDED_ERR
      ) {
        console.warn("Session storage is full, unable to cache the results");
        // If sessionStorage is full, this warning is logged but the function continues
      } else {
        console.error("Error during caching:", e);
        // Log other caching errors
      }
    }

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

export const getNewGames = async (platform: any, limit: number = 15) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentTimestamp = Math.floor(today.getTime() / 1000);

  const cacheKey = `getNewGames-${platform}-${limit}-${currentTimestamp}`;
  const cachedData = sessionStorage.getItem(cacheKey);

  if (cachedData) {
    console.log("Using cached data for new games:", cacheKey);
    return JSON.parse(cachedData);
  }

  const endpoint = "release_dates/";
  const query = `fields game; where date < ${currentTimestamp}; sort date desc; limit ${limit};`;

  try {
    const response = await axiosClient.post(endpoint, query);
    const newGames = response.data;
    console.log("New Games:", newGames);

    if (!newGames || newGames.length === 0) {
      console.warn("No new games found in the response.");
      return [];
    }

    // Extract game IDs from release dates
    const gameIds = newGames.map((newGame: any) => newGame.game);

    // Fetch detailed game information from the "games/" endpoint
    const gamesResponse = await axiosClient.get(
      `games/${gameIds.join(
        ","
      )}?fields=name,summary,cover.image_id,screenshots.image_id,artworks.*,websites`
    );

    const gamesWithCoversAndScreenshots = await fetchGameCoversAndScreenshots(
      gamesResponse.data,
      platform
    );

    // Attempt to cache the results in sessionStorage
    try {
      sessionStorage.setItem(
        cacheKey,
        JSON.stringify(gamesWithCoversAndScreenshots)
      );
    } catch (e) {
      if (
        e instanceof DOMException &&
        e.code === DOMException.QUOTA_EXCEEDED_ERR
      ) {
        console.warn("Session storage is full, unable to cache the results");
      } else {
        console.error("Error during caching:", e);
      }
    }

    return gamesWithCoversAndScreenshots;
  } catch (error) {
    console.error("Error making request or fetching covers:", error);
    throw error;
  }
};

export const getUpcomingGames = async (platform: any, limit: number = 15) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentTimestamp = Math.floor(today.getTime() / 1000);

  const cacheKey = `getUpcomingGames-${platform}-${limit}-${currentTimestamp}`;
  const cachedData = sessionStorage.getItem(cacheKey);

  if (cachedData) {
    console.log("Using cached data for upcoming games:", cacheKey);
    return JSON.parse(cachedData);
  }

  const endpoint = "release_dates/";
  const query = `fields game; where date > ${currentTimestamp}; sort date asc; limit ${limit};`;

  try {
    const response = await axiosClient.post(endpoint, query);
    const upcomingGames = response.data;
    console.log("Upcoming Games:", upcomingGames);

    if (!upcomingGames || upcomingGames.length === 0) {
      console.warn("No upcoming games found in the response.");
      return [];
    }

    const gameIds = upcomingGames.map((upcomingGame: any) => upcomingGame.game);

    const gamesResponse = await axiosClient.get(
      `games/${gameIds.join(
        ","
      )}?fields=name,summary,cover.image_id,screenshots.image_id,artworks.*,websites`
    );

    const gamesWithCoversAndScreenshots = await fetchGameCoversAndScreenshots(
      gamesResponse.data,
      platform
    );

    try {
      sessionStorage.setItem(
        cacheKey,
        JSON.stringify(gamesWithCoversAndScreenshots)
      );
    } catch (e) {
      if (
        e instanceof DOMException &&
        e.code === DOMException.QUOTA_EXCEEDED_ERR
      ) {
        console.warn("Session storage is full, unable to cache the results");
      } else {
        console.error("Error during caching:", e);
      }
    }

    return gamesWithCoversAndScreenshots;
  } catch (error) {
    console.error("Error making request or fetching covers:", error);
    throw error;
  }
};

export default {
  getGameDetails,
  getTopRatedGames,
  getNewGames,
  getUpcomingGames,
};
