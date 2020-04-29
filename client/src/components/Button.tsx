import React from 'react';
import styled from 'styled-components';

import STYLES from '../styles/const';

export enum Variant {
  CONTAINED = 'contained',
  OUTLINED = 'outlined',
  TEXT = 'text',
}

type Props = {
  text: string;
  variant: Variant;
  disabled?: boolean;
  icon?: JSX.Element;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

type PaletteType = {
  color: string;
  bgColor: string;
  borderColor: string;
  hover: {
    color: string;
    bgColor: string;
  };
  active: {
    color: string;
    bgColor: string;
  };
};

const getColorPalette = (
  disabled: boolean | undefined,
  variant: Variant
): PaletteType => {
  if (disabled) {
    switch (variant) {
      case Variant.CONTAINED:
        return {
          color: STYLES.COLOR.WHITE,
          bgColor: STYLES.COLOR.PRIMARY_LIGHTER_10,
          borderColor: 'transparent',
          hover: {
            color: STYLES.COLOR.WHITE,
            bgColor: STYLES.COLOR.PRIMARY_LIGHTER_10,
          },
          active: {
            color: STYLES.COLOR.WHITE,
            bgColor: STYLES.COLOR.PRIMARY_LIGHTER_10,
          },
        };
      case Variant.OUTLINED:
        return {
          color: STYLES.COLOR.GRAY_LIGHTER_10,
          bgColor: 'transparent',
          borderColor: STYLES.COLOR.GRAY_LIGHTER_10,
          hover: {
            color: STYLES.COLOR.GRAY_LIGHTER_10,
            bgColor: 'transparent',
          },
          active: {
            color: STYLES.COLOR.GRAY_LIGHTER_10,
            bgColor: 'transparent',
          },
        };
      case Variant.TEXT:
        return {
          color: STYLES.COLOR.GRAY_LIGHTER_10,
          bgColor: 'transparent',
          borderColor: 'transparent',
          hover: {
            color: STYLES.COLOR.GRAY_LIGHTER_10,
            bgColor: 'transparent',
          },
          active: {
            color: STYLES.COLOR.GRAY_LIGHTER_10,
            bgColor: 'transparent',
          },
        };
    }
  }
  switch (variant) {
    case Variant.CONTAINED:
      return {
        color: STYLES.COLOR.WHITE,
        bgColor: STYLES.COLOR.PRIMARY,
        borderColor: STYLES.COLOR.PRIMARY,
        hover: {
          color: STYLES.COLOR.WHITE,
          bgColor: STYLES.COLOR.PRIMARY_DARKER_10,
        },
        active: {
          color: STYLES.COLOR.WHITE,
          bgColor: STYLES.COLOR.PRIMARY_DARKER_20,
        },
      };
    case Variant.OUTLINED:
      return {
        color: STYLES.COLOR.PRIMARY,
        bgColor: 'transparent',
        borderColor: STYLES.COLOR.PRIMARY,
        hover: {
          color: STYLES.COLOR.PRIMARY,
          bgColor: STYLES.COLOR.PRIMARY_LIGHTER_30,
        },
        active: {
          color: STYLES.COLOR.PRIMARY,
          bgColor: STYLES.COLOR.PRIMARY_LIGHTER_20,
        },
      };
    case Variant.TEXT:
      return {
        color: STYLES.COLOR.BLACK,
        bgColor: 'transparent',
        borderColor: 'transparent',
        hover: {
          color: STYLES.COLOR.PRIMARY,
          bgColor: STYLES.COLOR.PRIMARY_LIGHTER_30,
        },
        active: {
          color: STYLES.COLOR.PRIMARY,
          bgColor: STYLES.COLOR.PRIMARY_LIGHTER_20,
        },
      };
  }
};

const Button: React.FC<Props> = props => {
  const colorPalette: PaletteType = getColorPalette(
    props.disabled,
    props.variant
  );

  return (
    <StyledButton
      colorPalette={colorPalette}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {!props.icon ? null : (
        <Icon colorPalette={colorPalette}>{props.icon}</Icon>
      )}
      {props.text === '' ? null : <span>{props.text}</span>}
    </StyledButton>
  );
};

type StyledBtnProps = {
  colorPalette: PaletteType;
  disabled?: boolean;
};

const Icon = styled.span`
  width: 25px;
  height: 25px;
  margin-right: 5px;
  fill: ${(props: StyledBtnProps): string => props.colorPalette.color};
  svg {
    width: 100%;
    height: 100%;
  }
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  line-height: 1;
  color: ${(props: StyledBtnProps): string => props.colorPalette.color};
  cursor: ${(props: StyledBtnProps): string =>
    !props.disabled ? 'pointer' : 'default'};
  background-color: ${(props: StyledBtnProps): string =>
    props.colorPalette.bgColor};
  border: solid 1px
    ${(props: StyledBtnProps): string => props.colorPalette.borderColor};
  border-radius: 9999px;
  &:hover {
    color: ${(props: StyledBtnProps): string => props.colorPalette.hover.color};
    background-color: ${(props: StyledBtnProps): string =>
      props.colorPalette.hover.bgColor};
    ${Icon} {
      fill: ${(props: StyledBtnProps): string =>
        props.colorPalette.hover.color};
    }
  }
  &:active {
    color: ${(props: StyledBtnProps): string =>
      props.colorPalette.active.color};
    background-color: ${(props: StyledBtnProps): string =>
      props.colorPalette.active.bgColor};
    ${Icon} {
      fill: ${(props: StyledBtnProps): string =>
        props.colorPalette.active.color};
    }
  }
`;

export default Button;
