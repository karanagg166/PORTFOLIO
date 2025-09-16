import React from "react";

interface PreProps {
  load: boolean;
}

function Pre(props: PreProps): React.JSX.Element {
  return (
    <div id={props.load ? "preloader" : "preloader-none"}>
      <div className="space-preloader">
        <div className="planet-orbit">
          <div className="planet"></div>
        </div>
        <div className="stars">
          <div className="star star-1"></div>
          <div className="star star-2"></div>
          <div className="star star-3"></div>
          <div className="star star-4"></div>
          <div className="star star-5"></div>
        </div>
        <div className="loading-text">
          <span className="loading-text-content">Loading Space...</span>
        </div>
      </div>
    </div>
  );
}

export default Pre;