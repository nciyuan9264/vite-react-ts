

function gauss(arrStr, min) {
    let arr = arrStr.split(',').map(Number);
    arr.sort((a, b)=>a-b)
    let resArr = [];

    function dfs(start, currArr, shouldLength){
        if(currArr.length === shouldLength){
            resArr.push([...currArr]);
            return;
        }

        for(let j = start; j < arr.length; j++){
            currArr.push(arr[j]);
            dfs(j + 1, currArr, shouldLength);
            currArr.pop();
        }

    }

    for(let i = min; i <= arr.length; i++){
        let res = [];
        dfs(0, res, i);
    }
    resArr.sort((a, b) => {
        const minLength = Math.min(a.length, b.length);
        for (let i = 0; i < minLength; i++) {
          if (a[i] !== b[i]) {
            return a[i] - b[i];
          }
        }
        return a.length - b.length;
      });
    if(resArr.length === 0){
        console.log('None');
        return;
    }

    let result = resArr.map(subArray => subArray.join(','));
    result.forEach(item => {
        console.log(item);
    })

}



const arr = '2,3,4';
const min = 2;
console.log(gauss(arr, min));