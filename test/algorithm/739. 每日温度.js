var dailyTemperatures = function (temperatures) {
    let tStack = [];
    const length = temperatures.length;
    let res = Array(length).fill(0);
    tStack.push(0);
    for (let i = 1; i < length; i++) {
        const top = tStack[tStack.length - 1];
        if(temperatures[top] >= temperatures[i]){
            tStack.push(i);
        }else{
            while(tStack.length && temperatures[tStack[tStack.length - 1]] < temperatures[i]){
                const t = tStack.pop();
                res[t] = i - t;
            }
            tStack.push(i);
        }
    }

    return res;
};
const res = dailyTemperatures([55, 38, 53, 81, 61, 93, 97, 32, 43, 78]);
console.log(res);