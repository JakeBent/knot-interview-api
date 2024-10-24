import { Service } from '@base';
import {
  DuplicateUserError,
  IncorrectAuthError,
} from '@common/errors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class UserService extends Service {
  public signup = async ({
    email,
    password,
    firstName,
    lastName,
  }: UserSignupDTO) => {
    const existingUser = await this.db.user.findFirst({ where: { email } });

    if (existingUser) {
      throw new DuplicateUserError();
    }

    const user = await this.db.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, this.config.salt),
        firstName,
        lastName,
      },
    });

    const payload: TokenPayload = { user };
    const token = jwt.sign(
      payload,
      this.config.jwtSecret,
      this.config.jwtOptions,
    );

    return token;
  };

  public login = async ({
    email,
    password,
  }: UserLoginDTO) => {
    const user = await this.db.user.findFirst({ where: { email } });

    if (!user) {
      throw new IncorrectAuthError();
    }

    const { password: hash } = user;

    if (!hash || !bcrypt.compareSync(password, hash)) {
      throw new IncorrectAuthError();
    }

    const payload: TokenPayload = { user };

    const token = jwt.sign(
      payload,
      this.config.jwtSecret,
      this.config.jwtOptions,
    );

    return token;
  };

  public me = async ({ user }: UserMeDTO) => this.db.user.findFirst({
    where: { id: user.id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      credentials: {
        select: {
          id: true,
          website: true,
          username: true,
        },
      },
      cards: {
        select: {
          id: true,
          network: true,
          lastFour: true,
        },
      },
    },
  });
}
