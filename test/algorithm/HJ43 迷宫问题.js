function findRoot(arr) {
    let queue = [];
    var uesdArr = Array(arr.length)
        .fill(0)
        .map((_) => new Array(arr[0].length).fill(0)); // 1 → 2 ↑ 3 ← 4 ↓
    function bfs(uesdArr) {
        while (queue.length > 0) {
            let curr = queue.shift();
            let [i, j] = curr;
            if(i === arr.length && j === arr[0].length) break;
            if (i >= 0 && j - 1 >= 0 && uesdArr[i][j - 1] === 0) {
                uesdArr[i][j - 1] = 1;
                queue.push([i, j - 1]);
            }
            if (i - 1 >= 0 && j >= 0 && uesdArr[i - 1][j] === 0) {
                uesdArr[i - 1][j] = 4;
                queue.push([i - 1, j]);
            }
            if (i >= 0 && j + 1 < arr[0].length && uesdArr[i][j + 1] === 0) {
                uesdArr[i][j + 1] = 3;
                queue.push([i, j + 1]);
            }
            if (i + 1 < arr.length && j >= 0 && uesdArr[i + 1][j] === 0) {
                uesdArr[i + 1][j] = 2;
                queue.push([i + 1, j]);
            }
        }
    }
    queue.push([0, 0]);
    uesdArr[0][0] = -1;
    bfs(uesdArr);
    console.log(uesdArr);
}

let arr = [[0, 1, 0, 0, 0],
[0, 1, 1, 1, 0],
[0, 0, 0, 0, 0],
[0, 1, 1, 1, 0],
[0, 0, 0, 1, 0]]

findRoot(arr)