'use strict'

import { addClass, removeClass, createCircleForBtn } from "./funcs.js";
import { getCookie, setCookie } from "./cookie.js";
import { getAllData } from "./HTTPreq.js";
import { e2p } from "./convertNumbers.js";

const $ = document
const body = $.body
const title = $.getElementById('title')
const sectionAside = $.querySelector('.section-aside')
const crossSvg = $.querySelector('.cross-svg')
const asideMenuLists = Array.from($.querySelectorAll('.aside-menu__list--param'))
const logout = $.querySelector('.aside-menu__btn--logout')
const userPanelUsername = $.querySelector('.container-user-panel-username__name')
const editUserPanel = $.querySelector('.edit-user-panel')
const btnMenuHamburger = $.querySelector('.btn-menu-hamburger')
const headerTitleText = $.querySelector('.container-header-title-and-time__text')
const cart = $.querySelector('.cart')
const numberOfOrderElm = $.querySelector('.cart__number-of-order')
const userProfileLink = $.querySelector('.user-profile-link')

let tokenObj = getCookie('accessToken')
let {isLogin, userToken} = tokenObj
let locationSearch = location.search
let locationSearchParam = new URLSearchParams(locationSearch)
let userParam = locationSearchParam.get('param')


//FUNCTIONS

const getUser = async () =>{
    let userObj = await getAllData(`allUsers/${userToken}`)
    console.log(userObj);
    userPanelUsername.innerText = userObj.username
    headerTitleText.innerText = `سلام؛ ${userObj.username}`
}

const getSelectedCourse = async () =>{
    let selectedCourseArr = []
    let selectedCourseObj = await getAllData(`${userToken}selectedCourseUser`)
    if(!selectedCourseObj) numberOfOrderElm.innerText = e2p(0)
    else if(selectedCourseObj){
        for(let courseId in selectedCourseObj){
            if(selectedCourseObj[courseId].purchaseStatus !== 'bought') selectedCourseArr.push(selectedCourseObj[courseId])
        }
        numberOfOrderElm.innerText = e2p(selectedCourseArr.length) 
    }
}

//EVENTS


asideMenuLists.forEach(asideMenuList =>{
    asideMenuList.addEventListener('click', function(){
        let param = this.getAttribute('data-param')
        location.href = `./userPanel.html?param=${param}`
    })
})

logout.addEventListener('click', () => {
    setCookie('accessToken', '', -10)
    location.href = './index.html'
})

crossSvg.addEventListener('click', () =>{
    removeClass(sectionAside, 'active')
    body.style.overflowY = 'visible'
})

sectionAside.addEventListener('click', function(event){
    if(event.target === this){
        removeClass(sectionAside, 'active')
        body.style.overflowY = 'visible'
    }
})

editUserPanel.addEventListener('click', function(event){
    createCircleForBtn(event, this, this.offsetWidth)
})

btnMenuHamburger.addEventListener('click', () =>{
    addClass(sectionAside, 'active')
    body.style.overflowY = 'hidden'
})

cart.addEventListener('click', function(event){
    const cartLink = this.querySelector('.cart__link')
    createCircleForBtn(event, cartLink, this.offsetWidth)
})

userProfileLink.addEventListener('click', function(event){
    createCircleForBtn(event, this, this.offsetWidth)
})

window.addEventListener('DOMContentLoaded', () =>{

    getCookie('accessToken')
    getUser()
    getSelectedCourse()

    asideMenuLists.some(asideMenuList =>{
        let param = asideMenuList.getAttribute('data-param')
        if(param === userParam){
            addClass(asideMenuList, 'active')
            
            if(userParam === 'profile') title.innerText = `پنل کاربری - داشبورد`
            else if(userParam === 'courses') title.innerText = `پنل کاربری - دوره‌های من`
            else if(userParam === 'payments') title.innerText = `پنل کاربری - سفارش‌های من`
            return true
        }

    })
})