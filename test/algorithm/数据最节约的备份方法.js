const getNextLine = async () => {
    const line = await rl[Symbol.asyncIterator]().next();
    return line.value;
};

const minDiscs = (fileSizes) => {
    fileSizes.sort((a, b) => b - a);
    let discs = 0;

    while (fileSizes.length > 0) {
        let currentDiscCapacity = 0;
        discs++;
        let i = 0;
        while (fileSizes.length > 0 && i < fileSizes.length) {
            if (currentDiscCapacity + fileSizes[i] <= 500) {
                currentDiscCapacity += fileSizes[i];
                fileSizes.splice(i, 1);
            }else{
                i++;
            }
        }
    }

    return discs;
};

void(async function () {
    const fileSizes = [300,150,150,100,100,100,100];

    const result = minDiscs(fileSizes);
    console.log(result);
})();