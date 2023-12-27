import { useState } from "react";
import "../css/Search.css";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container-style">
      <input
        type="text"
        placeholder="Search for a game.."
        value={searchTerm}
        onChange={handleInputChange}
        className="input-style"
      />
    </div>
  );
}

export default Search;
