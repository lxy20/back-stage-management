import http from '../utils/request'

export const getData = () => {
    return http.get('/home/getData')
}

export const getUser = (params ) => {
    //返回用户列表
    return http.get('/user/getUser',params)
}

export const addUser = (data ) => {
    return http.post('/user/add',data)
}

export const editUser = (data ) => {
    return http.post('/user/edit',data)
}

export const delUser = (data ) => {
    return http.post('/user/del',data)
}

export const getMenu = (data ) => {
    //返回用户列表
    return http.post('/permission/getMenu',data)
}