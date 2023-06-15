const creatTest = (() => {
    const _p = Symbol('ppp');
    class Test {
        constructor() {
            this.a = 1;
            this[_p] = 0
        }
        get p() {
            return this[_p];
        }

        plus(){
            this[_p]++;
        }
    }
    return Test;
})();

const t = new creatTest();
t.plus();
console.log(t.p);