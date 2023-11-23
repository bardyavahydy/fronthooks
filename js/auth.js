'use strict'

import { p2e, e2p } from "./convertNumbers.js"
import { addClass, createCircleForBtn, removeClass } from "./funcs.js"
import { createModal, removeModal } from "./modal.js"
import { getAllUsers, postUser } from "./HTTPreq.js"
import { setCookie, getCookie } from "./cookie.js"

const $ = document

const containerFirstForm = $.querySelector('.container-first-form')
const form = $.querySelector('form')
const inputElm = $.querySelector('.form__input')
const btnRegister = $.querySelector('.btn-register')
const containerSecondForm = $.querySelector('.container-second-form')
const secondFormSvgBack = $.querySelector('.second-form__svg-back')
const secondFormMessage = $.querySelector('.second-form__message')
const digits = $.querySelectorAll('.input-digits')
const textCountDown = $.querySelector('.second-form__count-down')
const textAlarm = $.querySelector('.second-form__alarm')
const btnConfirm = $.querySelector('.btn-confirm')
const containerThirdForm = $.querySelector('.container-third-form')
const usernameInputElm = $.querySelector('.username-input-elm')
const wrapperEmailInput = $.querySelector('.third-from__container-email-input')
const userEmailInput = $.querySelector('.user-email-input')
const wrapperPhoneInput = $.querySelector('.third-from__container-phone-input')
const userPhoneInput = $.querySelector('.user-phone-input')
const btnSubmitInformation = $.querySelector('.btn-submit-information')
const loading = $.querySelector('.loading')
const authentication = $.querySelector('.authentication')
const completionOfInformation = $.querySelector('.completion-of-information')

const phoneNumberRegex = /^09(1\d|9[0-6]|3\d|0[0-5]|41|2[0-3])\d{7}$/
const emailRegex = /^[\w]+[\.-]?\w+@(gmail|yahoo)\.com$/

let clearCountDown = null
let randomCode = null
let code = null
let persianCode = null
let counter = null
let codeEnteredByTheUser = ''
let allUsersArr = null
let userData = null
let accessToken = null

// FUNCTIONS

const emptyInputValue = (input) => input.value = ''

const convertPersianToEng = () => {
    let allInputs = $.querySelectorAll('input')
    const regexPersian = /^[۰-۹\d]+$/
    allInputs.forEach(input =>{
        input.addEventListener('keyup', event =>{
            let {target} = event
            if(regexPersian.test(target.value)) target.value = p2e(target.value)
        })
    })
    inputElm.value = p2e(inputElm.value)
}
convertPersianToEng()

const addActiveClassToLoadingElmAndAnotherElm = (elm, classname) =>{
    addClass(elm, classname)
    addClass(loading, 'active')
}

const removeActiveClassToLoadingElmAndAnotherElm = (elm, classname) =>{
    removeClass(elm, classname)
    removeClass(loading, 'active')
}

const createCode = () =>{
    randomCode = Math.floor(Math.random() * 999_999)
    if(randomCode > 99_999) return randomCode
    else createCode()
}

const validatePhoneNumber = () =>{
    addActiveClassToLoadingElmAndAnotherElm(btnRegister, 'inactive')

    if(phoneNumberRegex.test(inputElm.value)){
        correctUserInformation(`کد تایید برای این شماره موبایل : ${e2p(inputElm.value)} ساخته شد`)           
    }
    else incorrectUserInformation('شماره موبایل شما معتبر نمی‌باشد!!')

}

const validateEmail = () =>{
    addActiveClassToLoadingElmAndAnotherElm(btnRegister, 'inactive')

    if(emailRegex.test(inputElm.value)){
        correctUserInformation(`کد تایید برای این ایمیل : ${inputElm.value} ساخته شد`)
    }else incorrectUserInformation('ایمیل شما معتبر ننننمی‌باشد!!')

}

const incorrectUserInformation = (message) =>{
    createModal(message, 'fa fa-close', '#ef4444')
    removeActiveClassToLoadingElmAndAnotherElm(btnRegister, 'inactive')
    inputElm.focus()
}

const correctUserInformation = (message) =>{
    secondFormMessage.innerText = message
    code = createCode()
    setTimeout(() => {
        persianCode = e2p(code)
        showModalForConfigCode(persianCode)
        addClass(containerFirstForm, 'inactive')
        addClass(containerSecondForm, 'active')
        digits[5].focus()
    }, 3000);
}

