import {
  Box,
  Button,
  Container,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { GrLocation } from "react-icons/gr";
import { MdOutlineAlternateEmail } from "react-icons/md";
import contactUs from "../assets/gh-contact.png";
import "../css/ContactPage.css";

function ContactPage() {
  const form = useForm({
    initialValues: { name: "", email: "", subject: "", message: "" },

    validate: {
      name: (value) =>
        value.length < 2 ? "Your name needs at least 2 letters" : null,
      email: (value) =>
        /^\S+@\S+$/.test(value)
          ? null
          : "Make sure you are using mail@mail.com format",
      subject: (value) =>
        value.length < 2 ? "Your subject needs at least 2 letters" : null,
      message: (value) =>
        value.length < 10 ? "Your message needs at least 10 letters" : null,
    },
  });

  return (
    <Container mt="xl">
      <Paper shadow="md" radius="lg">
        <Box className="wrapper">
          <Box className="contacts">
            <Text fz="lg" fw={700} className="title" c="#262626">
              Reach Out
            </Text>
            <Box className="social-contact">
              <MdOutlineAlternateEmail style={{ fontSize: "1.2rem" }} />
              <Text size="sm">contact@ghgamehaven.com</Text>
            </Box>
            <Box className="social-contact" mt="md">
              <GrLocation style={{ fontSize: "1.2rem" }} />
              <Text size="sm">
                Anders Personsgatan 18, 416 <br />
                64 Gothenburg, Sweden
              </Text>
            </Box>
            <Image
              src={contactUs}
              alt="GH Mascot welcoming you to contact Gamehaven"
            />
          </Box>

          <form className="form" onSubmit={form.onSubmit(console.log)}>
            <Text fz="lg" fw={700} className="title">
              Get in touch
            </Text>

            <Box className="fields">
              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <TextInput
                  label="Your name"
                  placeholder="Your name"
                  {...form.getInputProps("name")}
                />
                <TextInput
                  label="Your email"
                  placeholder="your@mail.com"
                  {...form.getInputProps("email")}
                />
              </SimpleGrid>

              <TextInput
                mt="md"
                label="Subject"
                placeholder="Subject"
                {...form.getInputProps("subject")}
              />

              <Textarea
                mt="md"
                label="Your message"
                placeholder="Please include all relevant information"
                minRows={3}
                {...form.getInputProps("message")}
              />

              <Group justify="flex-end" mt="md">
                <Button type="submit" className="control">
                  Send message
                </Button>
              </Group>
            </Box>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}

export default ContactPage;
