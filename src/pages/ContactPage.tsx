import {
  Box,
  Button,
  Container,
  Group,
  Image,
  Paper,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { GrLocation } from "react-icons/gr";
import { MdOutlineAlternateEmail } from "react-icons/md";
import contactUs from "../assets/gh-contact.png";
import "../css/ContactPage.css";

function ContactPage() {
  useEffect(() => {
    document.title = "GH: Gamehaven - Contact";
    window.scrollTo(0, 0);
  }, []);

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
    <Container style={{ marginTop: "10rem", marginBottom: "5rem" }}>
      <Paper shadow="md" radius="lg">
        <Box className="wrapper">
          <Box className="contacts">
            <Text fz="lg" fw={700} className="title" c="#262626">
              Reach Out
            </Text>
            <Box className="social-contact">
              <MdOutlineAlternateEmail style={{ fontSize: "1.2rem" }} />
              <Text size="sm">
                <a
                  style={{ textDecoration: "none", color: "#262626" }}
                  href="mailto:contact@ghgamehaven.com"
                >
                  contact@ghgamehaven.com
                </a>
              </Text>
            </Box>
            <Box className="social-contact" mt="md">
              <GrLocation style={{ fontSize: "1.2rem" }} />
              <Text size="sm">
                <a
                  style={{ textDecoration: "none", color: "#262626" }}
                  href="https://www.google.com/maps/place/Medieinstitutet/@57.7097458,11.9919449,17z/data=!3m1!4b1!4m6!3m5!1s0x464ff30de9cbee3d:0xbb3f902b63916df6!8m2!3d57.7097458!4d11.9945252!16s%2Fg%2F11ghpmkkpk?entry=ttu"
                  target="_blank"
                >
                  Anders Personsgatan 18, <br />
                  416 64 Gothenburg, Sweden
                </a>
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
              <TextInput
                label="Your name"
                placeholder="Your name"
                {...form.getInputProps("name")}
              />
              <TextInput
                mt={"md"}
                required
                label="Your email"
                placeholder="your@mail.com"
                {...form.getInputProps("email")}
              />

              <TextInput
                mt="md"
                label="Subject"
                placeholder="Subject"
                {...form.getInputProps("subject")}
              />

              <Textarea
                required
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
