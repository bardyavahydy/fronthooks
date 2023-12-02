'use strict'

import { createCircleForBtn } from "./funcs.js";
import { HeaderSite } from "../components/Header/header-site.js";
import { CourseSite } from "../components/Course/course-site.js";
import { FooterSite } from "../components/Footer/footer-site.js";

const $ = document
const bannerLetsGoLink = $.querySelector('.container-banner-lets-go__link')
const allCoursesLink = $.querySelector('.courses-wrapper-right__all-courses-link')

window.customElements.define('header-site', HeaderSite)
window.customElements.define('course-site', CourseSite)
window.customElements.define('footer-site', FooterSite)

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

bannerLetsGoLink.addEventListener('click', function(event){
  createCircleForBtn(event, this, this.offsetWidth)
})

allCoursesLink.addEventListener('click', function(event){
  createCircleForBtn(event, this, this.offsetWidth)
})