import _ from 'lodash';

const objects = [{
    'a': {
        c: 'c'
    }
}, {
    'b': 2
}, () => {
    console.log(123)
}, undefined];
const deep = _.cloneDeep(objects);
const normal = _.clone(objects);

const newO = [
    ...objects
]
const strObj = JSON.parse(JSON.stringify(objects))

objects[0].a = 222;

console.log(objects, '\n', normal, '\n', deep, '\n', newO, '\n', strObj)

// => false