import React from 'react';
import { css } from 'styled-components';

const style = css`
  .cls-1 {
    fill: #1b97f0;
  }

  .cls-2 {
    fill: none;
    stroke: #fff;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 7.046px;
  }

  .cls-3 {
    fill: #fff;
  }
`;

const TweetBtnIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 304 295">
    <defs>
      <style>{style}</style>
    </defs>
    <circle cx="151" cy="151" r="137" className="cls-1"></circle>
    <path d="M111.736 107.183L111.736 144.656" className="cls-2"></path>
    <path d="M93 125.92L130.473 125.92" className="cls-2"></path>
    <path
      d="M107.637 220.537C111.3 185.158 157.655 90 223.534 90c0 0-4.88 29.279-19.52 34.159-14.821 4.941-37.819 15.86-37.819 15.86s17.08 4.88 24.4 2.44a34.1 34.1 0 01-17.08 14.639c-12.2 4.88-31.719 14.64-43.919 31.72s-21.959 31.719-21.959 31.719z"
      className="cls-3"
    ></path>
  </svg>
);

export default TweetBtnIcon;
