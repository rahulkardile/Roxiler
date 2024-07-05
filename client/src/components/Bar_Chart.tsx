import { FC, useEffect, useState } from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import { Graph, ProductCount } from '../utils/Types';

const Bar_Data: Graph[] = [
    {
        name: "Zero to 900",
        uv: 4000,
        count: 2400,
        amt: 2400
    }
];

interface productcouts {
    productCount: ProductCount[]
}

const Bar_Chart: FC<productcouts> = ({ productCount }) => {

    const [data, setData] = useState<Graph[]>(Bar_Data);

    useEffect(() => {
        const arr: Graph[] = [];
        productCount.map((item) => {
            if (item.range === '900 to undefined') {
                arr.push({ name: "above 900", count: item.Count, amt: 900, uv: 1000 })
            } else {
                arr.push({ name: item.range, count: item.Count, amt: 900, uv: 1000 })
            }
        })
        setData(arr);
    }, [productCount])

    return (
        <BarChart
            width={1150}
            className=' py-3 bg-white border rounded-lg'
            height={420}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
            barSize={30}
        >
            <XAxis dataKey="name" scale="point" padding={{ left: 60, right: 60 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid />
            <Bar dataKey="count" fill="#7dd3fc" background={{ fill: "#eee" }} />
        </BarChart>
    )
}

export default Bar_Chart;
