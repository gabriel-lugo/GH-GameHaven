import { Input } from "@mantine/core";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import "../css/Search.css";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(window.innerWidth > 768);
  const [isScreenWidthSmall, setIsScreenWidthSmall] = useState(
    window.innerWidth <= 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsInputVisible(window.innerWidth > 768);
      setIsScreenWidthSmall(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleInputChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const toggleInputVisibility = () => {
    setIsInputVisible(!isInputVisible);
  };

  const handleIconClick = (event: any) => {
    event.stopPropagation();
    toggleInputVisibility();
  };

  return (
    <div className={`container-style ${isInputVisible ? "input-visible" : ""}`}>
      {isInputVisible ? (
        <Input
          onClick={handleIconClick}
          leftSection={isScreenWidthSmall ? <RxCrossCircled /> : null}
          rightSection={
            <div className="icon-wrapper">
              <IoIosSearch size={25} />
            </div>
          }
          type="search"
          placeholder="Search for a game.."
          value={searchTerm}
          onChange={handleInputChange}
        />
      ) : (
        <div className="icon-only" onClick={toggleInputVisibility}>
          <IoIosSearch size={25} />
        </div>
      )}
    </div>
  );
}

export default Search;
