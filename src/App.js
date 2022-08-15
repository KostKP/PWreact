
import { LoaderForm } from './js/LoaderForm.js';
import {DashboardForm} from './js/DashboardForm.js';
import React, { useState } from 'react';
import { getUser, getToken, getTokenId, removeUserSession, setUserSession } from './js/auth/AuthMgmt.js';
import AuthFormLogin from './js/auth/AuthFormLogin.js';
import AuthFormRegister from './js/auth/AuthFormRegister.js';
import AccountRemoveForm from './js/AccountRemoveForm.js';
import { refrashAccessToken } from './js/FetchHandler.js';
import { useEffectOnce, useInterval } from './js/CustomHook'

function App() {
  const [delay, setDelay] = useState(null);

  useInterval(() => {
    updateToken() 
  }, delay);

  function startTokenUpdateTraking() {
    setDelay(7000000) //Token refrash time 2h
  }

  function endTokenUpdateTraking() {
    setDelay(null)  //stop refrash token interval
  }
  function isTokenUpdateTraking() {
    if (delay === null) return false; //start refrash token interval
    return true
  }

  const [page, setPage] = useState("loader");
  const pageTypes = {
    "loader": LoaderForm(),
    "login": AuthFormLogin(setPage, startTokenUpdateTraking),
    "register": AuthFormRegister(setPage),
    "dashboard" : DashboardForm(page, setPage, endTokenUpdateTraking),
    "remove-account": AccountRemoveForm(setPage, endTokenUpdateTraking),
  };

  async function updateToken() {
    try {
      const response = await refrashAccessToken()
      if (response.status===202) {
        const data = await response.json()
        setUserSession(getUser(), data.token, data.id) 
        setPage("dashboard")
        if (isTokenUpdateTraking() === false) startTokenUpdateTraking()
    } else {
        endTokenUpdateTraking()
        setPage("login")
        removeUserSession()
        if (response.status===401) alert("Не удалось продлить токен доступа!")
        else if (response.status===400) alert("Операция продления запрещена для этого токена!")
        else alert("Error: " + response.status)
      }
    } catch (error) {alert("Не удаётся получить доступ у серверу")}
  }

  function init() { //triggger on page load
    const token = getToken();
    const id = getTokenId();
    if (!token || !id) {
      removeUserSession()
      setPage("login")
      }
    else {
      updateToken()
    }
  }

  useEffectOnce(() => { //React strict mode calls standart hook twice
    init()
  },[])

  return (
    <div className="App">
      {pageTypes[page]}
    </div>
  );
}

export default App;
