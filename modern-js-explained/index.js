var moment = require('moment');
var dayjs = require('dayjs');

console.log('Hello from JavaScript');
console.log('MomentJS => ', moment().format());
console.log('DayJS => ', dayjs().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A'));