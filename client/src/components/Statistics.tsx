import React from 'react'

const Statistics = () => {
    return (
        <main className="w-[20%] flex flex-col gap-6 p-5">
            <div className="">
                <h3 className='font-bold text-xl'>Statistics - June</h3>
                <span className='text-xs'>{"( Select Month From Dropdown )"}</span>
            </div>

            <div className="flex bg-orange-200 flex-col p-4 rounded gap-2">
                <div className="flex justify-between items-center">
                    <p>Total Sale</p>
                    <span className='font-semibold'>10000</span>
                </div>
                <div className="flex justify-between items-center">
                    <p>Total Sold Item</p>
                    <span className='font-semibold'>889</span>
                </div>
                <div className="flex justify-between items-center">
                    <p>Total Not Sold Item</p>
                    <span className='font-semibold'>34</span>
                </div>
            </div>
        </main>
    )
}

export default Statistics