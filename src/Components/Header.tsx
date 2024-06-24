import React, { useState } from 'react';
import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: black;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 100px;
  height: 30px;
  fill: ${(props) => props.theme.red};
  path {
    stroke: white;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;

  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

const Search = styled.span`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
  }
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  //변화가 시작하는 위치
  position: absolute;

  right: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
`;

const logoVariants = {
  nomal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
  };

  const homeMatch = useMatch('/');
  const tvMatch = useMatch('/tv');

  console.log(tvMatch);

  return (
    <>
      <Nav>
        <Col>
          <Logo
            variants={logoVariants}
            whileHover="active"
            initial="normal"
            width="41.998"
            height="13.222"
            viewBox="0 0 41.998 13.222"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M 0.572 9.086 L 0.572 8.712 L 3.74 8.712 L 3.74 9.878 Q 3.74 10.433 3.833 10.636 A 0.407 0.407 0 0 0 3.839 10.648 Q 3.938 10.846 4.136 10.846 Q 4.356 10.846 4.433 10.604 A 1.095 1.095 0 0 0 4.467 10.46 Q 4.51 10.208 4.51 9.746 Q 4.51 9.086 4.301 8.734 Q 4.092 8.382 3.652 8.129 Q 3.212 7.876 2.486 7.546 A 3.903 3.903 0 0 1 1.828 7.161 Q 1.279 6.757 1.034 6.215 A 3.634 3.634 0 0 1 0.806 5.521 Q 0.724 5.16 0.688 4.732 A 8.439 8.439 0 0 1 0.66 4.026 A 8.37 8.37 0 0 1 0.691 3.281 Q 0.725 2.905 0.795 2.589 A 3.355 3.355 0 0 1 0.979 2.002 Q 1.298 1.254 2.057 0.935 A 3.409 3.409 0 0 1 2.645 0.754 Q 3.26 0.619 4.109 0.616 A 10.834 10.834 0 0 1 4.136 0.616 A 6.094 6.094 0 0 1 5.418 0.739 Q 7.59 1.209 7.59 3.476 L 7.59 4.818 L 4.576 4.818 L 4.576 4.488 A 26.851 26.851 0 0 0 4.574 4.192 Q 4.572 3.959 4.565 3.773 A 10.996 10.996 0 0 0 4.555 3.562 Q 4.549 3.457 4.542 3.364 A 5.909 5.909 0 0 0 4.532 3.256 Q 4.512 2.867 4.224 2.84 A 0.474 0.474 0 0 0 4.18 2.838 A 0.261 0.261 0 0 0 4.006 2.906 Q 3.958 2.948 3.916 3.014 A 0.453 0.453 0 0 0 3.869 3.125 Q 3.806 3.34 3.806 3.806 A 3.478 3.478 0 0 0 3.821 4.139 Q 3.853 4.473 3.955 4.683 A 0.854 0.854 0 0 0 3.993 4.752 A 1.142 1.142 0 0 0 4.494 5.197 A 1.398 1.398 0 0 0 4.532 5.214 Q 4.884 5.368 5.346 5.566 A 9.642 9.642 0 0 1 5.921 5.811 Q 6.426 6.047 6.765 6.292 Q 7.282 6.666 7.502 7.293 A 3.171 3.171 0 0 1 7.623 7.758 Q 7.722 8.289 7.722 9.042 A 6.22 6.22 0 0 1 7.65 10.028 Q 7.568 10.532 7.396 10.929 A 2.361 2.361 0 0 1 6.754 11.814 A 3.194 3.194 0 0 1 5.63 12.412 Q 5.157 12.559 4.586 12.606 A 6.81 6.81 0 0 1 4.026 12.628 Q 2.222 12.628 1.397 11.88 A 2.026 2.026 0 0 1 0.911 11.175 Q 0.572 10.397 0.572 9.086 Z M 36.96 12.474 L 33.726 12.474 L 35.266 6.336 L 33.77 0.66 L 36.806 0.66 L 37.466 3.762 L 38.016 0.66 L 41.25 0.66 L 39.776 6.336 L 41.206 12.474 L 38.17 12.474 L 37.51 9.394 L 36.96 12.474 Z M 37.444 13.068 L 32.978 13.068 L 34.672 6.336 L 33 0.066 L 37.29 0.066 L 37.444 1.232 L 37.576 0.066 L 41.998 0.066 L 40.37 6.358 L 41.932 13.068 L 37.708 13.068 L 37.576 11.682 L 37.444 13.068 Z M 35.068 6.336 L 33.484 12.672 L 37.136 12.672 L 37.532 10.428 L 38.016 12.672 L 41.47 12.672 L 39.996 6.336 L 41.492 0.462 L 37.862 0.462 L 37.444 2.706 L 36.96 0.462 L 33.506 0.462 L 35.068 6.336 Z M 32.802 13.068 L 26.51 13.068 L 26.51 0.066 L 32.802 0.066 L 32.802 3.476 L 30.602 3.476 L 30.602 4.576 L 32.604 4.576 L 32.604 8.272 L 30.602 8.272 L 30.602 9.702 L 32.802 9.702 L 32.802 13.068 Z M 4.532 5.016 L 7.788 5.016 L 7.788 3.476 Q 7.788 0.611 4.628 0.411 A 7.796 7.796 0 0 0 4.136 0.396 Q 3.241 0.396 2.594 0.543 A 3.438 3.438 0 0 0 1.958 0.748 Q 1.166 1.1 0.825 1.892 Q 0.585 2.45 0.514 3.279 A 8.768 8.768 0 0 0 0.484 4.026 Q 0.484 5.434 0.88 6.314 Q 1.243 7.122 2.237 7.633 A 4.762 4.762 0 0 0 2.42 7.722 A 44.92 44.92 0 0 1 2.776 7.895 Q 2.915 7.963 3.038 8.024 A 21.286 21.286 0 0 1 3.267 8.14 A 3.894 3.894 0 0 1 3.581 8.32 A 2.86 2.86 0 0 1 3.85 8.514 L 0.374 8.514 L 0.374 9.086 A 8.247 8.247 0 0 0 0.428 10.07 Q 0.555 11.124 0.98 11.722 A 1.925 1.925 0 0 0 1.243 12.023 A 2.596 2.596 0 0 0 2.111 12.54 Q 2.87 12.822 3.991 12.826 A 9.073 9.073 0 0 0 4.026 12.826 A 6.548 6.548 0 0 0 5.136 12.738 Q 5.737 12.635 6.217 12.409 A 3.109 3.109 0 0 0 6.908 11.968 A 2.525 2.525 0 0 0 7.615 10.948 Q 7.782 10.527 7.857 9.996 A 6.781 6.781 0 0 0 7.92 9.042 A 11.513 11.513 0 0 0 7.903 8.386 Q 7.861 7.665 7.722 7.216 Q 7.524 6.578 6.974 6.193 A 4.26 4.26 0 0 0 6.581 5.952 Q 6.094 5.685 5.368 5.412 Q 5.016 5.28 4.84 5.192 A 3.384 3.384 0 0 1 4.677 5.106 Q 4.599 5.061 4.532 5.016 Z M 26.884 0.418 L 26.884 12.716 L 32.428 12.716 L 32.428 10.12 L 30.25 10.12 L 30.25 7.876 L 32.23 7.876 L 32.23 4.972 L 30.25 4.972 L 30.25 3.08 L 32.428 3.08 L 32.428 0.418 L 26.884 0.418 Z M 0 9.086 L 0 8.162 L 2.552 8.162 A 6.128 6.128 0 0 1 1.9 7.878 Q 1.574 7.712 1.317 7.522 A 3.088 3.088 0 0 1 1.067 7.315 A 2.586 2.586 0 0 1 0.402 6.322 A 3.216 3.216 0 0 1 0.308 6.039 A 5.064 5.064 0 0 1 0.176 5.405 Q 0.127 5.068 0.105 4.674 A 11.811 11.811 0 0 1 0.088 4.026 A 10.069 10.069 0 0 1 0.125 3.14 Q 0.205 2.233 0.462 1.628 Q 0.836 0.748 1.716 0.374 Q 2.587 0.004 4.104 0 A 12.639 12.639 0 0 1 4.136 0 A 6.782 6.782 0 0 1 5.655 0.155 Q 7.747 0.638 8.093 2.628 A 4.954 4.954 0 0 1 8.162 3.476 L 8.162 5.412 L 6.49 5.412 A 4.601 4.601 0 0 1 6.995 5.713 Q 7.245 5.886 7.436 6.076 A 2.556 2.556 0 0 1 7.557 6.204 A 2.447 2.447 0 0 1 7.957 6.845 A 3.233 3.233 0 0 1 8.118 7.315 A 4.611 4.611 0 0 1 8.222 7.847 Q 8.294 8.366 8.294 9.042 A 7.35 7.35 0 0 1 8.212 10.184 Q 7.993 11.57 7.194 12.265 Q 6.293 13.049 4.743 13.191 A 7.873 7.873 0 0 1 4.026 13.222 A 8.708 8.708 0 0 1 3.12 13.178 Q 2.668 13.131 2.287 13.032 A 3.893 3.893 0 0 1 1.738 12.848 Q 0.858 12.474 0.429 11.583 A 3.602 3.602 0 0 1 0.185 10.886 Q 0.006 10.164 0 9.152 A 11.856 11.856 0 0 1 0 9.086 Z M 17.842 13.068 L 13.75 13.068 L 13.75 0.066 L 20.042 0.066 L 20.042 3.476 L 17.842 3.476 L 17.842 4.576 L 19.844 4.576 L 19.844 8.272 L 17.842 8.272 L 17.842 13.068 Z M 32.252 12.54 L 27.06 12.54 L 27.06 0.594 L 32.252 0.594 L 32.252 2.882 L 30.074 2.882 L 30.074 5.17 L 32.054 5.17 L 32.054 7.678 L 30.074 7.678 L 30.074 10.318 L 32.252 10.318 L 32.252 12.54 Z M 14.102 0.462 L 14.102 12.672 L 17.49 12.672 L 17.49 7.876 L 19.492 7.876 L 19.492 4.972 L 17.49 4.972 L 17.49 3.08 L 19.668 3.08 L 19.668 0.462 L 14.102 0.462 Z M 17.314 12.474 L 14.278 12.474 L 14.278 0.66 L 19.492 0.66 L 19.492 2.882 L 17.314 2.882 L 17.314 5.17 L 19.316 5.17 L 19.316 7.678 L 17.314 7.678 L 17.314 12.474 Z M 26.224 13.068 L 20.372 13.068 L 20.372 0.066 L 24.266 0.066 L 24.266 9.702 L 26.224 9.702 L 26.224 13.068 Z M 20.746 0.462 L 20.746 12.672 L 25.872 12.672 L 25.872 10.12 L 23.914 10.12 L 23.914 0.462 L 20.746 0.462 Z M 25.696 12.474 L 20.922 12.474 L 20.922 0.66 L 23.738 0.66 L 23.738 10.318 L 25.696 10.318 L 25.696 12.474 Z M 13.31 7.81 L 8.646 7.81 L 8.646 5.544 L 13.31 5.544 L 13.31 7.81 Z M 8.976 5.83 L 8.976 7.524 L 12.958 7.524 L 12.958 5.83 L 8.976 5.83 Z M 12.782 7.392 L 9.152 7.392 L 9.152 5.962 L 12.782 5.962 L 12.782 7.392 Z M 3.938 9.812 L 3.938 8.558 Q 4.136 8.778 4.235 9.064 Q 4.307 9.271 4.326 9.569 A 3.667 3.667 0 0 1 4.334 9.812 A 9.236 9.236 0 0 1 4.332 10.017 Q 4.324 10.355 4.29 10.483 A 0.415 0.415 0 0 1 4.268 10.548 Q 4.253 10.579 4.235 10.601 A 0.125 0.125 0 0 1 4.136 10.648 A 0.141 0.141 0 0 1 4.01 10.58 Q 3.993 10.553 3.982 10.517 A 0.414 0.414 0 0 1 3.971 10.472 A 1.241 1.241 0 0 1 3.957 10.369 Q 3.94 10.198 3.938 9.882 A 13.221 13.221 0 0 1 3.938 9.812 Z M 4.378 4.488 L 4.378 4.906 Q 4.202 4.752 4.092 4.51 A 0.989 0.989 0 0 1 4.032 4.328 Q 3.989 4.147 3.983 3.892 A 3.625 3.625 0 0 1 3.982 3.806 Q 3.982 3.344 4.037 3.19 Q 4.077 3.079 4.134 3.048 A 0.096 0.096 0 0 1 4.18 3.036 A 0.101 0.101 0 0 1 4.26 3.08 Q 4.317 3.151 4.346 3.338 A 1.862 1.862 0 0 1 4.356 3.41 Q 4.371 3.529 4.376 3.692 A 5.724 5.724 0 0 1 4.378 3.861 L 4.378 4.488 Z"
              vectorEffect="non-scaling-stroke"
            />
          </Logo>
          <Items>
            <Item>
              <Link to="/">
                Home {homeMatch ? <Circle layoutId="circle" /> : null}
              </Link>
            </Item>
            <Item>
              <Link to="/tv">
                Tv Shows {tvMatch ? <Circle layoutId="circle" /> : null}
              </Link>
            </Item>
          </Items>
        </Col>
        <Col>
          <Search>
            <motion.svg
              onClick={toggleSearch}
              animate={{ x: searchOpen ? -180 : 0 }}
              transition={{ type: 'linear' }}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </motion.svg>
            <Input
              placeholder="Search for movie or tv show ..."
              animate={{ scaleX: searchOpen ? 1 : 0 }}
              transition={{ type: 'linear' }}
            />
          </Search>
        </Col>
      </Nav>
    </>
  );
};

export default Header;
