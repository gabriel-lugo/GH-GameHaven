import {
  Burger,
  Button,
  Container,
  Divider,
  Group,
  Paper,
  Transition,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { FaEnvelope, FaHeart, FaInfoCircle, FaUser } from "react-icons/fa";
import { IoLogoGameControllerA } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/GH-logo.png";
import "../css/Header.css";
import Search from "./Search";

const links = [
  { link: "/games", icon: <IoLogoGameControllerA size={18} />, label: "Games" },
  { link: "/favorites", icon: <FaHeart size={18} />, label: "Favorites" },
  { link: "/contact", icon: <FaEnvelope size={18} />, label: "Contact" },
  { link: "/about", icon: <FaInfoCircle size={18} />, label: "About" },
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
    <NavLink
      key={link.label}
      to={link.link}
      className={`link ${isActive(link.link) ? "link-active" : ""}`}
      onClick={() => {
        if (opened) {
          close();
        }
      }}
    >
      <span className="link-content">
        {link.icon}
        {link.label}
      </span>
    </NavLink>
  ));

  return (
    <>
      <header>
        <Container size="xl" className="inner">
          <NavLink to={"/"}>
            <img src={logo} alt="Gh logo" width="75px" />
          </NavLink>
          <Group gap={5} className={`header-links ${opened ? "opened" : ""}`}>
            {" "}
            {items}
          </Group>
          <Search />
          <NavLink to="/signin">
            <Button
              variant="transparent"
              leftSection={<FaUser size={18} />}
              className={`button-color ${isActive("/signin") ? "active" : ""}`}
            >
              Login
            </Button>
          </NavLink>
          <Burger
            color="#F2C341"
            opened={opened}
            onClick={toggle}
            className="burger"
            size="md"
          />
        </Container>
      </header>
      <Divider color="var(--nav-text-color)" size="xl" />
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
