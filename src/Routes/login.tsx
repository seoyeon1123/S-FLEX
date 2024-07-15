import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../utils/apiUtils';

import {
  Container,
  Logo,
  Title,
  LoginForm,
  InputContainer,
  InputField,
  ButtonContainer,
  Button,
  SignUpMessage,
  Message,
} from '../styled/loginCss';
import { LoginLogo } from 'Components/CategoryFont';

export interface ILoginData {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>();

  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  const onSubmitLogin = async (data: ILoginData) => {
    try {
      const userId = await loginUser(data);
      setMessage('로그인 성공!');

      if (userId) {
        navigate(`/movies?id=${userId}`); // React Router의 useNavigate 훅을 사용하여 이동
      }
    } catch (error: any) {
      console.error('로그인 요청 실패:', error);
      if (error.response) {
        console.error('응답 데이터:', error.response.data);
        console.error('응답 상태 코드:', error.response.status);
        if (error.response.status === 401) {
          setMessage('인증에 실패했습니다. 다시 로그인하세요.');
        } else {
          setMessage('로그인 실패. 다시 시도하세요.');
        }
      }
    }
  };

  return (
    <Container>
      <Logo>{LoginLogo}</Logo>
      <LoginForm onSubmit={handleSubmit(onSubmitLogin)}>
        <Title>Login</Title>
        <InputContainer>
          <InputField
            id="email"
            type="email"
            placeholder="이메일"
            {...register('email', {
              required: '이메일을 입력하세요',
              pattern: {
                value: /^\S+@\S+$/i,
                message: '올바른 이메일 형식을 입력하세요',
              },
            })}
          />
          {errors.email && <Message>{errors.email.message}</Message>}
        </InputContainer>
        <InputContainer>
          <InputField
            id="password"
            type="password"
            placeholder="비밀번호"
            {...register('password', {
              required: '비밀번호를 입력하세요',
              minLength: {
                value: 6,
                message: '비밀번호는 최소 6글자 이상이어야 합니다.',
              },
            })}
          />
          {errors.password && <Message>{errors.password.message}</Message>}
        </InputContainer>
        <ButtonContainer>
          <Button type="submit">로그인</Button>
          <SignUpMessage>회원이 아니신가요?</SignUpMessage>
          <Link to="/signup">
            <Button>회원가입</Button>
          </Link>
        </ButtonContainer>
      </LoginForm>

      {message && <Message>{message}</Message>}
    </Container>
  );
};

export default Login;
