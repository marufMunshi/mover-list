/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { colors, containerCss } from '../../config/styles/commonStyle';
// import { DropdownMenu } from './Dropdown/Dropdown';
import {
  VideoCameraOutlined,
  DesktopOutlined,
  UserOutlined,
  GithubOutlined,
} from '@ant-design/icons';
import { Select, Spin } from 'antd';
import debounce from 'lodash.debounce';
import { useState } from 'react';
import SearchService from '../../service/search';
import { Logo } from './Logo';
import Router from 'next/router';

const { Option } = Select;

export function Navbar() {
  return (
    <header css={navbarCss}>
      <nav>
        <div className="left-side">
          <a href="/">
            <Logo />
          </a>
          {/* // TODO: un-comment when pages are built */}
          {/* {dropdownMenus.map((dm, index) => (
            <DropdownMenu key={index} linkClassName="dropdown-link" {...dm} />
          ))} */}
        </div>
        <div className="right-side">
          <RemoteSelect />
          <a
            href="https://github.com/marufMunshi/mover-list"
            target="_blank"
            rel="noopener noreferrer">
            <GithubOutlined className="icon" />
          </a>
        </div>
      </nav>
    </header>
  );
}

const navbarCss = css`
  background-color: ${colors.darkBlue};
  padding: 15px 0;
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${containerCss};
  }
  .left-side {
    display: flex;
    align-items: center;
    flex: 2;
  }
  .logo-wrapper {
    display: flex;
    align-items: center;
    margin-right: 35px;
    .image-wrapper {
      height: 22px;
      width: auto;
    }
    img {
      max-height: 100%;
    }
    span {
      font-weight: 700;
      font-size: 2.1rem;
      color: ${colors.lightGreen};
    }
  }
  .dropdown-link {
    color: white;
    font-weight: 700;
    font-size: 1rem;
    padding-right: 20px;
    cursor: pointer;
  }
  .right-side {
    flex: 1.3;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .icon {
    font-size: 1.8rem;
    color: white;
    cursor: pointer;
    margin-left: 20px;
  }
`;

function RemoteSelect() {
  const [data, setData] = useState([]);
  const [fetching, setfetching] = useState(false);
  const search = async (val) => {
    if (val.length < 3) {
      return;
    }
    setfetching(true);
    const res = await SearchService.searchMoviesOrTvShows(val);
    setData(
      res.results.map((r) => ({ value: r.id, text: r.name || r.title, mediaType: r.media_type })),
    );
    setfetching(false);
  };

  const _debouncedSearch = debounce(search, 300);

  const searchResultSelect = (value) => {
    const _item = data.find((d) => d.value === value);
    Router.push(`/${_item.mediaType}/${_item.value}-${_item.text}`);
  };

  return (
    <Select
      showSearch={true}
      placeholder="Search movies, tv shows ..."
      notFoundContent={fetching ? <Spin size="small" /> : null}
      filterOption={false}
      onSearch={(val) => _debouncedSearch(val)}
      onChange={searchResultSelect}
      optionLabelProp="label"
      style={{ width: '100%' }}>
      {data.map((d) => (
        <Option key={d.value} value={d.value} label={d.text}>
          <div>
            <span style={{ marginRight: '6px' }}>
              {d.mediaType === MEDIA_TYPES.tv && <DesktopOutlined />}
              {d.mediaType === MEDIA_TYPES.movie && <VideoCameraOutlined />}
              {d.mediaType === MEDIA_TYPES.person && <UserOutlined />}
            </span>
            {d.text}
          </div>
        </Option>
      ))}
    </Select>
  );
}

// TODO: un-comment when pages are built

// const dropdownMenus = [
//   {
//     name: 'Movies',
//     items: [
//       {
//         title: 'Popular',
//         href: '/movies',
//       },
//       {
//         title: 'Now Playing',
//         href: '/movies/now-playing',
//       },
//       {
//         title: 'Upcoming',
//         href: '/movies/upcoming',
//       },
//     ],
//   },
//   {
//     name: 'TV Shows',
//     items: [
//       {
//         title: 'Popular',
//         href: '/tv',
//       },
//     ],
//   },
// ];

const MEDIA_TYPES = {
  tv: 'tv',
  movie: 'movie',
  person: 'person',
};
