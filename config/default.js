module.exports = {
  db_url: 'mongodb://127.0.0.1:27017/blog',
  port: parseInt(process.env.PORT, 10) || 9990,
};
