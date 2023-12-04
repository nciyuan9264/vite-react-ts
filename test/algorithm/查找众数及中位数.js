function cal(numbers) {
    numbers = numbers.split(' ').map(Number);
    const countMap = new Map();
    let maxCount = 0;
    for (let number of numbers) {
        let count = countMap.get(number) || 0;
        count++;
        countMap.set(number, count);
        maxCount = Math.max(maxCount, count);
    }

    const maxCountNumbers = Array.from(countMap.entries())
        .filter(entry => entry[1] === maxCount)
        .map(entry => entry[0])
        .sort((a, b) => b - a);

    let median;
    if (maxCountNumbers.length % 2 !== 0) {
        let index = Math.floor((maxCountNumbers.length + 1) / 2) - 1;
        median = maxCountNumbers[index];
    } else {
        let index1 = maxCountNumbers.length / 2 - 1;
        let index2 = maxCountNumbers.length / 2;
        median = Math.floor((maxCountNumbers[index1] + maxCountNumbers[index2]) / 2);
    }

    console.log(median);

}




let numstr = '1 2 3 4 5 6 7 8 9 10'
console.log(cal(numstr));