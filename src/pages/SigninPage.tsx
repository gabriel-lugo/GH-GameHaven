import {
  Anchor,
  Box,
  Button,
  Container,
  Flex,
  Group,
  Image,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { signInWithEmailAndPassword } from "firebase/auth";
import { MdOutlineError } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import ghSignin from "../assets/gh-signin.png";
import "../css/SigninPage.css";
import { auth } from "../firebase";

interface FormValues {
  email: string;
  password: string;
}

function SigninPage() {
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (val) =>
        /^\S+@\S+$/.test(val)
          ? null
          : "Make sure you are using mail@mail.com format",
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 7 characters"
          : null,
    },
  });

  const onLogin = async (values: any) => {
    console.log(values);
    console.log("Email:", values.email);
    console.log("Password:", values.password);
    const { email, password } = values;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      navigate("/");
      console.log(user);
    } catch (error) {
      showNotification({
        title: "Authentication Failed",
        message: "Your Email or Password is incorrect! Please try again",
        color: "red",
        icon: <MdOutlineError />,
      });
    }
  };
  return (
    <Container size="xs" mt="xl">
      <Paper
        style={{ background: "#f9f6ee" }}
        radius="md"
        p="xl"
        shadow="md"
        withBorder
      >
        <Text size="lg" fw={500}>
          Welcome to Gamehaven, sign in with
        </Text>

        <Flex justify="center">
          <Image
            mt="lg"
            mb="lg"
            src={ghSignin}
            alt="GH-mascot encouraging the user to register and join the family"
            w={200}
            radius="lg"
          />
        </Flex>

        <form onSubmit={form.onSubmit(onLogin)}>
          <Stack>
            <TextInput
              autoComplete="email"
              withAsterisk
              label="Email"
              placeholder="mail@mail.com"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email}
              radius="md"
            />

            <PasswordInput
              autoComplete="current-password"
              withAsterisk
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={form.errors.password}
              radius="md"
            />
          </Stack>

          <Box mt="md">
            <NavLink to={"/register"} style={{ textDecoration: "none" }}>
              <Anchor component="button" type="button" size="sm">
                New to Gamehaven? Register now.
              </Anchor>
            </NavLink>
          </Box>

          <Group justify="space-between" mt="xl">
            <Button
              type="submit"
              className="signin-button-style"
              fullWidth
              radius="sm"
            >
              Sign in
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}

export default SigninPage;
