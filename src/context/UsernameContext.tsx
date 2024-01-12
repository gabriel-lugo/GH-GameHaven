import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface UsernameContextValue {
  username: string;
  setNewUsername: (newUsername: string) => void;
}

export const UsernameContext = createContext<UsernameContextValue>({
  username: "",
  setNewUsername: () => {},
});

export const UsernameProvider = ({ children }: Props) => {
  const [username, setUsername] = useState("");

  const setNewUsername = (newUsername: string) => {
    setUsername(newUsername);
  };

  return (
    <UsernameContext.Provider value={{ username, setNewUsername }}>
      {children}
    </UsernameContext.Provider>
  );
};
