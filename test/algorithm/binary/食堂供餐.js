function canServe(arr, init, product) {
    let now = init;
    for (let i = 0; i < arr.length; i++) {
        if (i !== 0) {
            now = now + product;
        }
        if (now < arr[i]) {
            return false;
        }
        now -= arr[i];
    }
    return true;
}

function search(arr, init) {
    let r = -1;
    arr.forEach(item => {
        if (item > r) {
            r = item;
        }
    });
    let l = 0;
    let res = -1;
    while (l <= r) {
        let mid = Math.floor((l + r) / 2);
        if (canServe(arr, init, mid)) {
            r = mid - 1;
            res = mid;
        } else {
            l = mid + 1;
        }
    }
    console.log(res);
}

const time = 3;
const init = 20;
const people = [8, 5, 10, 3, 6];

search(people, init);

