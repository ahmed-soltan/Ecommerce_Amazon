"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import banner1 from "../../../public/banner1.jpg";
import banner2 from "../../../public/banner2.jpg";
import banner3 from "../../../public/banner3.jpg";
import banner4 from "../../../public/banner4.jpg";
import banner5 from "../../../public/banner5.jpg";
import banner6 from "../../../public/img1.jpg";
import banner7 from "../../../public/img2.jpg";

const images = [banner1, banner2, banner3, banner4, banner5];

export const Banner = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
      <Carousel
        plugins={[plugin.current]}
        className="w-full z-0 rounded-xl col-span-2"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1 py-5">
                <Card className="border-none">
                  <CardContent className="flex items-start justify-start p-0 w-full h-[300px] md:h-[400px] lg:max-h-[500px] rounded-xl">
                    <Image
                      src={image}
                      alt="banner"
                      className="object-fit w-full h-full rounded-xl"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="relative w-full h-[195px] overflow-hidden rounded-md">
          <Image
            src={banner6}
            alt="banner"
            fill
            className="object-fit rounded-md hover:scale-110 overflow-hidden transition"
          />
          <p className="absolute top-[30%] left-[5%] -translate-y-50 text-white font-bold text-2xl">
            Top Offer <br />
            <span className="text-yellow-400">Ipad Pro</span> 128GB
          </p>
        </div>
        <div className="relative w-full h-[195px] overflow-hidden rounded-md">
          <Image
            src={banner7}
            alt="banner"
            fill
            className="object-fit rounded-md hover:scale-110 overflow-hidden transition"
          />
          <p className="absolute top-[30%] left-[5%] -translate-y-50 text-white font-bold text-2xl">
            Game Pad <br />
            <span className="text-gray-800">Sport Edition</span> 2022
          </p>
        </div>
      </div>
    </div>
  );
};
