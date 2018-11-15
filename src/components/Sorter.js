import React from 'react';
import styled from 'styled-components';

const StyledSorter = styled.svg`
  position: absolute;
  right: 24px;
  top: 18px;
  width: 15px;
  margin-left: 10px;
`;

const SorterArrow = styled.path`
  fill: #A0C2F9;
  cursor: pointer;

  &:hover {
    fill: #5892E8;
  }
`;

const Sorter = ({ handleSortChange }) => (
  <StyledSorter version="1.1" x="0px" y="0px"
    viewBox="0 0 194.2 348.7" space="preserve">
    <SorterArrow
      onClick={() => {handleSortChange('up')}}
      d="M86.2,5.6l-83.8,118c-6.3,8.8,0,21,10.9,21h167.5c10.8,0,17.1-12.2,10.9-21L108,5.6
      C102.7-1.9,91.6-1.9,86.2,5.6z" />
    <SorterArrow
      onClick={() => {handleSortChange('down')}}
      d="M108,343.1l83.8-118c6.3-8.8,0-21-10.9-21H13.3c-10.8,0-17.1,12.2-10.9,21l83.8,118
      C91.6,350.5,102.7,350.5,108,343.1z" />
  </StyledSorter>
);

export default Sorter;