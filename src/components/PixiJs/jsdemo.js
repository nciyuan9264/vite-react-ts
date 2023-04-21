
function sayHello() {
	console.log('hello world!!!');
}
function Cat() {
	console.log(1);
}
Cat.sayHello = sayHello;
export default Cat;