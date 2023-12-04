let total = 0;
let mindiff = Infinity;

function gen(arr) {
    var res = [];


    function dfs(start, currentRes) {
        if (currentRes.length === 5) {
            let sum = 0;
            currentRes.forEach((num) => {
                sum += num;
            });
            let res = total - sum;
            let diff = Math.abs(res - sum);
            if (diff < mindiff) {
                mindiff = diff;
            }
            return;
        }

        for (let i = start; i < arr.length; i++) {
            currentRes.push(arr[i]);
            dfs(i + 1, currentRes);
            currentRes.pop();
        }
    }
    dfs(0, res);
}

let line = '10000 9999 9998 9997 9996 9995 9994 9993 9992 1';
const arr = line.split(" ").map(Number);
arr.forEach((num) => {
    total += num;
});
gen(arr);
console.log(mindiff)