const express = require('express');
const config = require('config-lite')(__dirname);
require('./database/db');
const router = require('./router');

const app = express();

app.use(express.json()); // 将request转为json
app.use(require('cors')());
// 配置接口跨域
app.use('/', router);

app.listen(config.port, () => {
  console.log('服务启动', config.port);
});
