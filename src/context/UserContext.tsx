import { createContext, useState } from "react";

interface User {
  uid: string;
  email: string | null;
  displayName: string;
  profileImage: number;
}

interface Props {
  children: React.ReactNode;
}

interface UserContextValue {
  user: User | null;
  selectedProfileImage: number;
  updateUser: (newUser: User) => void;
  updateSelectedProfileImage: (index: number) => void;
}

export const UserContext = createContext<UserContextValue>({
  user: null,
  selectedProfileImage: 1,
  updateUser: () => {},
  updateSelectedProfileImage: () => {},
});

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedProfileImage, setSelectedProfileImage] = useState<number>(1);

  const updateUser = (newUser: User) => {
    console.log("Updating user with context: ", newUser);
    setUser(newUser);
  };

  const updateSelectedProfileImage = (index: number) => {
    console.log("Updating selected profile image with context: ", index);
    setSelectedProfileImage(index);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        selectedProfileImage,
        updateUser,
        updateSelectedProfileImage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
