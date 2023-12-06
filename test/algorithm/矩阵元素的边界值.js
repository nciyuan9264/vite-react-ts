function cal(s){
    let arr = JSON.parse(s);
    let res = Number.MAX_VALUE;
    for(let j = 0; j < arr[0].length; j++){
        let cmax = -Number.MAX_VALUE;
        for(let i = 0; i < arr.length; i ++){
            let num = arr[i][j];
            if(num > cmax){
                cmax = num;
            }
        }
        if(cmax < res){
            res = cmax;
        }
    }
    console.log(res);
}



let s = '[[0,0,0],[0,0,0]]';
cal(s);