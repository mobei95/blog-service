const express = require('express');
const app = express();
const router = require('./router');

app.use('/', router);
console.log('process.env.NODE_ENV', process.env.NODE_ENV);

app.listen('9990', () => {
	console.log('服务启动');
});