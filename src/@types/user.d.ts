export { };

declare global {
  export interface UserSignupDTO {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }

  export interface UserLoginDTO {
    email: string;
    password: string;
  }

  export interface UserMeDTO {
    user: User,
  }
}
