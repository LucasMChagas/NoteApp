import api from './api';

const UsersService = {
    register: (params) => api.post('/users/register', params),
    login: async (params) => {
        const response = await api.post('/users/login', params);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
    } 
}

export default UsersService;
