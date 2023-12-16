'use strict'

import { HeaderSite } from "../components/Header/header-site.js";
import { FooterSite } from "../components/Footer/footer-site.js";
import { addClass, removeClass, createCircleForBtn } from "./funcs.js";
import { createModal } from "../../js/modal.js";
import { getAllData, postData, putData, deleteData } from "../../js/HTTPreq.js";
import { getCookie } from "./cookie.js";
import { e2p, sp } from "./convertNumbers.js";

window.customElements.define('header-site', HeaderSite)
window.customElements.define('footer-site', FooterSite)

const $ = document
const totalContainerMsg = $.querySelector('.total-container-msg')
const containerMsgLogout = $.querySelector('.container-msg-logout')
const containerMsgGoToCoursesPage = $.querySelector('.container-msg-go-to-courses-page')
const calculationsAndCoursesSection = $.querySelector('.calculations-and-courses-section')
const totalContainerCourses = $.querySelector('.total-container-courses')

const containerDiscountCodeInput = $.querySelector('.container-discount-code-input')
const discountCodeInputElm = $.querySelector('.container-discount-code-input__input')
const totalSumElm = $.querySelector('.total-sum')
const totalOffElm = $.querySelector('.total-off')
const theAmountPayableElm = $.querySelector('.container-the-amount-payable-info__price')
const paymentBtn = $.querySelector('.payment-btn')
const loading = $.querySelector('.container-calculations .loading')

let coursesFragment = $.createDocumentFragment()
let tokenObj = getCookie('accessToken')
let { isLogin, userToken } = tokenObj
let coursesObj = null
let totalSumWithoutDiscount = 0
let totalDiscount = 0
let theAmountPayable = 0

//FUNCTIONS

const addInactiveClassToCalculationsAndCoursesSectionAndAnotherElm = (elm) =>{
    addClass(calculationsAndCoursesSection, 'inactive')
    addClass(elm, 'inactive')
}

const addActiveAndRemoveInactiveFromTotalContainerMsg = () =>{
    removeClass(totalContainerMsg, 'inactive')
    addClass(totalContainerMsg, 'active')
}

const addActiveToLoadingAndAddInactiveToAnotherElm = (loading, elm) =>{
    addClass(loading, 'active')
    addClass(elm, 'inactive')
}

const removeActiveToLoadingAndRemoveInactiveToAnotherElm = (loading, elm) =>{
    removeClass(loading, 'active')
    removeClass(elm, 'inactive')
}

const getCourses = async () =>{
    coursesObj = await getAllData(`${userToken}selectedCourseUser`)
    if(coursesObj){
        let allCoursesHaveBeenPurchased = Object.entries(coursesObj).every(courseArr => courseArr[1].purchaseStatus === 'bought')
        if(allCoursesHaveBeenPurchased){
            if(totalContainerMsg.classList.contains('inactive')) removeClass(totalContainerMsg, 'inactive')
            addInactiveClassToCalculationsAndCoursesSectionAndAnotherElm(containerMsgLogout)
            addClass(containerMsgGoToCoursesPage, 'active')
        }else{
            addClass(totalContainerMsg, 'inactive')
            generateCourseToDom(coursesObj)
        }
    }else{
        addInactiveClassToCalculationsAndCoursesSectionAndAnotherElm(containerMsgLogout)
        addActiveAndRemoveInactiveFromTotalContainerMsg()
    }
}

