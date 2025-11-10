import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// ============================================
// AUTH API
// ============================================

export interface RegisterData {
  email: string;
  password: string;
  nombre: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  nombre: string;
  email_verificado: boolean;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export const authAPI = {
  register: async (data: RegisterData) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginData): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', data);
    // Guardar token y usuario en localStorage
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  },

  verifyEmail: async (token: string) => {
    const response = await api.get(`/auth/verify/${token}`);
    return response.data;
  },

  resendVerification: async (email: string) => {
    const response = await api.post('/auth/resend-verification', { email });
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get<User>('/auth/profile');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/auth/login';
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },
};

// ============================================
// BOLETOS API
// ============================================

export interface Boleto {
  id: number;
  nombre: string;
  correo: string;
  telefono?: string;
  tipo_participante: 'Público General' | 'Estudiante TecNM';
  sede?: string;
  numero_control?: string;
  numero_boleto: string;
  estado: 'disponible' | 'reservado' | 'pendiente' | 'confirmado' | 'ganador';
  comprobante_url: string;
  fecha_registro: string;
  fecha_confirmacion?: string;
}

export interface RegistrarBoletoData {
  nombre: string;
  telefono?: string;
  tipo_participante: 'Público General' | 'Estudiante TecNM';
  sede?: string;
  numero_control?: string;
  numeros_boleto: string[];
  comprobante: File;
}

export const boletosAPI = {
  registrar: async (data: RegistrarBoletoData) => {
    const formData = new FormData();
    formData.append('nombre', data.nombre);
    if (data.telefono) formData.append('telefono', data.telefono);
    formData.append('tipo_participante', data.tipo_participante);
    if (data.sede) formData.append('sede', data.sede);
    if (data.numero_control) formData.append('numero_control', data.numero_control);
    formData.append('numeros_boleto', JSON.stringify(data.numeros_boleto));
    formData.append('comprobante', data.comprobante);

    const response = await api.post('/boletos/registrar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getMisBoletos: async (): Promise<Boleto[]> => {
    const response = await api.get<{ boletos: Boleto[] }>('/boletos/mis-boletos');
    return response.data.boletos;
  },

  getCatalogo: async () => {
    const response = await api.get('/boletos/catalogo');
    return response.data.catalogo;
  },

  getTransparencia: async (): Promise<Boleto[]> => {
    const response = await api.get<{ boletos: Boleto[] }>('/boletos/transparencia');
    return response.data.boletos;
  },
};

export default api;
