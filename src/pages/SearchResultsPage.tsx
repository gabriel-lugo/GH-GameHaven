import { Box, Divider, Image, Paper, Text, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { searchForGames } from "../api/igdbApi";
import "../css/SearchResultsPage.css";
import { Game } from "./HomePage";

function SearchResultsPage() {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState<Game[]>([]);

  const handleGameSelect = () => {
    setSearchResults([]);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        try {
          const results = await searchForGames(query, [
            "playstation",
            "xbox",
            "pc",
            "nintendo",
            "n64",
            "nes",
            "snes",
            "gcn",
          ]);
          setSearchResults(results);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <Box>
      <Title pl={10} mt="md" mb="md" order={2}>
        Search Results for: {query}
      </Title>
      {searchResults.length > 0 ? (
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
                      fallbackSrc="https://github.com/gabriel-lugo/GH-GameHaven/assets/117975295/03250a04-e515-4fd2-901d-89f4951b75a6"
                      style={{
                        width: "50px",
                        height: "auto",
                        marginRight: "10px",
                      }}
                    />
                  )}
                  <Text className="text-underline-hover" mb="xs">
                    {game.name}
                  </Text>
                </Box>
              </NavLink>
              {index < searchResults.length - 1 && <Divider my="sm" />}
            </React.Fragment>
          ))}
        </Paper>
      ) : (
        <Text pl={10}>No results found</Text>
      )}
    </Box>
  );
}
export default SearchResultsPage;
