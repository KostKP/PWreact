import styles from '../../css/Auth.module.css';
import { useRef } from 'react';
import { createAccessToken } from '../FetchHandler';
import { setUserSession } from '../auth/AuthMgmt'
import animate from '../../css/Animate.module.css'

const AuthFormLogin = (setPage, startTokenUpdateTraking) => {
    const inputRefEmail = useRef(null);
    const inputRefPassword = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setPage("loader");
        const user = inputRefEmail.current?.value
        try {
            const response = await createAccessToken(user, inputRefPassword.current?.value);
            if (response.status===202) {
                const data = await response.json()
                setUserSession(user, data.token, data.id)
                setPage("dashboard")
                startTokenUpdateTraking()
            } else {
                setPage("login")
                if (response.status===401) alert("Не удалось выполнить вход по введённым вами данным!")
                else alert("Error: " + response.status)
            }
        } catch (error) {alert("Не удаётся получить доступ у серверу")}
      };

    const handlePageChange=(e)=>{
        e.preventDefault();
        setPage("register");
    }

    return (
        <div className={styles.auth}>
            <div className={styles.container+' '+animate.animZoomOut}>
                <form action="#" onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formLogoBlock}>
                    <img src={process.env.PUBLIC_URL +'/POWWWER.svg'} alt="logo"/>
                        <div className={styles.formLogoBlockTitle}>Войдите в свой аккаунт</div>
                    </div>
                    <input type="email" ref={inputRefEmail} className={styles.formInput} placeholder="E-mail" tabIndex="1" required/>
                    <div className={styles.inputRelative}>
                        <input type="password" ref={inputRefPassword} className={styles.formInput} placeholder="Пароль" tabIndex="2" required/>
                    </div>					
                    <div className={styles.formBottomBar}>
                        <input type="submit" className={styles.button} value="Вход" tabIndex="4"/>
                        <div className={styles.formBottomBarRedirBlock}>
                            <a href="#" onClick={handlePageChange} className={styles.bold}>Регистрация</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )}

export default AuthFormLogin
