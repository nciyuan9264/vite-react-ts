function gcd(x, y) {
    while (y > 0) {
        let mod = x % y;
        x = y;
        y = mod;
    }
    return x;
}

function isCoprime(a, b, c) {
    return gcd(gcd(a, b), c) === 1;
}

function isPythagoreanTriplet(arr) {
    const a = arr[0], b = arr[1], c = arr[2];
    return a * a + b * b === c * c;
}

function calculate(min, max) {
    let arr = [];
    let res = [];

    function dfs(arr, start, res) {
        if (arr.length === 3) {
            if (isPythagoreanTriplet(arr) && isCoprime(arr[0], arr[1], arr[2])) {
                res.push([...arr]);
            }
            return;
        }
        for (let i = start; i <= max; i++) {
            arr.push(i);
            dfs(arr, i + 1, res);
            arr.pop();
        }
    }

    dfs(arr, min, res);

    if (res.length === 0) {
        console.log('NA');
        return;
    }

    res.forEach(item => {
        console.log(...item);
    });
}


calculate(1, 5);


