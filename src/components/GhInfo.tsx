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
import { NavLink } from "react-router-dom";
import GhImg from "../assets/gh-info.png";
import "../css/GhInfo.css";

function GhInfo() {
  return (
    <Container className="gh-container" size="xl">
      <Box className="content-container">
        <Image
          className="image-style"
          src={GhImg}
          alt="a cartoon wizard browsing a webpage"
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
            your friends and mark them as favorites as you please.
          </Text>
          <NavLink style={{ textDecoration: "none" }} to={"/about/"}>
            <Button className="button-style" mt="lg" fullWidth>
              Learn More
            </Button>
          </NavLink>
        </Card>
      </Box>
    </Container>
  );
}

export default GhInfo;
