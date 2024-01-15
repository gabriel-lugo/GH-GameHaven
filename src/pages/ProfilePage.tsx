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
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import {
  EmailAuthProvider,
  User,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { MdOutlineError, MdThumbUp } from "react-icons/md";
import { NavLink } from "react-router-dom";
import logo from "../assets/GH-logo.png";
import "../css/ProfilePage.css";
import { auth } from "../firebase";

interface FormValues {
  email: string;
  name: string;
  newPassword: string;
  currentPassword: string;
}

function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    initialValues: {
      email: "",
      name: "",
      newPassword: "",
      currentPassword: "",
    },

    validate: {
      name: (val) =>
        val.length < 2 ? "Username should include at least 2 characters" : null,
      email: (val) =>
        /^\S+@\S+$/.test(val)
          ? null
          : "Make sure you are using mail@mail.com format",
      newPassword: (val) =>
        val.length < 7 ? "Password should include at least 7 characters" : null,
      currentPassword: (val) =>
        val.length === 0 ? "Please enter your current password." : null,
    },
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser: User | null) => {
      setUser(authUser);
      if (authUser && authUser.displayName) {
        form.values.name = authUser.displayName;
      }
    });

    return () => unsubscribe();
  }, [form]);

  const handleSaveChanges = async () => {
    setError(null);

    try {
      if (!form.values.currentPassword) {
        setError("Please enter your current password.");
        return;
      }

      if (user && user.email) {
        console.log("Attempting to reauthenticate...");
        const credential = EmailAuthProvider.credential(
          user.email,
          form.values.currentPassword
        );

        await reauthenticateWithCredential(user, credential);

        console.log("Reauthentication successful. Updating profile...");
        await updateProfile(user, {
          displayName: form.values.name || user.displayName,
        });

        if (form.values.newPassword) {
          console.log("Updating password...");
          await updatePassword(user, form.values.newPassword);
          console.log("Password updated successfully!");
        }

        showNotification({
          title: "Profile updated successfully!",
          message: "Your profile has been updated successfully.",
          color: "green",
          icon: <MdThumbUp />,
        });

        console.log("Profile updated successfully!");
      }
    } catch (error) {
      setError("Failed to update profile. Please check your current password");
      showNotification({
        title: "Failed to update profile!",
        message: "Please check your current password.",
        color: "red",
        icon: <MdOutlineError />,
      });
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
                  placeholder="Your name"
                  value={form.values.name}
                  onChange={(event) =>
                    form.setFieldValue("name", event.currentTarget.value)
                  }
                  error={form.errors.name}
                  radius="md"
                />
                <PasswordInput
                  label="New Password"
                  placeholder="●●●●●●●●●●"
                  value={form.values.newPassword}
                  onChange={(event) =>
                    form.setFieldValue("newPassword", event.currentTarget.value)
                  }
                  error={form.errors.newPassword}
                  radius="md"
                />
                <PasswordInput
                  label="Current Password"
                  placeholder="●●●●●●●●●●"
                  value={form.values.currentPassword}
                  onChange={(event) =>
                    form.setFieldValue(
                      "currentPassword",
                      event.currentTarget.value
                    )
                  }
                  error={form.errors.currentPassword}
                  radius="md"
                />

                <Button className="button-style" fullWidth type="submit">
                  Save Changes
                </Button>
              </Stack>
            </form>
            {error && <div style={{ color: "red" }}>{error}</div>}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default ProfilePage;
