import React, {useEffect, useState} from "react";
import {setSaveTime} from "./Api";

interface ListItem {
    id: string;
    milliseconds: string;
    seconds: string;
    minutes: string;
    hours: string;
}

function Tidtagarur(){

    const [getAllSavedTimes, setItems] = useState<ListItem[]>([]), fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/tidtagarur');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [time, setTime] = useState(0), [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let intervalId: string | number | NodeJS.Timeout | undefined;
        if (isRunning) {

            intervalId = setInterval(() => setTime(time + 1), 10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, time]);


    const hours = Math.floor(time / 360000);


    const minutes = Math.floor((time % 360000) / 6000);


    const seconds = Math.floor((time % 6000) / 100);

    const milliseconds = time % 100;

    const startAndStop = () => {
        setIsRunning(!isRunning);
    };

    const reset = () => {
        setTime(0);
    };

    return (
        <div className="stopwatch-container">
            <p className="stopwatch-time">
                {hours}:{minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}:
                {milliseconds.toString().padStart(2, "0")}
            </p>
            <div>
                <button onClick={startAndStop}>
                    {isRunning ? "Stop" : "Start"}
                </button>
                <button onClick={reset}>
                    Omstart
                </button>
            <button onClick={() => {
                setSaveTime({millisec: milliseconds, sec: seconds, min: minutes, hours: hours }).then();
            }}>
                Spara tid
            </button>
                <div>
                    <button onClick={fetchData}>Lista över tid</button>
                    <ul>
                        {getAllSavedTimes.map(item => (
                            <li key={item.id}>tim: {item.hours} min: {item.minutes} sek: {item.seconds} millsek: {item.milliseconds}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );

}

export default Tidtagarur
