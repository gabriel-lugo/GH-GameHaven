import defaultProfile from "../assets/defaultProfile.jpg";
import profile1 from "../assets/profile1.jpg";
import profile2 from "../assets/profile2.jpg";

export const profileImages = [defaultProfile, profile1, profile2];

export const getProfileImage = (index: number): string => {
  return profileImages[index];
};
