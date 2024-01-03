import { Box, Image } from "@mantine/core";
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
      {games.map((game) =>
        game.screenshots.map((screenshot, index) => (
          <SwiperSlide key={`${game.id}-${index}`}>
            <Box className="hero-slide-container">
              <Box aria-label="new games" className="is-new-label">
                Screenshot from: <b>{game.name}</b>
              </Box>
              <Image src={screenshot} alt={`Screenshot of ${game.name}`} />
            </Box>
          </SwiperSlide>
        ))
      )}
    </Swiper>
  );
}

export default HeroSlide;
