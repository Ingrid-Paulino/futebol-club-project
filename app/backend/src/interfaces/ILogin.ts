export interface ILogin {
  email: string,
  password: string,
}

export interface ILoginError {
  status: number,
  message: string,
}

export interface LoginMock {
  user: {
    email: string,
    password: string,
    role: string,
  },
  token: string,
}

export interface LoginMock2 {
  user: {
    id: number,
    username: string,
    email: string,
    role: string,
  },
  token: string,
}