const generateCourseToDom = (coursesObj) =>{
    totalContainerCourses.innerHTML = ''
    totalSumWithoutDiscount = 0
    totalDiscount = 0
    theAmountPayable = 0    
    for(let courseId in coursesObj){
        let courseObj = coursesObj[courseId]

        if(courseObj.purchaseStatus === 'not purchased'){
            
            let containerCourse = $.createElement('div')
            containerCourse.className = 'container-course border-radius space-between'
    
            let containerCoverAndTitleCourseAndTeachersName = $.createElement('div')
            containerCoverAndTitleCourseAndTeachersName.className = 'container-cover-and-title-course-and-teachers-name align-items-center'
    
            let containerCourseCover = $.createElement('div')
            containerCourseCover.className = 'container-course__cover border-radius'
    
            let containerCourseImg = $.createElement('img')
            containerCourseImg.className = 'container-course__img Hfull-Vful'
            containerCourseImg.src = courseObj.imgCourse.slice(courseObj.imgCourse.indexOf('imgs'))
    
            let containerTitleCourseAndTeachersName = $.createElement('div')
            containerTitleCourseAndTeachersName.className = 'container-title-course-and-teachers-name'
    
            let containerCourseLinkCourse = $.createElement('a')
            containerCourseLinkCourse.className = 'container-course__link-course transition-color-3s'
            containerCourseLinkCourse.href = '#'
            containerCourseLinkCourse.innerText = courseObj.courseTitle

            let containerTeachersNameAndTeacherSvg = $.createElement('div')
            containerTeachersNameAndTeacherSvg.className = 'container-teachers-name-and-teacher-svg align-items-center'
            containerTeachersNameAndTeacherSvg.innerHTML = `
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="container-course__svg" height="1em" width="1em" >
                <g><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm6 10.5l-2.939 1.545.561-3.272-2.377-2.318 3.286-.478L18 14l1.47 2.977 3.285.478-2.377 2.318.56 3.272L18 21.5z"></path></g>
                </svg>
                مدرس دوره: صاحب محمدی
            `

            let containerCoursePriceAndDeleteBtn = $.createElement('div')
            containerCoursePriceAndDeleteBtn.className = 'container-course-price-and-delete-btn align-items-center'
            
            let containerCorsePriceInfo = $.createElement('div')
            containerCorsePriceInfo.className = 'container-corse-price-info'  
            
            let containerCorseOffInfo = $.createElement('div')
            containerCorseOffInfo.className = 'container-corse-off-info space-between'

            if(courseObj.courseDiscountPercent){
                let containerCourseCoursePriceWithoutOff = $.createElement('del')
                containerCourseCoursePriceWithoutOff.className = 'container-course__course-price-without-off ml-svg'
                containerCourseCoursePriceWithoutOff.innerText = sp(courseObj.coursePriceWithoutOff)
                totalPurchaseWithoutDiscount(courseObj.coursePriceWithoutOff)
                
                let containerCourseDiscountPercent = $.createElement('span')
                containerCourseDiscountPercent.className = 'container-course__discount-percent border-radius'
                containerCourseDiscountPercent.innerText = `${e2p(courseObj.courseDiscountPercent)}٪`
                totalDiscountHandler(courseObj.coursePriceWithoutOff, courseObj.courseDiscountPercent)

                containerCorseOffInfo.append(containerCourseCoursePriceWithoutOff, containerCourseDiscountPercent)
            }else{
                addClass(containerCorseOffInfo, 'inactive')
                totalPurchaseWithoutDiscount(courseObj.price)
            }
            
            let containerCorsePriceAndTomanSvg = $.createElement('div')
            containerCorsePriceAndTomanSvg.className = 'container-corse-price-and-toman-svg align-items-center'
            containerCorsePriceAndTomanSvg.innerHTML = `
            <span class="container-corse__price ml-svg">${sp(courseObj.price)}</span>
            <svg data-name="Layer 2" viewBox="0 0 51.29 27.19" width="51" height="27" class="container-corse__toman-svg">
                <path d="M36.48 22.85c1.78-.83 2.93-1.81 3.45-2.94h-1.65c-2.53 0-4.69-.66-6.47-1.97-.59.68-1.23 1.2-1.93 1.55s-1.54.53-2.5.53c-1.03 0-1.87-.18-2.51-.53-.65-.35-1.14-.96-1.5-1.83-.35-.87-.56-2.08-.63-3.62-.02-.28-.04-.6-.04-.97s-.01-.72-.04-1.07c-.14-3.42-.28-6.26-.42-8.51l-5.8 1.37c.73 1.64 1.34 3.34 1.83 5.08.49 1.75.74 3.58.74 5.5 0 1.6-.37 3.12-1.11 4.57-.74 1.46-1.85 2.64-3.32 3.57-1.48.93-3.27 1.39-5.38 1.39s-3.82-.45-5.21-1.34C2.61 22.74 1.6 21.6.96 20.22c-.63-1.38-.95-2.84-.95-4.36 0-1.2.13-2.28.4-3.25.27-.97.63-1.93 1.07-2.87l2.39 1.34c-.38.92-.65 1.71-.83 2.39-.18.68-.26 1.48-.26 2.39 0 1.76.49 3.19 1.48 4.29s2.63 1.65 4.92 1.65c1.55 0 2.87-.32 3.96-.95 1.09-.63 1.9-1.44 2.43-2.43.53-.98.79-1.98.79-2.99 0-2.65-.82-5.82-2.46-9.5l1.69-3.52L22.38.79c.16-.05.39-.07.67-.07.54 0 .98.19 1.32.56s.53.88.58 1.51c.14 2.04.27 5.02.39 8.94.02.38.04.75.04 1.13s.01.71.04 1.02c.05 1.03.22 1.78.53 2.25s.81.7 1.51.7c.84 0 1.52-.18 2.04-.53.52-.35.97-1 1.37-1.93.75-1.71 1.33-2.96 1.74-3.75.41-.79.94-1.46 1.58-2.04.64-.57 1.44-.86 2.37-.86 1.83 0 3.27.94 4.31 2.83s1.69 4.06 1.95 6.53c1.57-.02 2.77-.13 3.61-.33.83-.2 1.41-.49 1.72-.88.32-.39.47-.89.47-1.5 0-.75-.16-1.67-.49-2.76-.33-1.09-.69-2.1-1.09-3.04l2.43-1.23c1.22 3.1 1.83 5.44 1.83 7.04 0 1.83-.67 3.18-2 4.04-1.34.87-3.53 1.34-6.58 1.41-.49 2.21-1.8 3.93-3.92 5.19-2.12 1.25-4.68 1.98-7.69 2.16l-1.2-2.88c2.6-.14 4.8-.63 6.58-1.46ZM10.38 5.66l.11 3.31-3.2.28-.46-3.31 3.55-.28Zm25.1 10.83c.88.28 1.81.42 2.8.42h1.93c-.16-1.67-.55-3.08-1.16-4.26-.61-1.17-1.38-1.76-2.32-1.76-.75 0-1.42.45-2.02 1.34-.6.89-1.11 1.92-1.53 3.1.66.49 1.42.88 2.3 1.16ZM43.64.21C45.06.07 46.43 0 47.74 0c.96 0 1.67.02 2.11.07l-.21 2.81c-.42-.05-1.08-.07-1.97-.07-1.2 0-2.44.07-3.73.21s-2.44.32-3.45.53L39.86.81c1.1-.26 2.36-.46 3.78-.6Z" data-name="Layer 1" style="fill: currentcolor;"></path>
            </svg>
            `

            let deleteCourseBtn = $.createElement('button')
            deleteCourseBtn.className = 'delete-course-btn center border-radius'  
            deleteCourseBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" class="delete-course-btn__svg">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M10 12.708v3.884m4-3.884v3.884m-8.702-3.975A5.728 5.728 0 0 1 6.626 9.78a30.54 30.54 0 0 0 10.748 0 5.729 5.729 0 0 1 1.328 2.837l.038.233a7.347 7.347 0 0 1-.191 3.193l-.118.411c-.656 2.293-2.612 4.016-5.026 4.427-.93.159-1.88.159-2.81 0-2.414-.411-4.37-2.134-5.026-4.427l-.118-.411a7.347 7.347 0 0 1-.19-3.192l.037-.234Zm12.213-2.862c-3.642.668-7.38.668-11.022 0C5.625 9.596 5 8.864 5 8.011v-.147c0-1.078.9-1.952 2.01-1.952h9.98c1.11 0 2.01.874 2.01 1.952v.147c0 .853-.625 1.585-1.489 1.744ZM9.228 4.798C9.078 5.15 9 5.53 9 5.912h6c0-.382-.078-.76-.228-1.114a2.907 2.907 0 0 0-.65-.945 3.008 3.008 0 0 0-.974-.631 3.079 3.079 0 0 0-2.296 0c-.364.146-.695.36-.973.631-.279.27-.5.592-.65.945Z"></path>
            </svg>
            `

            let loading = $.createElement('div')
            loading.className = 'loading center'
            loading.style.marginRight = '2.8rem'
            loading.innerHTML = `
                <span class="loading__circle"></span>
                <span class="loading__circle loading__circle--mid"></span>
                <span class="loading__circle"></span>
            `

            deleteCourseBtn.addEventListener('click', function(event){
                createCircleForBtn(event, this, this.offsetWidth)
                deleteCourseHandler(courseId, loading, deleteCourseBtn, courseObj.courseTitle)
            })
    
            containerCourseCover.append(containerCourseImg)
            containerTitleCourseAndTeachersName.append(containerCourseLinkCourse, containerTeachersNameAndTeacherSvg)
            containerCoverAndTitleCourseAndTeachersName.append(containerCourseCover, containerTitleCourseAndTeachersName)
            containerCorsePriceInfo.append(containerCorseOffInfo, containerCorsePriceAndTomanSvg)
            containerCoursePriceAndDeleteBtn.append(containerCorsePriceInfo, deleteCourseBtn, loading)
            containerCourse.append(containerCoverAndTitleCourseAndTeachersName, containerCoursePriceAndDeleteBtn)
            coursesFragment.append(containerCourse)
        }
    }
    totalContainerCourses.append(coursesFragment)
    theAmountPayableHandler()
}

const deleteCourseHandler = async (courseId, loading, deleteCourseBtn, courseTitle) =>{
    addActiveToLoadingAndAddInactiveToAnotherElm(loading, deleteCourseBtn)
    await deleteData(`${userToken}selectedCourseUser`, courseId)
    createModal(`${courseTitle} از سبد خرید حذف شد .`, 'fa fa-check', '#00c073')
    getCourses()
    removeActiveToLoadingAndRemoveInactiveToAnotherElm(loading, deleteCourseBtn)
}

const totalPurchaseWithoutDiscount = (price) =>{
    totalSumWithoutDiscount += +price
    totalSumElm.innerText = sp(totalSumWithoutDiscount)
}

const totalDiscountHandler = (mainPrice, courseDiscountPercent) =>{
    totalDiscount += (+mainPrice) * (+courseDiscountPercent/100)
    totalOffElm.innerText = `${sp(totalDiscount)} -`
}

const checkDiscountHandler = () =>{
    let coursesArr = Object.entries(coursesObj)
    let isTrue = coursesArr.every(course => course[1].courseDiscountPercent === '')
    if(isTrue){
        totalDiscount = 0
        totalOffElm.innerText = `${sp(totalDiscount)} -`
    }
}

const theAmountPayableHandler = () =>{
    checkDiscountHandler()
    theAmountPayable = totalSumWithoutDiscount - totalDiscount
    theAmountPayableElm.innerText = sp(theAmountPayable)
}


const putSelectedCourses = async () =>{
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    
    for(let courseId in coursesObj){
        let courseObj = coursesObj[courseId]
        const selectedCourseInfo = {
            courseTitle: courseObj.courseTitle,
            imgCourse: courseObj.imgCourse,
            price: courseObj.price,
            coursePriceWithoutOff: courseObj.coursePriceWithoutOff,
            courseDiscountPercent: courseObj.courseDiscountPercent,
            purchaseStatus: 'bought',
            date: `${year}/${month}/${day}`,
            table: courseObj.table
        }
        await Promise.all([putData(selectedCourseInfo, `${userToken}selectedCourseUser`, courseId), setNumberOfCourseStudent(courseObj.table, courseObj.purchaseStatus)])
    }
    createModal('دوره‌ها با موفقیت خریداری شدند .', 'fa fa-check', '#00c073')
    addActiveAndRemoveInactiveFromTotalContainerMsg()
    removeActiveToLoadingAndRemoveInactiveToAnotherElm(loading, paymentBtn)
    addInactiveClassToCalculationsAndCoursesSectionAndAnotherElm(containerMsgLogout)
    addClass(containerMsgGoToCoursesPage, 'active')
    newStudent()
}

const newStudent = async () =>{

    const [allStudents, user] = await Promise.all([getAllData('allStudents'), getAllData(`allUsers/${userToken}`)])
    if(allStudents){
        let allStudentsArr = Object.entries(allStudents)
        let userIndex = allStudentsArr.findIndex(userInfo => userInfo[1].userEmail === user.userEmail)

        if(userIndex === -1) await postData(user, 'allStudents')
    }else await postData(user, 'allStudents')
}

const setNumberOfCourseStudent = async (courseTable, purchaseStatus) =>{
    let courseTableData = await getAllData(`${courseTable}`)
    if(courseTableData){
        let courseTableDataArr = Object.entries(courseTableData)
        if(purchaseStatus !== 'bought'){
            await putData({numberLike: courseTableDataArr[0][1].numberLike , numberOfStudent: Number(courseTableDataArr[0][1].numberOfStudent) + 1 , courseTitle: courseTableDataArr[0][1].courseTitle}, courseTable, courseTableDataArr[0][0])
        }
    }
}

//EVENTS

discountCodeInputElm.addEventListener('focus', () =>{
    addClass(containerDiscountCodeInput, 'new-style')
})

discountCodeInputElm.addEventListener('blur', () =>{
    removeClass(containerDiscountCodeInput, 'new-style')
})

paymentBtn.addEventListener('click', () =>{
    addActiveToLoadingAndAddInactiveToAnotherElm(loading, paymentBtn)
    putSelectedCourses()
})

window.addEventListener('load', () =>{
    if(isLogin) getCourses()
    else addInactiveClassToCalculationsAndCoursesSectionAndAnotherElm(containerMsgGoToCoursesPage)
})