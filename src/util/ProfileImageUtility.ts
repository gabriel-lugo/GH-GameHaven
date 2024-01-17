import logo from "../assets/GH-logo.png";
import profile1 from "../assets/profile1.jpg";
import profile2 from "../assets/profile2.jpg";

export const profileImages = [logo, profile1, profile2];

export const getProfileImage = (index: number): string => {
  return profileImages[index];
};
