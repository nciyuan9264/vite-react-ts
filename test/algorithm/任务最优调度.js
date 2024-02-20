function sum(map){
    let sum = 0;
    [...map.values()].forEach(item => {
        sum += item;
    })
    return sum;
}
function cal(arr, n){
    let map = new Map();
    arr.forEach(item => {
        if(map.has(item)){
            let num = map.get(item);
            map.set(item, num + 1);
        }else{
            map.set(item, 1);
        }
    });
    let i = 0;
    let res = []
    while(sum(map) > 0){
        let index = [...map.keys()][i];
        let cnum = map.get(index);
        if(cnum > 0){
            res.push(index);
            map.set(index, cnum - 1);
        }
        i = (i + 1) % [...map.keys()].length;
    }
    let d = 0;
    let index = -1;
    for(let j = res.length - 1; j > 1; j--){
        if(res[j] === res[j - 1]){
            d++;

        }else{
            index = j;
            break;
        }
    }
    console.log(index + d * n + 1);

}
const arr = [2,2,2,3];
const N = 2;
cal(arr, N);