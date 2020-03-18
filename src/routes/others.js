import express from 'express';

const otherRouter = express.Router();

otherRouter.get('/api', (req, res) =>
  res.status(200).json({
    message: 'Welcome Open API'
  })
);

otherRouter.all('*', (req, res) =>
  res.status(404).json({
    message: 'oooop! This page does not exist'
  })
);

export default otherRouter;
