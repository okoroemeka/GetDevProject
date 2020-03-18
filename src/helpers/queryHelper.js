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
}

export default QueryHelpers;
