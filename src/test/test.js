import polygonClipping from '../lib/polygon-clipping.js';

const poly1 = [[[0,0],[2,0],[0,2],[0,0]]]
const poly2 = [[[-1,0],[1,0],[0,1],[-1,0]]]

let union = polygonClipping.union       (poly1, poly2 /* , poly3, ... */)
let intersection = polygonClipping.intersection(poly1, poly2 /* , poly3, ... */)
let xor = polygonClipping.xor         (poly1, poly2 /* , poly3, ... */)
let difference = polygonClipping.difference  (poly1, poly2 /* , poly3, ... */)
const a = {union, intersection, xor, difference};

export default a;

console.log(...union, '\n', ...intersection, '\n', ...xor, '\n', ...difference)