const showModalForConfigCode = (persianCode) =>{
    removeModal()
    createModal(`لطفا کد تایید را وارد کنید: ${persianCode}`, 'fa fa-check', '#00c073')
    removeClass(loading, 'active')
    countDown(90)
}

const countDown = (counting) =>{
    counter = counting
    clearCountDown = setInterval(() => {
        textCountDown.innerText = `ارسال مجدد کد تا ${e2p(counter)} ثانیه دیگر`
        --counter
        if(counter < 0) clearInterval(clearCountDown)
        if(counter < 0 && randomCode !== +codeEnteredByTheUser) pointerEventsDigitsInput()
    }, 1000);
}

const pointerEventsDigitsInput = () =>{
    digits.forEach(digitInput =>{
        digitInput.style.pointerEvents = 'none'
        digitInput.value = ''
        digitInput.blur()
        addClass(textCountDown, 'inactive')        
        addClass(btnConfirm, 'inactive')        
        addClass(textAlarm, 'active')            
    })
}

const creatingAReverificationCode = () =>{
    addActiveClassToLoadingElmAndAnotherElm(btnConfirm, 'none')
    removeModal()
    code = createCode()
    setTimeout(() => {
        persianCode = e2p(code)
        showModalForConfigCode(persianCode)
        digits[5].focus()
        removeClass(textCountDown, 'inactive')        
        removeClass(textAlarm, 'active')
        removeClass(btnConfirm, 'inactive')        
        btnConfirm.style.display = 'block' 
        digits.forEach(digitInput => digitInput.style.pointerEvents = 'auto' )
    }, 3000);
}

const notFocusEmptyInput = (digitInput, nextDigitInput) =>{
    if(nextDigitInput && nextDigitInput.value === ''){
        nextDigitInput.focus()
        digitInput.blur()
    }
}

const getAllUsersFromDB = async (userInput) =>{
    try{
        let allUsers = await getAllUsers('allUsers.json')
        allUsersArr = Object.entries(allUsers)
        
        if(isNaN(userInput)){
            let emailIndex = allUsersArr.findIndex(user => {
                accessToken = user[0]
                return user[1].userEmail === userInput
            })

            if(emailIndex !== -1) existenceOfDataInTheDBHandler(accessToken)
            else noDataInTheDBHandler(wrapperEmailInput)
        }else{
            let phoneIndex = allUsersArr.findIndex(user => {
                accessToken = user[0]
                return user[1].userPhone === userInput
            })

            if(phoneIndex !== -1) existenceOfDataInTheDBHandler(accessToken)
            else noDataInTheDBHandler(wrapperPhoneInput)
        }    
    }catch(err){
        console.log(err);
    }
}

const goToIndexPage = () =>{
    createModal('به فرانت هوکس خوش آمدید', 'fa fa-check', '#00c073')
    removeModal()
    setTimeout(() => {
        location.assign('./index.html')
        digits.forEach(digitInput => emptyInputValue(digitInput))
    }, 3000);
}

const existenceOfDataInTheDBHandler = (accessToken) =>{
    goToIndexPage()
    emptyInputValue(inputElm)
    setCookie('accessToken', accessToken)
}

const noDataInTheDBHandler = (elm) =>{
    removeActiveClassToLoadingElmAndAnotherElm(containerSecondForm, 'active')
    addClass(containerThirdForm, 'active')
    addClass(completionOfInformation, 'active')
    if(window.innerWidth < 370 &&  completionOfInformation.classList.contains('active')){
        authentication.style.display = 'none'
        completionOfInformation.style.display = 'flex'
    }
    addClass(elm, 'inactive')
}

