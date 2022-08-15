import styles from '../css/AccountRemove.module.css';
import { useRef } from 'react';
import { removeAccount } from './FetchHandler';
import { removeUserSession} from './auth/AuthMgmt'

const AccountRemoveForm = (setPage, endTokenUpdateTraking) => {
    const inputRefPassword = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setPage("loader");
        try {
            const response = await removeAccount(inputRefPassword.current?.value);
            if (response.status===200) {
                endTokenUpdateTraking()
                removeUserSession()
                setPage("login")
                alert("Аккаунт удалён")
            } else {
                setPage("remove-account")
                if (response.status===401) alert("Вы ввели неверные данные!")
                else alert("Error: " + response.status)
            }
        } catch (error) {setPage("remove-account"); alert("Не удаётся получить доступ у серверу")}
      };

    const handlePageChange=(e)=>{
        e.preventDefault();
        setPage("dashboard");
    }

    return (
        <div className={styles.accountRemove}>
            <div className={styles.container}>
                <form action="#" onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formLogoBlock}>
                        <div className={styles.formLogoBlockTitle} style={{marginBottom: "8px"}}>Требуется подтверждение</div>
                        После подтверждения действия, будут удалены все данные связанные с аккаунтом включая данные для входа в аккаунт, история действий и ключи ограниченного доступа.
                    </div>
                    <input type="password" ref={inputRefPassword} className={styles.formInput} placeholder="Пароль" tabIndex="2" required/>				
                    <div className={styles.formBottomBar}>
                        <input type="submit" className={styles.button} value="Удалить" tabIndex="4"/>
                        <div className={styles.formBottomBarRedirBlock}>
                            <a href="#" onClick={handlePageChange} className={styles.bold}>Отменить</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )}

export default AccountRemoveForm
