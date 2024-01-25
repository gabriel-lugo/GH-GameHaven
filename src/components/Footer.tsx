import {
  Container,
  Divider,
  Flex,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import { FaExternalLinkAlt, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import logo from "../assets/GH-logo.png";
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
      <NavLink to={"/"}>
        <Image src={logo} alt="GameHaven logo" w={140} />
      </NavLink>

      <Container size={"xl"} className="footer-container">
        <div className="overview-section">
          <Title order={3} mb={"lg"} mt={"md"}>
            Overview
          </Title>
          <Group className="overview-items">{overviewItems}</Group>
        </div>

        <Divider
          orientation="horizontal"
          color="var(--nav-text-color)"
          className="divider-horizontal"
        />
        <Divider
          orientation="vertical"
          color="var(--nav-text-color)"
          className="divider-vertical"
        />

        <div className="follow-us-section">
          <Title order={3} mb={"lg"} mt={"md"}>
            Follow Us
          </Title>
          <Flex>
            <NavLink
              aria-label="Visit Gamehaven on Facebook (opens in a new tab)"
              to={"https://www.facebook.com/"}
              target="blank"
            >
              <FiFacebook />
            </NavLink>
            <NavLink
              aria-label="Visit Gamehaven on Instagram (opens in a new tab)"
              to={"https://www.instagram.com/"}
              target="blank"
            >
              <FaInstagram />
            </NavLink>
            <NavLink
              aria-label="Visit Gamehaven on X (opens in a new tab)"
              to={"https://twitter.com/"}
              target="blank"
            >
              <FaXTwitter />
            </NavLink>
          </Flex>
        </div>

        <Divider
          orientation="horizontal"
          color="var(--nav-text-color)"
          className="divider-horizontal"
        />
        <Divider
          orientation="vertical"
          color="var(--nav-text-color)"
          className="divider-vertical"
        />

        <div className="igdb-api-section">
          <Title order={3} mb={"lg"} mt={"md"}>
            IGDB API
          </Title>
          <NavLink
            aria-label="Learn more about IGDB (opens in a new tab)"
            to={"https://www.igdb.com/"}
            target="blank"
          >
            Learn More{" "}
            <span>
              <FaExternalLinkAlt />
            </span>
          </NavLink>
        </div>

        <Divider
          orientation="horizontal"
          color="var(--nav-text-color)"
          className="divider-horizontal"
        />
      </Container>
      <Text size="xs" mb={"md"} mt={"md"}>
        © 2023 GH: GameHaven, INC. ALL RIGHTS RESERVED.
      </Text>
    </footer>
  );
}

export default Footer;
