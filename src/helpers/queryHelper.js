import models from '../db/models';

const { Article: ArticleModel } = models;

/**
 * DB query helpers
 */
class QueryHelpers {
  /**
   * @description - Finds a user in the database
   * @param {object} model
   * @param {object} queryParameters
   * @returns {object} result
   */
  static async findOne(model, queryParameters) {
    return model.findOne({
      where: {
        ...queryParameters
      }
    });
  }

  /**
   * @description - updates a table in the database
   * @param {object} model
   * @param {object} updateData
   * @param {object} queryParameters
   * @returns {object} result
   */
  static async update(model, updateData, queryParameters) {
    return model.update(updateData, {
      ...queryParameters
    });
  }

  /**
   * @description - helper function for updating an article.
   * @param {object} requestData
   * @returns {object} result
   */
  static async updateArticleHelper(requestData) {
    const { title, articleBody, articleId, userId } = requestData;
    console.log('articleId', articleId);
    const updateArticleData = {};
    if (title && title.trim().length) {
      updateArticleData.title = title;
    }
    if (articleBody && articleBody.trim().length) {
      updateArticleData.body = articleBody;
    }
    await QueryHelpers.update(ArticleModel, updateArticleData, {
      where: {
        id: articleId,
        userId
      }
    });
    return QueryHelpers.findOne(ArticleModel, {
      id: articleId,
      userId
    });
  }
}

export default QueryHelpers;
