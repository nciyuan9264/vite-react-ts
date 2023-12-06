function cal(s) {
    let arr = s.split(' ');
    let numArr = [];
    arr.forEach(item => {
        if (item.slice(item.length - 1) === 'Y') {
            numArr.push(Number(item.slice(0, item.length - 1)));
        } else {
            numArr.push(Number(item.slice(0, item.length - 1)) * 7);
        }
    })
    numArr.push(-1);
    let st = 0;
    let res = 0;
    for (let i = 1; i < numArr.length; i++) {
        if (numArr[i] < numArr[i - 1]) {
            res += (numArr[i - 1] - numArr[st]);
            st = i;
        }
    }

    console.log(res);
}





let s = '2Y 3S 4S 6Y 8S';
cal(s);