const $ = document
const addClass = (elm, className) => elm.classList.add(className) 
const removeClass = (elm, className) => elm.classList.remove(className) 

function createCircleForBtn(event, elm, widthElm){
    let circle = $.createElement('div')
    let readMoreBtnPosition = elm.getBoundingClientRect() 
    elm.style.overflow = 'hidden'
    if(elm.style.position !== 'relative')elm.style.position = 'relative'
    circle.classList.add('circle')
    circle.style.cssText = `width: ${widthElm * 0.1}rem; height: ${widthElm * 0.1}rem; left: ${(event.clientX - readMoreBtnPosition.left - (widthElm / 2))}px; top: ${(event.clientY - readMoreBtnPosition.top - (widthElm / 2))}px`
    elm.appendChild(circle)
    circle.onanimationend = () => circle.remove() 
}

const convertGregorianDateToSolar = (date) =>{
    return moment(date, 'YYYY-M-D').locale('fa').format('YYYY/M/D')
}

const SetTheDate = () =>{
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    let solarDate = convertGregorianDateToSolar(`${year}/${month}/${day}`)
    year = +solarDate.slice(0, 4)
    month = +solarDate.slice(solarDate.indexOf('/') + 1, solarDate.lastIndexOf('/'))
    day = +solarDate.slice(solarDate.lastIndexOf('/') + 1)

    if(month <= 9) month = `0${month}`
    if(day <= 9) day = `0${day}`

    return `${year}/${month}/${day}`
}

const SetTheTime = () =>{
    let time = new Date()
    let hours = time.getHours()
    let minutes = time.getMinutes()
    let seconds = time.getSeconds()

    if(hours <= 9) hours = `0${hours}`
    if(minutes <= 9) minutes = `0${minutes}`
    if(seconds <= 9) seconds = `0${seconds}`

    return `${hours}:${minutes}:${seconds}`
}

export { createCircleForBtn, addClass, removeClass, convertGregorianDateToSolar, SetTheDate, SetTheTime } 