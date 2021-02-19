/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Progress } from 'antd';

export function RatingCircle({ ratingPercentage, strokeColor, extraStyle = {}, strokeWidth = 6 }) {
  return (
    <div css={ratingCircleCss} style={extraStyle}>
      <Progress
        type="circle"
        percent={ratingPercentage}
        width="50"
        strokeWidth={strokeWidth}
        className="rating"
        strokeColor={strokeColor}
      />
    </div>
  );
}

const ratingCircleCss = css`
  background-color: rgba(0, 0, 0, 0.85);
  width: 54px;
  height: 54px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  .rating {
    height: 50px;
    width: 50px;
    .ant-progress-text {
      color: white;
      font-weight: 700;
    }
  }
`;
