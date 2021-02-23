const CryptoJS = require('crypto-js');
const baseController = require('../base/baseController');
const userModel = require('../../database/model/user');

class UserController extends baseController {
  constructor() {
    super();
    this.cryptoKey = 'CRYPTO_KEY';
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.changePassword = this.changePassword.bind(this);
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
          user_id: await this.getId('user_id'),
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
        const { status, user_id, created_at } = user;
        const sendData = {
          status, user_id, user_name, created_at,
        };
        res.send({
          code: 0,
          data: sendData,
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

  /**
   * @description 修改密码
   * */
  async changePassword(req, res) {
    const {
      user_name, newPassword, repeatPassword, oldPassword,
    } = req.body;
    if (!user_name || !newPassword || !repeatPassword || !oldPassword) {
      res.send({
        code: 400,
        message: '参数不完整',
      });
      return;
    } if (newPassword !== repeatPassword) {
      res.send({
        code: 0,
        message: '两次密码不一致',
      });
      return;
    }
    try {
      const user = await userModel.findOne({ user_name });
      if (!user) {
        res.send({
          code: 0,
          message: '当前用户不存在',
        });
      } else if (oldPassword !== this.decrypt(user.password)) {
        console.log('oldPassword', oldPassword, this.decrypt(user.password), user);
        res.send({
          code: 0,
          message: '用户密码错误',
        });
      } else {
        user.password = this.encrypt(newPassword);
        user.save();
        res.send({
          code: 0,
          success: 'success',
        });
      }
    } catch (err) {
      console.log('修改密码错误');
      res.send({
        code: 500,
        message: '修改密码错误',
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
