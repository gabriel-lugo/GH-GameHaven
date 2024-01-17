import { Badge, Box, Image, Text } from "@mantine/core";
import { NavLink } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "../css/HeroSlide.css";

interface Game {
  id: number;
  name: string;
  cover: string;
  rating: number;
  screenshots: string[];
  artworks: string[];
}

interface HeroSlideProps {
  games: Game[];
}

function HeroSlide({ games }: HeroSlideProps) {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Autoplay, Pagination]}
      grabCursor={true}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 4500 }}
    >
      {games.map((game) => {
        const firstScreenshot = game.screenshots[0];
        return (
          <SwiperSlide key={`${game.id}`}>
            <NavLink to={`/game/${game.id}`} className="game-link">
              <Box className="hero-slide-container">
                <Box aria-label="new games" className="is-new-label">
                  <Text size="sm">
                    Screenshot from: <b>{game.name}</b>
                  </Text>
                  <Badge
                    size="sm"
                    bg="dark"
                    variant="dot"
                    color="orange"
                    mt={"sm"}
                    mb={"xs"}
                    style={{ color: "#fffcfc" }}
                  >
                    Upcoming release
                  </Badge>
                </Box>
                <Image src={firstScreenshot} alt={`Artwork of ${game.name}`} />
              </Box>
            </NavLink>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default HeroSlide;
