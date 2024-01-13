import {
  Button,
  Center,
  Container,
  Divider,
  Image,
  SimpleGrid,
  Title,
} from "@mantine/core";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import nofavorites1 from "../assets/no_favorites1.png";
import nofavorites2 from "../assets/no_favorites2.png";
import nofavorites3 from "../assets/no_favorites3.png";
import nofavorites4 from "../assets/no_favorites4.png";
import Thumbnail from "../components/Thumbnail";
import { BookmarkContext } from "../context/FavoritesContext";
import "../css/FavoritesPage.css";

const images = [nofavorites1, nofavorites2, nofavorites3, nofavorites4];

function FavoritesPage() {
  const randomIndex = Math.floor(Math.random() * images.length);
  const random404Image = images[randomIndex];
  const { bookmarks } = useContext(BookmarkContext);

  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container size="xl">
      <Title mt={"lg"} order={2}>
        Favorites
      </Title>
      <Divider color="#262626" mt={"md"} />
      {bookmarks.length === 0 ? (
        <Container className="favorites-container">
          <Center style={{ flexDirection: "column" }}>
            <Title order={2} mt={"xl"}>
              You have no favorite games added
            </Title>
            <Image mt="lg" maw={500} src={random404Image} alt="No favorites" />
            <Button
              fullWidth
              size={"lg"}
              mt={"xl"}
              className="favorites-button"
              onClick={handleGoHome}
            >
              To Homepage
            </Button>
          </Center>
        </Container>
      ) : (
        <SimpleGrid
          cols={{ base: 1, xs: 3, sm: 4, lg: 6 }}
          spacing={"sm"}
          verticalSpacing={"lg"}
          mt="md"
        >
          {bookmarks.map((game) => (
            <Thumbnail key={game.id} game={game} />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}

export default FavoritesPage;
