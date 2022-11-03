import { Router } from 'express';

import auth from '../middlewares/auth';
import { signIn, signUp, refreshTokens, signOut } from '../controllers/auth';

import { validateUserInput, validateRefreshToken } from '../validators/user';

const router = Router();

router.post('/signin', validateUserInput, signIn);
router.post('/signup', validateUserInput, signUp);
router.post('/token', validateRefreshToken, refreshTokens);
router.get('/signout', auth, signOut);

module.exports = router;
