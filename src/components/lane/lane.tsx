import { BarData } from "../../types/types";
import Bar from "../bar";

type Props = {
    data: BarData[];
};

const Lane = ({ data }: Props) => {
    return <div className="lane">
        {
            data.map((barData, index) => <Bar key={index} data={barData} />)
        }
    </div>
}

export default Lane;