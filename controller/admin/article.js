const baseController = require('../base/baseController');
const ArticleModel = require('../../database/model/article');

class ArticleController extends baseController {
  constructor() {
    super();
    this.createArticle = this.createArticle.bind(this);
    this.getArticleList = this.getArticleList.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
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

  /**
   * @description 获取article列表
   * */
  async getArticleList(req, res) {
    const { title, count = 10, page = 1 } = req.query;
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
    const params = title ? { title } : {};
    const projection = ['title', 'article_id', 'cover', 'summary', 'column', 'update_at'].join(' ');
    try {
      const articleList = await ArticleModel.find({ ...params }, null, { skip, limit }).select(projection);
      const total = await ArticleModel.countDocuments({ ...params });
      res.send({
        code: 0,
        data: {
          data: articleList,
          total,
        },
        message: 'success',
      });
    } catch (err) {
      console.log('文章列表获取失败', err);
      res.send({
        code: 500,
        message: 'article查询失败',
      });
    }
  }

  /**
   * @description 更新文章信息
   * */
  async updateArticle(req, res) {
    const { article_id } = req.params;
    const {
      title, cover, summary, column,
    } = req.body;
    console.log('article_id', article_id);
    if (typeof Number(article_id) !== 'number') {
      res.send({
        code: 400,
        message: '请传入正确的article_id',
      });
    }
    try {
      const article = await ArticleModel.findOne({ article_id });
      if (!article) {
        res.send({
          code: 0,
          message: 'article不存在',
        });
      }
      article.title = title || article.title;
      article.cover = cover || article.cover;
      article.summary = summary || article.summary;
      article.column = column || article.column;
      article.save();
      res.send({
        code: 0,
        data: article,
        message: 'success',
      });
    } catch (err) {
      console.log('更新文章信息失败', err);
      res.send({
        code: 500,
        message: 'article更新失败',
      });
    }
  }
}

module.exports = new ArticleController();
