function cal(timeStr) {
    let tSet = new Set();
    let usedArr = Array(timeStr.length).fill(0);

    function dfs(timeDfs) {
        if (timeDfs.length === timeStr.length) {
            const time = timeDfs.join('');
            if (!tSet.has(time)) {
                tSet.add(time);
            }
            return;
        }

        for (let i = 0; i < timeStr.length; i++) {
            if (usedArr[i] === 0) {
                usedArr[i] = 1;
                timeDfs.push(timeStr[i]);
                dfs(timeDfs);
                timeDfs.pop();
                usedArr[i] = 0;
            }
        }
    }

    dfs([]);
    let timeArr = [...tSet];
    timeArr.sort((a, b) => {
        if (a < b) {
            return -1;
        } else {
            return 1;
        }
    })
    timeArr.forEach(item => {
        console.log(item);
    })

}



let time = ['a', 'b', 'c'];
cal(time);