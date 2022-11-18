import User from '../models/user';
import logger from '../utils/logger';
import CustomError from '../utils/error';
import { verifyToken } from '../utils/auth';

const auth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization || '';
    const token = authorization.split(' ')[1];
    if (!token) {
      return next(new CustomError('No Authorization Token', 401));
    }

    const decoded = verifyToken(token);

    const user = await User.getById(decoded.id);

    if (!user) {
      return next(new CustomError('Invalid Authorization Token', 401));
    }

    req.user = decoded;

    next();
  } catch (error) {
    logger.error(error);
    next(new CustomError('Unauthorized', 401));
  }
};

export default auth;
