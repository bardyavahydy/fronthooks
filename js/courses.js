'use strict'

import { HeaderSite } from "../components/Header/header-site.js";
import { CourseSite } from "../components/Course/course-site.js";
import { FooterSite } from "../components/Footer/footer-site.js";
import { addClass, removeClass } from "./funcs.js";


const $ = document
const filtersCategory = $.querySelectorAll('.filter-course-type__svgs-and-title')
const mobileContainerFilters = $.querySelectorAll('.mobile-filters .container-filter')
const mobileFilterTitles = $.querySelectorAll('.mobile-filter__title-svg')
const mobileFilterCrosses = $.querySelectorAll('.mobile-filter__cross')
const checkBoxInputElms = Array.from($.querySelectorAll('.check-box'))
const containerCourses = $.querySelector('.container-courses')
const applyFilterBtns = $.querySelectorAll('.apply-filter-btn')
const courses = Array.from($.getElementsByTagName('course-site'))

const courseAttrs = ['course-status', 'course-price', 'discount-percent', 'category']
let [courseStatus, coursePrice, discountPercent, category] = courseAttrs
let coursesCopy = [...courses]
let selectedCoursesArr = []
let attrSet = new Set()

window.customElements.define('header-site', HeaderSite)
window.customElements.define('course-site', CourseSite)
window.customElements.define('footer-site', FooterSite)


//FUNCTIONS

const closeMobileFilter = (event, totalMobileFilter) =>{
    if(event.target === totalMobileFilter) removeClass(totalMobileFilter, 'up')
}

const setHeightForContainerFilter = () =>{
    mobileContainerFilters.forEach(mobileContainerFilter =>{
        if(mobileContainerFilter.style.height) mobileContainerFilter.style.height = null
    })
}

const isTotalMobileFilter = () =>{
    setTimeout(() => {
        if($.querySelector('.total-mobile-filter.up')){
            let totalMobileFilter = $.querySelector('.total-mobile-filter.up')
            removeClass(totalMobileFilter, 'up')
        }
    }, 350);
}

const searchAndShowCoursesHandler = (checkBoxInputElmChecked, checkBoxInputElmValue, selectedCoursesArr) =>{
    if(checkBoxInputElmChecked) searchBetweenCourses(checkBoxInputElmValue)
    else searchBetweenSelectedCoursesArr(checkBoxInputElmValue)
    showSelectedCoursesArrInDom(selectedCoursesArr)
}

const searchBetweenCourses = (checkBoxInputElmValue) =>{
    coursesCopy.forEach((course) =>{
        if(course.getAttribute(courseStatus) === checkBoxInputElmValue){

            checkSelectedCoursesArrHasCourse(course, 'course-recode')

        }else if(course.getAttribute(category) === checkBoxInputElmValue){

            checkSelectedCoursesArrHasCourse(course, 'course-category')

        }else if(checkBoxInputElmValue === 'رایگان'){

            if(course.getAttribute(coursePrice) === '0') checkSelectedCoursesArrHasCourse(course, 'course-free')

        }else if(checkBoxInputElmValue === 'نقدی'){
            
            if(course.getAttribute(coursePrice) !== '0') checkSelectedCoursesArrHasCourse(course, 'course-cash')
            
        }else if(checkBoxInputElmValue === 'تخفیف دار'){
            
            if(course.getAttribute(discountPercent) !== '') checkSelectedCoursesArrHasCourse(course, 'course-off')
        }

    })
}

const checkSelectedCoursesArrHasCourse = (course, attr) =>{
    if(selectedCoursesArr.length === 0){
        selectedCoursesArr.push(course)
        course.setAttribute(attr, 'true')
    }
    else setAttrForCourse(course, attr)
    attrSet.add(attr)
}

const setAttrForCourse = (course, attr) =>{
    let isEqual = selectedCoursesArr.some(selectedCourse => selectedCourse === course)
    if(isEqual) course.setAttribute(attr, 'true')
    else{
        course.setAttribute(attr, 'true')
        selectedCoursesArr.push(course)
    }
}

