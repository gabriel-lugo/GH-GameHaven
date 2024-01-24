import pegi12 from "../assets/PEGI/PEGI_12.svg";
import pegi16 from "../assets/PEGI/PEGI_16.svg";
import pegi18 from "../assets/PEGI/PEGI_18.svg";
import pegi3 from "../assets/PEGI/PEGI_3.svg";
import pegi7 from "../assets/PEGI/PEGI_7.svg";
import unknown from "../assets/PEGI/PEGI_unknown.png";

export const pegiImages = [pegi3, pegi7, pegi12, pegi16, pegi18, unknown];

export const getPegiImage = (ageRating: string): string => {
  switch (ageRating) {
    case "PEGI 3":
      return pegi3;
    case "PEGI 7":
      return pegi7;
    case "PEGI 12":
      return pegi12;
    case "PEGI 16":
      return pegi16;
    case "PEGI 18":
      return pegi18;
    default:
      return unknown;
  }
};
