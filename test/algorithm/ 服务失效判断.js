function gauss(rely, down) {
    let resDowns = new Set(down.split(','));
    let relys = rely.split(',');

    function dfs(n) {
        let indexRely = relys.find(item => {
            let [a1, a2] = item.split('-');
            return a2 === n
        })
        if (indexRely) {
            let [a1, a2] = indexRely.split('-');
            resDowns.add(a1);
            dfs(a1);
        }else{
            return;
        }
    }
    let l = resDowns.size;
    for (let i = 0; i < l; i++) {
        dfs([...resDowns][i])
    }
    let res = new Set();
    relys.forEach(item => {
        let [a1, a2] = item.split('-');
        if (!resDowns.has(a1)) {
            res.add(a1);
        }
        if (!resDowns.has(a2)) {
            res.add(a2);
        }
    })
    if (res.size > 0) {
        console.log([...res].join(','))
    } else {
        console.log(',');
    }
}



const rely = 'a1-a2,a2-a3';
const down = 'a5,a3';
gauss(rely, down)