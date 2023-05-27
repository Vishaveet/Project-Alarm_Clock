const clock = document.getElementById("clock");
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("button");
const displayAlarmList = document.getElementById("alarm-list");
const list=document.getElementById('list');
let alarmArr = [];

let alarmTime = null;
let alarmTimeOut = null;

for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[3].firstElementChild.insertAdjacentHTML("afterend", option);
}

function currentTime() {
  let date = new Date();
  let hr = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  let session = "AM";
  if (hr === 0) {
    hr = 12;
  } else {
    if (hr > 11) {
      session = "PM";
    }
    if (hr > 12) {
      hr = hr - 12;
    }
  }
  hr = hr < 10 ? "0" + hr : hr;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  let time = `${hr}:${min}:${sec} ${session}`;
  clock.innerText = time;
  // console.log(hr,":",min,":",sec);

  function playAlarm() {
    console.log("Checking Alarm");
    // console.log(alarmArr);
    for (let alarms of alarmArr) {
      let alarmHour;
      if (alarms.session == "PM" && alarms.hour > 12) {
        alarmHour = alarms.hour - 12;
      }else{
        alarmHour = alarms.hour;
      }
      // console.log("HR Check", alarmHour == hr, ':=>' , alarmHour, '=>', hr);
      // console.log("Min Check", alarms.min == min);
      // console.log("Sec Check", alarms.sec == sec);
      // console.log("Session Check", alarms.session == session);

      if (alarmHour == hr && alarms.min == min && alarms.sec == sec && alarms.session == session) {
        console.log("Play Alarm!");
        alert("Alarm is Ringing!");
      }
    }
  }
  if (alarmArr.length > 0) {
    playAlarm();
  }
}

setInterval(function () {
  currentTime();
}, 1000);

