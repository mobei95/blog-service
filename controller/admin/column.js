const baseController = require('../base/baseController');
const columnModel = require('../../database/model/column');

class ColumnController extends baseController {
  constructor() {
    super();
    this.createColumn = this.createColumn.bind(this);
    this.getColumnList = this.getColumnList.bind(this);
    this.updateColumn = this.updateColumn.bind(this);
    this.delColumn = this.delColumn.bind(this);
  }

  /**
   * @description 添加column
   * */
  async createColumn(req, res) {
    const { column_name } = req.body;
    if (!column_name) {
      res.send({
        code: 400,
        message: '栏目名称不可为空',
      });
      return;
    }
    try {
      const column = await columnModel.findOne({ column_name });
      if (column) {
        res.send({
          code: 0,
          message: '栏目名称不可重复',
        });
      } else {
        const newColumn = {
          column_id: await this.getId('column_id'),
          column_name,
        };
        const newDbColumn = await columnModel.create(newColumn);
        res.send({
          code: 0,
          data: newDbColumn,
          message: 'success',
        });
      }
    } catch (err) {
      console.log('创建栏目失败', err);
      res.send({
        code: 500,
        message: '创建栏目失败',
      });
    }
  }

  /**
   * @description column列表
   * */
  async getColumnList(req, res) {
    const { column_name, count = 10, page = 1 } = req.query;
    try {
      if (typeof Number(count) !== 'number' || count <= 0) {
        throw new Error('count参数错误');
      } else if (typeof Number(page) !== 'number' || page <= 0) {
        throw new Error('page参数错误');
      }
    } catch (err) {
      console.log('参数错误', err.message);
      res.send({
        code: 400,
        message: err.message,
      });
      return;
    }

    const limit = page - 1;
    const skip = count * limit;
    const params = column_name ? { column_name } : {};
    const projection = ['column_name', 'column_id', 'update_at'].join(' ');
    try {
      const columnList = await columnModel.find({ ...params }, null, { skip, limit }).select(projection);
      const total = await columnModel.countDocuments({ ...params });
      res.send({
        code: 0,
        data: {
          data: columnList,
          total,
        },
        message: 'success',
      });
    } catch (err) {
      console.log('栏目查询失败', err);
      res.send({
        code: 500,
        message: 'column查询失败',
      });
    }
  }

  /**
   * @description 更新column
   * */
  async updateColumn(req, res) {
    const { column_id } = req.params;
    const { column_name } = req.body;
    if (!column_id) {
      res.send({
        code: 400,
        message: '请传入正确的column_id',
      });
      return;
    }
    try {
      const column = await columnModel.findOne({ column_id });
      if (!column) {
        res.send({
          code: 0,
          message: '栏目不存在',
        });
        return;
      }
      column.column_name = column_name;
      column.save();
      res.send({
        code: 0,
        data: column,
        message: 'success',
      });
    } catch (err) {
      console.log('修改栏目出错', err);
      res.send({
        code: 500,
        message: '修改栏目出错',
      });
    }
  }

  /**
   * @description 删除column
   * */
  async delColumn(req, res) {
    const { column_id } = req.params;
    if (!column_id) {
      res.send({
        code: 400,
        message: '参数错误',
      });
      return;
    }
    try {
      await columnModel.remove({ column_id });
      res.send({
        code: 0,
        data: 1,
        success: 'message',
      });
    } catch (err) {
      console.log('删除column失败', err);
      res.send({
        code: 500,
        message: '删除column失败',
      });
    }
  }
}

module.exports = new ColumnController();
