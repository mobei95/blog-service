/* 文章表 */
const mongoose = require('mongoose');

const options = {
  timestamps: { createdAt: 'created_at', updatedAt: 'update_at' },
};

const articleSchema = new mongoose.Schema({
  id: Number,
  title: String,
  cover: String,
  summary: String,
  content: String,
  column: Array,
}, options);

articleSchema.index({ id: 1 });

const ArticleModel = mongoose.model('user', articleSchema);

module.exports = ArticleModel;
