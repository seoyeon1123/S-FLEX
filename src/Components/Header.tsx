import React, { useEffect, useState } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  motion,
  useAnimation,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import { useForm } from 'react-hook-form';
import { SFlexLogo } from './CategoryFont';

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 30px 50px;
  color: white;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 30px;
  width: 120px;
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

const Search = styled.form`
  color: white;
  display: flex;
  margin-right: 10px;
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
  padding: 8px 15px;
  padding-left: 40px;
  z-index: -1;
  color: white;
  font-size: 15px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
  border-radius: 10px;

  &:focus {
    outline: none;
  }
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

const navVariants = {
  top: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  scroll: {
    backgroundColor: 'rgba(0,0,0,1)',
  },
};

interface IForm {
  keyword: string;
}

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const { scrollY } = useScroll();
  const navAnimation = useAnimation();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = (data: IForm) => {
    navigate(`/search?keyword=${data.keyword}`);
    setValue('keyword', ''); // Clear only the 'keyword' field
  };
  const homeMatch = useMatch('/');
  const tvMatch = useMatch('/tv');

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
  };

  useMotionValueEvent(scrollY, 'change', () => {
    if (scrollY.get() > 80) {
      navAnimation.start('scroll');
    } else {
      navAnimation.start('top');
    }
  });

  const logoClick = () => {
    navigate('/');
  };

  return (
    <>
      <Nav variants={navVariants} initial="top" animate={navAnimation}>
        <Col>
          <Logo
            onClick={logoClick}
            variants={logoVariants}
            whileHover="active"
            initial="normal"
            width="41.998"
            height="13.222"
            viewBox="0 0 41.998 13.222"
            xmlns="http://www.w3.org/2000/svg"
          >
            {SFlexLogo}
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
          <Search onSubmit={handleSubmit(onValid)}>
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
              {...register('keyword', {
                required: true,
                minLength: 2,
              })}
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
