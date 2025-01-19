// services/citasService.ts
import { apiClient } from './apiClient';

export const getUsuarios = async () => {
  return apiClient('/usuario');
};
export const getUsuarioMy = async () => {
  return await apiClient('/usuario/myuser');
};

export const getUsuarioRol = async (rol:string) => {
    return apiClient('/usuario/rol/'+ rol,{
       
    });
  };

  export const getUsuariobyId = async (id:string) => {
    return apiClient('/usuario/',{
        body: JSON.stringify(id),
    });
  };




export const createUser = async (data: any) => {
  return apiClient('/usuario/registro/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};


export const AdminCreateUser = async (data: any) => {
  console.log(data);  
  return apiClient('/usuario/admin/registro?role=' + data.role, {
    method: 'POST',
    body: JSON.stringify({name: data.name, userName: data.userName, password: data.password}),
  });
};


export const Slogin = async (data: {
    userName: string;
    password: string;
  }) => {
  return apiClient('/usuario/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};


export const edit = async ( id: string, data: any) => {
  return apiClient('/usuario/' + id, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};


export const deleteUser = async ( id: string) => {
  return apiClient('/usuario/' + id, {
    method: 'DELETE',
   
  });
};