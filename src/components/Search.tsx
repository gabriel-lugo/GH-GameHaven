import { Box, Button, Paper, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import { searchForGames } from "../api/igdbApi";
import "../css/Search.css";

interface Game {
  id: number;
  name: string;
}

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isEnterPressed, setIsEnterPressed] = useState(false);
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [isInputVisible, setIsInputVisible] = useState(window.innerWidth > 768);
  const [isScreenWidthSmall, setIsScreenWidthSmall] = useState(
    window.innerWidth <= 768
  );

  const handleGameSelect = () => {
    setSearchResults([]);
    setSearchTerm("");
  };

  useEffect(() => {
    let previousWidth = window.innerWidth;

    const handleResize = () => {
      if (window.innerWidth !== previousWidth) {
        setIsInputVisible(window.innerWidth > 768);
        setIsScreenWidthSmall(window.innerWidth <= 768);
        previousWidth = window.innerWidth;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();

  const handleInputChange = async (event: any) => {
    const query = event.target.value;
    setSearchTerm(query);

    if (event.key === "Enter") {
      setIsEnterPressed(true);
      setSearchResults([]);
      setSearchTerm("");

      if (query.length > 0) {
        navigate(`/search-results/${query}`);
      }
    } else if (query.length > 1) {
      try {
        const results = await searchForGames(query, [
          "playstation",
          "xbox",
          "pc",
          "nintendo Switch",
          "n64",
          "nes",
          "snes",
          "gcn",
        ]);
        setSearchResults(results);
      } catch (error) {
        console.error("Search error:", error);
      }
    } else {
      setIsEnterPressed(false);
    }
  };

  const handleMobileInputChange = async () => {
    if (searchTerm.length > 0) {
      navigate(`/search-results/${searchTerm}`);
      setSearchResults([]);
      setSearchTerm("");
    }
  };

  const toggleInputVisibility = () => {
    setIsInputVisible(!isInputVisible);
  };

  return (
    <Box className={`container-style ${isInputVisible ? "input-visible" : ""}`}>
      {isInputVisible ? (
        <>
          <TextInput
            variant="filled"
            className="input-width"
            rightSection={
              isScreenWidthSmall ? (
                <Box className="icon-wrapper" onClick={toggleInputVisibility}>
                  <RxCrossCircled className="cross-icon" size={25} />
                  <Button
                    onClick={handleMobileInputChange}
                    className="btn-mobile"
                    variant="xs"
                  >
                    <GoSearch size={18} />
                  </Button>
                </Box>
              ) : (
                <IoIosSearch size={25} />
              )
            }
            type="search"
            placeholder="Search for a game.."
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleInputChange}
          />
          {!isEnterPressed && searchResults.length > 0 && (
            <Paper
              withBorder
              className="dropdown-search"
              shadow="lg"
              radius="xs"
              pl="sm"
            >
              {searchResults.map((game, index) => (
                <NavLink
                  onClick={handleGameSelect}
                  to={`/game/${game.id}`}
                  className="game-link"
                >
                  <Box style={{ height: "auto" }}>
                    <Text mt="xs" mb="xs" className="text-hover" key={index}>
                      {game.name}
                    </Text>
                  </Box>
                </NavLink>
              ))}
            </Paper>
          )}
        </>
      ) : (
        <Box className="icon-only" onClick={toggleInputVisibility}>
          <IoIosSearch size={25} />
        </Box>
      )}
    </Box>
  );
}

export default Search;
