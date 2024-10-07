import './Clock.css';

import { useState, useEffect } from 'react';
import { leadingZero } from "../../Tool/functions.js"; 

function Clock() {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    // const [time, setTime] = useState('');
    // const [isRunning, setIsRunning] = useState(false);
    
    useEffect(() => {

        const updateTime = () => {
            if (true){
                setSeconds(seconds + 1);
                if (seconds >= 60) {
                    setSeconds(0);

                    setMinutes(minutes + 1);
                    
                }
                // setTime(`${minutes} : ${seconds}`);                
            }
        };
  
        const intervalId = setInterval(updateTime, 1000);

        return () => {
            clearInterval(intervalId); // Das Intervall löschen
        };
    }, [minutes, seconds, /*isRunning*/]);

    return (
        <div className="clock">
            <p>{`${leadingZero(minutes)} : ${leadingZero(seconds)}`}</p>
        </div>
    );
}

export default Clock;