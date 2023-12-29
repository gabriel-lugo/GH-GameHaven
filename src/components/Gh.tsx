import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Image,
  Text,
  Title,
} from "@mantine/core";
import "../css/Gh.css";

function Gh() {
  return (
    <Container className="gh-container" size="xl">
      <Box className="content-container">
        <Image
          className="image-style"
          src="https://github.com/gabriel-lugo/GH-GameHaven/assets/116897452/c4b61101-6768-4665-a7bc-fced866bd6ea"
        />
        <Card p="lg" className="card-style" radius="sm">
          <Title order={3}>Gamehaven aims to..</Title>

          <Box mt="md" mb="md" className="divider-container">
            <Divider color="#F2C341" size="lg" style={{ width: "7rem" }} />
            <Divider color="#D1D1D1" size="lg" style={{ width: "7rem" }} />
            <Divider color="#C49B2C" size="lg" style={{ width: "7rem" }} />
          </Box>

          <Text>
            Our goal is to create a space where you as a gamer can search and
            find your next game. You should be able to share these games with
            your friends and bookmark them as you please.
          </Text>
          <Button className="button-style" mt="lg" fullWidth>
            Learn More
          </Button>
        </Card>
      </Box>
    </Container>
  );
}

export default Gh;
