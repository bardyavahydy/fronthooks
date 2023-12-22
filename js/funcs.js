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

export { createCircleForBtn, addClass, removeClass, convertGregorianDateToSolar } 