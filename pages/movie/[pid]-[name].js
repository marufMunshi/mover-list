import React from 'react';
import { Details } from '../../components/details-page';
import MovieService from '../../service/movie';
import ConfigurationService from '../../service/configuration';

function MovieDetails(props) {
  return <Details {...props} />;
}

export async function getServerSideProps(context) {
  const paramsValue = context.params['pid]-[name'];
  const id = paramsValue.split('-');

  const [details, credits, externalIds, keywords, reviews, videos, config] = await Promise.all([
    MovieService.getDetails(id),
    MovieService.getCredits(id),
    MovieService.getExternalIds(id),
    MovieService.getKeywords(id),
    MovieService.getReviews(id),
    MovieService.getVideos(id),
    ConfigurationService.getConfiguration(),
  ]);

  return {
    props: {
      details,
      credits,
      externalIds,
      keywords: keywords.keywords,
      reviews: reviews.results,
      videos: videos.results,
      config,
    },
  };
}

export default MovieDetails;
