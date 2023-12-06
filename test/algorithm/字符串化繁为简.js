function trans(str) {
    let set = new Set();
    let flag = false
    Array.from(str).forEach(items => {
        let item = items;
        if (item === ')') {
            flag = false;
        }
        if (flag) {
            set.add(item.toLowerCase());
            set.add(item.toUpperCase());
        }
        if (item === '(') {
            flag = true;
        }
    })
    const arr = [...set];
    let minStr = 'ZZZ';
    arr.forEach(item => {
        let find = Array.from(str).find(s => s === item)
        if (item < minStr && find !== undefined){
            minStr = item;
        }
    })
    let newStr = '';
    flag = false;
    Array.from(str).forEach(item => {
        if (item === '(') {
            flag = true;
        }
        
        if (!flag) {
            if (set.has(item)) {
                newStr += minStr;
            } else {
                newStr += item;
            }
        }
        if (item === ')') {
            flag = false;
        }
        
    })
    console.log(newStr);
}

const str = '(abd)demand(fb)()for';
trans(str);