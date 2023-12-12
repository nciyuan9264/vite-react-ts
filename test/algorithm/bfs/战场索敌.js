// 从 可以组成网络的服务器|寻找最大价值的矿堆 稍作修改
function cal(arr, k = 3) {

    function bfs(starti, startj) {

        let queue = [
            [starti, startj]
        ];
        let res = 0;

        while (queue.length > 0) {
            const [starti, startj] = queue.pop();
            if (arr[starti][startj] === 'E') {
                res++;
            }
            arr[starti][startj] = '#';
            if (starti - 1 >= 0 && arr[starti - 1][startj] !== '#') {
                queue.push([starti - 1, startj]);
            }
            if (starti + 1 < arr.length && arr[starti + 1][startj] !== '#') {
                queue.push([starti + 1, startj]);
            }
            if (startj - 1 >= 0 && arr[starti][startj - 1] !== '#') {
                queue.push([starti, startj - 1]);
            }
            if (startj + 1 < arr[0].length && arr[starti][startj + 1] !== '#') {
                queue.push([starti, startj + 1]);
            }
        }
        return res;
    }



    let res1 = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            let m = arr[i][j];
            if (m !== '#') {
                let totalM = bfs(i, j);
                if (totalM < k) {
                    res1++;
                }
            }
        }
    }
    console.log(res1);

}

const arr = [
    ['.', '.', '#', '.'],
    ['E', '.', '.', 'E'],
    ['.', '#', 'E', '.'],
    ['.', '.', '#', '#'],
]



cal(arr);