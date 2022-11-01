import logger from '../utils/logger';
import ErrorRes from '../utils/error';
import { verifyToken } from '../utils/auth';

const auth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization || '';
    const token = authorization.split(' ')[1];
    if (!token) {
      return next(new ErrorRes('No Authorization Token', 401));
    }

    const decoded = verifyToken(token);
    req.user = decoded;

    next();
  } catch (error) {
    logger.error(error);
    next(new ErrorRes('Unauthorized', 401));
  }
};

export default auth;
