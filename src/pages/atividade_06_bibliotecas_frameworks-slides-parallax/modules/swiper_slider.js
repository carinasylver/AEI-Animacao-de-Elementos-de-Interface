// https://swiperjs.com/get-started

import Swiper from 'swiper';
import 'swiper/css/bundle';
import {Autoplay} from 'swiper/modules'


const swiper = new Swiper('.swiper', {
  // Optional parameters
  modules:[
        Autoplay,
    ],  
  direction: 'horizontal',
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  
});