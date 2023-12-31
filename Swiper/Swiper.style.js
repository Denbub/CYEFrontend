import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  .swiper {
    width: 100%;
    height: 100%;
  }
  
  .swiper-slide {
    text-align: left;
    font-size: 18px;
    display: flex;
    align-items: center;
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
