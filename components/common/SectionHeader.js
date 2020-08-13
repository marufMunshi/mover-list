/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { colors } from '../../config/styles/commonStyle';
import classnames from 'classnames';

export function SectionHeader({ sectionTitle, buttons, setActiveButton, activeButtonName }) {
  const [buttonOne, buttonTwo] = buttons;
  const btnOneClass = classnames('btn-text', {
    active: activeButtonName === buttonOne.value,
    inactive: activeButtonName === buttonTwo.value,
  });
  const btnTwoClass = classnames('btn-text', {
    active: activeButtonName === buttonTwo.value,
    inactive: activeButtonName === buttonOne.value,
  });
  return (
    <header css={sectionHeaderCss}>
      <h2>{sectionTitle}</h2>
      <Button shape="round" size="large" className="btn">
        <span className={btnOneClass} onClick={() => setActiveButton(buttonOne.value)}>
          {buttonOne.title}
        </span>
        <span className={btnTwoClass} onClick={() => setActiveButton(buttonTwo.value)}>
          {buttonTwo.title}
        </span>
      </Button>
    </header>
  );
}

SectionHeader.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  activeButtonName: PropTypes.string.isRequired,
  setActiveButton: PropTypes.func.isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
};

const sectionHeaderCss = css`
  display: flex;
  align-items: center;
  h2 {
    font-size: 2rem;
    font-weight: 600;
    color: ${colors.darkBlue};
    margin-right: 20px;
  }
  .btn {
    padding: 0;
    .btn-text {
      padding: 7px 20px;
      border-radius: 40px;
      transition: background-color 0.6s ease;
      &.active {
        color: white;
        background-color: ${colors.darkBlue};
      }
      &.inactive {
        color: ${colors.darkBlue};
        background-color: transparent;
      }
    }
  }
`;
