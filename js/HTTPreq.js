import { createModal } from "./modal.js" 

const BASE_URL = 'https://fronthooks2-default-rtdb.firebaseio.com/'

const getAllUsers = async (allUsersInWeb) =>{
    try{
        let res = await fetch(`${BASE_URL}${allUsersInWeb}`)
        let allUsers = await res.json()
        return allUsers
    }catch(err){
        createModal('ارتباط به درستی برقرار نشد اطفا دوباره تلاش کنید . 🙏🏼', 'fa fa-close', '#ef4444')
        setTimeout(() => location.reload(), 2000)
    }
}

const postUser = async (userData) =>{
    try{
        let res = await fetch(`https://fronthooks2-default-rtdb.firebaseio.com/allUsers.json`,{
            method:'POST',
            headers:{
                "Content-type": 'application/json'
            },
            body:JSON.stringify(userData)
        })
        console.log(res);
    }catch(err){
        if(document.querySelector('.container-modal'))
        createModal('ارتباط به درستی برقرار نشد اطفا دوباره تلاش کنید . 🙏🏼', 'fa fa-close', '#ef4444')
    }
}

export { getAllUsers, postUser }