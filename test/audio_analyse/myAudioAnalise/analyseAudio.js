// 获取音频文件
async function getAudioData(t) {
    return fetch(t).then((response) => response.arrayBuffer());
}
// 调用浏览器接口AudioContext解码，感觉比较笨拙，其实并不用浏览器这样处理，就当是体验浏览器接口吧
async function decode(filePath, sampleRate) {
    const audioContext = new AudioContext({
        sampleRate: sampleRate,
    });
    const decodedData = await getAudioData(filePath);
    const buffer = await audioContext.decodeAudioData(decodedData);
    audioContext.close();
    return buffer;
}
// 记录每段音频长度的数组
const a = [];
async function load(filePath, sampleRate) {
    try {
        const decodedData = await decode(filePath, sampleRate);
        const audioData = [decodedData.getChannelData(0)];
        a.push(audioData[0].length / sampleRate);
        console.log(filePath);
        return audioData;
    } catch (error) {
        console.error("加载音频时出错:", error);
        throw error;
    }
}
/**
 * 
 * @param {*} originalArray 
 * @returns 5秒一加
 */
function sumAdjacentElements(originalArray) {
    const newArray = new Array(originalArray.length).fill(0);
    // 遍历原数组进行相加
    for (let i = 0; i < originalArray.length; i++) {
        let sum = 0;
        for (let j = 0; j < 5; j++) {
            if (i + j < originalArray.length) {
                sum += originalArray[i + j];
            }
        }
        newArray[i] = sum;
    }
    return newArray;
}
/**
 * 
 * @param {*} array 输入数组
 * @param {*} startIndex 起始位置
 * @param {*} endIndex 最终位置
 * @param {*} count
 * @returns 排序前count的值
 */
function findMaxIndices(array, startIndex, endIndex, count) {
    const subArray = array.slice(startIndex, endIndex + 1);
    const sortedIndices = subArray
        .map((value, index) => [index + startIndex, value])
        .sort((a, b) => b[1] - a[1])
        .map(([index]) => index)
        .slice(0, count);

    return sortedIndices;
}
const LENGTH = 5; // 音频数量
const audioFiles = Array.from({
        length: LENGTH,
    },
    (_, i) => `./audio/${String(i + 1).padStart(3, "0")}.mp3`
);
const sampleRate = 8000;
const promises = audioFiles.map((file) => load(file, sampleRate));
const allRes = [];
Promise.all(promises)
    .then((results) => {
        // 所有文件都已加载完成，results 是一个包含每个文件加载结果的数组
        // 在这里执行每个文件的后续操作
        results.forEach((res, index) => {
            const originalArray = [...res[0]]; // 原始采样数组 1s 8000个数据
            const newArray = []; // 分成秒的数据
            for (let i = 0; i < originalArray.length; i += sampleRate) {
                const chunk = originalArray.slice(i, i + sampleRate); // 获取当前分块
                const sum = chunk.reduce(
                    (accumulator, currentValue) =>
                    Math.abs(accumulator) + Math.abs(currentValue)
                ); // 计算分块的和
                newArray.push(sum); // 将和添加到新数组
            }
            const newFiveAddArr = sumAdjacentElements(newArray); // 每5s加起来的数据
            const finalArr = findMaxIndices(newFiveAddArr, 360, 540, 4); // 在区间内找最大值
            const finalArr2 = findMaxIndices(newFiveAddArr, 800, 1050, 1);
            const result = [];
            finalArr.sort((a, b) => {
                return a - b;
            });
            for (let j = 0; j < finalArr.length; j++) {
                if (j === 0 || (result.length < 2 && Math.abs(result[0] - finalArr[j]) > 10)) {
                    result.push(finalArr[j]);
                }
            }
            result.push(finalArr2[0]);
            console.log(result);
            allRes.push(result);
            for (let i = 0; i < result.length; i++) {
                console.log(`${Math.floor(result[i] / 60)}:${result[i] % 60}`);
            }
        });
        console.log(allRes);
    })
    .catch((error) => {
        // 处理加载文件过程中的错误
        console.error("加载文件时出错:", error);
    });