function setAlarm() {
  let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value}:${selectMenu[3].value}`;
  console.log(
    "Time::",
    `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value} ${selectMenu[3].value}`
  );
  console.log(time);
  if (
    time.includes("Hr") ||
    time.includes("min") ||
    time.includes("sec") ||
    time.includes("AM/PM")
  ) {
    return alert("please, select a valid time to set Alarm!");
  }
  // console.log('hi1');
  setAlarmTime(time);
}

function setAlarmTime(value) {
  // console.log('h2');
  alarmTime = new Date();
  let timeArr = value.split(":");
  let hours = parseInt(timeArr[0]);
  let minutes = parseInt(timeArr[1]);
  let seconds = parseInt(timeArr[2]);

  console.log("Hours: ", hours, "Minutes:", minutes, "Seconds:", seconds);
  let session = timeArr[3];

  if (session === "PM" && hours > 12) {
    hours = hours - 12;
  }
  if (session === "AM" && hours == 12) {
    hours =0 ;
  }
  if(hours<10){
    hours='0'+hours;
  }
  if(minutes<10){
    minutes='0'+minutes;
  }
  if(seconds<10){
    seconds='0'+seconds;
  }
  let alarmList = {
    id: Date.now(),
    hour: hours,
    min: minutes,
    sec: seconds,
    session: session,
  };

  alarmArr.push(alarmList);
  addlistToDom(alarmList);
  // alarmTime.setHours(hours);
  // alarmTime.setMinutes(minutes);
  // alarmTime.setSeconds(seconds);
  // displayList(alarmArr);

  console.log("Alarm set for", alarmTime);
  console.log("Arr:", alarmArr);
}

function addlistToDom(alarmList){
  const li=document.createElement('li');

    let alarmHour;
    if (alarmList.session == "PM" && alarmList.hour > 12) {
      alarmHour = alarmList.hour - 12;
      if(alarmHour < 10){
        alarmHour = '0' + alarmHour;
      }
    }else if(alarmList.hour < 10){
      alarmHour = '0'+ alarmList.hour;
    }
    if(alarmList.hour == 0){
      alarmHour = 12;
    }
    if(alarmList.session=="AM" && alarmList.hour<10){
      alarmHour='0'+alarmList.hour;
    }
    if(alarmList.hour==10){
      alarmHour=10;
    }
    if(alarmList.hour==11){
      alarmHour=11;
    }
    // if(alarmList.session==="AM" && alarmList.hour<10){
    //   alarmList.hour='0'+alarmList.hour;
    // }
    // if(alarmList.session==="PM" && alarmList.hour>12){
    //   alarmList.hour=(alarmList.hour-12);
    //   if(alarmList.hour<10){
    //     alarmList.hour='0'+alarmList.hour;
    //   }
    // }
  li.innerHTML=`<h2 id="alarm-list">${alarmList.hour}:${alarmList.min}:${alarmList.sec} ${alarmList.session}</h2>
    <button class="delete-btn" data-id= ${alarmList.id} onClick= 'deleteAlarmAgain(${alarmList.id})'>Delete</button>
  `;
list.append(li);
}

function deleteAlarmAgain(id){
  console.log('ID',id);
  const newalarmArr=alarmArr.filter(function(task){
    return task.id!==id;
})
  alarmArr=newalarmArr;
  displayList();
  console.log('delete');
}

function displayList(){
  list.innerHTML='';
  for(let i=0;i<alarmArr.length;i++){
      addlistToDom(alarmArr[i]);
  }

}


setAlarmBtn.addEventListener("click", setAlarm);

// document.addEventListener('click',handleClickListener);


// const clock=document.getElementById('clock');

// const selectManu=document.querySelectorAll('select');

// const setAlarmBtn=document.querySelector('button');

// let alarmTime=null;

// let alarmTimeOut=null;

// for(let i=12;i>0;i--){
//     i=i<10 ? "0"+i : i;

//     let option=`<option value="${i}">${i}</option>`;
//     selectManu[0].firstElementChild.insertAdjacentHTML('afterend',option);

// }

// for(let i=59;i>=0;i--){
//     i=i<10 ? "0"+i : i;

//     let option =`<option value="${i}">${i}</option>`;
//     selectManu[1].firstElementChild.insertAdjacentHTML('afterend',option);

// }

// for(let i=59;i>=0;i--){
//     i=i<10 ? "0"+i :i;

//     let option=`<option value="${i}">${i}</option>`;
//     selectManu[2].firstElementChild.insertAdjacentHTML('afterend',option);
// }

// for(let i=2;i>0;i--){
//     let ampm = i == 1 ? "AM" : "PM";
//      let option =`<option value="${ampm}">${ampm}</option>`;
//      selectManu[3].firstElementChild.insertAdjacentHTML('afterend',option);

// }

// function currentTime(){

//     let date=new Date();
//     let hr=date.getHours();
//     let min=date.getMinutes();
//     let sec=date.getSeconds();
//     let session="AM";
//     if(hr===0){
//         hr=12;
//     }
//     if(hr>12){
//         hr=hr-12;
//         session="PM";
//     }
//     hr=(hr<10)? "0"+hr:hr;
//     min=(min<10)? "0"+min:min;
//     sec=(sec<10)? "0"+sec:sec;
//     let time=`${hr}:${min}:${sec} ${session}`;
//     // console.log(time);
//     clock.innerText=time;
// }

// setInterval(function(){
//     currentTime();
// },1000);

// function setAlarm(){
//     let time=`${selectManu[0].value}:${selectManu[1].value}:${selectManu[2].value} ${selectManu[3].value}`;

//     if(time.includes("Hr") || time.includes("min") || time.includes('sec') || time.includes('AM/PM')){
//         return alert("please, select a valid time to set Alarm!")
//     }
//     // console.log(time);
//     setAlarmTime(time);
// }

// function setAlarmTime(value){
//     alarmTime=value;
//     // console.log("hi",alarmTime);
//     if(alarmTime===value){
//         setAlarmOn();

//     }

// }
// function setAlarmOn(){
//     // alert('hi');

//     let date=new Date();
//     let hr=date.getHours();
//     let min=date.getMinutes();
//     let sec=date.getSeconds();
//     let session="AM";
//     if(hr===0){
//         hr=12;
//     }
//     if(hr>12){
//         hr=hr-12;
//         session="PM";
//     }
//     hr=(hr<10)? "0"+hr:hr;
//     min=(min<10)? "0"+min:min;
//     sec=(sec<10)? "0"+sec:sec;
//     let currentTime=`${hr}:${min}:${sec} ${session}`;
//     console.log("hi",currentTime);

//     console.log('al',alarmTime);
//     const setupTime = new Date(alarmTime);
//     console.log("Setup Time:", setupTime);
//     if(setupTime.getTime() > date.getTime()){
//         const timeToAlarm = setupTime.getTime() - date.getTime();
//         console.log("Time to Alarm:", timeToAlarm);
//         // alarmTimeOut=setTimeout(function(){
//         //     alert('hi');
//         // }, timeToAlarm);
//     }

//     // const setupTime=alarmTime;
//     // console.log(setupTime);
//     // if(setupTime>currentTime){
//     //     const timeToAlarm=setupTime-currentTime;
//     // //     console.log(timeToAlarm);
//     // // //     alarmTimeOut=setTimeout(function(){
//     // // //         alert('hi');
//     // // //     },timeToAlarm);
//     // }
// }

// function clearAlarm(){
//     if(alarmTimeOut){
//         clearTimeout(alarmTimeOut);
//     }
// }

// setAlarmBtn.addEventListener('click',setAlarm);
