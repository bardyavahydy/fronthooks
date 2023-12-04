'use strict'

import { e2p, p2e, sp } from "../../js/convertNumbers.js";
import { addClass, removeClass, createCircleForBtn } from "../../js/funcs.js";
import { getCookie } from "../../js/cookie.js";
import { createModal } from "../../js/modal.js";
import { getAllData, postData, putData, deleteData } from "../../js/HTTPreq.js";

let tokenObj = getCookie('accessToken')
let { isLogin, userToken } = tokenObj

let template = document.createElement('template')
template.innerHTML = `
    <link rel="stylesheet" href="components/Course/course-site.css">
    <div class="container-course">
            <div class="container-course__container-img">
            <img src="" alt="" class="container-course__img Hfull-Vful">
            <div class="container-course__like-and-number-course space-between">

                <div class="container-course__container-number-of-liked-course transition-bg-3s align-items-center">
                    <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true" class="container-course__liked-course-svg ml-svg" height="1em">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path>
                        <span class="container-course__number-of-liked-course-text"></span>
                    </svg>
                </div>

                <div class="container-course__container-number-of-course align-items-center">
                    <svg viewBox="0 0 24 24" fill="none" class="container-course__number-of-course-svg ml-svg">
                        <path stroke="currentColor" stroke-width="1.5" d="M3 18.433a4.074 4.074 0 0 1 3.432-4.023l.178-.029a15.163 15.163 0 0 1 4.78 0l.178.029A4.074 4.074 0 0 1 15 18.433c0 .865-.702 1.567-1.567 1.567H4.567A1.567 1.567 0 0 1 3 18.433ZM12.5 7.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"></path><path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M15 11a3.5 3.5 0 1 0 0-7m2.39 16h2.043c.865 0 1.567-.702 1.567-1.567a4.074 4.074 0 0 0-3.432-4.023v0a2.28 2.28 0 0 0-.359-.029h-.968"></path>
                    </svg>
                    <span class="container-course__number-of-course-text">۰</span>
                </div>

            </div>
        </div>

        <div class="container-course__infos">
            <a href="#" class="container-course__link-title transition-color-3s"></a>
            <div class="container-course__time-and-status align-items-center">
                <div class="container-course__container-course-time align-items-center">
                    <svg viewBox="0 0 24 24" fill="none" class="container-course__course-time-svg ml-svg">
                        <path stroke="currentColor" stroke-width="1.5" d="M3.353 8.95A7.511 7.511 0 0 1 8.95 3.353c2.006-.47 4.094-.47 6.1 0a7.511 7.511 0 0 1 5.597 5.597c.47 2.006.47 4.094 0 6.1a7.511 7.511 0 0 1-5.597 5.597c-2.006.47-4.094.47-6.1 0a7.511 7.511 0 0 1-5.597-5.597 13.354 13.354 0 0 1 0-6.1Z"></path><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m14.5 14.5-2.839-1.806V9"></path>
                    </svg>
                    <span class="container-course__course-time">۰۰:۰۰:۰۰</span>
                </div>
                <div class="container-course__container-course-status align-items-center">
                    <svg viewBox="0 0 24 24" fill="none" class="container-course__course-status-svg ml-svg">
                        <path fill="currentColor" d="m12.45 15.632.106.743-.106-.743Zm-.891 0 .107-.742-.107.742Zm-.007-12.6-.108-.741.108.742Zm.904 0 .108-.741-.108.742Zm-4.576 8.88-.742.11.742-.11Zm0-5.155.742.11-.742-.11Zm8.246.017.742-.108-.742.108Zm0 5.122-.742-.109.742.109Zm-3.577 3.722-.106-.742.107.742Zm.004-12.571-.108.742.108-.742Zm-1.113.002.108.742-.108-.742Zm.004 12.567-.107.742.107-.742Zm8.306-4.163a.75.75 0 0 0-1.5 0h1.5Zm-14 0a.75.75 0 0 0-1.5 0h1.5ZM11.25 21a.75.75 0 0 0 1.5 0h-1.5Zm.298-17.209.112-.016-.216-1.484-.112.016.216 1.484Zm.8-.016.097.014.216-1.484-.097-.014-.216 1.484Zm.095 11.1-.1.015.213 1.485.1-.015-.213-1.484Zm-.777.015-.116-.017-.213 1.485.116.017.213-1.485Zm.677 0a2.39 2.39 0 0 1-.678 0l-.212 1.485c.366.052.737.052 1.103 0l-.213-1.485ZM11.66 3.775c.229-.033.46-.033.688 0l.216-1.484a3.887 3.887 0 0 0-1.12 0l.216 1.484Zm-3.038 8.028a16.947 16.947 0 0 1 0-4.937l-1.484-.218a18.446 18.446 0 0 0 0 5.374l1.484-.219Zm6.762-4.92c.237 1.624.237 3.28 0 4.904l1.485.217c.258-1.769.258-3.57 0-5.338l-1.485.216Zm0 4.904c-.24 1.642-1.458 2.876-2.94 3.089l.212 1.484c2.193-.314 3.885-2.11 4.213-4.356l-1.485-.217Zm1.485-5.121c-.328-2.245-2.017-4.043-4.208-4.361l-.216 1.484c1.482.216 2.7 1.452 2.94 3.093l1.484-.216Zm-8.247.2c.24-1.632 1.452-2.86 2.926-3.075l-.216-1.484c-2.182.317-3.865 2.106-4.194 4.34l1.484.22Zm-1.484 5.156c.33 2.237 2.016 4.023 4.2 4.336l.212-1.485c-1.475-.211-2.688-1.437-2.928-3.07l-1.484.219Zm11.112-.569c0 3.73-2.84 6.675-6.25 6.675v1.5c4.321 0 7.75-3.702 7.75-8.175h-1.5ZM12 18.128c-3.41 0-6.25-2.946-6.25-6.675h-1.5c0 4.473 3.429 8.175 7.75 8.175v-1.5Zm-.75.75V21h1.5v-2.122h-1.5Z"></path>
                    </svg>
                    <span class="container-course__course-status"></span>
                </div>
            </div>
            <a href="#" class="container-course__view-course-information-link align-items-center transition-color-3s">
                مشاهده‌ی اطلاعات دوره
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" height="1em" width="1em" class="container-course__view-course-information-arrow-svg">
                    <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
                </svg>
            </a>
        </div>

        <div class="container-course__register-btn-and-price space-between">
            <div class="loading center">
                <span class="loading__circle"></span>
                <span class="loading__circle loading__circle--mid"></span>
                <span class="loading__circle"></span>
            </div>
            <button class="container-course__register-btn transition-bg-3s">ثبت نام در دوره</button>
            <a href="#" class="container-course__continue-the-order-link transition-bg-3s">ادامه سفارش</a>
            <div class="container-course__price-infos">
                <div class="container-course__container-price-off">
                    <del class="container-course__price-without-off"></del>
                    <span class="container-course__discount-percent"></span>
                </div>
                <div class="container-course__container-price-and-toman-svg align-items-center">
                    <span class="container-course__price"></span>
                    <svg data-name="Layer 2" viewBox="0 0 51.29 27.19" width="51" height="27" class="container-course__toman-svg">
                        <path d="M36.48 22.85c1.78-.83 2.93-1.81 3.45-2.94h-1.65c-2.53 0-4.69-.66-6.47-1.97-.59.68-1.23 1.2-1.93 1.55s-1.54.53-2.5.53c-1.03 0-1.87-.18-2.51-.53-.65-.35-1.14-.96-1.5-1.83-.35-.87-.56-2.08-.63-3.62-.02-.28-.04-.6-.04-.97s-.01-.72-.04-1.07c-.14-3.42-.28-6.26-.42-8.51l-5.8 1.37c.73 1.64 1.34 3.34 1.83 5.08.49 1.75.74 3.58.74 5.5 0 1.6-.37 3.12-1.11 4.57-.74 1.46-1.85 2.64-3.32 3.57-1.48.93-3.27 1.39-5.38 1.39s-3.82-.45-5.21-1.34C2.61 22.74 1.6 21.6.96 20.22c-.63-1.38-.95-2.84-.95-4.36 0-1.2.13-2.28.4-3.25.27-.97.63-1.93 1.07-2.87l2.39 1.34c-.38.92-.65 1.71-.83 2.39-.18.68-.26 1.48-.26 2.39 0 1.76.49 3.19 1.48 4.29s2.63 1.65 4.92 1.65c1.55 0 2.87-.32 3.96-.95 1.09-.63 1.9-1.44 2.43-2.43.53-.98.79-1.98.79-2.99 0-2.65-.82-5.82-2.46-9.5l1.69-3.52L22.38.79c.16-.05.39-.07.67-.07.54 0 .98.19 1.32.56s.53.88.58 1.51c.14 2.04.27 5.02.39 8.94.02.38.04.75.04 1.13s.01.71.04 1.02c.05 1.03.22 1.78.53 2.25s.81.7 1.51.7c.84 0 1.52-.18 2.04-.53.52-.35.97-1 1.37-1.93.75-1.71 1.33-2.96 1.74-3.75.41-.79.94-1.46 1.58-2.04.64-.57 1.44-.86 2.37-.86 1.83 0 3.27.94 4.31 2.83s1.69 4.06 1.95 6.53c1.57-.02 2.77-.13 3.61-.33.83-.2 1.41-.49 1.72-.88.32-.39.47-.89.47-1.5 0-.75-.16-1.67-.49-2.76-.33-1.09-.69-2.1-1.09-3.04l2.43-1.23c1.22 3.1 1.83 5.44 1.83 7.04 0 1.83-.67 3.18-2 4.04-1.34.87-3.53 1.34-6.58 1.41-.49 2.21-1.8 3.93-3.92 5.19-2.12 1.25-4.68 1.98-7.69 2.16l-1.2-2.88c2.6-.14 4.8-.63 6.58-1.46ZM10.38 5.66l.11 3.31-3.2.28-.46-3.31 3.55-.28Zm25.1 10.83c.88.28 1.81.42 2.8.42h1.93c-.16-1.67-.55-3.08-1.16-4.26-.61-1.17-1.38-1.76-2.32-1.76-.75 0-1.42.45-2.02 1.34-.6.89-1.11 1.92-1.53 3.1.66.49 1.42.88 2.3 1.16ZM43.64.21C45.06.07 46.43 0 47.74 0c.96 0 1.67.02 2.11.07l-.21 2.81c-.42-.05-1.08-.07-1.97-.07-1.2 0-2.44.07-3.73.21s-2.44.32-3.45.53L39.86.81c1.1-.26 2.36-.46 3.78-.6Z" data-name="Layer 1" style="fill: currentcolor;"></path>
                    </svg>
                </div>
            </div>
        </div>

        <div class="container-course__show-course">
            <a href="#" class="container-course__show-course-link transition-bg-3s">شما دانشجوی این دوره هستید ، ادامه یادگیری؟</a>
        </div>    
    </div>
`

