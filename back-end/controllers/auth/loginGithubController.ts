import { Request, Response } from 'express';
import { pick } from 'lodash';
import { createToken, TokenUserData } from '../../utils';

export const loginGithub = async (req: Request, res: Response): Promise<void | Response> => {
  const user = req.user;

  const token = await createToken(pick(user, ['_id', 'email']) as TokenUserData);

  const baseUrl = process.env.FRONT_BASE_URL || 'http://localhost:3006';
  res.redirect(`${baseUrl}/social-login-success/?token=${token}`);
};
