/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { colors, containerCss } from '../../config/styles/commonStyle';
import { Logo } from './Logo';
import { GithubOutlined } from '@ant-design/icons';

export function Footer() {
  return (
    <footer css={footerCss}>
      <div className="footer-wraper">
        <div className="logo-wrapper">
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
        </div>
        <div className="creator-info">
          <span>
            Made by
            <a
              className="portfolio-link"
              href="https://maruf-hasan.netlify.app/"
              target="_blank"
              rel="noopener noreferrer">
              Maruf Hasan
            </a>
          </span>
        </div>
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
  color: white;
  padding: 25px 0;
  .footer-wraper {
    ${containerCss};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .logo-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .website-info {
      font-size: 1.2rem;
      margin: 0;
    }
    .git-icon {
      margin-left: 10px;
      color: white;
    }
    .creator-info {
      margin-top: 15px;
      .portfolio-link {
        color: white;
        margin-left: 10px;
        text-decoration: none;
        border-bottom: 1px solid ${colors.lightGreen};
      }
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
