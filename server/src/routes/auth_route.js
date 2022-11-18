import { Router } from 'express';

import auth from '../middlewares/auth';
import { signIn, signUp, refreshTokens, signOut } from '../controllers/auth';

import { validateRefreshToken, validateSignInInput, validateSignUpInput } from '../validators/user';

const router = Router();

router.post('/signin', validateSignInInput, signIn);
router.post('/signup', validateSignUpInput, signUp);
router.post('/token', validateRefreshToken, refreshTokens);
router.post('/signout', validateRefreshToken, auth, signOut);

module.exports = router;
