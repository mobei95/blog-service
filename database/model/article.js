/* 文章表 */
const mongoose = require('mongoose');

const { Mixed } = mongoose.Schema.Types;

const options = {
  timestamps: { createdAt: 'created_at', updatedAt: 'update_at' },
};

const articleSchema = new mongoose.Schema({
  article_id: Number,
  title: String,
  cover: String,
  summary: String,
  content: String,
  column: Mixed, // {column_id, column_name}
}, options);

articleSchema.index({ article_id: 1 });

const ArticleModel = mongoose.model('article', articleSchema);

module.exports = ArticleModel;
