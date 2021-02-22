const CryptoJS = require('crypto-js');
const baseController = require('../base/baseController');
const userModel = require('../../database/model/user');

class UserController extends baseController {
  constructor() {
    super();
    this.cryptoKey = `CRYPTO${this.random()}`;
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  /**
	 * @description 用户注册
	 * */
  async register(req, res) {
    const { user_name, password } = req.body;
    if (!user_name || !password) {
      res.send({
        code: 400,
        message: '参数不完整',
      });
      return;
    }
    try {
      const user = await userModel.findOne({ user_name });
      if (!user) {
        const newPassword = this.encrypt(password);
        const newUser = {
          user_name,
          password: newPassword,
          status: 0,
        };
        await userModel.create(newUser);
        res.send({
          code: 0,
          message: 'success',
        });
      } else {
        res.send({
          code: 0,
          message: '用户已存在，请直接登录',
        });
      }
    } catch (err) {
      console.log('注册失败', err);
      res.send({
        code: 500,
        message: '注册失败',
      });
    }
  }

  /**
   * @description 用户登录
   * */
  async login(req, res) {
    const { user_name, password } = req.body;
    if (!user_name || !password) {
      res.send({
        code: 400,
        message: '参数不完整',
      });
      return;
    }
    try {
      const user = await userModel.findOne({ user_name });
      if (!user) {
        res.send({
          code: 0,
          message: '用户不存在',
        });
      } else if (password !== this.decrypt(user.password)) {
        res.send({
          code: 0,
          message: '用户密码错误',
        });
      } else {
        res.send({
          code: 0,
          data: user,
          message: 'success',
        });
      }
    } catch (err) {
      console.log('登录失败', err);
      res.send({
        code: 500,
        message: '登陆失败',
      });
    }
  }

  crypto() {
    return CryptoJS.AES;
  }

  encrypt(password) {
    return this.crypto().encrypt(password, this.cryptoKey).toString();
  }

  decrypt(password) {
    return this.crypto().decrypt(password, this.cryptoKey).toString(CryptoJS.enc.Utf8);
  }
}

module.exports = new UserController();
