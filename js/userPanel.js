'use strict'

import { addClass, removeClass, createCircleForBtn } from "./funcs.js";
import { getCookie, setCookie } from "./cookie.js";
import { getAllData, putData } from "./HTTPreq.js";
import { e2p, sp } from "./convertNumbers.js";
import { createModal } from "./modal.js";

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
const containerUserPanelCoverLink = $.querySelector('.container-user-panel-cover-link')
const userProfileLink = $.querySelector('.user-profile-link')
const totalContainerMainContents = $.querySelectorAll('.total-container-main-content')
const containerWelcomeUsername = $.querySelector('.container-welcome__username')
const myRecordsWrapperLinks = $.querySelectorAll('.my-records-wrapper--link')
const myRecordsWrapperDate = $.querySelector('.my-records-wrapper__date') 
const myRecordsWrapperCourses = $.querySelector('.my-records-wrapper__courses') 
const myRecordsWrapperOrders = $.querySelector('.my-records-wrapper__orders')
const tbodyProfile = $.querySelector('.tbody-profile')
const tbodyCourses = $.querySelector('.tbody-courses')
const tbodyOrders = $.querySelector('.tbody-orders')
const loading = $.querySelector('.loading') 
const totalContainerForm = $.querySelector('.total-container-form')
const containerProfileCover = $.querySelector('.container-profile-cover')
const inputFile = $.querySelector('.input-file')
const profileUsername = $.querySelector('.container-username__name')
const containerUsernameType = $.querySelector('.container-username__type')
const inputs = Array.from($.querySelectorAll('.input'))
const inputName = $.getElementById('input-name')
const inputEmail = $.getElementById('input-email')
const inputAreaOfExpertise = $.getElementById('input-area-of-expertise')
const recordChanges = $.querySelector('.record-changes')

let tokenObj = getCookie('accessToken')
let {isLogin, userToken} = tokenObj
let locationSearch = location.search
let locationSearchParam = new URLSearchParams(locationSearch)
let userParam = locationSearchParam.get('param')
let numberOfOrder = 0
let trFragment =  $.createDocumentFragment()
let userPhone = null
let registrationTime = null
let file = null

//FUNCTIONS

const getUser = async () =>{
    let userObj = await getAllData(`allUsers/${userToken}`)
    userPanelUsername.innerText = userObj.username
    containerWelcomeUsername.innerText = `${userObj.username} عزیز😍؛`
    headerTitleText.innerText = `سلام؛ ${userObj.username}`
    myRecordsWrapperDate.innerText = userObj.date
    profileUsername.innerText = userObj.username
    containerUsernameType.innerText = userObj.areaOfExpertise || 'دانشجو'
    inputName.value = userObj.username
    inputEmail.value = userObj.userEmail   
    inputAreaOfExpertise.value = userObj.areaOfExpertise || ''
    userPhone = userObj.userPhone 
    registrationTime = userObj.hours 
    if(userObj.profileImg){
        generateImg(containerProfileCover, userObj.profileImg)
        generateImg(containerUserPanelCoverLink, userObj.profileImg)
    }else showTheFirstLetterOfTheUser(userObj.username)
}

const getCourses = async () =>{
    let selectedCourseArr = []
    let coursesArr = []
    let coursesObj = await getAllData(`${userToken}selectedCourseUser`)

    if(!coursesObj) numberOfOrderElm.innerText = e2p(0)
    else if(coursesObj){
        for(let courseId in coursesObj){
            coursesArr.push(coursesObj[courseId])
            if(coursesObj[courseId].purchaseStatus === 'bought') selectedCourseArr.push(coursesObj[courseId])
            else numberOfOrder++
        }
    }
    numberOfOrderElm.innerText = e2p(numberOfOrder) 
    myRecordsWrapperCourses.innerText = e2p(selectedCourseArr.length) 
    myRecordsWrapperOrders.innerText = e2p(numberOfOrder) 

    showTableHandler(coursesObj, coursesArr, selectedCourseArr)    
}

