/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { memo } from 'react';
import Link from 'next/link';
import { getStrokeColor } from '../../lib/getStrokeColor';
import { RatingCircle } from './RatingCircle';

export const PosterCard = memo(
  ({ imageURL, rating, title, subTitle, classNames, detailsPageRoute }) => {
    const ratingPercentage = rating * 10;
    return (
      <Link href={detailsPageRoute} passHref>
        <a css={cardCss} className={classNames}>
          <div className="card__image">
            <img src={imageURL} alt="" />
          </div>
          <RatingCircle
            ratingPercentage={ratingPercentage}
            strokeColor={getStrokeColor(ratingPercentage)}
            extraStyle={{ marginTop: '-25px' }}
          />
          <div className="card__footer">
            <p className="card__footer__title">{title}</p>
            <p className="card__footer__subtitle">{subTitle}</p>
          </div>
        </a>
      </Link>
    );
  },
);

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
  cursor: pointer;
  .card__image {
    min-height: calc(150px * 1);
    height: calc(150px * 1.5);
    img {
      border-radius: 8px;
      width: 100%;
      height: 100%;
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
