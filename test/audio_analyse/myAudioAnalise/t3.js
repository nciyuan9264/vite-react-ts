import {
  promisify
} from "util";
import {
  exec
} from "child_process";
const trimmedExec = promisify(exec);

async function trimAudio(inputFile, outputFile, startSeconds, endSeconds) {
  const command = `ffmpeg -i ${inputFile} -ss ${startSeconds} -to ${endSeconds} -c copy ${outputFile}`;

  try {
    const {
      stdout,
      stderr
    } = await trimmedExec(command);
    console.log(`音频裁剪完成${outputFile}`);
  } catch (error) {
    console.error("裁剪音频时出错：", error);
  }
}

async function add(inputFile, outputFile) {
  // const command = `ffmpeg -i ${inputFile1} -i ${inputFile2} -filter_complex [0:a][1:a]concat=n=2:v=0:a=1[out] -map "[out]"  ${outputFile}`;
  let command;
  if (inputFile.length === 3) {
    command = `ffmpeg -i ${inputFile[0]} -i ${inputFile[1]} -i ${inputFile[2]} -filter_complex [0:a][1:a][2:a]concat=n=3:v=0:a=1[out] -map "[out]" ${outputFile}`;
  } else {
    command = `ffmpeg -i ${inputFile[0]} -i ${inputFile[1]} -i ${inputFile[2]} -i ${inputFile[3]} -filter_complex [0:a][1:a][2:a][3:a]concat=n=4:v=0:a=1[out] -map "[out]" ${outputFile}`;
  }

  try {
    const {
      stdout,
      stderr
    } = await trimmedExec(command);
    console.log(`音频合并完成${outputFile}`);
  } catch (error) {
    console.error("合并音频时出错：", error);
  }
}

const audioFiles = Array.from({
    length: 5
  },
  (_, i) => `./audio/${String(i + 1).padStart(3, "0")}.mp3`
);

// // 示例用法
// const inputFile = "1.mp3"; // 输入音频文件路径
// const outputFile1 = "outpu1.mp3"; // 输出裁剪后的音频文件路径
// const outputFile2 = "output2.mp3"; // 输出裁剪后的音频文件路径
// const outputFile_f = "output3.mp3"; // 输出裁剪后的音频文件路径

// const startSeconds = 922; // 裁剪起始时间（秒）
// const endSeconds = 927; // 裁剪结束时间（秒）

// let i = 0;
// trimAudio(inputFile, outputFile1, 0, startSeconds);
// trimAudio(inputFile, outputFile2, endSeconds + 1, 1376);



let time = [
  [403, 468, 922],
  [388, 432, 987],
  [452, 463, 939],
  [430, 908],
  [433, 450, 878],
];

