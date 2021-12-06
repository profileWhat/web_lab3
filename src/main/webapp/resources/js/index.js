const deg = 6;
const hr = document.querySelector('#hr');
const mn = document.querySelector('#mn');
let date, hh, mm, ss, day;
function initParam() {
    date = new Date();
    hh = date.getHours();
    mm = date.getMinutes();
    ss = date.getSeconds();
    day = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
}
function updateTime() {
    hr.style.transform = `rotateZ(${(hh*30)+(mm*deg/12)}deg)`;
    mn.style.transform = `rotateZ(${mm*deg}deg)`;

    hh = hh < 10 ? "0" + hh : hh;
    mm = mm < 10 ? "0" + mm : mm;
    ss = ss < 10 ? "0" + ss : ss;

    let time = hh + ":" + mm + ":" + ss;
    document.getElementById("clock-date").innerHTML = day;
    document.getElementById("clock-time").innerHTML = time;
}
initParam();
updateTime();
setInterval(() => {
    initParam();
    updateTime();
    console.log("Passed time interval");
}, 6000);
