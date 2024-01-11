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
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import logo from "../assets/GH-logo.png";
import "../css/ProfilePage.css";
import { auth } from "../firebase";

interface FirebaseUser {
  uid: string;
  email: string;
  displayName?: string;
}

function ProfilePage() {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser: User | null) => {
      // Convert 'authUser' to 'FirebaseUser' type
      const firebaseUser: FirebaseUser | null = authUser
        ? {
            uid: authUser.uid,
            email: authUser.email || "",
            displayName: authUser.displayName || "",
          }
        : null;

      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return <Title order={2}>User not logged in</Title>;
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
            <Title order={3}>{user.email || "Username"}</Title>
            <Image src={logo} w={200} />
            <Button className="button-style">Change Profile Image</Button>
          </Box>
          <Box className="profile-settings-form">
            <form>
              <Stack>
                <TextInput label="Email" value={user.email} disabled />
                <TextInput label="Username" />
                <PasswordInput label="New Password" placeholder="●●●●●●●●●●" />
                <PasswordInput
                  required
                  label="Current Password"
                  placeholder="●●●●●●●●●●"
                />
                <Button className="button-style" fullWidth>
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
