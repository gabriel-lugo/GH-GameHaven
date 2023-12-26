import { Container, Divider, Flex, Group, Text, Title } from "@mantine/core";
import { NavLink } from "react-router-dom";
import "../css/Footer.css";

const overviewLinks = [
  { link: "/about", label: "About" },
  { link: "/contact", label: "Help Center" },
  { link: "/contact", label: "Careers" },
  { link: "/about", label: "Privacy Policy" },
  { link: "/about", label: "Terms of Use" },
];

const overviewItems = overviewLinks.map((link) => (
  <NavLink key={link.label} to={link.link}>
    {link.label}
  </NavLink>
));

export function Footer() {
  return (
    <footer>
      <Title order={2} mt={"lg"} mb={"lg"}>
        GameHaven
      </Title>
      <Container size={"xl"} className="footer-container">
        <div className="overview-section">
          <Title order={3}>Overview</Title>
          <Group className="overview-items">{overviewItems}</Group>
        </div>

        <Divider orientation="vertical" color="var(--nav-text-color)" />

        <div className="follow-us-section">
          <Title order={3}>Follow Us</Title>
          <Flex>
            <NavLink to={"https://www.facebook.com/"}>💾</NavLink>
            <NavLink to={"https://www.instagram.com/"}>🖥️</NavLink>
            <NavLink to={"https://www.facebook.com/"}>🔥</NavLink>
          </Flex>
        </div>

        <Divider orientation="vertical" color="var(--nav-text-color)" />

        <div className="igdb-api-section">
          <Title order={3}>IGDB API</Title>
          <NavLink to={"https://www.igdb.com/"}>Learn More</NavLink>
        </div>
      </Container>
      <Text size="xs" mb={"md"} mt={"md"}>
        © 2023 GH: GameHaven, INC. ALL RIGHTS RESERVED.
      </Text>
    </footer>
  );
}

export default Footer;
