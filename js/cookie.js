const setCookie = (cookieName, cookieValue, expDay) =>{
    let now = new Date()
    now.setTime(now.getTime() + (expDay * 24 * 60 * 60 * 1000))
    document.cookie = `${cookieName}=${cookieValue}; path=/; expires=${now}`
}

const getCookie = (cookieName) =>{
    let cookies = document.cookie
    let isLogin = cookies.includes(cookieName)
    let userToken = cookies.slice(cookies.indexOf('=') + 1)
    if(!isLogin && location.href.includes('userPanel')) location.href = './auth.html'
    else if(isLogin && location.href.includes('auth')) location.href = './index.html'
    return {isLogin, userToken}
}

export { setCookie, getCookie } 