import { User, TUser, Token, UserEveryMock } from '../../types'

export const loginMock = {
    email: '',
    password: '',
}

// export const userMock: TUserModel = {
//     user: {
//         id: 1,
//         username: 'Admin',
//         role: 'admin',
//         email: 'admin@admin.com',
//     },
//     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkeGkuSHhrMWN6QU8wblpSLi5CMzkzdTEwYUVEMFJRMU4zUEFFWFE3SHh0TGpLUEVaQnUuUFcifSwiaWF0IjoxNjQ4MDM3MzQ3LCJleHAiOjE2NDg2NDIxNDd9.XaBzweBMyKoz7r63o9GalKMgGRd-08Wye840pxQa0eQ",
// }

export const tokenMock: Token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkeGkuSHhrMWN6QU8wblpSLi5CMzkzdTEwYUVEMFJRMU4zUEFFWFE3SHh0TGpLUEVaQnUuUFcifSwiaWF0IjoxNjQ4MDM3MzQ3LCJleHAiOjE2NDg2NDIxNDd9.XaBzweBMyKoz7r63o9GalKMgGRd-08Wye840pxQa0eQ";


export const userMock: TUser = {
        id: 1,
        username: 'Admin',
        email: 'admin@admin.com',
        role: 'admin',
}


export const userEveryMock: UserEveryMock = [
    {
        "id": 1,
        "username": "Admin",
        "role": "admin",
        "email": "admin@admin.com",
    },
    {
        "id": 2,
        "username": "Clara",
        "role": "admin",
        "email": "clara@user.com",
    }
]