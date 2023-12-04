function check(num, init) {
    let res = num / init;
    let flag = false;
    let str = `${num}=`
    if (init % 2 === 0 && res - Math.floor(res) === 0.5 && Math.floor(res) - init / 2 + 1 > 0 && Math.floor(res) + init / 2 <= num) {
        for (let i = Math.floor(res) - init / 2 + 1; i <= Math.floor(res) + init / 2; i++) {
            str += `${i}+`
        }
        flag = true;
        str = str.slice(0, str.length - 1);
        console.log(str);
    }
    if (init % 2 !== 0 && Number.isInteger(res) && res - Math.floor(init / 2) > 0 && res + Math.floor(init / 2) <= num) {
        for (let i = res - Math.floor(init / 2); i <= res + Math.floor(init / 2); i++) {
            str += `${i}+`
        }
        flag = true;
        str = str.slice(0, str.length - 1);
        console.log(str);
    }

    return flag;
}

function cal(num) {
    let init = 1;
    let resNum = 0;
    while (init <= num) {
        if (check(num, init)) {
            resNum++;
        }
        init++;
    }
    console.log(`Result:${resNum}`)
    return resNum;
}
const number = 1;
const a = cal(number);

// console.log(a);

// 10
// 1 2 3 4

// 9=9
// 9=4+5
// 9=2+3+4
// Result:3