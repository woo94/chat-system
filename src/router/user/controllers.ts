import { User } from "~/entity";
import { RequestHandler } from "express";
import { ChatSystemError } from "~/module";
import { validate } from "class-validator";
import { AppDataSource } from "~/datasource";

export const userSignUp: RequestHandler<
  {},
  {},
  { name: string; email: string; password: string }
> = async (req, res, next) => {
  const userInfo = req.body;

  const newUser = new User();
  newUser.name = userInfo.name;
  newUser.email = userInfo.email;
  newUser.password = userInfo.password;

  const validationErrors = await validate(newUser, {
    validationError: {
      target: false,
    },
    stopAtFirstError: true,
  });
  if (validationErrors.length > 0) {
    console.log(validationErrors);
    const errMessage = Object.values(validationErrors[0].constraints!);
    return next(ChatSystemError.badParamErr(errMessage[0]));
  }

  const userRepository = AppDataSource.getRepository(User);

  await userRepository.save(newUser);

  return res.status(200).json(newUser);
};

export const userLogin: RequestHandler = async (req, res, next) => {};
