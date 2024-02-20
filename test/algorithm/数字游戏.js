function cal(arr, m) {




    for (let i = 0; i < arr.length; i++) {
        let sum = 0;
        for (let j = i; j < arr.length; j++) {
            sum += arr[j];
            if(Number.isInteger(sum / m)){
                return 1;
            }
        }
    }
    return 0;

}




const m = 11;
const arr = [1,1,1,1,1,1,1,1,1,1,1];
console.log(cal(arr, m));