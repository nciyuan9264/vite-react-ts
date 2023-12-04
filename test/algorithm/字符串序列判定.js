function check(s1, s2) {
    let flagOfs1 = 0;
    let res = 0;
    Array.from(s2).forEach((str, index) => {
        if (str === s1[flagOfs1]) {
            flagOfs1++;
            res = index;
        }
    })
    if(flagOfs1 === s1.length){
        return res;
    }else{
        return -1;
    }
}




const s1 = 'ace';
const s2 = 'abcde'
const lastStr = check(s1, s2);
console.log(lastStr);



