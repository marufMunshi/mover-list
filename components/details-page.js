/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { colors, containerCss } from '../config/styles/commonStyle';
import { imageURLBuilder } from '../lib/imageURLBuilder';
import { getStrokeColor } from '../lib/getStrokeColor';
import { RatingCircle } from './common/RatingCircle';
import { Card, Col, Row, Tag, Avatar } from 'antd';
import { Fragment } from 'react';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';
import ReactPlayer from 'react-player/youtube';
import { format } from 'date-fns';
import PageLayout from './common/PageLayout';
import numeral from 'numeral';
import { SeeMore } from './common/SeeMore';

const { Meta } = Card;

export function Details({
  config,
  details,
  currentSeason,
  externalIds,
  keywords,
  reviews,
  videos,
  credits,
}) {
  const backDropImage = imageURLBuilder(
    config.images.base_url,
    config.images.backdrop_sizes[3],
    details.backdrop_path,
  );

  const posterImage = imageURLBuilder(
    config.images.base_url,
    config.images.poster_sizes[3],
    details.poster_path,
  );

  const ratingPercentage = details.vote_average * 10;

  const _cast = credits.cast.slice(0, 12);

  const _reviews = reviews.slice(0, 4);

  return (
    <PageLayout>
      <div css={details_css}>
        <HeroSection
          posterImage={posterImage}
          originalName={details.original_name}
          name={details.name}
          firstAirDate={details.first_air_date || null}
          genres={details.genres}
          episodeRunTime={details.episode_run_time}
          movieRunTime={details.runtime}
          ratingPercentage={ratingPercentage}
          tagline={details.tagline}
          overview={details.overview}
          createdBy={details.created_by || null}
          backDropImage={backDropImage}
        />
        <div className="other-sections">
          <div className="left-side">
            <CastSection cast={_cast} config={config} />
            {currentSeason && <CurrentSeason currentSeason={currentSeason} config={config} />}
            {_reviews.length > 0 && <Reviews reviews={_reviews} />}
            <Videos videos={videos} />
          </div>
          <aside className="right-side">
            <Sidebar
              externalIds={externalIds}
              keywords={keywords}
              networks={details.networks}
              status={details.status}
              spokenLanguages={details.spoken_languages}
              type={details.type}
              revenue={details.revenue}
              budget={details.budget}
              config={config}
            />
          </aside>
        </div>
      </div>
    </PageLayout>
  );
}

