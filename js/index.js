'use strict'

import { createCircleForBtn } from "./funcs.js";
import { HeaderSite } from "../components/Header/header-site.js";
import { CourseSite } from "../components/Course/course-site.js";
import { FooterSite } from "../components/Footer/footer-site.js";
import { getAllData } from "./HTTPreq.js";
import { sp } from "./convertNumbers.js";

const $ = document
const bannerLetsGoLink = $.querySelector('.container-banner-lets-go__link')
const numberOfStudentTextElm = $.querySelector('.container-banner-lets-go__number-of-student-text')
const allCoursesLink = $.querySelector('.courses-wrapper-right__all-courses-link')
const statisticNumberOfStudent = $.querySelector('.container-statistics__statistic--number-of-student')

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

const numberOfStudentHandler = async () =>{
  let numberOfStudentObj = await getAllData('allStudents')
  if(numberOfStudentObj){
    let numberOfStudentArr = Object.entries(numberOfStudentObj)
    setInnerTextForElm(`${sp(numberOfStudentArr.length)}`, `${sp(numberOfStudentArr.length)}+` ) 
  }else setInnerTextForElm('۰', '۰')
}
numberOfStudentHandler()

const setInnerTextForElm = (value1, value2) =>{
  numberOfStudentTextElm.innerText = value1
  statisticNumberOfStudent.innerText = value2
} 

// event handler 

bannerLetsGoLink.addEventListener('click', function(event){
  createCircleForBtn(event, this, this.offsetWidth)
})

allCoursesLink.addEventListener('click', function(event){
  createCircleForBtn(event, this, this.offsetWidth)
})