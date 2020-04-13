import React from 'react';
import { css } from 'styled-components';

const style = css`
  .cls-1 {
    fill: none;
    stroke: #39b54a;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 16px;
  }
`;

const RetweetIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 304 295">
    <defs>
      <style>{style}</style>
    </defs>
    <path
      d="M163.083 239H95.406a31.782 31.782 0 01-31.782-31.782V85"
      className="cls-1"
    ></path>
    <path d="M28.574 117.083L63.865 85 99.157 120.292" className="cls-1"></path>
    <path
      d="M137.574 83h67.676a31.782 31.782 0 0131.782 31.782V237"
      className="cls-1"
    ></path>
    <path
      d="M272.083 204.917L236.791 237 201.499 201.708"
      className="cls-1"
    ></path>
  </svg>
);

export default RetweetIcon;
