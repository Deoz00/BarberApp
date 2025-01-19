// services/citasService.ts
import { apiClient } from './apiClient';

export const getCitas = async () => {
  return apiClient('/Citas/my');
};

export const deleteCita = async (id: number) => {
  return apiClient(`/Citas/${id}`, { method: 'DELETE' });
};
export const editCita = async (id: number,data: any) => {
  return await apiClient(`/Citas/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export const createCita = async (data: any) => {
  return await apiClient('/Citas', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
