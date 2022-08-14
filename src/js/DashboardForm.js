import React, {useState, useEffect} from 'react';
import styles from '../css/Dashboard.module.css';
import { getToken, getUser, removeUserSession} from './auth/AuthMgmt';
import { requestWeekStats, storeAction } from './FetchHandler';
import animate from '../css/Animate.module.css'

export function DashboardForm(page, setPage, endTokenUpdateTraking) {
    const [data, setData] = useState([ 0, 0, 0, 0, 0, 0, 0 ]);
	const [isRunning, setRunning] = useState(false);

	const [date,setDate] = useState(0);
    const [temp,setTemp] = useState(null);

	useEffect(() => {
		if (page === "dashboard") {
			const loadWeekData = async () => {
				const response = await requestWeekStats()
				if (!response.ok) {
					alert(response.status)
					alert("Не удаётся загрузить необходимые данные, будет выполнена попытка автоматического восстановления!")
				}
				else {
					const tdata = await response.json()
					var dataArray = [ 0, 0, 0, 0, 0, 0, 0 ]
					tdata.actions.forEach(e => dataArray[e.weekday] += Number(e.action));
					setData(dataArray)
				}
			}
			loadWeekData();
		}
    },[page, temp])

    useEffect(() => {
        const timer = setInterval(()=>{
            if (temp) setDate(new Date() - temp)
        }, 1000 )


        return function cleanup() {
            clearInterval(timer)
        }
    });

	const sendAction = async (ms) => {
		const response = await storeAction(String(ms))
		if (!response.ok) {
			alert(response.status)
		}
		else {
			alert("Данные отправленны")
		}
	}


    function Run() {
		setRunning(true)
        setTemp(new Date() - date)
    }
    function Pause() {
        setTemp(null)
    }

	function Stop() {
		setRunning(false)
		sendAction(date)
		setDate(0);
		setTemp(null);
	}

    const formatTime = (ms) => {
        const ss = Math.floor(ms / 1000) % 60;
        const mm = Math.floor(ms / 60000) % 60;
        const hh = Math.floor(ms / 360000) % 60;
        return (hh > 9 ? hh : '0' + hh) + ':' + (mm > 9 ? mm : '0' + mm) + ':' + (ss > 9 ? ss : '0' + ss);
      }

	const ColumnItem = (ms, day) => {
		const mm = Math.floor(ms / 60000) % 60;
        const hh = Math.floor(ms / 360000) % 60;
		return (
			<div className={styles.statsItem}>
				<span className={styles.statsH}>{day}</span>
				<div className={styles.statsBar} style={{"--percent": (ms/(36000*8)>100 ? 100 : ms/(36000*8)) +"%", filter: "brightness("+ (ms/(36000*8)>=100 ? 1.2 : 1)+")"}}></div>
				<span className={styles.statsH}>{(hh > 9 ? hh : '0' + hh) + ':' + (mm > 9 ? mm : '0' + mm)}</span>
			</div>
		)
	}

	const handlePageChange=(e)=>{
        e.preventDefault();
        setPage("remove-account");
    }

    return (
		<div className={styles.dashboard}>
			<div className={styles.container+' '+animate.animZoomOut}>
				<span className={styles.upperText}>{formatTime(date)}</span>
				<span className={styles.lowerText}>{"Вы вошли как " + getUser()}</span>
				<div className={styles.btnBlock}>
					<button onClick={() =>	isRunning ? Stop() : Run()} className={styles.button} style={{backgroundColor: "#049372"}}>{isRunning?'Отправить':'Начать'}</button>
					<button onClick={() => temp ? Pause() : Run()} className={styles.button} style={{backgroundColor: "#fa9a45"}}>{temp?'Пауза':'Далее'}</button>
					<button onClick={() => {endTokenUpdateTraking(); removeUserSession(); setPage("login")}} className={styles.button} style={{backgroundColor: "#d5634e"}}>Выйти</button>
				</div>
				<div className={styles.stats}>
					{ColumnItem(data[0], "ПНД")}
					{ColumnItem(data[1], "ВТР")}
					{ColumnItem(data[2], "СРД")}
					{ColumnItem(data[3], "ЧТВ")}
					{ColumnItem(data[4], "ПТН")}
					{ColumnItem(data[5], "СБТ")}
					{ColumnItem(data[6], "ВСК")}
				</div>
				<a href="#" onClick={handlePageChange} className={styles.bold}>Удалить аккаунт</a>
			</div>
		</div>	
    )}