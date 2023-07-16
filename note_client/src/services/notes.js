import api from './api';

const NotesServices = {
    index: async ()=>{       
        const response = await api.get("/notes",{
            headers:{'x-access-token': localStorage.getItem('token')}
        });        
        return response;        
    } 
}
export default NotesServices;