import React from "react";
// import required modules
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
// Import Swiper React components
import { Swiper } from "swiper/react";
import GlobalStyle from './Swiper.style';


const SwiperContainer = ({ children, loop, direction }) =>{
    return (
        <>
            <GlobalStyle whiteColor />
            <Swiper
                direction={direction}
                pagination={false}
                loop={loop}
                modules={[Pagination]}
                className="mySwiper"
            >
                {children}
            </Swiper>
        </>
        
    );
}
export default SwiperContainer