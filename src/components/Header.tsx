import {
  Burger,
  Button,
  Container,
  Group,
  Paper,
  Transition,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/GH-logo.png";
import "../css/Header.css";
import Search from "./Search";

const links = [
  { link: "/games", label: "Games" },
  { link: "/favorites", label: "Favorites" },
  { link: "/contact", label: "Contact" },
  { link: "/about", label: "About" },
];

function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const location = useLocation();
  const isActive = (pathname: string) => location.pathname === pathname;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        close();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [close]);

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={`link ${isActive(link.link) ? "link-active" : ""}`}
      onClick={() => {
        if (opened) {
          close();
        }
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <>
      <header>
        <Container size="md" className="inner">
          <img src={logo} alt="Gh logo" width="75px" />
          <Group gap={5} className={`header-links ${opened ? "opened" : ""}`}>
            {" "}
            {items}
          </Group>
          <Search />
          <Button className="button-color">Login</Button>
          <Burger
            color="#F2C341"
            opened={opened}
            onClick={toggle}
            className="burger"
            size="md"
          />
        </Container>
      </header>
      <Transition transition="pop-top-right" duration={200} mounted={opened}>
        {(styles) => (
          <Paper className="dropdown" withBorder style={styles}>
            {items}
          </Paper>
        )}
      </Transition>
    </>
  );
}

export default Header;
