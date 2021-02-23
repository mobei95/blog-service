/* 管理后台用户表 */
const mongoose = require('mongoose');

const options = {
  timestamps: { createdAt: 'created_at', updatedAt: 'update_at' },
};

const userSchema = new mongoose.Schema({
  user_name: String,
  password: String,
  user_id: Number,
  admin_type: Number, // 1为普通管理员， 2为超级管理员
  status: { type: Number, default: 0 }, // 0为账号未授权，1为账号已授权
}, options);

userSchema.index({ id: 1 });

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
