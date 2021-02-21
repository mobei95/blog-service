module.exports = {
  db_url: 'mongodb://localhost:27017/blog',
  port: parseInt(process.env.PORT, 10) || 9990,
};
