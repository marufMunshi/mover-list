import facepaint from 'facepaint';

const breakpoints = {
  mobile: 576,
  tab: 768,
  laptop: 992,
  desktop: 1200,
};

export const mq = facepaint(Object.values(breakpoints).map((bp) => `@media (min-width: ${bp}px)`));

/* 
Usage:
    import { css, jsx } from '@emotion/core';
    import mq from '../../lib/facepaint';
    const section_css = css`
      .container {
        ${mq({
          width: ['100%', '852px', '750px', '650px', '550px'], // [forMobile, forTab, forLaptop, forDesktop]
        })}
      }
    `;

*/
