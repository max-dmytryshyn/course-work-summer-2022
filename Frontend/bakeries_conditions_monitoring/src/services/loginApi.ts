import axios from 'axios';

interface LoginResponse {
  token: string;
}

export const login: (username: string, password: string) => Promise<any> = async (
  username,
  password
) => {
  return await axios.post<LoginResponse>(`http://192.168.0.124:8000/users/login/`, {
    username: username,
    password: password
  });
};
