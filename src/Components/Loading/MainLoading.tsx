import React, { useState, useEffect, ReactNode, Children } from 'react';
import styled from 'styled-components';
import { LoadingLogo } from '../CategoryFont';
import { motion } from 'framer-motion';

// 스타일 정의
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.black.veryDark};
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const LogoVariants = {
  stop: { rotate: 0 },
  active: {
    rotateY: 360,
    transition: { duration: 3, loop: Infinity },
  },
};

type LoadingProps = {
  children: React.ReactNode; // children 속성은 JSX의 특성으로, React.ReactNode으로 타입을 지정합니다.
};

const MainLoading = ({ children }: LoadingProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? (
    <Wrapper>
      <LoadingContainer variants={LogoVariants} initial="stop" animate="active">
        {LoadingLogo}
      </LoadingContainer>
    </Wrapper>
  ) : (
    <div>{children}</div>
  );
};

export default MainLoading;
