import React, { useEffect, useState } from 'react'


const TimeDisplay = ({time, timerId}) => {

    if(time.minutes ===0 & time.seconds === 0){
        clearInterval(timerId)
        if (Notification.permission !== "denied") {
            Notification.requestPermission().then(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                    const notification = new Notification("Your time is over!!!");
            }
            });
        }
    }

    

    return(
        <div>
            <p className="is-size-1 has-text-grey">{('0' + time.minutes).slice(-2) + ":" + ('0' + time.seconds).slice(-2)}</p>
        </div>
    )
}

export default TimeDisplay;