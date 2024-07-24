import { jwtDecode } from 'jwt-decode';

export const getUserFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded; // or extract specific fields you need like decoded.user
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
