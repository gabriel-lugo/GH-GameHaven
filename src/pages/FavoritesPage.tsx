import { Container, Divider, SimpleGrid, Title } from "@mantine/core";
import { useContext } from "react";
import Thumbnail from "../components/Thumbnail";
import { BookmarkContext } from "../context/FavoritesContext";

function FavoritesPage() {
  const { bookmarks } = useContext(BookmarkContext);
  return (
    <Container size="xl">
      <Title mt="lg" order={2}>
        Favorites
      </Title>
      <Divider color="#262626" mt="md" />
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
    </Container>
  );
}

export default FavoritesPage;
