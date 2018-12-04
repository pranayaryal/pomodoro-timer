import React, { Component, useState, useEffect, useRef } from 'react';
import './App.css';
import ReactGA from 'react-ga'

import TimeDisplay from './components/TimeDisplay'

const App = props => {

    ReactGA.initialize('UA-58522655-3')
    Notification.requestPermission().then(result => {
      console.log(result)
    })

    const initialTime = {
      minutes: 25,
      seconds: 0
    }


    const [ duration, setDuration ] = useState(24)
    const [ time, setTime ] = useState(initialTime)
    const [ timerId, setTimerId ] = useState(0)


    const tick = (endtime) => {
      var { minutes, seconds } = getTimeRemaining(endtime)
      var newTime = {
        minutes: minutes,
        seconds: seconds
      }
      setTime(newTime)

    }

    const getTimeRemaining = (endtime) => {
      var now = new Date(Date.parse(new Date()))
      var t = endtime - now.getTime() 
      var seconds = Math.floor((t/1000) % 60);
      var minutes = Math.floor((t/1000/60) % 60);
      
      return { minutes, seconds }
    }

    const startTicking = (dur) => {
      if(timerId){
        clearInterval(timerId)
      }

      setDuration(dur)

      // setTime({minutes: dur, seconds: 0})

      const endtime = new Date(Date.parse(new Date()) + dur * 60 * 1000).getTime()
      
      var idOfTime = setInterval(() => {
        tick(endtime)
        }, 1000)
        setTimerId(idOfTime)

    }



    const stopTimer = () => {
      clearInterval(timerId)
      // setTime({minutes: time.minutes, seconds: time.seconds})
    }

    const startTimer = () => {
      startTicking(time.minutes + time.seconds/60)
    }

    const resetTimer = () => {
      clearInterval(timerId)
      setTime({minutes: duration, seconds: 0})
    }


    useEffect(() => {
      // startTicking(25)
      document.title = `(${time.minutes}:${time.seconds}) Pranay Aryal`
      if(time.minutes === 0 & time.seconds === 0){
        document.title = "Hooray!!!"
      }
    })

    return (
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column">
              <a className="button is-primary is-large" onClick={() => startTicking(25)}>POMODORO</a>
            </div>
            <div className="column">
              <a className="button is-warning is-large" onClick={() => startTicking(5)}>SHORT BREAK</a>
            </div>
            <div className="column">
              <a className="button is-info is-large is-active" onClick={() => startTicking(10)}>LONG BREAK</a>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="columns">
            <div className="column"></div>
            <div className="column">
                <TimeDisplay time={time} timerId={timerId} />
            </div>
            <div className="column"></div>
          </div>
        </div>
        <div className="section">
          <div className="columns">
            <div className="column"></div>
            <div className="column">
              <a className="button" onClick={startTimer}>START</a>
              <a className="button" onClick={stopTimer}>STOP</a>
              <a className="button" onClick={resetTimer}>RESET</a>
            </div>
            <div className="column"></div>
          </div>
        </div>
      </div>
    );
  }

export default App;