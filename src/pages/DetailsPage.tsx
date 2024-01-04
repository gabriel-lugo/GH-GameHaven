import { Box, Container, Loader, Spoiler, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { searchGames } from "../api/igdbApi";
import Carousel from "../components/Carousel";
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
}

function DetailsPage() {
  const [gameDetails, setGameDetails] = useState<GameDetails | null>(null);

  function renderWebsites(websites: any) {
    if (!websites || websites.length === 0) {
      return <Text>No websites available.</Text>;
    }

    return websites.map((website: any, index: any) => (
      <a
        href={website.url}
        key={index}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Text>{website.name || website.url}</Text>
      </a>
    ));
  }

  useEffect(() => {
    const query = "The Witcher";
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
          <Box className="center-content">
            {gameDetails.genres && gameDetails.genres.length > 0 && (
              <Box className="detail-section">
                <Title order={4}>Genres:</Title>
                {gameDetails.genres.map((genre, index) => (
                  <Text key={index}>{genre.name}</Text>
                ))}
              </Box>
            )}
            {gameDetails.platforms && gameDetails.platforms.length > 0 && (
              <Box className="detail-section">
                <Title order={4}>Platforms:</Title>
                {gameDetails.platforms.map((platform, index) => (
                  <Text key={index}>{platform.name}</Text>
                ))}
              </Box>
            )}
          </Box>
          <Box mt="md" pl={10}>
            <Spoiler maxHeight={55} showLabel="Read More" hideLabel="Hide">
              <Text>{gameDetails.summary}</Text>
            </Spoiler>
            {gameDetails.websites && (
              <Box className="detail-section">
                <Title order={4}>Websites:</Title>
                {renderWebsites(gameDetails.websites)}
              </Box>
            )}
          </Box>
          {gameDetails.platforms && gameDetails.platforms.length > 0 && (
            <Box pl={10}>
              <Title order={2} size="lg">
                Themes:
              </Title>
              {gameDetails.themes.map((theme, index) => (
                <Text key={index}>{theme.name}</Text>
              ))}
            </Box>
          )}
          {gameDetails.franchises && gameDetails.franchises.length > 0 && (
            <Box pl={10}>
              <Title order={2} size="lg">
                Franchises:
              </Title>
              {gameDetails.franchises.map((franchise, index) => (
                <Text key={index}>{franchise.name}</Text>
              ))}
            </Box>
          )}
          {gameDetails.similar_games &&
            gameDetails.similar_games.length > 0 && (
              <Box>
                <Title order={2}>Similar Games:</Title>
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
