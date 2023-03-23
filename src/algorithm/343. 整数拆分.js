function spiltInt(num) {
    let dp = [];
    dp[1] = 1;
    for(let i = 2; i <= num; i++){
        let max = -1;
        for(let j = 1; j < i; j++){
            let mul = Math.max(j * dp[i - j], j * (i - j), dp[j] * dp[i - j]);
            if(mul > max){
                max  = mul;
            }
        }
        dp[i] = max;
    }
    return dp[num]
}

const res = spiltInt(12);
console.log(res);