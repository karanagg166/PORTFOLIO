import React from "react";

interface PreProps {
  load: boolean;
}

function Pre(props: PreProps): React.JSX.Element {
  return <div id={props.load ? "preloader" : "preloader-none"}></div>;
}

export default Pre;