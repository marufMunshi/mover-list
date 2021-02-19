/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import PageLayout from '../../components/common/PageLayout';
import { containerCss } from '../../config/styles/commonStyle';
import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import Router from 'next/router';

function PersonDetails() {
  return (
    <PageLayout>
      <div css={details_css}>
        <Result
          icon={<SmileOutlined />}
          title="This page is still work in progress"
          extra={
            <Button type="primary" onClick={() => Router.push('/')}>
              Go Home
            </Button>
          }
        />
      </div>
    </PageLayout>
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

export default PersonDetails;
