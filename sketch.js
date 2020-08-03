let counter = 0; //counts the time
let milli = 0; //the milliseconds
let new_counter; //the counter reformatted to be displayed
let seconds = 0; //the seconds
let new_seconds; //seconds reformatted
let minutes = 0; //the minutes
let new_minutes = 0; //minutes reformatted
let tcounter = 0; //counts the time
let new_tcounter; //the counter reformatted to be displayed
let tseconds = 0; //the seconds
let new_tseconds; //seconds reformatted
let tminutes = 0; //the minutes
let timerStarted = false; //tell the draw loop whether or not the timer has started
let keyStopped = false; //used to stop the timer from starting itself when it is stopped
let justSolved = false; //used to tell the draw loop to log the time in console
let scram1; //the scramble
let current_time; //the full time formatted
let times = [];
let threeTimes = [];
let twoTimes = [];
let fourTimes = [];
let scramLength = 20;
let scram2;
let scramMoves = 6;
let scramType = "3x3";
let oldScram = "";
let red = "#ff0000";
let green = "#00ff00";
let white = "#ffffff";
let txtClr = white;
let strtTmr = 0;
let timerNotAvailable = false; //used to check when timer cannot be started when key is being pressed
let usingStack = false;
let prevPacket;
let timerTime;
let showSolve1;
let showSolve2;
let started = 0;
const stackmat = new Stackmat();
const timerText = document.getElementById("timerText");
const leftTime = document.getElementById("leftTime");
const leftType = document.getElementById("leftType");
const leftScramble = document.getElementById("leftScramble");
const rightTime = document.getElementById("rightTime");
const rightType = document.getElementById("rightType");
const rightScramble = document.getElementById("rightScramble");
const scrambleText = document.getElementById("scrambleText");
const stats = new Stats();
const sc = new Scramble();

function setup() {
  noCanvas();
  setInterval(startTimer, 100); //sets up the colors for the timer

  scram1 = sc.genScram(scramLength, scramMoves);

  showSolve1 = localStorage.length - 1;
  showSolve2 = localStorage.length - 2;

  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.getItem(i) != undefined) {
      times[i] = localStorage.getItem(i);
      if (times[i][0] == 3) {
        threeTimes[threeTimes.length] = times[i];
      } else if (times[i][0] == 2) {
        twoTimes[twoTimes.length] = times[i];
      } else if (localStorage.getItem(localStorage.length - 1)[0] == 4) {
        fourTimes[fourTimes.length] = localStorage.getItem(
          localStorage.length - 1
        );
      }
    }
  }
}

