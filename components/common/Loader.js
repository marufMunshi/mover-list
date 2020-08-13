import React from 'react';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { colors } from '../../config/styles/commonStyle';

export function Loader({ color }) {
  return <Loading3QuartersOutlined spin={true} style={{ fontSize: '40px', color }} />;
}

Loader.defaultProps = {
  color: colors.lightGreen,
};

Loader.propTypes = {
  color: PropTypes.string,
};
