
// services/apiClient.ts
export const apiClient = async (url: string, options?: RequestInit) => {
    // Obtener la URL de la API de las variables de entorno
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    // Obtener el token JWT del localStorage (o cookies si es necesario)
    const token = sessionStorage.getItem("auth_token");
    // Si el token existe, lo agregamos a los encabezados de la solicitud
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
  
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  try {
      const response = await fetch(`${baseUrl}${url}`, {
      headers: headers,
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      
      throw (error.errorMessages?.[0] || 'Error con el servidor');
    }
   
    return response.json();
    
  } catch (error) {
    throw error;
  }
  
  
   
  };
  