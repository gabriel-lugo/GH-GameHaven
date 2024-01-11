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
import logo from "../assets/GH-logo.png";
import "../css/ProfilePage.css";

function ProfilePage() {
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
            <Title order={3}>Username</Title>
            <Image src={logo} w={200} />
            <Button className="button-style">Change Profile Image</Button>
          </Box>
          <Box className="profile-settings-form">
            <form>
              <Stack>
                <TextInput label="Email" disabled />
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
