import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import "../css/Carousel.css";
import { Game } from "../pages/HomePage";
import Thumbnail from "./Thumbnail";

interface CarouselProps {
  games: Game[];
}

function Carousel({ games }: CarouselProps) {
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={16}
      className="carousel-container"
    >
      {games.map((game) => (
        <SwiperSlide key={game.id}>
          <Thumbnail game={game} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Carousel;
