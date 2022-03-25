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

// export type MockToken = {
//   token: string,
// };

export type DecodeData = {
  data: {
    email: string,
    password: string,
  }
};

export type User = {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
};

export type TUser = {
  id: number,
  username: string,
  role: string,
  email: string,
};

export type TUserModel = {
  user: {
    id: number,
    username: string,
    role: string,
    email: string,
  },
  token: string,
};

export type UserEveryMock = [
  {
    'id': 1,
    'username': 'Admin',
    'role': 'admin',
    'email': 'admin@admin.com',
  },
  {
    'id': 2,
    'username': 'Clara',
    'role': 'admin',
    'email': 'clara@user.com',
  },
];

export type TPartida = {
  homeTeamGoals: number,
  awayTeamGoals: number,
};
