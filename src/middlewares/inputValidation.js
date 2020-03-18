import passwordValidator from './passwordValidator';
import responseHelper from '../helpers/responseHelper';

const checkEmailInput = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/**
 *
 */
class Validation {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {*} next
   * @returns{*} next
   */
  static async ValidateSignUp(req, res, next) {
    try {
      const { fullname, email, password, bio } = req.body;
      if (!fullname || !fullname.trim().length) {
        return res.status(400).json({
          status: 'Fail',
          Message: 'Fullname is required'
        });
      }
      if (!email || !checkEmailInput.test(email)) {
        return res.status(400).json({
          status: 'Fail',
          Message:
            'Email is required and should follow the format[<somebody>@<maildomain>.com]'
        });
      }
      if (
        !password ||
        password.trim().length < 8 ||
        passwordValidator(password) < 100
      ) {
        return res.status(400).json({
          status: 'Fail',
          Message:
            'Password should be atleast 8 characters and alphanumeric[<password234@>]'
        });
      }
      if (!bio || !bio.trim().length) {
        return res.status(400).json({
          status: 'Fail',
          Message: 'Bio is required'
        });
      }
      return next();
    } catch (error) {
      return res.status(400).json({
        status: 'Error',
        Message: 'An error occured'
      });
    }
  }

  /**
   * @description - validates login data
   * @param {object} req
   * @param {object} res
   * @param {*} next
   * @returns {*} method call
   */
  static async validateLogin(req, res, next) {
    const { password, email } = req.body;
    if (!email || !checkEmailInput.test(email)) {
      return responseHelper(
        res,
        400,
        'Fail',
        'Email is required and should follow <somebody@gmail.com>',
        false
      );
    }
    if (!password || !password.trim().length) {
      return responseHelper(
        res,
        400,
        'Fail',
        "Password field is can't be empty",
        false
      );
    }
    next();
  }

  /**
   * @description - Validates create article fields
   * @param {object} req
   * @param {object} res
   * @param {method} next
   * @returns {method}next method call
   */
  static async validateCreateArticle(req, res, next) {
    const { title, article_body: articleBody } = req.body;
    if (!title || !title.trim().length) {
      return responseHelper(res, 400, 'Fail', 'title feild is required', false);
    }
    if (!articleBody || !articleBody.trim().length) {
      return responseHelper(
        res,
        400,
        'Fail',
        'Article body is required',
        false
      );
    }
    return next();
  }
}
export default Validation;
