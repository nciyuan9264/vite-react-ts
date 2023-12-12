// 应该用dfs，但是我想试试别的思路。。。有规律的枚举
function maxNum(limit, map) {
    for (let i = limit; i >= 0; i--) {
        let num = map.get(i)
        if (num > 0) {
            map.set(i, num - 1);
            return i;
        }
    }
    return -1;

}

function cal(s) {
    let arr = JSON.parse(s);
    let map = new Map();
    arr.forEach(item => {
        if (!map.get(item)) {
            map.set(item, 1);
        } else {
            let num = map.get(item);
            map.set(item, num + 1);
        }
    });
    let maxH1 = maxNum(2, map);
    let maxH2 = maxNum(3, map);
    if(maxH2 === -1){
        maxH1 = maxNum(1, map);
        maxH2 = maxNum(9, map);
    }
    let maxm1 = maxNum(5, map);
    let maxm2 = maxNum(9, map);

    let maxs1 = maxNum(5, map);
    let maxs2 = maxNum(9, map);
    let str = `${maxH1}${maxH2}:${maxm1}${maxm2}:${maxs1}${maxs2}`
    if(str.indexOf('-') === -1){
        console.log(str);
    }else{
        console.log('invalid')
    }

}

let s = '[0,2,3,0,5,6]';
cal(s);