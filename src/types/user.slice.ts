import { NavigateFunction } from "react-router-dom";

export type UserType = {
  _id?: string;
  uid: string;
  firstname: string | undefined;
  lastname: string | undefined;
  email: string | null;
  emailVerified: boolean;
  terms: boolean;
  gender: string | undefined;
};

export type CreateUserOnSanityProps = {
  dispatch: any;
  userData: UserType;
  router: NavigateFunction;
};

export type GetUserFromSanityProps = {
  dispatch: any;
  email: string;
};
