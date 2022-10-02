import moment from "moment";
var dayjs = require('dayjs');

console.log('Hello from JavaScript');
console.log('MomentJS => ', moment().format());
console.log('DayJS => ', dayjs().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A'));

// ES2022 
const arr = [1, 2, 3, 4];
console.log('ES2022 Array.at() =>', arr.at(1));