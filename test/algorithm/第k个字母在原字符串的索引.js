function cal(s, k){
    let arr = Array.from(s);
    let sarr = [...arr];
    arr.sort((a, b) => {
        if(a < b){
            return -1;
        }else{
            return 1;
        }
    })
    let res = sarr.findIndex(item => item === arr[k - 1])
    console.log(res);
}



let s = 'hAkDAjByBq';
let k = 4;
cal(s, k)