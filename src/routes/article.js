import express from 'express';
import Article from '../controllers/article';
import Validation from '../middlewares/inputValidation';
import Authenticate from '../middlewares/authentication';

const articleRouter = express.Router();

articleRouter
  .route('/articles')
  .post(
    Authenticate.verifyToken,
    Validation.validateCreateArticle,
    Article.createArticle
  )
  .patch(Authenticate.verifyToken, Article.editArticle)
  .delete(Authenticate.verifyToken, Article.deleteArticle)
  .get(Authenticate.verifyToken, Article.getAllArticle);

export default articleRouter;
