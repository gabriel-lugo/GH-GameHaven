import { Box, Image } from "@mantine/core";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "../css/Gallery.css";

interface ImageData {
  url: any;
  altText?: string;
}

interface GalleryProps {
  images: ImageData[];
}

SwiperCore.use([FreeMode, Navigation]);

function Gallery({ images }: GalleryProps) {
  return (
    <Swiper
      pagination={{ dynamicBullets: true }}
      modules={[Autoplay, Pagination, Navigation]}
      grabCursor={true}
      spaceBetween={0}
      navigation={true}
      slidesPerView={2}
      loop={true}
      autoplay={{ delay: 4500 }}
    >
      {images.map((image: any, index: any) => (
        <SwiperSlide key={index}>
          <Box className="gallery-container">
            <Image
              src={image.url}
              alt={image.altText || `Slide ${index + 1}`}
            />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Gallery;
