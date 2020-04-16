import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import Button, { Variant } from '../../src/components/Button';
import HomeIcon from '../../src/components/icons/HomeIcon';
import NoticeIcon from '../../src/components/icons/NoticeIcon';
import TwitterIcon from '../../src/components/icons/TwitterIcon';

const handleClick = (): void => {
  console.log('click event is fire');
};

const ButtonWrapper = styled.div`
  width: 150px;
  height: 40px;
`;

storiesOf('Button/contained', module)
  .add('plain', () => {
    return (
      <ButtonWrapper>
        <Button
          text="ツイートする"
          variant={Variant.CONTAINED}
          onClick={handleClick}
        />
      </ButtonWrapper>
    );
  })
  .add('disabled', () => {
    return (
      <ButtonWrapper>
        <Button
          text="ツイートする"
          variant={Variant.CONTAINED}
          disabled
          onClick={handleClick}
        />
      </ButtonWrapper>
    );
  })
  .add('with icon', () => {
    return (
      <ButtonWrapper>
        <Button
          text="ツイートする"
          variant={Variant.CONTAINED}
          icon={<TwitterIcon />}
          onClick={handleClick}
        />
      </ButtonWrapper>
    );
  });

storiesOf('Button/outlined', module)
  .add('plain', () => {
    return (
      <ButtonWrapper>
        <Button
          text="ツイートする"
          variant={Variant.OUTLINED}
          onClick={handleClick}
        />
      </ButtonWrapper>
    );
  })
  .add('disabled', () => {
    return (
      <ButtonWrapper>
        <Button
          text="ツイートする"
          variant={Variant.OUTLINED}
          disabled
          onClick={handleClick}
        />
      </ButtonWrapper>
    );
  })
  .add('with icon', () => {
    return (
      <ButtonWrapper>
        <Button
          text="ツイートする"
          variant={Variant.OUTLINED}
          icon={<HomeIcon />}
          onClick={handleClick}
        />
      </ButtonWrapper>
    );
  });

storiesOf('Button/text', module)
  .add('plain', () => {
    return (
      <ButtonWrapper>
        <Button
          text="ツイートする"
          variant={Variant.TEXT}
          onClick={handleClick}
        />
      </ButtonWrapper>
    );
  })
  .add('disabled', () => {
    return (
      <ButtonWrapper>
        <Button
          text="ツイートする"
          variant={Variant.TEXT}
          disabled
          onClick={handleClick}
        />
      </ButtonWrapper>
    );
  })
  .add('with icon', () => {
    return (
      <ButtonWrapper>
        <Button
          text="ツイートする"
          variant={Variant.TEXT}
          icon={<NoticeIcon />}
          onClick={handleClick}
        />
      </ButtonWrapper>
    );
  });
