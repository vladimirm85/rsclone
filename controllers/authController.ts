import { Request, Response } from 'express';
import { UserModel, User } from '../models';
import { userSchema } from '../validation';
import { errorHandler, successHandler, generateHash } from '../utils';

export const login = async () => {};
export const register = async (req: Request, res: Response): Promise<void | Response> => {
  const { email, password } = req.body;

  const userCandidate = await UserModel.findOne({ email });
  if (userCandidate) {
    return errorHandler(res, 409, `Sorry, email: ${email} has already been taken!`);
  }

  const userValidateCandidate = userSchema.validate(req.body);
  if (userValidateCandidate.error) {
    return errorHandler(
      res,
      409,
      `${userValidateCandidate.error.details[0].path[0]} validation error`
    );
  }

  const hashPassword = await generateHash(password);
  if (!hashPassword) {
    return errorHandler(res, 500, 'hashPassword was not generated');
  }

  const userData: User = {
    email,
    password: hashPassword,
    createdAt: new Date(),
  };

  const user = await UserModel.create(userData);

  await user.save();

  successHandler(res, 201, user);
};