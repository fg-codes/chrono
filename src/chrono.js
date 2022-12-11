let reset = false;
let timer;
start = () => {
  // if reset is true (script is already running), go to stop()
  reset ? stop() : (reset = true);

  const interval = document.getElementById("interval").value;
  const rest = document.getElementById("rest").value;
  let divChrono = document.createElement("div");
  let divCounter = document.createElement("div");
  let divCC = document.createElement("div");
  let countdown = interval;
  let swap = true;
  let counter = 0;

  // if interval value is > max or < min
  let min = document.getElementById("interval").min;
  let max = document.getElementById("interval").max;
  if (Number(interval) < min || Number(interval) > max) {
    document.getElementById(
      "flowInterval"
    ).innerHTML = `* Range from ${min} to ${max} *`;
    return 1;
  } else {
    document.getElementById("flowInterval").innerHTML = "";
  }

  // if rest value is > max or < min
  min = document.getElementById("rest").min;
  max = document.getElementById("rest").max;
  if (Number(rest) < min || Number(rest) > max) {
    document.getElementById(
      "flowRest"
    ).innerHTML = `* Range from ${min} to ${max} *`;
    return 1;
  } else {
    document.getElementById("flowRest").innerHTML = "";
  }

  divChrono.setAttribute("id", "chrono");
  divCounter.setAttribute("id", "counter");
  divCC.setAttribute("id", "js");

  timer = setInterval(() => {
    document.getElementById("content").append(divCC);

    // if countdown seconds = interval value, we do counter +1
    if (countdown == interval) {
      divCounter;
      divCounter.textContent = `Seq.: ${(++counter + 1000)
        .toString()
        .substring(1)}`;
      document.body.append(divCounter);
      divCC.appendChild(divCounter);
    }

    // if countdown is at 1 sec, we print then changing bool countdown (interval or rest, true or false)
    if (countdown <= 1) {
      print(divChrono, swap, countdown);
      divCC.appendChild(divChrono);
      swap = swaping(swap);
      countdown = swap ? interval : rest;
    }

    // else, we print
    else {
      print(divChrono, swap, countdown);
      divCC.appendChild(divChrono);
      countdown--;
    }
  }, 1000);
};

// turning interval period to rest period and vice versa (true or false)
swaping = (bool) => {
  return bool ? false : true;
};

// receiving (var divChrono), (interval or rest) and (countdown).
// Then change text color, play sound and then print
print = (div, swap, countdown) => {
  let min = Math.trunc(countdown / 60);
  let sec = countdown % 60;
  div.style.color = swap ? "#37b03b" : "white";
  if (countdown === 1) {
    swap ? new Audio("src/2pop.mp3").play() : new Audio("src/1pop.mp3").play();
  }
  div.textContent = `${(min + 100).toString().substring(1)}:${(sec + 100)
    .toString()
    .substring(1)}`;
  document.body.append(div);
};

// stops the interval then erase the div id="js"
stop = () => {
  if (document.getElementById("js") === null) {
    reset = false;
  }
  clearInterval(timer);
  document.getElementById("js").remove();
};

playSound = (pop) => {
  let ding = new Audio(pop);
  ding.play();
};
