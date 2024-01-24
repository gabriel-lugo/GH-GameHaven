import { Box, Text } from "@mantine/core";
import { useState } from "react";
import { FaGoogle, FaWikipediaW } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { LuScroll } from "react-icons/lu";
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

  function isValidDate(d: any) {
    return d && !isNaN(new Date(d).getTime());
  }

  function convertTimestampToDate(timestamp: any) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  }

  function renderWebsites(websites: any) {
    if (!websites || websites.length === 0) {
      return (
        <a
          href={`https://www.google.com/search?q=${encodeURIComponent(
            gameDetails?.name || ""
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="website-link"
        >
          <div className="website-links-container">
            <Box className="website-icon-container">
              <FaGoogle />
            </Box>
            <Text>See Google results</Text>
          </div>
        </a>
      );
    }

    const filteredWebsites = websites.filter((website: any) => {
      const category = website.category;
      return category === 1 || category === 2 || category === 3;
    });

    if (!filteredWebsites || filteredWebsites.length === 0) {
      return (
        <a
          href={`https://www.google.com/search?q=${encodeURIComponent(
            gameDetails?.name || ""
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="website-link"
        >
          <div className="website-links-container">
            <Box className="website-icon-container">
              <FaGoogle />
            </Box>
            <Text>See Google results</Text>
          </div>
        </a>
      );
    }

    return (
      <div className="website-links-container">
        {filteredWebsites.map((website: any, index: any) => {
          let label = "";
          let IconComponent;
          const iconClass = "website-icon";

          switch (website.category) {
            case 1:
              label = "Official Website";
              IconComponent = <FiExternalLink className={iconClass} />;
              break;
            case 2:
              label = "Community Wiki";
              IconComponent = <LuScroll className={iconClass} />;
              break;
            case 3:
              label = "Wikipedia";
              IconComponent = <FaWikipediaW className={iconClass} />;
              break;
            default:
              label = "Unknown Category";
              IconComponent = <FaWikipediaW className={iconClass} />;
          }

          return (
            <a
              href={website.url}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="website-link"
            >
              <Box className="website-icon-container">{IconComponent}</Box>
              <Text>{label}</Text>
            </a>
          );
        })}
      </div>
    );
  }

  return {
    gameDetails,
    fetchGameDetails,
    getRatingClass,
    isValidDate,
    convertTimestampToDate,
    renderWebsites,
  };
}
