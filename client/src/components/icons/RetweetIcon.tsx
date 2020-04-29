import * as React from 'react';
import styled from 'styled-components';

const Path = styled.path`
  fill: none;
  stroke: #39b54a;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 16px;
`;

const RetweetIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 304 295">
    <Path d="M163.083 239H95.406a31.782 31.782 0 01-31.782-31.782V85" />
    <Path d="M28.574 117.083L63.865 85 99.157 120.292" />
    <Path d="M137.574 83h67.676a31.782 31.782 0 0131.782 31.782V237" />
    <Path d="M272.083 204.917L236.791 237 201.499 201.708" />
  </svg>
);

export default RetweetIcon;
