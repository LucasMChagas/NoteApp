import api from './api';

const NotesServices = {
    index: async ()=>{       
        const response = await api.get('/notes',{
            headers:{'x-access-token': localStorage.getItem('token')}
        });        
        return response;        
    },
    create: async ()=>{
        await api.post('/notes', {'title': 'Nova rota', 'body': 'nova rota'},{
            headers:{'x-access-token': localStorage.getItem('token')} 
        } )
    },
    delete: async (id)=>{
        await api.delete(`/notes/${id}`,{
            headers:{'x-access-token': localStorage.getItem('token')} 
        })
    },
    update: async (id, params)=>{
        const response = await api.put(`/notes/${id}`, params, {
            headers:{'x-access-token': localStorage.getItem('token')} 
        });
        return response;
    },
}
export default NotesServices;