const showTableHandler = (coursesObj, coursesArr, selectedCourseArr) =>{
    if(userParam === 'profile'){
        if(coursesObj) allCourseInTableHandler(coursesArr, tbodyProfile)
        else{
            let containerTable = tbodyProfile.parentElement.parentElement
            let warningProfile = containerTable.previousElementSibling
            addClass(containerTable, 'inactive')
            addClass(warningProfile, 'active')
        }
    }else if(userParam === 'orders') purchaseProcessHandler(coursesObj, selectedCourseArr, 1, tbodyCourses, allCourseInTableHandler)
    else if(userParam === 'courses') purchaseProcessHandler(coursesObj, selectedCourseArr, 2, tbodyOrders, coursesIntBodyOrders)
}

const purchaseProcessHandler = (coursesObj, selectedCourseArr, index, tbody, callback) =>{
    if(coursesObj){
        if(selectedCourseArr.length > 0) callback(selectedCourseArr, tbody)
        else createMsg(totalContainerMainContents[index])
    }else{
        let warningOrders = totalContainerMainContents[index].firstElementChild.firstElementChild.nextElementSibling
        addClass(totalContainerMainContents[index].firstElementChild.firstElementChild, 'inactive')
        addClass(totalContainerMainContents[index].firstElementChild.lastElementChild, 'inactive')
        addClass(warningOrders, 'active')
    }
}

const createMsg = (totalContainerMainContent) =>{
    let containerTable = totalContainerMainContent.querySelector('.container-table')
    let table = totalContainerMainContent.querySelector('.table')
    removeClass(table, 'inactive')

    containerTable.innerHTML = `
        <p class="msg">هنوز فرآیند خرید شما تکمیل نشده است .</P>
    `
}

const allCourseInTableHandler = (courseArr, tbody) =>{
    courseArr.forEach((course, index) =>{
        let tr = $.createElement('tr')
        tr.className = 'tbody__tr space-between'

        let tdRow = $.createElement('td')
        tdRow.className = 'tbody__td tbody__td--row center'
        tdRow.innerText = e2p(index)

        let tdCourse = $.createElement('td')
        tdCourse.className = 'tbody__td align-items-center'

        let courseImg = $.createElement('img')
        courseImg.className = 'course-img border-radius-circle'
        courseImg.src = `.${course.imgCourse.slice(course.imgCourse.indexOf('/imgs'))}`

        let courseName = $.createElement('span')
        courseName.className = 'course-name'
        courseName.innerText = course.courseTitle

        let tdLicense = $.createElement('td')
        tdLicense.className = 'tbody__td center'
        if(course.price === '0') tdLicense.innerHTML = '<a href="#" class="tbody__td--link">دانلود از صفحه دوره</a>'
        else tdLicense.innerText = 'اسپات‌پلیر'

        let tdPrice = $.createElement('td')
        tdPrice.className = 'tbody__td tbody__td--price center'
        tdPrice.innerText = sp(course.price)

        let tdDate = $.createElement('td')
        tdDate.className = 'tbody__td tbody__td--date center'

        if(course.date){
            tdDate.style.flexDirection = 'column'

            let date = $.createElement('p')     
            let time = $.createElement('p')

            date.innerText = course.date
            time.innerText = e2p(course.time)
            tdDate.append(date, time)
        }
        else tdDate.innerText = '-'

        let tdStatus = $.createElement('td') 
        tdStatus.className = 'tbody__td tbody__td--status center'    

        let courseStatus = $.createElement('span')
        courseStatus.className = 'course-status'
        if(course.purchaseStatus === 'bought') courseStatus.innerText = 'موفق'
        else{
            courseStatus.innerText = 'ناموفق'
            courseStatus.style.background = '#ef4444'
        }

        tdCourse.append(courseImg, courseName)
        tdStatus.append(courseStatus)
        tr.append(tdRow, tdCourse, tdLicense, tdPrice, tdDate, tdStatus)
        trFragment.append(tr)
    })
    tbody.append(trFragment)
}

