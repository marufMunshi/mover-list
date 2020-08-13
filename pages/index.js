/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import MovieService from '../service/movie';
import TvService from '../service/tv';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { containerCss } from '../config/styles/commonStyle';
import { useState, useEffect, Fragment, useCallback } from 'react';
import { PosterCard } from '../components/common/PosterCard';
import { Loader } from '../components/common/Loader';
import { imageURLBuilder } from '../lib/imageURLBuilder';
import { dateFormatter } from '../lib/dateFormatter';
import { mq } from '../lib/facepaint';
import { SectionHeader } from '../components/common/SectionHeader';
import classnames from 'classnames';
import { useGetAPIConfiguration } from '../hooks/useGetAPIConfiguration';

function Home() {
  return (
    <div>
      <Navbar />
      <div css={homeCss}>
        <section className="hero-container">
          <div className="hero-box">
            <h2 className="title">Welcome.</h2>
            <h3 className="subtitle">
              Millions of movies, TV shows and people to discover. Explore now.
            </h3>
          </div>
        </section>
        <PosterSection tabs={POPULAR_SECTION_TABS} sectionTitle="What's Popular" />
        <PosterSection tabs={TRENDING_SECTION_TABS} sectionTitle="Trending" showBackgroundImage />
        <PosterSection tabs={TOP_RATED_SECTION_TABS} sectionTitle="Top Rated" />
      </div>
      <Footer />
    </div>
  );
}

const homeCss = css`
  min-height: calc(100vh - 130px);
  .hero-container {
    ${containerCss};
    background-image: linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, 0) 100%),
      url('/assets/images/home-page-banner.jpg');
    min-height: 300px;
    height: calc(100vh / 2.5);
    max-height: 360px;
    background-position: top center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .hero-box {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    padding: 0 40px;
    justify-content: center;
    .title {
      font-size: 3rem;
      font-weight: 700;
      color: #fff;
      line-height: 1;
      padding-bottom: 8px;
    }
    .subtitle {
      font-size: 2rem;
      font-weight: 600;
      color: #fff;
      line-height: 1;
    }
  }
`;

function PosterSection({ tabs, sectionTitle, showBackgroundImage = false }) {
  const [firstTab, secondTab] = tabs;

  const [activeTab, setActiveTab] = useState(firstTab.value);
  const [fetching, setFetching] = useState(true);
  const [firstTabData, setFirstTabData] = useState([]);
  const [secondTabData, setSecondTabData] = useState([]);

  const config = useGetAPIConfiguration();

  const fetchFirstTabData = useCallback(async () => {
    if (firstTabData.length > 0) {
      return;
    }
    setFetching(true);
    const res = await firstTab.getData();
    setFirstTabData(res);
    setFetching(false);
  }, [firstTabData.length, firstTab]);

  const fetchSecondTabData = useCallback(async () => {
    if (secondTabData.length > 0) {
      return;
    }
    setFetching(true);
    const res = await secondTab.getData();
    setSecondTabData(res);
    setFetching(false);
  }, [secondTabData.length, secondTab]);

  useEffect(() => {
    if (activeTab === firstTab.value) {
      fetchFirstTabData();
    } else {
      fetchSecondTabData();
    }
  }, [activeTab, firstTab.value, fetchFirstTabData, fetchSecondTabData]);

  const backgroundImageImageClass = classnames({
    'trending-bg-image': showBackgroundImage,
  });

  // TODO: Add transition
  return (
    <section css={popularSectionCss}>
      <div className={backgroundImageImageClass}>
        <SectionHeader
          sectionTitle={sectionTitle}
          setActiveButton={setActiveTab}
          activeButtonName={activeTab}
          buttons={tabs}
        />
        <main>
          {fetching && <Loader />}
          {fetching === false && (
            <Fragment>
              {activeTab === firstTab.value &&
                firstTabData.map((d) => (
                  <PosterCard
                    classNames="card-spacing"
                    key={d.id}
                    imageURL={imageURLBuilder(
                      config.images.secure_base_url,
                      config.images.poster_sizes[3],
                      d.poster_path,
                    )}
                    rating={d.vote_average}
                    title={d.title || d.name}
                    subTitle={dateFormatter(d.release_date || d.first_air_date)}
                  />
                ))}
              {activeTab === secondTab.value &&
                secondTabData.map((d) => (
                  <PosterCard
                    classNames="card-spacing"
                    key={d.id}
                    imageURL={imageURLBuilder(
                      config.images.secure_base_url,
                      config.images.poster_sizes[3],
                      d.poster_path,
                    )}
                    rating={d.vote_average}
                    title={d.title || d.name}
                    subTitle={dateFormatter(d.release_date || d.first_air_date)}
                  />
                ))}
            </Fragment>
          )}
        </main>
      </div>
    </section>
  );
}

const popularSectionCss = css`
  margin: 30px 0 0;
  min-height: 400px;
  ${containerCss};
  .trending-bg-image {
    background-image: url(/assets/images/trending-bg.svg);
    background-position: 50% 200px;
    background-repeat: no-repeat;
  }
  main {
    display: flex;
    margin: 20px 0;
    overflow-x: auto;
    overflow-y: hidden;
    ${mq({
      maxWidth: ['95%', '95%', '950px', '1150px', '1350px'],
    })}
  }
  .card-spacing {
    margin-left: 40px;
    transition: all 0.6s ease;
  }
`;

const POPULAR_SECTION_TABS = [
  {
    title: 'On Tv',
    value: 'tv',
    async getData() {
      const res = await TvService.getPopularTvShows();
      return res.results;
    },
  },
  {
    title: 'In Theaters',
    value: 'movie',
    async getData() {
      const res = await MovieService.getPopularMovies();
      return res.results;
    },
  },
];

const TRENDING_SECTION_TABS = [
  {
    value: 'day',
    title: 'Today',
    async getData() {
      const [trendingMovies, trendingTvShows] = await Promise.all([
        MovieService.getTrendingMovies(this.value),
        TvService.getTrendingTvShows(this.value),
      ]);
      return [...trendingMovies.results, ...trendingTvShows.results];
    },
  },
  {
    value: 'week',
    title: 'This Week',
    async getData() {
      const [trendingMovies, trendingTvShows] = await Promise.all([
        MovieService.getTrendingMovies(this.value),
        TvService.getTrendingTvShows(this.value),
      ]);
      return [...trendingMovies.results, ...trendingTvShows.results];
    },
  },
];

const TOP_RATED_SECTION_TABS = [
  {
    title: 'TV Shows',
    value: 'tv',
    async getData() {
      const res = await TvService.getTopRatedTvShows();
      return res.results;
    },
  },
  {
    title: 'Movies',
    value: 'movie',
    async getData() {
      const res = await MovieService.getTopRatedMovies();
      return res.results;
    },
  },
];

export default Home;
