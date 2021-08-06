import React from "react";
import { render } from "react-dom";
import Timeline from "./components/timeline";
import timelineItems from "./timelineItems";

const App = () => (
  <div>
    <Timeline data={timelineItems} />
  </div>
);

render(<App />, document.getElementById("root"));
