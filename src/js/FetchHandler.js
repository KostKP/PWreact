import { getToken, getTokenId } from './auth/AuthMgmt';

const urlBase = 'https://localhost:7113/'

export const registerUser = async (email, password) => {
    const response = await fetch(urlBase+"account/register", {
        method: 'post',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    return response
}

export const requestWeekStats = async () => {
    const response = await fetch(urlBase+"action/week", {
        method: 'get',
        headers: {
            'Content-Type':'application/json',
            'Authorization': 'Bearer '+getToken()
        }
    })
    return response
}

export const createAccessToken = async (email, password) => {
    const response = await fetch(urlBase+"token/create", {
        method: 'post',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    return response
}

export const refrashAccessToken = async () => {
    const response = await fetch(urlBase+"token/recreate", {
        method: 'post',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            id: getTokenId()
        })
    })
    return response
}

export const removeAccount = async (password) => {
    const response = await fetch(urlBase+"account/remove", {
        method: 'post',
        headers: {
            'Content-Type':'application/json',
            'Authorization': 'Bearer '+getToken()
        },
        body: JSON.stringify({
            password: password
        })
    })
    return response
}

export const storeAction = async (action) => {
    const response = await fetch(urlBase+"account/remove", {
        method: 'post',
        headers: {
            'Content-Type':'application/json',
            'Authorization': 'Bearer '+getToken()
        },
        body: JSON.stringify({
            action: action
        })
    })
    return response
}