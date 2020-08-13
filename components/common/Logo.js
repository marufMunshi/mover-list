/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { colors } from '../../config/styles/commonStyle';

export function Logo() {
  return (
    <div css={logoCss}>
      <span>M</span>
      <div className="image-wrapper">
        <img src="/assets/images/film-reel.svg" alt="Mover" />
      </div>
      <span>VER</span>
    </div>
  );
}

const logoCss = css`
  display: flex;
  align-items: center;
  margin-right: 35px;
  .image-wrapper {
    height: 22px;
    width: auto;
  }
  img {
    max-height: 100%;
  }
  span {
    font-weight: 700;
    font-size: 2.1rem;
    color: ${colors.lightGreen};
  }
`;
