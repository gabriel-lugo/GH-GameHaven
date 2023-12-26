import { Burger, Container, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import "../css/Header.css";

const links = [
  { link: "/games", label: "Games" },
  { link: "/favorites", label: "Favorites" },
  { link: "/contact", label: "Contact" },
  { link: "/about", label: "About" },
];

function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className="link"
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));
  return (
    <header>
      <Container size="md" className="inner">
        <Title order={2}>GH-GameHaven</Title>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
      </Container>
      <Burger
        color="#F2C341"
        opened={opened}
        onClick={toggle}
        hiddenFrom="xs"
        size="sm"
      />
    </header>
  );
}

export default Header;
