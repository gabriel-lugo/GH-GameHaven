import {
  Box,
  Container,
  Divider,
  Image,
  Loader,
  Paper,
  Spoiler,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";
import GHMascot from "../assets/gh_details.png";
import AgeRating from "../components/AgeRating";
import Carousel from "../components/Carousel";
import CoverImage from "../components/CoverImage";
import Gallery from "../components/Gallery";
import GameRating from "../components/RateGame";
import "../css/DetailsPage.css";
import { useGameDetails } from "../utils/DetailsPageUtils";
import { useFavorites } from "../utils/FavoritesUtils";

function DetailsPage() {
  const params = useParams();
  const {
    gameDetails,
    fetchGameDetails,
    getRatingClass,
    isValidDate,
    convertTimestampToDate,
    renderWebsites,
    renderVideoOrImage,
  } = useGameDetails();
  const { handleFavoriteClick, isFavorited } = useFavorites(gameDetails);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const shareUrl = `https://ghgamehaven.netlify.app/game/${params.id}`;

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
      {gameDetails ? (
        <Box>
          <Box className="details-hero">
            {gameDetails.age_ratings && (
              <AgeRating ageRating={gameDetails.age_ratings} />
            )}
            <CoverImage
              gameDetails={gameDetails}
              handleFavoriteClick={handleFavoriteClick}
              isFavorited={isFavorited}
            />

            <Box className="details-title">
              <Title className="title-size" pl={10} order={2}>
                {gameDetails.name}
              </Title>
            </Box>
            <Box className="video-container">
              {gameDetails ? renderVideoOrImage(gameDetails) : <Loader />}
              <Box className="video-overlay"></Box>
            </Box>
            {gameDetails.release_dates &&
            gameDetails.release_dates.length > 0 ? (
              <Box className="game-release-date">
                <Text size="lg">
                  Release Date:{" "}
                  {isValidDate(gameDetails.release_dates[0].date)
                    ? convertTimestampToDate(gameDetails.release_dates[0].date)
                    : "No Date Available"}
                </Text>
              </Box>
            ) : (
              <Box className="game-release-date">
                <Text size="lg">Release Date: Not available</Text>
              </Box>
            )}

            {gameDetails.involved_companies &&
            gameDetails.involved_companies.length > 0 ? (
              <Box className="game-companies">
                <Text>{gameDetails.involved_companies[0].company.name}</Text>
              </Box>
            ) : (
              <Box className="game-companies">
                <Text>No involved companies available</Text>
              </Box>
            )}
          </Box>
          <Box className="top-game-content">
            <Box className="game-modes-section">
              <Box className="detail-section">
                <Box mb="sm" className="left-margin" pl={10}>
                  <Title order={4}>Game Modes</Title>
                  {gameDetails.game_modes &&
                  gameDetails.game_modes.length > 0 ? (
                    gameDetails.game_modes.map((mode, index) => (
                      <Text key={index}>{mode.name}</Text>
                    ))
                  ) : (
                    <Text fs="italic">Not available</Text>
                  )}
                </Box>

                <Box mb="sm" className="left-margin" pl={10}>
                  <Title order={4}>Themes</Title>
                  {gameDetails.themes && gameDetails.themes.length > 0 ? (
                    gameDetails.themes.map((theme, index) => (
                      <Text key={index}>{theme.name}</Text>
                    ))
                  ) : (
                    <Text fs="italic">Not available</Text>
                  )}
                </Box>

                <Box className="left-margin" pl={10}>
                  <Title order={4}>Franchises</Title>
                  {gameDetails.franchises &&
                  gameDetails.franchises.length > 0 ? (
                    gameDetails.franchises.map((franchise, index) => (
                      <Text key={index}>{franchise.name}</Text>
                    ))
                  ) : (
                    <Text fs="italic">Not available</Text>
                  )}
                </Box>
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
              <Box mb="sm" className="responsive-style" pl={10}>
                <Title order={4}>Genres</Title>
                {gameDetails.genres && gameDetails.genres.length > 0 ? (
                  gameDetails.genres.map((genre, index) => (
                    <Text key={index}>{genre.name}</Text>
                  ))
                ) : (
                  <Text fs="italic">Not available</Text>
                )}
              </Box>

              <Box className="responsive-style" pl={10}>
                <Title order={4}>Platforms</Title>
                {gameDetails.platforms && gameDetails.platforms.length > 0 ? (
                  gameDetails.platforms.map((platform, index) => (
                    <Text key={index}>{platform.name}</Text>
                  ))
                ) : (
                  <Text fs="italic">Not available</Text>
                )}
              </Box>
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
              {gameDetails.total_rating_count !== undefined &&
              gameDetails.total_rating_count > 0 ? (
                <Text mt="sm" size="sm">
                  Based on {gameDetails.total_rating_count} ratings
                </Text>
              ) : (
                <Text mt="sm" size="sm" fs="italic">
                  No ratings yet
                </Text>
              )}
              <Box style={{ marginTop: "1.5rem" }}>
                <Paper
                  style={{ background: "#F9F6EE", width: "15rem" }}
                  p="sm"
                  shadow="sm"
                >
                  <Text fw={500} mb="sm" size="sm">
                    Rate {gameDetails.name}
                  </Text>
                  <GameRating gameId={gameDetails.id.toString()} />
                </Paper>
              </Box>
            </Box>
          </Box>
          <Container>
            <Box className="centered-content" mt="md">
              <Box className="margin-box">
                <Title order={4}>Summary</Title>
                {gameDetails.summary ? (
                  <Spoiler
                    maxHeight={70}
                    showLabel="Read More"
                    hideLabel="Hide"
                  >
                    <Text>{gameDetails.summary}</Text>
                  </Spoiler>
                ) : (
                  <Text fs="italic">Not available</Text>
                )}
              </Box>

              <Box className="website-img-layout">
                <Box className="margin-box" mt="xl">
                  <Title mb={"xs"} order={4}>
                    Share
                  </Title>
                  <Box mb={"xl"} className="share-buttons-container">
                    <FacebookShareButton
                      url={shareUrl}
                      title={gameDetails.name}
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <RedditShareButton url={shareUrl} title={gameDetails.name}>
                      <RedditIcon size={32} round />
                    </RedditShareButton>
                    <TwitterShareButton url={shareUrl} title={gameDetails.name}>
                      <XIcon size={32} round />
                    </TwitterShareButton>
                    <LinkedinShareButton url={shareUrl}>
                      <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                    <EmailShareButton
                      url={shareUrl}
                      subject={gameDetails.name}
                      body="Check out this game!"
                    >
                      <EmailIcon size={32} round />
                    </EmailShareButton>
                  </Box>
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
          <Box>
            <Title pl={10} order={4}>
              Gallery
            </Title>
            {gameDetails &&
            (gameDetails.screenshots?.length > 0 ||
              gameDetails.artworks?.length > 0) ? (
              <Gallery
                images={[
                  ...(gameDetails.screenshots?.length > 0
                    ? gameDetails.screenshots.map((s) => ({
                        url: s,
                        altText: `Screenshot of ${gameDetails.name}`,
                      }))
                    : []),
                  ...(gameDetails.artworks?.length > 0
                    ? gameDetails.artworks.map((a) => ({
                        url: a,
                        altText: `Artwork of ${gameDetails.name}`,
                      }))
                    : []),
                ]}
              />
            ) : (
              <Box>
                <Text pl={10}>No Screenshots or Artworks Available</Text>
              </Box>
            )}
          </Box>
          {gameDetails.similar_games && gameDetails.similar_games.length > 0 ? (
            <Box>
              <Title pl={10} mt="md" mb={"md"} order={4}>
                You might also like
              </Title>
              <Container size={"xl"}>
                <Divider color="#262626" />
              </Container>
              <Carousel games={gameDetails.similar_games} />
            </Box>
          ) : (
            <Box>
              <Title pl={10} order={4} mb={"md"} mt={"lg"}>
                You might also like
              </Title>
              <Container size={"xl"}>
                <Divider color="#262626" />
              </Container>
              <Text pl={10} mb={"lg"} mt={"sm"}>
                No Similar Games Available
              </Text>
            </Box>
          )}
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
