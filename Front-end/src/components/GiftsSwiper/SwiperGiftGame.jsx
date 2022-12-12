import React, { useRef, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


import { Pagination, Navigation, Keyboard, Autoplay } from "swiper";
import { FreeGamesContext } from '../../context/FreeGamesContext'
// import required modules

export default function SwiperGiftGame() {
  const { freeGames } = useContext(FreeGamesContext)

  return (
    <div className='flex justify-around flex-wrap  p-10 rounded-3xl border-t-4 shadow-lg w-[95%] mx-auto border-amber  dark:bg-slate-800'>
      <>
        <Swiper

          breakpoints={{
            "@0.00": {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            "@0.75": {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            "@1.00": {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            "@1.50": {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}


          slidesPerGroup={3}
          loop={true}
          loopFillGroupWithBlank={true}
          navigation={true}
          centeredSlides={true}

          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Navigation, Keyboard, Autoplay]}
          keyboard={{
            enabled: true,
          }}
          className="mySwiper flex justify-center "
        >
          {

            freeGames?.map(freeGame => {
              return (<SwiperSlide  > <a key={freeGame.id} href={freeGame.game_url} target='_blank' class="group relative block bg-black shadow-xl w-72 h-72 mb-10">
                <img
                  alt="Developer"
                  src={freeGame.thumbnail}
                  class="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                />

                <div class="relative p-4">
                  <p class="text-xl font-bold text-white">{freeGame.title}</p>



                  <div class="mt-32">
                    <div
                      class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      <p class="text-sm text-white">
                        {freeGame.short_description}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
              </SwiperSlide>)
            })

          }


        </Swiper>
      </>

    </div>
  );
}

