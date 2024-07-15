import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #111;
  color: white;
`;

export const Logo = styled.svg`
  width: 800px;
  height: 200px;
  margin: 0 auto;

  fill: ${(props) => props.theme.red};
  path {
    stroke: white;
  }
`;

export const Title = styled.h1`
  font-size: 40px;
  padding-bottom: 10px;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #333;
  width: 400px;
  min-height: 400px;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 100%;
`;

export const InputField = styled.input`
  padding: 12px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  background-color: #222;
  color: white;
  font-size: 16px;
  ::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
`;

export const Button = styled.button`
  padding: 8px 0;
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  background-color: #e50914;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  &:hover {
    background-color: #ff3e46;
  }
`;

export const ButtonAuth = styled.button`
  padding: 8px 0;
  border: none;
  border-radius: 4px;
  width: 30%;
  font-size: 14px;
  margin-bottom: 10px;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #9e9e9e;
  }
`;

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
`;

export const SignUpMessage = styled.p`
  text-align: end;
  margin-top: 20px;
  font-size: 15px;
`;

export const Message = styled.p`
  margin-top: 15px;
  color: red;
`;
