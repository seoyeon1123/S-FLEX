import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: -50px;
  left: 0;
  background: ${(props) => props.theme.black.veryDark};
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const Spinner = styled(FontAwesomeIcon)`
  font-size: 10em; /* Adjust size as needed */
  color: red; /* Set default color */
`;

export const LoadingText = styled.div`
  font-size: 25px;
  text-align: center;
  margin-bottom: 30px;
  color: ${(props) => props.theme.white.darker};
`;

const Loading = () => {
  return (
    <>
      <Background>
        <LoadingText>잠시만 기다려 주세요.</LoadingText>
        <Spinner icon={faSpinner} spin />
      </Background>
    </>
  );
};

export default Loading;
