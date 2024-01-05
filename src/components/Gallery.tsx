import { Box, Image } from "@mantine/core";
import { useEffect, useState } from "react";
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
  const [slidesToShow, setSlidesToShow] = useState(2);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else {
        setSlidesToShow(2);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Swiper
      pagination={{ dynamicBullets: true }}
      modules={[Autoplay, Pagination, Navigation]}
      grabCursor={true}
      spaceBetween={0}
      navigation={true}
      slidesPerView={slidesToShow}
      loop={true}
      autoplay={{ delay: 5500 }}
    >
      {images.map((image: any, index: any) => (
        <SwiperSlide key={index}>
          <Box className="gallery-container">
            <Image
              loading="lazy"
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
