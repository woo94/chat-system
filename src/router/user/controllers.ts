import { User } from "~/entity";
import { RequestHandler } from "express";
import { ChatSystemError } from "~/module";
import { validate } from "class-validator";
import { AppDataSource } from "~/datasource";
import Jwt from "jsonwebtoken";
import { QueryFailedError } from "typeorm";
import { DatabaseError } from "pg";

const userRepository = AppDataSource.getRepository(User);

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
    // console.log(validationErrors);
    const errMessage = Object.values(validationErrors[0].constraints!);
    return next(ChatSystemError.badParamErr(errMessage[0]));
  }

  try {
    await userRepository.save(newUser);
    return res.status(200).json(newUser);
  } catch (err) {
    if (err instanceof QueryFailedError) {
      const error = err.driverError as DatabaseError;
      return next(ChatSystemError.internalErr(error.detail));
    } else {
      console.log(err);
      return next(ChatSystemError.internalErr("unknown error"));
    }
  }
};

export const userLogin: RequestHandler<
  any,
  any,
  { email: string; password: string }
> = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return next(ChatSystemError.badParamErr("email required"));
  }

  if (!password) {
    return next(ChatSystemError.badParamErr("password required"));
  }

  const user = await userRepository.findOneBy({
    email,
  });

  if (!user) {
    return next(new ChatSystemError(404, "user-not-found"));
  }

  if (user.password !== password) {
    return next(new ChatSystemError(401, "wrong-password"));
  }

  const token = Jwt.sign({ id: user.id }, "my-secret");

  return res.status(200).json({
    token,
  });
};
