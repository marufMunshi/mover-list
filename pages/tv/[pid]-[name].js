import React from 'react';
import { Details } from '../../components/details-page';
import TvService from '../../service/tv';
import ConfigurationService from '../../service/configuration';

function TvDetails(props) {
  return <Details {...props} />;
}

export async function getServerSideProps(context) {
  const paramsValue = context.params['pid]-[name'];
  const id = paramsValue.split('-');

  const [details, credits, externalIds, keywords, reviews, videos, config] = await Promise.all([
    TvService.getDetails(id),
    TvService.getCredits(id),
    TvService.getExternalIds(id),
    TvService.getKeywords(id),
    TvService.getReviews(id),
    TvService.getVideos(id),
    ConfigurationService.getConfiguration(),
  ]);

  const currentSeason = details.seasons[details.seasons.length - 1];

  return {
    props: {
      details,
      currentSeason,
      credits,
      externalIds,
      keywords: keywords.results,
      reviews: reviews.results,
      videos: videos.results,
      config,
    },
  };
}

export default TvDetails;
