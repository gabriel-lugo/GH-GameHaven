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
import { showNotification } from "@mantine/notifications";
import { useContext, useEffect, useState } from "react";
import { FaGoogle, FaWikipediaW } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { GiCrownedHeart } from "react-icons/gi";
import { IoHeartOutline } from "react-icons/io5";
import { LuScroll } from "react-icons/lu";
import { MdOutlineError } from "react-icons/md";
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
import { getGameDetails } from "../api/igdbApi";
import Carousel from "../components/Carousel";
import Gallery from "../components/Gallery";
import { BookmarkContext, GameData } from "../context/FavoritesContext";
import "../css/DetailsPage.css";
import { auth } from "../firebase";
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
  id: any;
  rating: any;
}

function DetailsPage() {
  const params = useParams();
  const [gameDetails, setGameDetails] = useState<GameDetails | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showVideo, setShowVideo] = useState(true);
  const { bookmarks, addBookmark, removeBookmark } =
    useContext(BookmarkContext);
  const [userId, setUserId] = useState("");
  const shareUrl = `https://ghgamehaven.netlify.app/game/${params.id}`;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setUserId(user ? user.uid : "");
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `GH: Gamehaven - ${gameDetails?.name || "Loading..."}`;
  }, [gameDetails]);

  const isBookmarked = bookmarks.some(
    (bookmark) => bookmark.id === gameDetails?.id
  );

  const handleBookmarkClick = () => {
    if (!gameDetails) return;

    const gameData: GameData = {
      ...gameDetails,
      userId: userId,
    };

    if (userId) {
      if (isBookmarked) {
        removeBookmark(gameData);
      } else {
        addBookmark(gameData);
      }
    } else {
      showNotification({
        title: "Sign In Needed",
        message: "You need to sign in to favorite a game",
        color: "red",
        icon: <MdOutlineError />,
      });
    }
  };

  useEffect(() => {
    setShowVideo(true);
  }, [gameDetails]);

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

  function renderVideoOrImage(gameDetails: any) {
    const handleFallbackClick = () => {
      setShowVideo(false);
    };

    if (showVideo && gameDetails.videos && gameDetails.videos.length > 0) {
      const videoId = gameDetails.videos[0].video_id;
      return (
        <Box>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&cc_load_policy=0&playlist=${videoId}`}
            title="Gameplay Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <Button
            variant="light"
            style={{ zIndex: "5" }}
            onClick={handleFallbackClick}
            className="fallback-button"
          >
            Switch to image background
          </Button>
        </Box>
      );
    } else {
      const imageUrl =
        gameDetails.screenshots?.[0] ||
        gameDetails.artworks?.[0] ||
        "https://github.com/gabriel-lugo/GH-GameHaven/assets/117975295/03761a65-0542-4764-8997-9b5b705c45b3";
      return (
        <Image
          src={imageUrl}
          alt={`Image of ${gameDetails.name}`}
          className="game-image-overlay"
        />
      );
    }
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

  function isValidDate(d: any) {
    return d && !isNaN(new Date(d).getTime());
  }

  useEffect(() => {
    if (params.id) {
      const query = parseInt(params.id, 10); // Convert the ID to a number
      const platform = "pc";

      getGameDetails(query, platform)
        .then((gameData) => {
          const game = gameData[0];
          setGameDetails(game);
          console.log("Game Information:", game);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [params.id]);

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
              <Button
                className="cover-img-btn"
                onClick={handleBookmarkClick}
                style={{
                  backgroundColor: isBookmarked ? "#E3735E" : "#f2c341",
                  color: isBookmarked ? "#FFF" : "#262626",
                }}
              >
                {isBookmarked ? (
                  <>
                    <GiCrownedHeart style={{ marginRight: "8px" }} /> Unfavorite
                  </>
                ) : (
                  <>
                    <IoHeartOutline style={{ marginRight: "8px" }} /> Favorite
                  </>
                )}
              </Button>
            </Box>
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
                  src="../../src/assets/gh_details.png"
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
              <Text pl={10} mb={"lg"}>
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
