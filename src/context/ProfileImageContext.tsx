import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebase";

interface Props {
  children: React.ReactNode;
}

interface ProfileImageContextValue {
  selectedProfileImage: number;
  updateSelectedProfileImage: (index: number) => void;
}

export const ProfileImageContext = createContext<ProfileImageContextValue>({
  selectedProfileImage: 0,
  updateSelectedProfileImage: () => {},
});

export const ProfileImageProvider = ({ children }: Props) => {
  const [selectedProfileImage, setSelectedProfileImage] = useState<number>(0);

  const updateSelectedProfileImage = (index: number) => {
    setSelectedProfileImage(index);
  };

  useEffect(() => {
    const fetchProfileImageIndex = async () => {
      const userId = "userId";

      try {
        const userRef = doc(db, "users", userId);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          const profileImageIndex = userData.profileImageId || 0;
          updateSelectedProfileImage(profileImageIndex);
        }
      } catch (error) {
        console.error("Error fetching profile image index:", error);
      }
    };

    fetchProfileImageIndex();
  }, []);

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
