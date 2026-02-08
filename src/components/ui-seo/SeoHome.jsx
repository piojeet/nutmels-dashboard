import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";


function SeoHome() {
  return (
    <div>
      <div>
        <Swiper className="mySwiper">
          <SwiperSlide>
            <div className='w-full h-72 bg-yellow-color/30 rounded-xl'>

            </div>
          </SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper>

        <div>
          <button></button>
        </div>
      </div>
    </div>
  )
}

export default SeoHome