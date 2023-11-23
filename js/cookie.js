const setCookie = (cookieName, cookieValue) =>{
    let now = new Date()
    now.setTime(now.getTime() + (10 * 24 * 60 * 60 * 1000))
    document.cookie = `${cookieName}=${cookieValue}; path=/; expires=${now}`
}

const getCookie = (cookieName, path = null) =>{
    let cookies = document.cookie
    let isLogin = cookies.includes(cookieName)
    let userToken = cookies.slice(cookies.indexOf('=') + 1)
    if(isLogin && location.href.includes(path)) location.href = './index.html'

    return {isLogin, userToken}
}

export { setCookie, getCookie } 