const mongoose = require('mongoose');
const config = require('config-lite')(__dirname);

const db = mongoose.createConnection(config.db_url, { useNewUrlParser: true, useUnifiedTopology: true });

db.once('open', () => {
  console.log('连接数据库成功');
});

db.on('error', (error) => {
  console.error('数据库连接失败', error);
  mongoose.disconnect();
});

db.on('close', () => {
  console.log('数据库断开，重新连接数据库');
  // mongoose.connect(config.db_url, {server:{auto_reconnect:true}});
});

module.exports = db;
