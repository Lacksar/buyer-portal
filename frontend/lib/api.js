import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    
    const message = error.response?.data?.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// Auth
export const signup = (body) => api.post('/auth/signup', body);
export const login  = (body) => api.post('/auth/login', body);
export const logout = ()     => api.post('/auth/logout');

// Favourites
export const getFavourites    = ()     => api.get('/favourites');
export const addFavourite     = (body) => api.post('/favourites', body);
export const deleteFavourite  = (id)   => api.delete(`/favourites/${id}`);
export const updateFavourite  = (id, body) => api.put(`/favourites/${id}`, body);
export const likeFavourite    = (id)   => api.patch(`/favourites/${id}/like`);
export const dislikeFavourite = (id)   => api.patch(`/favourites/${id}/dislike`);
