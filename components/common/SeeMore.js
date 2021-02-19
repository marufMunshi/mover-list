import React, { useRef, useEffect, useState } from 'react';
import cx from 'classnames';
import { Button } from 'antd';

export function SeeMore({ content }) {
  const contentElement = useRef(null);
  const [showAllContent, setShowAllContent] = useState(false);

  // if btn is shown hide conent
  // if btn is hide show content
  const contentClassNames = cx({
    'content-show': showAllContent === false,
    'content-hidden': showAllContent,
  });

  useEffect(() => {
    if (contentElement.current.scrollHeight > 100) {
      setShowAllContent({ show: true, id: null });
    }
  }, []);
  return (
    <React.Fragment>
      <p ref={contentElement} className={contentClassNames}>
        {content}
      </p>
      <div className="see-more-btn-wrapper">
        <Button
          type="link"
          className="see-more-btn"
          onClick={() => setShowAllContent(!showAllContent)}>
          {showAllContent && 'See More'}
          {showAllContent === false && 'Hide More Info'}
        </Button>
      </div>
    </React.Fragment>
  );
}
