import {
  Box,
  Button,
  Container,
  Image,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import {
  EmailAuthProvider,
  User,
  reauthenticateWithCredential,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/GH-logo.png";
import "../css/ProfilePage.css";
import { auth } from "../firebase";

function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [newUsername, setNewUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser: User | null) => {
      setUser(authUser);
      if (authUser && authUser.displayName) {
        setNewUsername(authUser.displayName);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSaveChanges = async () => {
    setError(null);

    try {
      if (!currentPassword) {
        setError("Please enter your current password.");
        return;
      }

      if (user && user.email) {
        console.log("Attempting to reauthenticate...");
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );

        await reauthenticateWithCredential(user, credential);

        console.log("Reauthentication successful. Updating profile...");
        await updateProfile(user, {
          displayName: newUsername || user.displayName,
        });

        console.log("Profile updated successfully!");
      }
    } catch (error) {
      setError("Failed to update profile. Please check your current password");
      console.error(error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSaveChanges();
  };

  if (!user) {
    return (
      <Box>
        <Title order={2}>User not logged in</Title>
        <NavLink to="/signin">
          <Button className="button-style">Sign In</Button>
        </NavLink>
      </Box>
    );
  }

  return (
    <Container size={"lg"}>
      <Paper
        className="profile-settings-paper"
        style={{ background: "#f9f6ee" }}
        radius="md"
        p="xl"
        shadow="md"
        mt={"xl"}
        mb={"lg"}
        withBorder
      >
        <Box className="profile-settings-wrapper">
          <Box className="profile-settings-image">
            <Title order={3}>{user.displayName || "Username"}</Title>
            <Image src={logo} w={200} />
            <Button className="button-style">Change Profile Image</Button>
          </Box>
          <Box className="profile-settings-form">
            <form onSubmit={handleSubmit}>
              <Stack>
                <TextInput label="Email" value={user?.email || ""} disabled />
                <TextInput
                  label="Username"
                  value={newUsername}
                  onChange={(event) =>
                    setNewUsername(event.currentTarget.value)
                  }
                />
                <PasswordInput label="New Password" placeholder="●●●●●●●●●●" />
                <PasswordInput
                  required
                  label="Current Password"
                  placeholder="●●●●●●●●●●"
                  value={currentPassword}
                  onChange={(event) =>
                    setCurrentPassword(event.currentTarget.value)
                  }
                />

                <Button className="button-style" fullWidth type="submit">
                  Save Changes
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default ProfilePage;
