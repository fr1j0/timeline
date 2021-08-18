import { useContext, useEffect, useRef, useState } from "react";
import useResize from "../../hooks/useResize";
import Lane from "../lane";
import { TimelineContext } from "../timelineContext/timelineContext";
import useScrollWheel from "../../hooks/useScrollWheel";

const Timeline = () => {
    const timelineRef = useRef(null);
    const timelineWrapperRef = useRef(null);
    const width = useResize(timelineWrapperRef)
    const [cachedWidth, setCachedWidth] = useState(0)
    const { lanes, setLayoutWidth } = useContext(TimelineContext);
    const deltaX = useScrollWheel(timelineRef);

    useEffect(() => {
        if (setLayoutWidth && (cachedWidth > width / 2 || deltaX > 0)) {
            const newWidth = cachedWidth + deltaX
            setCachedWidth(newWidth);
            setLayoutWidth(newWidth);
        }
    }, [deltaX, width])

    useEffect(() => {
        if (setLayoutWidth)
            setLayoutWidth(width);

        if (!cachedWidth) setCachedWidth(width);
    }, [width])

    return <div ref={timelineWrapperRef} className="timeline-wrapper">
        <div ref={timelineRef} className="timeline" style={{ width: cachedWidth }}>
            {
                lanes.map((laneItems, index) =>
                    <Lane key={index} data={laneItems} />)
            }
        </div>
    </div>
}

export default Timeline;