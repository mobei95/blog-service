const express = require('express')
const app = express()
const router = require('./router')

app.use('/', router)

app.listen('9990', () => {
	console.log('服务启动')
})