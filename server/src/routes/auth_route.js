import { Router } from 'express';

import { signIn, signUp, refreshTokens } from '../controllers/auth';
import { validateUserInput, validateRefreshToken } from '../validators/user';

const router = Router();

router.post('/signin', validateUserInput, signIn);
router.post('/signup', validateUserInput, signUp);
router.post('/token', validateRefreshToken, refreshTokens);

module.exports = router;
