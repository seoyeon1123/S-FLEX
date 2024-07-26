import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  Logo,
  Title,
  LoginForm,
  InputContainer,
  InputField,
  Button,
  AuthContainer,
  ButtonAuth,
  Message,
} from '../styled/loginCss';
import { LoginLogo } from 'components/CategoryFont';

interface IData {
  name: string;
  email: string;
  password: string;
  verificationCode: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false); // 인증 완료 상태 변수

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IData>();

  const onSubmit = async (data: IData) => {
    if (!isVerified) {
      setMessage('이메일 인증을 완료해주세요.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/user', {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      console.log('Registration successful:', response.data);
      setMessage('회원가입 성공!');
      reset();
      setVerificationSent(false);
      setIsVerified(false);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Registration failed:', error);
      setMessage('회원가입 실패. 다시 시도하세요.');
    }
  };

  const sendVerificationCode = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/sendVerification',
        { email }
      );
      console.log('Verification code sent:', response.data);
      setMessage('인증번호가 이메일로 전송되었습니다.');
      setVerificationSent(true);
    } catch (error) {
      console.error('Failed to send verification code:', error);
      setMessage('인증번호 전송에 실패했습니다. 다시 시도하세요.');
    }
  };

  const verifyCodeauth = async () => {
    try {
      const response = await axios.post('http://localhost:3000/verifyCode', {
        email,
        code: verificationCode,
      });
      console.log('Verification successful:', response.data);
      setMessage('인증이 완료되었습니다.');
      setIsVerified(true); // 인증 완료로 상태 설정
    } catch (error) {
      console.error('Failed to verify code:', error);
      setMessage('인증번호가 틀립니다.');
    }
  };

  return (
    <Container>
      <Logo>{LoginLogo}</Logo>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <Title>회원가입</Title>
        <InputContainer>
          <InputField
            type="text"
            id="name"
            placeholder="이름을 입력하세요"
            {...register('name', {
              required: '이름을 입력하세요',
              minLength: {
                value: 2,
                message: '이름은 최소 2글자 이상이어야 합니다',
              },
            })}
          />
          {errors.name && <Message>{errors.name.message}</Message>}
        </InputContainer>
        <InputContainer>
          <InputField
            type="email"
            id="email"
            placeholder="이메일을 입력하세요"
            {...register('email', {
              required: '이메일을 입력하세요',
              pattern: {
                value: /^\S+@\S+$/i,
                message: '올바른 이메일 형식을 입력하세요',
              },
            })}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <Message>{errors.email.message}</Message>}
        </InputContainer>
        <InputContainer>
          <InputField
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
            {...register('password', {
              required: '비밀번호를 입력하세요',
              minLength: {
                value: 6,
                message: '비밀번호는 최소 6글자 이상이어야 합니다',
              },
            })}
          />
          {errors.password && <Message>{errors.password.message}</Message>}
        </InputContainer>
        {verificationSent ? (
          <AuthContainer>
            <InputField
              type="text"
              id="verificationCode"
              placeholder="인증번호를 입력하세요"
              {...register('verificationCode', {
                required: '인증번호를 입력하세요',
              })}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <ButtonAuth type="button" onClick={verifyCodeauth}>
              인증 하기
            </ButtonAuth>
            {errors.verificationCode && (
              <Message>{errors.verificationCode.message}</Message>
            )}
          </AuthContainer>
        ) : (
          <ButtonAuth type="button" onClick={sendVerificationCode}>
            인증번호 전송
          </ButtonAuth>
        )}
        <Button type="submit">회원가입</Button>
      </LoginForm>
      {message && <Message>{message}</Message>}
    </Container>
  );
};

export default Signup;
