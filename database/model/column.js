/* 栏目表 */
const mongoose = require('mongoose');

const options = {
  timestamps: { createdAt: 'created_at', updatedAt: 'update_at' },
};

const columnSchema = new mongoose.Schema({
  column_id: Number,
  column_name: String,
}, options);

columnSchema.index({ column_id: 1 });

const ColumnModel = mongoose.model('column', columnSchema);

module.exports = ColumnModel;
