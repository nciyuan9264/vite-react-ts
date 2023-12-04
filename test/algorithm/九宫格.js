

const strArr = {
    '1': [',', '.'],
    '2': ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': ['w', 'x', 'y'],
}

let res = ''

function translate(arr, mode){
    let lastStr = ''
    let lastNum = 0;
    if(!mode){
        arr.forEach(str => {
            res += Number(str);
        })
    }else{
        arr.forEach(str => {
            if(str !== lastStr && lastStr !== ''){
                res += strArr[lastStr][(lastNum - 1) % strArr[lastStr].length];
                lastStr = str;
                lastNum = 1;
            }else{
                lastStr = str;
                lastNum ++;
            }
        })
        res += strArr[lastStr][(lastNum - 1) % strArr[lastStr].length];
    }
}


function cal(s){
    let stack = [];
    let mode = false; // 0：number  1：en
    Array.from(s).forEach(str => {
        if(str === '#'){
            translate(stack, mode)
            stack = [];
            mode = !mode
        }else if(str === '/'){
            translate(stack, mode);
            stack = [];
        }else{
            stack.push(str);
        }
    });
    translate(stack, mode);
    console.log(res);
}

let s = '123#222235/56';
cal(s);