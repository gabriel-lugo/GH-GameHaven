import {
  Badge,
  Box,
  Divider,
  Image,
  Loader,
  Pagination,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { searchForGames } from "../api/igdbApi";
import logo from "../assets/GH-logo.png";
import nogames from "../assets/no-games-available.png";
import "../css/SearchResultsPage.css";
import { Game } from "./HomePage";

function SearchResultsPage() {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = `GH: Gamehaven - Search Results for ${query || ""}`;
    window.scrollTo(0, 0);
  }, [query]);

  const handleGameSelect = () => {
    setSearchResults([]);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      if (query) {
        try {
          const results = await searchForGames(
            query,
            [
              "playstation",
              "xbox",
              "pc",
              "nintendo Switch",
              "n64",
              "nes",
              "snes",
              "gamecube",
            ],
            currentPage
          );
          setSearchResults(results);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, currentPage]);

  function convertTimestampToDate(timestamp: any) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  }

  function getReleaseDate(game: any) {
    if (
      game.release_dates &&
      game.release_dates.length > 0 &&
      game.release_dates[0].date
    ) {
      return convertTimestampToDate(game.release_dates[0].date);
    }
    return "No Date Available";
  }

  return (
    <Box>
      <Title pl={10} mt="md" mb="md" order={3}>
        Search Results for: {query}
      </Title>
      {isLoading ? (
        <Box className="loader-style">
          <Loader color="orange" size="xl" type="dots" />
          <Text fw={500} size="md">
            Loading...
          </Text>
        </Box>
      ) : searchResults.length > 0 ? (
        <Paper
          style={{ background: "#F9F6EE" }}
          withBorder
          shadow="lg"
          radius="xs"
          pl="sm"
        >
          {searchResults.map((game, index) => (
            <React.Fragment key={index}>
              <NavLink
                onClick={handleGameSelect}
                to={`/game/${game.id}`}
                className="game-link"
                key={index}
              >
                <Box style={{ display: "flex", alignItems: "center" }}>
                  {game.cover && (
                    <Image
                      mt="sm"
                      mb="md"
                      src={game.cover}
                      alt={game.name}
                      fallbackSrc={logo}
                      style={{
                        width: "50px",
                        height: "auto",
                        marginRight: "10px",
                      }}
                    />
                  )}
                  <Box>
                    <Text className="text-underline-hover" mb="xs">
                      {game.name}
                    </Text>
                    <Text size="xs">Release Date: {getReleaseDate(game)}</Text>
                  </Box>
                </Box>
                {game.platforms && game.platforms.length > 0 ? (
                  game.platforms.map((platform, index) => (
                    <Badge
                      color="#f2c341"
                      autoContrast
                      mr="sm"
                      size="xs"
                      key={index}
                    >
                      {platform.name}
                    </Badge>
                  ))
                ) : (
                  <Text fs="italic">Not available</Text>
                )}
              </NavLink>
              {index < searchResults.length - 1 && <Divider my="sm" />}
            </React.Fragment>
          ))}
          <Box
            mt={"lg"}
            mb={"xl"}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pagination
              color="#f2c341"
              value={currentPage}
              onChange={handlePageChange}
              total={4}
            />
          </Box>
        </Paper>
      ) : (
        <>
          <Text fw={"500"} size="xl" ta="center" mt="lg">
            No more games available for this search.
          </Text>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              ta="center"
              mt="lg"
              maw={500}
              src={nogames}
              alt="No more games available for this search"
            />
          </Box>
          <Text size="lg" mt={"xl"} ta="center">
            Use pagination to go back
          </Text>
          <Box
            mt={"lg"}
            mb={"xl"}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pagination
              color="#f2c341"
              value={currentPage}
              onChange={handlePageChange}
              total={4}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
export default SearchResultsPage;
