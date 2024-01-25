import {
  Box,
  Container,
  Divider,
  Image,
  Loader,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import GHMascot from "../assets/gh_details.png";
import AgeRating from "../components/AgeRating";
import CoverImage from "../components/CoverImage";
import Franchises from "../components/Franchises";
import GallerySection from "../components/GallerySection";
import GameModes from "../components/GameModes";
import GameSummary from "../components/GameSummary";
import GameTitle from "../components/GameTitle";
import Genres from "../components/Genres";
import InvolvedCompanies from "../components/InvolvedCompanies";
import Platforms from "../components/Platforms";
import RatingSection from "../components/RatingSection";
import ReleaseDate from "../components/ReleaseDate";
import ShareButtons from "../components/ShareButtons";
import SimilarGamesSection from "../components/SimilarGamesSection";
import Themes from "../components/Themes";
import "../css/DetailsPage.css";
import { useGameDetails } from "../utils/DetailsPageUtils";
import { useFavorites } from "../utils/FavoritesUtils";

function DetailsPage() {
  const params = useParams();
  const {
    gameDetails,
    fetchGameDetails,
    renderWebsites,
    renderVideoOrImage,
    isLoading,
  } = useGameDetails();

  const { handleFavoriteClick, isFavorited } = useFavorites(gameDetails);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `GH: Gamehaven - ${gameDetails?.name || "Loading..."}`;
  }, [gameDetails]);

  useEffect(() => {
    if (params.id) {
      const query = parseInt(params.id, 10);
      fetchGameDetails(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <Container className="details-container" p={0} size="xl">
      {isLoading ? (
        <Box className="loader-style">
          <Loader color="orange" size="xl" type="dots" />
          <Text fw={500} size="md">
            Loading...
          </Text>
        </Box>
      ) : gameDetails ? (
        <Box>
          <Box className="details-hero">
            <AgeRating ageRating={gameDetails.age_ratings} />
            <CoverImage
              gameDetails={gameDetails}
              handleFavoriteClick={handleFavoriteClick}
              isFavorited={isFavorited}
            />
            <GameTitle title={gameDetails.name} />
            <Box className="video-container">
              {gameDetails ? renderVideoOrImage(gameDetails) : <Loader />}
              <Box className="video-overlay"></Box>
            </Box>
            <ReleaseDate releaseDates={gameDetails.release_dates} />
            <InvolvedCompanies
              involvedCompanies={gameDetails.involved_companies}
            />
          </Box>

          <Box className="top-game-content">
            <Box className="game-modes-section">
              <Box className="detail-section">
                <GameModes gameModes={gameDetails.game_modes} />
                <Themes themes={gameDetails.themes} />
                <Franchises franchises={gameDetails.franchises} />
              </Box>
            </Box>
            <Divider
              mt="sm"
              mb="sm"
              className={isMobile ? "divider-h" : ""}
              orientation={isMobile ? "horizontal" : "vertical"}
              color="var(--nav-text-color)"
            />
            <Box className="detail-section">
              <Genres genres={gameDetails.genres} />
              <Platforms platforms={gameDetails.platforms} />
            </Box>
            <Divider
              mt="sm"
              mb="sm"
              className={isMobile ? "divider-h" : ""}
              orientation={isMobile ? "horizontal" : "vertical"}
              color="var(--nav-text-color)"
            />
            <RatingSection
              totalRating={gameDetails.total_rating}
              totalRatingCount={gameDetails.total_rating_count}
              gameName={gameDetails.name}
              gameId={gameDetails.id.toString()}
            />
          </Box>

          <Container>
            <Box className="centered-content" mt="md">
              <GameSummary summary={gameDetails.summary} />
              <Box className="website-img-layout">
                <Box className="margin-box" mt="xl">
                  <ShareButtons
                    shareUrl={`https://ghgamehaven.netlify.app/game/${params.id}`}
                    gameName={gameDetails.name}
                  />
                  <Title mb="xs" order={4}>
                    Websites
                  </Title>
                  {renderWebsites(gameDetails.websites)}
                </Box>
                <Image
                  src={GHMascot}
                  alt="A mascot of Gamehaven presenting information about a game."
                  className="gh-mascot-img"
                />
              </Box>
            </Box>
          </Container>

          <GallerySection gameDetails={gameDetails} />
          <SimilarGamesSection similarGames={gameDetails.similar_games} />
        </Box>
      ) : (
        <Box className="loader-style">
          <Loader color="orange" size="xl" type="dots" />
          <Text fw={500} size="md">
            Loading...
          </Text>
        </Box>
      )}
    </Container>
  );
}

export default DetailsPage;
