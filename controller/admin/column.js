const baseController = require('../base/baseController');

class ColumnController extends baseController {
  constructor() {
    super();
    this.createColumn = this.createColumn.bind(this);
    this.getColumnList = this.getColumnList.bind(this);
  }

  /**
   * @description 添加column
   * */
  createColumn(req, res) {
    const { column_name } = req.body;
    if (!column_name) {
      res.send({
        code: 400,
        message: '栏目名称不可为空',
      });
    }
  }

  /**
   * @description column列表
   * */
  getColumnList(req, res) {
    console.log(req, res);
  }
}

module.exports = new ColumnController();
