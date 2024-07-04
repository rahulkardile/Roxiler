import React, { FC } from 'react'
import { StatisticsInterface } from '../utils/Types'

interface Stat {
    data: StatisticsInterface,
    month: string
}

const Statistics: FC<Stat> = ( { data, month }) => {
    let CurrentMonth = "";
   
    switch (month) {
        case "Jan":
            CurrentMonth = "January";
            break;
        case "Feb":
            CurrentMonth = "February";
            break;
        case "Mar":
            CurrentMonth = "March";
            break;
        case "Apr":
            CurrentMonth = "April";
            break;
        case "May":
            CurrentMonth = "May";
            break;
        case "Jun":
            CurrentMonth = "June";
            break;
        case "Jul":
            CurrentMonth = "July";
            break;
        case "Aug":
            CurrentMonth = "August";
            break;
        case "Sep":
            CurrentMonth = "September";
            break;
        case "Oct":
            CurrentMonth = "October";
            break;
        case "Nov":
            CurrentMonth = "November";
            break;
        case "Dec":
            CurrentMonth = "December";
            break;
        default:
            CurrentMonth = "Invalid month";
            break;
    }

    return (
        <main className="w-[20%] flex flex-col gap-6 p-5">
            <div className="">
                <h3 className='font-bold text-xl'>Statistics - {CurrentMonth}</h3>
                <span className='text-xs'>{"( Select Month From Dropdown )"}</span>
            </div>

            <div className="flex bg-orange-200 flex-col p-4 rounded gap-2">
                <div className="flex justify-between items-center">
                    <p>Total Sale</p>
                    <span className='font-semibold'>{Math.round(data.totalSales)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <p>Total Sold Item</p>
                    <span className='font-semibold'>{data.totalItems}</span>
                </div>
                <div className="flex justify-between items-center">
                    <p>Total Not Sold Item</p>
                    <span className='font-semibold'>{data.totalNotSold}</span>
                </div>
            </div>
        </main>
    )
}

export default Statistics