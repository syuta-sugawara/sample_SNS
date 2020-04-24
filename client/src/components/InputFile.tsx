import React, { useRef } from 'react';
import styled from 'styled-components';

type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputFile: React.FC<Props> = props => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <UploadBtn onClick={() => ref.current?.click()}>
      <input ref={ref} type="file" accept="image/*" onChange={props.onChange} />
    </UploadBtn>
  );
};

const UploadBtn = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  input[type='file'] {
    position: absolute;
    height: 0;
    visibility: hidden;
  }
`;

export default InputFile;
