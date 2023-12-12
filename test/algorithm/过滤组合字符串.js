const dir = {
    '0': ['a', 'b', 'c'],
    '1': ['d', 'e', 'f'],
    '2': ['g', 'h', 'i'],
    '3': ['j', 'k', 'l'],
    '4': ['m', 'n', 'o'],
    '5': ['p', 'q', 'r'],
    '6': ['s', 't'],
    '7': ['u', 'v'],
    '8': ['w', 'x'],
    '9': ['y', 'z'],
}

function cal(arr, filiter) {


    let res1 = [];

    function dfs(dep, res) {

        if (dep === arr.length) {
            res1.push(...res);
            return;
        }

        for (let i = dep; i < dir[arr[dep]].length; i++) {
            res.push(dir[arr[dep][i]]);
            dfs(dep + 1, res);
            res.pop();
        }
    }
    let res = [];
    dfs(0, res);
    let r = []
    // res1.forEach(item => {
    //     let s = '';
    //     item.forEach(i => {
    //         s += i;
    //     })
    //     if (s !== filiter)
    //         r.push(s);
    // })
    console.log(res1);


}
let arr = ['7', '8'];
let f = 'ux'
cal(arr, f)