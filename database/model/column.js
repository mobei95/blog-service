/* 栏目表 */
const mongoose = require('mongoose');

const options = {
  timestamps: { createdAt: 'created_at', updatedAt: 'update_at' },
};

const columnSchema = new mongoose.Schema({
  id: Number,
  title: String,
}, options);

columnSchema.index({ id: 1 });

const ColumnModel = mongoose.model('user', columnSchema);

module.exports = ColumnModel;
