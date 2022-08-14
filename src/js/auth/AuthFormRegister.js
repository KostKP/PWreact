import styles from '../../css/Auth.module.css';
import animate from '../../css/Animate.module.css'
import { useRef } from 'react';
import { registerUser } from '../FetchHandler';


const AuthFormRegister = (setPage) => {
    const inputRefEmail = useRef(null);
    const inputRefPassword = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setPage("loader");
        try {
            const response = await registerUser(inputRefEmail.current?.value, inputRefPassword.current?.value);
            if (response.status===202) {
                setPage("login");
                alert("Успех, войдите используя ваш E-mail адресс и пароль.")
            } else {
                setPage("register")
                if (response.status===400) alert("Проверьте правильность введенных данных.")
                else alert("Error: " + response.status)
            }
        } catch (error) {alert("Не удаётся получить доступ у серверу")}
      };

    const handlePageChange=(e)=>{
        e.preventDefault();
        setPage("login");
    }

    return (
        <div className={styles.auth}>
            <div className={styles.container+' '+animate.animZoomOut}>
                <form action="#" onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formLogoBlock}>
                        <img src={process.env.PUBLIC_URL +'/POWWWER.svg'} alt="logo"/>
                        <div className={styles.formLogoBlockTitle}>Зарегистрировать новый</div>
                    </div>
                    <input type="email" ref={inputRefEmail} className={styles.formInput} placeholder="E-mail" tabIndex="1" required/>
                    <div className={styles.inputRelative}>
                        <input type="password" ref={inputRefPassword} className={styles.formInput} placeholder="Пароль" tabIndex="2" required/>
                    </div>					
                    <div className={styles.formBottomBar}>
                        <input type="submit" className={styles.button} value="Создать аккаунт" tabIndex="4"/>
                        <div className={styles.formBottomBarRedirBlock}>
                            <a href="#" onClick={handlePageChange} className={styles.bold}>Войти</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )}

export default AuthFormRegister