function draw() {
  if (timerStarted == true && keyStopped == false) {
    counter = Math.trunc(millis()) - started;
    milli = Math.trunc(counter / 10) % 100;
    seconds = Math.trunc(counter / 1000) % 60;
    minutes = Math.trunc(counter / 60000);
  } else {
    counter = 0;
  }
  new_seconds = String(seconds).padStart(2, "0"); //make the seconds always have 2 digits
  new_counter = String(milli).padStart(2, "0"); //make the counters always have 2 digits
  new_minutes = String(minutes).padStart(2, "0"); //make the minutes always have 2 digits
  new_tseconds = String(tseconds).padStart(2, "0"); //make the seconds always have 2 digits
  new_tcounter = String(tcounter).padStart(2, "0"); //make the counters always have 2 digits

  if (usingStack == true) {
    if (timerStarted == false) {
      if (tminutes > 0) {
        current_time = tminutes + ":" + new_tseconds + "." + new_tcounter; //output the current time with minutes if there has been more than one minute
      } else if (tminutes < 1) {
        current_time = tseconds + "." + new_tcounter;
      }
    } else {
      if (minutes > 0) {
        current_time = minutes + ":" + new_seconds + "." + new_counter; //output the current time with minutes if there has been more than one minute
      } else if (minutes < 1) {
        current_time = seconds + "." + new_counter;
      }
    }
  } else {
    if (minutes > 0) {
      current_time = minutes + ":" + new_seconds + "." + new_counter; //output the current time with minutes if there has been more than one minute
    } else if (minutes < 1) {
      current_time = seconds + "." + new_counter;
    }
  }

  if (timerText.innerHTML != current_time) {
    timerText.innerHTML = current_time;
  }

  if (justSolved == true) {
    localStorage.setItem(
      localStorage.length,
      scramType + "-" + current_time + "-" + oldScram
    );
    console.log(
      "solve: " +
        localStorage.length +
        " " +
        localStorage.getItem(localStorage.length - 1)
    );
    times[localStorage.length - 1] = localStorage.getItem(
      localStorage.length - 1
    );
    showSolve1++;
    showSolve2++;
    if (localStorage.getItem(localStorage.length - 1)[0] == 3) {
      threeTimes[threeTimes.length] = localStorage.getItem(
        localStorage.length - 1
      );
      //console.log("threeTimes added" + threeTimes[threeTimes.length - 1]);
    } else if (localStorage.getItem(localStorage.length - 1)[0] == 2) {
      twoTimes[twoTimes.length] = localStorage.getItem(localStorage.length - 1);
      //console.log("twoTimes added" + twoTimes[twoTimes.length - 1]);
    } else if (localStorage.getItem(localStorage.length - 1)[0] == 4) {
      fourTimes[fourTimes.length] = localStorage.getItem(
        localStorage.length - 1
      );
      //console.log("twoTimes added" + twoTimes[twoTimes.length - 1]);
    }
    justSolved = false; //stop the if statement from being called again
  }
  if (txtClr != timerText.style.color) {
    timerText.style.color = txtClr;
  }

  if (times.length > 0) {
    let splitSolveLeft = times[showSolve1].split("-");
    if (
      splitSolveLeft[1] != leftTime.innerHTML ||
      splitSolveLeft[0] != leftType.innerHTML ||
      splitSolveLeft[2] != leftScramble.innerHTML
    ) {
      leftTime.innerHTML = splitSolveLeft[1];
      leftType.innerHTML = splitSolveLeft[0];
      leftScramble.innerHTML = splitSolveLeft[2];
    }
  }
  if (times.length > 1) {
    let splitSolveRight = times[showSolve2].split("-");
    if (
      splitSolveRight[1] != rightTime.innerHTML ||
      splitSolveRight[0] != rightType.innerHTML ||
      splitSolveRight[2] != rightScramble.innerHTML
    ) {
      rightTime.innerHTML = splitSolveRight[1];
      rightType.innerHTML = splitSolveRight[0];
      rightScramble.innerHTML = splitSolveRight[2];
    }
  }

  //when a new scramble is generated, show it.
  if (scrambleText.innerHTML != scram1) {
    scrambleText.innerHTML = scram1;
  }
}

function keyPressed() {
  if (usingStack == false) {
    if (key === " ") {
      //if the key is spacebar
      if (timerStarted == true) {
        keyStopped = true; //if the timer is started then stop the timer
        oldScram = scram1;
        scram1 = sc.genScram(scramLength, scramMoves); //generate a new scramble
        justSolved = true; //tell the draw loop to output the solve to the console
      } else {
        strtTmr = 0;
        txtClr = red;
        timerNotAvailable = true;
        startTimer();
      }
    }
  }
  if (key === "2") {
    scramLength = 8; //changes scramble type to 2x2
    scramMoves = 3;
    scramType = "2x2";
    scram1 = sc.genScram(scramLength, scramMoves);
  }
  if (key === "3") {
    scramLength = 20; //changes scramble type to 3x3
    scramMoves = 6;
    scramType = "3x3";
    scram1 = sc.genScram(scramLength, scramMoves);
  }
  if (key === "4") {
    scramLength = 38; //changes scramble type to 4x4
    scramMoves = 9;
    scramType = "4x4";
    scram1 = sc.genScram(scramLength, scramMoves);
  }
  if (key === "s") {
    usingStack = true;
    keyStopped = false;
    stackmat.start();
  }
  if (key === "c") {
    usingStack = false;
    milli = 0;
    seconds = 0;
    minutes = 0;
  }
}