const coursesIntBodyOrders = (selectedCourseArr) =>{
    selectedCourseArr.forEach(course =>{
        let tr = $.createElement('tr')
        tr.className = 'thead__tr space-between'

        let tdCourseTitle = $.createElement('td')
        tdCourseTitle.className = 'tbody__td center tbody__td--course-title'
        tdCourseTitle.innerText = course.courseTitle

        let tdAccess = $.createElement('td')
        tdAccess.className = 'tbody__td center tbody__td--access'
        tdAccess.innerText = ''

        let tdTelChannel = $.createElement('td')
        tdTelChannel.className = 'tbody__td center tbody__td--tel-channel'

        let telChannelElm = $.createElement('span')
        telChannelElm.className = 'telegram-channel'

        let tdTelSupport = $.createElement('td')
        tdTelSupport.className = 'tbody__td center'
        if(course.price === '0'){
            tdTelSupport.innerText = 'دوره رایگان پشتیبانی ندارد'
            telChannelElm.innerText = 'ندارد'
        }else{
            tdTelSupport.innerText = 'دوره رایگان پشتیبانی دارد'
            telChannelElm.innerText = 'دارد'
        }

        let tdTeacherCourse = $.createElement('td')
        tdTeacherCourse.className = 'tbody__td center'
        tdTeacherCourse.innerHTML = 'صاحب محمدی'

        let tdCoach = $.createElement('td')
        tdCoach.className = 'tbody__td center'
        tdCoach.innerHTML = 'صاحب محمدی'

        let tdStudentPage = $.createElement('td')
        tdStudentPage.className = 'tbody__td center'
        tdStudentPage.innerHTML = '-'

        tdTelChannel.append(telChannelElm)
        tr.append(tdCourseTitle, tdAccess, tdTelChannel, tdTelSupport, tdTeacherCourse, tdCoach, tdStudentPage)
        trFragment.append(tr)
    })
    tbodyOrders.append(trFragment)
}

const checkInnerHeight = (elm) =>{
    setTimeout(() => {
        if(window.innerHeight > 704 && window.innerWidth < 1024){
            sectionAside.style.height = '73.4rem'
            elm.style.height = '65.4rem'
            let containerMainContent = elm.firstElementChild
            containerMainContent.style.height = 'calc(100% - 1.6rem)'
        }
    }, 3000);
}

const getFile = async (This) =>{
    file = This.files[0];
    let fileType = file.type;
    let validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];

    if(validExtensions.includes(fileType)){
        let fileURL = null
        let fileReader = new FileReader();
        
        fileReader.onload = async () =>{
            fileURL = fileReader.result;
            containerProfileCover.innerHTML = ''
            generateImg(containerProfileCover, fileURL)
            let userData = {date: myRecordsWrapperDate.innerText, hours: registrationTime, userEmail: inputEmail.value, userPhone, username: inputName.value, areaOfExpertise: inputAreaOfExpertise.value, profileImg: `${fileURL}`}
            await putData(userData, 'allUsers', userToken)
        }

        fileReader.readAsDataURL(file);
    }else createModal("فایل انتخابی عکس نیست لطفا عکس انتخاب کنید.", 'fa fa-close', '#ef4444')
}

const generateImg = (elm, url) =>{
    elm.innerHTML = `
    <img src="${url}" alt="profile img" class="profile-img Hfull-Vful">
    `
}

const showTheFirstLetterOfTheUser = (username) =>{
    addClass(containerUserPanelCoverLink, 'center')
    containerUserPanelCoverLink.innerText = username[0]
}

const checkInputNameValue = () =>{
    if(/^[\w\d]+[\w\d\.\-\s_]*$/.test(inputName.value)){
        if(inputName.value.length < 6){
            addClass(inputName, 'false')
            createModal('نام و نام خانوادگی باید حداقل شامل 6 کاراکتر باشد', 'fa fa-close', '#ef4444')
        }else removeClass(inputName, 'false')

    }else if(/^[آا-ی۰-۹]+[ا-ی۰-۹آ\.\-\s_]*$/.test(inputName.value)){
        if(inputName.value.length < 6){
            addClass(inputName, 'false')
            createModal('نام و نام خانوادگی باید حداقل شامل 6 کاراکتر باشد', 'fa fa-close', '#ef4444')
        }else removeClass(inputName, 'false')

    }else createModal('لطفا نام کاربری خود را درست وارد کنید', 'fa fa-close', '#ef4444')

}

const checkInputEmailValue = () =>{
    if(/^[\w]+[\.-]?\w+@(gmail|yahoo)\.com$/.test(inputEmail.value)){
        removeClass(inputEmail, 'false')
    }else{
        createModal('لطفا ایمیل خود را درست وارد کنید', 'fa fa-close', '#ef4444')
        addClass(inputEmail, 'false')
    }
}

