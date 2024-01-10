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
import { upperFirst, useToggle } from "@mantine/hooks";
import ghRegister from "../assets/gh-register.png";
import ghSignin from "../assets/gh-signin.png";
import "../css/SigninPage.css";

function SigninPage() {
  const [type, toggle] = useToggle(["sign in", "register"]);
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
          Welcome to Gamehaven, {type} with
        </Text>
        {type === "register" && (
          <Flex justify="center">
            <Image
              mt="lg"
              mb="lg"
              src={ghRegister}
              alt="GH-mascot encouraging the user to register and join the family"
              w={200}
              radius="lg"
            />
          </Flex>
        )}
        {type === "sign in" && (
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
        )}

        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            {type === "register" && (
              <TextInput
                label="Username"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
                radius="md"
                required
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="mail@mail.com"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />

            {type === "register" && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue("terms", event.currentTarget.checked)
                }
              />
            )}
          </Stack>

          <Box mt="md">
            <Anchor
              component="button"
              type="button"
              onClick={() => toggle()}
              size="sm"
            >
              {type === "register"
                ? "Already a member? Sign in here."
                : "New to Gamehaven? Sign up now."}
            </Anchor>
          </Box>

          <Group justify="space-between" mt="xl">
            <Button
              className="signin-button-style"
              fullWidth
              type="submit"
              radius="sm"
            >
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}

export default SigninPage;
