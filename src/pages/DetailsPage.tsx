import {
  Box,
  Button,
  Container,
  Divider,
  Image,
  Loader,
  Spoiler,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { FaWikipediaW } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { LuScroll } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { searchGames } from "../api/igdbApi";
import Carousel from "../components/Carousel";
import Gallery from "../components/Gallery";
import "../css/DetailsPage.css";
import { Game } from "./HomePage";

interface GameDetails {
  name: string;
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
}

function DetailsPage() {
  const [gameDetails, setGameDetails] = useState<GameDetails | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  function renderWebsites(websites: any) {
    if (!websites || websites.length === 0) {
      return <Text>No websites available.</Text>;
    }

    const filteredWebsites = websites.filter((website: any) => {
      const category = website.category; // Assuming there's a 'category' property in each website object
      return category === 1 || category === 2 || category === 3;
    });

    return (
      <div className="website-links-container">
        {filteredWebsites.map((website: any, index: any) => {
          let label = "";
          let IconComponent;
          let iconClass = "website-icon"; // Add a class to the icon

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

  const params = useParams();
  let game = JSON.stringify(params.id);
  console.log("Game: ", game);

  // const game = games.find(game => game.name === params.id);

  useEffect(() => {
    const query = game;
    const platform = "pc";

    searchGames(query, platform)
      .then((gameData) => {
        const game = gameData[0];
        setGameDetails(game);
        console.log("Game Information:", game);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  function convertTimestampToDate(timestamp: any) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  }

  return (
    <Container className="details-container" p={0} size="xl">
      {gameDetails ? (
        <Box>
          <Box className="details-hero">
            <Box className="cover-image-container">
              <Image
                src={gameDetails.cover}
                alt={`Cover of ${gameDetails.name}`}
                className="game-cover-img"
              />
              <Button className="cover-img-btn">Favorite</Button>
            </Box>
            <Box className="details-title">
              <Title className="title-size" pl={10} order={2}>
                {gameDetails.name}
              </Title>
            </Box>
            <Box className="video-container">
              {gameDetails.videos && gameDetails.videos.length > 0 && (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${
                    gameDetails.videos[1]
                      ? gameDetails.videos[1].video_id
                      : gameDetails.videos[0].video_id
                  }?autoplay=1&mute=1&loop=1&playlist=${
                    gameDetails.videos[1]
                      ? gameDetails.videos[1].video_id
                      : gameDetails.videos[0].video_id
                  }`}
                  title="Gameplay Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
              <Box className="video-overlay"></Box>
            </Box>
            {gameDetails.release_dates &&
              gameDetails.release_dates.length > 0 && (
                <Box className="game-release-date">
                  <Text size="lg">
                    First Release Date:{" "}
                    {convertTimestampToDate(gameDetails.release_dates[0].date)}
                  </Text>
                </Box>
              )}

            {gameDetails.involved_companies &&
              gameDetails.involved_companies.length > 0 && (
                <Box className="game-companies">
                  <Text>{gameDetails.involved_companies[0].company.name}</Text>
                </Box>
              )}
          </Box>
          <Box className="top-game-content">
            <Box className="game-modes-section">
              {gameDetails.game_modes && gameDetails.game_modes.length > 0 && (
                <Box className="detail-section">
                  <Box mb="sm" className="left-margin" pl={10}>
                    <Title order={4}>Game Modes</Title>
                    {gameDetails.game_modes.map((mode, index) => (
                      <Text key={index}>{mode.name}</Text>
                    ))}
                  </Box>

                  {gameDetails.platforms &&
                    gameDetails.platforms.length > 0 && (
                      <Box mb="sm" className="left-margin" pl={10}>
                        <Title order={4}>Themes</Title>
                        {gameDetails.themes.map((theme, index) => (
                          <Text key={index}>{theme.name}</Text>
                        ))}
                      </Box>
                    )}

                  {gameDetails.franchises &&
                    gameDetails.franchises.length > 0 && (
                      <Box className="left-margin" pl={10}>
                        <Title order={4}>Franchises</Title>
                        {gameDetails.franchises.map((franchise, index) => (
                          <Text key={index}>{franchise.name}</Text>
                        ))}
                      </Box>
                    )}
                </Box>
              )}
            </Box>
            <Divider
              mt="sm"
              mb="sm"
              className={isMobile ? "divider-h" : ""}
              orientation={isMobile ? "horizontal" : "vertical"}
              color="var(--nav-text-color)"
            />
            <Box className="detail-section">
              {gameDetails.genres && gameDetails.genres.length > 0 && (
                <Box mb="sm" className="responsive-style" pl={10}>
                  <Title order={4}>Genres</Title>
                  {gameDetails.genres.map((genre, index) => (
                    <Text key={index}>{genre.name}</Text>
                  ))}
                </Box>
              )}
              {gameDetails.platforms && gameDetails.platforms.length > 0 && (
                <Box className="responsive-style" pl={10}>
                  <Title order={4}>Platforms</Title>
                  {gameDetails.platforms.map((platform, index) => (
                    <Text key={index}>{platform.name}</Text>
                  ))}
                </Box>
              )}
            </Box>

            <Divider
              mt="sm"
              mb="sm"
              className={isMobile ? "divider-h" : ""}
              orientation={isMobile ? "horizontal" : "vertical"}
              color="var(--nav-text-color)"
            />

            <Box className="rating-section">
              <Text
                className={`rating-color ${getRatingClass(
                  gameDetails.total_rating
                )}`}
              >
                {gameDetails.total_rating === null ||
                gameDetails.total_rating === undefined
                  ? "TBD"
                  : Math.round(gameDetails.total_rating)}
              </Text>
              {gameDetails.total_rating_count &&
                gameDetails.total_rating_count > 0 && (
                  <Text mt="sm" size="sm">
                    Based on {gameDetails.total_rating_count} ratings
                  </Text>
                )}
            </Box>
          </Box>
          <Container>
            <Box className="centered-content" mt="md">
              <Box>
                <Title order={4}>Summary</Title>
                <Spoiler maxHeight={70} showLabel="Read More" hideLabel="Hide">
                  <Text>{gameDetails.summary}</Text>
                </Spoiler>
              </Box>
              <Box className="website-img-layout">
                {gameDetails.websites && (
                  <Box mt="xl" className="detail-section">
                    <Title order={4}>Websites</Title>
                    {renderWebsites(gameDetails.websites)}
                  </Box>
                )}
                <Image
                  src="../../src/assets/gh_details.png"
                  alt="A mascot of Gamehaven presenting information about a game."
                  className="gh-mascot-img"
                />
              </Box>
            </Box>
          </Container>
          <Box>
            <Title pl={10} order={4} mb={"lg"}>
              Gallery
            </Title>
            {gameDetails &&
              gameDetails.screenshots &&
              gameDetails.artworks &&
              gameDetails.screenshots.length > 0 &&
              gameDetails.artworks.length > 0 && (
                <Gallery
                  images={[
                    ...gameDetails.screenshots.map((s) => ({
                      url: s,
                      altText: `Screenshot of ${gameDetails.name}`,
                    })),
                    ...gameDetails.artworks.map((a) => ({
                      url: a,
                      altText: `Artwork of ${gameDetails.name}`,
                    })),
                  ]}
                />
              )}
          </Box>
          {gameDetails.similar_games &&
            gameDetails.similar_games.length > 0 && (
              <Box>
                <Title pl={10} order={4} mt={"lg"}>
                  You might also like
                </Title>
                <Carousel games={gameDetails.similar_games} />
              </Box>
            )}
        </Box>
      ) : (
        <Box>
          <Loader color="orange" size="xl" type="dots" />
        </Box>
      )}
    </Container>
  );
}

export default DetailsPage;
