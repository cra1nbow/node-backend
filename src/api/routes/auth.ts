import { Router } from 'express';

const auth = (app: Router) => {
  const router = Router();

  app.use('/auth', router);
};

export default auth;