class CourseSite extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode:'open'})
        this.shadowRoot.append(template.content.cloneNode(true))
    }

    connectedCallback(){
        let courseTable = null
        const $ = this.shadowRoot
        const courseImg = $.querySelector('.container-course__img')
        const containerNumberOfLikedCourse = $.querySelector('.container-course__container-number-of-liked-course')
        const numberOfLikedCourse = $.querySelector('.container-course__number-of-liked-course-text')
        const courseTitle = $.querySelector('.container-course__link-title')
        const courseStatus = $.querySelector('.container-course__course-status')
        const containerRegisterBtnAndPrice = $.querySelector('.container-course__register-btn-and-price')
        const courseRegisterBtn = $.querySelector('.container-course__register-btn')
        const loading = $.querySelector('.loading')
        const containerPriceAndOffElm = $.querySelector('.container-course__container-price-off')
        const coursePriceWithoutOff = $.querySelector('.container-course__price-without-off')
        const courseDiscountPercent = $.querySelector('.container-course__discount-percent')
        const coursePrice = $.querySelector('.container-course__price')    
        const continueOrderLinkBtn = $.querySelector('.container-course__continue-the-order-link')
        const showCourseLink = $.querySelector('.container-course__show-course-link')

        courseImg.src = this.getAttribute('imgcourse-src')
        courseImg.alt = 'course-img'
        courseTitle.innerText = this.getAttribute('course-title')
        courseStatus.innerText = this.getAttribute('course-status')
        coursePrice.innerText = sp(this.getAttribute('course-price'))  
        courseTable = this.getAttribute('course-table')
        
        if(this.getAttribute('discount-percent')){
            coursePriceWithoutOff.innerText = sp(this.getAttribute('course-price-without-off'))
            courseDiscountPercent.innerText = `${sp(this.getAttribute('discount-percent'))}%`
        }else addClass(containerPriceAndOffElm, 'inactive')

        const runFuncs = async () =>{
            const likedCourseID = await this.getCourseTableData(courseTable, numberOfLikedCourse, courseTitle)
            let favCourses = await this.getFavCourses(courseTable)
            let selectedCourses = await this.getSelectedCourse()
            this.setLikedClasses(containerNumberOfLikedCourse, favCourses, courseTable)
            this.setActiveAndInactiveToLinkBtn(selectedCourses, courseRegisterBtn, continueOrderLinkBtn, showCourseLink, containerRegisterBtnAndPrice, courseTitle)

            containerNumberOfLikedCourse.addEventListener('click', (event) =>{
                createCircleForBtn(event, event.target, event.target.offsetWidth)
                if(isLogin){
                    if(!containerNumberOfLikedCourse.classList.contains('liked')){
                        numberOfLikedCourse.innerText = e2p((+p2e(numberOfLikedCourse.innerText) + 1))
                        addClass(containerNumberOfLikedCourse, 'liked')
                        createModal('مرسی بابت لایکتون', 'fa fa-check', '#00c073')

                        putData({ numberLike: numberOfLikedCourse.innerText, courseTitle: courseTitle.innerText }, courseTable, likedCourseID)

                        this.putNewCourseLikedInDB(courseTable, favCourses)
                    }else{
                        numberOfLikedCourse.innerText = e2p((+p2e(numberOfLikedCourse.innerText) - 1))
                        removeClass(containerNumberOfLikedCourse, 'liked')
                        createModal('لایکتون برداشته شده', 'fa fa-close', '#ef4444')

                        putData({ numberLike: numberOfLikedCourse.innerText, courseTitle: courseTitle.innerText }, courseTable, likedCourseID)

                        this.removeCourseLikedFromDB(userToken, courseTable, favCourses)
                    }
                }else{
                    createModal('لطفا وارد حساب کاربری خود شوید .', 'fa fa-close', '#ef4444')
                }
            })
    
            courseRegisterBtn.addEventListener('click', (event) =>{
                createCircleForBtn(event, event.target, event.target.offsetWidth)//this => event
                if(isLogin){
                    const selectedCourseInfo = {
                        courseTitle: courseTitle.innerText,
                        imgCourse: courseImg.src,
                        price: this.getAttribute('course-price'),
                        coursePriceWithoutOff: this.getAttribute('course-price-without-off'),
                        courseDiscountPercent: this.getAttribute('discount-percent'),
                        purchaseStatus: 'not purchased'
                    }
                    this.addActiveAndInactiveClasses(courseRegisterBtn, loading)   
                    this.courseReservationHandler(selectedCourseInfo, `${userToken}selectedCourseUser`, continueOrderLinkBtn, loading)  
                    createModal(`${courseTitle.innerText} به سبد خرید اضافه شد`, 'fa fa-check', '#00c073')             
                }else{
                    createModal('لطفا ابتدا وارد حساب کاربری خود شوید .', 'fa fa-close', '#ef4444')
                    setTimeout(() => location.href = './auth.html' , 3000)
                }
            })
        }
        runFuncs()       
    }

    setLikedClasses(containerNumberOfLikedCourse, favCourses, courseTable){
        for(let likeId in favCourses){
            if(favCourses[likeId][courseTable] === 'liked') addClass(containerNumberOfLikedCourse, 'liked')
        }
    }

    putNewCourseLikedInDB(courseTable, favCourses){
        for(let likeId in favCourses){
            for(let prop in favCourses[likeId]){
                if(courseTable === prop) putData({ [courseTable]: 'liked' }, `${userToken}likedCourseUser`, likeId)
            }
        }
    }

    removeCourseLikedFromDB(userToken, courseTable, favCourses){
        for(let likeId in favCourses){
            for(let prop in favCourses[likeId]){
                if(courseTable === prop) deleteData(`${userToken}likedCourseUser`, likeId)
            }
        }
    }

    async courseReservationHandler(selectedCourseInfo, table, continueOrderLinkBtn, loading){
        await postData(selectedCourseInfo, table)
        addClass(continueOrderLinkBtn, 'active')   
        removeClass(loading, 'active') 
    }

    setActiveAndInactiveToLinkBtn(selectedCourses, courseRegisterBtn, continueOrderLinkBtn, showCourseLink, containerRegisterBtnAndPrice, courseTitle){
        if(selectedCourses){
            for(let selectedId in selectedCourses){
                if(selectedCourses[selectedId].courseTitle === courseTitle.innerText){
                    if(selectedCourses[selectedId].purchaseStatus === 'not purchased'){
                        this.addActiveAndInactiveClasses(courseRegisterBtn, continueOrderLinkBtn)
                    }else if(selectedCourses[selectedId].purchaseStatus === 'bought'){
                        this.addActiveAndInactiveClasses(containerRegisterBtnAndPrice, showCourseLink)
                    }
                }
            }
        }
    }

    addActiveAndInactiveClasses(elm1, elm2){
        addClass(elm1, 'inactive')
        addClass(elm2, 'active')    
    }
    
    async getCourseTableData(courseTable, numberOfLikedCourse, courseTitle){
        let likedCourseID = null
        let courseTableData = await getAllData(courseTable)
        
        if(courseTableData){
            for(let courseId in courseTableData){
                likedCourseID = courseId
                numberOfLikedCourse.innerText = courseTableData[courseId].numberLike
            }
        }else{
            likedCourseID = await this.setFirstCourserTable(numberOfLikedCourse, courseTitle, likedCourseID, courseTable)
        }
        return likedCourseID
    }
    
    async setFirstCourserTable(numberOfLikedCourse, courseTitle, likedCourseID, courseTable){
        numberOfLikedCourse.innerText = '۰'
        await postData({ numberLike: numberOfLikedCourse.innerText, courseTitle: courseTitle.innerText }, courseTable)
        
        let courseTableData = await getAllData(courseTable)
        for(let courseId in courseTableData) likedCourseID = courseId
        return likedCourseID
        
    }

    async getFavCourses(courseTable){
        let favCourseArr = null
        let favCoursesObj = await getAllData(`${userToken}likedCourseUser`)

        if(!favCoursesObj) favCoursesObj = await this.setFavCoursesTable(courseTable, favCoursesObj)
        else if(favCoursesObj){
            favCourseArr = Object.entries(favCoursesObj)
            let favCourseArrFirstIndex = favCourseArr.map(item => item[1])

            let hasCourseTable = favCourseArrFirstIndex.every(item => Object.keys(item)[0] !== courseTable)

            if(hasCourseTable) favCoursesObj = await this.setFavCoursesTable(courseTable, favCoursesObj)

        }
        return favCoursesObj
    }

    async setFavCoursesTable(courseTable, favCoursesObj){
        await postData({[courseTable]: 'notLiked'}, `${userToken}likedCourseUser`)
        favCoursesObj = await getAllData(`${userToken}likedCourseUser`)
        return favCoursesObj
    }

    async getSelectedCourse(){
        let selectedCourses = await getAllData(`${userToken}selectedCourseUser`)
        return selectedCourses
    }

    static observedAttributes(){
        return['imgcourse-src', 'course-title', 'course-status', 'course-price', 'discount-percent', 'course-price-without-off']
    }
}

export { CourseSite }