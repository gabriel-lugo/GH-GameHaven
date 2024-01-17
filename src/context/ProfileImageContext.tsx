import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface ProfileImageContextValue {
  selectedProfileImage: number;
  updateSelectedProfileImage: (index: number) => void;
}

export const ProfileImageContext = createContext<ProfileImageContextValue>({
  selectedProfileImage: 1,
  updateSelectedProfileImage: () => {},
});

export const ProfileImageProvider = ({ children }: Props) => {
  const [selectedProfileImage, setSelectedProfileImage] = useState<number>(1);

  const updateSelectedProfileImage = (index: number) => {
    console.log("Updating selected profile image with context: ", index);
    setSelectedProfileImage(index);
  };

  console.log("Selected profile image in context: ", selectedProfileImage);

  return (
    <ProfileImageContext.Provider
      value={{
        selectedProfileImage,
        updateSelectedProfileImage,
      }}
    >
      {children}
    </ProfileImageContext.Provider>
  );
};
