import { TUser, Token  } from '../../types'
import { ILogin,  } from '../../interfaces/ILogin';

export const loginMock: ILogin = {
    email: 'admin@admin.com',
    password: 'super_senha',
}


export const tokenMock: Token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkeGkuSHhrMWN6QU8wblpSLi5CMzkzdTEwYUVEMFJRMU4zUEFFWFE3SHh0TGpLUEVaQnUuUFcifSwiaWF0IjoxNjQ4MDM3MzQ3LCJleHAiOjE2NDg2NDIxNDd9.XaBzweBMyKoz7r63o9GalKMgGRd-08Wye840pxQa0eQ";


export const userMock: TUser = {
        id: 1,
        username: 'Admin',
        email: 'admin@admin.com',
        role: 'admin',
}

