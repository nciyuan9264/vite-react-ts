function cal(s) {
    let arr = s.split(' ').map(Number);
    let indexArr = Array(arr.length).fill(0);
    indexArr.forEach((item, index) => indexArr[index] = index);
    while (indexArr.length > 4) {
        let newIndexArr = [];
        for (let i = 0; i < indexArr.length - 1; i += 2) {
            let f = indexArr[i];
            let e = indexArr[i + 1];
            if (arr[f] >= arr[e]) {
                newIndexArr.push(f);
            } else {
                newIndexArr.push(e);
            }
        }
        if (indexArr.length % 2 !== 0) {
            newIndexArr.push(indexArr[indexArr.length - 1]);
        }
        indexArr = [...newIndexArr];
    }

    if (indexArr.length === 3) {
        indexArr.sort((a, b) => arr[b] - arr[a]);
        console.log(...indexArr);
    } else {
        let fm = arr[indexArr[0]] >= arr[indexArr[1]] ? indexArr[0] : indexArr[1];
        let sm = arr[indexArr[2]] >= arr[indexArr[3]] ? indexArr[2] : indexArr[3];
        let f = arr[fm] >= arr[sm] ? fm : sm;
        let s = f === fm ? sm : fm;

        let fi = arr[indexArr[0]] >= arr[indexArr[1]] ? indexArr[1] : indexArr[0];
        let si = arr[indexArr[2]] >= arr[indexArr[3]] ? indexArr[3] : indexArr[2];
        let t = arr[fi] >= arr[si] ? fi : si;

        console.log(f, s, t)
    }
}




let arr = '1 2 3 4 5';
cal(arr);