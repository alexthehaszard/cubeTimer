function Stats() {
  this.previous = function (solve1, solve2, direction) {
    let output = [];
    if (direction == 0) {
      output[0] = solve1 + 1;
      output[1] = solve2 + 1;
    } else if (direction == 1) {
      output[0] = solve1 - 1;
      output[1] = solve2 - 1;
    } else {
      output[0] = solve1;
      output[1] = solve2;
    }
    return output;
  };

  this.removeTime = function (ar, index, index2, direction) {
    let output = [index, index2];
    if (direction == 1) {
      if (confirm("delete solve?")) {
        ar.splice(index, 1);
        output[0] = index - 1;
        output[1] = index2 - 1;
        localStorage.clear();
        for (let i = 0; i < ar.length; i++) {
          localStorage.setItem(i, ar[i]);
        }
      }
    }
    if (direction == 0) {
      if (confirm("delete solve?")) {
        ar.splice(index2, 1);
        output[0] = index - 1;
        output[1] = index2 - 1;
        localStorage.clear();
        for (let i = 0; i < ar.length; i++) {
          localStorage.setItem(i, ar[i]);
        }
      }
    }
    return output;
  };

  this.updateTimes = function (ar, ss1, ss2, left, right) {
    left[0].innerHTML = "";
    left[1].innerHTML = "";
    left[2].innerHTML = "";
    if (ar.length > 0) {
      if (ar[ss1]) {
        let splitSolveLeft = ar[ss1].split("-");
        if (
          splitSolveLeft[1] != left[0].innerHTML ||
          splitSolveLeft[0] != left[1].innerHTML ||
          splitSolveLeft[2] != left[2].innerHTML
        ) {
          left[0].innerHTML = splitSolveLeft[1];
          left[1].innerHTML = splitSolveLeft[0];
          left[2].innerHTML = splitSolveLeft[2];
        }
      }
    }
    right[0].innerHTML = "";
    right[1].innerHTML = "";
    right[2].innerHTML = "";
    if (ar.length > 1) {
      if (ar[ss2]) {
        let splitSolveRight = ar[ss2].split("-");
        if (
          splitSolveRight[1] != right[0].innerHTML || // time
          splitSolveRight[0] != right[1].innerHTML || // type
          splitSolveRight[2] != right[2].innerHTML // scramble
        ) {
          right[0].innerHTML = splitSolveRight[1];
          right[1].innerHTML = splitSolveRight[0];
          right[2].innerHTML = splitSolveRight[2];
        }
      }
    }
  };

  this.average = function (ar, num) {
    let outAr = [];
    let average = 0;
    if (ar.length >= 5) {
      for (let i = 1; i <= num; i++) {
        let currentTime = ar[ar.length - i].split("-");
        console.log(currentTime[1]);
        average += parseFloat(currentTime[1]);
        outAr[i - 1] = parseFloat(currentTime[1]);
      }
      average -= Math.max(...outAr);
      average -= Math.min(...outAr);
      average /= num - 2;

      average = Math.round(average * 100) / 100;
      return average;
    } else {
      return null;
    }
  };
}