const checkInputAreaOfExpertiseValue = () =>{
    if(['فرانت‌اند', 'بک‌اند', 'فرانت اند', 'بک اند'].includes(inputAreaOfExpertise.value)) removeClass(inputAreaOfExpertise, 'false')
    else{
        createModal('لطفا حوزه تخصصی خود را درست وارد کنید', 'fa fa-close', '#ef4444')
        addClass(inputAreaOfExpertise, 'false')
    }
}

const getAllUsers = async () =>{
    let allUsersObj = await getAllData('allUsers')
    let allUsersArr = Object.entries(allUsersObj)
    let emailIndex = allUsersArr.findIndex(item => item[1].userEmail === inputEmail.value)

    if(emailIndex === -1) putNewUserDateInDB()
    else{
        if(userPhone === allUsersArr[emailIndex][1].userPhone) putNewUserDateInDB()  
        else createModal('ایمیل شما از قبل وجود دارد لطفا ایمیل دیگری برای خود انتخاب کنید .', 'fa fa-close', '#ef4444')
    }
}

const putNewUserDateInDB = async () =>{
    addClass(loading, 'active')
    addClass(totalContainerForm, 'inactive')
    let userData = {date: myRecordsWrapperDate.innerText, hours: registrationTime, userEmail: inputEmail.value, userPhone, username: inputName.value, areaOfExpertise: inputAreaOfExpertise.value}
    await putData(userData, 'allUsers', userToken)
    getUser()
    removeClass(loading, 'active')
    removeClass(totalContainerForm, 'inactive')
}

//EVENTS

asideMenuLists.forEach(asideMenuList =>{
    asideMenuList.addEventListener('click', function(){
        let param = this.getAttribute('data-param')
        location.href = `./userPanel.html?param=${param}`
    })
})

myRecordsWrapperLinks.forEach(myRecordsWrapperLink =>{
    myRecordsWrapperLink.addEventListener('click', function(){
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

containerProfileCover.addEventListener('click', () => inputFile.click())

inputFile.addEventListener("change", function(){
    getFile(this)
})

inputs.forEach(input => input.addEventListener('focus', () => addClass(input, 'focus')))

inputs.forEach(input => input.addEventListener('blur', () => removeClass(input, 'focus')))

inputName.addEventListener('blur', checkInputNameValue)

inputEmail.addEventListener('blur', checkInputEmailValue)

inputAreaOfExpertise.addEventListener('blur', checkInputAreaOfExpertiseValue)

recordChanges.addEventListener('click', (event) =>{
    event.preventDefault()
    let dontHaveFalse = inputs.every(input => input.classList.contains('false') === false)

    if(inputAreaOfExpertise.value === '') createModal('لطفا حوزه تخصصی خود را وارد کنید', 'fa fa-close', '#ef4444')
    else if(dontHaveFalse) getAllUsers()
    else createModal('لطفا اطلاعات خود را درست وارد کنید', 'fa fa-close', '#ef4444')
})

window.addEventListener('DOMContentLoaded', () =>{
    getCookie('accessToken')
    getUser()
    getCourses()

    asideMenuLists.some(asideMenuList =>{
        let param = asideMenuList.getAttribute('data-param')

        if(userParam === 'me'){
            title.innerText = `پنل کاربری - من`
            totalContainerMainContents[3].style.display = 'block'
            checkInnerHeight(totalContainerMainContents[3])
        }else{
            if(param === userParam){
                addClass(asideMenuList, 'active')
    
                if(userParam === 'profile'){
                    title.innerText = `پنل کاربری - داشبورد`
                    totalContainerMainContents[0].style.display = 'block'
                    checkInnerHeight(totalContainerMainContents[0])
                }else if(userParam === 'orders'){
                    title.innerText = `پنل کاربری - سفارش‌های من`
                    totalContainerMainContents[1].style.display = 'block'
                    checkInnerHeight(totalContainerMainContents[1])
                }else if(userParam === 'courses'){
                    title.innerText = `پنل کاربری - دوره‌های من`
                    totalContainerMainContents[2].style.display = 'block'
                    checkInnerHeight(totalContainerMainContents[2])
                }
                return true
            }
        }
    })
})