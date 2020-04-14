import { css } from 'styled-components';

const reset = css`
  /* Box sizing rules */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  /* Remove default margin */
  body,
  h1,
  h2,
  h3,
  h4,
  p,
  ul,
  ol,
  li,
  figure,
  figcaption,
  blockquote,
  dl,
  dd {
    margin: 0;
  }
  /* Set core body defaults */
  body {
    min-height: 100vh;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
  }
  /* Remove list styles on ul, ol elements with a class attribute */
  ul,
  ol {
    padding: 0;
    list-style: none;
  }
  /* A elements that don't have a class get default styles */
  a:not([class]) {
    text-decoration-skip-ink: auto;
  }
  /* Make images easier to work with */
  img {
    display: block;
    max-width: 100%;
  }
  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }
  /* text inputをリセットする（問題なさそうだったら影響範囲広げていく） */
  input[type='text'],
  textarea {
    appearance: none;
    background: transparent;
    border: none;
    border-radius: 0;
    outline: none;
  }
  textarea {
    resize: none;
  }
  /* Button reset */
  button {
    padding: 0;
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
    appearance: none;
  }
  /* Remove all animations and transitions for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    * {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default reset;
