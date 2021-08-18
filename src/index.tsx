import { render } from "react-dom";
import Timeline from "./components/timeline";
import timelineItems from "./timelineItems";
import { TimelineContextProvider } from "./components/timelineContext/timelineContext";
import "./index.css";

const App = () => (
  <div>
    <h1>Events Timeline</h1>
    <TimelineContextProvider timelineItems={timelineItems}>
      <Timeline />
    </TimelineContextProvider>
  </div>
)

render(<App />, document.getElementById("root"));
