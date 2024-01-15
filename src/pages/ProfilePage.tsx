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
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { MdOutlineError, MdThumbUp } from "react-icons/md";
import { NavLink } from "react-router-dom";
import logo from "../assets/GH-logo.png";
import profile1 from "../assets/profile1.jpg";
import "../css/ProfilePage.css";
import { auth, db } from "../firebase";
import profile2 from "./../assets/profile2.jpg";

interface FormValues {
  name: string;
  newPassword: string;
  currentPassword: string;
}

function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedProfileImage, setSelectedProfileImage] = useState<number>(1);
  const [error, setError] = useState<string>("");

  const profileImages = [logo, profile1, profile2];

  const form = useForm<FormValues>({
    initialValues: {
      // email: "",
      name: "",
      newPassword: "",
      currentPassword: "",
    },

    validate: {
      name: (val) =>
        val.length <= 1
          ? "Username should include at least 2 characters"
          : null,
      newPassword: (val) => {
        if (form.values.newPassword.trim() === "") {
          return null;
        }

        return val.length <= 6
          ? "Password should include at least 7 characters"
          : null;
      },
      currentPassword: (val) =>
        val.length === 0 ? "Please enter your current password." : null,
    },
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser: User | null) => {
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProfileImageId = async () => {
      try {
        if (user) {
          const userRef = doc(db, "users", user.uid);
          const userSnapshot = await getDoc(userRef);
          const userData = userSnapshot.data();
          if (userData && userData.profileImageId !== undefined) {
            setSelectedProfileImage(userData.profileImageId - 1);
          }
        }
      } catch (error) {
        console.error("Error fetching profile image id:", error);
      }
    };

    fetchProfileImageId();
  }, [user]);

  const onSubmit = async () => {
    try {
      if (!form.values.currentPassword) {
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

        if (form.values.name.length < 2) {
          return;
        }

        await updateProfile(user, {
          displayName: form.values.name,
        });

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          username: form.values.name,
        });

        console.log(
          "Updated display name and Firestore document:",
          form.values.name
        );

        if (form.values.newPassword) {
          console.log("Updating password...");
          await updatePassword(user, form.values.newPassword);
          console.log("Password updated successfully!");
        }

        form.setFieldValue("currentPassword", "");

        showNotification({
          title: "Profile updated successfully!",
          message: "Your profile has been updated successfully.",
          color: "green",
          icon: <MdThumbUp />,
        });

        console.log("Profile updated successfully!");
      }
    } catch (error) {
      showNotification({
        title: "Failed to update profile!",
        message: "Please check your current password.",
        color: "red",
        icon: <MdOutlineError />,
      });
      console.error(error);
    }
  };

  const handleSaveProfileImage = async () => {
    try {
      if (user) {
        console.log("Updating profile image...");

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          profileImageId: selectedProfileImage + 1,
        });

        showNotification({
          title: "Profile image updated successfully!",
          message: "Your profile image has been updated successfully.",
          color: "green",
          icon: <MdThumbUp />,
        });

        console.log("Profile image updated successfully!");
      }
    } catch (error) {
      setError("Failed to update profile image. Please try again.");
      showNotification({
        title: "Failed to update profile image!",
        message: "Please try again.",
        color: "red",
        icon: <MdOutlineError />,
      });
      console.error(error);
    }
  };

  const handleSelectProfileImage = (index: number) => {
    setSelectedProfileImage(index);
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
            <Image src={profileImages[selectedProfileImage]} w={200} />
            <Box className="profile-settings-thumbnails">
              {profileImages.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  w={65}
                  className="profile-thumbnail"
                  onClick={() => handleSelectProfileImage(index)}
                />
              ))}
            </Box>
            <Button className="button-style" onClick={handleSaveProfileImage}>
              Save Profile Image
            </Button>
            {error && <div style={{ color: "red" }}>{error}</div>}
          </Box>
          <Box className="profile-settings-form">
            <form onSubmit={form.onSubmit(onSubmit)}>
              <Stack>
                <TextInput label="Email" value={user?.email || ""} disabled />
                <TextInput
                  label="Username"
                  name="name"
                  placeholder={user?.displayName || "Your name"}
                  value={form.values.name}
                  onChange={(event) =>
                    form.setFieldValue("name", event.currentTarget.value)
                  }
                  error={form.errors.name}
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
                  withAsterisk
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
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default ProfilePage;
