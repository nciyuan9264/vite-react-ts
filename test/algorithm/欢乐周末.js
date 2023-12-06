const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let minSubsidy = Number.MAX_VALUE; // 最小补贴金额

// 读取输入
const input = [];
rl.on('line', (line) => {
    input.push(line.trim());
    if (input.length === parseInt(input[0].split(',')[0]) + 1) {
        rl.close();
    }
});

rl.on('close', () => {
    const [n, m] = input[0].split(',').map(Number); // 参与的市民总数和店铺总数
    const voters = []; // 市民投票信息列表
    const shopVotes = new Map(); // 商店票数映射
    shopVotes.set(1, 0); // 初始化1号店铺票数为0

    // 读取市民投票信息
    for (let i = 1; i < input.length; i++) {
        const [shopId, subsidy] = input[i].split(',').map(Number);
        if (shopId !== 1) {
            voters.push([shopId, subsidy]);
        }
        shopVotes.set(shopId, (shopVotes.get(shopId) || 0) + 1);
    }

    // 计算最小补贴金额
    calculateSubsidy(voters, 0, 0, shopVotes);
    console.log(minSubsidy);
});

// 计算最小补贴金额的递归函数
// function calculateSubsidy(voters, index, currentSubsidy, shopVotes) {
//     if (index === voters.length) { // 边界条件：所有市民都已处理
//         if (isTop1(shopVotes) && minSubsidy > currentSubsidy) {
//             minSubsidy = currentSubsidy;
//         }
//         return;
//     }

//     const [shopId, subsidy] = voters[index]; // 当前处理的市民

//     // 尝试不发放补贴
//     calculateSubsidy(voters, index + 1, currentSubsidy, shopVotes);

//     // 发放补贴
//     shopVotes.set(shopId, shopVotes.get(shopId) - 1); // 原店铺票数减1
//     shopVotes.set(1, shopVotes.get(1) + 1); // 1号店铺票数加1
//     calculateSubsidy(voters, index + 1, currentSubsidy + subsidy, shopVotes);

//     // 回溯
//     shopVotes.set(shopId, shopVotes.get(shopId) + 1); // 原店铺票数加1
//     shopVotes.set(1, shopVotes.get(1) - 1); // 1号店铺票数减1
// }

function calculateSubsidy(voters, index, currentSubsidy, shopVotes) {
    if (isTop1(shopVotes) && minSubsidy > currentSubsidy) {
        minSubsidy = currentSubsidy;
        return;
    }

    for (let i = index; i < voters.length; i++) {
        const [shopId, subsidy] = voters[i]; // 当前处理的市民
        // 发放补贴
        shopVotes.set(shopId, shopVotes.get(shopId) - 1); // 原店铺票数减1
        shopVotes.set(1, shopVotes.get(1) + 1); // 1号店铺票数加1
        calculateSubsidy(voters, i + 1, currentSubsidy + subsidy, shopVotes);

        // 回溯
        shopVotes.set(shopId, shopVotes.get(shopId) + 1); // 原店铺票数加1
        shopVotes.set(1, shopVotes.get(1) - 1); // 1号店铺票数减1
    }

}