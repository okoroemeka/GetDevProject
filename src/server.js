import express from 'express';
import { userRouter, articleRouter, otherRouter } from './routes';
import registerMiddlewares from './middlewares';
import appLogs from '../logger/logger';

const app = express();
const PORT = process.env.PORT || 3000;

registerMiddlewares(app);

app.use('/api', userRouter);
app.use('/api', articleRouter);
app.use('/', otherRouter);

app.listen(PORT, () => appLogs.info(`Server running on port ${PORT}`));

export default app;
