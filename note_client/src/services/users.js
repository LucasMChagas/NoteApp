import api from './api';

const UsersService = {
    register: (params) => api.post('/users/register', params),
    login: async (params) => {
        const response = await api.post('/users/login', params);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
    },
    logout: () =>{
        localStorage.removeItem('user', null);
        localStorage.removeItem('token', null);
    },
    updateNameEmail: async(params)=>{
        const response = await api.put('users/update/name_email', params,{
            headers:{'x-access-token': localStorage.getItem('token')}});
        localStorage.setItem('user', JSON.stringify(response.data))
    },
    updatePassword: async(params)=>{
        const response = await api.put('users/update/password', params, {
            headers:{'x-access-token': localStorage.getItem('token')}});
        localStorage.setItem('user', JSON.stringify(response.data))
    },
    deleteAccount: async()=>{
        const response = await api.delete('users/delete',{
            headers:{'x-access-token': localStorage.getItem('token')}});
        localStorage.removeItem('user', null);
        localStorage.removeItem('token', null);
    }
}

export default UsersService;
