// 无限制的dfs，可以用四重循环模拟

function isValiedTime(s) {
  if (s.length !== 5) return false;
  let hh = Number(s[0] + s[1]);
  let mm = Number(s[3] + s[4]);
  if (hh < 0 || hh > 24) return false;
  if (mm < 0 || mm > 60) return false;
  return true;
}

function diff(t1, t2) {
  let hh1 = Number(t1[0] + t1[1]);
  let mm1 = Number(t1[3] + t1[4]);
  let t1Min = hh1 * 60 + mm1;
  let hh2 = Number(t2[0] + t2[1]);
  let mm2 = Number(t2[3] + t2[4]);
  let t2Min = hh2 * 60 + mm2;

  if (t2Min < t1Min) {
    return t2Min - t1Min + 24 * 60;
  } else {
    return t2Min - t1Min;
  }

}


function cal(timeStr) {
  let tSet = new Set();
  Array.from(timeStr).forEach(item => {
    if (Number(item) === Number(item)) {
      tSet.add(Number(item));
    }
  });
  let array = [...tSet];
  let timeArr = [];

  function dfs(timeDfs) {
    if (timeDfs.length === 4) {
      const time = `${timeDfs[0]}${timeDfs[1]}:${timeDfs[2]}${timeDfs[3]}`;
      if (isValiedTime(time)) {
        timeArr.push(time);
      }
      return;
    }

    for (let i = 0; i < array.length; i++) {
      timeDfs.push(array[i]);
      dfs(timeDfs);
      timeDfs.pop();
    }
  }

  dfs([]);

  // for (let i = 0; i < array.length; i++) {
  //   for (let j = 0; j < array.length; j++) {
  //     for (let k = 0; k < array.length; k++) {
  //       for (let l = 0; l < array.length; l++) {
  //         const time = `${array[i]}${array[j]}:${array[k]}${array[l]}`;
  //         if (isValiedTime(time)) {
  //           timeArr.push(time);
  //         }
  //       }
  //     }
  //   }
  // }
  timeArr.sort((a, b) => {
    return diff(timeStr, a) - diff(timeStr, b);
  })
  console.log(timeArr[1]);

}



let time = '20:12';
cal(time);