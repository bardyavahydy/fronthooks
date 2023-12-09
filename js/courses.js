'use strict'

import { HeaderSite } from "../components/Header/header-site.js";
import { CourseSite } from "../components/Course/course-site.js";
import { FooterSite } from "../components/Footer/footer-site.js";
import { addClass, removeClass } from "./funcs.js";


const $ = document
const filtersCategory = $.querySelectorAll('.filter-course-type__svgs-and-title')
const mobileFilterTitles = $.querySelectorAll('.mobile-filter__title-svg')
const mobileFilterCrosses = $.querySelectorAll('.mobile-filter__cross')


window.customElements.define('header-site', HeaderSite)
window.customElements.define('course-site', CourseSite)
window.customElements.define('footer-site', FooterSite)


//FUNCTIONS

const closeMobileFilter = (event, totalMobileFilter) =>{
    if(event.target === totalMobileFilter) removeClass(totalMobileFilter, 'up')
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
        if($.querySelector('.total-mobile-filter.up')){
            let totalMobileFilter = $.querySelector('.total-mobile-filter.up')
            removeClass(totalMobileFilter, 'up')
        }

    })
})