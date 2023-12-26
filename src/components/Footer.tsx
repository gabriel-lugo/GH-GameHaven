import { Container, Divider, Group, Title } from "@mantine/core";
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
      <Title>GameHaven</Title>
      <Container size={"xl"} className="footer-container">
        <div className="overview-section">
          <Title>Overview</Title>
          <Group className="overview-items">{overviewItems}</Group>
        </div>

        <Divider orientation="vertical" color="var(--nav-text-color)" />

        <div className="follow-us-section">
          <Title>Follow Us</Title>
          <NavLink to={"https://www.facebook.com/"}>Facebook</NavLink>
        </div>

        <Divider orientation="vertical" color="var(--nav-text-color)" />

        <div className="igdb-api-section">
          <Title>IGDB API</Title>
          <NavLink to={"https://www.igdb.com/"}>Learn More</NavLink>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
