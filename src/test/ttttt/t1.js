import * as readline from 'node:readline';
// import _ from 'lodash';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const a = []
rl.on('line', function (line) {
    const tokens = line.split(' ');
    a.push(tokens);
    console.log(a);
});

rl.on('close', function () {
    console.log('接收到EOF');
});


// let a = _.pad('abc', 6, '_-')
// console.log(a);