time.forEach(subArray => subArray.sort((a, b) => a - b));
const audioLengthArr = [
  [11003328, 0],
  [10395936, 1],
  [11886624, 2],
  [11049408, 3],
  [11041920, 4],
  [11210688, 5],
  [11272032, 6],
  [11848320, 7],
  [10757664, 8],
  [11233728, 9],
  [11733120, 10],
  [10972512, 11],
  [11356704, 12],
  [10926432, 13],
  [10957248, 14],
  [11103264, 15],
  [11272032, 16],
  [12385728, 17],
  [11303136, 18],
  [11072448, 19],
  [11395008, 20],
  [11771424, 21],
  [11095488, 22],
  [11886624, 23],
  [11548800, 24],
  [11072448, 25],
  [10849824, 26],
  [12693024, 27],
  [11264544, 28],
  [11556288, 29],
  [11141568, 30],
  [10957248, 31],
  [11648448, 32],
  [10834272, 33],
  [14021568, 34],
  [11433312, 35],
  [12201408, 36],
  [13783392, 37],
  [11225952, 38],
  [12070944, 39],
  [11064960, 40],
  [11533248, 41],
  [11740608, 42],
  [13146048, 43],
  [11356992, 44],
  [11886624, 45],
  [11149344, 46],
  [11018592, 47],
  [11218752, 48],
  [11041632, 49],
  [11356704, 50],
  [13092192, 51],
  [11103552, 52],
  [11172384, 53],
  [11341440, 54],
  [11203200, 55],
  [11234016, 56],
  [11218464, 57],
  [10672992, 58],
  [11717568, 59],
  [11156832, 60],
  [9575136, 61],
  [11179872, 62],
  [11118528, 63],
  [11917440, 64],
  [11225952, 65],
  [11318400, 66],
  [11026368, 67],
  [11202912, 68],
  [11126304, 69],
  [11133792, 70],
  [11126304, 71],
  [11264544, 72],
  [12093984, 73],
  [11218464, 74],
  [11233728, 75],
  [11256768, 76],
  [11118816, 77],
  [11080224, 78],
  [11103264, 79],
  [11302848, 80],
  [9928224, 81],
  [11579616, 82],
  [11195424, 83],
  [11149344, 84],
  [11564064, 85],
  [11118528, 86],
  [11210688, 87],
  [11095488, 88],
  [11249280, 89],
  [11195424, 90],
  [11095776, 91],
  [11133792, 92],
  [11233728, 93],
  [13583808, 94],
  [11279808, 95],
  [11064960, 96],
  [11195712, 97],
  [11103264, 98],
  [11087712, 99],
  [11218464, 100],
  [11256768, 101],
  [11141568, 102],
  [11095488, 103],
  [11149344, 104],
  [11418336, 105],
  [11248992, 106],
  [11103264, 107],
  [11072448, 108],
  [11195424, 109],
  [11264544, 110],
  [11210688, 111],
  [11149344, 112],
  [11210688, 113],
  [11149344, 114],
  [11087712, 115],
  [11018592, 116],
  [11256768, 117],
  [11341152, 118],
  [11210688, 119],
  [11264544, 120],
  [11172384, 121],
  [11003616, 122],
  [11064672, 123],
  [11095488, 124],
  [10857312, 125],
  [11141568, 126],
  [11225952, 127],
  [11049408, 128],
  [10888128, 129],
  [12009312, 130],
  [11218464, 131],
  [11195424, 132],
  [11141568, 133],
  [11187648, 134],
  [11133792, 135],
  [11156832, 136],
  [11164608, 137],
  [11218464, 138],
  [11126304, 139],
  [11110752, 140],
  [11087712, 141],
  [11218464, 142],
  [11111040, 143],
  [11218464, 144],
  [11088000, 145],
  [11233728, 146],
  [11064672, 147],
  [11264544, 148],
  [11087712, 149],
  [11064672, 150],
  [11149632, 151],
  [11187648, 152],
  [11279808, 153],
  [11149344, 154],
  [12431808, 155],
  [11164608, 156],
  [11172384, 157],
  [11126592, 158],
  [11064672, 159],
  [11617632, 160],
  [11625408, 161],
  [11571552, 162],
  [11587104, 163],
  [11556288, 164],
  [11410272, 165],
  [11202912, 166],
  [11287872, 167],
  [11395296, 168],
  [11264544, 169],
  [11364192, 170],
  [11433312, 171],
  [11371968, 172],
  [11341152, 173],
  [10926432, 174],
  [11694528, 175],
  [11402784, 176],
  [11587104, 177],
  [10166112, 178],
  [11371968, 179],
  [11379744, 180],
  [11410272, 181],
  [11418048, 182],
  [11648448, 183],
  [11517984, 184],
  [11310624, 185],
  [11333664, 186],
  [11525472, 187],
  [11510208, 188],
  [11871072, 189],
  [11288160, 190],
  [11557152, 191],
  [11495520, 192],
  [11495520, 193],
  [11610720, 194],
  [11410848, 195],
  [11518560, 196],
  [11318688, 197],
  [11533824, 198],
  [11357280, 199],
  [11487744, 200],
  [11311200, 201],
  [11587680, 202],
  [11572128, 203],
  [12670560, 204],
  [11334240, 205],
  [11679840, 206],
  [11426400, 207],
  [11634048, 208],
  [11387808, 209],
  [11595168, 210],
  [11572128, 211],
  [11641248, 212],
  [11625984, 213],
  [11418624, 214],
  [11510784, 215],
  [11695104, 216],
  [11318688, 217],
  [10020960, 218],
];


async function performTrimming(file, index) {
  const audioLength = audioLengthArr[index][0] / 8000;
  const cutPoints = time[index];
  for (let i = 0; i <= cutPoints.length; i++) {
    const audioFile = file;
    let startSeconds, endSeconds;
    if (i === 0) {
      startSeconds = 0;
      endSeconds = cutPoints[i] - 1;
    } else if (i === cutPoints.length) {
      startSeconds = cutPoints[i - 1] + 6;
      endSeconds = audioLength;
    } else {
      startSeconds = cutPoints[i - 1] + 6;
      endSeconds = cutPoints[i] - 1;
    }
    const outputFile = `./middle/${index}_middle${i}.mp3`;
    await trimAudio(audioFile, outputFile, startSeconds, endSeconds);
  }
}

async function addAudio(_, index) {
  const cutPointsLength = time[index].length;
  const inputFile = [];
  let outputFile;
  for (let i = 0; i <= cutPointsLength; i++) {
    let name = `./middle/${index}_middle${i}.mp3`;
    inputFile.push(name);
    outputFile = `./out2/${String(index + 1).padStart(3, "0")}.mp3`;
  }
  await add(inputFile, outputFile);
}
async function processAudio() {
  try {
    await Promise.all(audioFiles.map((_, index) => performTrimming(_, index)));
    console.log("音频裁剪全部完成");
    await Promise.all(audioFiles.map((_, index) => addAudio(_, index)));
    console.log("音频合并全部完成");
  } catch (error) {
    console.error("出错：", error);
  }
}

processAudio();