import axios from 'axios';
import { ILoginData } from '../Routes/login';

export const loginUser = async (data: ILoginData) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/login',
      {
        email: data.email,
        password: data.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    const { token } = response.data;
    if (token) {
      sessionStorage.setItem('token', token);

      // Fetch user data to get _id
      try {
        const userDataResponse = await axios.get('http://localhost:3000/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = userDataResponse.data.user;
        return userData._id;
      } catch (error) {
        console.error('Failed to fetch user data after login:', error);
        throw error;
      }
    } else {
      console.error('토큰이 없습니다.');
      throw new Error('로그인 실패. 다시 시도하세요.');
    }
  } catch (error) {
    console.error('로그인 요청 실패:', error);
    throw error;
  }
};