//same as keyPressed for mobile
function touchStarted() {
  if (timerStarted == true) {
    keyStopped = true; //if the timer is started then stop the timer
    oldScram = scram1;
    scram1 = sc.genScram(scramLength, scramMoves); //generate a new scramble
    justSolved = true; //tell the draw loop to output the solve to the console
  } else {
    strtTmr = 0;
    txtClr = red;
    timerNotAvailable = true;
    startTimer();
  }
}

//when the key is released, start the timer
function keyReleased() {
  if (key === " ") {
    if (timerStarted == false && txtClr == green) {
      txtClr = white;
      timerStarted = true; //if the timer is not started start the timer
      keyStopped = false; //when the key is pressed to stop the timer this is used to make sure that is will not start again when the key is released
      started = Math.trunc(millis());
      milli = 0;
      seconds = 0;
      minutes = 0;
    } else if (timerStarted == true && txtClr == white) {
      timerStarted = false; //stop the timer
    } else if (txtClr == red) {
      timerNotAvailable = false;
      txtClr = white;
    }
  }
}

//this is keyReleased but on mobile
function touchEnded() {
  if (timerStarted == false && txtClr == green) {
    txtClr = white;
    timerStarted = true; //if the timer is not started start the timer
    keyStopped = false; //when the key is pressed to stop the timer this is used to make sure that is will not start again when the key is released
    started = Math.trunc(millis());
    milli = 0;
    seconds = 0;
    minutes = 0;
  } else if (timerStarted == true && txtClr == white) {
    timerStarted = false; //stop the timer
  } else if (txtClr == red) {
    timerNotAvailable = false;
    txtClr = white;
  }
}

//mousePressed and mouseReleased can be used to stop the touchStarted and touchReleased functions from working with the mouse
function mousePressed() {
  return;
}

function mouseReleased() {
  return;
}

//when used in keyboard mode, this is to show the colors when the timer is started
function startTimer() {
  strtTmr++;
  if (strtTmr == 5) {
    if (timerNotAvailable == true) {
      txtClr = green;
      return;
    }
  }
}

//move the stats in a direction, used in the HTML
function moveStats(direction) {
  if (
    (showSolve1 + 1 == times.length && direction == 0) ||
    (showSolve2 == 0 && direction == 1)
  ) {
  } else {
    let op = stats.previous(showSolve1, showSolve2, direction);
    showSolve1 = op[0];
    showSolve2 = op[1];
  }
}

//remove a time, used in the HTML
function removeStats(direction) {
  let op = stats.removeTime(times, showSolve1, showSolve2, direction);
  showSolve1 = op[0];
  showSolve2 = op[1];
}

//check the time every time a packet is recieved
stackmat.on("packetReceived", function (packet) {
  if (usingStack == true) {
    timerTime = packet.timeInMilliseconds;
    if (
      timerStarted == true &&
      tcounter == 0 &&
      prevPacket == 0 &&
      timerTime == 0
    ) {
      timerStarted = false;
    } else if (
      packet.timeInMilliseconds == prevPacket &&
      timerStarted == true
    ) {
      timerStarted = false;
      justSolved = true;
      oldScram = scram1;
      scram1 = sc.genScram(scramLength, scramMoves);
    }
    tcounter = Math.trunc((timerTime % 1000) / 10);
    tseconds = Math.trunc(timerTime / 1000);
    if (tseconds > 59) {
      tseconds = tseconds % 60;
    }
    tminutes = Math.trunc(timerTime / 60000);
    prevPacket = packet.timeInMilliseconds;
  }
});

//start the timer using stackmat
stackmat.on("started", function (packet) {
  if (usingStack == true) {
    keyStopped = false;
    timerStarted = true;
    started = Math.trunc(millis());
    milli = 0;
    seconds = 0;
    counter = 0;
    minutes = 0;
  }
});
