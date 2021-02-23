const IdsModel = require('../../database/model/ids');

module.exports = class BaseController {
  constructor() {
    this.ids = ['user_id', 'article_id', 'column_id'];
  }

  random(min = 100000, max = 999999) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /**
   * @description 获取id，用于数据表id自增
   * */
  async getId(type) {
    if (!this.ids.includes(type)) {
      console.log('id类型不存在');
      throw new Error('id类型不存在');
    }
    try {
      const idData = await IdsModel.findOne();
      idData[type]++;
      await idData.save();
      return idData[type];
    } catch (err) {
      console.log('获取ID数据失败');
      throw new Error(err);
    }
  }
};
