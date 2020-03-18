import { compareSync } from 'bcrypt';
import models from '../db/models';
import tokenHelper from '../middlewares/authentication';
import responseHelper from '../helpers/responseHelper';
import queryHelper from '../helpers/queryHelper';

const { User } = models;
const { NODE_ENV } = process.env;
/**
 * User authentication class
 */
class UserAuth {
  /**
   *@description - Signup user method
   * @param {objec} req
   * @param {object} res
   * @returns {object} response object
   */
  static async createUser(req, res) {
    try {
      const { fullname, email, password, bio } = req.body;
      const checkUser = await queryHelper.findOne(User, { email });
      if (checkUser) {
        return responseHelper(
          res,
          400,
          'Error',
          'User already exists, signin to continue',
          false
        );
      }
      const userInfo = await User.create({
        fullname,
        email,
        password,
        bio
      });
      const token = tokenHelper.generateToken(
        { id: userInfo.id, email },
        { expiresIn: '4h' }
      );
      userInfo.password = '';
      return responseHelper(res, 201, 'Success', { userInfo, token }, true);
    } catch (error) {
      return responseHelper(
        res,
        500,
        'Error',
        NODE_ENV === 'development' ? error.message : 'An error occured',
        false
      );
    }
  }

  /**
   *@description - Login user method
   * @param {object} req
   * @param {object} res
   * @returns {object} response message
   */
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await queryHelper.findOne(User, { email });
      if (!user) {
        return responseHelper(
          res,
          400,
          'Fail',
          'User does not exist, signup to continue',
          false
        );
      }
      const checkPassword = compareSync(password, user.password);
      if (!checkPassword) {
        return responseHelper(
          res,
          400,
          'Fail',
          'Incorrect login credential',
          false
        );
      }
      const token = tokenHelper.generateToken(
        { id: user.id, email },
        { expiresIn: '4h' }
      );
      return responseHelper(
        res,
        200,
        'Success',
        { email: user.email, token },
        true
      );
    } catch (error) {
      return responseHelper(
        res,
        500,
        'Error',
        NODE_ENV === 'development' ? error.message : 'An error occured',
        false
      );
    }
  }

  /**
   *@description - get all writters
   * @param {object} req
   * @param {object} res
   * @returns {object} response message
   */
  static async getAllWriters(req, res) {
    try {
      const allWriters = await User.findAndCountAll();
      if (allWriters.count === 0) {
        return responseHelper(res, 404, 'Fail', 'No Writers found', false);
      }
      return responseHelper(res, 200, 'Success', allWriters, true);
    } catch (error) {
      return responseHelper(
        res,
        500,
        'Error',
        NODE_ENV === 'development' ? error.message : 'An error occured',
        false
      );
    }
  }
}
export default UserAuth;
