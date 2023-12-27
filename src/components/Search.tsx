import { Input } from "@mantine/core";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import "../css/Search.css";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsInputVisible(window.innerWidth > 768);
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

  return (
    <div className="container-style">
      {isInputVisible && (
        <Input
          rightSection={
            <div className="icon-wrapper" onClick={toggleInputVisibility}>
              <IoIosSearch size={25} />
            </div>
          }
          type="search"
          placeholder="Search for a game.."
          value={searchTerm}
          onChange={handleInputChange}
          className="input-style"
        />
      )}
      {!isInputVisible && (
        <div className="icon-only" onClick={toggleInputVisibility}>
          <IoIosSearch size={25} />
        </div>
      )}
    </div>
  );
}

export default Search;
