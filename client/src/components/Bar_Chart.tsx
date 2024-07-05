import React, { FC, useEffect, useState } from 'react'
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
        name: "Page A",
        uv: 4000,
        count: 2400,
        amt: 2400
    },
    {
        name: "Page B",
        uv: 3000,
        count: 1398,
        amt: 2210
    },
    {
        name: "Page C",
        uv: 2000,
        count: 9800,
        amt: 2290
    },
    {
        name: "Page D",
        uv: 2780,
        count: 3908,
        amt: 2000
    },
    {
        name: "Page E",
        uv: 1890,
        count: 4800,
        amt: 2181
    },
    {
        name: "Page F",
        uv: 2390,
        count: 3800,
        amt: 2500
    },
    {
        name: "Page G",
        uv: 3490,
        count: 4300,
        amt: 2100
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
            if(item.range === '900 to undefined'){
                arr.push({ name: "above 900", count: item.Count, amt: 900, uv: 1000 })
            }else{
                arr.push({ name: item.range, count: item.Count, amt: 900, uv: 1000 })
            }
        })

        setData(arr);
        console.log(data);

    }, [productCount])

    return (
        <BarChart
            width={900}
            className='p-1 bg-white border rounded-lg'
            height={400}
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