const checkNewUserData = () =>{
    if(wrapperPhoneInput.classList.contains('inactive')){
        if((emailRegex.test(userEmailInput.value))){
            let indexEmail = allUsersArr.findIndex(user => user[1].userEmail === userEmailInput.value)
            if(indexEmail === -1){
                userData = {username:usernameInputElm.value , userEmail:userEmailInput.value , userPhone: inputElm.value}
                submitNewData(userData)
            }else{
                createModal('ایمیل شما از قبل وجود دارد لطفا ایمیل دیگری برای خود انتخاب کنید .', 'fa fa-close', '#ef4444')
            }
                
        }else createModal('ایمیل شما معتبر نمی‌باشد!!', 'fa fa-close', '#ef4444')

    }else{
        if((phoneNumberRegex.test(userPhoneInput.value))){
            let indexPhone = allUsersArr.findIndex(user => user[1].userPhone === userPhoneInput.value)
            if(indexPhone === -1){
                userData = {username:usernameInputElm.value , userEmail:inputElm.value , userPhone: userPhoneInput.value}
                submitNewData(userData)
            }else{
                createModal('شماره موبایل شما از قبل وجود دارد لطفا شماره‌ی دیگری برای خود انتخاب کنید .', 'fa fa-close', '#ef4444')
            }
        }else createModal('شماره موبایل شما معتبر نمی‌باشد!!', 'fa fa-close', '#ef4444')
    }


}

const submitNewData = () =>{
    addActiveClassToLoadingElmAndAnotherElm(btnSubmitInformation, 'inactive')
    postUser(userData)
    emptyInputValue(inputElm)
    goToIndexPage()
    emptyInputValue(usernameInputElm)
    emptyInputValue(userEmailInput)
    emptyInputValue(userPhoneInput)
}

digits.forEach(digitInput =>{
    digitInput.addEventListener('keyup', event =>{
        let {key} = event
        if(isNaN(digitInput.value)) digitInput.value = ''
        else if(digitInput.value && digitInput.previousElementSibling){
            digitInput.blur()
            digitInput.previousElementSibling.focus()
        }else if(key === 'Backspace'){
            digitInput.blur()
            digitInput.nextElementSibling.focus()
            emptyInputValue(digitInput.nextElementSibling)
            codeEnteredByTheUser = +(String(codeEnteredByTheUser).slice(0, codeEnteredByTheUser.length - 1))
        }

        if(digitInput.value) codeEnteredByTheUser += digitInput.value
        
        if(randomCode === +codeEnteredByTheUser){
            clearInterval(clearCountDown)
            removeModal()
            addActiveClassToLoadingElmAndAnotherElm(btnConfirm, 'none')
            getAllUsersFromDB(inputElm.value)   
        }else if(String(codeEnteredByTheUser).length == 6 && randomCode !== +codeEnteredByTheUser){
            removeModal()
            createModal('کد تایید را صحیح وارد نکرده‌اید!!', 'fa fa-close', '#ef4444')
            digits.forEach(digitInput => emptyInputValue(digitInput))
            addClass(textCountDown, 'inactive')        
            addClass(textAlarm, 'active')  
            digits[5].focus()
        }
    })
    
    digitInput.addEventListener('focus', () => notFocusEmptyInput(digitInput, digitInput.nextElementSibling))

})

// EVENT HANDLER

inputElm.addEventListener('keyup', event =>{
    let {key} = event
    if(key !== 'Enter') removeModal()
})

btnRegister.addEventListener('click', event =>{
    createCircleForBtn(event, btnRegister, btnRegister.offsetWidth)

    if(inputElm.value){
        removeModal()
        if(isNaN(inputElm.value)) validateEmail()
        else validatePhoneNumber()
    }else{
        removeModal()
        createModal('لطفا شماره موبایل یا ایمیل خود را وارد کنید .', 'fa fa-close', '#ef4444') 
    } 
})

userEmailInput.addEventListener('keyup', removeModal)

secondFormSvgBack.addEventListener('click', () =>{
    if($.querySelector('.container-modal')){
        removeModal()
        createModal('لطفا چند لحظه صبر کند .', 'fa fa-close', '#ef4444')
    }
    else{
        removeClass(containerFirstForm, 'inactive')
        removeClass(containerSecondForm, 'active')
        removeClass(btnRegister, 'inactive')
        if(loading.classList.contains('active')) loading.classList.remove('active')
        clearInterval(clearCountDown)
    }
})

textAlarm.addEventListener('click', creatingAReverificationCode) 

btnSubmitInformation.addEventListener('click', event =>{
    event.preventDefault()
    checkNewUserData()
})

window.addEventListener('load', () =>{
    form.style.animation = 'formAnimation .4s linear forwards'
    getCookie('accessToken', 'auth')
})