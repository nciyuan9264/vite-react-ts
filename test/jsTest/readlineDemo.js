import * as readline from 'node:readline';

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
