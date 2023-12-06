let str= 'a{b{d,e{g,h{,i}}},c{f}}';
const indices = []; // 用于记录左括号的索引
const stack = []; // 用于存储节点值

for (let i = 0; i < str.length; i++) {
    const c = str.charAt(i);

    if (c === '}') {
        const index = indices.pop(); // 获取上一个左括号的索引
        const sb = [];

        while (index + 1 < stack.length) { // 将右括号后面的节点值拼接起来
            sb.push(stack.splice(index + 1, 1)[0]);
        }

        const subTree = sb.join('');
        stack.pop(); // 移除右括号
        const root = stack.pop(); // 移除根节点
        const split = subTree.split(',');
        const left = split[0];
        const right = split.length > 1 ? split[1] : '';
        stack.push(left + root + right); // 将左子树、根节点、右子树拼接起来
        continue;
    }

    if (c === '{') {
        indices.push(stack.length); // 记录左括号的索引
    }

    stack.push(c); // 将节点值加入栈中
}

console.log(stack[0]); // 输出中序遍历结果