const HeroSection = ({
  posterImage,
  originalName,
  name,
  firstAirDate,
  genres,
  episodeRunTime,
  movieRunTime,
  ratingPercentage,
  tagline,
  overview,
  createdBy,
  backDropImage,
}) => {
  return (
    <section css={hero_section_css(backDropImage)}>
      <div className="hero-box">
        <div className="poster">
          <img src={posterImage} alt={`${originalName}`} />
        </div>
        <div className="info">
          <div className="title">
            <h2>{name}</h2>
            {firstAirDate && <span>({firstAirDate.split('-')[0]})</span>}
          </div>
          <div className="genre-wrapper">
            {genres.map(({ id, name }, index) => (
              <span key={id} className="genre">
                {name}
                {index !== genres.length - 1 && <span>,</span>}
              </span>
            ))}
            <span className="seperator">-</span>
            {episodeRunTime && <span className="runtime">{`${episodeRunTime[0]}m`}</span>}
            {movieRunTime && <span className="runtime">{`${movieRunTime}m`}</span>}
          </div>
          <div className="rating-wrapper">
            <RatingCircle
              ratingPercentage={ratingPercentage}
              strokeColor={getStrokeColor(ratingPercentage)}
              strokeWidth={8}
            />
            <span className="rating-type">User Score</span>
          </div>
          <div className="tagline">{tagline}</div>
          <div className="overview">
            <h5>Overview</h5>
            <p>{overview}</p>
          </div>
          {createdBy && (
            <div className="creator">
              {createdBy.map(({ id, name }) => (
                <span key={id} className="creator__name">
                  {name}
                </span>
              ))}
              <span className="creator__title">Creator</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

function CastSection({ cast, config }) {
  return (
    <section css={cast_section_css}>
      <h3 className="title">Series Cast</h3>
      <div className="cast-list">
        <Fragment>
          {cast.map(({ id, profile_path, name, character }) => (
            <Card
              key={id}
              className="cast-card"
              cover={
                <img
                  alt={name}
                  src={
                    profile_path
                      ? imageURLBuilder(
                          config.images.base_url,
                          config.images.profile_sizes[2],
                          profile_path,
                        )
                      : `https://via.placeholder.com/190x285.png?text=No+Image+Found`
                  }
                />
              }>
              <Meta
                title={name}
                description={
                  <div>
                    <p>{character}</p>
                  </div>
                }
              />
            </Card>
          ))}
        </Fragment>
      </div>
      <div className="horizontal-line" />
    </section>
  );
}

function Sidebar({
  externalIds,
  keywords,
  networks,
  status,
  spokenLanguages,
  type,
  budget,
  revenue,
  config,
}) {
  return (
    <div css={sidebar_css}>
      <div className="social-links">
        {externalIds.facebook_id && (
          <a
            href={`https://www.facebook.com/${externalIds.facebook_id}`}
            target="_blank"
            rel="noreferrer">
            <FacebookOutlined style={{ fontSize: 24, marginRight: 15 }} />
          </a>
        )}
        {externalIds.instagram_id && (
          <a
            href={`https://www.instagram.com/${externalIds.instagram_id}`}
            target="_blank"
            rel="noreferrer">
            <InstagramOutlined style={{ fontSize: 24, marginRight: 15 }} />
          </a>
        )}
        {externalIds.twitter_id && (
          <a
            href={`https://twitter.com/${externalIds.twitter_id}`}
            target="_blank"
            rel="noreferrer">
            <TwitterOutlined style={{ fontSize: 24, marginRight: 15 }} />
          </a>
        )}
      </div>
      <div className="facts">
        <h4>Facts</h4>
        <div className="facts-info">
          <p className="facts-info--title">Status</p>
          <p className="facts-info--value">{status}</p>
        </div>
        {networks && (
          <div className="facts-info">
            <p className="facts-info--title">Network</p>
            {networks.map(({ name, id, logo_path }) => (
              <p key={id} className="facts-info--value">
                <img
                  src={imageURLBuilder(
                    config.images.base_url,
                    config.images.logo_sizes[3],
                    logo_path,
                  )}
                  alt={name}
                />
              </p>
            ))}
          </div>
        )}
        {type && (
          <div className="facts-info">
            <p className="facts-info--title">Type</p>
            <p className="facts-info--value">{type}</p>
          </div>
        )}
        {budget >= 0 && (
          <div className="facts-info">
            <p className="facts-info--title">Budget</p>
            <p className="facts-info--value">{numeral(budget).format('$0,0.00')}</p>
          </div>
        )}
        {revenue >= 0 && (
          <div className="facts-info">
            <p className="facts-info--title">Revenue</p>
            <p className="facts-info--value">{numeral(revenue).format('$0,0.00')}</p>
          </div>
        )}
        <div className="facts-info">
          <p className="facts-info--title">Original Language</p>
          <p className="facts-info--value">{spokenLanguages[0].english_name}</p>
        </div>
        <div className="facts-info">
          <p className="facts-info--title">Keywords</p>
          <p className="facts-info--value">
            {keywords &&
              keywords.map(({ name, id }) => (
                <Tag key={id} style={{ fontSize: 16, marginBottom: 8 }}>
                  {name}
                </Tag>
              ))}
          </p>
        </div>
      </div>
    </div>
  );
}

function CurrentSeason({ currentSeason, config }) {
  return (
    <section css={current_css}>
      <h3 className="title">Current Season</h3>
      <Row gutter={0}>
        <Col span={6}>
          <div className="card-wrapper">
            <Card
              className="card"
              cover={
                <img
                  alt={currentSeason.name}
                  src={imageURLBuilder(
                    config.images.base_url,
                    config.images.poster_sizes[3],
                    currentSeason.poster_path,
                  )}
                />
              }>
              <Meta
                title={currentSeason.name}
                description={
                  <div>
                    <p>{currentSeason.overview}</p>
                  </div>
                }
              />
            </Card>
          </div>
        </Col>
      </Row>
    </section>
  );
}

function Reviews({ reviews }) {
  return (
    <section css={reviews_css}>
      <h3 className="title">Reviews</h3>
      <div className="review-cards">
        <Row gutter={[16, 16]}>
          {reviews.map(({ author, author_details, id, content, created_at }) => (
            <Col span={24} key={id} className="gutter-row">
              <Card>
                <Meta
                  title={`A review by ${author_details.username}`}
                  description={format(new Date(created_at), 'MMMM dd, yyyy')}
                  avatar={
                    <Avatar
                      src={author_details.avatar_path?.replace(/^\/+/g, '')}
                      alt={author}
                      size={64}
                      shape="circle"
                    />
                  }
                />
                <SeeMore content={content} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

function Videos({ videos }) {
  return (
    <section css={videos_section}>
      <h3 className="title">Videos</h3>

      <main>
        {videos.map(({ id, key, name, site, type }) => (
          <ReactPlayer
            style={{ flex: '1 0 auto', margin: 'o 15px', width: '300px', height: 'auto' }}
            key={id}
            url={`https://www.youtube.com/watch?v=${key}`}
          />
        ))}
      </main>
    </section>
  );
}

// CSS styles

const details_css = css`
  min-height: calc(100vh - 130px);
  .other-sections {
    display: flex;
    flex-direction: row;
    ${containerCss};
    .left-side {
      flex: 2.5;
    }
    .right-side {
      flex: 1;
    }
  }
  .title {
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 1;
  }
`;

const hero_section_css = (backDropImage) => {
  return css`
    background-image: linear-gradient(
        to right,
        rgba(3.53%, 7.45%, 12.94%, 1) 150px,
        rgba(3.53%, 7.45%, 12.94%, 0.84) 100%
      ),
      url(${backDropImage});
    height: calc(100vh / 1.6);
    background-size: cover;
    background-repeat: no-repeat;
    .hero-box {
      ${containerCss}
      display: flex;
      height: 100%;
      align-items: center;
      color: white;
      .poster {
        flex: 1;
        img {
          height: 350px;
          width: auto;
          border-radius: 5px;
        }
      }
      .info {
        flex: 3;
        .title {
          display: flex;
          margin-bottom: 10px;
          h2,
          span {
            color: white;
            font-size: 36px;
          }
          h2 {
            font-weight: bold;
            margin-right: 10px;
          }
          span {
            font-weight: 400;
            opacity: 0.8;
          }
        }
      }
      .genre-wrapper {
        display: flex;
        align-items: center;
        .genre {
          margin-right: 3px;
          opacity: 0.8;
        }
        .seperator {
          margin: 0 8px;
          font-weight: bold;
        }
        .runtime {
          opacity: 0.8;
        }
      }
      .rating-wrapper {
        display: flex;
        align-items: center;
        margin: 20px 0;
        .rating-type {
          margin-left: 10px;
          font-size: 18px;
        }
      }
      .tagline {
        opacity: 0.8;
        font-style: italic;
        font-size: 18px;
      }
      .overview {
        margin: 22px 0;
        opacity: 0.9;
        word-spacing: 2px;
        h5 {
          color: white;
          margin-bottom: 13px;
          font-size: 20px;
          opacity: 1;
        }
      }
      .creator {
        display: flex;
        flex-direction: column;
        .creator__name {
          font-size: 18px;
          margin-bottom: 4px;
        }
        .creator__title {
          opacity: 0.8;
          font-size: 14px;
          margin-top: 10px;
        }
      }
    }
  `;
};

const cast_section_css = css`
  margin-top: 35px;
  margin-bottom: 25px;
  .cast-list {
    display: flex;
    margin: 20px 0;
    overflow-x: scroll;
    align-items: stretch;
    align-content: stretch;
    max-width: 900px;
    .cast-card {
      margin: 0 15px;
      width: 190px;
      flex: 0 0 auto;
      .ant-card-meta-title {
        white-space: pre-wrap;
      }
      .card-image {
        width: 160px;
      }
    }
  }
  .horizontal-line {
    width: 75%;
    margin: 0 auto;
    border-bottom: 1px solid #d9d9d9;
  }
`;

const sidebar_css = css`
  margin-top: 35px;
  .social-links {
    display: flex;
    margin-bottom: 25px;
  }
  .facts {
    h4 {
      font-size: 1.3rem;
    }
    .facts-info {
      margin-top: 20px;
      .facts-info--title {
      }
      .facts-info--value {
        margin-top: 8px;
        font-weight: 300;
      }
    }
  }
`;

const current_css = css`
  margin-top: 35px;
  .card-wrapper {
    margin: 20px 0;
    .card {
      width: 100%;
    }
  }
`;

const reviews_css = css`
  margin-top: 35px;
  .review-cards {
    margin: 20px 0;
  }
  .content-hidden {
    height: 100px;
    overflow: hidden;
  }
  .content-show {
    height: auto;
  }
  .see-more-btn-wrapper {
    display: flex;
    justify-content: flex-end;
    .see-more-btn {
      color: ${colors.blue};
    }
  }
`;

const videos_section = css`
  margin-top: 35px;
  main {
    display: flex;
    margin: 20px 0;
    overflow-x: scroll;
    align-items: stretch;
    align-content: stretch;
    max-width: 900px;
    height: 380px;
  }
`;
