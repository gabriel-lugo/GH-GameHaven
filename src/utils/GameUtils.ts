import { useState } from "react";
import { getGameDetails } from "../api/igdbApi";
import { Game } from "../pages/HomePage";

export interface GameDetails {
  name: string;
  age_ratings: string;
  summary: string;
  themes: Array<{ name: string }>;
  franchises: Array<{ name: string }>;
  release_dates: Array<{ date: string }>;
  involved_companies: Array<{ company: { name: string } }>;
  game_modes: Array<{ name: string }>;
  artworks: Array<any>;
  genres: Array<{ name: string }>;
  websites: Array<any>;
  videos: Array<any>;
  total_rating: number;
  total_rating_count: number;
  platforms: Array<{ name: string }>;
  similar_games: Array<Game>;
  cover: string;
  screenshots: Array<{ url: string }>;
  id: any;
  rating: any;
}

export function useGameDetails() {
  const [gameDetails, setGameDetails] = useState<GameDetails | null>(null);

  const fetchGameDetails = (gameId: number) => {
    getGameDetails(gameId, "pc")
      .then((gameData) => {
        const game: GameDetails = gameData[0];
        setGameDetails(game);
        console.log("Game Information:", game);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getRatingClass = (rating: number) => {
    if (rating === null || rating === undefined) {
      return "rating-color-tbd";
    } else if (rating >= 75) {
      return "rating-color-high";
    } else if (rating >= 50) {
      return "rating-color-medium";
    } else {
      return "rating-color-low";
    }
  };

  return { gameDetails, fetchGameDetails, getRatingClass };
}
