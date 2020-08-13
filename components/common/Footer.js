/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { colors, containerCss } from '../../config/styles/commonStyle';
import { Logo } from './Logo';
import { GithubOutlined } from '@ant-design/icons';

export function Footer() {
  return (
    <footer css={footerCss}>
      <div className="footer-wraper">
        <Logo />
        <p className="website-info">
          Search latest information about movies and tv shows.
          <a
            href="https://github.com/marufMunshi/mover-list"
            target="_blank"
            rel="noopener noreferrer">
            <GithubOutlined className="git-icon" />
          </a>
        </p>
        <div className="attribution">
          <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
            <img src="/assets/images/tmdb.svg" alt="TMDB" />
          </a>
          <span>This website uses data from TMDB</span>
        </div>
      </div>
    </footer>
  );
}

const footerCss = css`
  background-color: ${colors.darkBlue};
  height: 130px;
  color: white;
  padding: 15px 0;
  .footer-wraper {
    ${containerCss};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .website-info {
      font-size: 1.2rem;
      margin-top: 10px;
    }
    .git-icon {
      margin-left: 10px;
      color: white;
    }
    .attribution {
      display: flex;
      align-items: center;
      margin-top: 15px;
      img {
        height: 20px;
        width: auto;
      }
      span {
        margin-left: 10px;
        font-size: 0.8rem;
      }
    }
  }
`;
