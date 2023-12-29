import { createModal } from "./modal.js" 

const BASE_URL = 'https://fronthooks4-default-rtdb.firebaseio.com/'

const getAllData = async (table) =>{
    try{
        let res = await fetch(`${BASE_URL}${table}.json`)
        let data = await res.json()
        return data
    }catch(err){
        errorHandler()
        setTimeout(() => location.reload(), 2000)
    }
}

const postData = async (data, table) =>{
    try{
        let res = await fetch(`${BASE_URL}${table}.json`,{
            method:'POST',
            headers:{
                "Content-type": 'application/json'
            },
            body:JSON.stringify(data)
        })
    }catch(err){
        errorHandler()
    }
}

const putData = async (data, table, id) =>{
    try{
        let res = await fetch(`${BASE_URL}${table}/${id}.json`,{
            method:'PUT',
            headers:{
                "Content-type": 'application/json'
            },
            body:JSON.stringify(data)
        })
    }catch(err){
        errorHandler()
    }
}

const deleteData = async (table, id) =>{
    try{
        let res = await fetch(`${BASE_URL}${table}/${id}.json`,{
            method:'DELETE'
        })
    }catch(err){
        errorHandler()
    }
}

const errorHandler = () => createModal('ارتباط به درستی برقرار نشد لطفا دوباره تلاش کنید . 🙏🏼', 'fa fa-close', '#ef4444')


export { getAllData, postData, putData, deleteData }