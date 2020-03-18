import models from '../db/models';
import responseHelper from '../helpers/responseHelper';
import queryHelper from '../helpers/queryHelper';

const { NODE_ENV } = process.env;
const { Article: ArticleModel } = models;
/**
 * Article controller class
 */
class Article {
  /**
   * @description - Creates an article
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  static async createArticle(req, res) {
    try {
      const { title, article_body: articleBody } = req.body;
      const { id: userId } = req.userData;
      const article = await ArticleModel.create({
        title,
        body: articleBody,
        userId
      });
      return responseHelper(res, 201, 'Success', article, true);
    } catch (error) {
      return responseHelper(
        res,
        500,
        'Fail',
        NODE_ENV === 'development' ? error.message : 'An error occured',
        false
      );
    }
  }

  /**
   * @description - Updates an article
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  static async editArticle(req, res) {
    try {
      const { title, article_body: articleBody } = req.body;
      const { articleId } = req.query;
      const { id: userId } = req.userData;
      const article = await queryHelper.findOne(ArticleModel, {
        id: articleId
      });
      if (!article) {
        return responseHelper(
          res,
          404,
          'Fail',
          'This article does not exist',
          false
        );
      }
      if (article.userId !== userId) {
        return responseHelper(
          res,
          403,
          'Fail',
          'This article belongs to a different user',
          false
        );
      }
      const updateArticleData = {};
      if (title && title.trim().length) {
        updateArticleData.title = title;
      }
      if (articleBody && articleBody.trim().length) {
        updateArticleData.body = articleBody;
      }
      const updatedArticle = await queryHelper.update(
        ArticleModel,
        updateArticleData,
        {
          returning: true,
          where: {
            id: articleId,
            userId
          }
        }
      );
      return responseHelper(res, 200, 'Success', updatedArticle, true);
    } catch (error) {
      return responseHelper(
        res,
        500,
        'Fail',
        NODE_ENV === 'development' ? error.message : 'An error occured',
        false
      );
    }
  }

  /**
   * @description - Deletes an article
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  static async deleteArticle(req, res) {
    try {
      const { articleId } = req.query;
      const { id: userId } = req.userData;
      const article = await queryHelper.findOne(ArticleModel, {
        id: articleId,
        userId
      });
      if (!article) {
        return responseHelper(
          res,
          404,
          'Fail',
          'This article does not exist',
          false
        );
      }
      const deletedArticle = await ArticleModel.destroy({
        where: {
          id: articleId
        }
      });
      return responseHelper(res, 200, 'Success', deletedArticle, true);
    } catch (error) {
      return responseHelper(
        res,
        500,
        'Fail',
        NODE_ENV === 'development' ? error.message : 'An error occured',
        false
      );
    }
  }

  /**
   * @description - Gets all articles
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  static async getAllArticle(req, res) {
    try {
      const allArticle = await ArticleModel.findAndCountAll();
      if (allArticle.count === 0) {
        return responseHelper(res, 404, 'Fail', 'No article was found', false);
      }
      return responseHelper(res, 200, 'Success', allArticle, true);
    } catch (error) {
      return responseHelper(
        res,
        500,
        'Fail',
        NODE_ENV === 'development' ? error.message : 'An error occured',
        false
      );
    }
  }
}

export default Article;
