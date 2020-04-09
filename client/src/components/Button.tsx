import * as React from 'react';

type Props = {
  text: string;
};

const Button = (props: Props): React.ReactElement => {
  return <button>{props.text}</button>;
};

export default Button;
