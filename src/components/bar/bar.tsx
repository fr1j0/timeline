import { ChangeEvent, KeyboardEvent, useContext, useEffect, useState } from "react";
import { BarData } from "../../types/types";
import { TimelineContext } from "../timelineContext/timelineContext";

type Props = {
    data: BarData
};

const Bar = ({ data }: Props) => {
    const [name, setName] = useState(data.name);
    const [inputWidth, setInputWidth] = useState(0);
    const { layoutWidth, timelineStart, timelineEnd } = useContext(TimelineContext);

    const xPositionPercentageStart = (data.fromTimestamp - timelineStart) * 100 / (timelineEnd - timelineStart);
    const xPositionPercentageEnd = (data.toTimestamp - timelineStart) * 100 / (timelineEnd - timelineStart);
    const xPosition = xPositionPercentageStart * layoutWidth / 100;
    const xPositionEnd = xPositionPercentageEnd * layoutWidth / 100;
    const width = xPositionEnd - xPosition;
    const left = xPosition;

    useEffect(() => {
        setInputWidth(name.length * 7);
    }, [name])

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    return <div className="bar" style={{ left, width }}>
        {data.id}:<input type="text" value={name} onChange={handleNameChange} style={{ width: inputWidth }} />
    </div>
}

export default Bar;