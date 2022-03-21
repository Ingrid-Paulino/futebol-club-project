export type Secret = string;

export type Payload = {
  email: string,
  password: string,
};

export type JwtConfig = {
  expiresIn: string,
  algorithm: string,
};

export type Token = string;

export type DecodeData = {
  data: {
    email: string,
    password: string,
  }
};

export type User = {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
};
