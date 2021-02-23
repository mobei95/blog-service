/* 数据id表 */
const mongoose = require('mongoose');

const idsSchema = new mongoose.Schema({
  user_id: Number,
  article_id: Number,
  column_id: Number,
});

const IdsModel = mongoose.model('ids', idsSchema);

IdsModel.findOne((err, idData) => {
  if (!idData) {
    const newIds = new IdsModel({
      user_id: 0,
      article_id: 0,
      column_id: 0,
    });
    newIds.save();
  }
});

module.exports = IdsModel;
