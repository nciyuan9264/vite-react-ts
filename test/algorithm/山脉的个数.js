function count(arr){
    let res = 0;
    arr.forEach((num, index, arr) => {
        let flag = true;
        if(index - 1 >= 0 && arr[index - 1] >= num ){
            flag = false;
        }
        if(index + 1 <= arr.length - 1 && arr[index + 1] >= num ){
            flag = false;
        }
        if(flag){
            res++;
        }
    })
    return res;
}

// let arr = [0, 1, 2, 3, 2, 4];
// let res = count(arr);
// console.log(res);

let a = '0, 1, 2, 3, 2, 1, 0, 4, 3, 0'
let b = a.split(',').map(Number);
console.log(b)