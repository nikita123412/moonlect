var timer;
var interval;
var isGoing = false;
var isPaused = true;
var setIntervalInvoked = false;
var remainigTime = 10;
function Timer(callback, delay) {
    var timerId, start, remaining = delay;

    this.pause = function() {
        window.clearTimeout(timerId);
        remaining -= new Date() - start;
    };

    this.resume = function() {
        start = new Date();
        window.clearTimeout(timerId);
        timerId = window.setTimeout(callback, remaining);
    };

    this.resume();
}

window.onload = function () {
   init();
};

function init() {
    if(isGoing === true)
    {
        alert("process is isGoing already");
        return;
    }
    isGoing = true;
    var page = window.location.pathname.split("/").pop();
    switch (page){
        case "index.html":
            pageSwitcher("index1.html");
            break;
        case "index1.html":
            pageSwitcher("index2.html");
            break;
        case "index2.html":
            pageSwitcher("index3.html");
            break;
    }
}

function instantSwitchForward() {
    var page = window.location.pathname.split("/").pop();
    switch (page){
        case "index.html":
            window.location.replace("index1.html");
            break;
        case "index1.html":
            window.location.replace("index2.html");
            break;
        case "index2.html":
            window.location.replace("index3.html");
            break;
    }
}

function instantSwitchBackwards() {
    var page = window.location.pathname.split("/").pop();
    switch (page){
        case "index.html":
            alert("It is the first page!");
            break;
        case "index1.html":
            window.location.replace("index.html");
            break;
        case "index2.html":
            window.location.replace("index1.html");
            break;
        case "index3.html":
            window.location.replace("index2.html");
            break;
    }
}

function pageSwitcher(page) {
    var header = document.getElementById("remaining-time");
    timer = new Timer(function () {
        window.location.replace(page);
    }, 10000);

    header.innerHTML = "Time remaining " + remainigTime;
    isPaused = false;
    if(!setIntervalInvoked)
    {
        setIntervalInvoked = true;
        interval = setInterval(function () {
            if(isPaused !== true)
            {
                remainigTime--;
                header.innerHTML = "Time remaining " + remainigTime;
                if(remainigTime <= 0){
                    clearInterval(interval);
                }
            }
        },1000);
    }
}

function stopSwitcher() {
    isPaused = true;
    isGoing = false;
    timer.pause();
}

function closeWindow() {
    window.close();
}

function firstPageRedirect() {
    window.location.replace("index.html");
}