import logger from '../utils/logger';
import { verifyToken } from '../utils/auth';

const auth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization || '';
    const token = authorization.split(' ')[1];
    if (!token) {
      return next(new Error('No Authorization Token'));
    }

    const decoded = verifyToken(token);
    req.user = decoded;

    next();
  } catch (error) {
    logger.error(error);
    next(new Error('Unauthorized'));
  }
};

export default auth;
