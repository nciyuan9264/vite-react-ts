function count(arr, num) {
    let res = [];
    let resSet = new Set();
    const used = new Array(arr.length).fill(false);
    function dfs(length, currentArr) {
        if (length === num) {
            let str = '';
            currentArr.forEach(item => {
                str += item;
            })
            resSet.add(str);
            return;
        }

        for(let i = 0; i < arr.length; i ++){
            if(used[i] || currentArr.length > 0 && currentArr[currentArr.length - 1] === arr[i]) continue;
            currentArr.push(arr[i]);
            used[i] = true;
            dfs(length + 1, currentArr);
            currentArr.pop();
            used[i] = false
        }
    }
    dfs(0, res);
    return resSet.size;
}

let arr = ['a', 'a', 'b'];
let res = count(arr, 3);
console.log(res);

// let a = 'aab 2';
// let b = a.split(',').map(Number);
// console.log(b)