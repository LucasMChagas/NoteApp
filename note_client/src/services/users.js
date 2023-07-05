import api from './api';

const UsersService = {
    register: (params) => api.post('/users/register', params)
}

export default UsersService;
