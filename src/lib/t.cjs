const Matrix = require("./Matrix.cjs");

var m1 = [
  [1, 1, -1],
  [1, 3, -2],
];

var res1 = Matrix.GaussJordanEliminate(m1);

console.log(res1)
