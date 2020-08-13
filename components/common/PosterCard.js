/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Progress } from 'antd';
import PropTypes from 'prop-types';
import { colors } from '../../config/styles/commonStyle';
import { memo } from 'react';

export const PosterCard = memo(({ imageURL, rating, title, subTitle, classNames }) => {
  const ratingPercentage = rating * 10;
  const _getStrokeColor = (rating) => {
    if (rating >= 70) {
      return colors.lightGreen;
    } else if (rating >= 40) {
      return colors.olive;
    } else {
      return colors.red;
    }
  };
  return (
    <div css={cardCss} className={classNames}>
      <div className="card__image">
        <img src={imageURL} alt="" />
      </div>
      <div className="rating-wrapper">
        <Progress
          type="circle"
          percent={ratingPercentage}
          width="50"
          strokeWidth="6"
          className="rating"
          strokeColor={_getStrokeColor(ratingPercentage)}
        />
      </div>
      <div className="card__footer">
        <p className="card__footer__title">{title}</p>
        <p className="card__footer__subtitle">{subTitle}</p>
      </div>
    </div>
  );
});

PosterCard.propTypes = {
  imageURL: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  classNames: PropTypes.string,
};

const cardCss = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: calc(150px * 1);
  min-width: calc(150px * 1);
  .card__image {
    min-height: calc(150px * 1);
    height: calc(150px * 1.5);
    img {
      border-radius: 8px;
      width: 100%;
      height: 100%;
    }
  }
  .rating-wrapper {
    background-color: rgba(0, 0, 0, 0.85);
    width: 54px;
    height: 54px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -25px;
    .rating {
      height: 50px;
      width: 50px;
      .ant-progress-text {
        color: white;
        font-weight: 700;
      }
    }
  }
  .card__footer {
    padding: 15px 0 10px 0;
    font-size: 1rem;
    .card__footer__title {
      font-weight: 700;
      margin-bottom: 3px;
    }
    .card__footer__subtitle {
      color: rgba(0, 0, 0, 0.6);
    }
  }
`;
