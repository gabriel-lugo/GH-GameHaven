import profile1 from "../assets/profile1.jpg";
import profile2 from "../assets/profile2.jpg";
import profile3 from "../assets/profile3.jpg";
import profile4 from "../assets/profile4.jpg";
import profile5 from "../assets/profile5.jpg";
import profile6 from "../assets/profile6.jpg";
import profile7 from "../assets/profile7.jpg";
import profile8 from "../assets/profile8.jpg";
import profile9 from "../assets/profile9.jpg";
import profileDefault from "../assets/profiledefault.jpg";

export const profileImages = [profileDefault, profile1, profile2, profile3, profile4, profile5, profile6, profile7, profile8, profile9];

export const getProfileImage = (index: number): string => {
  return profileImages[index];
};
