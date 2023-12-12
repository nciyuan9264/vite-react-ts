// 和 可以组成网络的服务器 完全相同
function cal(arr) {

    function bfs(starti, startj) {

        let queue = [
            [starti, startj]
        ];
        let res = 0;

        while (queue.length > 0) {
            const [starti, startj] = queue.pop();
            res += arr[starti][startj];
            arr[starti][startj] = 0;
            if (starti - 1 >= 0 && arr[starti - 1][startj] > 0) {
                queue.push([starti - 1, startj]);
            }
            if (starti + 1 < arr.length && arr[starti + 1][startj] > 0) {
                queue.push([starti + 1, startj]);
            }
            if (startj - 1 >= 0 && arr[starti][startj - 1] > 0) {
                queue.push([starti, startj - 1]);
            }
            if (startj + 1 < arr[0].length && arr[starti][startj + 1] > 0) {
                queue.push([starti, startj + 1]);
            }
        }
        return res;
    }



    let max = -1;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            let m = arr[i][j];
            if (m > 0) {
                let totalM = bfs(i, j);
                max = Math.max(max, totalM);
            }
        }
    }
    console.log(max);

}

const arr = [
    [2, 0, 0, 0, 0],
    [0, 0, 0, 2, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1]
]


cal(arr);