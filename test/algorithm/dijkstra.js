

function dijkstra(arr, start, end){
    let res = Array(3).fill(Number.MAX_SAFE_INTEGER);
    res[start] = 0;
    let set = new Set();
    set.add(start);
    arr[start].forEach((item, index) => {
        if(item !== -1){
            if(res[index] > res[index] + item){
                res[index] = res[index] + item;
            }
        }
    });
}


let arr = Array(3).fill(-1).map(item => Array(3).fill(-1));
arr[0][1] = 11;
arr[1][2] = 13;
arr[0][2] = 15;
dijkstra(arr, 0, 2);