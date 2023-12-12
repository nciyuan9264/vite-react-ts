function cal(arr) {
    function dfs(i, j) {
        if (i < 0 || j > arr[0].length - 1 || arr[i][j] === -1 || arr[i][j] === -2) {
            return false;
        }
        if (arr[i][j] === 1) {
            return true;
        }
        let a, b;
        a = dfs(i - 1, j);
        b = dfs(i, j + 1);
        if (a || b) {
            arr[i][j] = 1;
        } else {
            arr[i][j] = -2
        }
        return arr[i][j] === 1
    }

    dfs(arr.length - 1, 0);

    let res1 = 0, res2 = 0;

    arr.forEach(itemArr => {
        itemArr.forEach(item => {
            if(item === -2){
                res1 ++;
            }
            if(item === 0){
                res2 ++;
            }
        })
    });
    console.log(res1, res2);

}

let arr = [
    [0, 0, 0, 0, 0, 1],
    [-1, -1, -1, 0, 0, 0],
    [0, 0, 0, 0, -1, -1],
    [0, 0, 0, 0, 0, 0],

];
cal(arr);