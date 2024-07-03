// DropdownMenu.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

const DropdownContainer = styled(motion.div)`
  position: absolute;
  left: 40px;
  top: -10px;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 5px;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 10px 20px;
  color: white;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: ${(props) => props.theme.red};
  }
`;

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export interface IDropdownProps {
  isVisible: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const DropdownMenu = ({
  isVisible,
  onMouseEnter,
  onMouseLeave,
}: IDropdownProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <DropdownContainer
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={dropdownVariants}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <DropdownItem to="/genre/movies">Movie</DropdownItem>
          <DropdownItem to="/genre/tv">TV</DropdownItem>
        </DropdownContainer>
      )}
    </AnimatePresence>
  );
};

export default DropdownMenu;
