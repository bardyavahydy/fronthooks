const body = document.body

const createModal = (message ,classes , bgColor) =>{
    removeModal()

    let containerModal = document.createElement('div')
    containerModal.className = 'center container-modal'
    containerModal.style.animation = 'modalAnimation 10s linear'

    let tickElmModal = document.createElement('i')
    tickElmModal.className = `${classes} ml-svg`
    tickElmModal.style.background = bgColor
    tickElmModal.style.animation = 'modalIconAnimation .5s linear'
    if(window.innerWidth < 370) tickElmModal.style.display = 'none'

    let messageModal = document.createElement('p')
    messageModal.className = 'container-modal__message-modal'
    messageModal.innerText = message

    let lineTimeModal = document.createElement('div')
    lineTimeModal.classList.add('container-modal__line')
    lineTimeModal.style.background = bgColor
    lineTimeModal.style.animation = 'modalLineAnimation 10s linear'

    containerModal.append(tickElmModal, messageModal, lineTimeModal)
    body.append(containerModal)

    setTimeout(() => {
        containerModal.remove()
    }, 10000);
}

const removeModal = () =>{
    if(document.querySelector('.container-modal')){
        const containerModal = document.querySelector('.container-modal')
        containerModal.remove()
    }
}

export { createModal, removeModal }