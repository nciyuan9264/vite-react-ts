function testKey(arr) {
    let res = '';
    Array.from(arr).forEach((item, index) => {
        if (item === '<' && res !== '') {
            res = res.slice(0, res.length - 1);
        } else if (item !== '<') {
            res += item;
        }
    })
    let flag = false;
    let AZflag = Array.from(res).find(item => {
        return item >= 'A' && item <= 'Z'
    })
    let azflag = Array.from(res).find(item => {
        return item >= 'a' && item <= 'z'
    })
    let numflag = Array.from(res).find(item => {
        return item >= '0' && item <= '9'
    })
    let othflag = Array.from(res).find(item => {
        return (item < 'A' || item > 'Z') && (item < 'a' || item > 'z') && (item < 0 || item > 9) && item !== ' ';
    })
    if (AZflag && azflag && numflag && othflag) flag = true;
    console.log(res, flag);
}

let arr = 'Aa1Bb2Cc3'
testKey(arr)