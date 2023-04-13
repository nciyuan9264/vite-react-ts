var maxPoints = function (points) {
    let res = 0;
    points.map((p1) => {
        const k = new Map();
        points.map((p2) => {
            const dy = p2[1] - p1[1];
            const dx = p2[0] - p1[0];
            if (!(dy === 0 && dx === 0)) {
                if (dx === 0) {
                    k['Infinity'] = k['Infinity'] ? k['Infinity'] + 1 : 1;
                } else if (!k[String(dy / dx)]) {
                    k[String(dy / dx)] = 1
                } else {
                    k[String(dy / dx)]++;
                }
            }

        })
        for (let i in k) {
            if (k[i] > res) {
                res = k[i]
            }
        }
    })
    return res + 1;
};
const points = [
    [0, 1],
    [0, 0]
]
const res = maxPoints(points);
console.log(res);


