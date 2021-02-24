const baseController = require('../base/baseController');
const ArticleModel = require('../../database/model/article');

class ArticleController extends baseController {
  constructor() {
    super();
    this.createArticle = this.createArticle.bind(this);
  }

  /**
   * @description 添加article
   * */
  async createArticle(req, res) {
    const {
      title, cover, summary, content, column,
    } = req.body;
    try {
      if (!title) {
        throw new Error('文章标题不可为空');
      } else if (!summary) {
        throw new Error('文章摘要不可为空');
      } else if (content) {
        throw new Error('文章内容不可为空');
      } else if (typeof column !== 'number') {
        throw new Error('请设置文章所在栏目');
      }
    } catch (err) {
      res.send({
        code: 400,
        message: err.message,
      });
      return;
    }
    try {
      const article = await ArticleModel.findOne({ title });
      if (article) {
        res.send({
          code: 0,
          message: '文章名称不可重复',
        });
        return;
      }
      const newArticle = await ArticleModel.create({
        article_id: this.getId('article_id'),
        title,
        cover,
        summary,
        content,
        column,
      });
      res.send({
        code: 0,
        data: newArticle,
        message: 'success',
      });
    } catch (err) {
      console.log('创建文章失败', err);
      res.send({
        code: 0,
        message: '创建文章失败',
      });
    }
  }
}

module.exports = new ArticleController();