const searchBetweenSelectedCoursesArr = (checkBoxInputElmValue) =>{
    selectedCoursesArr.forEach((selectedCourse) =>{

        if(selectedCourse.getAttribute(courseStatus) === checkBoxInputElmValue){
            
            if(selectedCourse.hasAttribute('course-recode')){
                removeAttributeAndCheckAnotherAttr(selectedCourse, checkBoxInputElmValue, 'course-recode')
            }

        }else if(selectedCourse.getAttribute(category) === checkBoxInputElmValue){

            if(selectedCourse.hasAttribute('course-category')){
                removeAttributeAndCheckAnotherAttr(selectedCourse, checkBoxInputElmValue, 'course-category')
            }

        }else if(checkBoxInputElmValue === 'رایگان'){

            if(selectedCourse.hasAttribute('course-free')){
                removeAttributeAndCheckAnotherAttr(selectedCourse, checkBoxInputElmValue, 'course-free')
            }

        }else if(checkBoxInputElmValue === 'نقدی'){
            
            if(selectedCourse.hasAttribute('course-cash')){
                removeAttributeAndCheckAnotherAttr(selectedCourse, checkBoxInputElmValue, 'course-cash')
            }
            
        }else if(checkBoxInputElmValue === 'تخفیف دار'){
            
            if(selectedCourse.hasAttribute('course-off')){
                removeAttributeAndCheckAnotherAttr(selectedCourse, checkBoxInputElmValue, 'course-off')
            }
            
        }

    })
}

const removeAttributeAndCheckAnotherAttr = (course, checkBoxInputElmValue, attr) =>{
    course.removeAttribute(attr)
    checkAnotherAttr(course, checkBoxInputElmValue)
}

const checkAnotherAttr = (course, checkBoxInputElmValue) =>{
    let hasAttr = null
    let attrArr = [...attrSet]

    attrArr.forEach(attr => {
        for(let attrCourse of course.attributes ){
            if(attr === attrCourse.name){
                hasAttr = true
                break
            }
        }
    })
    if(!hasAttr) removeCourseFromSelectedCoursesArr(course, checkBoxInputElmValue)
}

const removeCourseFromSelectedCoursesArr = (course, checkBoxInputElmValue) =>{
    let courseIndex = selectedCoursesArr.findIndex(selectedCourse => selectedCourse === course)
    selectedCoursesArr.splice(courseIndex, 1)
    coursesCopy.push(course)
    searchBetweenSelectedCoursesArr(checkBoxInputElmValue)
}

const showSelectedCoursesArrInDom = selectedCoursesArr =>{
    courses.forEach(course => addClass(course.parentElement, 'inactive'))

    if(selectedCoursesArr.length === 0) msgHandler()
    else if(selectedCoursesArr){
        selectedCoursesArr.forEach(selectedCourse =>{
            removeClass(selectedCourse.parentElement, 'inactive')
            addClass(selectedCourse.parentElement, 'active')
        })
    }
}

const msgHandler = () =>{
    const msgElm = $.createElement('p')
    addClass(msgElm, 'msg')
    msgElm.innerText = 'هیچ دوره‌ای یافت نشد🤷🏼'
    containerCourses.append(msgElm)
}

// EVENT HANDLER

filtersCategory.forEach(filterCategory =>{
    filterCategory.addEventListener('click', function(){
        let filterCategoryParent = filterCategory.parentElement
        if(filterCategoryParent.style.height) filterCategoryParent.style.height = null
        else filterCategoryParent.style.height =`${ filterCategoryParent.scrollHeight * 0.1}rem`
    })
})

mobileFilterTitles.forEach(mobileFilterTitle =>{
    mobileFilterTitle.addEventListener('click', function(){
        let totalMobileFilter = mobileFilterTitle.nextElementSibling
        addClass(totalMobileFilter, 'up')
        totalMobileFilter.addEventListener('click', event => closeMobileFilter(event, totalMobileFilter))
    })
})

mobileFilterCrosses.forEach(mobileFilterCross =>{
    mobileFilterCross.addEventListener('click', () =>{
        setHeightForContainerFilter()
        isTotalMobileFilter()
    })
})

checkBoxInputElms.forEach(checkBoxInputElm =>{
    let isFalse = null
    checkBoxInputElm.addEventListener('change', () =>{
        isFalse = checkBoxInputElms.every(checkBoxInputElm => checkBoxInputElm.checked === false)
        
        if(window.innerWidth > 810){
            if($.querySelector('.msg')) $.querySelector('.msg').remove()
            if(isFalse){
                selectedCoursesArr = []
                courses.forEach(course => removeClass(course.parentElement, 'inactive'))
            }else{
                searchAndShowCoursesHandler(checkBoxInputElm.checked, checkBoxInputElm.value, selectedCoursesArr)
            }
        }else{
            applyFilterBtns.forEach(applyFilterBtn =>{
                applyFilterBtn.addEventListener('click', () =>{
                    isTotalMobileFilter()
                    setHeightForContainerFilter()
                    if($.querySelector('.msg')) $.querySelector('.msg').remove()
                    if(isFalse){
                        selectedCoursesArr = []
                        courses.forEach(course => removeClass(course.parentElement, 'inactive'))
                    }else{
                        searchAndShowCoursesHandler(checkBoxInputElm.checked, checkBoxInputElm.value, selectedCoursesArr)
                    }
                })
            })
        }

    })
})