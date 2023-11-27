'use strict'

import { HeaderSite } from "../components/Header/header-site.js";
import { CourseSite } from "../components/Course/course-site.js";

const $ = document

window.customElements.define('header-site', HeaderSite)
window.customElements.define('course-site', CourseSite)

// functions 

const swiperCourse = new Swiper('.swiper-course', {
    direction: 'horizontal',
    slidesPerView: 'auto',
    autoplay: {
      delay: 3000,
    },     
    breakpoints: {
      810: {
        spaceBetween: 40,
      },
      
      150: {
        spaceBetween: 20,
      }
    }
  });


// event handler 