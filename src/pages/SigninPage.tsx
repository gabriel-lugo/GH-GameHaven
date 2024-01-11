import {
  Anchor,
  Box,
  Button,
  Checkbox,
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ghSignin from "../assets/gh-signin.png";
import "../css/SigninPage.css";
import { auth } from "../firebase";

function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const onLogin = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
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

        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="mail@mail.com"
              // value={form.values.email}
              onChange={(e) => setEmail(e.target.value)}
              error={form.errors.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              // value={form.values.password}
              onChange={(e) => setPassword(e.target.value)}
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />

            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
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
              className="signin-button-style"
              fullWidth
              type="submit"
              radius="sm"
              onClick={onLogin}
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
