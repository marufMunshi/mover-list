import { css } from '@emotion/core';
import { mq } from '../../lib/facepaint';

export const colors = {
  lightGreen: '#01c6ac',
  olive: '#d2d531',
  darkBlue: '#032541',
  red: '#CF000F',
};

export const containerCss = css`
  ${mq({
    maxWidth: ['95%', '95%', '950px', '1150px', '1350px'],
  })}
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;
