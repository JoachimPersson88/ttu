
export const setSaveTime = async ({millisec, sec, min, hours}: {millisec: number, sec: number, min: number, hours: number}) => {
    await fetch("http://localhost:8080/tidtagarur/tider", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "timmar": hours.toString(),
            "minuter": min.toString(),
            "sekunder": sec.toString(),
            "millisekunder": millisec.toString()
        },
    });
};
