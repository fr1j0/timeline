import { createContext, ReactNode, useEffect, useState } from "react";
import { BarData, TimelineItem } from "../../types/types";

type ContextValues = {
    lanes: BarData[][];
    timelineStart: number;
    timelineEnd: number;
    layoutWidth: number;
    setLayoutWidth: React.Dispatch<React.SetStateAction<number>> | null;
}

type ProviderProps = {
    children: ReactNode;
    timelineItems: TimelineItem[];
}

export const TimelineContext = createContext<ContextValues>({ lanes: [], setLayoutWidth: null, layoutWidth: 1000, timelineStart: 0, timelineEnd: 0 });

const TimelineContextProvider = ({ children, timelineItems }: ProviderProps) => {
    const [lanes, setLanes] = useState<BarData[][]>([]);
    const [timelineStart, setTimelineStart] = useState(0);
    const [timelineEnd, setTimelineEnd] = useState(0);
    const [layoutWidth, setLayoutWidth] = useState(0);

    useEffect(() => {
        const timelineItemsWithTimestamps = timelineItems.map<BarData>(d => (
            {
                ...d,
                fromTimestamp: new Date(d.start).getTime(),
                toTimestamp: new Date(d.end).getTime(),
            }
        )).sort((a, b) => a.fromTimestamp - b.fromTimestamp);

        const lanesData: BarData[][] = [];

        timelineItemsWithTimestamps.forEach((item) => {
            let match = false;
            for (let i = 0; i < lanesData.length; i++) {
                const lastLaneItem = lanesData[i][lanesData[i].length - 1];
                if (lastLaneItem.toTimestamp <= item.fromTimestamp) {
                    lanesData[i].push(item);
                    match = true;
                    break;
                }
            }
            if (!match) lanesData.push([item])
        })

        const timelineStart = timelineItemsWithTimestamps.reduce((acc, curr) => Math.min(curr.fromTimestamp, acc)
            , Number.MAX_VALUE);

        const timelineEnd = timelineItemsWithTimestamps.reduce((acc, curr) => Math.max(curr.toTimestamp, acc)
            , 0);

        setTimelineStart(timelineStart);
        setTimelineEnd(timelineEnd);
        setLanes(lanesData);
    }, [timelineItems])

    return <TimelineContext.Provider value={{ lanes, layoutWidth, setLayoutWidth, timelineStart, timelineEnd }}>{children}</TimelineContext.Provider>

};

export { TimelineContextProvider }