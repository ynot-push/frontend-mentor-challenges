import React, { useEffect, useRef, useState } from "react";
import bleu_clock from "./assets/bleu_alarm.png";
import trash from "./assets/trash.png";
import alarmSoundFile from "./assets/alarm_ringtone.mp3";
import pause from "./assets/pause_alarm.png";
import "./alarm.css";

function Alarm() {
  const [actualmin, setActualmin] = useState(0);
  const [actualsec, setActualsec] = useState(0);
  const [actualhour, setActualhour] = useState(0);
  const [actualPMorAM, setActualPMorAM] = useState("");
  const [hourValue, setHourValue] = useState("");
  const [minuteValue, setMinuteValue] = useState("");
  const [amPmValue, setAmPmValue] = useState("");
  const [alarmsarray, setAlarmsarray] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [ringingAlarmIndex, setRingingAlarmIndex] = useState(null);
  const [isAlarmPaused, setIsAlarmPaused] = useState(false);
  const renderCount = useRef(0);
  const alarmSound = useRef(new Audio(alarmSoundFile));
   //use for pm and am format
  const formatTime = (time) => {
    return time.toString().padStart(2, "0");
    
  };

  useEffect(() => {
    const hours = [];
    const minutes = [];
    const hoursSelect = document.getElementById('hour_select');
    const minuteSelect = document.getElementById('minute_select');
    
    for (let i = 1; i <= 12; i++) {
      hours.push(formatTime(i));
    }
    console.log(minutes)
    for (let j = 0; j <= 59; j++) {
      minutes.push(formatTime(j));
    }
    function addOptions(selectElement, options, placeholder) {
      // Clear existing options
      selectElement.innerHTML = ""; 
    
      // Add placeholder option
      const placeholderOption = document.createElement("option");
      placeholderOption.value = "";
      placeholderOption.textContent = placeholder;
      placeholderOption.disabled = true; 
      placeholderOption.hidden = true;   
      selectElement.appendChild(placeholderOption);
    
      // Add the rest of the options
      options.forEach((optionData) => {
        const optionElement = document.createElement("option");
        optionElement.value = optionData;
        optionElement.textContent = optionData;
        selectElement.appendChild(optionElement);
      });
    }
    
  
    if (hoursSelect) addOptions(hoursSelect, hours, "Hour");
  if (minuteSelect) addOptions(minuteSelect, minutes, "Minute");
  
  }, []);
  
  useEffect(() => {
    const intervale = setInterval(() => {
      let date = new Date();
      let actualminute = date.getMinutes();
      let actualseconde = date.getSeconds();
      let actualhou = date.getHours();
      let PMorAM = actualhou >= 12 ? "PM" : "AM";
      actualhou = actualhou % 12 || 12;
      actualminute = formatTime(actualminute);
      actualhou = formatTime(actualhou);
      actualseconde = formatTime(actualseconde);
      setActualhour(actualhou);
      setActualsec(actualseconde);
      setActualmin(actualminute);
      setActualPMorAM(PMorAM);

      let ringingAlarmIndex2 = null;
      alarmsarray.forEach((alarm, index) => {
        if (
          alarm.enabled &&
          alarm.hour === actualhou.toString() &&
          alarm.minute === actualminute.toString() &&
          alarm.amPm === PMorAM
        ) {
          if (!isAlarmPaused) {
            ringingAlarmIndex2 = index;
            if (alarmSound.current.paused) {
              alarmSound.current.loop = true;
              alarmSound.current.play();
            }
          }
        }
      });
      setRingingAlarmIndex(ringingAlarmIndex2);
    }, 1000);
    return () => clearInterval(intervale);
  }, [alarmsarray, isAlarmPaused]);

  const handleHourChange = (event) => {
    setHourValue(event.target.value);
  };

  const handleMinuteChange = (event) => {
    setMinuteValue(event.target.value);
  };

  const handleAmPmChange = (event) => {
    setAmPmValue(event.target.value);
  };

  const handleSetAlarm = () => {
    if (hourValue !== "" && minuteValue !== "" && amPmValue !== "") {
      setAlarmsarray((prevarray) => [
        ...prevarray,
        { hour: hourValue, minute: minuteValue, amPm: amPmValue, enabled: true },
      ]);
      setHourValue("");
      setMinuteValue("");
      setAmPmValue("");
    } else {
      alert("please enter a valid time");
    }
  };

  const handleDeleteAlarm = (index) => {
    setAlarmsarray((prevArray) => prevArray.filter((_, i) => i !== index));
  };

  const toggleAlarm = (index) => {
    setAlarmsarray((prevAlarms) =>
      prevAlarms.map((alarm, i) =>
        i === index ? { ...alarm, enabled: !alarm.enabled } : alarm
      )
    );
  };

  const handlePauseAlarm = (index) => {
    setRingingAlarmIndex(null);
    setIsAlarmPaused(true);
    alarmSound.current.pause();
    alarmSound.current.currentTime = 0;
    setAlarmsarray((prevAlarms) =>
      prevAlarms.map((alarm, i) =>
        i === index ? { ...alarm, enabled: false } : alarm
      )
    );
  };

  useEffect(() => {
    setIsAlarmPaused(false);
  }, [alarmsarray]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    const data = { hourValue, minuteValue,amPmValue }; // Data to send

    try {
      const response = await fetch("/api/submit", {
        method: "POST", // HTTP method
        headers: { "Content-Type": "application/json" }, // Specify JSON
        body: JSON.stringify(data), // Convert data to JSON
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Server Response: ${result.message}`);
      } else {
        alert("Failed to send data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };
  return (
    <>
      <div className="clock">
        <img src={bleu_clock} alt="Clock" className="bleu_alarm" />
        <h1>
          <span className="actualhour">{actualhour}</span> :{" "}
          <span className="actualminute">{actualmin}</span> :{" "}
          <span className="actualsecond">{actualsec}</span>{" "}
          <span> {actualPMorAM}</span>
        </h1>
        <div>
        <form onSubmit={handleSubmit}>
        <select
            className="select"
            id="hour_select"
            value={hourValue}
            onChange={handleHourChange}
          >
            <option value="" disabled hidden>
              Hour
            </option>
          </select>
          <select
            className="select"
            id="minute_select"
            value={minuteValue}
            onChange={handleMinuteChange}
          >
            <option value="" disabled hidden>
              Minute
            </option>
          </select>
          <select
            className="select"
            id="select"
            value={amPmValue}
            onChange={handleAmPmChange}
          >
            <option value="" disabled hidden>
              AM/PM
            </option>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </form>
         
        </div>
        <div className="list_alarm">
          {alarmsarray.map((alarm, index) => (
            <div
              key={index}
              className="alarm_time"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <label className="switch">
                <input
                  type="checkbox"
                  checked={alarm.enabled}
                  onChange={() => toggleAlarm(index)}
                />
                <span className="slider"></span>
              </label>
              <div className="alarm_text">
                <span>{alarm.hour}</span> : <span>{alarm.minute}</span>{" "}
                <span>{alarm.amPm}</span>
              </div>
              <div
                className="soundcont"
                style={{ display: ringingAlarmIndex === index ? "block" : "none" }}
              >
                <div className="loading">
                  <div className="load"></div>
                  <div className="load"></div>
                  <div className="load"></div>
                  <div className="load"></div>
                </div>
              </div>
              <div className="img_container">
                <img
                  src={trash}
                  className="delete_alarm"
                  onClick={() => handleDeleteAlarm(index)}
                  style={{
                    display:
                      hoveredIndex === index && ringingAlarmIndex !== index
                        ? "block"
                        : "none",
                  }}
                />
              </div>
              <div>
                <img
                  src={pause}
                  className="pause_alarm"
                  onClick={() => handlePauseAlarm(index)}
                  style={{
                    display: ringingAlarmIndex === index ? "block" : "none",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleSetAlarm} type="submit">Set Alarm</button>
      </div>
    </>
  );
}

export default Alarm;
