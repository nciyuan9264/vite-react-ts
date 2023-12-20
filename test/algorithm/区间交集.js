
function cal(arr){
    arr.sort((a, b) => {
        return a[0] - b[0];
    })
    let res = []
    arr.forEach((item, index, arr) => {
        if(index > 0){
            if(item[0] <= arr[index - 1][1]){
                res.push([item[0], arr[index - 1][1]])
            }
        }
    });
    let fir = 0;
    let last = 0;
    let newRes = [];
    let lasMax = Math.max(res[fir][1], res[last][1]);
    res.forEach((item, index, arr) => {
        if(index > 0){
            if(item[0] <= lasMax){
                last = index;
                lasMax = Math.max(res[fir][1], res[last][1]);
            }else{
                newRes.push([arr[fir][0], arr[last][1]]);
                fir = index;
                last = index;
                lasMax = Math.max(res[fir][1], res[last][1]);
            }
        }
    })
    newRes.push([res[fir][0], lasMax]);
    newRes.forEach(item => {
        console.log(item[0], item[1]);
    })
}



let s = [
    [0, 3],
    [1, 4],
    [4, 7],
    [5, 8],
]

cal(s);

// 4
// 1 3
// 2 4
// 3 5
// 4 6

/**
 * 2,3
 * 3,4
 * 4,5
 * 
 */