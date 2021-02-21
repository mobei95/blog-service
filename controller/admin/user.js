const baseController = require('../base/baseController');

class UserController extends baseController {
  constructor() {
    super();
  }

  /**
	 * @description 用户注册
	 * */
  register(req, res, next) {
    console.log(req, res, next);
    this.uploadFile();
  }
}

module.exports = new UserController();
