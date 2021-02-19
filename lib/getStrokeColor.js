import { colors } from '../config/styles/commonStyle';

export const getStrokeColor = (rating) => {
  if (rating >= 70) {
    return colors.lightGreen;
  } else if (rating >= 40) {
    return colors.olive;
  } else {
    return colors.red;
  }
};
