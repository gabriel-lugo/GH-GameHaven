import { Button, Container, Image, Title } from "@mantine/core";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import img404_1 from "../assets/404-1.png";
import img404_2 from "../assets/404-2.png";
import img404_3 from "../assets/404-3.png";
import img404_4 from "../assets/404-4.png";
import "../css/ErrorPage.css";

const images = [img404_1, img404_2, img404_3, img404_4];

function ErrorPage() {
  const randomIndex = Math.floor(Math.random() * images.length);
  const random404Image = images[randomIndex];

  useEffect(() => {
    document.title = "GH: Gamehaven - 404 Page Not Found";
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container size={"xl"} ta={"center"} className="error-container" mb={"xl"}>
      <Title order={2} mt={"xl"}>
        404 - This Page Was not Found
      </Title>
      <Image
        src={random404Image}
        alt={"404 - page not found"}
        maw={500}
        mt={"xl"}
      />

      <Button
        component={Link}
        to="/"
        className="error-button"
        size={"lg"}
        mt={"xl"}
        fullWidth
      >
        To Homepage
      </Button>
    </Container>
  );
}

export default ErrorPage;
