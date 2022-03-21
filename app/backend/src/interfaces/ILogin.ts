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
